import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware to check for a valid JWT token
export function requireToken(req, res, next){

    // Get the token from the Authorization header 
    const authHeader = req.headers.authorization; 
    const token = authHeader && authHeader.split(" ")[1];

    // If there is no token, return an error 
    if (!token) {
        return res.status(401).json({
            message: "Authorization Failed: no token provided",
        });
    }

     // Verify the token and attach the user to the request object
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Authorization failed: invalid token",
            });
        }
        
        req.user = decoded;
        next();
    });
}