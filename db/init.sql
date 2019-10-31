-- seed data file

-- purchase_history should go first because the other tables are dependent on this table
DROP TABLE IF EXISTS purchase_history;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS users;


CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

INSERT INTO users
    (
    username, password, email
    )
VALUES
    ('thoover1', '$2b$12$HEjva0QfF7bWFSFIVoJZA.8dOqiNoFCeTZ.AHexC2MmeJawoukA2.', 'thoover1@uab.edu');

CREATE TABLE inventory
(
    part_id SERIAL PRIMARY KEY,
    part_name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL,
    quality TEXT NOT NULL,
    image TEXT NOT NULL
);

INSERT INTO inventory
    (part_name, price, quality, image)
VALUES
    ('pancreas', 7, 'D', 'http://pancreatic.org/wp-content/uploads/2015/06/Head_Body_Tail-02.jpg');

CREATE TABLE purchase_history
(
    purchase_id SERIAL PRIMARY KEY,
    purchase_date DATE DEFAULT NOW(),
    user_id INTEGER REFERENCES users(user_id),
    part_id INTEGER REFERENCES inventory(part_id)
);

INSERT INTO purchase_history
    (user_id, part_id)
VALUES
    (1, 1);


-- user purchase history on one table

-- SELECT * FROM users;
-- SELECT * FROM inventory;
SELECT users.user_id, username, password, purchase_date, part_name, inventory.part_id, price, quality, image
FROM users
    JOIN purchase_history
    ON (users.user_id = purchase_history.user_id)
    JOIN inventory
    ON (purchase_history.part_id = inventory.part_id); 