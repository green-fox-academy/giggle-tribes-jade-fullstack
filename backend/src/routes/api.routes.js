import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import { helloController, userController, sessionController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.get('/hello', helloController.get);
router.post('/sessions', sessionController.post);

router.post('/users', userController.add);

export default router;
