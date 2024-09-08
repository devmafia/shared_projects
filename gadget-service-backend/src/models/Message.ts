import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IMessage extends Document {
  _id: string;  // Define _id as a string to accept UUID
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const messageSchema: Schema = new Schema({
  _id: {
    type: String,  // _id as a string (UUID)
    default: uuidv4,  // Default value is a generated UUID
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});

export default mongoose.model<IMessage>('Message', messageSchema);
