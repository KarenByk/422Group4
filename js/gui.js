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
    
    var notificationBar = notificationBar;
    
    var knobIn = new fabric.Circle({
        radius: DOOR_WIDTH / 20, 
        fill: 'black', stroke: 'white',
        originX: 'center', originY: 'center', 
        lockMovementX: true, lockMovementY: true,
        lockScalingX: true, lockScalingY: true,
        left: 9 * DOOR_WIDTH / 10, top: DOOR_HEIGHT / 2,
        id: 'knobIn'
    });

    var knobOut = new fabric.Circle({
        radius: DOOR_WIDTH / 20, 
        fill: 'black', stroke: 'white',
        originX: 'center', originY: 'center', 
        lockMovementX: true, lockMovementY: true,
        lockScalingX: true, lockScalingY: true,
        left: DOOR_WIDTH / 10, top: DOOR_HEIGHT / 2,
        id: 'knobOut'
    });
    
    var address = new Text('123', {
        selectable: false,
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 70,
        fontSize: DOOR_HEIGHT / 10,
        id: 'address'
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
        knobOut.left, 
        DOOR_HEIGHT / 2 - ICON_MARGIN - ICON_SIZE,
        {id: 'selectUser'});
        
    var emergency_btn = new Button('emergency', 
        knobOut.left, 
        DOOR_HEIGHT / 2,
        {id: 'emergency'});
        
    var help_btn = new Button('help', 
        knobOut.left, 
        DOOR_HEIGHT / 2 + ICON_MARGIN + ICON_SIZE,
        {id: 'help'});
        
    var doorbell_btn = new Button('doorbell', 
        knobOut.left, 
        knobOut.top - ICON_MARGIN - ICON_SIZE,
        {id: 'doorbell'});
        
    var noteFromOutside_btn = new Button('note', 
        knobOut.left + ICON_MARGIN + ICON_SIZE, 
        knobOut.top,
        {id: 'noteFromOutside'});
        
    var keypad_btn = new Button('keypad', 
        knobOut.left, 
        knobOut.top + ICON_MARGIN + ICON_SIZE,
        {id: 'keypad'});
        
    var password_btn = new Button('keypad',
        knobIn.left - ICON_SIZE*2,
        knobIn.top,
        {id: 'password'});
    password_btn.set({
        width: ICON_SIZE * 2,
        height: ICON_SIZE * 2,
    });
        
    /* colorRed(unlock_btn);
    colorRed(emergency_btn);
    colorGreen(lock_btn); */
    
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
        
        if (this.isClosed) {
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
            inside.add(open_btn);
            inside.remove(close_btn);
            notificationBar.doorClosed();
            this.isClosed = true;
        }
        
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
        var childLockStatus = settingsMenu.getChildLockStatus();
        var passwordCorrect = true;
        if(childLockStatus === true) {
                passwordCorrect = false;
                inside.add(password_btn);
                settingsMenu.hide();
                mainMenu.hide();
                
                password_btn.on('selected', function() {
                    inside.remove(password_btn);        
                    passwordCorrect = true;
                    _this.unlock();
                });
        }
        if(passwordCorrect) {
            _this.unlock();
        }
        clearSelection();
    });
    
    // Unlock and open or close the door if inside knob is touched
    knobIn.on('selected', function(){
        if (_this.isClosed) { 
            if (_this.isLocked) {
                _this.unlock();
            }
            _this.openDoor();
        } else {
            _this.closeDoor();
        }
        clearSelection();
    });
    
    // Close the door when 'close' button is touched
    close_btn.on('selected', function(){
        _this.closeDoor();
        clearSelection();
    });
    
    // Unlock and open the door when 'open' button is touched
    open_btn.on('selected', function(){
        var childLockStatus = settingsMenu.getChildLockStatus();
        var passwordCorrect = true;
        if (_this.isClosed) { 
                        
            if(childLockStatus === true) {
                passwordCorrect = false;
                inside.add(password_btn);
                settingsMenu.hide();
                mainMenu.hide();
                
                password_btn.on('selected', function() {
                    inside.remove(password_btn);
                    passwordCorrect = true;
                    _this.unlock();
                    _this.openDoor();
                });
            }
            if(passwordCorrect ) {
                if (_this.isLocked) {
                    _this.unlock();
                }
                _this.openDoor();
            }
        }
        clearSelection();
    });
    
    
    ////
    //  Button behavior
    ////
    
    noteFromOutside_btn.on('selected', function(){
        console.log('note');
        clearSelection();
    });
    
    /*
    password_btn.on('selected', function() {
        inside.remove(password_btn);        
    });
    */
}