// src/controllers/messageController.ts
import { Request, Response } from 'express';
import Message from '../models/Message';

// Create message
export const createMessage = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  console.log("Request body:", req.body);

  try {
    // _id will be generated automatically
    const newMessage = new Message({ name, email, message });
    console.log("Generated UUID:", newMessage._id);
    const savedM = await newMessage.save();
    res.status(201).json(savedM);
  } catch (error) {
    console.error("Error while saving the message:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all messages
export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete message
export const deleteMessage = async (req: Request, res: Response) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update message
export const updateMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, message } = req.body;
  console.log('in controller');
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { name, email, message },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error("Error while updating the message:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};
