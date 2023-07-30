# Web-Programming-Project
The aim of this project is to create a user-friendly e-katanalotis collaborative system that facilitates user registration, searching, and evaluation of consumer goods offers in supermarkets. Our platform allows registered users to share information about products available at attractive prices, based on their own criteria. Our system provides stock information and includes all types of supermarkets, including local chains and mini-markets.  

## Features
**User Registration**: Users can create accounts and access the collaborative system.  

**Product Search**: Users can search for consumer goods offers based on specific criteria like price range, product type, and supermarket category.  

**Product Evaluation**: Registered users can evaluate and share their opinions on product offers, helping others make informed decisions.  

**Comprehensive Database**: includes stock information from various supermarkets.  

**Parallel Use with Existing Tools**: works in parallel with existing platforms like e-katanalotis, enhancing the range of available product data.  

## Map View and Store Offers
The system provides an interactive map view that enhances the user's shopping experience. Here's how it works:

1. **User-Centric Map Display**
The map automatically centers on the user's current location and showcases stores with active offers. Users can easily explore nearby supermarkets and find attractive deals based on their proximity.

2. **Store Search and Filtering**
To facilitate store discovery, users can search and filter stores by name. When a specific store name is entered, markers are displayed on the map, indicating stores with matching names and active offers. This feature streamlines the process of finding preferred stores and relevant deals.

3. **Offer Details on Click**
Upon clicking on a store's marker, a pop-up window appears, presenting comprehensive offer details. Users can view product names, prices, icons (indicating offer status), entry dates, likes/dislikes, and stock availability (yes/no). This clear display empowers users to make informed purchasing decisions.

4. **Evaluate and Rate Offers**
When users are within a 50-meter radius of a store, they have the opportunity to evaluate offers by clicking on the corresponding marker's pop-up window. A "Rating" button allows them to access a dedicated page displaying the list of offers for that store. Users can rate and submit new offers, further enriching the collaborative system with valuable insights.

The map view and store offer functionalities combine to create a dynamic and user-friendly environment, promoting efficient shopping and collaborative information sharing among users.

## Technologies Used
**Frontend**: HTML, CSS, JavaScript.  
**Backend**: Node.js.  
**Database**: SQLite.  

## Getting Started  
To run the **Web-Programming-Project**, follow the steps below:
1. **Installation**:
    - Clone this repository to your local machine.
2. **Python Scripts**:
   - Before starting the web application, ensure that you have Python installed on your system.
   - Run the required Python scripts to process data and generate necessary JSON and GeoJSON files. These scripts are responsible for generating items.json, prices.json, and new_data.geojson, which contain the stores' products, product prices, and store/POI information, respectively.
3. **Setting Up the Database**:
   - Ensure you have Node.js installed on your system.
   - Navigate to the project folder and run npm install to install the required Node.js dependencies, including Express, Express Handlebars, JSON Web Token, Body Parser, Cors, Node Schedule, and Sequelize.
   - The application uses a SQLite database to store and manage data. Run the following command to create the necessary tables in the database: node app.js
4. **Run the Web Server**:
   - After setting up the database successfully, the web server will listen on port 4242.
   - If the connection to the database is successful, the application will log a message and perform three essential operations: "calculateAveragePrice," "calculateScoreLikeDislike," and "calculateScoreOffer." These operations are crucial for the application's functionality.
5. **Access the Application**:
   - Once the web server is running, you can access the e-katanalotis collaborator web application by navigating to http://localhost:4242 in your web browser.






