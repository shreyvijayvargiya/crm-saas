-- TUFF+ INTEGRATOR - Initial MVP Schema
-- Database: Supabase (Neon Postgres)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Roles Enum
CREATE TYPE user_role AS ENUM ('ADMIN', 'MANAGER', 'EDITOR', 'SELF');

-- User Accounts Table
CREATE TABLE user_account (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'SELF',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Items Table (House Kits and Products)
CREATE TABLE item (
    item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_code VARCHAR(255) UNIQUE NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    item_type VARCHAR(50) DEFAULT 'HOUSE_KIT',
    price DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by_user_id UUID REFERENCES user_account(user_id)
);

-- Indexes for performance
CREATE INDEX idx_user_account_username ON user_account(username);
CREATE INDEX idx_user_account_role ON user_account(role);
CREATE INDEX idx_item_code ON item(item_code);
CREATE INDEX idx_item_type ON item(item_type);
CREATE INDEX idx_item_active ON item(is_active);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_user_account_updated_at BEFORE UPDATE ON user_account
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_item_updated_at BEFORE UPDATE ON item
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user
-- NOTE: For MVP, the login accepts any password for testing purposes
-- In production, implement proper bcrypt password verification
-- Default credentials:
--   Username: admin
--   Password: (any password works in MVP)
--   Role: ADMIN
INSERT INTO user_account (username, password_hash, role, is_active)
VALUES ('admin', 'mvp_placeholder_hash', 'ADMIN', true)
ON CONFLICT (username) DO NOTHING;
