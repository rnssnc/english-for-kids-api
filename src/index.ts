import cors from 'cors';
import Express from 'express';
import Mongoose from 'mongoose';
import { v2 as cloudinaryV2 } from 'cloudinary';

import categoriesRouter from './routes/categories';
import wordsRouter from './routes/words';
import loginRouter from './routes/login';

// eslint-disable-next-line operator-linebreak
const MONGODB_URI =
  'mongodb+srv://admin:admin@cluster0.ufxnk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// eslint-disable-next-line operator-linebreak
const CLOUDINARY_URI =
  'CLOUDINARY_URL=cloudinary://868357599533181.JprxlqrNKX8zj9czoRhOfqrZROI@dg2m1u3bf';

const app = Express();

cloudinaryV2.config({
  cloud_name: 'dg2m1u3bf',
  api_key: '868357599533181',
  api_secret: 'JprxlqrNKX8zj9czoRhOfqrZROI',
});

app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use(Express.json()); // support json encoded bodies
app.use(Express.urlencoded({ extended: true })); // support encoded bodies

app.use('/', wordsRouter);
app.use('/categories', categoriesRouter);
app.use('/login', loginRouter);

app.get('/', (req: Express.Request, res: Express.Response) => {
  res.send('rnssnc');
});

const PORT = process.env.PORT || 3003;

async function start() {
  try {
    await Mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });

    app.listen(PORT, () => {
      console.log(`Server is running PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
