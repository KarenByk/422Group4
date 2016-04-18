function Camera() {

    var _this = this;
    
    _this.guest = 'guest1';
    _this.isVideoPlaying = false;
    
    var video = new fabric.Image(document.getElementById(_this.guest), {
        selectable: false,
        top: DOOR_HEIGHT / 3,
        width: DOOR_WIDTH, 
        height: DOOR_WIDTH * 316 / 600,
        originY: 'center'
    });
    
    var chat_btn = new Button('chat');
    var camera_btn = new Button('camera');
    var close_btn = new Button('cancel');
    
    _this.showOutsideView = function() {
    
        if (!_this.isVideoPlaying) {
            _this.isVideoPlaying = true;
            mainMenu.hide();
            mainMenu.canBeShown = false;
            
            //video.setElement(document.getElementById(_this.guest));
            
            chat_btn.set({
                left: gui.knobOutX, top: video.top - video.height / 4
            });
            camera_btn.set({
                left: chat_btn.left, top: video.top
            });
            close_btn.set({
                left: camera_btn.left, top: video.top + video.height / 4
            });
        
            clock.showInline();
            inside.add(video, chat_btn, camera_btn, close_btn);
            video.getElement().play();
            
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
        inside.remove(video, chat_btn, camera_btn, close_btn);
        video.getElement().pause();
    
    };
    
    close_btn.on('selected', function() {
        _this.hideOutsideView();
        clearSelection();
    });

}
