$(window).load(function() {
    // Initially populate the notification bar and persistent buttons
    NotificationBar.update();
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
    
    btn_closeMenu.on('selected', function() {
        closeMainMenu();
        inside.deactivateAll();
    });
});