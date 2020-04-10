"use strict";

let W, H, c, ctx;
let linesheart = [];
let lineAnime = [];

const clear = () => ctx.clearRect(0, 0, W, H);

const showLinesheart = () =>{
	for(let i=1; i<linesheart.length; i++){
		ctx.beginPath();
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 1;
		ctx.moveTo(linesheart[i].x, linesheart[i].y);
		ctx.lineTo(linesheart[i-1].x, linesheart[i-1].y);
		ctx.stroke();
	}
};

const showAnime = () => {
	for(let i=1; i<lineAnime.length; i++){
		ctx.beginPath();
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 2.5;
		ctx.moveTo(lineAnime[i].x, lineAnime[i].y);
		ctx.lineTo(lineAnime[i-1].x, lineAnime[i-1].y);
		ctx.stroke();
	}
};

const showText = () => {
	ctx.fillStyle = "white";
	ctx.font = W/10 + "px monospace";
	ctx.textAlign = "center";
	ctx.fillText("Stay Safe", W/2, H/2+150);
};

const animate = () => {
	clear();
	lineAnime.map(x => x.update());
	showLinesheart();
	showAnime();
	showText();
	window.requestAnimationFrame(animate);
};

const init = () => {
	c = document.getElementById("canvas");
	c.width = W = window.innerWidth;
	c.height = H = window.innerHeight;
	ctx = c.getContext("2d");
	for(let a=0; a<360; a++)linesheart.push(new DotLine(a));
	for(let b=0; b<15;  b++)lineAnime.push(new DotAnime(b));
	animate();
};

class DotLine {
	constructor(x) {
		this.xS = -2 + x/100;
		this.x = W/2 + this.xS * 100;
		this.y = H/2 - (Math.sqrt(Math.cos(this.xS)) * Math.cos(50*this.xS) - 0.1 + Math.sqrt(Math.abs(this.xS)))*100;
	}
}

class DotAnime {
	constructor(x) {
		this.xS = -1 + x/100;
	}
	update(){
		this.xS += 0.006;
		if(this.xS > 1.8)this.xS = -1.8;
		this.x = W/2 + this.xS * 100;
		this.y = H/2 - (Math.sqrt(Math.cos(this.xS)) * Math.cos(50*this.xS) - 0.1 + Math.sqrt(Math.abs(this.xS))) * 100;
	}
}

window.onload = init;