const crypto = require('crypto');

const key = crypto.randomBytes(32).toString('base64');
console.log(key);



// const express = require('express');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const app = express();
// require('dotenv').config();
// const PORT = process.env.PORT || 3000;

// const secretKey = Buffer.from(process.env.ENCRIPTION_KEY, 'base64');;
// const algorithm = 'aes-256-cbc';

// let storedUserData = {}; // In-memory storage for encrypted email and password

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Function to encrypt data
// const encrypt = (text) => {
//    const iv = crypto.randomBytes(16); // Generate a random initialization vector
//    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
//    let encrypted = cipher.update(text, 'utf8', 'base64');
//    encrypted += cipher.final('base64');
//    return iv.toString('base64') + ':' + encrypted; // Return IV + Encrypted data
// };

// // Function to decrypt data
// const decrypt = (encryptedText) => {
//    const [ivBase64, encryptedData] = encryptedText.split(':'); // Split IV and encrypted data
//    const iv = Buffer.from(ivBase64, 'base64');
//    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
//    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
//    decrypted += decipher.final('utf8');
//    return decrypted;
// };

// // POST endpoint to register a user
// app.post('/api/register', async (req, res) => {
//    try {
//       const { email, password } = req.body;

//       // Check if email and password are provided
//       if (!email || !password) {
//          return res.status(400).json({ message: 'Email and password are required' });
//       }

//       // Encrypt password and email with HASHING ALGORITHM
//       // const saltRounds = 10;
//       // const hashedPassword = await bcrypt.hash(password, saltRounds);
//       // const hashedEmail = await bcrypt.hash(email, saltRounds);

//       // Encrypt email and password
//       const encryptedEmail = encrypt(email);
//       const encryptedPassword = encrypt(password);

//       // Store encrypted email and password in memory
//       storedUserData = {
//          email: encryptedEmail,
//          password: encryptedPassword,
//          originalEmail: email // Save plain email for login comparison
//       };

//       res.json({
//          message: 'User registered successfully!',
//          encryptedEmail: hashedEmail,
//          encryptedPassword: hashedPassword,
//       });
//    } catch (error) {
//       res.status(500).json({ message: 'Server error', error: error.message });
//    }
// });

// // POST endpoint to login a user (verify email and password)
// app.post('/api/login', async (req, res) => {
//    try {
//       const { email, password } = req.body;

//       // Check if the user data exists
//       // if (!storedUserData || !storedUserData.email || !storedUserData.password) {
//       //    return res.status(404).json({ message: 'No user data found' });
//       // }

//       // Compare the provided email with the stored one (we use the plain email here)
//       if (email !== storedUserData.originalEmail) {
//          return res.status(400).json({ message: 'Invalid email' });
//       }

//       // Compare the provided password with the stored hashed password
//       // const isPasswordMatch = await bcrypt.compare(password, storedUserData.password);
//       // const isEmailMatch = await bcrypt.compare(email, storedUserData.email);

//       // Decrypt the stored password and compare it with the provided password
//       const decryptedStoredPassword = decrypt(storedUserData.password);
//       const decryptedStoredEmail = decrypt(storedUserData.email);

//       if (decryptedStoredPassword !== password) {
//          return res.status(400).json({ message: 'Invalid password' });
//       }

//       if (!isPasswordMatch) {
//          return res.status(400).json({ message: 'Invalid password' });
//       }
//       if (!isEmailMatch) {
//          return res.status(400).json({ message: 'Invalid email' });
//       }

//       res.json({
//          message: 'Login successful',
//          email: decryptedStoredEmail,
//          password: decryptedStoredPassword
//       });
//    } catch (error) {
//       res.status(500).json({ message: 'Server error', error: error.message });
//    }
// });

// // Start the server
// app.listen(PORT, () => {
//    console.log(`Server is running on http://localhost:${PORT}`);
// });




let modal = document.querySelector("#scheduleForm");
let newsletter = document.querySelector("#newsletter-form")
const html = document.querySelector("html");
let mailBtn = document.querySelector('#gform_submit_button_2');
if (modal) {
   let scheduleBtns = document.querySelectorAll(".schedule-btn,.plan-footer .button,.scan-plan .button-outline")
   let closeBtn = modal.querySelector(".close");
   const contAll = document.querySelectorAll('.form-modal .modal-right #gform_fields_1 *');
   contAll.forEach(e => {
      e.classList.add('modalRightAnim');
   })

   scheduleBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
         e.preventDefault();
         modal.classList.add("active")
         modal.setAttribute("tabindex", 1)
         modal.querySelectorAll("input,select,button,a")[0].focus();
         html.style.overflow = 'hidden';
      })
   })
   window.addEventListener("keyup", (e) => {
      if (e.key == "Escape") {
         modal.classList.remove("active")
         modal.classList.remove("disableScanType")
         modal.classList.remove("disableAddons")
         html.style.overflow = 'auto';
      }
   })
   closeBtn.addEventListener("click", (e) => {
      modal.classList.remove("active")
      modal.classList.remove("disableScanType")
      modal.classList.remove("disableAddons")
      html.style.overflow = 'auto';
   })
}

if (newsletter) {
   if (document.querySelector("#newsletter-main")) {
      document.querySelector("#newsletter-main").append(newsletter);
   } else {
      newsletter.style.display = "none"
   }
}

mailBtn.addEventListener("click", () => {
   let spinner = document.querySelector('#grom_ajax_spinner_2');
   console.log(spinner);
   
});




