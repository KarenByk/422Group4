/*
    Class: WallpaperMenu
    
        This class handles updating the door wallpapers.
*/
function WallpaperMenu() {
    
    var _this = this;
    
    this.wallpapers = ['abstract', 'blue', 'grass', 'hex', 'smoky', 'wood2', 'wood3', 'wood4', 'halloween'];
    
    this.selectedSide = 'inside';
    
    var background = new fabric.Rect({
        selectable: false,
        width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        height: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        top: DOOR_HEIGHT / 2.5,
        fill: '#000', opacity: 0.55,
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70
    });
    
    var close_btn = new Button('cancel');
        
    var selectionHighlight = new fabric.Rect({
        originX: 'center', originY: 'center',
        selectable: false,
        fill: '#fff', opacity: 0.55,
        rx: DOOR_HEIGHT / 200, ry: DOOR_HEIGHT / 200
    });
    
    var insideText = new Text('Inside', {
        originX: 'left', 
        fontSize: DOOR_HEIGHT / 42, 
        selectable: true});
        
    var outsideText = new Text('Outside', {
        originX: 'left', 
        fontSize: DOOR_HEIGHT / 42,
        selectable: true});
    
    var textWidth = insideText.width + ICON_MARGIN + outsideText.width;
    
    var landscapes_btn = new MenuButton('landscapes');
    var holidays_btn = new MenuButton('holidays');
    var textures_btn = new MenuButton('textures');
    
    var selectSide = function(obj) {
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
            left: x, top: y
        });
        insideText.set({
            left: background.left + (background.width - textWidth) / 2, 
            top: background.top + ICON_MARGIN,
        });
        outsideText.set({
            left: insideText.left + insideText.width + ICON_MARGIN, 
            top: insideText.top
        });
        landscapes_btn.set({
            left: background.left + ICON_MARGIN,
            top: background.top + 2 * ICON_MARGIN + ICON_SIZE
        });
        holidays_btn.set({
            left: landscapes_btn.left + ICON_SIZE + ICON_MARGIN,
            top: landscapes_btn.top
        });
        textures_btn.set({
            left: holidays_btn.left + ICON_SIZE + ICON_MARGIN,
            top: holidays_btn.top
        });
        close_btn.set({
            width: background.width / 8, height: background.width / 8,
            left: background.left + background.width, 
            top: background.top
        });
        
        // Then add all to the inside screen
        inside.add(background, 
                   insideText, 
                   outsideText,
                   landscapes_btn,
                   holidays_btn,
                   textures_btn,
                   close_btn);
                   
        // Select inside by default
        selectSide(insideText);
        
    };
    
    /*
        Function: hide
        
            Hides the wallpaper selection menu.
    */
    this.hide = function() {
        
        mainMenu.canBeShown = true;
        
        inside.remove(background, 
                      insideText, 
                      outsideText,
                      landscapes_btn,
                      holidays_btn,
                      textures_btn,
                      selectionHighlight,
                      close_btn);
        
    };
    
    /*
        Function: setInside
        
            Sets the inside wallpaper.
            
        Parameters:
        
            img (String) - Filename of image, with extension.
    */
    this.setInside = function(img) {
        
        var url = 'img/wall/' + img;
        inside.setBackgroundImage(url, inside.renderAll.bind(inside), {
            width: DOOR_WIDTH,
            height: DOOR_HEIGHT,
            // Needed to position backgroundImage at 0,0
            originX: 'left',
            originY: 'top'
        });
        
    }
    
    /*
        Function: setOutside
        
            Sets the outside wallpaper.
            
        Parameters:
        
            img (String) - Filename of image, with extension.
    */
    this.setOutside = function(img) {
        
        var url = 'img/wall/' + img;
        outside.setBackgroundImage(url, outside.renderAll.bind(outside), {
            width: DOOR_WIDTH,
            height: DOOR_HEIGHT,
            // Needed to position backgroundImage at 0,0
            originX: 'left',
            originY: 'top'
        });
        
    }
    
    ////
    //  Button behavior
    ////
    
    landscapes_btn.on('selected', function() {
        inside.remove(landscapes_btn, holidays_btn, textures_btn);
        clearSelection();
    });
    
    holidays_btn.on('selected', function() {
        inside.remove(landscapes_btn, holidays_btn, textures_btn);
        clearSelection();
    });
    
    textures_btn.on('selected', function() {
        inside.remove(landscapes_btn, holidays_btn, textures_btn);
        clearSelection();
    });
    
    close_btn.on('selected', function() {
        _this.hide();
        clearSelection();
    });
    
    insideText.on('selected', function() {
        selectSide(insideText);
        clearSelection();
    });
    
    outsideText.on('selected', function() {
        selectSide(outsideText);
        clearSelection();
    });
    
}