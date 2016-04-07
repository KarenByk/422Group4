/*
    Class: Wallpaper
    
        This class handles updating the door wallpapers.
*/
function Wallpaper() {
    
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
    
}