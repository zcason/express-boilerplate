import express from 'express';
import { default as loginHandler } from './login/index.js';
import { default as registrationHandler } from './register/index.js'


const router = express();

router.post('/login', loginHandler);
router.post('/register', registrationHandler);


export default router;
