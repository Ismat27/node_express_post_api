const Post = require('../models/post')
const User = require('../models/user')

const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError, UnauthenticatedError, APIError } = require('../errors')

const createPost = async (req, res) => {
    const {user} = req
    req.body.author = user.userId
    const post = await Post.create(req.body)
    res.status(StatusCodes.OK).json(post)
}

const getAllPosts = async (req, res) => {
    const posts = await Post.find({}).populate('author', 'username').sort('-updatedAt')
    res.status(StatusCodes.OK).json({posts})
}

const getSinglePost = async (req, res) => {
    const { postId } = req.params
    if (!postId) throw new BadRequestError('post id is required')
    const post = await Post.findById(postId).populate('author', 'username')
    if (!post) throw new NotFoundError('post not found')
    res.status(StatusCodes.OK).json(post)
}

const updatePost = async (req, res) => {
    // only author can delete a post
    const { postId } = req.params
    // check if user still exists
    const { userId } = req.user
    const db_user = await User.findById(userId)
    if (!db_user) {
        throw new UnauthenticatedError('unauthenticated')
    }

    const post = await Post.findOneAndUpdate(
        {_id: postId, author: userId},
        req.body,
        {new: true, runValidators: true}
    )
    if (!post) throw new NotFoundError('post not found')
    res.status(StatusCodes.OK).json(post)
}

const deletePost = async (req, res) => {
    // only admin or author of a post can delete a post
    const { postId } = req.params
    const { userId } = req.user
    const db_user = await User.findById(userId)
    if (!db_user) {
        throw new UnauthenticatedError('unauthenticated')
    }
    const post = await Post.findOne({
        _id: postId,
    })
    if (!post) throw new NotFoundError('post not found')
    if(db_user.role === 'admin' || post.author.toString() === userId) {
        post.deleteOne({_id: postId})
        return res.status(StatusCodes.OK).json({msg: 'deleted'})
    }
    throw new APIError('Unauthorized', 403)
}

const allPostsByUser = async (req, res) => {

}

module.exports = {
    createPost,
    getAllPosts,
    getSinglePost,
    deletePost,
    updatePost,
    allPostsByUser
}