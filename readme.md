# 🐾 PetAdopt

PetAdopt is a web application designed to connect animal shelters with adopters, streamlining the adoption process to help pets find loving homes. The platform allows users to browse available pets, add favorites, and contact shelters, while shelters can manage pet listings and communicate with potential adopters.  

🎥 **[Quick Demo](https://youtu.be/daxerr8_VXA?si=FNyuhZ6dinvD2Ld6)**  

---

## ✨ Key Features:
- 🐶 **Browse Pets**: Explore pets available for adoption.  
- ❤️ **Favorites**: Add and remove pets from your favorites list.  
- 🛠️ **Admin Dashboard**: Manage pet listings with ease.  
- 🔍 **Advanced Filtering**: Filter pets by type, location, and age.  
- 📧 **Direct Contact**: Contact shelters directly from pet listings.  

---

## 🛠️ Getting Started

### **Prerequisites**
Before you begin, ensure the following tools and accounts are ready:  
- **Node.js**: [Download and install Node.js](https://nodejs.org).  
- **MongoDB**: Set up a local or cloud MongoDB instance (e.g., [MongoDB Atlas](https://www.mongodb.com/atlas)).  
- **Cloudinary**: [Create a free Cloudinary account](https://cloudinary.com/) for image uploads.  

---

## 📦 Installation

### 1. Clone the repository:

git clone <repository-link>
cd petAdopt

### 2. Install dependencies:

    -server:
    cd server
    npm install express mongoose cors dotenv

    - client:
    cd client
    npm install axios 

### 3.Set up environment variables:
    Create a .env file in the root directory and add the following:
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>

# ▶️ Run the application
   npm run dev
   Open http://localhost:5173 in your browser.

# 💻 Tech Stack
	•	Frontend: React.js.
	•	Backend: Node.js with Express.js for routing and API logic.
	•	Database: MongoDB for storing user, pet, and shelter information.
	•	Authentication: JSON Web Tokens (JWT) for secure user sessions.
	•	Cloudinary: For managing and storing uploaded pet images.
	•	Mapping: Leaflet.js for an interactive map displaying shelter locations.
	•	Others: Axios.   

	
	
    
    
# 🧪 Backend Improvements - Patrick

For my part of the project, I worked on improving the backend, fixing some issues, and adding tests.

What I changed

* Split server.js into two files, app.js and server.js, to make the code easier to organize and test.
* Fixed an issue where searching for a pet that didn’t exist returned the wrong status code.
* Improved how the backend handles errors.
* Fixed the authentication so invalid tokens return the correct status code.
* Made sure only shelters can add pets, not adopters.

Testing

I used Jest and Supertest to test the backend.

I created three test files:

* authController.test.js - Tests registration and login.
* authMiddleware.test.js - Tests valid, invalid, and missing tokens.
* pets.test.js - Tests getting pets, adding pets, and handling errors.

I tested both when things work correctly and when something goes wrong.

In total, I added 17 tests, and all 17 are passing.

How to run the tests

Go to the server folder:

cd server

⬇️ Install dependencies:

npm install

Run the tests:

npm test

Summary

My main goal was to make the backend work better and be easier to maintain. I also added tests to help catch errors if changes are made to the code later.

