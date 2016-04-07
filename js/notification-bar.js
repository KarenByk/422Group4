/*
    Class: NotificationBar
    
        This class handles drawing and removing of on screen notifications.
*/
function NotificationBar() {
    
    // Define the notification bar area...
    var background = new fabric.Rect({
        selectable: false,
        width: DOOR_WIDTH, height: DOOR_HEIGHT / 9,
        opacity: 0.55
    });

    // ...and all notifications
    var _locked = new Notification('locked');
    var _unlocked = new Notification('unlocked');
    var _closed = new Notification('closed');
    var _open = new Notification('open');
    var _houseAlarm = new Notification('houseAlarm');
    var _childLock = new Notification('childLock');
    var _newMessage = new Notification('newMessage');
    var _outsideLight = new Notification('outsideLight');
    
    // Color the locked/closed and unlocked/open icons
    /* colorRed(_locked);
    colorGreen(_unlocked); */
    
    // This is used when removing all notifications from the screen
    var allNBarElements = [background, _locked, _unlocked, _closed, _open, _houseAlarm, _childLock, _newMessage, _outsideLight];
    
    // Array of initial alerts
    var alerts = [_locked, _closed, _houseAlarm];
    
    /*
        Function: unlocked
        
        Alerts user that the door has been unlocked.
    */
    this.unlocked = function() {
        pushAlert(_unlocked, 0);
        popAlert(_locked);
        this.update();
    };
    
    /*
        Function: locked
        
        Alerts user that the door has been locked.
    */
    this.locked = function() {
        pushAlert(_locked, 0);
        popAlert(_unlocked);
        this.update();
    };
    
    /*
        Function: doorOpened
        
        Alerts user that the door has been opened.
    */
    this.doorOpened = function() {
        pushAlert(_open, 1);
        popAlert(_closed);
        this.update();
    }
    
    /*
        Function: doorClosed
        
        Alerts user that the door has been closed.
    */
    this.doorClosed = function() {
        pushAlert(_closed, 1);
        popAlert(_open);
        this.update();
    }
    
    /*
        Function: update
        
        Redraws the current alert queue. It is preferable to interact with the notification bar through the specific functions (<locked>, <unlocked>, etc.) as these call <update> when finished.
    */
    this.update = function() {
        // Remove previous notifications if there are any
        for (var i in allNBarElements) {
            if (allNBarElements[i]) {
                inside.remove(allNBarElements[i]);
            }
        }
        
        var numberOfAlerts = alerts.length;
        var nBarIconSize = background.height / 1.75;
        
        // Resize icons if there are too many to fit in the bar width
        if (ICON_MARGIN * (numberOfAlerts + 1) + nBarIconSize * numberOfAlerts > DOOR_WIDTH) {
            nBarIconSize = Math.floor((background.width - ICON_MARGIN * (numberOfAlerts + 1)) / numberOfAlerts);
        }
        
        // Draw the notification area background
        inside.add(background);
        
        // Draw each alert from the alert queue
        for (var i in alerts) {
            alerts[i].set({
                width: nBarIconSize, 
                height: nBarIconSize,
                // They'll be auto-positioned along the width of the bar
                left: ICON_MARGIN + i * (nBarIconSize + ICON_MARGIN),
                top: background.height / 2
            });
            inside.add(alerts[i]);
        }
    };
    
    // Adds alertName to current alerts at position i
    var pushAlert = function(alertName, i) {
        var index = alerts.indexOf(alertName);
        // If it's not present, add given alert to the queue at the standard index
        if (index < 0) {
            alerts.splice(i, 0, alertName);
        }
    };
    
    // Removes alertName from current alerts, if it exists
    var popAlert = function(alertName) {
        var index = alerts.indexOf(alertName);
        // If it's present, remove given alert from the queue
        if (index >= 0) {
            alerts.splice(index, 1);
        }
    };
    
}