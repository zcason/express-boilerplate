import express from 'express';
import { default as postHandler } from './_post';


const router = express();

router.post('/', postHandler);


export default router;
