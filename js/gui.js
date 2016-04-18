function GUI(notificationObject) {
    
    this.isClosed = true;
    this.isLocked = true;
    
    var notificationBar = notificationObject;
    
    var knobIn = new fabric.Circle({
        radius: DOOR_WIDTH / 20, 
        fill: 'black', stroke: 'white',
        originX: 'center', originY: 'center', 
        lockMovementX: true, lockMovementY: true,
        lockScalingX: true, lockScalingY: true,
        left: 9 * DOOR_WIDTH / 10, top: DOOR_HEIGHT / 2,
        id: 'knobIn'
    });

    var knobOut = new fabric.Circle({
        radius: DOOR_WIDTH / 20, 
        fill: 'black', stroke: 'white',
        originX: 'center', originY: 'center', 
        lockMovementX: true, lockMovementY: true,
        lockScalingX: true, lockScalingY: true,
        left: DOOR_WIDTH / 10, top: DOOR_HEIGHT / 2,
        id: 'knobOut'
    });
    
    var address = new Text('123', {
        selectable: false,
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 70,
        fontSize: DOOR_HEIGHT / 10,
        id: 'address'
    });
    
    var lock_btn = new Button('unlocked', 
        knobIn.left, 
        knobIn.top - ICON_MARGIN - ICON_SIZE,
        {id: 'lock'});
        
    var unlock_btn = new Button('locked', 
        knobIn.left,
        knobIn.top - ICON_MARGIN - ICON_SIZE,
        {id: 'unlock'});
        
    var open_btn = new Button('closed', 
        knobIn.left, 
        knobIn.top + ICON_MARGIN + ICON_SIZE,
        {id: 'open'});
        
    var close_btn = new Button('open', 
        knobIn.left, 
        knobIn.top + ICON_MARGIN + ICON_SIZE,
        {id: 'close'});
        
    var user_btn = new Button('user', 
        knobOut.left, 
        DOOR_HEIGHT / 2 - ICON_MARGIN - ICON_SIZE,
        {id: 'selectUser'});
        
    var emergency_btn = new Button('emergency', 
        knobOut.left, 
        DOOR_HEIGHT / 2,
        {id: 'emergency'});
        
    var help_btn = new Button('help', 
        knobOut.left, 
        DOOR_HEIGHT / 2 + ICON_MARGIN + ICON_SIZE,
        {id: 'help'});
        
    var doorbell_btn = new Button('doorbell', 
        knobOut.left, 
        knobOut.top - ICON_MARGIN - ICON_SIZE,
        {id: 'doorbell'});
        
    var noteFromOutside_btn = new Button('note', 
        knobOut.left + ICON_MARGIN + ICON_SIZE, 
        knobOut.top,
        {id: 'noteFromOutside'});
        
    var keypad_btn = new Button('keypad', 
        knobOut.left, 
        knobOut.top + ICON_MARGIN + ICON_SIZE,
        {id: 'keypad'});
        
    colorRed(unlock_btn);
    colorRed(emergency_btn);
    colorGreen(lock_btn);
    
    this.drawButtons = function() {
        if (this.isLocked) {inside.add(unlock_btn)}
        else {inside.add(lock_btn)}
        if (this.isClosed) {inside.add(open_btn)}
        else {inside.add(close_btn)}
        inside.add(user_btn,
                   emergency_btn,
                   help_btn);
        outside.add(doorbell_btn,
                    noteFromOutside_btn,
                    keypad_btn);
    };
    
    this.drawKnobs = function() {
        inside.add(knobIn);
        outside.add(knobOut);
    };
    
    this.removeKnobs = function() {
        inside.remove(knobIn);
        inside.remove(knobOut);
    };
    
    this.drawAddress = function() {
        outside.add(address);
    };
    
    this.removeAddress = function() {
        outside.remove(address);
    };
    
    this.unlock = function() {
        if (this.isLocked) {
            inside.add(lock_btn);
            inside.remove(unlock_btn);
            notificationBar.unlocked();
            this.isLocked = false;
        }
    };
    
    this.lock = function() {
        if (!this.isLocked) {
            inside.add(unlock_btn);
            inside.remove(lock_btn);
            notificationBar.locked();
            this.isLocked = true;
        }
    };
    
    this.open_ = function() {
        if (this.isClosed) {
            inside.add(close_btn);
            inside.remove(open_btn);
            notificationBar.doorOpened();
            this.isClosed = false;
        }
    };
    
    this.close_ = function() {
        if (!this.isClosed) {
            inside.add(open_btn);
            inside.remove(close_btn);
            notificationBar.doorClosed();
            this.isClosed = true;
        }
    };
    
    
    doorbell_btn.on('selected', function() {
        var avatarOrUser = 0;
        
        var doorbellPromptBackground = new fabric.Rect({
            width: 250,
            height: 200,
            fill: 'white', stroke: 'black',
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: 70, top: 230,
            id: 'doorbellPromptBackgroundID'
        });   
        
        inside.add(doorbellPromptBackground);
        
        var doorbellDividorScreenOne = new fabric.Rect({
            width: 250,
            height: 1,
            fill: 'white', stroke: 'black',
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: 70, top: 375,
            id: 'doorbellDividorScreenOneID'
        });
        
        inside.add(doorbellDividorScreenOne);
        
        var doorbellDividorScreenTwo = new fabric.Rect({
            width: 1,
            height: 55,
            fill: 'white', stroke: 'black',
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: 200, top: 375,
            id: 'doorbellDividorScreenTwoID'
        });
        
        inside.add(doorbellDividorScreenTwo);
        
        var chatBubbleRectangle = new fabric.Rect({
            width: 32,
            height: 32,
        //    fill: 'pink', stroke: 'black',
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: 120, top: 385,
            id: 'chatBubbleRectangleID'
        });
        
        fabric.util.loadImage('img/chatBubble.png', function(img) {
            chatBubbleRectangle.setPatternFill({
              source: img
            });
            inside.renderAll();
          });

        inside.add(chatBubbleRectangle);

        var cameraRectangle = new fabric.Rect({
            width: 32,
            height: 32,
        //    fill: 'pink', stroke: 'black',
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: 250, top: 385,
            id: 'cameraRectangleID'
        });
        
        fabric.util.loadImage('img/camera.png', function(img) {
            cameraRectangle.setPatternFill({
              source: img
            });
            inside.renderAll();
          });
          
        inside.add(cameraRectangle);
        
        var userHeadChat = new fabric.Circle({ 
            radius: 40,
            fill: 'white', 
            stroke: 'black', 
            originX: 'center', originY: 'center', 
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: 200, top: 285,
            id: 'userHeadChatId'
        });
        
        inside.add(userHeadChat);
        
        var userBodyChat = new fabric.Rect({
            width: 1,
            height: 50,
        //    fill: 'pink', stroke: 'black',
            lockMovementX: true, lockMovementY: true,
            lockScalingX: true, lockScalingY: true,
            left: 200, top: 325,
            id: 'userBodyChatID'
        });
        
        inside.add(userBodyChat);
        
        var closeDoorbell = new fabric.Text('X', { 
            fontSize: 32, stroke: '#000000', left: 280, top: 240 });
        
        inside.add(closeDoorbell);
        
        closeDoorbell.on('selected', function() {
           closeDoorbell.remove();
           cameraRectangle.remove();
           chatBubbleRectangle.remove();
           doorbellDividorScreenOne.remove();
           doorbellDividorScreenTwo.remove();
           doorbellPromptBackground.remove();
           userHeadChat.remove();
           userBodyChat.remove();
        });
        
        // doorbell - answered by camera
        cameraRectangle.on('selected', function() {
            chatBubbleRectangle.remove();
            cameraRectangle.remove();
            closeDoorbell.remove();
            
            var noAvatarRectangle = new fabric.Rect({
                width: 60,
                height: 30,
                lockMovementX: true, lockMovementY: true,
                lockScalingX: true, lockScalingY: true,
                left: 120, top: 385,
                id: 'noAvatarRectangleID'
             });

            fabric.util.loadImage('img/noAvatar.PNG', function(img) {
                noAvatarRectangle.setPatternFill({
                  source: img
                });
                inside.renderAll();
            });

            inside.add(noAvatarRectangle);

            var fullScreenRectangle = new fabric.Rect({
              width: 32,
              height: 32,
          //    fill: 'pink', stroke: 'black',
              lockMovementX: true, lockMovementY: true,
              lockScalingX: true, lockScalingY: true,
              left: 250, top: 385,
              id: 'fullScreenRectangleID'
            });

            fabric.util.loadImage('img/fullscreen.png', function(img) {
              fullScreenRectangle.setPatternFill({
                source: img
              });
              inside.renderAll();
            });

            inside.add(fullScreenRectangle);
            
            var closeDoorbellTwo = new fabric.Text('X', { 
            fontSize: 32, stroke: '#000000', left: 280, top: 240 });
        
            inside.add(closeDoorbellTwo);
            
            // avatar on/off
            
            var sideScreenRectangle = new fabric.Rect({
              width: 65,
              height: 55,
              fill: 'white', stroke: 'black',
              lockMovementX: true, lockMovementY: true,
              lockScalingX: true, lockScalingY: true,
              left: 320, top: 165,
              id: 'sideScreenRectangleID'
            });
            
            
            var avatarSideScreenRectangle = new fabric.Rect({
              width: 33,
              height: 33,
              lockMovementX: true, lockMovementY: true,
              lockScalingX: true, lockScalingY: true,
              left: 340, top: 180,
              id: 'avatarSideScreenRectangleID'
            });
            
            fabric.util.loadImage('img/ninja.png', function(img) {
              avatarSideScreenRectangle.setPatternFill({
                source: img
              });
              inside.renderAll();
            });
            
            var outsideDoorbellScreenRectangle = new fabric.Rect({
                width: 200,
                height: 130,
                fill: 'white', stroke: 'black',
                lockMovementX: true, lockMovementY: true,
                lockScalingX: true, lockScalingY: true,
                left: 125, top: 185,
                id: 'outsideDoorbellScreenRectangleID'
            });
            
            var largeAvatarSideScreenRectangleOutside = new fabric.Rect({
              width: 130,
              height: 130,
              lockMovementX: true, lockMovementY: true,
              lockScalingX: true, lockScalingY: true,
              left: 160, top: 185,
              id: 'largeAvatarSideScreenRectangleOutsideID'
            });
            
            fabric.util.loadImage('img/ninjaLarge.png', function(img) {
              largeAvatarSideScreenRectangleOutside.setPatternFill({
                source: img
              });
              outside.renderAll();
            });
            
            
            inside.add(sideScreenRectangle);
            inside.add(avatarSideScreenRectangle);             
            outside.add(outsideDoorbellScreenRectangle);
            outside.add(largeAvatarSideScreenRectangleOutside);
            
            var toggleAvatar = true;
            
            
            
            
            
            fullScreenRectangle.on('selected', function() {
               
               var fullScreenExitBackground = new fabric.Rect({
                width: 45,
                height: 45,
                fill: 'white', stroke: 'black', 
                lockMovementX: true, lockMovementY: true,
                lockScalingX: true, lockScalingY: true,
                left: 333, top: 225,
                id: 'fullScreenExitBackgroundID'
              });

              fabric.util.loadImage('img/fullScreenExit.png', function(img) {
                fullScreenExitBackground.setPatternFill({
                  source: img
                });
                outside.renderAll();
              });
               
               inside.add(fullScreenExitBackground);
               
               var fullScreenView = new fabric.Rect({
                width: 250,
                height: 465,
                fill: 'white', stroke: 'black',
                lockMovementX: true, lockMovementY: true,
                lockScalingX: true, lockScalingY: true,
                left: 70, top: 230,
                id: 'fullScreenExitViewID'
              });
              
                fabric.util.loadImage('img/outsideUser.PNG', function(img) {
                  fullScreenView.setPatternFill({
                    source: img
                  });
                  inside.renderAll();
                });
              
              inside.add(fullScreenView);
              
              
              var outsideFullScreenView = new fabric.Rect({
                width: 200,
                height: 510,
                fill: 'white', stroke: 'black',
                lockMovementX: true, lockMovementY: true,
                lockScalingX: true, lockScalingY: true,
                left: 125, top: 185,
                id: 'outsideFullScreenExitViewID'
              });
              
            if(avatarOrUser === 0)
            {
                // avatar
                
                fabric.util.loadImage('img/insideUserAvatar.png', function(img) {
                  outsideFullScreenView.setPatternFill({
                    source: img
                  });
                  outside.renderAll();
                });
                
                outside.add(outsideFullScreenView);
            }
            else
            {
                // user 
                
                fabric.util.loadImage('img/insideUser.PNG', function(img) {
                  outsideFullScreenView.setPatternFill({
                    source: img
                  });
                  outside.renderAll();
                });
                
                outside.add(outsideFullScreenView);
            }
            
            
              // exit full screen
              fullScreenExitBackground.on('selected', function() {
                 fullScreenView.remove();
                 fullScreenExitBackground.remove();
                 outsideFullScreenView.remove();
                 
              });
            });
            
            
            
            
            
            avatarOrUser = 0;
            
            noAvatarRectangle.on('selected', function() {

                if(toggleAvatar === false)
                {
                    // show avatar
                    
                    avatarOrUser = 0;
                    
                    largeAvatarSideScreenRectangleOutside.remove();
                    fabric.util.loadImage('img/ninjaLarge.png', function(img) {
                        largeAvatarSideScreenRectangleOutside.setPatternFill({
                          source: img
                        });
                        outside.renderAll();
                      });
                    outside.add(largeAvatarSideScreenRectangleOutside);
                    
                    inside.remove(noAvatarRectangle);
                    fabric.util.loadImage('img/noAvatar.PNG', function(img) {
                        noAvatarRectangle.setPatternFill({
                          source: img
                        });
                        inside.renderAll();
                    });
                    inside.add(noAvatarRectangle);
                    
                    avatarSideScreenRectangle.remove();
                    fabric.util.loadImage('img/ninja.png', function(img) {
                        avatarSideScreenRectangle.setPatternFill({
                          source: img
                        });
                        inside.renderAll();
                      });
                    inside.add(avatarSideScreenRectangle);
             
                    toggleAvatar = true;
                }
                else
                {
                    avatarOrUser = 1;
                    
                    largeAvatarSideScreenRectangleOutside.remove();
                    fabric.util.loadImage('img/largeHead.png', function(img) {
                        largeAvatarSideScreenRectangleOutside.setPatternFill({
                          source: img
                        });
                        outside.renderAll();
                      });
                    outside.add(largeAvatarSideScreenRectangleOutside);
                    
                    inside.remove(noAvatarRectangle);
                    fabric.util.loadImage('img/avatar.PNG', function(img) {
                        noAvatarRectangle.setPatternFill({
                          source: img
                        });
                        inside.renderAll();
                    });
                    inside.add(noAvatarRectangle);
                    
                    avatarSideScreenRectangle.remove();
                    fabric.util.loadImage('img/sideNinja.png', function(img) {
                        avatarSideScreenRectangle.setPatternFill({
                          source: img
                        });
                        inside.renderAll();
                      });
                    inside.add(avatarSideScreenRectangle);
                    
                    
                    toggleAvatar = false;
                }
                
                
                    
            });
            
           
            // to close the camera screen
            closeDoorbellTwo.on('selected', function() {
                
                noAvatarRectangle.remove();
                fullScreenRectangle.remove();
                closeDoorbellTwo.remove();
                doorbellDividorScreenOne.remove();
                doorbellDividorScreenTwo.remove();
                doorbellPromptBackground.remove();
                userHeadChat.remove();
                userBodyChat.remove();
                
                sideScreenRectangle.remove();
                avatarSideScreenRectangle.remove();

                largeAvatarSideScreenRectangleOutside.remove();
                outsideDoorbellScreenRectangle.remove();
            });
        });
        
        
        
    });
    
}