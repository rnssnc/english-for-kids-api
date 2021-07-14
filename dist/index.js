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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("cloudinary");
const categories_1 = __importDefault(require("./routes/categories"));
const words_1 = __importDefault(require("./routes/words"));
const login_1 = __importDefault(require("./routes/login"));
// eslint-disable-next-line operator-linebreak
const MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.ufxnk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// eslint-disable-next-line operator-linebreak
const CLOUDINARY_URI = 'CLOUDINARY_URL=cloudinary://868357599533181.JprxlqrNKX8zj9czoRhOfqrZROI@dg2m1u3bf';
const app = express_1.default();
cloudinary_1.v2.config({
    cloud_name: 'dg2m1u3bf',
    api_key: '868357599533181',
    api_secret: 'JprxlqrNKX8zj9czoRhOfqrZROI',
});
app.use(cors_1.default());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express_1.default.json()); // support json encoded bodies
app.use(express_1.default.urlencoded({ extended: true })); // support encoded bodies
app.use('/', words_1.default);
app.use('/categories', categories_1.default);
app.use('/login', login_1.default);
app.get('/', (req, res) => {
    res.send('rnssnc');
});
const PORT = process.env.PORT || 3003;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(MONGODB_URI, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
            });
            app.listen(PORT, () => {
                console.log(`Server is running PORT ${PORT}`);
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
start();
//# sourceMappingURL=index.js.map