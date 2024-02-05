# Face Recognition Project with React, Express, Knex, PG, and Clarifai API

## Overview

Welcome to the Face Recognition project! This project utilizes a combination of technologies to implement face recognition functionality. The key components include:

- React: Front-end library for building user interfaces.
- Express: Back-end framework for building web applications and APIs.
- Knex: SQL query builder for Node.js.
- PG: PostgreSQL database driver for Node.js.
- Clarifai API: Face recognition API for detecting and analyzing faces.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the Repository:**
   ```
   git clone https://github.com/pouyanzar/facerecognition.git
   cd facerecognition
   ```

2. **Install Dependencies:**
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Set Up PostgreSQL Database:**

   Create a PostgreSQL database.
   Update the server.js file with your database configuration.
   
4. **Set Up Clarifai API:**

   Obtain API keys from Clarifai by creating an account.
   Update the backend/controllers/image.js file with your Clarifai API key.

   
5. **Start the Application:**
   ```
   cd server
   npm start
   cd ../frontend
   npm start
   ```

6. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000` to use the face recognition application.

## Project Structure

The project structure is organized as follows:

- **frontend:** Contains the React front-end code.
- **backend:** Contains the Express back-end code and server configuration.
- **backend/server:** Manages database-related functionalities using Knex.
- **backend/controllers:** Handles HTTP request handling and response generation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Happy coding! 🚀
