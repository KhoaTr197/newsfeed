-- Script to create a table named TEST and add sample data in MySQL

-- Create the TEST table
CREATE TABLE TEST (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    value INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data into the TEST table
INSERT INTO TEST (name, value) VALUES
('Item A', 10),
('Item B', 25),
('Item C', 5),
('Item D', 15),
('Item E', 20);