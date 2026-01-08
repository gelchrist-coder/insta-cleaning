-- Run this in MySQL Workbench (Query tab) to create the database and a dedicated app user.
-- IMPORTANT: Change the password below before running.
-- NOTE: Do NOT URL-encode the password here. URL-encoding is only for the DATABASE_URL in .env.

CREATE DATABASE IF NOT EXISTS insta_cleaning
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Create a dedicated user for the app (recommended)
CREATE USER IF NOT EXISTS 'insta_cleaning_app'@'localhost'
  IDENTIFIED BY 'CHANGE_ME_STRONG_PASSWORD';

-- Ensure password matches even if the user already existed
ALTER USER 'insta_cleaning_app'@'localhost'
  IDENTIFIED BY 'CHANGE_ME_STRONG_PASSWORD';
-- Some tools connect via TCP to 127.0.0.1; create that host variant too.
CREATE USER IF NOT EXISTS 'insta_cleaning_app'@'127.0.0.1'
  IDENTIFIED BY 'CHANGE_ME_STRONG_PASSWORD';

-- Ensure password matches even if the user already existed
ALTER USER 'insta_cleaning_app'@'127.0.0.1'
  IDENTIFIED BY 'CHANGE_ME_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON insta_cleaning.* TO 'insta_cleaning_app'@'localhost';
GRANT ALL PRIVILEGES ON insta_cleaning.* TO 'insta_cleaning_app'@'127.0.0.1';
FLUSH PRIVILEGES;

-- If your Next.js app runs in Docker or another machine, use '%' instead of 'localhost':
-- CREATE USER IF NOT EXISTS 'insta_cleaning_app'@'%' IDENTIFIED BY 'CHANGE_ME_STRONG_PASSWORD';
-- GRANT ALL PRIVILEGES ON insta_cleaning.* TO 'insta_cleaning_app'@'%';
