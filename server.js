require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;


// Use CORS middleware (allow all origins)
app.use(cors());

// Fetch the encryption key from environment variables
const secretKey = Buffer.from(process.env.ENCRIPTION_KEY, 'base64'); // Decode Base64 key

const algorithm = 'aes-256-cbc'; // Use AES 256 CBC

let storedUserData = {}; // In-memory storage for encrypted email and password

// Middleware to parse JSON request bodies
app.use(express.json());

// Function to encrypt data
const encrypt = (text) => {
   const iv = crypto.randomBytes(16); // Generate a random initialization vector
   const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
   let encrypted = cipher.update(text, 'utf8', 'base64');
   encrypted += cipher.final('base64');
   return iv.toString('base64') + ':' + encrypted; // Return IV + Encrypted data
};

// Function to decrypt data
const decrypt = (encryptedText) => {
   const [ivBase64, encryptedData] = encryptedText.split(':'); // Split IV and encrypted data
   const iv = Buffer.from(ivBase64, 'base64');
   const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
   let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
   decrypted += decipher.final('utf8');
   return decrypted;
};

// POST endpoint to register a user
app.post('/api/register', (req, res) => {
   try {
      const { email, password } = req.body;

      // Check if email and password are provided
      if (!email || !password) {
         return res.status(400).json({ message: 'Email and password are required' });
      }

      // Encrypt email and password
      const encryptedEmail = encrypt(email);
      const encryptedPassword = encrypt(password);

      // Store encrypted email and password in memory
      storedUserData = {
         email: encryptedEmail,
         password: encryptedPassword,
         originalEmail: email // Save plain email for login comparison
      };

      res.json({
         message: 'User registered successfully!',
         encryptedEmail: encryptedEmail,
         encryptedPassword: encryptedPassword,
      });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
   }
});

// GET endpoint to check if a user exists (by email)
app.get('/api/register', (req, res) => {
   try {
      const { email } = req.params;

      // Check if the user data exists
      if (!storedUserData || !storedUserData.email || !storedUserData.password) {
         return res.status(404).json({ message: 'No user data found' });
      }

      // Decrypt the stored email and compare it with the provided email
      const decryptedStoredEmail = decrypt(storedUserData.email);
      if (decryptedStoredEmail !== email) {
         return res.status(400).json({ message: 'Invalid email' });
      }

      res.json({
         message: 'User exists',
         email: decryptedStoredEmail,
      });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
   }
});

// POST endpoint to login a user (verify email and password)
app.post('/api/login', (req, res) => {
   try {
      const { email, password } = req.body;

      // Check if the user data exists
      if (!storedUserData || !storedUserData.email || !storedUserData.password) {
         return res.status(404).json({ message: 'No user data found' });
      }

      // Compare the provided email with the stored one (we use the plain email here)
      if (email !== storedUserData.originalEmail) {
         return res.status(400).json({ message: 'Invalid email' });
      }

      // Decrypt the stored password and compare it with the provided password
      const decryptedStoredPassword = decrypt(storedUserData.password);
      const decryptedStoredEmail = decrypt(storedUserData.email);
      if (decryptedStoredPassword !== password) {
         return res.status(400).json({ message: 'Invalid password' });
      }

      res.json({
         message: 'Login successful',
         email: decryptedStoredEmail,
         password: decryptedStoredPassword,
      });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
   }
});

// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
