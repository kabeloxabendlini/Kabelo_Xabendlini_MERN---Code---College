// AuthController.js
module.exports = {
  Signup: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({ message: 'All fields are required' });
      }
      // ... your signup logic
      res.status(201).json({ message: 'User signed up successfully', success: true });
    } catch (error) {
      console.error(error);
    }
  },

  Login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({ message: 'All fields are required' });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ message: 'Incorrect password or email' });
      }
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return res.json({ message: 'Incorrect password or email' });
      }
      const token = createSecretToken(user._id);
      res.cookie('token', token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.status(201).json({ message: 'User logged in successfully', success: true });
    } catch (error) {
      console.error(error);
    }
  },
};
