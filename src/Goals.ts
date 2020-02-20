/// <reference path="../lib/openrct2.d.ts" />

type GoalType = "ride-type" | "park-rating";

abstract class Goal {
    reward: number;

    abstract hasCompleted(): boolean;
    abstract getDetails(): string;
}

class RideTypeGoal extends Goal {
    rideType: number;

    constructor(rideType: number) {
        super();
        this.rideType = rideType;
    }

    hasCompleted(): boolean {
        let rides = getAllRides();
        for (let ride of rides) {
            if (ride.type == this.rideType) {
                return true;
            }
        }
        return false;
    }

    getDetails(): string {
        return "Build at least one Merry-Go-Round which is operational.";
    }
}
