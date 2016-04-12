
    // Instantiate classes
    var notificationBar = new NotificationBar();
    var gui = new GUI(notificationBar);
    var mainMenu = new MainMenu();
    var wallpaper = new Wallpaper();
    var clock = new TimeDate();
    //var settingsMenu = new SettingsMenu();
    var x;
    var y;

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
    wallpaper.setInside('grass.jpg');
    wallpaper.setOutside('wood4.jpg');
    
    // Listen for a click somewhere on the inside canvas
    inside.on('mouse:down', function(event) {
        
        // If the user hasn't clicked on any object
        if (typeof event.target === 'undefined') {
            var clickY = inside.getPointer(event.e).y;
            
            // x is calculated to keep menu in the middle of the door
            x = (DOOR_WIDTH - mainMenu.width) / 2;
            
            // y is set to where the user clicks, unless it would force
            //   the menu off the bottom of the screen. In that case
            //   it is brought back to a reasonable position.
            y = 0;
            if (clickY > DOOR_HEIGHT - mainMenu.height) {
                y = DOOR_HEIGHT - mainMenu.height;
            } else {
                y = clickY;
            }
            
            mainMenu.show(x, y);
        } 
        
        // Unlock and open or close the door if inside knob is touched
        else if (event.target.id === 'knobIn') {
            if (gui.isClosed) { 
                if (gui.isLocked) {
                    gui.unlock();
                }
                gui.openDoor();
            } else {
                gui.closeDoor();
            }
        }
        // Lock the door when 'unlocked' icon is touched
        else if (event.target.id === 'lock') {
            gui.lock();
        }
        // Unlock the door when 'locked' icon is touched
        else if (event.target.id === 'unlock') {
            gui.unlock();
        }
        // Close the door when 'open' icon is touched
        else if (event.target.id === 'close') {
            gui.closeDoor();
        }
        // Unlock and open the door when 'closed' icon is touched
        else if (event.target.id === 'open') {
            if (gui.isClosed) { 
                if (gui.isLocked) {
                    gui.unlock();
                }
                gui.openDoor();
            }
        }
        
        // Close the main menu if user has clicked on the close button 
        else if (event.target.id === 'closeMainMenu') {
            mainMenu.hide();
        }

        clearSelection();
        
    });
    
    // Listen for a click somewhere on the inside canvas
    outside.on('mouse:down', function(event) {
        if (event.target.id === 'noteFromOutside') {

        }
    });
    
    function getX() {
        return x;
    }
    
    function getY() {
        return y;
    }