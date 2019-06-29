import express from 'express';
import topic from './topic.js';

const router = express.Router();
router.use('/kittens.topic.Topics', topic);

export default router;
