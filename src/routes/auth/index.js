import express from 'express';
import { default as loginHandler } from './login';
import { default as registrationHandler } from './register'


const router = express();

router.use('/login', loginHandler);
router.use('/register', registrationHandler);


export default router;
