import express from "express";
import UserService from '../services/userService.js';

const router = express.Router();

router.get('/getUserData/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const userData = await UserService.getUserDataById(userID);
    
    if (userData.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(userData);
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).json({ error: 'Failed to retrieve user data. Please try again later.' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const registrationResult = await UserService.registerUser(req.body);
    res.status(registrationResult.status).json(registrationResult.data);
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Failed to register user. Please try again later.' });
  }
});

export default router;
