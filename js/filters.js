var redFilter = new fabric.Image.filters.Tint({
    color: '#FF1900',
    opacity: 0.4
});

var greenFilter = new fabric.Image.filters.Tint({
    color: '#00FF73',
    opacity: 0.3
});

function colorRed(obj) {
    obj.filters.push(redFilter);
    obj.applyFilters(inside.renderAll.bind(inside));
}

function colorGreen(obj) {
    obj.filters.push(greenFilter);
    obj.applyFilters(inside.renderAll.bind(inside));
}