function TimeDate() {
    
    this.timeFormat = '24h';
    this.dateFormat = 'us';
    
    var weatherURL = "http://api.wunderground.com/api/efbcf26a4deb3978/conditions/q/IL/Chicago.json";
    
    var date = new Text('', {
        originY: 'bottom',
        left: DOOR_WIDTH / 2, top: 175,
        fontSize: 30,
        fontFamily: 'comic sans'
    });
    
    var time = new Text('12:34 PM', {
        originY: 'center',
        left: DOOR_WIDTH / 3, top: date.top + 15,
        fontSize: 24
    });
    
    var temp = new Text('99°', {
        originY: 'center',
        left: time.left + 150, top: time.top,
        fontSize: 24
    });
    
    var icon = new Button('sunny', date.left, date.top);
    icon.set({originY: 'top'});
    
    this.update = function() {
        var timeText, dateText;
        if (this.timeFormat === '24h') {
            timeText = moment().format('H:mm');
        } else {
            timeText = moment().format('h:mm A');
        }
        
        var dateText = moment().format('MMMM Do, YYYY');
        time.setText(timeText);
        date.setText(dateText);
    };
    
    this.show = function() {
        this.update();
        inside.add(time, date, temp, icon);
    };
}

/* $.getJSON(weatherURL, function(data) {
    data['current_observation']['feelslike_f'];
}); */