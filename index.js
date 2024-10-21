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
const encryptionKey = '5f8d0a8e494bce2a44c83125bdf71f09';


// CORS middleware to allow specified origins
const allowedOrigins = [
   'http://luminascan.com',      
   'http://localhost:5173'     
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



var decrypt = function (encrypted, method, secret, hmac) {
   // Verify HMAC before decrypting
   const generatedHmac = crypto.createHmac('md5', secret).update(encrypted).digest('hex');

   if (generatedHmac === hmac) {
      // Extract IV from the encrypted data
      const iv = Buffer.from(encrypted.substr(0, 24), 'base64');

      // Create the decipher instance
      const decryptor = crypto.createDecipheriv(method, secret, iv);

      // Decrypt the remaining part of the encrypted data
      const decryptedData = decryptor.update(encrypted.substr(24), 'base64', 'utf8') + decryptor.final('utf8');
      return decryptedData;
   } else {
      throw new Error('HMAC validation failed');
   }
};

// Decrypt with timestamp validation
var decryptWithTSValidation = function (encrypted, method, secret, hmac, intervalThreshold) {
   const decrypted = decrypt(encrypted, method, secret, hmac);

   // Extract timestamp from decrypted message
   const year = parseInt(decrypted.substr(0, 4)),
      month = parseInt(decrypted.substr(5, 2)) - 1,  // Adjust for zero-based month index in JS Date
      day = parseInt(decrypted.substr(8, 2)),
      hour = parseInt(decrypted.substr(11, 2)),
      minute = parseInt(decrypted.substr(14, 2)),
      second = parseInt(decrypted.substr(17, 2));

   const msgDate = new Date(Date.UTC(year, month, day, hour, minute, second));
   const now = new Date();

   // Check if the message is within the allowed interval
   if (Math.round((now - msgDate) / 1000) <= intervalThreshold) {
      return decrypted.substr(19);  // Return data excluding timestamp
   } else {
      throw new Error('Timestamp validation failed');
   }
};

// POST endpoint to handle the data from WordPress and create a user
app.post('/api/register', (req, res) => {
   const encrypted_email = req.body.email;
   const encrypted_password = req.body.password;
   const hmac = req.body.hmac;

   console.log('Incoming Request Body:', req.body);

   // Check if the required fields are provided
   if (!encrypted_email || !encrypted_password || !hmac) {
      return res.status(400).json({ message: 'Missing user data or HMAC' });
   }

   try {
      const method = 'AES-256-CBC'; // Define the decryption method


      // Decrypt the email and password
      // const email = decryptWithTSValidation(encrypted_email, method, encryptionKey, hmac, 60 * 60 * 12); // 12-hour threshold for decryption validation
      const password = decryptWithTSValidation(encrypted_password, method, encryptionKey, hmac, 60 * 60 * 12);

      if (!encrypted_email || !password) {
         return res.status(500).json({ error: "Decryption failed. Invalid data or HMAC mismatch." });
      }

      // Store the decrypted user data
      const newUser = {
         email: encrypted_email,
         password: password,
      };

      users.push(newUser); // Store the user (replace this with actual database storage in real applications)
      console.log('User created:', newUser);

      // Redirect to the React application (if needed)
      redirectMiddleware(req, res);

   } catch (error) {
      // Handle decryption errors
      res.status(500).json({ error: "Decryption failed: " + error.message });
   }
});


// New GET route to retrieve stored user data
app.get('/api/get-user', (req, res) => {
   try {
      if (users.length === 0) {
         return res.status(404).json({ message: 'No user data found' });
      }

      // Get the last created user for demonstration
      const lastUser = users[users.length - 1];

      const method = 'aes-256-cbc'; // Define the decryption method
      const hmac = req.query.hmac; // Assuming HMAC is passed in query params

      if (!hmac) {
         return res.status(400).json({ message: 'HMAC is missing' });
      }

      // Decrypt the email and password
      const decrypted_email = decryptWithTSValidation(lastUser.email, method, encryptionKey, hmac, 60 * 60 * 12); // 12-hour threshold
      const decrypted_password = decryptWithTSValidation(lastUser.password, method, encryptionKey, hmac, 60 * 60 * 12);

      if (!decrypted_email || !decrypted_password) {
         return res.status(500).json({ message: 'Decryption failed. Invalid data or HMAC mismatch.' });
      }

      // Send the decrypted user data in the response
      res.json({
         message: 'User data retrieved successfully!',
         email: decrypted_email,
         password: decrypted_password,
      });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
   }
});


// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
