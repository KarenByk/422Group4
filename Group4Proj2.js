<!-- CS 422 - Spring 2016 - Group 4  -->
<!-- Rinkal Parikh, James Lave, Karen Bykowski, Ishta Bhagat -->
<!-- Modified from template provided by Professor Andrew Johsnon  -->

<!DOCTYPE html>    
<head>
    <meta charset="utf-8">
    <title>fabric.js project template</title>
	
	<!-- Get version 1.5.0 of Fabric.js from CDN -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.5.0/fabric.min.js" ></script>
 

	 
<body>
		<!-- canvas tag for Fabric.js to draw into -->
    <!-- set this to some appropriate size for your development work -->
    <!-- but keep the same aspect ratio -->
    <!-- we will use width="2714" height="2200" for presentations and evaluation w = 494 h = 400 is web size-->
		<canvas id="c" width="2714" height="2200" style="border:2px solid black;" ></canvas>
</body>
 
<script>

// the aspect ratios given here are not quite tall enough for a 36" x 80" door
// we are assuming bottom 15 inches of the door are not part of the display. 
// that part contains lots of necessary electronics so the bottom of the door
// sits off the bottom of our display wall. You are implementing the interface
// for the top 65" of the display / door

(function() {

// within the code below I assume I am drawing into a 1220x990 box
// then I can scale the group to whatever size the final canvas is
  var localHeight = 990;
  var localWidth = 1220;

  var canvas = this.__canvas = new fabric.Canvas('c');

  // set background to blue to make it easier to see it
  canvas.backgroundColor = "#DDDDDD";  // light grey

// need 36 wide instead of 40 as now

var insideDoor = new fabric.Rect({
  left: 22,
  top: 0,
  fill: 'grey',
  stroke: 'black',
  width: 555,
  height: localHeight,
  angle: 0
});

// the doors will not be selectable or movable
insideDoor.hasControls = insideDoor.hasBorders = false;
insideDoor.lockMovementX = insideDoor.lockMovementY = true;


var outsideDoor = new fabric.Rect({
  left: 642,
  top: 0,
  fill: 'grey',
  stroke: 'black',
  width: 555,
  height: localHeight,
  angle: 0
});

outsideDoor.hasControls = outsideDoor.hasBorders = false;
outsideDoor.lockMovementX = outsideDoor.lockMovementY = true;


// add all of the elements to the canvas

canvas.add(insideDoor);
canvas.add(outsideDoor);


// code adapted from http://jsfiddle.net/tornado1979/39up3jcm/
// this code deals with scaling all the elements on the canvas

function zoomAll(SCALE_FACTOR) {

      var objects = canvas.getObjects();
      for (var i in objects) {
          var scaleX = objects[i].scaleX;
          var scaleY = objects[i].scaleY;
          var left = objects[i].left;
          var top = objects[i].top;

          var tempScaleX = scaleX * SCALE_FACTOR;
          var tempScaleY = scaleY * SCALE_FACTOR;
          var tempLeft = left * SCALE_FACTOR;
          var tempTop = top * SCALE_FACTOR;

          objects[i].scaleX = tempScaleX;
          objects[i].scaleY = tempScaleY;
          objects[i].left = tempLeft;
          objects[i].top = tempTop;

          objects[i].setCoords();
      }
  
      canvas.renderAll();
  }

// draw everything at the appropriate scale for this canvas
zoomAll(canvas.height / localHeight);

})();

</script>
		
</head>
  
</html>