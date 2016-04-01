function Wallpaper() {
    
    this.setInside = function(img) {
        var url = 'img/wall/' + img + '.jpg';
        inside.setBackgroundImage(url, inside.renderAll.bind(inside), {
            width: DOOR_WIDTH,
            height: DOOR_HEIGHT,
            // Needed to position backgroundImage at 0,0
            originX: 'left',
            originY: 'top'
        });
    }
    
    this.setOutside = function(img) {
        var url = 'img/wall/' + img + '.jpg';
        outside.setBackgroundImage(url, outside.renderAll.bind(outside), {
            width: DOOR_WIDTH,
            height: DOOR_HEIGHT,
            // Needed to position backgroundImage at 0,0
            originX: 'left',
            originY: 'top'
        });
    }
    
}