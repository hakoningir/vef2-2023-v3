CREATE TABLE courses(
    id SERIAL PRIMARY KEY,
    courseID VARCHAR(16) NOT NULL UNIQUE,
    departmentID INTEGER NOT NULL,
    title VARCHAR(64) NOT NULL UNIQUE, 
    credit REAL NOT NULL CONSTRAINT units_check CHECK (units > 0),
    semester semester NOT NULL,
    studylevel VARCHAR(128) DEFAULT NULL,
    url VARCHAR(256) DEFAULT NULL,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,  
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_department_id FOREIGN KEY (departmentID) REFERENCES departments(id)
);

CREATE TABLE public.departments(
    id SERIAL PRIMARY KEY,
    title VARCHAR(64) NOT NULL UNIQUE,
    slug VARCHAR(64) NOT NULL UNIQUE,
    description VARCHAR(1000) DEFAULT '',
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,  
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP    
);

CREATE TYPE semester AS ENUM('Heilsárs', 'Sumar', 'Vor', 'Haust');