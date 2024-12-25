const jwt = require('jsonwebtoken');

const authMiddleware = (request, response, next) => {
    // Extract token from cookies or Authorization header
    const token = request.cookies.token || request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return response.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to the request object
        request.user = decoded;
        // Proceed to the next middleware or route handler
        next();
        
    } catch (error) {
        console.error('Authentication error:', error.message);
        response.status(401).json({ error: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
