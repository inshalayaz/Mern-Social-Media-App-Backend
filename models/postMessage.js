const mongoose =  require('mongoose')

const postScheme = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFiles: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})


const PostMessage = mongoose.model('PostMessage', postScheme)

module.exports = PostMessage