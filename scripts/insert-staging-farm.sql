-- Direct SQL to create Staging farm and test user
-- Password: fazenda123

-- First check if farm already exists
DO $$
BEGIN
    -- Create the farm if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM "Farm" WHERE name = 'Staging') THEN
        INSERT INTO "Farm" (id, name, address, phone, active, "createdAt", "updatedAt")
        VALUES (
            'cm5staging' || substr(md5(random()::text), 1, 10), 
            'Staging', 
            'Farm Staging Environment', 
            '(11) 99999-9999', 
            true, 
            NOW(), 
            NOW()
        );
    END IF;
END $$;

-- Then create the user with bcrypt hashed password
-- Password 'fazenda123' hashed with bcrypt (cost factor 10)
DO $$
DECLARE
    farm_id TEXT;
BEGIN
    -- Get the farm ID
    SELECT id INTO farm_id FROM "Farm" WHERE name = 'Staging' LIMIT 1;
    
    -- Create user if doesn't exist
    IF NOT EXISTS (SELECT 1 FROM "User" WHERE username = 'test_user') THEN
        INSERT INTO "User" (id, username, email, password, "fullName", role, active, "farmId", "createdAt", "updatedAt")
        VALUES (
            'cm5user' || substr(md5(random()::text), 1, 10), 
            'test_user', 
            'test@staging.fazenda.com', 
            -- This is the bcrypt hash for 'fazenda123'
            '$2a$10$w8FWH5KPmR3ph6uYp6xwOePQNil3qaJCbJn56NnvYrE5FJ1cUxgIu', 
            'Usuário de Teste', 
            'OWNER', 
            true, 
            farm_id, 
            NOW(), 
            NOW()
        );
    END IF;
END $$;

-- Verify the data was created
SELECT 'Farm created:' as message, name, id FROM "Farm" WHERE name = 'Staging';
SELECT 'User created:' as message, username, email, role FROM "User" WHERE username = 'test_user';