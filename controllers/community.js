const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost/Volvme', {useNewUrlParser: true, autoIndex: false})

//Import Models//
const User = require('../models/user')
const Group = require('../models/group')
const Project = require('../models/project')
const Post = require('../models/post')

exports.index = function(req, res) {

	//res.status(200).json({msg: "Welcome to the Volvme Community Index"})
	const communityUsers = []
	const communityPosts = []

	User.find({}, {profile: true}, function(err, users) {
		if (err) return err
		if (!users) communityUsers = []
		//if (users) 

			Post.find({}, function(err, posts) {
				if (err) return err
				if (!posts) communityPosts = []

				return res.status(200).json({
					welcome: "Welcome to the Volvme Community",
					users: users,
					posts: posts
				})
			})
	})
}

exports.getAllPublicUsers = function(req, res) {

	//console.log('not yet implemented')
	User.find({}, function(err, users) {
		if (err) return res.status(500).json("Error finding all Users")
		res.status(200).json(users)
	})
}

exports.getAllPublicPosts = function(req, res) {

	//console.log('not yet implemented')
	Post.find({}, function(err, posts) {
		if (err) return res.status(500).json("Error finding all Users")
			res.status(200).json(posts)
	})
}

exports.createPublicPost = function(req, res) {

	const author = req.body.authorID
	const body = req.body.postBody

	const new_post = new Post({
		_id: mongoose.Types.ObjectId(),
		author: author,
		body: body
	})
	new_post.save()
	return res.status(201).send("Success")

}

exports.editPublicPost = function(req, res) {

	const postID = req.body.postID
	const author = req.body.authorID
	const body = req.body.postBody

	Post.findByIdAndUpdate(
		postID,
		{$set: { body: body }},
		function(err, done){ 
			if (err) res.status(500).json(err)
			return res.status(200).redirect('/community')
	})
}

exports.deletePublicPost = function(req, res) {

	Post.findByIdAndDelete(
		req.body.postID,
		function(err, done) {
			if (err) return res.status(500).json(err)
			return res.status(200).redirect('/community')
	})
}

exports.likePost = function(req, res) {

	const postID = req.body.postID
	const liker = req.body.likerID

	Post.findByIdAndUpdate(
		postID,
		{$push: {likes: liker }},
		function(err, post) {
			if (err) return res.status(500).json(err)
			return res.status(200).redirect('/community')
		}
	)
}

exports.getAllPublicEvents = function(req, res) {

	console.log('not yet implemented')
}

exports.createPublicEvent = function(req, res) {

	console.log('not yet implemented')
}

exports.editPublicEvent = function(req, res) {

	console.log('not yet implemented')
}

exports.deletePublicEvent = function(req, res) {

	console.log('not yet implemented')
}

exports.likeEvent = function(req, res) {

	console.log('not yet implemented')
}

