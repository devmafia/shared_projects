// src/controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register new user
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  
  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error: any) {
    console.log(error.message + '         www          ' + error);
    // res.status(500).json({ message: 'Server error', error });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY || 'secret', { expiresIn: '2h' });

    // Send the token and user data
    res.status(200).json({ message: 'Login successful', token });
  } catch (error: any) {
    console.error('Login Error:', error); // Log the error
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Logout user (front-end can simply clear the token)
export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logout successful' });
};
