import express from 'express';
import { default as getHandler } from './_get/index.js';


const router = express();

router.get('/', getHandler);


export default router;
