const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

module.exports.userVerification = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ status: false });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ status: false });
    }

    return res.status(200).json({
      status: true,
      user: user.username,
    });

  } catch (err) {
    return res.status(401).json({ status: false });
  }
};
