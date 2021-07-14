"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const modelSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    imgSrc: {
        type: String,
        default: 'https://res.cloudinary.com/dg2m1u3bf/image/upload/v1626185923/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953_d6lcu3.jpg',
    },
});
exports.default = mongoose_1.model('Categories', modelSchema);
// const Category: Mongoose.Model<any> = Mongoose.model('Categories', modelSchema);
// export default Category;
//# sourceMappingURL=categories.js.map