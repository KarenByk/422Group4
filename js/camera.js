function Camera() {

    var _this = this;
    
    _this.guest = 'grandma';
    _this.isVideoPlaying = false;
    _this.isAvatarSelectionVisible = false;
    _this.isAvatarOn = false;
    
    var videoOutside = new fabric.Image(document.getElementById('grandma'), {
        selectable: false,
        top: DOOR_HEIGHT / 3,
        width: DOOR_WIDTH, 
        height: DOOR_WIDTH * 316 / 600,
        originY: 'center'
    });
    
    var videoInside = new fabric.Image(document.getElementById('inside'), {
        selectable: false,
        top: DOOR_HEIGHT / 3,
        width: DOOR_WIDTH, 
        height: DOOR_WIDTH * 316 / 600,
        originY: 'center'
    });
    
    var videoAvatar = new fabric.Image(document.getElementById('avatar'), {
        selectable: false,
        top: DOOR_HEIGHT / 3,
        width: DOOR_WIDTH, 
        height: DOOR_WIDTH * 316 / 600,
        originY: 'center'
    });
    
    var videoInsideSmall = new fabric.Image(document.getElementById('inside'), {
        selectable: false,
        originX: 'right', originY: 'top',
        width: DOOR_WIDTH / 4, 
        height: (DOOR_WIDTH / 4) * 316 / 600,
    });
    
    var videoAvatarSmall = new fabric.Image(document.getElementById('avatar'), {
        selectable: false,
        originX: 'right', originY: 'top',
        width: DOOR_WIDTH / 4, 
        height: (DOOR_WIDTH / 4) * 316 / 600,
    });
    
    var avatarBackground = new fabric.Rect({
        selectable: false,
        width: ICON_MARGIN + 2 * ICON_SIZE,
        height: ICON_SIZE,
        fill: '#000', opacity: 0.55,
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70
    });
    
    var chat_btn = new Button('chat');
    var camera_btn = new Button('camera');
    var avatarOn_btn = new Button('mask');
    var avatarOff_btn = new Button('maskOff');
    var avatarAccept_btn = new Button('accept');
    var avatarCancel_btn = new Button('cancel');
    var closeOutside_btn = new Button('cancel');
    var closeInside_btn = new Button('cancel',0,0,{width: DOOR_HEIGHT / 40, height: DOOR_HEIGHT / 40});

    var timer;
    var missed = 0;
    
    var logVisitor = function() {
        missed++;
        missedMenu.createLog(missed, clock.getDate(), clock.getTime());
        _this.hideOutsideView();
        clearSelection();
    }
    
    _this.showOutsideView = function() {

        if (!_this.isVideoPlaying) {
            _this.isVideoPlaying = true;
            mainMenu.hide();
            mainMenu.canBeShown = false;
            
            videoInsideSmall.set({
                left: videoOutside.left + videoOutside.width - ICON_MARGIN,
                top: videoOutside.top - videoOutside.height / 2 + ICON_MARGIN
            });
            videoAvatarSmall.set({
                left: videoOutside.left + videoOutside.width - ICON_MARGIN,
                top: videoOutside.top - videoOutside.height / 2 + ICON_MARGIN
            });
            chat_btn.set({
                left: gui.knobOutX, top: videoOutside.top - videoOutside.height / 4
            });
            camera_btn.set({
                left: chat_btn.left, top: videoOutside.top
            });
            avatarBackground.set({
                left: camera_btn.left + camera_btn.width, top: camera_btn.top - camera_btn.height / 2
            });
            avatarAccept_btn.set({
                width: DOOR_HEIGHT / 40, height: DOOR_HEIGHT / 40,
                left: avatarBackground.left + avatarBackground.width, top: avatarBackground.top + avatarBackground.height
            });
            avatarCancel_btn.set({
                width: DOOR_HEIGHT / 40, height: DOOR_HEIGHT / 40,
                left: avatarBackground.left + avatarBackground.width, top: avatarBackground.top
            });
            avatarOn_btn.set({
                left: avatarBackground.left + avatarOn_btn.width / 2, top: avatarBackground.top + avatarBackground.height / 2
            });
            avatarOff_btn.set({
                left: avatarBackground.left + avatarBackground.width / 2 + ICON_MARGIN, top: avatarBackground.top + avatarBackground.height / 2
            });
            closeOutside_btn.set({
                left: camera_btn.left, top: videoOutside.top + videoOutside.height / 4
            });
            closeInside_btn.set({
                left: videoInsideSmall.left, top: videoInsideSmall.top
            });
        
            clock.showInline();
            inside.add(videoOutside, 
                       chat_btn, 
                       camera_btn, 
                       closeOutside_btn);
            videoOutside.getElement().play();
            
            fabric.util.requestAnimFrame(function render() {
                inside.renderAll();
                fabric.util.requestAnimFrame(render);
            });
        }
        
        //door answered?
       timer = setTimeout(function() {logVisitor()}, 180000);  //180000 = 3 min
    };
    
    _this.showAvatarSelection = function() {
    
        if (!_this.isAvatarSelectionVisible) {
            inside.add(avatarBackground, 
                       avatarOn_btn, 
                       avatarOff_btn,
                       avatarAccept_btn,
                       avatarCancel_btn);
            _this.isAvatarSelectionVisible = true;
        }
    
    };
    
    _this.hideAvatarSelection = function() {
    
        if (_this.isAvatarSelectionVisible) {
            inside.remove(avatarBackground, 
                       avatarOn_btn, 
                       avatarOff_btn,
                       avatarAccept_btn,
                       avatarCancel_btn);
            _this.isAvatarSelectionVisible = false;
        }
    
    };
    
    _this.hideOutsideView = function() {
    
        _this.isVideoPlaying = false;
        mainMenu.canBeShown = true;
        clock.show();
        inside.remove(videoOutside, chat_btn, camera_btn, closeOutside_btn, videoInsideSmall, closeInside_btn);
        outside.remove(videoInside);
        videoOutside.getElement().pause();
    
    };
    
    _this.showInsideView = function() {

        if (true) {
            //_this.isVideoPlaying = true;
            mainMenu.hide();
            mainMenu.canBeShown = false;
                        
            //chat_btn.set({
                //left: gui.knobOutX, top: videoOutside.top - videoOutside.height / 4
            //});
            //camera_btn.set({
                //left: chat_btn.left, top: videoOutside.top
            //});
            //close_btn.set({
                //left: camera_btn.left, top: videoOutside.top + videoOutside.height / 4
            //});
        
            //clock.showInline();
            outside.add(videoInside);
            videoInside.getElement().play();
            
            fabric.util.requestAnimFrame(function render() {
                outside.renderAll();
                fabric.util.requestAnimFrame(render);
            });
        }
    
    };
    
    _this.showInsideSmall = function() {
    
        if (true) {
            //_this.isVideoPlaying = true;
            mainMenu.hide();
            mainMenu.canBeShown = false;
                        
            //chat_btn.set({
                //left: gui.knobOutX, top: videoOutside.top - videoOutside.height / 4
            //});
            //camera_btn.set({
                //left: chat_btn.left, top: videoOutside.top
            //});
            //close_btn.set({
                //left: camera_btn.left, top: videoOutside.top + videoOutside.height / 4
            //});
        
            //clock.showInline();
            inside.add(videoInsideSmall, closeInside_btn);
            videoInsideSmall.getElement().play();
            
            fabric.util.requestAnimFrame(function render() {
                inside.renderAll();
                fabric.util.requestAnimFrame(render);
            });
        }
    
    };
    
    _this.showAvatar = function() {
    
        if (true) {
            //_this.isVideoPlaying = true;
            mainMenu.hide();
            mainMenu.canBeShown = false;
                        
            //chat_btn.set({
                //left: gui.knobOutX, top: videoOutside.top - videoOutside.height / 4
            //});
            //camera_btn.set({
                //left: chat_btn.left, top: videoOutside.top
            //});
            //close_btn.set({
                //left: camera_btn.left, top: videoOutside.top + videoOutside.height / 4
            //});
        
            //clock.showInline();
            outside.add(videoAvatar);
            videoAvatar.getElement().play();
            
            fabric.util.requestAnimFrame(function render() {
                outside.renderAll();
                fabric.util.requestAnimFrame(render);
            });
        }
    
    };
    
    _this.showAvatarSmall = function() {
    
        if (true) {
            //_this.isVideoPlaying = true;
            mainMenu.hide();
            mainMenu.canBeShown = false;
                        
            //chat_btn.set({
                //left: gui.knobOutX, top: videoOutside.top - videoOutside.height / 4
            //});
            //camera_btn.set({
                //left: chat_btn.left, top: videoOutside.top
            //});
            //close_btn.set({
                //left: camera_btn.left, top: videoOutside.top + videoOutside.height / 4
            //});
        
            //clock.showInline();
            inside.add(videoAvatarSmall, closeInside_btn);
            videoAvatarSmall.getElement().play();
            
            fabric.util.requestAnimFrame(function render() {
                inside.renderAll();
                fabric.util.requestAnimFrame(render);
            });
        }
    
    };
    
    _this.hideInsideView = function() {
    
        inside.remove(videoInsideSmall, closeInside_btn);
        outside.remove(videoInside);
        inside.remove(videoAvatarSmall, closeInside_btn);
        outside.remove(videoAvatar);
        videoInside.getElement().pause();
    
    };
    
    camera_btn.on('selected', function() {
        _this.showAvatarSelection();
        clearTimeout(timer); //don't log visitor
        clearSelection();
    });
    
    chat_btn.on('selected', function() {
        _this.hideOutsideView();
        messaging.showInside('write');
        clearTimeout(timer); //don't log visitor
        clearSelection();
    });
    
    closeOutside_btn.on('selected', function() {
        _this.hideOutsideView();
        _this.hideInsideView();
        _this.hideAvatarSelection();
        clearTimeout(timer); //don't log visitor
        clearSelection();
    });
    
    closeInside_btn.on('selected', function() {
        _this.hideInsideView();
        clearSelection();
    });
    
    avatarOn_btn.on('selected', function() {
        _this.isAvatarOn = true;
        clearSelection();
    });
    
    avatarOff_btn.on('selected', function() {
        _this.isAvatarOn = false;
        clearSelection();
    });
    
    avatarAccept_btn.on('selected', function() {
        _this.hideInsideView();
        if (_this.isAvatarOn) {
            _this.showAvatarSmall();
            _this.showAvatar();
        } else {
            _this.showInsideSmall();
            _this.showInsideView();
        }
        _this.hideAvatarSelection();
        clearSelection();
    });
    
    avatarCancel_btn.on('selected', function() {
        _this.hideAvatarSelection();        
        clearSelection();
    });

    this.getMissed = function() {
        return missed;
    }
    
    this.subMissed = function() {
        missed = missed-1;
    }
}
