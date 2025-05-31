const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const StoreOwner = require('./models/StoreOwner');
const StoreProduct = require('./models/StoreProduct');

const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
mongoose.connect(
  'mongodb+srv://akashbhosale043:BmxsrKdKJ3yTGSb2@userlogin.1ex5xuv.mongodb.net/Users?retryWrites=true&w=majority&appName=UserLogin',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => {
  console.log('MongoDB connected');
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
})
.catch((err) => {
  console.error('MongoDB connection failed:', err.message);
});

// POST /login
app.post('/login', async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // No user exists → create one
      user = new User({ userName, email, password });
      await user.save();
      return res.status(201).json({ message: 'New user created and logged in', userId: user._id });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // res.json({ message: 'Login successful', userId: user._id });
    res.json({ message: 'Login successful', userId: user._id, email: user.email, userName: user.userName });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

//Add to cart Route
app.post('/add-to-cart', async (req, res) => {
  const { userId, asin, title, image, price } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if item is already in the cart
    const existingItem = user.cart.find((item) => item.asin === asin);
    
    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity
    } else {
      user.cart.push({ asin, title, image, price });
    }

    await user.save();

    res.status(200).json({ message: 'Item added to cart', cart: user.cart });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

//user cart
app.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ cart: user.cart });
  } catch (err) {
    console.error('Fetch cart error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Signup route
app.post('/storeowner/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await StoreOwner.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already exists' });

    const newOwner = new StoreOwner({ name, email, password });
    await newOwner.save();
    res.status(201).json({ message: 'Signup successful', ownerId: newOwner._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login route
app.post('/storeowner/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const owner = await StoreOwner.findOne({ email });
    if (!owner || owner.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', ownerId: owner._id, name: owner.name });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

//Store Product 
app.post('/storeowner/upload-product', async (req, res) => {
  const {
    ownerId,
    name,
    description,
    quantity,
    category,
    brand,
    tags,
    price,
    image,
  } = req.body;
  console.log('Incoming product:', req.body); // Add this line

  try {
    const product = new StoreProduct({
      ownerId,
      name,
      description,
      quantity,
      category,
      brand,
      tags,
      price,
      image,
    });

    await product.save();
    res.status(201).json({ message: 'Product uploaded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload product', error: err.message });
  }
});

//Store ouner uploaded products page
app.get('/storeowner/products/:ownerId', async (req, res) => {
  const { ownerId } = req.params;
  try {
    const products = await StoreProduct.find({ ownerId });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
});

//Dispalying the product at home page
// Get all store products
app.get('/storeowner/products', async (req, res) => {
  try {
    const products = await StoreProduct.find(); // assuming your model is StoreProduct
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
});




