/// <reference path="../lib/openrct2.d.ts" />

class GoalWindow {
    private window: Window;

    private constructor(window: Window) {
        this.window = window;
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
        var window = ui.openWindow({
            classification: 'goals',
            title: "Goals",
            width: 200,
            height: 200,
            widgets: [
                {
                    type: 'label' as WidgetType,
                    name: 'label-goal',
                    x: 3,
                    y: 23,
                    width: 100,
                    height: 100,
                    text: "Goal: "
                } as LabelWidget,
                {
                    type: 'label' as WidgetType,
                    name: 'label-time-remaining',
                    x: 3,
                    y: 23 + 13,
                    width: 100,
                    height: 100,
                    text: "Goal: "
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
        goalLabel.text = "Goal: " + goal.getDetails();
        
        var daysLeft = 31 - date.day;
        var timeRemainingLabel = this.window.findWidget<LabelWidget>('label-time-remaining');
        timeRemainingLabel.text = `${daysLeft} days left`
    }
}

var goalWindow: GoalWindow = null;

function openGoalWindow() {
    trace("opening goal window...");
    goalWindow = GoalWindow.getOrCreate();
}

function updateGoalWindow() {
    if (goalWindow) {
        goalWindow.update();
    }
}
