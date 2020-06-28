import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import { helloController, userController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.get('/hello', helloController.get);

router.post('/users', userController);

export default router;
