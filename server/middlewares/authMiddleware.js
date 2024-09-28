const jwt = require('jsonwebtoken');

const authMiddleware = (role) => {
    
    return async (req, res, next) => {
        
        
        const authHeader = req.header('Authorization');
        let token;
        

        // Check for token in the Authorization header
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
        // If no token in Authorization header, check cookies
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else {
            return res.status(401).json({
                success: false,
                message: 'Access Denied: No token provided',
            });
        }

        try {
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            

            req.user = decoded;
            
            

            // Check for role if necessary
            if (role && req.user.role !== role) {
                return res.status(403).json({
                    success: false,
                    message: 'Access Denied: Invalid role',
                });
            }

            
            next();
            
            return;
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Access Denied: Invalid token',
            });
        }
    };
};

module.exports = authMiddleware;
