# Web-Programming-Project
The aim of this project is to create a user-friendly e-katanalotis collaborative system that facilitates user registration, searching, and evaluation of consumer goods offers in supermarkets. Our platform allows registered users to share information about products available at attractive prices, based on their own criteria. Our system provides stock information and includes all types of supermarkets, including local chains and mini-markets.  

## Features
**User Registration**: Users can create accounts and access the collaborative system.  

**Product Search**: Users can search for consumer goods offers based on specific criteria like price range, product type, and supermarket category.  

**Product Evaluation**: Registered users can evaluate and share their opinions on product offers, helping others make informed decisions.  

**Comprehensive Database**: includes stock information from various supermarkets.  

**Parallel Use with Existing Tools**: works in parallel with existing platforms like e-katanalotis, enhancing the range of available product data.  

## Technologies Used
**Frontend**: HTML, CSS, JavaScript.  
**Backend**: Node.js.  
**Database**: SQLite.  

## Getting Started  
To run the **Web-Programming-Project**, follow the steps below:
1. **Installation**:
    - Clone this repository to your local machine.
3. **Python Scripts**:
   -Before starting the web application, ensure that you have Python installed on your system.
   -Run the required Python scripts to process data and generate necessary JSON and GeoJSON files. These scripts are responsible for generating items.json, prices.json, and new_data.geojson, which contain the stores' products, product prices, and store/POI information, respectively.
4. **Setting Up the Database**:
   -Ensure you have Node.js installed on your system.
   -Navigate to the project folder and run npm install to install the required Node.js dependencies, including Express, Express Handlebars, JSON Web Token, Body Parser, Cors, Node Schedule, and Sequelize.
   -The application uses a SQLite database to store and manage data. Run the following command to create the necessary tables in the database: node app.js
5. **Run the Web Server**:
   -After setting up the database successfully, the web server will listen on port 4242.
   -If the connection to the database is successful, the application will log a message and perform three essential operations: "calculateAveragePrice," "calculateScoreLikeDislike," and "calculateScoreOffer." These operations are crucial for the application's functionality.
6. **Access the Application**:
   -Once the web server is running, you can access the e-katanalotis collaborator web application by navigating to http://localhost:4242 in your web browser.






