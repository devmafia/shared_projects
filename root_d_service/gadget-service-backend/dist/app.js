"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
var callRequestRoutes_1 = __importDefault(require("./routes/callRequestRoutes"));
var errorMiddleware_1 = require("./middleware/errorMiddleware");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/messages', messageRoutes_1.default);
app.use('/api/call-requests', callRequestRoutes_1.default);
// Error handling middleware
app.use(errorMiddleware_1.errorHandler);
exports.default = app;
