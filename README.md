# Body Parts Ebay

## frontend (REACT)

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
