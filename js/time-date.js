/*
    Class: TimeDate
    
        This class handles updating and drawing the clock and current weather display.
*/
function TimeDate() {
    
    /* 
        Variable: timeFormat
        
            Either '12h' or '24h'. Formats time as either h:mm A or H:mm, respectively.
            
        Type: 
        
            String
    */
    this.timeFormat = '12h';
    
    /*
        Variable: dateFormat
        
            Either 'us' or 'eu'. Formats date as either MMMM D, YYYY or D MMMM, YYYY, respectively.
            
        Type:
        
            String
    */
    this.dateFormat = 'us';
    
    /*
        Variable: tempFormat
        
            Either 'f' or 'c'. Displays temperature in Fahrenheit or Celsius units, respectively.
            
        Type:
            
            String
    */
   this.tempFormat = 'f';
     
    // JSON current weather for zip code 60607
    // Please don't call this more than once every 10 minutes
    var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?zip=60607,us&appid=50a85921cbac9b89ef1429c69070473f';
    
    var date = new Text('', {
        originY: 'bottom',
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 4,
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
    
    /*
        Function: updateTime
        
            Parses and formats current time and date. Uses the <moment.js at http://momentjs.com/> library.
    */
    this.updateTime = function() {
        
        // Get an object with current date and time
        var timeObj = moment();
        var timeText, dateText;
                
        // Apply user-chosen formats
        if (this.timeFormat === '12h') {
            timeText = timeObj.format('h:mm A');
        } else {
            timeText = timeObj.format('H:mm');
        }
        switch (this.dateFormat) {
            case 'us':
                dateText = timeObj.format('MMMM D, YYYY');
                break;
            case 'eu':
                dateText = timeObj.format('D MMMM, YYYY');
                break;
        }

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