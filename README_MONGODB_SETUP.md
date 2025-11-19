# MongoDB Setup and CRUD Operations Guide

## Prerequisites
1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - Windows: MongoDB should start automatically as a service
   - Mac/Linux: Run `mongod` command
3. Verify MongoDB is running on `localhost:27017`

## Database Connection
The application connects to MongoDB at: `mongodb://localhost:27017/campuskart`

## Collections Created

### 1. Users Collection
- Stores user signup/login data
- Fields: name, email, password, address, phone
- CRUD Operations:
  - **CREATE**: Signup creates new user
  - **READ**: Get user by ID
  - **UPDATE**: Update profile (name, email, address, phone, password)
  - **DELETE**: Delete user account

### 2. Orders Collection
- Stores all orders placed
- Fields: orderId, firstName, lastName, email, phone, address, city, state, postalCode, country, paymentMethod, items[], total, status, createdAt
- All orders are automatically saved to MongoDB when checkout is completed

### 3. Contacts Collection
- Stores contact form submissions
- Fields: name, email, phone, message

## Testing CRUD Operations

### 1. CREATE (Signup)
- Go to signup page
- Fill form and submit
- User is saved to MongoDB `users` collection
- Check MongoDB Compass to verify

### 2. READ (Login & Profile)
- Login reads user from MongoDB
- Profile page loads user data from MongoDB
- All data fetched from database

### 3. UPDATE (Edit Profile)
- Go to Account page
- Edit any field (name, email, address, phone)
- Change password (requires current password)
- Click "Save Changes"
- All updates saved to MongoDB immediately

### 4. DELETE (Delete Account)
- Go to Account page
- Click "Delete Account" button
- Confirm deletion
- User removed from MongoDB

## Verifying Data in MongoDB

### Using MongoDB Compass:
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select `campuskart` database
4. View collections:
   - `users` - All registered users
   - `orders` - All placed orders
   - `contacts` - Contact form submissions

### Using MongoDB Shell:
```bash
# Connect to MongoDB
mongosh

# Use database
use campuskart

# View all users
db.users.find()

# View all orders
db.orders.find()

# View specific user
db.users.findOne({email: "user@example.com"})

# Count orders
db.orders.countDocuments()
```

## API Endpoints

### User Endpoints:
- `POST /signup` - Create new user (saves to MongoDB)
- `POST /user/login` - Login user (reads from MongoDB)
- `GET /user/:id` - Get user by ID (reads from MongoDB)
- `PUT /user/:id` - Update user (updates MongoDB)
- `DELETE /user/:id` - Delete user (removes from MongoDB)

### Order Endpoints:
- `POST /orders` - Create order (saves to MongoDB)
- `GET /orders` - Get all orders (reads from MongoDB)
- `GET /orders/:id` - Get order by ID (reads from MongoDB)
- `PUT /orders/:id/status` - Update order status (updates MongoDB)

## Troubleshooting

### MongoDB Connection Issues:
1. Check if MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```

2. Verify connection string in `backend/server.js`

3. Check MongoDB logs for errors

### Login/Signup Not Working:
1. Ensure MongoDB is running
2. Check server console for errors
3. Verify database connection message appears
4. Check browser console for API errors

### Password Update Not Working:
1. Ensure you enter current password correctly
2. Check MongoDB to verify password was updated
3. Try logging out and back in with new password

## Notes
- All operations directly interact with MongoDB
- No data is stored only in localStorage (except session userId)
- All changes are persistent in database
- Password changes require current password verification

