// importing the model
const { getAllLaunches, addNewLaunch } = require('../../models/launches.model');

// functions
function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  // extracting data
  const launch = req.body;

  // data validation - missing fields
  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: 'Missing required launch property',
    });
  }

  // data validation - not recognized date format
  launch.launchDate = new Date(launch.launchDate);
  // if (launch.launchDate.toString() === 'Inavalid Date') {
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }

  // busines logic - add the launch
  addNewLaunch(launch);

  // respond with success code
  return res.status(201).json(launch);
}

// exporting
module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
