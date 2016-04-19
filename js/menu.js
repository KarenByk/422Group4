/*
    Class: MainMenu
    
        This class handles drawing and removing the main menu elements.
*/
function MainMenu() {
    
    var _this = this;
    
    this.canBeShown = true;
    
    // Define the menu area...
    var background = new fabric.Rect({
        selectable: false,
        width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        height: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        fill: '#000', opacity: 0.55,
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70
    });

    // ...and all app buttons
    var close_btn = new Button('cancel');
    var houseAlarm_btn = new MenuButton('houseAlarm');
    var noteFromInside_btn = new MenuButton('noteWrite');
    var mirror_btn = new MenuButton('mirror');
    var traffic_btn = new MenuButton('traffic');
    var weather_btn = new MenuButton('weather');
    var calendar_btn = new MenuButton('calendar');
    var outsideLight_btn = new MenuButton('outsideLight');
    var log_btn = new MenuButton('log');
    var settings_btn = new MenuButton('settings');
    
    var alarmPassword_btn = new Button('keypad');
    alarmPassword_btn.set({
        shadow: 'rgba(0,0,0,1) 0px 0px 7px',
        left: background.left + background.width*1.4, 
        top: DOOR_HEIGHT * .67,
        width: ICON_SIZE * 2,
        height: ICON_SIZE * 2,
    });
    
    var alarmStatus = new Button('offAlarm');
    alarmStatus.set({
        hasControls: false,
        lockMovementX: true, lockMovementY: true,
        height: ICON_SIZE,
        width: ICON_SIZE * 1.5,
        shadow: 'rgba(0,0,0,1) 0px 0px 7px',
        left: background.left + background.width*1.5,
        top: DOOR_HEIGHT *.6
    });
    
    var isAlarmOn = false;
    //var pwCorrect = false;
    
    
    // Menu dimensions are accessible from outside the class
    /* 
        Variable: width
        
            Width of the main menu, in pixels.
        
        Type: 
        
            Integer
    */
    this.width = background.width;
    /*
        Variable: height
        
            Height of the main menu, in pixels.
        
        Type:
        
            Integer
    */
    this.height = background.height;
    /*
        Variable: isVisible
        
            Tracks whether the menu is on screen.
        
        Type:
        
            Boolean
        
    */
    this.isVisible = false;
    
    /* 
        Function: show
        
            Draws the menu if it's not already on screen.
        
        Parameters:
            x (Number) - Horizontal position of the menu's top-left corner, in pixels
            y (Number) - Vertical position of the menu's top-left corner, in pixels
    */
    this.show = function(x, y) {
        
        // If not already on screen
        if (!this.isVisible) {
            // Set all menu button positions relative to one another
            background.set({
                left: x, top: y
            });
            close_btn.set({
                width: DOOR_HEIGHT / 40, height: DOOR_HEIGHT / 40,
                left: background.left + background.width, 
                top: background.top
            });
            houseAlarm_btn.set({
                left: background.left + ICON_MARGIN, 
                top: background.top + ICON_MARGIN
            });
            noteFromInside_btn.set({
                left: houseAlarm_btn.left + ICON_MARGIN + ICON_SIZE, 
                top: houseAlarm_btn.top
            });
            mirror_btn.set({
                left: noteFromInside_btn.left + ICON_MARGIN + ICON_SIZE, 
                top: noteFromInside_btn.top
            });
            traffic_btn.set({
                left: houseAlarm_btn.left,
                top: houseAlarm_btn.top + ICON_MARGIN + ICON_SIZE
            });
            weather_btn.set({
                left: noteFromInside_btn.left,
                top: traffic_btn.top
            });
            calendar_btn.set({
                left: mirror_btn.left,
                top: weather_btn.top
            });
            outsideLight_btn.set({
                left: traffic_btn.left,
                top: traffic_btn.top + ICON_MARGIN + ICON_SIZE
            });
            log_btn.set({
                left: weather_btn.left,
                top: outsideLight_btn.top
            });
            settings_btn.set({
                left: calendar_btn.left,
                top: log_btn.top
            });
            
            // Then add all to inside screen
            inside.add(background, 
                       houseAlarm_btn, 
                       noteFromInside_btn, 
                       mirror_btn, 
                       traffic_btn, 
                       weather_btn, 
                       calendar_btn, 
                       outsideLight_btn, 
                       log_btn, 
                       settings_btn,
                       close_btn);
                    
            // The menu is now visible
            this.isVisible = true;
        }
        
    };

    /* 
        Function: hide
        
            Hides the menu if it's already on screen.
    */
    this.hide = function() {
        
        // If already onscreen
        if (this.isVisible) {
            // Remove all menu buttons
            inside.remove(background, 
                       houseAlarm_btn, 
                       noteFromInside_btn, 
                       mirror_btn, 
                       traffic_btn, 
                       weather_btn, 
                       calendar_btn, 
                       outsideLight_btn, 
                       log_btn, 
                       settings_btn,
                       close_btn);
                  
            // The menu is now invisible
            this.isVisible = false;
        }
        
    };
    
    
    // Listens for a click somewhere on the inside canvas
    inside.on('mouse:down', function(event) {
        if (_this.canBeShown) {
            // If the user hasn't clicked on any object
            if (typeof event.target === 'undefined') {
                var y = 0;
                var p = inside.getPointer(event.e);
                var clickY = p.y;
                
                // x is calculated to keep menu in the middle of the door
                var x = (DOOR_WIDTH - _this.width) / 2;
                
                // y is set to where the user clicks, unless it would force
                //   the menu off the bottom of the screen. In that case
                //   it is brought back to a reasonable position.
                if (clickY > DOOR_HEIGHT - _this.height) {
                    y = DOOR_HEIGHT - _this.height;
                } else {
                    y = clickY;
                }
                
                // Draw the menu at (x,y)
                _this.show(x, y);
            }
            clearSelection();
        }
    });
    
    
    ////
    //  Button behavior
    ////
    
    noteFromInside_btn.on('selected', function () {
        _this.canBeShown = false;
        messaging.hideInside();
        messaging.showInside('write');
        _this.hide();
        clearSelection();
    });
    
    weather_btn.on('selected', function() {
        _this.canBeShown = false;
        weather.showWeather();
        _this.hide();
        clearSelection();
    });
    
    traffic_btn.on('selected', function() {
        _this.hide();
        traffic.show();
        clearSelection();
    });
    
    //Click the settings icon to open the settings menu
    settings_btn.on('selected', function() {
        settingsMenu.show(background.left, background.top);
        _this.hide();
        clearSelection();
    });
    
    // Close the main menu if user has clicked the close button 
    close_btn.on('selected', function() {
        _this.hide();
        clearSelection();
    });
    
    // Click the home alarm icon to turn alarm on/off
    houseAlarm_btn.on('selected', function() {
        _this.hide();
        inside.add(alarmStatus);
        if(isAlarmOn){ //alarm is on, turn it off
            keypad.showInside(['alarmOff']);
        }
        else { //alarm is off, turn it on
            keypad.showInside(['alarmOn']);
        }
        clearSelection();
    });
            
        alarmPassword_btn.on('selected', function() {
           inside.remove(alarmPassword_btn);
           inside.remove(alarmStatus);
           
           pwCorrect = true;          

           if(!isAlarmOn) {
              notificationBar.houseAlarmOn();
               isAlarmOn = true;
               alarmStatus.setElement(document.getElementById('onAlarm'));
               alarmStatus.scaleToWidth(ICON_SIZE*2);
               alarmStatus.scaleToHeight(ICON_SIZE*1.5);
           }

           else  {
               
              isAlarmOn = false;
              notificationBar.houseAlarmOff();
              alarmStatus.setElement(document.getElementById('offAlarm'));
              alarmStatus.scaleToWidth(ICON_SIZE*2);
              alarmStatus.scaleToHeight(ICON_SIZE*1.5);
           }
            clearSelection();
        });
    weather_btn.on('selected', function()
    {
        _this.canBeShown = false;
        weather.showWeather();
        _this.hide();
        clearSelection();
    });

    this.turnAlarmOn = function() {
        inside.remove(alarmStatus);
        notificationBar.houseAlarmOn();
        isAlarmOn = true;
        if(languageMenu.getLang() === 2) {
            alarmStatus.setElement(document.getElementById('onAlarmFr'));
        }
        else {
            alarmStatus.setElement(document.getElementById('onAlarm'));
        }
            alarmStatus.scaleToWidth(ICON_SIZE*1.5);
            alarmStatus.scaleToHeight(ICON_SIZE);
    };
    
    this.turnAlarmOff = function() {
        inside.remove(alarmStatus);
        notificationBar.houseAlarmOff();
        isAlarmOn = false;
        if(languageMenu.getLang() === 2) {
            alarmStatus.setElement(document.getElementById('offAlarmFr'));
        }
        else {
            alarmStatus.setElement(document.getElementById('offAlarm'));
        }
        alarmStatus.scaleToWidth(ICON_SIZE*1.5);
        alarmStatus.scaleToHeight(ICON_SIZE);
    };
    
    // Implemented to fix issue where calling keypad.hide() didn't remove status
    this.hideAlarmStatus = function() {
        inside.remove(alarmStatus);
    };
  
  
    var calendarPhone = false;
    
    calendar_btn.on('selected', function() {
       if(calendarPhone === true)
       {
           //alert("calendarPhone is true");
           var calendarAppRectancle = new fabric.Rect({
                 width: 225,
                 height: 225,
                 fill: 'white', stroke: 'black', 
                 lockMovementX: true, lockMovementY: true,
                // lockScalingX: true, lockScalingY: true,
                left: calendar_btn.left-120, top: calendar_btn.top-75,
                 id: 'calendarAppRectangleID'
            });
            
            fabric.util.loadImage('img/notificationCalendar.png', function(img) {
              calendarAppRectancle.setPatternFill({
                source: img
              });
              inside.renderAll();
            });

             inside.add(calendarAppRectancle);


           
            var closeCalendar = new fabric.Text('X', { 
            fontSize: 22, stroke: '#000000', left: calendarAppRectancle.left+200, 
            top: calendarAppRectancle.top+5});
        
            this.canvas.add(closeCalendar);
            
            closeCalendar.on('selected', function() {
                closeCalendar.remove();
                calendarAppRectancle.remove();
                notificationBubble.remove();
            });
       }
       else
       {
       var calendarAppRectancle = new fabric.Rect({
                 width: 225,
                 height: 225,
                 fill: 'white', stroke: 'black', 
                 lockMovementX: true, lockMovementY: true,
                // lockScalingX: true, lockScalingY: true,
                left: calendar_btn.left-120, top: calendar_btn.top-75,
                 id: 'calendarAppRectangleID'
            });
            
            fabric.util.loadImage('img/calendarAppOriginal.png', function(img) {
              calendarAppRectancle.setPatternFill({
                source: img
              });
              inside.renderAll();
            });

             inside.add(calendarAppRectancle);


           
            var closeCalendar = new fabric.Text('X', { 
            fontSize: 22, stroke: '#000000', left: calendarAppRectancle.left+200, 
            top: calendarAppRectancle.top+5});
        
            this.canvas.add(closeCalendar);
            
            closeCalendar.on('selected', function() {
                closeCalendar.remove();
                calendarAppRectancle.remove();
                notificationBubble.remove();
            });       
        }
        clearSelection();
    });
    
    log_btn.on('selected', function() {
       missedMenu.show(background.left, background.top);
       clearSelection();
    });
    
    mirror_btn.on('selected', function() {
      
        var mirrorBackgroundShape = new fabric.Rect({
            width: 250,
            height: 1100,
            fill: 'white', stroke: 'black',
            originX: 'center', originY: 'center', 
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: 190, top: 650,
            id: 'mirrorBackground'
        });    
  
       this.canvas.add(mirrorBackgroundShape);
      
        
        var closeMirror = new fabric.Text('X', { 
            fontSize: 40, stroke: '#000000', left: 275, top: 350 });
        
        this.canvas.add(closeMirror);
        
        var userHead = new fabric.Circle({ 
            radius: 50,
            fill: 'white', 
            stroke: 'black', 
            originX: 'center', originY: 'center', 
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: 200, top: 250,
            id: 'userHeadId'
        });
        
        this.canvas.add(userHead);
        
        var userBody = new fabric.Rect({
           width: 1,
            height: 250,
            fill: 'white', stroke: 'black',
            originX: 'center', originY: 'center', 
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: 200, top: 425,
            id: 'userBodyId' 
        });
        
        this.canvas.add(userBody);
        
        var userLeftHand = new fabric.Rect({
           width: 1,
            height: 75,
            fill: 'white', stroke: 'black',
            originX: 'center', originY: 'center', 
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: 180, top: 400,
            angle: -30,
            id: 'userBodyId' 
        });
        
        this.canvas.add(userLeftHand);
        
        var userRightHand = new fabric.Rect({
           width: 1,
            height: 75,
            fill: 'white', stroke: 'black',
            originX: 'center', originY: 'center', 
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: 220, top: 400,
            angle: 30,
            id: 'userBodyId' 
        });
        
        this.canvas.add(userRightHand);
        
        var userLeftLeg = new fabric.Rect({
           width: 1,
            height: 160,
            fill: 'white', stroke: 'black',
            originX: 'center', originY: 'center', 
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: 173, top: 620,
            angle: -160,
            id: 'userLeftLegId' 
        });
        
        this.canvas.add(userLeftLeg);
        
        var userRightLeg = new fabric.Rect({
           width: 1,
            height: 160,
            fill: 'white', stroke: 'black',
            originX: 'center', originY: 'center', 
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: 228, top: 620,
            angle: 160,
            id: 'userRightLegId' 
        });
        
        this.canvas.add(userRightLeg);
        
        closeMirror.on('selected', function() {
            userHead.remove();
            userBody.remove();
            userLeftHand.remove();
            userRightHand.remove();
            userLeftLeg.remove();
            userRightLeg.remove();
            mirrorBackgroundShape.remove();
            closeMirror.remove();
        });
        
    });
    
     var outsideLightBool = false;
    
    outsideLight_btn.on('selected', function() {
        
        if(outsideLightBool === false)
        {
           notificationBar.outsideLight();  
           outsideLightBool = true;
        }
        else
        {
            notificationBar.outsideLightOff();
            outsideLightBool = false;
        }
    });



}

