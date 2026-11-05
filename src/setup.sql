-- ========================================
-- Drop existing tables to allow re-running setup.sql safely
-- ========================================
DROP TABLE IF EXISTS public.project_category CASCADE;
DROP TABLE IF EXISTS public.project CASCADE;
DROP TABLE IF EXISTS public.category CASCADE;
DROP TABLE IF EXISTS public.organization CASCADE;

-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename) VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Project Table
-- ========================================
CREATE TABLE IF NOT EXISTS public.project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    date DATE,
    CONSTRAINT fk_organization 
        FOREIGN KEY (organization_id) 
        REFERENCES public.organization(organization_id) 
        ON DELETE CASCADE
);

-- ========================================
-- Insert sample data: Projects
-- ========================================
INSERT INTO public.project (organization_id, title, description, location, date) VALUES
-- BrightFuture Builders (Org 1)
(1, 'Community Park Cleanup', 'Reviving local green spaces, collecting recyclables, and planting native trees.', 'Central Park', '2026-11-15'),
(1, 'Youth After-School Tutoring', 'Providing academic assistance in mathematics and reading for elementary students.', 'Community Center', '2026-11-20'),
(1, 'Senior Center Digital Literacy', 'Teaching older adults how to use smartphones and connect with family.', 'Senior Center', '2026-11-25'),
(1, 'Neighborhood Playground Repair', 'Fixing swings, painting fences, and ensuring safe play areas for kids.', 'South District', '2026-12-02'),
(1, 'Shelter Painting and Renovation', 'Applying fresh paint and doing minor repairs at the local family shelter.', 'Hope Shelter', '2026-12-10'),

-- GreenHarvest Growers (Org 2)
(2, 'Green Harvest Workshop', 'Promoting sustainable urban agriculture and environmental conservation.', 'Eco Hub', '2026-11-25'),
(2, 'Tree Planting Initiative', 'Planting 500 new trees across urban districts to improve air quality.', 'North District', '2026-12-01'),
(2, 'Composting 101 Masterclass', 'Teaching residents how to turn organic household waste into nutrient-rich soil.', 'Community Garden', '2026-12-05'),
(2, 'School Urban Garden Setup', 'Building raised vegetable beds at local elementary schools.', 'Westside School', '2026-12-12'),
(2, 'Rainwater Harvesting Seminar', 'Demonstrating low-cost systems to collect and store rainwater for gardens.', 'Eco Hub', '2026-12-18'),

-- UnityServe Volunteers (Org 3)
(3, 'Food Bank Logistics', 'Sorting, packaging, and distributing provisions to families in vulnerable situations.', 'Main Warehouse', '2026-11-18'),
(3, 'Emergency Meal Prep', 'Preparing hot meals for community members affected by recent weather events.', 'City Kitchen', '2026-11-22'),
(3, 'Winter Clothing Drive', 'Collecting, sorting, and distributing coats and blankets for the winter season.', 'Central Hall', '2026-12-04'),
(3, 'Holiday Toy Distribution', 'Wrapping and handing out donated gifts to children in need.', 'Community Plaza', '2026-12-20'),
(3, 'Blood Donation Campaign Drive', 'Partnering with local clinics to host a community blood drive.', 'Health Center', '2026-12-28');

-- ========================================
-- Category Table
-- ========================================
CREATE TABLE IF NOT EXISTS public.category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- ========================================
-- Project-Category Junction Table (Many-to-Many)
-- ========================================
CREATE TABLE IF NOT EXISTS public.project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project 
        FOREIGN KEY (project_id) 
        REFERENCES public.project(project_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_category 
        FOREIGN KEY (category_id) 
        REFERENCES public.category(category_id) 
        ON DELETE CASCADE
);

-- ========================================
-- Insert sample data: Categories
-- ========================================
INSERT INTO public.category (name) VALUES
('Environmental Conservation'),
('Community Education'),
('Food Security & Relief');

-- ========================================
-- Insert sample data: Project-Category Associations
-- ========================================
INSERT INTO public.project_category (project_id, category_id) VALUES
(1, 1), (2, 2), (3, 2), (4, 1), (5, 3),
(6, 1), (7, 1), (8, 1), (9, 2), (10, 1),
(11, 3), (12, 3), (13, 3), (14, 2), (15, 3);