import express from 'express';

const router = express.Router();

router.get('/AllTopics', function allTopics(req, res) {
  res.json([
    'chat',
    'introductions',
    'meta',
    'roadmap',
    'bugs',
    'suggestions',
    'help',
    'dev-help',
    'announcements',
    'documentation',
    'web',
    'sandbox',
  ]);
});

export default router;
