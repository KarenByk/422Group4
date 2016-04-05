function GUI(notificationObject) {
    
    this.isClosed = true;
    this.isLocked = true;
    
    var notificationBar = notificationObject;
    
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
        
    /* colorRed(unlock_btn);
    colorRed(emergency_btn);
    colorGreen(lock_btn); */
    
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
    
    this.drawKnobs = function() {
        inside.add(knobIn);
        outside.add(knobOut);
    };
    
    this.removeKnobs = function() {
        inside.remove(knobIn);
        inside.remove(knobOut);
    };
    
    this.drawAddress = function() {
        outside.add(address);
    };
    
    this.removeAddress = function() {
        outside.remove(address);
    };
    
    this.unlock = function() {
        if (this.isLocked) {
            inside.add(lock_btn);
            inside.remove(unlock_btn);
            notificationBar.unlocked();
            this.isLocked = false;
        }
    };
    
    this.lock = function() {
        if (!this.isLocked) {
            inside.add(unlock_btn);
            inside.remove(lock_btn);
            notificationBar.locked();
            this.isLocked = true;
        }
    };
    
    this.open_ = function() {
        if (this.isClosed) {
            inside.add(close_btn);
            inside.remove(open_btn);
            notificationBar.doorOpened();
            this.isClosed = false;
        }
    };
    
    this.close_ = function() {
        if (!this.isClosed) {
            inside.add(open_btn);
            inside.remove(close_btn);
            notificationBar.doorClosed();
            this.isClosed = true;
        }
    };
    
}