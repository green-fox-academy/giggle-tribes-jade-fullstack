import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import { helloController, loginController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.get('/hello', helloController.get);
router.post('/login', loginController.post);

export default router;
