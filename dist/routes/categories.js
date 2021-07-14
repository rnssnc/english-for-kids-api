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
const cloudinary_1 = require("cloudinary");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("../middleware/multer"));
const auth_1 = __importDefault(require("../middleware/auth"));
const categories_1 = __importDefault(require("../models/categories"));
const categoriesRouter = express_1.Router();
categoriesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _page, _limit } = req.query;
    const pageOptions = {
        page: Number(_page) || 0,
        limit: Number(_limit) || 3,
    };
    if (pageOptions.page === -1) {
        const data = yield categories_1.default.find();
        res.status(200).json(data);
        return;
    }
    categories_1.default.find()
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec((err, categories) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.status(200).json(categories);
    });
    // res.send(pageOptions);
}));
categoriesRouter.post('/', [auth_1.default, multer_1.default.single('image')], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const data = {
            title: req.body.title,
        };
        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
            const result = yield cloudinary_1.v2.uploader.upload(path_1.default.join(req.file.destination, req.file.filename));
            data.imgSrc = result.url;
        }
        categories_1.default.create(data, (err, category) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json(category);
        });
    }
    catch (error) {
        res.send(error);
    }
    if ((_b = req.file) === null || _b === void 0 ? void 0 : _b.path) {
        fs_1.default.unlink(path_1.default.join(req.file.destination, req.file.filename), (err) => {
            if (err)
                throw err;
        });
    }
}));
categoriesRouter.put('/', [auth_1.default, multer_1.default.single('image')], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    categories_1.default.findOne({ title: req.body.title }, (err, docs) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        if (docs && docs.id !== req.body.id) {
            res.status(401).json({ message: 'This name is already taken' });
            return;
        }
        try {
            const data = {
                title: req.body.title,
            };
            if ((_c = req.file) === null || _c === void 0 ? void 0 : _c.path) {
                const result = yield cloudinary_1.v2.uploader.upload(path_1.default.join(req.file.destination, req.file.filename));
                data.imgSrc = result.url;
            }
            categories_1.default.findByIdAndUpdate(req.body.id, data, (error) => {
                if (err) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(Object.assign(Object.assign(Object.assign({}, req.body), { _id: req.body.id }), data));
            });
        }
        catch (error) {
            res.send(error);
        }
        if ((_d = req.file) === null || _d === void 0 ? void 0 : _d.path) {
            fs_1.default.unlink(path_1.default.join(req.file.destination, req.file.filename), (error) => {
                if (error)
                    throw err;
            });
        }
    }));
}));
categoriesRouter.delete('/', auth_1.default, (req, res) => {
    // eslint-disable-next-line no-underscore-dangle
    categories_1.default.findByIdAndDelete(req.body._id, null, (err) => {
        if (err) {
            res.status(404).json(err);
            return;
        }
        res.status(200).json({ success: true });
    });
});
exports.default = categoriesRouter;
//# sourceMappingURL=categories.js.map