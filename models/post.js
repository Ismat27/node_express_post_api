const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'post title cannot be empty']
        },
        intro: {
            type: String,
            // required: [true, 'post content cannot be empty']
        },
        content: {
            type: String,
            required: [true, 'post content cannot be empty']
        },
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'post author is required']
        },
        published: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)