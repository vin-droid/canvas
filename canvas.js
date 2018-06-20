var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c = canvas.getContext('2d');

var colorArray = ["A8E6CF", "DCEDC1", "FFD3B6", "FFAAA5", "FF8B94"]
var minRadius = 2, maxRadius = 40, radius = 30;

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});
window.addEventListener('resize',function(){
    init();
})
function Circle(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = "#" + this.color
        c.fill();
    };
    this.update = function() {
        if (this.x + radius > innerWidth || this.x - radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + radius > innerHeight || this.y - radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx
        this.y += this.dy



        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < maxRadius ){
                this.radius +=1;
            }
        } else if (this.radius > this.minRadius){
            this.radius -= 1;
        }
        this.draw();
    }
}

var circleArray = [];
function init() {
    circleArray = [];
    for (var index = 0; index < 900; index++) {
        var x = Math.random() * (innerWidth - radius * 2) - radius;
        var y = Math.random() * (innerHeight - radius * 2) - radius;
        var dx = Math.random() - 0.2;
        var dy = Math.random() - 0.2;
        circleArray[index] = new Circle(x, y, dx, dy, Math.random() * 3 + 1);
    }
}

init();



function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var index = 0; index < circleArray.length; index++) {
        circleArray[index].update();
    }
}
animate(); 