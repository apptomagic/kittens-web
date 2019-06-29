import express from 'express';
import client from './client.js';
import {ea} from '../adaptors.js';

const router = express.Router();
const topicClient = client('topic', 'Topics');

router.get(
  '/AllTopics',
  ea(async function allTopics(req, res, next) {
    const topicList = await topicClient.allTopics();
    res.json(topicList.topics);
  })
);

export default router;
