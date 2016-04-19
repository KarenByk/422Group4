/*
    Class: WallpaperMenu
    
        This class handles updating the door wallpapers.
*/
function WallpaperMenu() {
    
    var Thumbnail = fabric.util.createClass(fabric.Image, {
        type: 'thumbnail',
        initialize: function(img, options) {
            this.callSuper('initialize', document.getElementById(img));
            this.set({
                hasControls: false,
                lockMovementX: true, lockMovementY: true,
                height: 1.5 * ICON_SIZE, width: ICON_SIZE,
                shadow: 'rgba(0,0,0,1) 0px 0px 7px'
            });
            this.set(options);
        }
    });
    
    var _this = this;
    
    var selectedSide = inside;
    
    var background = new fabric.Rect({
        selectable: false,
        width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        height: 4 * ICON_MARGIN + 3 * ICON_SIZE,
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
    
    var forest_thumb = new Thumbnail('forest');
    var beach_thumb = new Thumbnail('beach');
    var waterfall_thumb = new Thumbnail('waterfall');
    var birthday_thumb = new Thumbnail('birthday');
    var halloween_thumb = new Thumbnail('halloween');
    var christmas_thumb = new Thumbnail('christmas');
    var wood_thumb = new Thumbnail('wood');
    var grass_thumb = new Thumbnail('grass');
    var abstract_thumb = new Thumbnail('abstract');
    
    var selectSide = function(obj) {
        if (obj === insideText) {
            selectedSide = inside;
        } else {
            selectedSide = outside;
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
            left: x, top: y
        });
        insideText.set({
            left: background.left + (background.width - textWidth) / 2, 
            top: background.top + ICON_MARGIN,
        });
        outsideText.set({
            left: insideText.left + insideText.width + ICON_MARGIN, 
            top: insideText.top,
        });
        if(languageMenu.getLang() === 2) {
            outsideText.setText("exterieur");
            insideText.setText("interieur");
            outsideText.set({
               top: insideText.top + insideText.height,
               left: insideText.left
            });
        }
        else {
            outsideText.setText("Outside");
            insideText.setText("Inside");
            outsideText.set({
            left: insideText.left + insideText.width + ICON_MARGIN, 
            top: insideText.top,
        });
        }
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
        forest_thumb.set({
            left: background.left + ICON_MARGIN,
            top: insideText.top + insideText.height + ICON_MARGIN
        });
        beach_thumb.set({
            left: forest_thumb.left + forest_thumb.width + ICON_MARGIN,
            top: forest_thumb.top
        });
        waterfall_thumb.set({
            left: beach_thumb.left + beach_thumb.width + ICON_MARGIN,
            top: beach_thumb.top
        });
        birthday_thumb.set({
            left: forest_thumb.left,
            top: forest_thumb.top
        });
        halloween_thumb.set({
            left: birthday_thumb.left + birthday_thumb.width + ICON_MARGIN,
            top: birthday_thumb.top
        });
        christmas_thumb.set({
            left: halloween_thumb.left + halloween_thumb.width + ICON_MARGIN,
            top: halloween_thumb.top
        });
        wood_thumb.set({
            left: forest_thumb.left,
            top: forest_thumb.top
        });
        grass_thumb.set({
            left: wood_thumb.left + wood_thumb.width + ICON_MARGIN,
            top: wood_thumb.top
        });
        abstract_thumb.set({
            left: grass_thumb.left + grass_thumb.width + ICON_MARGIN,
            top: grass_thumb.top
        });
        close_btn.set({
            width: background.width / 8, height: background.width / 8,
            left: background.left + background.width, 
            top: background.top
        });
        back_btn.set({
            width: 3 * ICON_SIZE / 4, height: 3 * ICON_SIZE / 4,
            left: background.left + ICON_MARGIN, 
            top: background.top + background.height - ICON_MARGIN - ICON_SIZE
        });
        
        
        // Then add all to the inside screen
        inside.add(background, 
                   insideText, 
                   outsideText,
                   close_btn);
                   
        // Select inside by default
        selectSide(insideText);
        
        showCategories();
        
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
                      selectionHighlight,
                      close_btn);
                      
        hideCategories();
        hideLandscapes();
        hideHolidays();
        hideTextures();
        
    };
    
    /*
        Function: set
        
            Sets the wallpaper.
            
        Parameters:
        
            c (Object) - Canvas to change the wallpaper of.
            img (String) - Filename of image, with extension.
    */
    this.set = function(c, img) {
        
        var url = 'img/wall/' + img + '.jpg';
        c.setBackgroundImage(url, c.renderAll.bind(c), {
            width: DOOR_WIDTH,
            height: DOOR_HEIGHT,
            // Needed to position backgroundImage at 0,0
            originX: 'left',
            originY: 'top'
        });
        
    }
    
    var showCategories = function() {
        inside.add(landscapes_btn,
                   holidays_btn,
                   textures_btn);
    };
    
    var hideCategories = function() {
        
        inside.remove(landscapes_btn,
                      holidays_btn,
                      textures_btn);
                      
    };
    
    var showLandscapes = function() {
        
        inside.add(forest_thumb,
                   beach_thumb,
                   waterfall_thumb,
                   back_btn);
                   
    };
    
    var hideLandscapes = function() {
        
        inside.remove(forest_thumb,
                      beach_thumb,
                      waterfall_thumb,
                      back_btn);
                      
    };

    var showHolidays = function() {
        
        inside.add(birthday_thumb,
                   halloween_thumb,
                   christmas_thumb,
                   back_btn);
                   
    };

    var hideHolidays = function() {
        
        inside.remove(birthday_thumb,
                      halloween_thumb,
                      christmas_thumb,
                      back_btn);
                      
    };
    
    var showTextures = function() {
        
        inside.add(wood_thumb,
                   grass_thumb,
                   abstract_thumb,
                   back_btn);
                   
    };
    
    var hideTextures = function() {
        
        inside.remove(wood_thumb,
                      grass_thumb,
                      abstract_thumb,
                      back_btn);
                      
    };

    
    ////
    //  Button behavior
    ////
    
    landscapes_btn.on('selected', function() {
        hideCategories();
        showLandscapes();
        clearSelection();
    });
    
    holidays_btn.on('selected', function() {
        hideCategories();
        showHolidays();
        clearSelection();
    });
    
    textures_btn.on('selected', function() {
        hideCategories();
        showTextures();
        clearSelection();
    });
    
    forest_thumb.on('selected', function() {
        _this.set(selectedSide, 'forest');
        clearSelection();
    });
    
    beach_thumb.on('selected', function() {
        _this.set(selectedSide, 'beach');
        clearSelection();
    });
    
    waterfall_thumb.on('selected', function() {
        _this.set(selectedSide, 'waterfall');
        clearSelection();
    });
    
    birthday_thumb.on('selected', function() {
        _this.set(selectedSide, 'birthday');
        clearSelection();
    });
    
    halloween_thumb.on('selected', function() {
        _this.set(selectedSide, 'halloween');
        clearSelection();
    });
    
    christmas_thumb.on('selected', function() {
        _this.set(selectedSide, 'christmas');
        clearSelection();
    });
    
    wood_thumb.on('selected', function() {
        _this.set(selectedSide, 'wood');
        clearSelection();
    });
    
    grass_thumb.on('selected', function() {
        _this.set(selectedSide, 'grass');
        clearSelection();
    });
    
    abstract_thumb.on('selected', function() {
        _this.set(selectedSide, 'abstract');
        clearSelection();
    });
    
    close_btn.on('selected', function() {
        _this.hide();
        clearSelection();
    });
    
    back_btn.on('selected', function() {
        hideLandscapes();
        hideHolidays();
        hideTextures();
        showCategories();
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
