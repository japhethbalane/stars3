//////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById('stars3');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//////////////////////////////////////////////////////////////////////////////

setInterval(world,30);

//////////////////////////////////////////////////////////////////////////////

var gravity = 2;
var stars = [];
var fallings = [];

var floor = new Floor();

for (var i = 0; i < 500; i++) {
	stars.push(new Star());
}
for (var i = 0; i < 10; i++) {
	fallings.push(new Falling(
		randomBetween(0, canvas.width),
		randomBetween(-canvas.height, 0),
		randomBetween(10, 15),
		randomBetween(-50, 50),
		randomBetween(1, 5),
		0));
}

context.shadowBlur = 15;
context.shadowColor = '#fff';

//////////////////////////////////////////////////////////////////////////////

function clearCanvas() {
	context.fillStyle = 'rgba(30,30,30,0.8)';
	context.fillRect(0,0,canvas.width,canvas.height);
}

function randomBetween(min,max) {
	return Math.floor((Math.random()*(max - min)+min));
}

function getHypothenuse(x1,y1,x2,y2) {
	var x = Math.abs(x1-x2);
	var y = Math.abs(y1-y2);
	return Math.sqrt((x*x)+(y*y));
}

//////////////////////////////////////////////////////////////////////////////

function world() {
	clearCanvas();
	floor.draw();
	for (var s of stars) {
		s.update().draw();
	}
	for (var f of fallings) {
		f.update().draw();
	}
}

//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////

function Star() {
	this.x = randomBetween(0, canvas.width); 
	this.y = randomBetween(0, floor.y);
	this.radius = randomBetween(20,30) * 0.05;
	this.aradius = randomBetween(10, 100);
	this.update = function() {
		return this;
	}
	this.draw = function() {
		context.fillStyle = '#fff';
		context.beginPath();
		context.arc(this.x, this.y, this.radius, Math.PI*2, false);
		context.fill();

		context.shadowBlur = 0;
		context.fillStyle = 'rgba(255,255,255,0.005)';
		context.beginPath();
		context.arc(this.x, this.y, this.aradius, Math.PI*2, false);
		context.fill();
		context.shadowBlur = 15;
	}
}

function Floor() {
	this.y = canvas.height/4 * 3;
	this.draw = function() {
		context.fillStyle = '#ccc';
		context.fillRect(0, this.y, canvas.width, canvas.height-this.y);
		context.fill();
	}
}

function Falling(x, y, r, dx, dy, p) {
	this.x = x; 
	this.y = y;
	this.radius = r;
	this.dx = dx;
	this.dy = dy;
	this.p = p;

	this.delete = function() {
		for (var i = 0; i < fallings.length; i++) {
			if (fallings[i] == this) {
				fallings.splice(i, 1);
			}
		}
	}
	this.update = function() {
		this.x += this.dx;
		this.y += this.dy;
		if (this.y + this.radius > floor.y) {
			this.radius *= 0.7;
			this.dy = -this.dy * 0.3;
			this.y = floor.y - this.radius;
			if (this.radius > 4) {
				var c = randomBetween(1, 6);
				for (var i = 0; i < c; i++) {
					fallings.push(new Falling(
						this.x, this.y, this.radius * 0.5,
						-this.dx * randomBetween(-3, 3) * 0.5, this.dy * randomBetween(1, 3), 1));
				}
			}
		} else {
			this.dy += gravity;
		}
		if (this.radius < 2) {
			if (this.p == 1) {
				this.delete();
			} else {
				this.x = x; 
				this.y = y;
				this.radius = r;
				this.dx = randomBetween(-30, 30);
				this.dy = randomBetween(1, 5);
			}
		}
		return this;
	}
	this.draw = function() {

		// var range = 100;
		// for (var f of fallings) {
		// 	var h = getHypothenuse(this.x, this.y, f.x, f.y);
		// 	if (h < range) {
		// 		context.strokeStyle = 'rgba(255,255,255,'+((Math.abs(h-range))*(3/range))+')';
		// 		context.beginPath();
		// 		context.moveTo(this.x, this.y);
		// 		context.lineTo(f.x, f.y);
		// 		context.stroke();
		// 	}
		// }

		// var range = 40;
		// for (var s of stars) {
		// 	var h = getHypothenuse(this.x, this.y, s.x, s.y);
		// 	if (h < range) {
		// 		context.strokeStyle = 'rgba(255,255,255,'+((Math.abs(h-range))*(3/range))+')';
		// 		context.beginPath();
		// 		context.moveTo(this.x, this.y);
		// 		context.lineTo(s.x, s.y);
		// 		context.stroke();
		// 	}
		// }

		context.fillStyle = '#fff';
		context.strokeStyle = '#fff';
		context.beginPath();
		context.arc(this.x, this.y, this.radius, Math.PI*2, false);
		context.stroke();
		context.fill();
	}
}

//////////////////////////////////////////////////////////////////////////////