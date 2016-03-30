var date = new Text('April 1, 2016', {
    originY: 'bottom',
    left: DOOR_WIDTH / 2, top: 150,
    fontSize: 30
});

var clock = new Text('12:34 PM', {
    originY: 'center',
    left: DOOR_WIDTH / 3, top: date.top,
    fontSize: 24
});

var weatherIcon = new Button('sunny', clock.left + 100, clock.top);

var temp = new Text('99°', {
    left: clock.left + 150, top: clock.top,
    fontSize: 24
});

inside.add(date);

var TimeWeatherDisplay = {
    currentTime: moment()
};

var weatherURL = 'http://api.wunderground.com/api/efbcf26a4deb3978/conditions/q/IL/Chicago.json';

$.getJSON(weatherURL, function(data) {
    data['current_observation']['feelslike_f'];
});