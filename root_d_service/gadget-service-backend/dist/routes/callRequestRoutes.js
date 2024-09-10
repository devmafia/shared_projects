"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/callRequestRoutes.ts
var express_1 = require("express");
var callRequestController_1 = require("../controllers/callRequestController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var validationMiddleware_1 = require("../middleware/validationMiddleware");
var router = (0, express_1.Router)();
router.post('/create', (0, validationMiddleware_1.validateFields)(['name', 'phone']), callRequestController_1.createCallRequest);
router.get('/', authMiddleware_1.protect, callRequestController_1.getCallRequests);
router.delete('/:id', authMiddleware_1.protect, callRequestController_1.deleteCallRequest);
router.put('/update/:id', authMiddleware_1.protect, callRequestController_1.updateCallRequest);
exports.default = router;
