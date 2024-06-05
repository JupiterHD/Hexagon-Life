function start() {
	if(game != null)return;
	game = setInterval(step, delay);
}


function pause() {
	if(game == null)return;
	clearInterval(game);
	game = null;
}


function step() {
	let arr = [];
	for(let i = 0; i < FIELD.length; i++)
	{
		let p = 0;
		if(FIELD[(i+N*N-N)%(N*N)] == 1)p++;
		if(FIELD[(i+N*N-N-1*(parseInt(i/N)%2==1 ? -1 : 1))%(N*N)] == 1)p++;
		if(FIELD[(i+N*N-1)%(N*N)] == 1)p++;
		if(FIELD[(i+1)%(N*N)] == 1)p++;
		if(FIELD[(i+N)%(N*N)] == 1)p++;
		if(FIELD[(i+N-1*(parseInt(i/N)%2==1 ? -1 : 1))%(N*N)] == 1)p++;
		arr.push(p);
	}
	for(let i = 0; i < arr.length; i++)
		if(settings[arr[i]] == 1)revive(i);
		else kill(i);
	if(stopgame)extinction();
}
