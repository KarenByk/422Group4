/*
    Class: TimeDate
    
        This class handles updating and drawing the clock and current weather display.
*/
function TimeDate() {
    
    var _this = this;
    
    this.timeFormats = ['h:mm A', 'HH:mm'];
    var numberOfTimeFormats = _this.timeFormats.length;
    /* 
        Variable: timeFormat
        
            Time format string.
            
        Type: 
        
            String
    */
    this.currentTimeFormat = _this.timeFormats[0];
    
    this.dateFormats = ['MMMM D, YYYY', 'MMMM Do, YYYY', 'D MMMM, YYYY', 'Do MMMM, YYYY', 'M/D/YY', 'D/M/YY'];
    var numberOfDateFormats = _this.dateFormats.length;
    /*
        Variable: dateFormat
        
            Date format string.
            
        Type:
        
            String
    */
    this.currentDateFormat = _this.dateFormats[0];
    
    /*
        Variable: tempFormat
        
            Either 'f' or 'c'. Displays temperature in Fahrenheit or Celsius units, respectively.
            
        Type:
            
            String
    */
   this.tempFormat = 'f';
   
   this.areSettingsVisible = false;
     
    // JSON current weather for zip code 60607
    // Please don't call this more than once every 10 minutes
    var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?zip=60607,us&appid=50a85921cbac9b89ef1429c69070473f';
    
    var date = new Text('', {
        originY: 'bottom',
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 4.5,
        fontSize: 3 * DOOR_HEIGHT / 70
    });
    
    var icon = new Button('01d', 0, 0, {originX: 'left'});
    
    var time = new Text('', {
        originX: 'left', originY: 'top',
        fontSize: DOOR_HEIGHT / 30
    });
    
    var temp = new Text('', {
        originX: 'left', originY: 'top',
        fontSize: time.fontSize
    });
    
    var background = new fabric.Rect({
        selectable: false,
        width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        height: 3 * ICON_MARGIN + 2 * ICON_SIZE,
        fill: '#000', opacity: 0.55,
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70
    
    });
    var dateFormatText = new Text(_this.currentDateFormat, {fontSize: 12, originY: 'center'});
    var timeFormatText = new Text(_this.currentTimeFormat, {fontSize: 12, originY: 'center'});
    
    var dateForward = new Button('right');
    var dateBackward = new Button('left');
    var timeForward = new Button('right');
    var timeBackward = new Button('left');
    
    var close_btn = new Button('cancel');
    
    this.showSettings = function(x, y) {
        if (_this.areSettingsVisible == false) {
            mainMenu.canBeShown = false;
            background.set({
                left: x, top: y
            });
            close_btn.set({
                width: DOOR_HEIGHT / 40, height: DOOR_HEIGHT / 40,
                left: background.left + background.width, 
                top: background.top
            });
            dateBackward.set({
                originX: 'left', originY: 'top',
                left: background.left, 
                top: background.top + ICON_MARGIN
            });
            dateForward.set({
                originX: 'right', originY: 'top',
                left: background.left + background.width, 
                top: dateBackward.top
            });
            timeBackward.set({
                originX: 'left', originY: 'top',
                left: dateBackward.left, 
                top: dateBackward.top + dateBackward.height + ICON_MARGIN
            });
            timeForward.set({
                originX: 'right', originY: 'top',
                left: dateForward.left, 
                top: timeBackward.top
            });
            dateFormatText.set({
                left: background.left + background.width / 2,
                top: dateBackward.top + dateBackward.height / 2
            });
            timeFormatText.set({
                left: background.left + background.width / 2,
                top: timeBackward.top + timeBackward.height / 2
            });
            inside.add(background,
                       dateBackward,
                       dateForward,
                       timeBackward,
                       timeForward,
                       dateFormatText,
                       timeFormatText,
                       close_btn);
            _this.areSettingsVisible = true;
        }
    };
    
    this.hideSettings = function(x, y) {
        inside.remove(background, 
                      dateBackward,
                      dateForward,
                      timeBackward,
                      timeForward,
                      dateFormatText,
                      timeFormatText,
                      close_btn);
        _this.areSettingsVisible = false;
        mainMenu.canBeShown = true;
    };
    
    dateForward.on('selected', function() {
        var indexOfCurrent = _this.dateFormats.indexOf(_this.currentDateFormat);
        var nextIndex = (indexOfCurrent + 1) % numberOfDateFormats;
        _this.currentDateFormat = _this.dateFormats[nextIndex];
        dateFormatText.setText(_this.currentDateFormat);
        _this.updateTime();
        clearSelection();
    });
    
    dateBackward.on('selected', function() {
        var indexOfCurrent = _this.dateFormats.indexOf(_this.currentDateFormat);
        var prevIndex = (indexOfCurrent - 1 + numberOfDateFormats) % numberOfDateFormats;
        _this.currentDateFormat = _this.dateFormats[prevIndex];
        dateFormatText.setText(_this.currentDateFormat);
        _this.updateTime();
        clearSelection();
    });
    
    timeForward.on('selected', function() {
        var indexOfCurrent = _this.timeFormats.indexOf(_this.currentTimeFormat);
        var nextIndex = (indexOfCurrent + 1) % numberOfTimeFormats;
        _this.currentTimeFormat = _this.timeFormats[nextIndex];
        timeFormatText.setText(_this.currentTimeFormat);
        _this.updateTime();
        clearSelection();
    });
    
    timeBackward.on('selected', function() {
        var indexOfCurrent = _this.timeFormats.indexOf(_this.currentTimeFormat);
        var prevIndex = (indexOfCurrent - 1 + numberOfTimeFormats) % numberOfTimeFormats;
        _this.currentTimeFormat = _this.timeFormats[prevIndex];
        timeFormatText.setText(_this.currentTimeFormat);
        _this.updateTime();
        clearSelection();
    });
    
    close_btn.on('selected', function() {
        _this.hideSettings();
    });
    
    /*
        Function: updateTime
        
            Parses and formats current time and date. Uses the <moment.js at http://momentjs.com/> library.
    */
    this.updateTime = function() {
        
        // Get an object with current date and time
        var timeObj = moment();
        var timeText, dateText;
                
        // Apply user-chosen formats
        timeText = timeObj.format(_this.currentTimeFormat);
        dateText = timeObj.format(_this.currentDateFormat);

        // Update text of each element
        time.setText(timeText);
        date.setText(dateText);
        
        // Then redraw all the clock elements
        updatePositions();
        
    };
    
    /*
        Function: updateWeather
        
            Parses and formats current weather. Also updates weather icon.
    */
    this.updateWeather = function() {
        
        var tempK, tempC, tempF;
        var tempText;
        var condition;
        
        // Pull and parse JSON weather asynchronously
        $.ajax({
            url: weatherURL,
            async: false,
            dataType: 'json',
            success: function (data) {
                tempK = data['main']['temp'];
                condition = data['weather'][0]['icon'];
            }
        });
        
        // Temp is pulled in Kelvin by default, so we have to convert
        tempC = Math.round(tempK - 273.15);
        tempF = Math.round(1.8 * tempC + 32);
        
        // Choose temp to display based on user preference
        if (this.tempFormat == 'f') {
            tempText = tempF.toString() + '°' + 'F';
        } else {
            tempText = tempC.toString() + '°' + 'C';
        }
        
        // Then update text of temp element
        temp.setText(tempText);
        
        // Also update the weather icon, resizing it afterward
        icon.setElement(document.getElementById(condition), null, {width: ICON_SIZE, height: ICON_SIZE});
        
        // Then redraw all the clock elements
        updatePositions();
        
    };
    
    /*
        Function: updatePositions
        
            Properly spaces and centers clock elements.
    */
    var updatePositions = function() {
        
        // Get the total width of time, icon, and temp
        var elementsWidth = time.width + icon.width + temp.width + 2 * ICON_MARGIN;
        
        // Then position them all centered on the door
        time.set({
            left: (DOOR_WIDTH - elementsWidth) / 2,
            top: date.top + 5 
        });
        icon.set({
            left: time.left + time.width + ICON_MARGIN,
            top: time.top + time.height / 2
        });
        temp.set({
            left: icon.left + icon.width + ICON_MARGIN,
            top: time.top
        });
        
        inside.renderAll();
        
    };
    
    /*
        Function: show
        
            Draws clock elements on screen.
    */
    this.show = function() {
        
        inside.add(date, time, icon, temp);
        
    };
    
    /*
        Function: hide
        
            Removes clock elements from screen.
    */
    this.hide = function() {
        
        inside.remove(date, time, icon, temp);
        
    };
    
}
