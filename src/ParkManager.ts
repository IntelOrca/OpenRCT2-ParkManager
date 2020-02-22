/// <reference path="../lib/openrct2.d.ts" />
/// <reference path="Goals.ts" />
/// <reference path="GoalWindow.ts" />
/// <reference path="Helpers.ts" />

const DEBUG = true;
var trace: (msg: string) => void;
var currentGoal: Goal | null;

function runGoalFailed() {
    park.postMessage({
        type: "award",
        text: "You have failed this month's goal."
    });
}

function runGoalComplete(goal: Goal) {
    park.postMessage({
        type: "award",
        text: "Congratulations! You have completed this month's goal."
    });
    park.cash += goal.reward;
}

function checkGoal() {
    trace("checking goal");
    if (currentGoal) {
        if (currentGoal.hasCompleted()) {
            runGoalComplete(currentGoal);
        } else {
            runGoalFailed();
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

function initialiseUi() {
    trace("initialising UI...");
    if (typeof ui === 'undefined') {
        trace("No UI available");
        return;
    }

    ui.registerMenuItem("Goals", () => {
        openGoalWindow();
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

    initialiseUi();
    checkGoal();
    updateGoalWindow();

    context.subscribe("interval.day", () => {
        // trace("day elapsed, current day = " + date.day);
        if (date.day == 1) {
            checkGoal();
        }
        updateGoalWindow();
    });
};

registerPlugin({
    name: 'Park Manager',
    version: '1.0',
    authors: ['Ted'],
    type: 'server_client',
    main: main
});
