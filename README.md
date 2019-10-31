# Body Parts Ebay

## frontend (REACT)

### dependencies

- axios
- redux
- react-redux
- react-router-dom
- http-proxy-middleware
- redux-promise-middleware
- node-sass

### routes

- login/register => '/' => AuthComponent.js
- Store => '/body_parts' => AvailableBodyParts.js
- Profile => '/profile' => Profile.js

### file-structure

- src/
  - Components/
    - AuthComponent.js
    - AvailableBodyParts.js
    - Profile.js
  - App.js
  - Index.js
  - Index.css => reset.css
  - setupProxy.js
  - ducks/
    - store.js
    - reducer.js

## backend (EXPRESS)

### dependencies

- express
- massive
- dotenv
- express-session
- bcrypt

### server file structure

- db/
- server/
  - index.js
  - controller/
    - userCtrl.js
    - inventoryCtrl.js
  - middleware/
    - sessionCheck.js

### endpoints

**User/auth**

- userSession: => GET => /auth/session
- register: => /auth/register
- logout: => /auth/logout
- login: => /auth/login

- addToCart: => POST => /api/add_to_cart
- getCart: => GET => /api/get_cart
- deleteFromCart: => DELETE => /api/delete_from_cart/:id
- updateEmail: => PUT => /api/update_email
- getPurchaseHistory: => GET => /api/purchase_history/:id

**inventory**

- showAllInventory: => GET => /api/inventory

### secrets

```text
CONNECTION_STRING
SESSION_SECRET
SERVER_PORT
```

# database (PostgreSQL)

- User Table

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
)
```

- Admin Table (icebox)

- Body Parts Inventory Table

```SQL
CREATE TABLE inventory (
    part_id SERIAL PRIMARY KEY,
    part_name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL,
    quality TEXT NOT NULL,
    image TEXT NOT NULL
)
```

- purchase history

```SQL
CREATE TABLE purchase_history (
    purchase_id SERIAL PRIMARY KEY,
    purchase_date DATE DEFAULT NOW(),
    user_id INTEGER REFERENCES users(user_id),
    part_id INTEGER REFERENCES inventory(part_id)
)
```

- user purchase history on one table

```SQL
-- SELECT * FROM users;
-- SELECT * FROM inventory;
SELECT users.user_id, username, password, purchase_date, part_name, inventory.part_id, price, quality, image
FROM users
    JOIN purchase_history
    ON (users.user_id = purchase_history.user_id)
    JOIN inventory
    ON (purchase_history.part_id = inventory.part_id);
```
