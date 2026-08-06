const axios = require("axios");
const captainModel = require("../models/captain.model");



module.exports.getAddressCoordinate = async (address) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: address,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "uber-clone-learning-project",
        },
      },
    );

    if (response.data.length === 0) {
      throw new Error("Address not found");
    }

    return {
      lat: parseFloat(response.data[0].lat),
      lng: parseFloat(response.data[0].lon),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  try {
    // Convert origin to coordinates
    const originRes = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: origin,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "uber-clone-learning-project",
        },
      },
    );

    // Convert destination to coordinates
    const destinationRes = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: destination,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "uber-clone-learning-project",
        },
      },
    );

    if (originRes.data.length === 0 || destinationRes.data.length === 0) {
      throw new Error("Address not found");
    }

    const originLon = originRes.data[0].lon;
    const originLat = originRes.data[0].lat;

    const destinationLon = destinationRes.data[0].lon;
    const destinationLat = destinationRes.data[0].lat;

    // Ask OSRM for route information
    const route = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${originLon},${originLat};${destinationLon},${destinationLat}`,
      {
        params: {
          overview: "false",
        },
      },
    );

    if (!route.data.routes || route.data.routes.length === 0) {
      throw new Error("No routes found");
    }

    const result = route.data.routes[0];

    const distanceKm = (result.distance / 1000).toFixed(1);

    const totalSeconds = Math.round(result.duration);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    let durationText = "";

    if (days > 0) {
      durationText = `${days} day${days > 1 ? "s" : ""} ${hours} hr ${minutes} min`;
    } else if (hours > 0) {
      durationText = `${hours} hr ${minutes} min`;
    } else {
      durationText = `${minutes} min`;
    }

    return {
      distance: {
        text: `${distanceKm} km`,
        value: result.distance,
      },
      duration: {
        text: durationText,
        value: result.duration,
      },
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Input is required");
  }

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: input,
          format: "json",
          addressdetails: 1,
          limit: 5,
        },
        headers: {
          "User-Agent": "uber-clone-learning-project",
        },
      },
    );

    return response.data.map((place) => place.display_name).filter(Boolean);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
//   // radius in km

//   const captains = await captainModel.find({
//     location: {
//       $geoWithin: {
//         $centerSphere: [[lat, lng], radius / 6371],
//       },
//     },
//   });

//   return captains;
// };

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
  return await captainModel.find();
};
