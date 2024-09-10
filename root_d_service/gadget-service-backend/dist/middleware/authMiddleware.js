"use strict";
// src/middleware/authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.authMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var SECRET_KEY = process.env.SECRET_KEY || 'secret';
var authMiddleware = function (req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'No token provided' });
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, function (err, decoded) {
        if (err) {
            console.log('Token verification error:', err.message);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        console.log('Token verified successfully:', decoded);
        if (decoded && typeof decoded !== 'string') {
            req.user = {
                email: decoded.email
            };
        }
        else {
            req.user = undefined;
        }
        next();
    });
};
exports.authMiddleware = authMiddleware;
var protect = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        //console.log(token + "...exists");
        jsonwebtoken_1.default.verify(token, SECRET_KEY, function (err, decoded) {
            if (err) {
                console.log(SECRET_KEY);
                console.log('Token verification error:', err.message);
                return res.status(401).json({ message: 'Invalid token' });
            }
            console.log("Token verified successfully:", decoded);
            req.user = decoded; // Cast decoded to UserPayload
            next();
        });
    }
    catch (error) {
        console.log('Unexpected error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.protect = protect;
