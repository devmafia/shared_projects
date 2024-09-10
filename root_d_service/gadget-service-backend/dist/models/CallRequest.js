"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var uuid_1 = require("uuid"); // Import uuid function
// Define the schema for the call request
var callRequestSchema = new mongoose_1.Schema({
    id: {
        type: String,
        default: uuid_1.v4, // Generate a UUID by default
        unique: true, // Ensure UUID is unique
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
            validator: function (v) {
                return /^\d+$/.test(v); // Simple phone number validation
            },
            message: function (props) { return "".concat(props.value, " is not a valid phone number!"); },
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// Export the model with the TypeScript interface
exports.default = mongoose_1.default.model('CallRequest', callRequestSchema);
