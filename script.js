var canvas_wallpaper = new fabric.Canvas('wallpaper');
var canvas_notificationBar = new fabric.Canvas('notification-bar');
var canvas_insideMain = new fabric.Canvas('inside-door');
var canvas_outsideMain = new fabric.Canvas('outside-door');

const DOOR_WIDTH = canvas_insideMain.width;
const DOOR_HEIGHT = canvas_insideMain.height;

var doorClosed = true;
var doorLocked = true;

var alertIndices = {'doorLocked': 0, 'doorUnlocked': 0, 'doorClosed': 1, 'doorOpen': 1, 'childLock': 2, 'houseAlarm': 3, 'newMessage': 4}


// Draw doorknobs

var knobIn = new fabric.Circle({
    radius: 20, fill: 'black', 
    originX: 'center', originY: 'center', 
    lockMovementX: true, lockMovementY: true,
    left: DOOR_WIDTH - 40, top: DOOR_HEIGHT / 2
});

var knobOut = new fabric.Circle({
    radius: 20, fill: 'black', 
    originX: 'center', originY: 'center', 
    lockMovementX: true, lockMovementY: true,
    left: 40, top: DOOR_HEIGHT / 2
});

canvas_insideMain.add(knobIn);
canvas_outsideMain.add(knobOut);

function lockDoor() {
    popAlert('doorUnlocked');
    pushAlert('doorLocked');
    doorLocked = true;
    redrawNotificationBar();
}

function unlockDoor() {
    popAlert('doorLocked');
    pushAlert('doorUnlocked');
    doorLocked = false;
    redrawNotificationBar();
}

function openDoor() {
    popAlert('doorClosed');
    pushAlert('doorOpen');
    doorClosed = false;
    redrawNotificationBar();
}

function closeDoor() {
    popAlert('doorOpen');
    pushAlert('doorClosed');
    doorClosed = true;
    redrawNotificationBar();
}

knobIn.on('selected', function() {
    // When inside knob is turned, unlock and open the door
    if (doorLocked) unlockDoor();
    if (!doorLocked && doorClosed) openDoor();
    // But close door if it's already open
    else if (!doorLocked && doorOpen) closeDoor();
    canvas_insideMain.deactivateAll();
});

knobOut.on('selected', function() {
    canvas_outsideMain.deactivateAll();
});


// Draw notification bar

var notificationBar = new fabric.Rect({
    selectable: false,
    width: DOOR_WIDTH, height: 80,
    opacity: .5,
    alertQueue: ['doorLocked', 'doorClosed', 'houseAlarm']
});

notificationBar.setGradient('fill', {
    // Add a nice opacity gradient to the notification bar
    x1: 0, y1: 0,
    x2: 0, y2: notificationBar.height,
    colorStops: {
        0: 'rgba(0, 0, 0, 1)',
        1: 'rgba(0, 0, 0, 0)'
    }
});

function pushAlert(alertName) {
    var index = notificationBar.alertQueue.indexOf(alertName);
    // If it's not present, add given alert to the queue at the standard index
    // See 'alertIndices' object at top of code
    if (index < 0) {
        notificationBar.alertQueue.splice(alertIndices[alertName], 0, alertName);
    }
}

function popAlert(alertName) {
    var index = notificationBar.alertQueue.indexOf(alertName);
    // If it's present, remove given alert from the queue
    if (index >= 0) {
        notificationBar.alertQueue.splice(index, 1);
    }
}

function redrawNotificationBar() {
    // Remove previous notifications
    canvas_notificationBar.clear();
    canvas_notificationBar.add(notificationBar);
    var iconMargin = 10;
    var numberOfAlerts = notificationBar.alertQueue.length;
    var iconSize = notificationBar.height * (2/3.);
    // Resize icons if there are too many to fit in the bar width
    if (iconMargin * (numberOfAlerts + 1) + iconSize * numberOfAlerts > DOOR_WIDTH) {
        iconSize = Math.floor((notificationBar.width - iconMargin * (numberOfAlerts + 1)) / numberOfAlerts);
    }
    // Draw each alert from the alert queue
    for (var i = 0; i < numberOfAlerts; i++) {
        var icon = document.getElementById(notificationBar.alertQueue[i]);
        var notification = new fabric.Image(icon, {
            selectable: false,
            originY: 'center',
            width: iconSize,
            height: iconSize,
            // They'll be automatically positioned along the width of the bar
            left: 10 + i * (iconSize + 10),
            top: notificationBar.height / 2,
            type: 'notification',
            id: notificationBar.alertQueue[i]
        });
        canvas_notificationBar.add(notification);
    }
}

// Set lovely wood background
canvas_notificationBar.setBackgroundColor({
    source: 'img/wood.jpg',
    repeat: 'repeat'
}, canvas_notificationBar.renderAll.bind(canvas_notificationBar));

redrawNotificationBar();