

function ProfileSettings()
{
	  var _this = this;
    // Define the writing areas...
    var backSet = new fabric.Rect({
        selectable: true,
        originX: 'center',
        width: DOOR_WIDTH/3,
        height: DOOR_HEIGHT/3.5,
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 3 ,
        fill: '#000', opacity: 0.5,
        //shadow: 'rgba(0,0,0,1) 0px 0px 5px',
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
        id: 'displayPanel'
    });
    var James = new Text('James', {
        originX: 'center', originY: 'center',
        fontSize: 20,
        left: DOOR_WIDTH/2,
        top: DOOR_HEIGHT/2.8
    });
    var Ishta = new Text('Ishta', {
        originX: 'center', originY: 'center',
        fontSize: 20,
        left: DOOR_WIDTH/2,
        top: DOOR_HEIGHT/2.45
    });

    var Karen = new Text('Karen', {
        originX: 'center', originY: 'center',
        fontSize: 20,
        left: DOOR_WIDTH/2,
        top: DOOR_HEIGHT/2.2
    });
    var Rinkal = new Text('Rinkal', {
        originX: 'center', originY: 'center',
        fontSize: 20,
        left: DOOR_WIDTH/2,
        top: DOOR_HEIGHT/1.9
    });
    
   var createNewProfile = new Button('newProfile', 
        backSet.left + backSet.width/10, 
        backSet.top + backSet.height*(5/6),
        {width: backSet.width /3, height: backSet.width / 3});
    
    // cancel buttons
        
    var cancelInside_btn = new Button('cancel', 
        backSet.left + backSet.width / 2, 
        backSet.top,
        {width: backSet.width / 8, height: backSet.width / 8});
        
    /*
        Function: showInside
        
            Draws the messaging area inside if it's not on screen.
    */
    this.show= function(index) {
        if (!this.isInsideVisible) {
            inside.add(backSet, cancelInside_btn, Karen, Ishta, Rinkal, James, createNewProfile);
            this.isInsideVisible = true;
            
        }
    };
    
    
    /*
        Function: hideInside
        
            Clears inside messaging area.
    */
    this.hideInside = function() {
        if (this.isInsideVisible) {
            inside.remove(backSet, cancelInside_btn, Karen, Ishta, Rinkal, James, createNewProfile);
            
            this.isInsideVisible = false;
            mainMenu.canBeShown = true;
        }
    };
    cancelInside_btn.on('selected', function() {
        _this.hideInside();
        clearSelection();
    });
    //creating a new profile
    createNewProfile.on('selected', function() {

        createProf.showOptions();
        _this.hideInside();
        clearSelection();
    });

}//end profileSettings 






function CreateProfile()
{
    var _this = this;
    
    
    // Define the writing areas...
    var backOptions = new fabric.Rect({
        selectable: true,
        originX: 'center',
        width: DOOR_WIDTH/2.5,
        height: DOOR_HEIGHT/3.5,
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 3 ,
        fill: '#000', opacity: 0.5,
        //shadow: 'rgba(0,0,0,1) 0px 0px 5px',
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
        id: 'displayNewProfileOptions'
    });

   var takePic = new Button('takePic', 
        backOptions.left - backOptions.width/4, 
        backOptions.top + backOptions.height*(1/4),
        {width: backOptions.width /3, height: backOptions.width / 3});

   var useIcon = new Button('landscapes', 
        backOptions.left + backOptions.width/6, 
        backOptions.top + backOptions.height*(1/4),
        {width: backOptions.width /3, height: backOptions.width / 3});


   var phoneSync = new Button('phone', 
       backOptions.left - backOptions.width/4, 
        backOptions.top + backOptions.height*(2/3),
        {width: backOptions.width /2, height: backOptions.width / 2});

   var retinal = new Button('retinal', 
        backOptions.left + backOptions.width/6, 
        backOptions.top + backOptions.height*(2/3),
        {width: backOptions.width /3, height: backOptions.width / 3});

    
    // cancel buttons
        
    var cancelInside_btn = new Button('cancel', 
        backOptions.left + backOptions.width / 2, 
        backOptions.top,
        {width: backOptions.width / 8, height: backOptions.width / 8});
        
    
    /*
        Function: showInside
        
            Draws the messaging area inside if it's not on screen.
    */
    this.showOptions= function(index) {
        if (!this.isInsideVisible) {
            inside.add(backOptions, cancelInside_btn, takePic, useIcon, phoneSync, retinal);
            this.isInsideVisible = true;
            
        }
    };
    
    
    /*
        Function: hideInside
        
            Clears inside messaging area.
    */

    cancelInside_btn.on('selected', function() {
        _this.hideAll();
        clearSelection();
    });
    //creating a new profile
    takePic.on('selected', function() {
        //CreateProfile.showOptions();
        camera.showOutsideView();
        _this.hideOptions();
        clearSelection();
    });
    useIcon.on('selected', function() {
        //CreateProfile.showOptions();
        camera.showAvatarSmall();
        _this.hideOptions();
        clearSelection();
    });
    //new view for phone syncing 
    var sync = new Button('sync', 
        backOptions.left - backOptions.width/4, 
        backOptions.top + backOptions.height*(1/4),
        {width: backOptions.width /3, height: backOptions.width / 3});

   var approve = new Button('ok', 
        backOptions.left + backOptions.width/6, 
        backOptions.top + backOptions.height*(1/4),
        {width: backOptions.width /3, height: backOptions.width / 3});

    phoneSync.on('selected', function(){
        inside.add(cancelInside_btn, sync, approve);
        clearSelection();
        this.isInsideVisible = true;
        mainMenu.canBeShown = true;
    });

    var retinalText = new Text('Go Outside to set up scan', {
        originX: 'center', originY: 'center',
        fontSize: 20,
        left: DOOR_WIDTH/2,
        top: DOOR_HEIGHT/2.8
    });
    retinal.on('selected', function() {
        //CreateProfile.showOptions();
        //camera.showAvatar();
        inside.add(retinalText, cancelInside_btn);
        outside.add(approve);
        this.isInsideVisible = true;
        mainMenu.canBeShown = true;
        clearSelection();
    });
    this.hideOptions = function() {
        if (this.isInsideVisible) {
            inside.remove(backOptions, cancelInside_btn, takePic, useIcon, phoneSync, retinal);
            
            this.isInsideVisible = false;
            mainMenu.canBeShown = true;
        }
    };
    this.hideAll = function() {
        if (this.isInsideVisible) {
            inside.remove(backOptions, cancelInside_btn, takePic, useIcon, phoneSync, retinal,
                retinalText, sync, approve);
            outside.remove(approve);
            this.isInsideVisible = false;
            mainMenu.canBeShown = true;
        }
    };

}
