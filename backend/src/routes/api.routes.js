import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import { helloController, userController, sessionController,resourceController } from '../controllers';
import { resourceMiddleware } from '../middlewares/resourceMiddleware';

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.get('/hello', helloController.get);
router.post('/sessions', sessionController.post);
router.post('/users', userController.add);

router.use('/kingdom/:kingdomID', resourceMiddleware);

router.get('/kingdom/:kingdomID/resource', resourceController.get);


export default router;
