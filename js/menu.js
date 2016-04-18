function MainMenu() {
    
    // Define the menu area...
    var background = new fabric.Rect({
        selectable: false,
        width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        height: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        fill: '#000', opacity: 0.55,
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70
    });

    // ...and all app buttons
    var close_btn = new Button('cancel', 0, 0, {id: 'closeMainMenu'});
    var houseAlarm_btn = new MenuButton('houseAlarm');
    var noteFromInside_btn = new MenuButton('note');
    var mirror_btn = new MenuButton('mirror');
    var traffic_btn = new MenuButton('traffic');
    var weather_btn = new MenuButton('weather');
    var calendar_btn = new MenuButton('calendar');
    var outsideLight_btn = new MenuButton('outsideLight');
    var log_btn = new MenuButton('log');
    var settings_btn = new MenuButton('settings');
    
    // Menu dimensions are accessible from outside the class
    this.width = background.width;
    this.height = background.height;
    
    this.isVisible = false;
     
    this.open_ = function (x, y) {
        // If not already onscreen
        if (!this.isVisible) {
            // Set all menu button positions relative to one another
            background.set({
                left: x, top: y
            });
            close_btn.set({
                width: background.width / 8, height: background.width / 8,
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
                       
            this.isVisible = true;
        }
    };

    this.close_ = function () {
        if (this.isVisible) {
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
                       
            this.isVisible = false;
        }
    };
    
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
        
    
    calendar_btn.on('selected', function() {
       
       
       var calendarNotificationBackground = new fabric.Rect({
            width: 225,
            height: 225,
            fill: 'white', stroke: 'white',
            originX: 'center', originY: 'center', 
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: calendar_btn.left-20, top: calendar_btn.top,
            id: 'calendarNotificationBackgroundID'
        });
       
        this.canvas.add(calendarNotificationBackground);
       
       
        var titleCalendar = new fabric.Text('Calendar', { 
            fontSize: 18, stroke: '#000000', left: calendarNotificationBackground.left-60 , 
            top: calendarNotificationBackground.top-105});
        
        this.canvas.add(titleCalendar);
       
        var closeCalendar = new fabric.Text('X', { 
            fontSize: 22, stroke: '#000000', left: calendarNotificationBackground.left+85 , 
            top: calendarNotificationBackground.top-110});
        
        this.canvas.add(closeCalendar);
        
        var dividorTitleCalendar = new fabric.Rect({
           width: calendarNotificationBackground.width,
            height: 1,
            fill: 'white', stroke: 'black',
            originX: 'center', originY: 'center', 
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: calendarNotificationBackground.left, 
            top: calendarNotificationBackground.top-75,
            id: 'dividorTitleCalendarID' 
        });
        
        this.canvas.add(dividorTitleCalendar);
        
        var dividorWeekTitleCalendar = new fabric.Rect({
           width: calendarNotificationBackground.width,
            height: 1,
            fill: 'white', stroke: 'black',
            originX: 'center', originY: 'center', 
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: calendarNotificationBackground.left, 
            top: calendarNotificationBackground.top-50,
            id: 'dividorWeekTitleCalendarID' 
        });
        
        this.canvas.add(dividorWeekTitleCalendar);
        
        var timeOneCalendar = new fabric.Text('9:00\n AM', { 
            fontSize: 14, stroke: '#000000', 
            left: calendarNotificationBackground.left-110, 
            top: calendarNotificationBackground.top-45});
        
        this.canvas.add(timeOneCalendar);
        
        var timeTwoCalendar = new fabric.Text('10:00\n AM', { 
            fontSize: 14, stroke: '#000000', 
            left: calendarNotificationBackground.left-110, 
            top: calendarNotificationBackground.top});
        
        this.canvas.add(timeTwoCalendar);
        
        var timeThreeCalendar = new fabric.Text('11:00\n AM', { 
            fontSize: 14, stroke: '#000000', 
            left: calendarNotificationBackground.left-110, 
            top: calendarNotificationBackground.top+45});
        
        this.canvas.add(timeThreeCalendar);
        
        var dividorWeekdayCalendar = new fabric.Rect({
           width: 1,
            height: calendarNotificationBackground.height-65,
            fill: 'white', stroke: 'black',
            originX: 'center', originY: 'center', 
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: calendarNotificationBackground.left-60, 
            top: calendarNotificationBackground.top+30,
            id: 'dividorWeekdayCalendarID' 
        });
        
        this.canvas.add(dividorWeekdayCalendar);
        
        var titleMondayCalendar = new fabric.Text('Mon', { 
            fontSize: 14, stroke: '#000000', 
            left: calendarNotificationBackground.left-45, 
            top: calendarNotificationBackground.top-70});
        
        this.canvas.add(titleMondayCalendar);
        
        var titleTuesdayCalendar = new fabric.Text('Tue', { 
            fontSize: 14, stroke: '#000000', 
            left: calendarNotificationBackground.left+10, 
            top: calendarNotificationBackground.top-70});
        
        this.canvas.add(titleTuesdayCalendar);
        
        var titleWednesdayCalendar = new fabric.Text('Wed', { 
            fontSize: 14, stroke: '#000000', 
            left: calendarNotificationBackground.left+55, 
            top: calendarNotificationBackground.top-70});
        
        this.canvas.add(titleWednesdayCalendar);
        
        var titleActivityOneCalendar = new fabric.Text('Drop off\n Kids', { 
            fontSize: 12, stroke: '#000000', 
            left: calendarNotificationBackground.left-50, 
            top: calendarNotificationBackground.top-45});
        
        this.canvas.add(titleActivityOneCalendar);
        
        var titleActivityTwoCalendar = new fabric.Text('Drop\n Laundry', { 
            fontSize: 12, stroke: '#000000', 
            left: calendarNotificationBackground.left+5, 
            top: calendarNotificationBackground.top+5});
        
        this.canvas.add(titleActivityTwoCalendar);
        
        var titleActivityThreeCalendar = new fabric.Text('Meet\n Tom Hanks', { 
            fontSize: 12, stroke: '#000000', 
            left: calendarNotificationBackground.left+50, 
            top: calendarNotificationBackground.top-45});
        
        this.canvas.add(titleActivityThreeCalendar);
    
        closeCalendar.on('selected', function() {
           closeCalendar.remove();
           titleCalendar.remove();
           dividorTitleCalendar.remove();
           timeOneCalendar.remove();
           timeTwoCalendar.remove();
           timeThreeCalendar.remove();
           dividorWeekTitleCalendar.remove();
           timeOneCalendar.remove();
           dividorWeekdayCalendar.remove();
           titleMondayCalendar.remove();
           titleTuesdayCalendar.remove();
           titleWednesdayCalendar.remove();
           titleActivityOneCalendar.remove();
           titleActivityTwoCalendar.remove();
           titleActivityThreeCalendar.remove();
           calendarNotificationBackground.remove();
        });
        
    });
    
    if(document.getElementById('withPhone').checked === true)
    {
      //  alert("with phone");
        
        var calendarNotificationBubble = new fabric.Rect({
            width: 30,
            height: 20,
            fill: 'red', stroke: 'white',
            originX: 'center', originY: 'center', 
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: Number(calendar_btn.left)+35, top: Number(calendar_btn.top),
            id: 'calendarNotificationBubbleID'
        });
       
       inside.add(calendarNotificationBubble);
    }
    
}