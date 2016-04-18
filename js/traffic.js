function Traffic() {

    var _this = this;
    
    var mapImg = new fabric.Image(document.getElementById('map'), {
        originX: 'center', originY: 'center',
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 2,
        width: mainMenu.width, height: mainMenu.height
    });
    
    var close_btn = new Button('cancel', 
        mapImg.left + mapImg.width / 2, 
        mapImg.top - mapImg.height / 2, 
        {width: DOOR_HEIGHT / 40, height: DOOR_HEIGHT / 40});
    
    _this.show = function() {
        mainMenu.canBeShown = false;
        inside.add(mapImg, close_btn);
    };
    
    _this.hide = function() {
        mainMenu.canBeShown = true;
        inside.remove(mapImg, close_btn);
    };
    
    close_btn.on('selected', function() {
        _this.hide();
    });    
}
