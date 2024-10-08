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
exports.sendCallRequestToTelegram = void 0;
var axios_1 = __importDefault(require("axios"));
// Токен вашого бота
var TELEGRAM_BOT_TOKEN = '7351088520:AAEKKXD1X1QpTbkoUWX0AKVaCYvuwnsfxiQ';
// Нікнейм користувача, якому будемо надсилати запити
var TELEGRAM_USERNAME = 'tiger_gene';
// Отримання ID чату через нікнейм користувача
var getChatIdByUsername = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var response, messages, _i, messages_1, message, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("https://api.telegram.org/bot".concat(TELEGRAM_BOT_TOKEN, "/getUpdates"))];
            case 1:
                response = _a.sent();
                messages = response.data.result;
                // Пошук ID чату по username
                for (_i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                    message = messages_1[_i];
                    if (message.message.from.username === username) {
                        return [2 /*return*/, message.message.from.id];
                    }
                }
                return [2 /*return*/, null]; // Якщо ID чату не знайдено
            case 2:
                err_1 = _a.sent();
                console.error('Error fetching chat ID:', err_1);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Функція для надсилання повідомлення
var sendCallRequestToTelegram = function (name, phone) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId, message, url, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getChatIdByUsername(TELEGRAM_USERNAME)];
            case 1:
                chatId = _a.sent();
                if (!chatId) {
                    console.error('Chat ID not found. Please make sure the user has interacted with the bot.');
                    return [2 /*return*/];
                }
                message = "New Call Request:\nName: ".concat(name, "\nPhone: ").concat(phone);
                url = "https://api.telegram.org/bot".concat(TELEGRAM_BOT_TOKEN, "/sendMessage");
                return [4 /*yield*/, axios_1.default.post(url, {
                        chat_id: chatId,
                        text: message,
                    })];
            case 2:
                _a.sent();
                console.log('Message sent to Telegram.');
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error('Error sending message to Telegram:', err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sendCallRequestToTelegram = sendCallRequestToTelegram;
