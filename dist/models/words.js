"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const wordSchema = new mongoose_1.Schema({
    word: {
        type: String,
        required: true,
    },
    translation: {
        type: String,
        required: true,
    },
    imgSrc: {
        type: String,
        default: 'https://res.cloudinary.com/dg2m1u3bf/image/upload/v1626185923/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953_d6lcu3.jpg',
    },
    audioSrc: {
        type: String,
    },
    category: {
        type: String,
        ref: 'Categories',
        required: true,
    },
});
exports.default = mongoose_1.model('Words', wordSchema);
//# sourceMappingURL=words.js.map