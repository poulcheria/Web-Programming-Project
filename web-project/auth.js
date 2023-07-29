const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  // Get the JWT from the request header
  let token = req.headers["x-access-token"];
 

  console.log('tokennn: ', token);
  // Verify the JWT using the secret key
  jwt.verify(token, "veryverysecret" , (err, decoded) => {
    if (err) {
      // If the JWT is invalid, return an error
      return res.status(401).json({ error: 'Invalid JWT' });
    }

    // If the JWT is valid, set the user ID in the request object
    req.userId = decoded.id;

    // Call the next middleware function
    next();
  });
};

module.exports = verifyJWT;
