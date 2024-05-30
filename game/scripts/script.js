let N = 20;

let FIELD = [];
let color = "black";
let is_random = false;
let is_gaming = false;
let delay = 1000;
let game = null;

for (let i = 0; i < N; i++) {
	for(let j = 0; j < N; j++)
		FIELD.push(0);
}

let field = document.getElementById('field');
let setcol = document.getElementById('setcol');
let randcol = document.getElementById('randcol');
let randcols = document.getElementById('randcols');
let startbtn = document.getElementById('start');
let pausebtn = document.getElementById('pause');

window.addEventListener('load', init);

function init() {
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			const cell = document.createElement('div');
			cell.className = "cell";
			cell.id = i*N + j;
			cell.style.left = (j*25 + (i % 2)*12.5) + "px";
			cell.style.top = i*25 + "px";
			cell.style.position = "absolute";
			cell.addEventListener('click', change)
			document.getElementById('field').appendChild(cell);
		}
	}
	setcol.addEventListener('click', set);
	randcol.addEventListener('click', rand);
	randcols.addEventListener('click', rands);
	startbtn.addEventListener('click', start);
	pausebtn.addEventListener('click', pause);
}

function rgbToHex(color) {
    if (color.charAt(0) == "#") {
        return color;
    }

    let nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
        r = parseInt(nums[2], 10).toString(16),
        g = parseInt(nums[3], 10).toString(16),
        b = parseInt(nums[4], 10).toString(16);

    return "#"+ (
        (r.length == 1 ? "0"+ r : r) +
        (g.length == 1 ? "0"+ g : g) +
        (b.length == 1 ? "0"+ b : b)
    );
}

function randInt(max) {
	return Math.floor(Math.random() * (max + 1));
}

function randCol() {
	return "rgb(" + randInt(255) + ", " + randInt(255) + ", " + randInt(255) + ")";
}

function rand() {
	color = randCol();
	col.value = rgbToHex(color);
	//console.log(rgbToHex(color));
	changeColors();
}

function rands() {
	if(is_random)
	{
		is_random = false;
		randcols.textContent = "Случайные цвета";
		changeColors();
		randcol.removeAttribute('disabled');
		setcol.removeAttribute('disabled');
	}else
	{
		is_random = true;
		randcols.textContent = "Одинаковые цвета";
		for(let i = 0; i < FIELD.length; i++)
			if(FIELD[i] == 1)
				document.getElementById(i).style.background = randCol();
		randcol.setAttribute('disabled', "");
		setcol.setAttribute('disabled', "");
	}
}

function set() {
	color = document.getElementById('col').value;
	changeColors();
	//console.log(color);
}

function changeColors() {
	for(let i = 0; i < FIELD.length; i++)
		if(FIELD[i] == 1)
			document.getElementById(i).style.background = color;
}

function change() {
	if(is_gaming)return;
	let id = parseInt(this.id);
	let row = Math.floor(id / N);
	//console.log(row);
	let col = id % N;
	//console.log(col);
	if(FIELD[id] == 1)kill(id);
	else revive(id);
}

function revive(pos) {
	FIELD[pos] = 1;
	if(is_random)
		document.getElementById(pos).style.background = randCol();
	else
		document.getElementById(pos).style.background = color;
}

function kill(pos) {
	FIELD[pos] = 0;
	document.getElementById(pos).style.background = "white";
}
