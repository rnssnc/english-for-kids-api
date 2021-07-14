"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const loader = multer_1.default({
    dest: path_1.default.join(__dirname, 'tmp'),
    fileFilter: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.mp3') {
            cb(null, false);
            // throw new Error('File type is not supported');
        }
        cb(null, true);
    },
});
exports.default = loader;
//# sourceMappingURL=multer.js.map