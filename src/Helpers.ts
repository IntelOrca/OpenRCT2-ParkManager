/// <reference path="../lib/openrct2.d.ts" />

namespace RideType {
    export const MERRY_GO_ROUND = 33;
}

function getAllRides() {
    let rides: Ride[] = [];
    var numRides = map.rides;
    for (var rideId = 0; numRides > 0; rideId++) {
        let ride = map.getRide(rideId);
        if (ride) {
            rides.push(ride);
            numRides--;
        }
    }
    return rides;
}
