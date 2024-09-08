"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/messageRoutes.ts
var express_1 = require("express");
var messageController_1 = require("../controllers/messageController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var validationMiddleware_1 = require("../middleware/validationMiddleware");
var router = (0, express_1.Router)();
router.post('/create', (0, validationMiddleware_1.validateFields)(['name', 'email', 'message']), messageController_1.createMessage);
router.get('/', authMiddleware_1.protect, messageController_1.getMessages);
router.delete('/:id', authMiddleware_1.protect, messageController_1.deleteMessage);
router.put('/update/:id', authMiddleware_1.protect, messageController_1.updateMessage);
exports.default = router;
