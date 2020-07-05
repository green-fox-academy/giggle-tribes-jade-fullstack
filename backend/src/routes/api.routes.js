import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import {
  helloController,
  sessionController,
  resourceController,
} from '../controllers';
import { resourceMiddleware } from '../middlewares/resourceMiddleware';

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.get('/hello', helloController.get);
router.post('/sessions', sessionController.post);

router.use(resourceMiddleware);

router.get('/kingdom/resource', resourceController.get);

export default router;
