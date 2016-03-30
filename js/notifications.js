// Define the notification bar area
var notificationBackground = new fabric.Rect({
    selectable: false,
    width: DOOR_WIDTH, height: DOOR_HEIGHT / 9,
    opacity: 0.55
});

// Add a nice opacity gradient to the notification bar
/* notificationBackground.setGradient('fill', {
    x1: 0, y1: 0,
    x2: 0, y2: notificationBackground.height,
    colorStops: {
        0: 'rgba(0, 0, 0, 1)',
        1: 'rgba(0, 0, 0, 0)'
    }
}); */

inside.add(notificationBackground);

var doorLocked = new Notification('doorLocked');
var doorUnlocked = new Notification('doorUnlocked');
var doorClosed = new Notification('doorClosed');
var doorOpen = new Notification('doorOpen');
var houseAlarm = new Notification('houseAlarm');
var childLock = new Notification('childLock');
var newMessage = new Notification('newMessage');
var outsideLight = new Notification('outsideLight');

// Color the locked/closed and unlocked/open icons
colorRed(doorLocked);
colorGreen(doorUnlocked);


// Notification handling
var NotificationBar = {
    // This is used when removing all notifications from the screen
    allNotifications: [doorLocked, doorUnlocked, doorClosed, doorOpen, houseAlarm, childLock, newMessage, outsideLight],
    
    // Standard positions for each type of notification
    alertIndices: {'doorLocked': 0, 'doorUnlocked': 0, 'doorClosed': 1, 'doorOpen': 1, 'childLock': 2, 'houseAlarm': 3, 'newMessage': 4},
    
    // Array of current alerts
    alerts: [doorLocked, doorClosed, houseAlarm, newMessage],
    
    // Adds alertName to current alerts
    pushAlert: function(alertName) {
        var index = this.alerts.indexOf(alertName);
        // If it's not present, add given alert to the queue at the standard index
        if (index < 0) {
            this.alerts.splice(this.alertIndices[alertName], 0, alertName);
        }
    },
    
    /* Removes alertName from current alerts, if it exists */
    popAlert: function(alertName) {
        var index = this.alerts.indexOf(alertName);
        // If it's present, remove given alert from the queue
        if (index >= 0) {
            this.alerts.splice(index, 1);
        }
    },
    
    update: function() {
        // Remove previous notifications if there are any
        for (var i in this.allNotifications) {
            if (this.allNotifications[i]) {
                inside.remove(this.allNotifications[i]);
            }
        }
        
        var numberOfAlerts = this.alerts.length;
        var nBarIconSize = notificationBackground.height / 1.75;
        
        // Resize icons if there are too many to fit in the bar width
        if (ICON_MARGIN * (numberOfAlerts + 1) + nBarIconSize * numberOfAlerts > DOOR_WIDTH) {
            nBarIconSize = Math.floor((notificationBackground.width - ICON_MARGIN * (numberOfAlerts + 1)) / numberOfAlerts);
        }
        
        // Draw each alert from the alert queue
        for (var i in this.alerts) {
            this.alerts[i].set({
                width: nBarIconSize, 
                height: nBarIconSize,
                // They'll be auto-positioned along the width of the bar
                left: ICON_MARGIN + i * (nBarIconSize + ICON_MARGIN),
                top: notificationBackground.height / 2,
            });
            inside.add(this.alerts[i]);
        }
    }
};