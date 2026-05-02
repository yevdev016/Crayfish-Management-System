import jwt from 'jsonwebtoken';
export const authenticateJWT = (req, res, next) => {
    const token = req.cookies.authToken;
    const secret = process.env.JWT_SECRET;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user; 
        next();
    });
};