var canvas_insideMain = new fabric.Canvas('inside-door');
var canvas_outsideMain = new fabric.Canvas('outside-door');
var canvas_notificationBar = new fabric.Canvas('notification-bar');

const DOOR_WIDTH = canvas_insideMain.width;
const DOOR_HEIGHT = canvas_insideMain.height;

var doorClosed = true;
var doorLocked = true;

var alertIndices = {'doorLocked': 0, 'doorUnlocked': 0, 'doorClosed': 1, 'doorOpen': 1, 'houseAlarm': 2}


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
    if (doorLocked) unlockDoor();
    if (!doorLocked && doorClosed) openDoor();
    else if (!doorLocked && doorOpen) closeDoor();
    canvas_insideMain.deactivateAll();
});

knobOut.on('selected', function() {
    canvas_outsideMain.deactivateAll();
});


// Draw notification bar

var notificationBar = new fabric.Rect({
    selectable: false,
    width: DOOR_WIDTH, height: 90,
    opacity: .5,
    alertQueue: ['doorLocked', 'doorClosed', 'houseAlarm']
});

notificationBar.setGradient('fill', {
  // Add a nice opacity gradient to the notification bar
  x1: 0,
  y1: 0,
  x2: 0,
  y2: notificationBar.height,
  colorStops: {
    0: 'rgba(0, 0, 0, 1)',
    1: 'rgba(0, 0, 0, 0)'
  }
});

function pushAlert(alertName) {
    var index = notificationBar.alertQueue.indexOf(alertName);
    // If it's not present, add given alert to the queue
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
    var iconSize = 60;
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

/*canvas_insideMain.setBackgroundColor({
    source: 'img/wood2.jpg',
    repeat: 'repeat'
}, canvas_insideMain.renderAll.bind(canvas_insideMain));*/

//canvas_insideMain.setBackgroundImage('img/wood2.jpg', canvas_insideMain.renderAll.bind(canvas_insideMain));

//canvas_insideMain.backgroundImage.width = canvas_insideMain.getWidth();
//canvas_insideMain.backgroundImage.height = canvas_insideMain.getHeight();

console.log(notificationBar.alertQueue);
redrawNotificationBar();