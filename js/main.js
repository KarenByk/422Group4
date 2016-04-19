// Instantiate classes
var notificationBar = new NotificationBar();
var gui = new GUI(notificationBar);
var doorbell = new Doorbell();
var camera = new Camera();
var missedMenu = new MissedVisitorMenu();
//var camera = new Camera();
var mainMenu = new MainMenu();
var settingsMenu = new SettingsMenu();
var wallpaperMenu = new WallpaperMenu();
var clock = new TimeDate();
var messaging = new Messaging();
var keypad = new Keypad();
var emergency = new Emergency();
var weather = new Weather();
var traffic = new Traffic();
var languageMenu = new LanguageMenu();
//this is directly from door symbol
var profile = new Profile();
//when device is near- above unction will call this later
var fourPanel = new FourPanel();
//creating and changing profile from settings- independant of others 
var profileSettings = new ProfileSettings();
//part of profileSettings.js and 
var createProf = new CreateProfile();

// Initialize interface buttons and alerts
gui.drawKnobs();
gui.drawAddress();
gui.drawButtons();
notificationBar.update();

// Pull time and weather, then set clock to update time every 10 sec 
// and weather every 10 min
clock.updateTime();
clock.updateWeather();
setInterval(function(){
    clock.updateTime();
}, 10000);
setInterval(function(){
    clock.updateWeather();
}, 600000);
// Then draw it
clock.show();

// Initialize inside and outside wallpapers
wallpaperMenu.set(inside, 'grass');
wallpaperMenu.set(outside, 'wood');
