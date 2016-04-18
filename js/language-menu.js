/*
    Class: LanguageMenu
    
        This class handles updating the door wallpapers.
*/
function LanguageMenu() {
    
    var Thumbnail = fabric.util.createClass(fabric.Image, {
        type: 'thumbnail',
        initialize: function(img, options) {
            this.callSuper('initialize', document.getElementById(img));
            this.set({
                hasControls: false,
                lockMovementX: true, lockMovementY: true,
                height: ICON_SIZE, width: ICON_SIZE,
                shadow: 'rgba(0,0,0,1) 0px 0px 7px'
            });
            this.set(options);
        }
    });
    
    var _this = this;
    var lang = 1; //1 = English 2 = French

    
    var background = new fabric.Rect({
        selectable: false,
        width: 4 * ICON_MARGIN + 5 * ICON_SIZE,
        height: 4 * ICON_MARGIN + 6 * ICON_SIZE,
        top: DOOR_HEIGHT / 2.5,
        fill: '#000', opacity: 0.55,
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70
    });
    
    var close_btn = new Button('cancel');
    
    var back_btn = new MenuButton('left');
        
    var selectionHighlight = new fabric.Rect({
        originX: 'center', originY: 'center',
        selectable: false,
        fill: '#fff', opacity: 0.55,
        rx: DOOR_HEIGHT / 200, ry: DOOR_HEIGHT / 200
    });
    
    var allFlag_btn = new MenuButton('allFlags');
    var english_btn = new MenuButton('usFlag');
    var french_btn = new MenuButton('frenchFlag');
    allFlag_btn.set({
        wdith: background.width,
        height: background.height,
        top: background.top,
        left: background.left
    });
    
    
    var selectLang = function(obj) {
        if (obj === usFlag) {
            lang = "english";
        } else {
            lang = "french";
        }
        inside.remove(selectionHighlight, insideText, outsideText);
        selectionHighlight.set({
            width: 1.2 * obj.width, 
            height: obj.height,
            left: obj.left + obj.width / 2, 
            top: obj.top + obj.height / 2});
        inside.add(selectionHighlight, insideText, outsideText);
    };

    
    /* 
        Function: show
        
            Draws the menu if it's not already on screen.
        
        Parameters:
            x (Number) - Horizontal position of the menu's top-left corner, in pixels
            y (Number) - Vertical position of the menu's top-left corner, in pixels
    */
    this.show = function(x, y) {
        
        mainMenu.canBeShown = false;
        
        // Set all menu elements relative to each other
        background.set({
            left: x - (ICON_SIZE * 1.5), 
            top: y
        });
        allFlag_btn.set({
           left: background.left,
           top: background.top,
           width: background.width,
           height: background.height
        });
        english_btn.set({
            left: background.left + ICON_MARGIN/8,
            top: background.top + ICON_MARGIN/13,
            width: ICON_SIZE * 1.8,
            height: ICON_SIZE * 1.5,
            shadow: 'rgba(0,0,0,1) 0px 0px 0px',
        });
        french_btn.set({
            left: english_btn.left + ICON_SIZE + ICON_MARGIN*2,
            top: english_btn.top,
            width: ICON_SIZE * 1.5,
            height: ICON_SIZE * 1.5,
            shadow: 'rgba(0,0,0,1) 0px 0px 0px',
        });
        close_btn.set({
            width: background.width / 8, height: background.width / 8,
            left: background.left + background.width, 
            top: background.top
        });
        back_btn.set({
            width: 3 * ICON_SIZE / 4, height: 3 * ICON_SIZE / 4,
            left: background.left, 
            top: background.top - ICON_MARGIN/2
        });
        
        
        // Then add all to the inside screen
        inside.add(background, 
                   allFlag_btn, 
                   english_btn,
                   french_btn,
                   back_btn,
                   close_btn);
    };
    
    /*
        Function: hide
        
            Hides the wallpaper selection menu.
    */
    this.hide = function() {
        
        mainMenu.canBeShown = true;
        
        inside.remove(background, 
                      allFlag_btn,
                      english_btn,
                      french_btn,
                      back_btn,
                      close_btn);       
    };
        
    ////
    //  Button behavior
    ////
    english_btn.on('selected', function() {
        console.log("english"); ///////////DEBUG CODE
        lang = 1; //English
        clearSelection();
    });
    
    french_btn.on('selected', function() {
        console.log("french");  /////////DEBUG CODE
        lang = 2; //French
        clearSelection();
    });
    
    close_btn.on('selected', function() {
        _this.hide();
        clearSelection();
    });
    
    back_btn.on('selected', function() {
        _this.hide();
        settingsMenu.show(background.left, background.top);
    });
    
    this.getLang = function() {
        return lang;
    }

}