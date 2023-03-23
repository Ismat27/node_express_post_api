const express = require('express')
const {authMiddleware} = require('../middleware/authentication')

const {
    createPost, getAllPosts,
    getSinglePost, updatePost,
    deletePost
} = require('../controllers/posts')

const router = express.Router()

router.route('/').get(getAllPosts).post(authMiddleware, createPost)
router.route('/:postId').get(getSinglePost).patch(authMiddleware, updatePost).delete(authMiddleware, deletePost)

module.exports = router