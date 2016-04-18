/*
    Class: Messaging
    
        This class handles handwritten messaging through the door.
*/
function Messaging() {
    
    var _this = this;
    
    var unreadMessage = [];
    var insidePaths = [];
    var outsidePaths = [];
    
    /*
        Variable: isInsideVisible
        
            Tracks whether the inside writing area is visible.
        
        Type:
        
            Boolean
    */
    this.isInsideVisible = false;
    
    /*
        Variable: isOutsideVisible
        
            Tracks whether the outside writing area is visible.
        
        Type:
        
            Boolean
    */
    this.isOutsideVisible = false;
    
    
    // Define the writing areas...
    var backgroundInside = new fabric.Rect({
        selectable: false,
        originX: 'center',
        width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        height: 4 * ICON_MARGIN + 2 * ICON_SIZE,
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 3,
        fill: '#000', opacity: 0.5,
        //shadow: 'rgba(0,0,0,1) 0px 0px 5px',
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
        id: 'writingArea'
    });
    
    var backgroundOutside = new fabric.Rect({
        selectable: false,
        originX: 'center',
        width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        height: 4 * ICON_MARGIN + 2 * ICON_SIZE,
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 3,
        fill: '#000', opacity: 0.5,
        //shadow: 'rgba(0,0,0,1) 0px 0px 5px',
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
        id: 'writingArea'
    });
    
    // ...and accept/close buttons
    var acceptInside_btn = new Button('accept', 
        backgroundInside.left + backgroundInside.width / 2, 
        backgroundInside.top + backgroundInside.height,
        {width: DOOR_HEIGHT / 40, height: DOOR_HEIGHT / 40,});
        
    var cancelInside_btn = new Button('cancel', 
        backgroundInside.left + backgroundInside.width / 2, 
        backgroundInside.top,
        {width: DOOR_HEIGHT / 40, height: DOOR_HEIGHT / 40,});
        
    var acceptOutside_btn = new Button('accept', 
        backgroundOutside.left + backgroundOutside.width / 2, 
        backgroundOutside.top + backgroundOutside.height,
        {width: DOOR_HEIGHT / 40, height: DOOR_HEIGHT / 40,});
        
    var cancelOutside_btn = new Button('cancel', 
        backgroundOutside.left + backgroundOutside.width / 2, 
        backgroundOutside.top,
        {width: DOOR_HEIGHT / 40, height: DOOR_HEIGHT / 40,});
    
    /*
        Function: showInside
        
            Draws the messaging area inside if it's not on screen.
            
        Parameters:
        
            mode (String) - The mode (either 'read' or 'write') of the inside drawing area.
    */
    this.showInside = function(mode) {
        
        if (!this.isInsideVisible) {
            inside.add(backgroundInside, 
                        cancelInside_btn);
            if (mode === 'write') {
                inside.add(acceptInside_btn);
            }
            if (mode === 'read') {
                for (var i in unreadMessage) {
                    inside.add(unreadMessage[i]);
                }
            }
            this.isInsideVisible = true;
            mainMenu.canBeShown = false;
        }
        
    };
    
    /*
        Function: showOutside
        
            Draws the messaging area outside if it's not on screen.
            
        Parameters:
        
            mode (String) - The mode (either 'read' or 'write') of the outside drawing area.
    */
    this.showOutside = function(mode) {
        
        if (!this.isOutsideVisible) {
            outside.add(backgroundOutside, 
                        cancelOutside_btn);
            if (mode === 'write') {
                outside.add(acceptOutside_btn);
            }
            if (mode === 'read') {
                for (var i in outsidePaths) {
                    outside.add(outsidePaths[i]);
                }
            }
            this.isOutsideVisible = true;
        }
        
    };
    
    /*
        Function: hideInside
        
            Clears inside messaging area.
    */
    this.hideInside = function() {
        
        if (this.isInsideVisible) {
            inside.remove(backgroundInside,
                           acceptInside_btn,
                           cancelInside_btn);
            for (var i in insidePaths) {
                inside.remove(insidePaths[i]);
            }
            for (var i in unreadMessage) {
                inside.remove(unreadMessage[i]);
            }
            insidePaths = [];
            unreadMessage = [];
            this.isInsideVisible = false;
            mainMenu.canBeShown = true;
        }
        
    };
    
    /*
        Function: hideOutside
        
            Clears outside messaging area.
    */
    this.hideOutside = function() {
        
        if (this.isOutsideVisible) {
            outside.remove(backgroundOutside,
                           acceptOutside_btn,
                           cancelOutside_btn);
            for (var i in outsidePaths) {
                outside.remove(outsidePaths[i]);
            }
            outsidePaths = [];
            this.isOutsideVisible = false;
            mainMenu.canBeShown = true;
        }
        
    };
    
    
    // Set color and width of drawing brush
    inside.freeDrawingBrush.color = '#fff';
    outside.freeDrawingBrush.color = '#fff';
    inside.freeDrawingBrush.width = DOOR_WIDTH / 80;
    outside.freeDrawingBrush.width = DOOR_WIDTH / 80;
    
    
    ////
    //  Button behavior
    ////
    
    acceptInside_btn.on('selected', function() {
        outsidePaths = insidePaths.slice();
        _this.hideInside();
        _this.showOutside('read');
        clearSelection();
    });
    
    acceptOutside_btn.on('selected', function() {
        unreadMessage = outsidePaths.slice();
        _this.hideOutside();
        notificationBar.messageReceived();
        gui.showUnreadNote();
        clearSelection();
    });
    
    cancelInside_btn.on('selected', function() {
        _this.hideInside();
        clearSelection();
    });
    
    cancelOutside_btn.on('selected', function() {
        _this.hideOutside();
        clearSelection();
    });
    
    
    ////
    //  Drawing behavior
    ////
    
    inside.on('mouse:over', function(event){
        if (event.target.id === 'writingArea') {
            inside.isDrawingMode = true;
        }
    });
    
    inside.on('mouse:out', function(event){
        if (event.target.id === 'writingArea') {
            inside.isDrawingMode = false;
        }
    });
    
    inside.on('path:created', function(event) {
        event.path.set({selectable: false});
        insidePaths.push(event.path);
    });
    
    outside.on('mouse:over', function(event){
        if (event.target.id === 'writingArea') {
            outside.isDrawingMode = true;
        }
    });
    
    outside.on('mouse:out', function(event){
        if (event.target.id === 'writingArea') {
            outside.isDrawingMode = false;
        }
    });
    
    outside.on('path:created', function(event) {
        event.path.set({selectable: false});
        outsidePaths.push(event.path);
    });
    
}