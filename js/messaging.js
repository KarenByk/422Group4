/*
    Class: Messaging
    
        This class handles handwritten messaging through the door.
*/
function Messaging() {
    
    var _this = this;
    
    var insidePaths = [];
    var outsidePaths = [];
    
    this.isInsideVisible = false;
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
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 4,
        fill: '#000', opacity: 0.5,
        //shadow: 'rgba(0,0,0,1) 0px 0px 5px',
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
        id: 'writingArea'
    });
    
    // ...and accept/close buttons
    var acceptInside_btn = new Button('accept', 
        backgroundInside.left + backgroundInside.width / 2, 
        backgroundInside.top + backgroundInside.height,
        {width: backgroundInside.width / 8, height: backgroundInside.width / 8});
        
    var cancelInside_btn = new Button('cancel', 
        backgroundInside.left + backgroundInside.width / 2, 
        backgroundInside.top,
        {width: backgroundInside.width / 8, height: backgroundInside.width / 8});
        
    var acceptOutside_btn = new Button('accept', 
        backgroundOutside.left + backgroundOutside.width / 2, 
        backgroundOutside.top + backgroundOutside.height,
        {width: backgroundOutside.width / 8, height: backgroundOutside.width / 8});
        
    var cancelOutside_btn = new Button('cancel', 
        backgroundOutside.left + backgroundOutside.width / 2, 
        backgroundOutside.top,
        {width: backgroundOutside.width / 8, height: backgroundOutside.width / 8});
    
    /*
        Function: showInside
        
            Draws the messaging area inside if it's not on screen.
    */
    this.showInside = function() {
        if (!this.isInsideVisible) {
            inside.add(backgroundInside, 
                        acceptInside_btn, 
                        cancelInside_btn);
            this.isInsideVisible = true;
        }
    };
    
    /*
        Function: showOutside
        
            Draws the messaging area outside if it's not on screen.
    */
    this.showOutside = function() {
        if (!this.isOutsideVisible) {
            outside.add(backgroundOutside, 
                        acceptOutside_btn, 
                        cancelOutside_btn);
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
        outsidePaths.push(event.path);
    });
    
}