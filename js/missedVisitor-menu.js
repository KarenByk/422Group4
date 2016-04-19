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
    
    var count, d2text, t2text, d3text, t3text;
    var close_btn = new Button('cancel');
    var back_btn = new MenuButton('left');

    var missed1 = new MenuButton('missed');
    var missed2 = new MenuButton('missed');
    var missed3 = new MenuButton('missed');
    var close1 = new Button('cancel');
    var close2 = new Button('cancel');
    var close3 = new Button('cancel');
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
    
    var date2 = new Text('Today', {
       orginX: 'left',
       fontSize: background.height/4,
       selectable: false
    });
    
    var time2 = new Text('Today', {
       orginX: 'left',
       fontSize: background.height/4,
       selectable: false
    });
    
    var date3 = new Text('Today', {
       orginX: 'left',
       fontSize: background.height/4,
       selectable: false
    });
    
    var time3 = new Text('Today', {
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
        if(count === 2) {
            d2text = dt;
            t2text = tm;
            date2.setText(dt);
            time2.setText(tm);
        }
        if(count === 3) {
            d3text = dt;
            t3text = tm;
            date3.setText(dt);
            time3.setText(tm);
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
        
        close1.set({
            width: background.width / 10, height: background.width / 10,
            left: background.left + background.width - ICON_MARGIN, 
            top: time1.top
        });
        
        
        missed2.set({
            left: background.left + ICON_MARGIN, 
            top: missed1.top + ICON_MARGIN + ICON_SIZE,
        });
        
        date2.set({
           left: missed2.left + ICON_MARGIN + ICON_SIZE*2,
           top: missed2.top,
           fontSize: 10
        });
                
        time2.set({
           left: date2.left,
           top: date2.top + ICON_MARGIN,
           fontSize: 10
        });
        
        close2.set({
            width: background.width / 10, height: background.width / 10,
            left: background.left + background.width - ICON_MARGIN, 
            top: time2.top
        });
        
        
        missed3.set({
            left: background.left + ICON_MARGIN, 
            top: missed2.top + ICON_MARGIN + ICON_SIZE,
        });
        
        date3.set({
           left: missed3.left + ICON_MARGIN + ICON_SIZE*2,
           top: missed3.top,
           fontSize: 10
        });
                
        time3.set({
           left: date3.left,
           top: date3.top + ICON_MARGIN,
           fontSize: 10
        });
        
        close3.set({
            width: background.width / 10, height: background.width / 10,
            left: background.left + background.width - ICON_MARGIN, 
            top: time3.top
        });
        
        
        inside.add(background);
        
        if(count >= 1) {
            inside.add(missed1, date1, time1, close1)
        }
        if(count >= 2)
            inside.add(missed2, date2, time2, close2);
        if(count >= 3)
            inside.add(missed3, date3, time3, close3);

        inside.add(close_btn);
    } 
    
    this.hide = function() {
        mainMenu.canBeShown = true;
        inside.remove(background,
                    close_btn,
                    missed1,
                    date1,
                    time1,
                    close1,
                    missed2,
                    date2,
                    time2,
                    close2,
                    missed3,
                    date3,
                    time3,
                    close3);
                    //missed4);
                    //missed5);
    }
    
    close_btn.on('selected', function() {
       _this.hide(); 
       clearSelection();
    });

    close1.on('selected', function(){
       if(count === 1) {
           inside.remove(missed1,date1, time1, close1);
           camera.subMissed();
           count = camera.getMissed();
       }
       if(count === 2) {
           date1.setText(d2text);
           time1.setText(t2text);
           
           inside.remove(missed2, date2, time2, close2);
           camera.subMissed();
           count = camera.getMissed();
       }
       if(count === 3) {
           date1.setText(d2text);
           time1.setText(t2text);
           
           date2.setText(d3text);
           time2.setText(t3text);
           
           inside.remove(missed3, date3, time3, close3);
           camera.subMissed();
           count = camera.getMissed();
       }
       clearSelection();
    });
    

}
