/// <reference path="../lib/openrct2.d.ts" />

class GoalWindow {
    private window: Window;

    private constructor(window: Window) {
        this.window = window;
    }

    static get(): GoalWindow {
        var window = ui.getWindow('goals');
        return new GoalWindow(window);
    }

    static getOrCreate(): GoalWindow {
        var window = ui.getWindow('goals');
        if (window) {
            window.bringToFront();
            return new GoalWindow(window);
        } else {
            return this.create();
        }
    }

    private static create(): GoalWindow {
        var ww = 300;
        var window = ui.openWindow({
            classification: 'goals',
            title: "Goals",
            width: ww,
            height: 200,
            widgets: [
                {
                    type: 'label' as WidgetType,
                    name: 'label-goal',
                    x: 3,
                    y: 23,
                    width: ww - 6,
                    height: 26,
                    text: "Goal: "
                } as LabelWidget,
                {
                    type: 'label' as WidgetType,
                    name: 'label-time-remaining',
                    x: 3,
                    y: 23 + 26,
                    width: ww - 6,
                    height: 50,
                    text: "Time remaining: "
                }
            ],
            onClose: () => {
                goalWindow = null;
            }
        });
        return new GoalWindow(window);
    }

    update() {
        var goal = currentGoal;
        var goalLabel = this.window.findWidget<LabelWidget>('label-goal');
        var timeRemainingLabel = this.window.findWidget<LabelWidget>('label-time-remaining');
        if (goal) {
            var daysLeft = 31 - date.day;
            goalLabel.text = `Goal:\n        ${goal.getDetails()}`;
            timeRemainingLabel.text = `Time remaining:\n        ${daysLeft} days left`
        } else {
            goalLabel.text = "No goal at the moment";
            timeRemainingLabel.text = "";
        }
    }
}

var goalWindow: GoalWindow = null;

function openGoalWindow() {
    trace("opening goal window...");
    goalWindow = GoalWindow.getOrCreate();
}

function updateGoalWindow() {
    trace("updating goal window...");
    if (!goalWindow) {
        goalWindow = GoalWindow.get();
    }
    if (goalWindow) {
        goalWindow.update();
    }
}
