const express = require('express');
const BookmarkController = require('../controller/BookmarkController');

const router = express.Router();

router.post('/create-bookmarks', BookmarkController.createBookmark);
router.delete('/delete-bookmarks/:id', BookmarkController.deleteBookmark);
router.get('/find-bookmarks-by-id/:id', BookmarkController.findBookmarkById);
router.get('/find-all-bookmarks', BookmarkController.findAllBookmarkRecords);

module.exports = router;