var inside = new fabric.Canvas('inside-door');
var outside = new fabric.Canvas('outside-door');

const DOOR_WIDTH = inside.width;
const DOOR_HEIGHT = inside.height;
const ICON_SIZE = Math.round(DOOR_WIDTH / 9);
const ICON_MARGIN = Math.round(DOOR_WIDTH / 30);


// Red and green image filters
 
var redFilter = new fabric.Image.filters.Tint({
    color: '#FF1900',
    opacity: 0.4
});

var greenFilter = new fabric.Image.filters.Tint({
    color: '#00FF73',
    opacity: 0.3
});

function colorRed(img) {
    img.filters.push(redFilter);
    img.applyFilters(inside.renderAll.bind(inside));
}

function colorGreen(img) {
    img.filters.push(greenFilter);
    img.applyFilters(inside.renderAll.bind(inside));
}


// Useful functions

function clearSelection() {
    inside.deactivateAll();
    outside.deactivateAll();
}