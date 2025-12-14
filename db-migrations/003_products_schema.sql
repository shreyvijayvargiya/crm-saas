-- TUFF+ INTEGRATOR - Products Schema
-- Database: Supabase (Neon Postgres)
-- This migration creates tables for Products and Items only

-- Item Type Enum
CREATE TYPE item_type_enum AS ENUM (
    'RAW_MATERIAL',
    'SUBASSEMBLY',
    'HOUSE_KIT',
    'SERVICE',
    'CONSUMABLE',
    'PACKAGING'
);

-- Update existing item table with new columns
-- This migration handles both new installations and existing databases
DO $$ 
BEGIN
    -- Check if item table exists and has old structure
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'item') THEN
        -- First, create the enum type if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'item_type_enum') THEN
            CREATE TYPE item_type_enum AS ENUM (
                'RAW_MATERIAL',
                'SUBASSEMBLY',
                'HOUSE_KIT',
                'SERVICE',
                'CONSUMABLE',
                'PACKAGING'
            );
        END IF;

        -- Add new columns if they don't exist (we'll add them one by one to avoid conflicts)
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name = 'item' AND column_name = 'item_type_new') THEN
            ALTER TABLE item ADD COLUMN item_type_new item_type_enum;
        END IF;

        -- Migrate existing item_type to new enum
        UPDATE item 
        SET item_type_new = CASE 
            WHEN item_type::text = 'HOUSE_KIT' THEN 'HOUSE_KIT'::item_type_enum
            ELSE 'RAW_MATERIAL'::item_type_enum
        END
        WHERE item_type_new IS NULL;

        -- Drop old item_type column if it exists and rename new one
        IF EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'item' AND column_name = 'item_type' 
                  AND data_type != 'USER-DEFINED') THEN
            ALTER TABLE item DROP COLUMN item_type;
        END IF;
        
        IF EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'item' AND column_name = 'item_type_new') THEN
            ALTER TABLE item RENAME COLUMN item_type_new TO item_type;
        END IF;

        -- Add other new columns
        ALTER TABLE item 
            ADD COLUMN IF NOT EXISTS is_sales_item BOOLEAN DEFAULT false,
            ADD COLUMN IF NOT EXISTS is_purchase_item BOOLEAN DEFAULT false,
            ADD COLUMN IF NOT EXISTS is_manufactured_item BOOLEAN DEFAULT false,
            ADD COLUMN IF NOT EXISTS standard_cost DECIMAL(15, 2) DEFAULT 0.00,
            ADD COLUMN IF NOT EXISTS sales_price DECIMAL(15, 2) DEFAULT 0.00,
            ADD COLUMN IF NOT EXISTS weight_per_uom DECIMAL(15, 4),
            ADD COLUMN IF NOT EXISTS volume_per_uom DECIMAL(15, 4),
            ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

        -- Update price to sales_price if sales_price is 0 and price column exists
        IF EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'item' AND column_name = 'price') THEN
            UPDATE item 
            SET sales_price = price 
            WHERE sales_price = 0 AND price > 0;
        END IF;

        -- Set defaults for boolean flags based on item_type
        UPDATE item 
        SET is_sales_item = true 
        WHERE item_type = 'HOUSE_KIT'::item_type_enum AND is_sales_item = false;

        -- Rename is_active to active if needed
        IF EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'item' AND column_name = 'is_active') THEN
            ALTER TABLE item RENAME COLUMN is_active TO active;
        END IF;
    END IF;
END $$;

-- If item table doesn't exist, create it
CREATE TABLE IF NOT EXISTS item (
    item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_code VARCHAR(255) UNIQUE NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    item_type item_type_enum NOT NULL DEFAULT 'RAW_MATERIAL',
    is_sales_item BOOLEAN DEFAULT false,
    is_purchase_item BOOLEAN DEFAULT false,
    is_manufactured_item BOOLEAN DEFAULT false,
    standard_cost DECIMAL(15, 2) DEFAULT 0.00,
    sales_price DECIMAL(15, 2) DEFAULT 0.00,
    weight_per_uom DECIMAL(15, 4),
    volume_per_uom DECIMAL(15, 4),
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by_user_id UUID REFERENCES user_account(user_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_item_code ON item(item_code);
CREATE INDEX IF NOT EXISTS idx_item_type ON item(item_type);
CREATE INDEX IF NOT EXISTS idx_item_active ON item(active);
CREATE INDEX IF NOT EXISTS idx_item_sales ON item(is_sales_item);
CREATE INDEX IF NOT EXISTS idx_item_purchase ON item(is_purchase_item);
CREATE INDEX IF NOT EXISTS idx_item_manufactured ON item(is_manufactured_item);

-- Triggers to auto-update updated_at
DROP TRIGGER IF EXISTS update_item_updated_at ON item;
CREATE TRIGGER update_item_updated_at BEFORE UPDATE ON item
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
