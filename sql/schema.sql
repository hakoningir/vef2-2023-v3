CREATE TABLE department(
    nafn VARCHAR(64) PRIMARY KEY,
    lysing NOT NULL --VARCHAR(200)?
);

CREATE TABLE courses(
    nr INT,
    nafn VARCHAR(64),
    einingar INT,
    misseri VARCHAR(64),
    namsstig VARCHAR(64),
    slod VARCHAR(320),
    PRIMARY KEY (nr, nafn)
);