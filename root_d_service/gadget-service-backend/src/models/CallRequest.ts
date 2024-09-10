import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import uuid function

// Define an interface for TypeScript support
interface ICallRequest extends Document {
  id: string; // Add UUID field to the interface
  name: string;
  phone: string;
  createdAt: Date;
}

// Define the schema for the call request
const callRequestSchema: Schema = new Schema({
  id: {
    type: String,
    default: uuidv4, // Generate a UUID by default
    unique: true,    // Ensure UUID is unique
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true, // Removes extra whitespace
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(v: string) {
        return /^\d+$/.test(v); // Simple phone number validation
      },
      message: (props: any) => `${props.value} is not a valid phone number!`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model with the TypeScript interface
export default mongoose.model<ICallRequest>('CallRequest', callRequestSchema);
