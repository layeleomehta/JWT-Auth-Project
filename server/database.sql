CREATE DATABASE authtodo; 

-- enabling the uuid generating extension
CREATE EXTENSION "uuid-ossp";

-- each user will have a unique id (which is the primary key), name, email and password. 
CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(), 
    user_name VARCHAR(255) NOT NULL, 
    user_email VARCHAR(255) NOT NULL UNIQUE, 
    user_password VARCHAR(255) NOT NULL, 
    PRIMARY KEY(user_id)
); 

INSERT INTO users(user_name, user_email, user_password) VALUES ('Laye Mehta', 'layeamehta@gmail.com', 'bajiraomastani'); 