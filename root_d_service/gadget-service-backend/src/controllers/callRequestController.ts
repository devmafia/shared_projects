// src/controllers/callRequestController.ts
import { Request, Response } from 'express';
import CallRequest from '../models/CallRequest';

// Create call request
export const createCallRequest = async (req: Request, res: Response) => {
  const { name, phone } = req.body;
  console.log("enter_call_req");

  try {
    // Create a new call request document
    const newCallRequest = new CallRequest({ name, phone });
    console.log("Generated UUID:", newCallRequest._id);
    const savedCallRequest = await newCallRequest.save();


    // Send the saved call request data as a response
    res.status(201).json(savedCallRequest);
  } catch (error) {
    console.error("Error while creating a call request:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all call requests
export const getCallRequests = async (req: Request, res: Response) => {
  try {
    // Retrieve all call requests from the database
    const callRequests = await CallRequest.find();
    res.status(200).json(callRequests);
  } catch (error) {
    console.error("Error while retrieving call requests:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete call request
export const deleteCallRequest = async (req: Request, res: Response) => {
  try {
    // Delete the call request by its ID
    await CallRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Call request deleted' });
  } catch (error) {
    console.error("Error while deleting a call request:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update CallRequest
export const updateCallRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, phone } = req.body;
  console.log('in controller');

  try {
    // Update the call request by its ID
    const updatedCallRequest = await CallRequest.findByIdAndUpdate(
      id,
      { name, phone },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedCallRequest) {
      return res.status(404).json({ CallRequest: 'Call request not found' });
    }

    res.status(200).json(updatedCallRequest);
  } catch (error) {
    console.error("Error while updating the call request:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};
