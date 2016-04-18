/*
    Class: MissedVisitorMenu
    
        This class handles updating the door wallpapers.
*/
function MissedVisitorMenu() {
       
    var _this = this;
    
    var background = new fabric.Rect({
        selectable: false,
        width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        height: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        fill: '#000', opacity: 0.55,
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70
    });
    
    var count;
    var close_btn = new Button('cancel');
    var back_btn = new MenuButton('left');

    var missed1 = new MenuButton('missed');
    var missed2 = new MenuButton('missed');
    var missed3 = new MenuButton('missed');
    //var missed4 = new MenuButton('missed');
    //var missed5 = new MenuButton('missed');
    
    var date1 = new Text('Today', {
       orginX: 'left',
       fontSize: background.height/4,
       selectable: false
    });
    
    var time1 = new Text('Today', {
       orginX: 'left',
       fontSize: background.height/4,
       selectable: false
    });
    
    this.createLog = function(msd, dt, tm) {
        count = msd;
        
        if(count === 1) {
            date1.setText(dt);
            time1.setText(tm);
        }
        clearSelection();
    }
    
    this.show = function(x, y) {
        
        mainMenu.canBeShown = false;
        mainMenu.hide();
        
        // Set all menu elements relative to each other
        background.set({
            left: x, top: y
        });
        
        close_btn.set({
            width: background.width / 8, height: background.width / 8,
            left: background.left + background.width, 
            top: background.top
        });
        
        missed1.set({
            left: background.left + ICON_MARGIN, 
            top: background.top + ICON_MARGIN,
        });
        
        date1.set({
           left: missed1.left + ICON_MARGIN + ICON_SIZE*2,
           top: missed1.top,
           fontSize: 10
        });
        
        time1.set({
           left: date1.left,
           top: date1.top + ICON_MARGIN,
           fontSize: 10
        });
        
        missed2.set({
            left: background.left + ICON_MARGIN, 
            top: missed1.top + ICON_MARGIN + ICON_SIZE,
        });
        
        missed3.set({
            left: background.left + ICON_MARGIN, 
            top: missed2.top + ICON_MARGIN + ICON_SIZE,
        });
        
        inside.add(background);
        
        if(count >= 1) {
            inside.add(missed1)
            inside.add(date1);
            inside.add(time1);
        }
        if(count >= 2)
            inside.add(missed2);
        if(count >= 3)
            inside.add(missed3);

        inside.add(close_btn);
    } 
    
    this.hide = function() {
        mainMenu.canBeShown = true;
        inside.remove(background,
                    close_btn,
                    missed1,
                    date1,
                    time1,
                    missed2,
                    missed3);
                    //missed4);
                    //missed5);
    }
    
    close_btn.on('selected', function() {
       _this.hide(); 
       clearSelection();
    });

    

}
