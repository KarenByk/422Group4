var menuBackground = new fabric.Rect({
    selectable: false,
    width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
    height: 4 * ICON_MARGIN + 3 * ICON_SIZE,
    fill: '#000', opacity: 0.55,
    rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
    visible: false
});

var btn_closeMenu = new Button('cancel');
var btn_houseAlarm = new MenuButton('houseAlarm');
var btn_noteFromInside = new MenuButton('note');
var btn_mirror = new MenuButton('mirror');
var btn_traffic = new MenuButton('traffic');
var btn_weather = new MenuButton('weather');
var btn_calendar = new MenuButton('calendar');
var btn_outsideLight = new MenuButton('outsideLight');
var btn_log = new MenuButton('log');
var btn_settings = new MenuButton('settings');
 
function openMainMenu(x, y) {
    if (!menuBackground.visible) {
        // Set all menu button positions relative to one another
        menuBackground.set({
            left: x, top: y,
            visible: true
        });
        btn_closeMenu.set({
            width: menuBackground.width / 8,
            left: menuBackground.left + menuBackground.width, 
            top: menuBackground.top
        });
        btn_houseAlarm.set({
            left: menuBackground.left + ICON_MARGIN, 
            top: menuBackground.top + ICON_MARGIN
        });
        btn_noteFromInside.set({
            left: btn_houseAlarm.left + ICON_MARGIN + ICON_SIZE, 
            top: btn_houseAlarm.top
        });
        btn_mirror.set({
            left: btn_noteFromInside.left + ICON_MARGIN + ICON_SIZE, 
            top: btn_noteFromInside.top
        });
        btn_traffic.set({
            left: btn_houseAlarm.left,
            top: btn_houseAlarm.top + ICON_MARGIN + ICON_SIZE
        });
        btn_weather.set({
            left: btn_noteFromInside.left,
            top: btn_traffic.top
        });
        btn_calendar.set({
            left: btn_mirror.left,
            top: btn_weather.top
        });
        btn_outsideLight.set({
            left: btn_traffic.left,
            top: btn_traffic.top + ICON_MARGIN + ICON_SIZE
        });
        btn_log.set({
            left: btn_weather.left,
            top: btn_outsideLight.top
        });
        btn_settings.set({
            left: btn_calendar.left,
            top: btn_log.top
        });
        
        // Then add all to inside screen
        inside.add(menuBackground, 
                   btn_houseAlarm, 
                   btn_noteFromInside, 
                   btn_mirror, 
                   btn_traffic, 
                   btn_weather, 
                   btn_calendar, 
                   btn_outsideLight, 
                   btn_log, 
                   btn_settings,
                   btn_closeMenu);
    }
}

function closeMainMenu() {
    if (menuBackground.visible) {
        menuBackground.setVisible(false);
        inside.remove(menuBackground, 
                   btn_houseAlarm, 
                   btn_noteFromInside, 
                   btn_mirror, 
                   btn_traffic, 
                   btn_weather, 
                   btn_calendar, 
                   btn_outsideLight, 
                   btn_log, 
                   btn_settings,
                   btn_closeMenu);
    }
}