-- TUFF+ INTEGRATOR - Master Data Schema
-- Database: Supabase (Neon Postgres)
-- This migration creates tables for Entity, Contact, EntityRole, and updates UserAccount

-- Entity Type Enum (Company or Individual/Person)
CREATE TYPE entity_type AS ENUM ('COMPANY', 'INDIVIDUAL');

-- Entity Status Enum
CREATE TYPE entity_status AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- Relationship Type Enum
CREATE TYPE relationship_type AS ENUM (
    'CUSTOMER',
    'BUILDER',
    'CET_SUPPLIER',
    'DISTRIBUTOR',
    'MANUFACTURING_PARTNER'
);

-- Access Scope Enum (for user accounts)
CREATE TYPE access_scope AS ENUM ('SINGLE_COMPANY', 'ALL_COMPANIES');

-- Tenant/Organization Table (for multi-tenancy)
CREATE TABLE tenant (
    tenant_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Entity Table (represents Company or Individual)
-- This is the internal "Entity" concept, but UI shows as "Company" or "Person"
CREATE TABLE entity (
    entity_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type entity_type NOT NULL,
    legal_name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    default_currency VARCHAR(3) DEFAULT 'USD',
    status entity_status DEFAULT 'ACTIVE',
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by_user_id UUID REFERENCES user_account(user_id)
);

-- Entity Role Table (links Entity to Tenant with relationship type)
-- This represents the business relationship between an Entity and a Tenant
CREATE TABLE entity_role (
    entity_role_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_id UUID NOT NULL REFERENCES entity(entity_id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
    relationship_type relationship_type NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(entity_id, tenant_id, relationship_type)
);

-- Contact Table (represents people/contacts linked to an Entity)
CREATE TABLE contact (
    contact_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_id UUID NOT NULL REFERENCES entity(entity_id) ON DELETE CASCADE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    job_title VARCHAR(255),
    is_primary_contact BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Update UserAccount to link to Contact and add access scope
-- Add columns to existing user_account table
ALTER TABLE user_account
    ADD COLUMN IF NOT EXISTS contact_id UUID REFERENCES contact(contact_id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenant(tenant_id) ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS access_scope access_scope DEFAULT 'SINGLE_COMPANY',
    ADD COLUMN IF NOT EXISTS entity_id UUID REFERENCES entity(entity_id) ON DELETE SET NULL;

-- Address Table (for Entity addresses)
CREATE TABLE address (
    address_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_id UUID NOT NULL REFERENCES entity(entity_id) ON DELETE CASCADE,
    address_type VARCHAR(50) DEFAULT 'PRIMARY', -- PRIMARY, BILLING, SHIPPING, etc.
    street_address TEXT,
    city VARCHAR(255),
    state_province VARCHAR(255),
    postal_code VARCHAR(50),
    country VARCHAR(100),
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_entity_type ON entity(entity_type);
CREATE INDEX idx_entity_status ON entity(status);
CREATE INDEX idx_entity_created_at ON entity(created_at);
CREATE INDEX idx_entity_role_entity ON entity_role(entity_id);
CREATE INDEX idx_entity_role_tenant ON entity_role(tenant_id);
CREATE INDEX idx_entity_role_relationship ON entity_role(relationship_type);
CREATE INDEX idx_contact_entity ON contact(entity_id);
CREATE INDEX idx_contact_email ON contact(email);
CREATE INDEX idx_user_account_contact ON user_account(contact_id);
CREATE INDEX idx_user_account_tenant ON user_account(tenant_id);
CREATE INDEX idx_address_entity ON address(entity_id);

-- Triggers to auto-update updated_at
CREATE TRIGGER update_entity_updated_at BEFORE UPDATE ON entity
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_entity_role_updated_at BEFORE UPDATE ON entity_role
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_address_updated_at BEFORE UPDATE ON address
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tenant_updated_at BEFORE UPDATE ON tenant
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default tenant (for MVP - single tenant)
-- In production, this would be created per organization
INSERT INTO tenant (tenant_id, tenant_name, is_active)
VALUES ('00000000-0000-0000-0000-000000000001', 'Default Tenant', true)
ON CONFLICT DO NOTHING;
