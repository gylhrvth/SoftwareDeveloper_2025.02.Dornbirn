let canvas = document.getElementById('canvas');
let rows = 10;
let cols = 10;
let snake = [{
    x: 2,
    y: 3
}, {
    x: 3,
    y: 3
}, {
    x: 4,
    y: 3
}];

let food = {
    x: 4,
    y: 5
};
let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = 'LEFT';


if (!canvas) {
    console.error("Canvas-Element nicht gefunden!");
    document.body.innerHTML = "<p style='color: red;'>Canvas-Element nicht gefunden!</p>";
} else {
    let ctx = canvas.getContext('2d');
    const rectSize = 30 - 1; // Rechteckgröße

    function draw() {
        // Hintergrund
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Weiße Rechtecke
        ctx.fillStyle = "white";
        ctx.fillRect(100, 150, rectSize, rectSize);
        ctx.fillRect(130, 150, rectSize, rectSize);
        ctx.fillRect(160, 150, rectSize, rectSize);
        ctx.fillRect(190, 150, rectSize, rectSize);
        ctx.fillRect(220, 150, rectSize, rectSize);

        // Grünes Rechteck
        ctx.fillStyle = "yellow";
        ctx.fillRect(food.x, food.y, rectSize, rectSize); // Food

     
    }

    function add(ctx, x, y) {
        ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight -1);
    }

    draw();
}
