var mongoose = require('mongoose');

var fighterSchema = new mongoose.Schema({
  name: String,
  image: String,
  shortDescription: String,
  description: String,
  wins: Number,
  losses: Number,
  draws: Number,
  noContests: Number,
  dateOfBirth: Date,
  activeSince: Date,
  weight: Number,
  height: Number,
  living: Boolean,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model('Fighter', fighterSchema);
