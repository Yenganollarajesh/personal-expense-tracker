 const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log("Headers:", req.headers);
  const token = req.header('authorization')?.split(' ')[1];
  console.log("Token:", token);

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);  
    req.user = { id: decoded.userId }; 
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};


