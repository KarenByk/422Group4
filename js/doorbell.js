function Doorbell() {

    var _this = this;
    
    var tones = ['Descending', 'Shimmering', 'Melodic', 'Strange'];
    
    _this.currentTone = tones[0];
    
    _this.areSettingsVisible = false;
    
    var background = new fabric.Rect({
        selectable: false,
        width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        height: 2 * ICON_MARGIN + ICON_SIZE,
        fill: '#000', opacity: 0.55,
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70
    
    });
    var toneText = new Text(_this.currentTone, {fontSize: 15, originY: 'center'});
    
    var toneForward = new Button('right');
    var toneBackward = new Button('left');
    
    var close_btn = new Button('cancel');
    
    _this.chime = function() {

        document.getElementById(_this.currentTone).play();
        
    };
    
    this.showSettings = function(x, y) {
        if (_this.areSettingsVisible == false) {
            mainMenu.canBeShown = false;
            background.set({
                left: x, top: y
            });
            close_btn.set({
                width: DOOR_HEIGHT / 40, height: DOOR_HEIGHT / 40,
                left: background.left + background.width, 
                top: background.top
            });
            toneBackward.set({
                originX: 'left', originY: 'top',
                left: background.left, 
                top: background.top + ICON_MARGIN
            });
            toneForward.set({
                originX: 'right', originY: 'top',
                left: background.left + background.width, 
                top: toneBackward.top
            });
            toneText.set({
                left: background.left + background.width / 2,
                top: toneBackward.top + ICON_SIZE / 2
            });
            inside.add(background,
                       toneBackward,
                       toneForward,
                       toneText,
                       close_btn);
            _this.areSettingsVisible = true;
        }
    };
    
    this.hideSettings = function() {
        inside.remove(background,
                       toneBackward,
                       toneForward,
                       toneText,
                       close_btn);
        _this.areSettingsVisible = false;
        mainMenu.canBeShown = true;
    };
    
    toneForward.on('selected', function() {
        var indexOfCurrent = tones.indexOf(_this.currentTone);
        var nextIndex = (indexOfCurrent + 1) % tones.length;
        _this.currentTone = tones[nextIndex];
        toneText.setText(_this.currentTone);
        _this.chime();
        clearSelection();
    });
    
    toneBackward.on('selected', function() {
        var indexOfCurrent = tones.indexOf(_this.currentTone);
        var prevIndex = (indexOfCurrent - 1 + tones.length) % tones.length;
        _this.currentTone = tones[prevIndex];
        toneText.setText(_this.currentTone);
        _this.chime();
        clearSelection();
    });
    
    close_btn.on('selected', function() {
        _this.hideSettings();
        clearSelection();
    });
    
}
