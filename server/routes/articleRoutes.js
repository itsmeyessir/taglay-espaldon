const express = require('express');
const { getArticles, createArticle, updateArticle, toggleArticleStatus, getArticleByName } = require('../controllers/articleController');

const router = express.Router();

// get methods 
router.get('/', getArticles);
router.get('/:name', getArticleByName);

// post - create
router.post('/', createArticle);

// put and patch - update
router.put('/:id', updateArticle);
router.patch('/:id/toggle', toggleArticleStatus);

module.exports = router;