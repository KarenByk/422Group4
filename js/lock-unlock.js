var btn_lockDoor = new Button('doorUnocked', 
    knobIn.left, 
    knobIn.top - ICON_MARGIN - ICON_SIZE);
var btn_unlockDoor = new Button('doorLocked', 
    knobIn.left, 
    knobIn.top - ICON_MARGIN - ICON_SIZE);
var btn_openDoor = new Button('doorClosed', 
    knobIn.left, 
    knobIn.top + ICON_MARGIN + ICON_SIZE);
var btn_closeDoor = new Button('doorOpen', 
    knobIn.left, 
    knobIn.top + ICON_MARGIN + ICON_SIZE);
    
colorRed(btn_unlockDoor);
inside.add(btn_unlockDoor);

inside.add(btn_openDoor);
    
var btn_keypad = new Button('keypad', 
    knobOut.left, 
    knobOut.top + ICON_MARGIN + ICON_SIZE);

outside.add(btn_keypad);