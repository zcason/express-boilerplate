import express from 'express';
import { default as loginHandler } from './login';
import { default as logoutHandler } from './logout';
import { default as registrationHandler } from './register'


const router = express();

router.use('/login', loginHandler);
router.use('/logout', logoutHandler);
router.use('/register', registrationHandler);


export default router;
