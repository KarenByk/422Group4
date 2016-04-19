/* 
    Class: GUI
    
        This class handles the drawing, placement, and removing of GUI objects. It also handles (un)locking and opening/closing the door.
    
    Parameters:
    
        notificationBar (Object) - Instance of a <NotificationBar> object.
*/
function GUI(notificationBar) {
    
    var _this = this;
    
    // Door starts closed and locked
    /*
        Variable: isClosed
        
            Tracks whether the door is closed.
        
        Type:
        
            Boolean
    */
    this.isClosed = true;
    /*
        Boolean: isLocked
        
            Tracks whether the door is locked.
        
        Type:
        
            Boolean
    */
    this.isLocked = true;
     /*
        Boolean: isAway
        
            Tracks whether the door is inactive or not. 
            False: not active
            True: active screen
        
        Type:
        
            Boolean
    */
    this.isAway = true;
    
    this.needsPassword = false;
    
    var notificationBar = notificationBar;
    
    var knobIn = new fabric.Circle({
        radius: DOOR_WIDTH / 26, 
        fill: 'black', stroke: 'white',
        originX: 'center', originY: 'center', 
        lockMovementX: true, lockMovementY: true,
        lockScalingX: true, lockScalingY: true,
        left: 9 * DOOR_WIDTH / 10, top: 2 * DOOR_HEIGHT / 3,
        id: 'knobIn'
    });

    var knobOut = new fabric.Circle({
        radius: DOOR_WIDTH / 26, 
        fill: 'black', stroke: 'white',
        originX: 'center', originY: 'center', 
        lockMovementX: true, lockMovementY: true,
        lockScalingX: true, lockScalingY: true,
        left: DOOR_WIDTH / 10, top: 2 * DOOR_HEIGHT / 3,
        id: 'knobOut'
    });
    this.knobOutX = knobOut.left;
    
    // Implemented to prevent lock-in during emergency
    this.bringKnobsToFront = function() {
        notificationBar.update();
        inside.bringToFront(knobIn);
        outside.bringToFront(knobOut);
    };
    
    var address = new Text('422', {
        selectable: false,
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 70,
        fontSize: DOOR_HEIGHT / 10,
        id: 'address'
    });
    var awayScreen = new fabric.Rect({
        selectable: true,
        originX: 'center',
        width: DOOR_WIDTH,
        height: DOOR_HEIGHT,
        left:0, top:0,
        fill: '#000', opacity: 0.8
    });
    
    var lock_btn = new Button('unlocked', 
        knobIn.left, 
        knobIn.top - ICON_MARGIN - ICON_SIZE,
        {id: 'lock'});
        
    var unlock_btn = new Button('locked', 
        knobIn.left,
        knobIn.top - ICON_MARGIN - ICON_SIZE,
        {id: 'unlock'});
        
    var open_btn = new Button('closed', 
        knobIn.left, 
        knobIn.top + ICON_MARGIN + ICON_SIZE,
        {id: 'open'});
        
    var close_btn = new Button('open', 
        knobIn.left, 
        knobIn.top + ICON_MARGIN + ICON_SIZE,
        {id: 'close'});
        
    var user_btn = new Button('user', 
        knobIn.left - ICON_MARGIN - ICON_SIZE, 
        //DOOR_HEIGHT / 2 - ICON_MARGIN - ICON_SIZE,
        knobIn.top,
        {id: 'selectUser'});
        
    var help_btn = new Button('help', 
        knobOut.left,
        //DOOR_HEIGHT / 2 + ICON_MARGIN + ICON_SIZE,
        lock_btn.top,
        {id: 'help'});
        
    var emergency_btn = new Button('emergency', 
        knobOut.left, 
        help_btn.top - ICON_MARGIN - ICON_SIZE,
        {id: 'emergency'});
        
    var doorbell_btn = new Button('doorbell', 
        knobOut.left, 
        knobOut.top - ICON_MARGIN - ICON_SIZE,
        {id: 'doorbell'});
        
    var noteFromOutside_btn = new Button('noteWrite', 
        knobOut.left + ICON_MARGIN + ICON_SIZE, 
        knobOut.top,
        {id: 'noteFromOutside'});
        
    var unreadNote = new Button('newMessage',
        knobOut.left,
        emergency_btn.top - ICON_MARGIN - 2 * ICON_SIZE);
        
    var keypad_btn = new Button('keypad', 
        knobOut.left, 
        knobOut.top + ICON_MARGIN + ICON_SIZE,
        {id: 'keypad'});
        
    var password_btn = new Button('keypad',
        knobIn.left - ICON_SIZE*4,
        knobIn.top - ICON_SIZE,
        {id: 'password'});
        
    password_btn.set({
        width: ICON_SIZE * 2,
        height: ICON_SIZE * 2,
    });
    
    // Public variables used in positioning keypad
    this.noteBtnX = noteFromOutside_btn.left;
    this.noteBtnY = noteFromOutside_btn.top;
    this.userBtnX = user_btn.left;
    this.userBtnY = user_btn.top;
    
    this.approachFromOutside = function() {
        
        if ($('#hasDevice').prop('checked')) {
            _this.unlock();
            _this.openDoor();
            var strUser = e.options[e.selectedIndex].value;

        } else {
            camera.showOutsideView();
        }
        
    };
    
    this.approachFromInside = function() {
    
        var e = document.getElementById("DeviceDetect");
        var strUser = e.options[e.selectedIndex].value;
        console.log(strUser);
        if (document.getElementById("hasDevice").checked === true) {
            fourPanel.showPanel(strUser);

        }
        camera.hideOutsideView();
    
    };
    
    /*
        Function: drawButtons
        
            Draws persistent buttons on screen.
    */
    this.drawButtons = function() {
        
        if (this.isLocked) {inside.add(unlock_btn)}
        else {inside.add(lock_btn)}
        if (this.isClosed) {inside.add(open_btn)}
        else {inside.add(close_btn)}
        inside.add(user_btn,
                   emergency_btn,
                   help_btn);
        outside.add(doorbell_btn,
                    noteFromOutside_btn,
                    keypad_btn);
                    
    };
    
    /*
        Function: removeButtons
        
            Removes persistent buttons from screen.
    */
    this.removeButtons = function() {
        
        inside.remove(lock_btn,
                      unlock_btn,
                      close_btn,
                      open_btn,
                      user_btn,
                      emergency_btn,
                      help_btn);
        outside.remove(doorbell_btn,
                       noteFromOutside_btn,
                       keypad_btn);
                    
    };
    
    /*
        Function: drawKnobs
            
            Draws doorknobs on screen.
    */
    this.drawKnobs = function() {
        
        inside.add(knobIn);
        outside.add(knobOut);
        
    };
    
    /*
        Function: removeKnobs
            
            Removes doorknobs from screen.
    */
    this.removeKnobs = function() {
        
        inside.remove(knobIn);
        inside.remove(knobOut);
        
    };
    
    /*
        Function: drawAddress
            
            Draws address on door outside.
    */
    this.drawAddress = function() {
        
        outside.add(address);
        
    };
    
    /*
        Function: removeAddress
            
            Removes address from door outside.
    */
    this.removeAddress = function() {
        
        outside.remove(address);
        
    };
    
    /*
        Function: unlock
        
            Unlocks the door and calls <NotificationBar.unlocked>.
            If child lock is on, require password before opening.
    */
    this.unlock = function() {
        
        if (this.isLocked) {
            inside.add(lock_btn);
            inside.remove(unlock_btn);
            notificationBar.unlocked();
            this.isLocked = false;
        }
        
    };
    
    /*
        Function: lock
        
            Locks the door and calls <NotificationBar.locked>.
    */
    this.lock = function() {
        
        if (!this.isLocked) {
            if (settingsMenu.isChildLockOn) {this.needsPassword = true;}
            inside.add(unlock_btn);
            inside.remove(lock_btn);
            notificationBar.locked();
            this.isLocked = true;
        }
        
    };
    
    /*
        Function: openDoor
        
            Opens the door and calls <NotificationBar.doorOpened>.
            If child lock is on, require password before opening.
    */
    this.openDoor = function() {
        
        if (this.isClosed && !this.isLocked) {
            inside.add(close_btn);
            inside.remove(open_btn);
            notificationBar.doorOpened();
            this.isClosed = false;
        }
        
    };
    
    /*
        Function: closeDoor
        
            Closes the door and calls <NotificationBar.doorClosed>.
    */
    this.closeDoor = function() {
        
        if (!this.isClosed) {
            if (settingsMenu.isChildLockOn) {this.needsPassword = true;}
            inside.add(open_btn);
            inside.remove(close_btn);
            notificationBar.doorClosed();
            this.isClosed = true;
        }
        
    };
    
    /*
        Function: showUnreadNote
        
            Alerts user of an unread note from outside.
    */
    this.showUnreadNote = function() {
        
        inside.add(unreadNote);
        
    };
    
    /*
        Function: hideUnreadNote
        
            Removes unread note icon.
    */
    this.hideUnreadNote = function() {
        
        inside.remove(unreadNote);
        
    };
    
    ////
    // Physical door behavior
    ////
    
    // Lock the door when 'lock' button is touched
    lock_btn.on('selected', function(){
        _this.lock();
        clearSelection();
    });
    
    // Unlock the door when 'unlock' button is touched
    unlock_btn.on('selected', function(){
        if(!_this.needsPassword) {
            _this.unlock();
        } else {
            mainMenu.hide();
            settingsMenu.hide();
            keypad.showInside(['unlock']);
        }
        clearSelection();
    });
    
    // Unlock and open or close the door if inside knob is touched
    knobIn.on('selected', function(){
        if (_this.isClosed) { 
            _this.unlock();
            _this.openDoor();
        } else {
            _this.closeDoor();
            if (_this.needsPassword) {
                _this.lock();
            }
        }
        clearSelection();
    });
    
    // Open or close the door if outside knob is touched
    knobOut.on('selected', function(){
        if (_this.isLocked && $('#hasDevice').prop('checked')) {
            _this.unlock();
            _this.openDoor();
        } else if (!_this.isLocked && _this.isClosed) { 
            _this.openDoor();
        } else if (!_this.isClosed) {
            _this.closeDoor();
        }
        clearSelection();
    });
    
    // Close the door when 'close' button is touched
    close_btn.on('selected', function(){
        _this.closeDoor();
        if (_this.needsPassword) {
            _this.lock();
        }
        clearSelection();
    });
    
    // Unlock and open the door when 'open' button is touched
    open_btn.on('selected', function(){
        if(!_this.needsPassword) {
            _this.unlock();
            _this.openDoor();
        } else {
            mainMenu.hide();
            settingsMenu.hide();
            console.log('showing');
            keypad.showInside(['unlock', 'open']);
        }
        clearSelection();
    });
    
    
    ////
    //  Button behavior
    ////
    
    doorbell_btn.on('selected', function() {
        doorbell.chime();
        camera.showOutsideView();
        clearSelection();
    });
    
    keypad_btn.on('selected', function() {
        if (_this.isLocked) {
            keypad.showOutside(['unlock']);
        }
        clearSelection();
    });
    
    noteFromOutside_btn.on('selected', function(){
        messaging.showOutside('write');
        clearSelection();
    });
    
    unreadNote.on('selected', function(){
        messaging.showInside('read');
        inside.remove(unreadNote);
        notificationBar.messageRead();
        clearSelection();
    });
    
    emergency_btn.on('selected', function()
    {
        emergency.showOutside();
        emergency.showInside();
        inside.add(knobIn);
        outside.add(knobOut);
        clearSelection();
    });
    user_btn.on('selected', function()
    {
        profile.show();
        clearSelection();
    });
    awayScreen.on('selected', function()
    {
        /*door is active*/
        if(isAway)
        {
            inside.remove(awayScreen);
            //means not that it is active
            isAway = false;
        }
        else 
        {
            sleep(5000);
            inside.add(awayScreen);
            isAway= true;
        }

    });
}
