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
(1, 'Community Park Cleanup', 'Reviving local green spaces, collecting recyclables, and planting native trees.', 'Central Park', '2026-11-15'),
(1, 'Youth After-School Tutoring', 'Providing academic assistance in mathematics and reading for elementary students.', 'Community Center', '2026-11-20'),
(2, 'Green Harvest Workshop', 'Promoting sustainable urban agriculture and environmental conservation.', 'Eco Hub', '2026-11-25'),
(2, 'Tree Planting Initiative', 'Planting 500 new trees across urban districts to improve air quality.', 'North District', '2026-12-01'),
(3, 'Food Bank Logistics', 'Sorting, packaging, and distributing provisions to families in vulnerable situations.', 'Main Warehouse', '2026-11-18'),
(3, 'Emergency Meal Prep', 'Preparing hot meals for community members affected by recent weather events.', 'City Kitchen', '2026-11-22');

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
(1, 1), -- Community Park Cleanup -> Environmental Conservation
(2, 2), -- Youth After-School Tutoring -> Community Education
(3, 1), -- Green Harvest Workshop -> Environmental Conservation
(3, 2), -- Green Harvest Workshop -> Community Education
(4, 1), -- Tree Planting Initiative -> Environmental Conservation
(5, 3), -- Food Bank Logistics -> Food Security & Relief
(6, 3); -- Emergency Meal Prep -> Food Security & Relief