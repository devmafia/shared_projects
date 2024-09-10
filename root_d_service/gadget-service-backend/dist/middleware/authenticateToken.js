"use strict";
// src/middleware/authenticateToken.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';
var authenticateToken = function (req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401); // Unauthorized
    jsonwebtoken_1.default.verify(token, SECRET_KEY, function (err, user) {
        if (err)
            return res.sendStatus(403); // Forbidden
        // Ensure that `user` is of type `UserPayload` if it's not a `string`
        if (typeof user !== 'string') {
            req.user = user;
        }
        else {
            req.user = undefined;
        }
        next();
    });
};
exports.authenticateToken = authenticateToken;
