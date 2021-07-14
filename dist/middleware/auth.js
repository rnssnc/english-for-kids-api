"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const { token } = JSON.parse(req.headers.authorization ? req.headers.authorization : '');
        if (!token) {
            res.status(401).json({ message: 'Нет авторизации' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, '123');
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(401).json({ message: 'Нет авторизации' });
    }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map