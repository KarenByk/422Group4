var inside = new fabric.Canvas('inside-door');
var outside = new fabric.Canvas('outside-door');

const DOOR_WIDTH = inside.width;
const DOOR_HEIGHT = inside.height;
const ICON_SIZE = Math.round(DOOR_WIDTH / 9);
const ICON_MARGIN = Math.round(DOOR_WIDTH / 30);