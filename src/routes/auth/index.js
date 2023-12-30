import express from 'express';
import { default as loginHandler } from './login';
import { default as registrationHandler } from './register'


const router = express();

router.post('/login', loginHandler);
router.post('/register', registrationHandler);


export default router;
