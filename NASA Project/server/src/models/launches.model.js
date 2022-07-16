// data

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: latestFlightNumber,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS2',
  launchDate: new Date('27/12/2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

// functions
function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['Zero to Mastery', 'NASA'],
      flightNumber: latestFlightNumber,
    })
  );
}
// exporting
module.exports = {
  getAllLaunches,
  addNewLaunch,
};
