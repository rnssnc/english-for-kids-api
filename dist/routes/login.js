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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
const loginRouter = express_1.Router();
// loginRouter.options('/', function (req: Request, res: Response) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   // res.setHeader('Access-Control-Allow-Methods', '*');
//   // res.setHeader('Access-Control-Allow-Headers', '*');
//   res.end();
// });
// try {
//   const { login, password } = req.body;
//   const candidate = await User.findOne({ login });
//   if (candidate) {
//     const isSame = password === candidate.password;
//     if (isSame) {
//       req.session.save((err) => {
//         req.session.user = { login: 'admin' };
//         req.session.isAuthenticated = true;
//         if (err) {
//           throw err;
//         }
//         res.status(200).send(req.sessionID);
//       });
//     } else {
//       res.status(404).send('Login or password is incorrect');
//     }
//   } else {
//     res.status(404).send('Login or password is incorrect');
//   }
// } catch (err) {
//   console.log(err);
// }
loginRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        res.status(500).json({ message: 'Something went wrong' });
    const { login, password } = req.body;
    if (!login || !password) {
        res.status(400).json({ message: 'Both fields required' });
        return;
    }
    const user = yield users_1.default.findOne({ login });
    if (!user) {
        res.status(400).json({ message: 'Wrong data. Enter login: admin, password: admin' });
        return;
    }
    const isMatch = user.password === password;
    if (!isMatch) {
        res.status(400).json({ message: 'Incorrect password enter admin' });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userLogin: user.login }, '123', {
        expiresIn: '1h',
    });
    res.status(200).json({ token, userLogin: user.login });
}));
exports.default = loginRouter;
//# sourceMappingURL=login.js.map