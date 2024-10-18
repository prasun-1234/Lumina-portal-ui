const express = require('express');
const cors = require('cors');
const app = express();
const crypto = require('crypto');
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded data (submitted by the form)
app.use(express.urlencoded({ extended: true }));

// Example encryption key
const encryptionKey = Buffer.from('3oVt2w+MW1BZ0PgRgP9XJbNCy8J2QJ+nWtAOH2SwEE8=', 'base64');


// CORS middleware to allow specified origins
const allowedOrigins = [
   'http://luminascan.com',      // Your WordPress site
   'http://localhost:5173'      // Your React app
];

app.use(cors({
   origin: allowedOrigins,
   methods: ['GET', 'POST', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization']
}));

// In-memory user storage (replace with a database in a real app)
let users = [];

// Middleware for redirecting to a website
const redirectMiddleware = (req, res) => {
   const redirectUrl = 'http://localhost:5173/'; // Replace with your target URL
   res.redirect(redirectUrl);
};

// Function to decrypt data
// function decryptData(encryptedData, encryptionKey) {
//    // Define the cipher method
//    const cipherMethod = 'AES-256-CBC';

//    // Hash the key to match the PHP `hash('sha256', ...)`
//    const key = crypto.createHash('sha256').update(encryptionKey).digest();

//    // Decode the base64-encoded data
//    const encryptedBuffer = Buffer.from(encryptedData, 'base64');

//    // Extract the IV and encrypted data
//    const ivLength = 16; // AES-256-CBC uses a 16-byte IV
//    const iv = encryptedBuffer.slice(0, ivLength);
//    const encryptedText = encryptedBuffer.slice(ivLength);

//    // Create decipher object
//    const decipher = crypto.createDecipheriv(cipherMethod, key, iv);

//    // Decrypt the data
//    let decrypted = decipher.update(encryptedText, 'binary', 'utf8');
//    decrypted += decipher.final('utf8');

//    return decrypted;
// }

function decryptData(encryptedData, encryptionKey) {
   // Define the cipher method
   const cipherMethod = 'AES-256-CBC';

   // Hash the key to match the PHP `hash('sha256', ...)`
   const key = crypto.createHash('sha256').update(encryptionKey).digest();

   // Decode the base64-encoded data
   const encryptedBuffer = Buffer.from(encryptedData, 'base64');

   // Extract the IV and encrypted data
   const ivLength = 16; // AES-256-CBC uses a 16-byte IV
   const iv = encryptedBuffer.slice(0, ivLength);
   const encryptedText = encryptedBuffer.slice(ivLength);

   // Create decipher object
   const decipher = crypto.createDecipheriv(cipherMethod, key, iv);

   // Decrypt the data
   let decrypted = decipher.update(encryptedText, 'binary', 'utf8');
   decrypted += decipher.final('utf8');

   return decrypted;
}

// POST endpoint to handle the data from WordPress and create a user
app.post('/api/register', (req, res) => {
   const encrypted_email = req.body.email;
   const encrypted_password = req.body.password;

   console.log('Incoming Request Body:', req.body);

   if (!encrypted_email || !encrypted_password) {
      return res.status(400).json({ message: 'Missing user' });
   }

   // Decrypt the email and password
   // const email = decryptData(encrypted_email, encryptionKey);
   const password = decryptData(encrypted_password, encryptionKey);


   // Store the user data (this is just a simulation)
   const newUser = {
      email: email,
      password: password,
   };

   users.push(newUser); // Store the user (replace with a database save in real applications)
   console.log('User created:', newUser);

   // Redirect to the React application
   redirectMiddleware(req, res);
});

// New GET route to retrieve stored user data
app.get('/api/get-user', (req, res) => {
   try {
      if (users.length === 0) {
         return res.status(404).json({ message: 'No user data found' });
      }

      // Assuming you want to return the last created user for demonstration
      const lastUser = users[users.length - 1];

      res.json({
         message: 'User data retrieved successfully!',
         encrypted_email: lastUser.email,
         encrypted_password: lastUser.password,
      });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
   }
});

// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
