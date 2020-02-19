/// <reference path="C:/Users/Ted/Documents/GitHub/openrct2/distribution/openrct2.d.ts" />

const DEBUG = true;

// Helpers
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

type GoalType = "ride-type" | "park-rating";

abstract class Goal {
    reward: number;

    abstract hasCompleted(): boolean;
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
}

var trace: (msg: string) => void;
var currentGoal: Goal | null;

function RunGoalFailed() {
    park.postMessage({
        type: "award",
        text: "You have failed this month's goal."
    });
}

function RunGoalComplete(goal: Goal) {
    park.postMessage({
        type: "award",
        text: "Congratulations! You have completed this month's goal."
    });
    park.cash += goal.reward;
}

function CheckGoal() {
    trace("checking goal");
    if (currentGoal) {
        if (currentGoal.hasCompleted()) {
            RunGoalComplete(currentGoal);
        } else {
            RunGoalFailed();
        }
        currentGoal = null;
    } else {
        currentGoal = new RideTypeGoal(RideType.MERRY_GO_ROUND)
        park.postMessage({
            type: "award",
            text: "You have a new goal."
        });
    }
}

function InitialiseUi() {
    trace("initialising UI...");
    if (typeof ui === 'undefined') {
        trace("No UI available");
        return;
    }

    ui.registerMenuItem("Goals", () => {
        console.log("TODO implement goal window");
    });
    trace("initialised UI");
}

var main = () => {
    if (DEBUG) {
        trace = (msg) => {
            console.log("[trace] " + msg);
        };
    } else {
        trace = () => { };
    }

    trace("started");

    InitialiseUi();

    context.subscribe("interval.day", () => {
        // trace("day elapsed, current day = " + date.day);
        if (date.day == 1) {
            CheckGoal();
        }
    });
};

registerPlugin({
    name: 'Park Manager',
    version: '1.0',
    authors: ['Ted'],
    type: 'server_client',
    main: main
});
