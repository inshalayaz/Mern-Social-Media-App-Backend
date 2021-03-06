const mongoose = require('mongoose')
const PostMessage = require('../models/postMessage')

exports.getPosts = async(req,res) => {
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404 ).json({message: error.message})
    }
}
exports.createPost = async (req,res) => {
    
    const post = req.body;
    const newPost = new PostMessage(post)

    try {
        await newPost.save()
        res.status(201).json(newPost)        
    } catch (error) {
        res.status(409).json({message: error.message})
    }
    
}

exports.updatePost = async (req,res) => {
    const {id} = req.params
    const post = req.body
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Post Not Available")

    const updatedPost =  await PostMessage.findByIdAndUpdate(id, {...post, id} , {new: true})

    res.json(updatedPost)
}

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id)

    res.json({ message: "Post deleted successfully." });
}

exports.likePost = async (req,res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })

    res.json(updatedPost)
}
 