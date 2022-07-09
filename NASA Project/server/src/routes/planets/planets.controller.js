// importing the model
const planets = require('../../models/planets.model');

function getAllPlanets(req, res) {
  return res.status(200).json(planets);
}

// exporting
module.exports = {
  getAllPlanets,
};
