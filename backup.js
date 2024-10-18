const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware (allow all origins)
app.use(cors());

app.use(cors({
   origin: 'http://luminascan.com.com' // Allow your WordPress site to make API calls
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded data (submitted by the form)
app.use(express.urlencoded({ extended: true }));

// Function to decrypt data
// function decrypt_data(encrypted_data) {
//    const encryption_key = 'vi0SBgjS+3AaGJGj0T2kJI0nCuksIZ0MIVHMKAD2Tl4='; // Decoded encryption key
//    const cipher = 'aes-256-cbc';
//    const encryption_key_buffer = Buffer.from(encryption_key, 'base64');

//    // Check if encrypted_data is in the correct format
//    if (typeof encrypted_data !== 'string' || !encrypted_data.includes('::')) {
//       throw new Error("Invalid input: encrypted_data must be in the format 'encrypted_text::iv'");
//    }

//    // Split the encrypted data and the IV
//    const [encrypted_text, iv] = encrypted_data.split('::');

//    // Ensure the IV is valid
//    const ivBuffer = Buffer.from(iv, 'base64');
//    if (ivBuffer.length !== 16) {
//       throw new Error("Invalid IV: The IV must be 16 bytes long.");
//    }

//    // Decrypt the data
//    const decipher = crypto.createDecipheriv(cipher, encryption_key_buffer, ivBuffer);
//    let decrypted = decipher.update(encrypted_text, 'base64', 'utf8');
//    decrypted += decipher.final('utf8');

//    return decrypted;
// }
const secretKey = Buffer.from('vi0SBgjS+3AaGJGj0T2kJI0nCuksIZ0MIVHMKAD2Tl4=', 'base64');;
const algorithm = 'aes-256-cbc';
const decrypt = (encryptedText) => {
   const [ivBase64, encryptedData] = encryptedText.split(':'); // Split IV and encrypted data
   const iv = Buffer.from(ivBase64, 'base64');
   const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
   let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
   decrypted += decipher.final('utf8');
   return decrypted;
};

// function decryptData(encryptedString) {
//    const encryptionKey = Buffer.from('vi0SBgjS+3AaGJGj0T2kJI0nCuksIZ0MIVHMKAD2Tl4=', 'base64'); // Base64-decoded key
//    const cipher = 'aes-256-cbc';

//    // Split the encrypted string into encrypted data and IV
//    const [encryptedDataBase64, ivBase64] = encryptedString.split('::');

//    if (!encryptedDataBase64 || !ivBase64) {
//       throw new Error('Invalid encrypted string format. Expected "encryptedData::iv".');
//    }

//    // Decode base64-encoded encrypted data and IV
//    const encryptedData = Buffer.from(encryptedDataBase64, 'base64');
//    const iv = Buffer.from(ivBase64, 'base64');

//    // Ensure IV has the correct length for aes-256-cbc (16 bytes)
//    if (iv.length !== 16) {
//       throw new Error('Invalid IV length. Expected 16 bytes.');
//    }

//    // Create a decipher with the encryption key and IV
//    const decipher = crypto.createDecipheriv(cipher, encryptionKey, iv);

//    // Decrypt the data
//    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
//    decrypted += decipher.final('utf8');

//    return decrypted;
// }

// POST endpoint to handle the data from WordPress
app.post('/api/register', (req, res) => {
   const encrypted_email = req.body.email;
   const encrypted_password = req.body.password;

   // Log the incoming request body
   console.log('Incoming Request Body:', req.body);

   if (!encrypted_email || !encrypted_password) {
      return res.status(400).json({ message: 'Missing user' });
   }
   // Simulate saving the encrypted data (In real-world applications, save it in the database)
   global.userData = {
      encrypted_email,
      encrypted_password,
   };

   // const decryptedEmail = decrypt(encrypted_email);
   // const decryptedPassword = decrypt(encrypted_password);

   // console.log('Encrypted Email:', decryptedEmail);
   // console.log('Encrypted Email:', decryptedPassword);

   res.status(200).json({ message: 'User registration data received' });
   // try {
   //    const { encrypted_email, encrypted_password } = req.body;

   //    if (!encrypted_email || !encrypted_password) {
   //       return res.status(400).json({ message: 'Encrypted email and password are required' });
   //    }
   //    // Simulate saving the encrypted data (In real-world applications, save it in the database)
   //    global.userData = {
   //       encrypted_email,
   //       encrypted_password,
   //    };
   //    const decryptedEmail = decrypt_data(encrypted_email);
   //    const decryptedPassword = decrypt_data(encrypted_password);

   //    res.json({
   //       message: 'Decryption successful!',
   //       decrypted_email: decryptedEmail,
   //       decrypted_password: decryptedPassword,
   //    });
   // } catch (error) {
   //    res.status(500).json({ message: 'Server error', error: error.message });
   // }
});

// New GET route to retrieve stored user data
app.get('/api/get-user', (req, res) => {
   try {
      if (!global.userData) {
         return res.status(404).json({ message: 'No user data found' });
      }


      // Send back the stored encrypted email and password
      res.json({
         message: 'User data retrieved successfully!',
         encrypted_email: global.userData.encrypted_email,
         encrypted_password: global.userData.encrypted_password,
      });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
   }
});


// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);

});
