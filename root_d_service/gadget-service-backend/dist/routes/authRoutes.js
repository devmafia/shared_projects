"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = (0, express_1.Router)();
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
router.post('/logout', authMiddleware_1.authMiddleware, authController_1.logout);
// router.get('/validate-token', authenticateToken, (req, res) => {
//     res.json({ valid: true });
// });
exports.default = router;
