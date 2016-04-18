function Camera() {

    var _this = this;
    
    _this.guest = 'grandma';
    _this.isVideoPlaying = false;
    
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
    
    var videoInsideAvatar = new fabric.Image(document.getElementById('avatar'), {
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
    
    var videoInsideAvatarSmall = new fabric.Image(document.getElementById('avatar'), {
        selectable: false,
        originX: 'right', originY: 'top',
        width: DOOR_WIDTH / 4, 
        height: (DOOR_WIDTH / 4) * 316 / 600,
    });
    
    var chat_btn = new Button('chat');
    var camera_btn = new Button('camera');
    var closeOutside_btn = new Button('cancel');
    var closeInside_btn = new Button('cancel',0,0,{width: DOOR_HEIGHT / 40, height: DOOR_HEIGHT / 40});
    
    _this.showOutsideView = function() {
    
        if (!_this.isVideoPlaying) {
            _this.isVideoPlaying = true;
            mainMenu.hide();
            mainMenu.canBeShown = false;
            
            
            videoInsideSmall.set({
                left: videoOutside.left + videoOutside.width - ICON_MARGIN,
                top: videoOutside.top - videoOutside.height / 2 + ICON_MARGIN
            });
            chat_btn.set({
                left: gui.knobOutX, top: videoOutside.top - videoOutside.height / 4
            });
            camera_btn.set({
                left: chat_btn.left, top: videoOutside.top
            });
            closeOutside_btn.set({
                left: camera_btn.left, top: videoOutside.top + videoOutside.height / 4
            });
            closeInside_btn.set({
                left: videoInsideSmall.left, top: videoInsideSmall.top
            });
        
            clock.showInline();
            inside.add(videoOutside, chat_btn, camera_btn, closeOutside_btn);
            videoOutside.getElement().play();
            
            fabric.util.requestAnimFrame(function render() {
                inside.renderAll();
                fabric.util.requestAnimFrame(render);
            });
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
    
    _this.showInsideSmallView = function() {
    
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
    
    _this.hideInsideView = function() {
    
        inside.remove(videoInsideSmall, closeInside_btn);
        outside.remove(videoInside);
        videoInside.getElement().pause();
    
    };
    
    camera_btn.on('selected', function() {
        _this.showInsideView();
        _this.showInsideSmallView();
        clearSelection();
    });
    
    chat_btn.on('selected', function() {
        _this.hideOutsideView();
        messaging.showInside('write');
        clearSelection();
    });
    
    closeOutside_btn.on('selected', function() {
        _this.hideOutsideView();
        clearSelection();
    });
    
    closeInside_btn.on('selected', function() {
        _this.hideInsideView();
        clearSelection();
    });

}
