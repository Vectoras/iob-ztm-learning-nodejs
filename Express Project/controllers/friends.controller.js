// importing the model
const model = require('../models/friends.model');

// controller functions

function postFriends(req, res) {
  // validation
  if (!req.body.name) {
    return res.status(400).json({ error: 'Missing friend name' });
  }

  // actual logic
  const newFriend = {
    name: req.body.name,
    id: model.length,
  };

  model.push(newFriend);

  res.json(newFriend);
}

function getFriends(req, res) {
  res.json(model);
}

function getFriend(req, res) {
  const friendId = Number(req.params.friendId);
  const friend = model[friendId];

  if (!friend) {
    res.status(404).json({
      error: 'Reqested friend does not exist',
    });
  }

  res.status(200).json(model[friendId]);
}

module.exports = {
  postFriends,
  getFriends,
  getFriend,
};
