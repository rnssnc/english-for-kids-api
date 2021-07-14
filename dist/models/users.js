"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.model('Users', userSchema);
// const Category: Mongoose.Model<any> = Mongoose.model('Categories', modelSchema);
// export default Category;
//# sourceMappingURL=users.js.map