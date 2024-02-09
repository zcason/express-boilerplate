import express from 'express';
// Use later
// import { check, validationResult, Result } from 'express-validator';
import { default as postHandler } from './_post';


const router = express();

// implement later
// const validator = [

// ];

router.post('/', postHandler);


export default router;
