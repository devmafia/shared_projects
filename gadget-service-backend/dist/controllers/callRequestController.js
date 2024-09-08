"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCallRequest = exports.deleteCallRequest = exports.getCallRequests = exports.createCallRequest = void 0;
var CallRequest_1 = __importDefault(require("../models/CallRequest"));
// Create call request
var createCallRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, phone, newCallRequest, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, phone = _a.phone;
                console.log("enter_call_req");
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                newCallRequest = new CallRequest_1.default({ name: name, phone: phone });
                console.log("Generated UUID:", newCallRequest._id);
                return [4 /*yield*/, newCallRequest.save()];
            case 2:
                _b.sent();
                res.status(201).json({ message: 'Call request created successfully' });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(500).json({ message: 'Server error', error: error_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createCallRequest = createCallRequest;
// Get all call requests
var getCallRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var callRequests, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, CallRequest_1.default.find()];
            case 1:
                callRequests = _a.sent();
                res.status(200).json(callRequests);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: 'Server error', error: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCallRequests = getCallRequests;
// Delete call request
var deleteCallRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, CallRequest_1.default.findByIdAndDelete(req.params.id)];
            case 1:
                _a.sent();
                res.status(200).json({ message: 'Call request deleted' });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ message: 'Server error', error: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteCallRequest = deleteCallRequest;
// Update CallRequest
var updateCallRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, phone, updatedCallRequest, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, phone = _a.phone;
                console.log('in controller');
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, CallRequest_1.default.findByIdAndUpdate(id, { name: name, phone: phone }, { new: true, runValidators: true } // Return the updated document and run validators
                    )];
            case 2:
                updatedCallRequest = _b.sent();
                if (!updatedCallRequest) {
                    return [2 /*return*/, res.status(404).json({ CallRequest: 'CallRequest not found' })];
                }
                res.status(200).json(updatedCallRequest);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                console.error("Error while updating the CallRequest:", error_4);
                res.status(500).json({ message: 'Server error', error: error_4 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateCallRequest = updateCallRequest;
