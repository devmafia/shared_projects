"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
// Налаштування змінних середовища
dotenv_1.default.config();
var PORT = process.env.PORT || 5000;
var MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://FreeSky:AlexSky1@cluster0.1ur9i7t.mongodb.net/';
//'mongodb+srv://FreeSky:AlexSky1@cluster0.ovhmhz2.mongodb.net/admin?retryWrites=true&w=majority';
// Підключення до бази даних
mongoose_1.default
    .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () { return console.log('Connected to MongoDB'); })
    .catch(function (err) { return console.error('MongoDB connection error:', err); });
// Запуск сервера
app_1.default.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
