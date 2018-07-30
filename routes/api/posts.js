const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route GET api/posts/test
// @description Tests post route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Post Works' }));

// @route GET api/posts
// @description Get post
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostfound: 'No posts found.' }));
});

// @route GET api/posts/:id
// @description Get post
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json({ nopostfound: 'No post found with that ID.' }));
});

// @route POST api/posts
// @description Create post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.body.user,
    });

    newPost.save().then((post) => res.json(post));
  }
);

// @route POST api/posts/like/:id
// @description Likes a post
// @access Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            const hasLikedBefore = post.likes
              .filter((like) => like.user.toString() === req.user.id)

            if (hasLikedBefore.length > 0) {
              return res.status(400).json({ alreadylike: 'User has already liked this post.' });
            }

            post.likes.unshift({ user: req.user.id });

            post.save().then((post) => res.json(post));
          })
          .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
      });
  }
);

// @route POST api/posts/unlike/:id
// @description Unlikes a post
// @access Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            const hasLikedBefore = post.likes
              .filter((like) => like.user.toString() === req.user.id)

            if (hasLikedBefore.length === 0) {
              return res.status(400).json({ notliked: 'You have not yet liked this post.' });
            }

            const removeIndex = post.likes
              .map((item) => item.user.toString())
              .indexOf(req.user.id);

            // Splice out of array
            post.likes.splice(removeIndex, i);

            post.save().then((post) => res.json(post));
          })
          .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
      });
  }
);

// @route DELETE api/posts/:id
// @description Deletes a post
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            // Check for post owner
            if (post.user.toString() !== req.user.id) {
              return res.json(401).json({ notauthorized: 'User not authorized.' });
            }

            post.remove().then(() => res.json({ success: true }))
          })
          .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
      });
  }
);

module.exports = router;