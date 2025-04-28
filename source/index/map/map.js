const svg = document.getElementById('map');

const defaultWidth = 3261.1809;
const defaultHeight = 4840.668;
let viewBox = { x: 0, y: 0, width: defaultWidth, height: defaultHeight };

let scaleX = 0;
let scaleY = 0;

const zoomFactor = 1.05;
const MIN_ZOOM = 0.95;
const MAX_ZOOM = 15;

let isDragging = false;
let dragStart = { x: 0, y: 0 };

function updateViewBox() {
    svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);
}

function getZoomLevel() {
    return defaultWidth / viewBox.width;
}

function clampPan() {
    const maxX = defaultWidth - viewBox.width;
    const maxY = defaultHeight - viewBox.height;

    viewBox.x = Math.min(Math.max(0, viewBox.x), maxX);
    viewBox.y = Math.min(Math.max(0, viewBox.y), maxY);
}

function zoomAt(mouseX, mouseY, zoomIn = true) {
    const svgRect = svg.getBoundingClientRect();
    const svgX = ((mouseX - svgRect.left) / svgRect.width) * viewBox.width + viewBox.x;
    const svgY = ((mouseY - svgRect.top) / svgRect.height) * viewBox.height + viewBox.y;

    const currentZoom = getZoomLevel();
    const factor = zoomIn ? 1 / zoomFactor : zoomFactor;
    const newZoom = currentZoom * (1 / factor);

    // Check zoom bounds
    if (newZoom < MIN_ZOOM || newZoom > MAX_ZOOM) return;

    const newWidth = viewBox.width * factor;
    const newHeight = viewBox.height * factor;

    viewBox.x = svgX - (svgX - viewBox.x) * factor;
    viewBox.y = svgY - (svgY - viewBox.y) * factor;
    viewBox.width = newWidth;
    viewBox.height = newHeight;

    clampPan(); // keep viewBox within bounds
    updateViewBox();
}

// Mouse wheel zoom
svg.addEventListener('wheel', (e) => {
    e.preventDefault();
    zoomAt(e.clientX, e.clientY, e.deltaY < 0);
});

// Drag to pan
svg.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStart = {
        x: e.clientX,
        y: e.clientY
    };
});

svg.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    let X = getZoomLevel()

    scaleX = 8.39602*(X**-1.16553);
    scaleY = 8.39602*(X**-1.16553);

    viewBox.x -= dx * scaleX;
    viewBox.y -= dy * scaleY;

    dragStart = {
        x: e.clientX,
        y: e.clientY
    };

    clampPan();
    updateViewBox();
});

svg.addEventListener('mouseup', () => {
    isDragging = false;
});

svg.addEventListener('mouseleave', () => {
    isDragging = false;
});

updateViewBox(); // Ensure initial view is set