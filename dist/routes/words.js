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
/* eslint-disable no-underscore-dangle */
/* eslint-disable dot-notation */
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("../middleware/multer"));
const auth_1 = __importDefault(require("../middleware/auth"));
const words_1 = __importDefault(require("../models/words"));
const categories_1 = __importDefault(require("../models/categories"));
const wordsRouter = express_1.Router();
wordsRouter.get('/:category/words', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _page, _limit } = req.query;
    const pageOptions = {
        page: Number(_page) || 0,
        limit: Number(_limit) || 3,
    };
    if (pageOptions.page === -1) {
        const data = yield words_1.default.find();
        res.status(200).json(data);
        return;
    }
    const title = req.params.category.split('-').join(' ');
    const category = yield categories_1.default.findOne({ title });
    if (!category)
        res.status(404).send({ message: 'category not found' });
    words_1.default.find({ category: category.title })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec((err, data) => {
        if (err) {
            res.status(500).json(err);
        }
        res.status(200).json(data);
    });
}));
wordsRouter.get('/:category/words/length', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const words = yield words_1.default.find({ category });
        res.json(words.length);
    }
    catch (err) {
        console.log(err);
    }
}));
wordsRouter.post('/:category/words', [
    auth_1.default,
    multer_1.default.fields([
        { name: 'image', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.params.category.split('-').join(' ');
    const category = yield categories_1.default.findOne({ title });
    if (!category)
        return res.status(404).send({ message: 'category not found' });
    try {
        const data = {
            word: req.body.word,
            translation: req.body.translation,
            category: req.body.category,
        };
        const files = req.files;
        if ((files === null || files === void 0 ? void 0 : files.image) && (files === null || files === void 0 ? void 0 : files.image[0].path)) {
            const result = yield cloudinary_1.v2.uploader.upload(files === null || files === void 0 ? void 0 : files.image[0].path);
            data.imgSrc = result.url;
        }
        if ((files === null || files === void 0 ? void 0 : files.audio) && (files === null || files === void 0 ? void 0 : files.audio[0].path)) {
            const result = yield cloudinary_1.v2.uploader.upload(files === null || files === void 0 ? void 0 : files.audio[0].path, {
                resource_type: 'video',
            });
            data.audioSrc = result.url;
        }
        words_1.default.create(data, (err, word) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json(word);
        });
    }
    catch (error) {
        res.send(error);
    }
    if (req.files) {
        const files = req.files;
        if (files === null || files === void 0 ? void 0 : files.image) {
            fs_1.default.unlink(files === null || files === void 0 ? void 0 : files.image[0].path, (err) => {
                if (err)
                    throw err;
            });
        }
        if (files === null || files === void 0 ? void 0 : files.audio) {
            fs_1.default.unlink(files === null || files === void 0 ? void 0 : files.audio[0].path, (err) => {
                if (err)
                    throw err;
            });
        }
    }
}));
wordsRouter.put('/:category/words', [
    auth_1.default,
    multer_1.default.fields([
        { name: 'image', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.params.category.split('-').join(' ');
    const category = yield categories_1.default.findOne({ title });
    if (!category)
        return res.status(404).send({ message: 'category not found' });
    try {
        const data = {
            word: req.body.word,
            translation: req.body.translation,
            category: req.body.category,
        };
        const files = req.files;
        if ((files === null || files === void 0 ? void 0 : files.image) && (files === null || files === void 0 ? void 0 : files.image[0].path)) {
            const result = yield cloudinary_1.v2.uploader.upload(files === null || files === void 0 ? void 0 : files.image[0].path);
            data.imgSrc = result.url;
        }
        if ((files === null || files === void 0 ? void 0 : files.audio) && (files === null || files === void 0 ? void 0 : files.audio[0].path)) {
            const result = yield cloudinary_1.v2.uploader.upload(files === null || files === void 0 ? void 0 : files.audio[0].path, {
                resource_type: 'video',
            });
            data.audioSrc = result.url;
        }
        words_1.default.findByIdAndUpdate(req.body.id, data, { new: true }, (err, word) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json(word);
        });
    }
    catch (error) {
        res.send(error);
    }
    if (req.files) {
        const files = req.files;
        if (files === null || files === void 0 ? void 0 : files.image) {
            fs_1.default.unlink(files === null || files === void 0 ? void 0 : files.image[0].path, (err) => {
                if (err)
                    throw err;
            });
        }
        if (files === null || files === void 0 ? void 0 : files.audio) {
            fs_1.default.unlink(files === null || files === void 0 ? void 0 : files.audio[0].path, (err) => {
                if (err)
                    throw err;
            });
        }
    }
}));
wordsRouter.delete('/:category/words', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.params.category.split('-').join(' ');
    const category = yield categories_1.default.findOne({ title });
    if (!category)
        return res.status(404).send({ message: 'category not found' });
    try {
        words_1.default.findByIdAndDelete(req.body._id, null, (err) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json({ success: true });
        });
    }
    catch (error) {
        res.send(error);
    }
}));
exports.default = wordsRouter;
//# sourceMappingURL=words.js.map