// Instantiate classes
var notificationBar = new NotificationBar();
var gui = new GUI(notificationBar);
var mainMenu = new MainMenu();
var settingsMenu = new SettingsMenu();
var wallpaperMenu = new WallpaperMenu();
var clock = new TimeDate();
var messaging = new Messaging();
var keypad = new Keypad();
var emergency = new Emergency();
var weather = new Weather();
var traffic = new Traffic();

// Initialize interface buttons and alerts
gui.drawKnobs();
gui.drawAddress();
gui.drawButtons();
notificationBar.update();

// Pull time and weather, then set clock to update time every 10 sec 
// and weather every 10 min
clock.updateTime();
//clock.updateWeather();
setInterval(function(){
    clock.updateTime();
}, 10000);
// Commented out for the moment so testing doesn't put us over weather API limit
/* setInterval(function(){
    clock.updateWeather();
}, 600000); */
// Then draw it
clock.show();

// Initialize inside and outside wallpapers
wallpaperMenu.set(inside, 'grass');
wallpaperMenu.set(outside, 'wood');
