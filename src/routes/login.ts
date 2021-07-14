import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/users';

const loginRouter = Router();

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

loginRouter.post('/', async (req: Request, res: Response) => {
  if (!req.body) res.status(500).json({ message: 'Something went wrong' });

  const { login, password } = req.body;

  if (!login || !password) {
    res.status(400).json({ message: 'Both fields required' });
    return;
  }

  const user = await User.findOne({ login });
  if (!user) {
    res.status(400).json({ message: 'Wrong data. Enter login: admin, password: admin' });
    return;
  }

  const isMatch = user.password === password;

  if (!isMatch) {
    res.status(400).json({ message: 'Incorrect password enter admin' });
    return;
  }

  const token = jwt.sign({ userLogin: user.login }, '123', {
    expiresIn: '1h',
  });
  res.status(200).json({ token, userLogin: user.login });
});

export default loginRouter;
