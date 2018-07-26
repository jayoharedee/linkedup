const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile/test
// @description Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route GET api/profile
// @description Fetches the users profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user.';
        return res.status(404).json(errors);
      }

      return res.json(profile)
    })
    .catch((err) => res.status(404).json(err));
});

// @route GET api/profile
// @description Create or edit  a user's profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Collect profile fields
  const user = req.user.id;
  const profileFields = {};
  profileFields.user = user;

  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

  // Split skills array and assign to profileFields {}
  if (typeof req.body.skills !== undefined) {
    profileFields.skills = req.body.skills.split(',');
  }

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user })
    .then((profile) => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user },
          { $set: profileFields },
          { new: true }
        )
        .then((profile) => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle })
          .then((profile) => {
            if (profile) {
              errors.handle = 'That handle already exists.';
              res.status(400).json(errors)
            }

            // Save Profile
            new Profile(profileFields).save()
              .then((profile) => res.json(profile));
          })
      }
    })

  if (req.body.experience) profileFields.experience = req.body.experience;
  if (req.body.education) profileFields.education = req.body.education;
  if (req.body.date) profileFields.date = req.body.date;
});

module.exports = router;