var inside = new fabric.Canvas('inside-door');
var outside = new fabric.Canvas('outside-door');

const DOOR_WIDTH = inside.width;
const DOOR_HEIGHT = inside.height;
const ICON_SIZE = Math.round(DOOR_WIDTH / 9);
const ICON_MARGIN = Math.round(DOOR_WIDTH / 30);

var doorIsClosed = true;
var doorIsLocked = true;

function clearSelection() {
    inside.deactivateAll();
    outside.deactivateAll();
}


/**
 * Subclasses
 */

// Notification(name)
//   str name is the image filename without extension
var Notification = fabric.util.createClass(fabric.Image, {
    type: 'notification',
    initialize: function(name) {
        this.callSuper('initialize', 
            document.getElementById(name), {
                selectable: false,
                originY: 'center',
                shadow: 'rgba(0,0,0,1) 0px 0px 5px'
                //id: name
            });
    }
});

// Button(name, x, y)
//   str name is the image filename without extension
//   ints x and y are the position (origin at object's center)
var Button = fabric.util.createClass(fabric.Image, {
    type: 'button',
    initialize: function(name, x, y, options) {
        this.callSuper('initialize', document.getElementById(name), options);
        this.set({
            lockMovementX: true, lockMovementY: true,
            width: ICON_SIZE, height: ICON_SIZE,
            left: x || 0, top: y || 0,
            originX: 'center', originY: 'center',
            shadow: 'rgba(0,0,0,1) 0px 0px 7px'
            //id: name
        });
    }
});

// MenuButton(name, x, y)
//   str name is the image filename without extension
//   ints x and y are the position (origin at object's left top corner)
var MenuButton = fabric.util.createClass(Button, {
    type: 'menuButton',
    initialize: function(name, x, y, options) {
        this.callSuper('initialize', name, x, y, options);
        this.set({
            left: x || 0, top: y || 0, 
            originX: 'left', originY: 'top'
        });
    }
});

var Text = fabric.util.createClass(fabric.Text, {
    type: 'text',
    initialize: function(str, options) {
        this.callSuper('initialize', str, options);
        this.set({
            originX: 'center',
            fill: 'white',
            fontFamily: 'droid-sans-bold',
            shadow: 'rgba(0,0,0,1) 0px 0px 5px'
       });
    }
});


/**
 * Filters
 */
 
var redFilter = new fabric.Image.filters.Tint({
    color: '#FF1900',
    opacity: 0.4
});

var greenFilter = new fabric.Image.filters.Tint({
    color: '#00FF73',
    opacity: 0.3
});

function colorRed(img) {
    img.filters.push(redFilter);
    img.applyFilters(inside.renderAll.bind(inside));
}

function colorGreen(img) {
    img.filters.push(greenFilter);
    img.applyFilters(inside.renderAll.bind(inside));
}


/**
 * Doorknobs
 */

var knobIn = new fabric.Circle({
    radius: DOOR_WIDTH / 20, 
    fill: 'black', stroke: 'white',
    originX: 'center', originY: 'center', 
    lockMovementX: true, lockMovementY: true,
    lockScalingX: true, lockScalingY: true,
    left: DOOR_WIDTH - 40, top: DOOR_HEIGHT / 2
});

var knobOut = new fabric.Circle({
    radius: DOOR_WIDTH / 20, 
    fill: 'black', stroke: 'white',
    originX: 'center', originY: 'center', 
    lockMovementX: true, lockMovementY: true,
    lockScalingX: true, lockScalingY: true,
    left: 40, top: DOOR_HEIGHT / 2
});

inside.add(knobIn);
outside.add(knobOut);

knobIn.on('selected', function() {
    clearSelection();
});

knobOut.on('selected', function() {
    clearSelection();
});


/**
 * Doorbell
 */

var doorbell = new Button('doorbell', 
    knobOut.left, 
    knobOut.top - ICON_MARGIN - ICON_SIZE);

outside.add(doorbell);


/**
 * Keypad
 */

var btn_keypad = new Button('keypad', 
    knobOut.left, 
    knobOut.top + ICON_MARGIN + ICON_SIZE);

outside.add(btn_keypad);


/**
 * Outside address
 */
 
var outsideAddress = new Text('123', {
    left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 70,
    fontSize: DOOR_HEIGHT / 10
});

outside.add(outsideAddress);


/**
 * Note from outside
 */
 
var btn_noteFromOutside = new Button('note', 
    knobOut.left + ICON_MARGIN + ICON_SIZE, 
    knobOut.top);

outside.add(btn_noteFromOutside);


/**
 * Notification bar
 */




/**
 * Notification handling
 */
 
function NotificationBar() {
    // Define the notification bar area...
    var notificationBackground = new fabric.Rect({
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
    colorRed(_locked);
    colorGreen(_unlocked);
    
    // This is used when removing all notifications from the screen
    var allNBarElements = [notificationBackground, _locked, _unlocked, _closed, _open, _houseAlarm, _childLock, _newMessage, _outsideLight];
    
    // Array of initial alerts
    var alerts = [_locked, _closed, _houseAlarm];
    
    this.unlock = function() {
        if (doorIsLocked) {
            pushAlert(_unlocked, 0);
            popAlert(_locked);
            doorIsLocked = false;
            this.update();
        }
    };
    
    this.lock = function() {
        if (!doorIsLocked) {
            pushAlert(_locked, 0);
            popAlert(_unlocked);
            doorIsLocked = true;
            this.update();
        }
    };
    
    this.update = function() {
        // Remove previous notifications if there are any
        for (var i in allNBarElements) {
            if (allNBarElements[i]) {
                inside.remove(allNBarElements[i]);
            }
        }
        
        var numberOfAlerts = alerts.length;
        var nBarIconSize = notificationBackground.height / 1.75;
        
        // Resize icons if there are too many to fit in the bar width
        if (ICON_MARGIN * (numberOfAlerts + 1) + nBarIconSize * numberOfAlerts > DOOR_WIDTH) {
            nBarIconSize = Math.floor((notificationBackground.width - ICON_MARGIN * (numberOfAlerts + 1)) / numberOfAlerts);
        }
        
        // Draw the notification area background
        inside.add(notificationBackground);
        
        // Draw each alert from the alert queue
        for (var i in alerts) {
            alerts[i].set({
                width: nBarIconSize, 
                height: nBarIconSize,
                // They'll be auto-positioned along the width of the bar
                left: ICON_MARGIN + i * (nBarIconSize + ICON_MARGIN),
                top: notificationBackground.height / 2
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


/**
 * Persistent icons (lock/unlock, emergency, etc.)
 */
 
// Button class is initialized as Button(name, x, y), where
//   str name is the image filename without extension
//   ints x and y are the position, measured from the object's center
var btn_lock = new Button('unlocked', 
    knobIn.left, 
    knobIn.top - ICON_MARGIN - ICON_SIZE);
var btn_unlock = new Button('locked', 
    knobIn.left, 
    knobIn.top - ICON_MARGIN - ICON_SIZE);
var btn_open = new Button('closed', 
    knobIn.left, 
    knobIn.top + ICON_MARGIN + ICON_SIZE);
var btn_close = new Button('open', 
    knobIn.left, 
    knobIn.top + ICON_MARGIN + ICON_SIZE);
var btn_user = new Button('user', 
    knobOut.left, 
    DOOR_HEIGHT / 2 - ICON_MARGIN - ICON_SIZE);
var btn_emergency = new Button('emergency', 
    knobOut.left, 
    DOOR_HEIGHT / 2);
var btn_help = new Button('help', 
    knobOut.left, 
    DOOR_HEIGHT / 2 + ICON_MARGIN + ICON_SIZE);

colorRed(btn_unlock);
colorGreen(btn_lock);
colorRed(btn_emergency);

function drawPersistentButtons() {
    inside.add(btn_unlock,
               btn_open,
               btn_user,
               btn_emergency,
               btn_help);
}




/**
 * Time, date, and weather
 */
 
var date = new Text('April 1, 2016', {
    originY: 'bottom',
    left: DOOR_WIDTH / 2, top: 150,
    fontSize: 30
});

var clock = new Text('12:34 PM', {
    originY: 'center',
    left: DOOR_WIDTH / 3, top: date.top,
    fontSize: 24
});

var weatherIcon = new Button('sunny', clock.left + 100, clock.top);

var temp = new Text('99°', {
    left: clock.left + 150, top: clock.top,
    fontSize: 24
});

inside.add(date);

var TimeWeatherDisplay = {
    currentTime: moment()
};

var weatherURL = "http://api.wunderground.com/api/efbcf26a4deb3978/conditions/q/IL/Chicago.json";

$.getJSON(weatherURL, function(data) {
    data['current_observation']['feelslike_f'];
});

/**
 * Main menu
 */

var menuBackground = new fabric.Rect({
    selectable: false,
    width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
    height: 4 * ICON_MARGIN + 3 * ICON_SIZE,
    fill: '#000', opacity: 0.55,
    rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
    visible: false
});

var btn_closeMenu = new Button('cancel');
var btn_houseAlarm = new MenuButton('houseAlarm');
var btn_noteFromInside = new MenuButton('note');
var btn_mirror = new MenuButton('mirror');
var btn_traffic = new MenuButton('traffic');
var btn_weather = new MenuButton('weather');
var btn_calendar = new MenuButton('calendar');
var btn_outsideLight = new MenuButton('outsideLight');
var btn_log = new MenuButton('log');
var btn_settings = new MenuButton('settings');
 
function openMainMenu(x, y) {
    if (!menuBackground.visible) {
        // Set all menu button positions relative to one another
        menuBackground.set({
            left: x, top: y,
            visible: true
        });
        btn_closeMenu.set({
            width: menuBackground.width / 8,
            left: menuBackground.left + menuBackground.width, 
            top: menuBackground.top
        });
        btn_houseAlarm.set({
            left: menuBackground.left + ICON_MARGIN, 
            top: menuBackground.top + ICON_MARGIN
        });
        btn_noteFromInside.set({
            left: btn_houseAlarm.left + ICON_MARGIN + ICON_SIZE, 
            top: btn_houseAlarm.top
        });
        btn_mirror.set({
            left: btn_noteFromInside.left + ICON_MARGIN + ICON_SIZE, 
            top: btn_noteFromInside.top
        });
        btn_traffic.set({
            left: btn_houseAlarm.left,
            top: btn_houseAlarm.top + ICON_MARGIN + ICON_SIZE
        });
        btn_weather.set({
            left: btn_noteFromInside.left,
            top: btn_traffic.top
        });
        btn_calendar.set({
            left: btn_mirror.left,
            top: btn_weather.top
        });
        btn_outsideLight.set({
            left: btn_traffic.left,
            top: btn_traffic.top + ICON_MARGIN + ICON_SIZE
        });
        btn_log.set({
            left: btn_weather.left,
            top: btn_outsideLight.top
        });
        btn_settings.set({
            left: btn_calendar.left,
            top: btn_log.top
        });
        
        // Then add all to inside screen
        inside.add(menuBackground, 
                   btn_houseAlarm, 
                   btn_noteFromInside, 
                   btn_mirror, 
                   btn_traffic, 
                   btn_weather, 
                   btn_calendar, 
                   btn_outsideLight, 
                   btn_log, 
                   btn_settings,
                   btn_closeMenu);
    }
}

function closeMainMenu() {
    if (menuBackground.visible) {
        menuBackground.setVisible(false);
        inside.remove(menuBackground, 
                   btn_houseAlarm, 
                   btn_noteFromInside, 
                   btn_mirror, 
                   btn_traffic, 
                   btn_weather, 
                   btn_calendar, 
                   btn_outsideLight, 
                   btn_log, 
                   btn_settings,
                   btn_closeMenu);
    }
}

/* function setWallpaper(canvas, img) {
    var url = 'img/wall/' + img + '.jpg';
    canvas.setBackgroundImage(url, canvas.renderAll.bind(canvas), {
        width: DOOR_WIDTH,
        height: DOOR_HEIGHT,
        // Needed to position backgroundImage at 0,0
        originX: 'left',
        originY: 'top'
    });
} */
 
$(window).load(function() {
    // Initially populate the notification bar and persistent buttons
    var notificationBar = new NotificationBar();
    notificationBar.update();
    
    drawPersistentButtons();
    inside.setBackgroundImage('img/wall/grass.jpg', inside.renderAll.bind(inside), {
        width: DOOR_WIDTH,
        height: DOOR_HEIGHT,
        // Needed to position backgroundImage at 0,0
        originX: 'left',
        originY: 'top'
    });
    
    outside.setBackgroundImage('img/wall/wood4.jpg', outside.renderAll.bind(outside), {
        width: DOOR_WIDTH,
        height: DOOR_HEIGHT,
        // Needed to position backgroundImage at 0,0
        originX: 'left',
        originY: 'top'
    });
        
    // Listens for a click somewhere on the canvas
    inside.on('mouse:down', function(event) {
        // If the user hasn't clicked on an object...
        if (typeof event.target === 'undefined') {
            var clickY = inside.getPointer(event.e).y;
            
            // x is calculated to keep menu in the middle of the door
            var x = (DOOR_WIDTH - menuBackground.width) / 2;
            
            // y is set to where the user clicks, unless it would force
            //   the menu off the bottom of the screen. In that case
            //   it is brought back to a reasonable position.
            var y = 0;
            if (clickY > DOOR_HEIGHT - menuBackground.height) {
                y = DOOR_HEIGHT - menuBackground.height;
            } else {
                y = clickY;
            }
            
            openMainMenu(x, y);
        }
    });
    
    btn_unlock.on('selected', function() {
        inside.add(btn_lock);
        inside.remove(btn_unlock);
        notificationBar.unlock();
        clearSelection();
    });

    btn_lock.on('selected', function() {
        inside.add(btn_unlock);
        inside.remove(btn_lock);
        notificationBar.lock();
        clearSelection();
    });
    
    btn_closeMenu.on('selected', function() {
        closeMainMenu();
        inside.deactivateAll();
    });
});