import express from 'express';
import { default as postHandler } from './_post/index.js';


const router = express();

router.get('/', postHandler);


export default router;
