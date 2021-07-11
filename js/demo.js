
var meshFloor;
var keyboard = {};
var player = { height:2, speed:.10, turnSpeed:Math.PI*0.02};
var USE_WIREFRAME = false;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(90, 1280/720, .01, 2000);
var hemisphereLight, shadowLight;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

addEventListener("mousedown", (event)=>{
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	raycaster.setFromCamera( mouse, camera );
	
  	console.log(scene.children);
	var intersects = raycaster.intersectObjects( scene.children );

  	console.log(intersects.length);

	if (intersects.length > 2.9){
		  window.open(intersects[0].object.userData.URL);
	}
 }
)

function init(){
	camara();	
	Renderizador();
	PlanoPiso();
	iluminacion();
	AudioListenerP();
	paisaje();
	ChipVideo();
	createBios();
	procesador();
	drawRAMChips();
	drawSATAConnectors();
	draw24PinConnector();
	animate();
}

//RENDERIZAR JUEGO__________________________________________________________________________________________________
//__________________________________________________________________________________________________________________
function Renderizador(){
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	aspectRatio = WIDTH / HEIGHT;

	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.setSize(WIDTH, HEIGHT);

	document.body.appendChild(renderer.domElement);
}

//CAMARA____________________________________________________________________________________________________________
//__________________________________________________________________________________________________________________
function camara(){
	camera.position.set(6, player.height, -10);
	camera.rotation.x = 50;
	camera.rotation.y = 50;
	camera.lookAt(new THREE.Vector3(6,player.height,0));
}
//PLANO_____________________________________________________________________________________________________________
//__________________________________________________________________________________________________________________
function PlanoPiso(){
	var texture = new THREE.TextureLoader().load( "img/Ground.png" );
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	var geo = new THREE.PlaneBufferGeometry(50, 45, 1, 1);
	var mat = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture, side: THREE.DoubleSide, wireframe:USE_WIREFRAME });
	meshFloor = new THREE.Mesh(geo, mat);
	meshFloor.rotation.x -= Math.PI / 2; // Rotate the floor 90 degrees

	scene.add(meshFloor);
}
//ANIMACIÓN_________________________________________________________________________________________________________
//__________________________________________________________________________________________________________________
function animate(){
	
	window.requestAnimationFrame(animate);
	
	// Keyboard movement inputs
	if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		// Redirect motion by 90 degrees
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}
	
	// Keyboard turn inputs
	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}
	/*
	if(keyboard[13]){

	}*/

	
	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
window.onload = init;


//CHIP DE BIOS______________________________________________________________________________________________________
//__________________________________________________________________________________________________________________
function createBios(){
	
	//Placa de la bios
	var PlacaBios = new THREE.Mesh(
		new THREE.BoxGeometry(7.4,1.05,4),
		new THREE.MeshPhongMaterial({color:0x424242})
	);

	PlacaBios.position.y = .4; 
	PlacaBios.position.x = -.32;
	PlacaBios.position.z = -17.25;
	PlacaBios.userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_BIOS/"};
	scene.add(PlacaBios);

	//Declaración de los cilindros
	const geometry = new THREE.CylinderGeometry(.25,.1,2.195,30);
	const material = new THREE.MeshPhongMaterial({color:0x828282, side: THREE.DoubleSide});
	var Cilindros1 = [];

	//Cilindros Izquierdos
	for(let i = 0; i < 6; i++){
		Cilindros1[i] = new THREE.Mesh(geometry, material);
		Cilindros1[i].position.z = -19.5;
		Cilindros1[i].position.x = -3.25+(i*1.15);
		Cilindros1[i].position.y = .6;
		Cilindros1[i].rotation.y = 1.577;
		Cilindros1[i].rotation.z = 2.5*Math.PI;
		Cilindros1[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_BIOS/"};
		scene.add( Cilindros1[i] );
	}

	//Cilindros Derechos
	var Cilindros2 = [];

	for(let i = 0; i < 6; i++){
		Cilindros2[i] = new THREE.Mesh(geometry, material);
		Cilindros2[i].position.z = -14.9;
		Cilindros2[i].position.x = -3.25+(i*1.15);
		Cilindros2[i].position.y = .6;
		Cilindros2[i].rotation.y = 1.577;
		Cilindros2[i].rotation.z = -0.5*Math.PI;
		Cilindros2[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_BIOS/"};
		scene.add( Cilindros2[i] );
	}

	//Patitas
		//Declaración de las patitas 
		const geometryp = new THREE.CylinderGeometry(.1,.05,.6,30);
		const materialp = new THREE.MeshPhongMaterial({color:0x828282, side: THREE.DoubleSide});
		var patita1 = [];

		//patitas Izquierdas
		for(let i = 0; i < 6; i++){
			patita1[i] = new THREE.Mesh(geometryp, materialp);
			patita1[i].position.z = -20.5;
			patita1[i].position.x = -3.25+(i*1.15);
			patita1[i].position.y = .3;
			patita1[i].rotation.y = 1.577;
			patita1[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_BIOS/"};
			scene.add( patita1[i] );
		}

		//patitas Derechas
		var patita2 = [];
		for(let i = 0; i < 6; i++){
			patita2[i] = new THREE.Mesh(geometryp, materialp);
			patita2[i].position.z = -13.9;
			patita2[i].position.x = -3.25+(i*1.15);
			patita2[i].position.y = .3;
			patita2[i].rotation.y = 1.577;
			patita2[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_BIOS/"};
			scene.add( patita2[i] );
		}
}

//PROCESADOR / ZOCALO_______________________________________________________________________________________________
//__________________________________________________________________________________________________________________
function procesador(){

	var procesadorZocalo = new THREE.Mesh(
		new THREE.BoxGeometry(6.8,.6,10.4),
		new THREE.MeshPhongMaterial({color:0x555555})

	);
	procesadorZocalo.position.y = 1.0; 
	procesadorZocalo.position.x = 15.29;
	procesadorZocalo.position.z = -2.55;
	procesadorZocalo.userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_Procesador/"};
	scene.add(procesadorZocalo);

	//La bace del procesador
	Base = new THREE.Mesh(
		new THREE.BoxGeometry(9,.8,13.3),
		new THREE.MeshPhongMaterial({color:0x404040})

	);
	Base.position.y = .4; 
	Base.position.x = 15.29;
	Base.position.z = -2.55;
	Base.userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_Procesador/"};
	scene.add(Base);

	const geometry = new THREE.CylinderGeometry(.65,.85,.3);
	const material = new THREE.MeshPhongMaterial({color:0x828282, side: THREE.DoubleSide});
	var Cilindros1 = [];

	//Cilindros Izquierdos(Tornillos)
	for(let i = 0; i < 2; i++){
		Cilindros1[i] = new THREE.Mesh(geometry, material);
		Cilindros1[i].position.z = -10.3;
		Cilindros1[i].position.x = 9.4+(i*11.55);
		Cilindros1[i].position.y = .1;
		Cilindros1[i].rotation.y = 1.577;
		Cilindros1[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_Procesador/"};
		scene.add( Cilindros1[i] );
	}
	//Cilindros Derechos(Tornillos)
	var Cilindros2 = [];

	for(let i = 0; i < 2; i++){
		Cilindros2[i] = new THREE.Mesh(geometry, material);
		Cilindros2[i].position.z = 5.6;
		Cilindros2[i].position.x = 9.4+(i*11.55);
		Cilindros2[i].position.y = .1;
		Cilindros2[i].rotation.y = 1.577;
		Cilindros2[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_Procesador/"};
		scene.add( Cilindros2[i] );
	}
}

//CHIP DEL VIDEO____________________________________________________________________________________________________
//__________________________________________________________________________________________________________________
function ChipVideo(){
var	PlacaVideo = new THREE.Mesh(
		new THREE.BoxGeometry(4.4,1.05,6.5),
		new THREE.MeshPhongMaterial({color:0x424242})
	);

	PlacaVideo.position.y = .4; 
	PlacaVideo.position.x = -0.31;
	PlacaVideo.position.z = -2.32;
	PlacaVideo.userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ChipVideo/"};
	scene.add(PlacaVideo);

	const geometry = new THREE.CylinderGeometry(.25,.1,1.2,30);
	const material = new THREE.MeshPhongMaterial({color:0x828282, side: THREE.DoubleSide});
	var Cilindros1 = [];

	//Cilindros 1
	for(let i = 0; i < 2; i++){
		Cilindros1[i] = new THREE.Mesh(geometry, material);
		Cilindros1[i].position.z = -6.17;
		Cilindros1[i].position.x = .39-(i*1.35);
		Cilindros1[i].position.y = .5;
		Cilindros1[i].rotation.y = 1.577;
		Cilindros1[i].rotation.z = 0.5*Math.PI;
		Cilindros1[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ChipVideo/"};
		scene.add( Cilindros1[i] );
	}

	//Cilindros 2
	var Cilindros2 = [];
	for(let i = 0; i < 2; i++){
		Cilindros2[i] = new THREE.Mesh(geometry, material);
		Cilindros2[i].position.z = 1.52;
		Cilindros2[i].position.x = .37-(i*1.35);
		Cilindros2[i].position.y = .5;
		Cilindros2[i].rotation.y = 1.577;
		Cilindros2[i].rotation.z = -0.5*Math.PI;
		Cilindros2[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ChipVideo/"};
		scene.add( Cilindros2[i] );
	}

	//Cilindros 3
	var Cilindros3 = [];
	for(let i = 0; i < 2; i++){
		Cilindros3[i] = new THREE.Mesh(geometry, material);
		Cilindros3[i].position.z = -1.4-(i*2.02);
		Cilindros3[i].position.x = 2.19;
		Cilindros3[i].position.y = .5;
		Cilindros3[i].rotation.z = 0.5*Math.PI;
		Cilindros3[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ChipVideo/"};
		scene.add( Cilindros3[i] );
	}

	//Cilindros 4
	var Cilindros4 = [];
	for(let i = 0; i < 2; i++){
		Cilindros4[i] = new THREE.Mesh(geometry, material);
		Cilindros4[i].position.z = -1.4-(i*2.02);
		Cilindros4[i].position.x = -2.85;
		Cilindros4[i].position.y = .5;
		Cilindros4[i].rotation.z = -0.5*Math.PI;
		Cilindros4[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ChipVideo/"};
		scene.add( Cilindros4[i] );
	}

		//Patitas
		//Declaración de las patitas 
		const geometryp = new THREE.CylinderGeometry(.1,.05,.5,30);
		const materialp = new THREE.MeshPhongMaterial({color:0x828282, side: THREE.DoubleSide});

		var patita1 = [];
		//patita 1
		for(let i = 0; i < 2; i++){
			patita1[i] = new THREE.Mesh(geometryp, materialp);
			patita1[i].position.z = -6.69;
			patita1[i].position.x = -.98+(i*1.35);
			patita1[i].position.y = .3;
			patita1[i].rotation.y = 1.577;
			patita1[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ChipVideo/"};
			scene.add( patita1[i] );
		}

		//patita 2
		var patita2 = [];
		for(let i = 0; i < 2; i++){
			patita2[i] = new THREE.Mesh(geometryp, materialp);
			patita2[i].position.z = 2.026;
			patita2[i].position.x = -.98+(i*1.35);
			patita2[i].position.y = .3;
			patita2[i].rotation.y = 1.577;	
			patita2[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ChipVideo/"};
			scene.add( patita2[i] );
		}

		var patita3 = [];
		//patita 3
		for(let i = 0; i < 2; i++){
			patita3[i] = new THREE.Mesh(geometryp, materialp);
			patita3[i].position.z = -1.4-(i*2.02);
			patita3[i].position.x = 2.7;
			patita3[i].position.y = .3;
			patita3[i].rotation.y = 1.577;
			patita3[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ChipVideo/"};
			scene.add(patita3[i]);
		}

		var patita4 = [];
		//patita 3
		for(let i = 0; i < 2; i++){
			patita4[i] = new THREE.Mesh(geometryp, materialp);
			patita4[i].position.z = -1.4-(i*2.02);
			patita4[i].position.x = -3.36;
			patita4[i].position.y = .3;
			patita4[i].rotation.y = 1.577;
			patita4[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ChipVideo/"};
			scene.add(patita4[i]);
		}
		
}

//MEMORIA RAM_______________________________________________________________________________________________________
//__________________________________________________________________________________________________________________
function drawRAMChips(){	
	const geometryR = new THREE.BoxGeometry(4,38.5,.5);
	const materialR = new THREE.MeshPhongMaterial({color:0x3a7c39, wireframe:USE_WIREFRAME})
	var	ram_1 = [];

	for(let i = 0; i < 2; i++){
		ram_1[i] = new THREE.Mesh(geometryR, materialR);
		ram_1[i].position.z = -.2;
		ram_1[i].position.x = -19.82+(i*2.0);
		ram_1[i].position.y = 1.9;
		ram_1[i].rotation.y = 1.577;
		ram_1[i].rotation.z = 0.5*Math.PI;
		ram_1[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_RAM/"};
		scene.add( ram_1[i] );
	}

	const geometry = new THREE.BoxGeometry(2,2,1.5);
	const material = new THREE.MeshPhongMaterial({color:0x252525, wireframe:USE_WIREFRAME});
	
	const chip_ram1 = [];
	for(let i = 0; i < 8; i++){
		chip_ram1[i] = new THREE.Mesh(geometry, material);
		chip_ram1[i].position.z = -15.25+(i*4.29);
		chip_ram1[i].position.x = -17.65;
		chip_ram1[i].position.y = 2;
		chip_ram1[i].rotation.y = 1.577;
		chip_ram1[i].rotation.z = 0.5*Math.PI;
		chip_ram1[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_RAM/"};
		scene.add( chip_ram1[i] );
	}

	const chip_ram2 = [];

	for(let i = 0; i < 8; i++){
		chip_ram2[i] = new THREE.Mesh(geometry, material);
		chip_ram2[i].position.z = -15.25+(i*4.29);
		chip_ram2[i].position.x = -19.78;
		chip_ram2[i].position.y = 2;
		chip_ram2[i].rotation.y = 1.577;
		chip_ram2[i].rotation.z = 0.5*Math.PI;
		chip_ram2[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_RAM/"};
		scene.add( chip_ram2[i] );
	}
}

//MÚSICA____________________________________________________________________________________________________________
//__________________________________________________________________________________________________________________
function AudioListenerP(){
	const listener = new THREE.AudioListener();
	camera.add(listener);

	//Fuente de audio global
	const sound = new THREE.Audio(listener);

	//Cargar el sonido y configurarlo como búfer del objeto de audio

	const audioLoader = new THREE.AudioLoader();
	audioLoader.load('audio/musica.mp3', function(buffer)
	{
		sound.setBuffer(buffer);
		sound.setLoop(true);
		sound.setVolume(0.35);
		sound.play();
	}
 );
}
//PUERTOS SATA____________________________________________________________________________________________________________
//__________________________________________________________________________________________________________________
function drawSATAConnectors(){
	sata_1 = new THREE.Mesh(
		new THREE.BoxGeometry(1,.9,4.9),
		new THREE.MeshPhongMaterial({color:0xf40000})
	);
	sata_1.position.y = .45; 
	sata_1.position.x = -12.01;
	sata_1.position.z = 1.52;
	sata_1.userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ConectorSATA/"};
	scene.add(sata_1);

	sata_1_1 = new THREE.Mesh(
		new THREE.BoxGeometry(0.4,0.8,3),
		new THREE.MeshPhongMaterial({color:0xf40000})
	);
	sata_1_1.position.y = 0; 
	sata_1_1.position.x = -11.4;
	sata_1_1.position.z = 1.52;
	sata_1_1.userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ConectorSATA/"};
	scene.add(sata_1_1);

	sata_2 = new THREE.Mesh(
		new THREE.BoxGeometry(1,.9,4.9),
		new THREE.MeshPhongMaterial({color:0xf40000})
	);
	sata_2.position.y = .45; 
	sata_2.position.x = -12.01;
	sata_2.position.z = -5.77;
	sata_2.userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ConectorSATA/"};
	scene.add(sata_2);

	sata_2_1 = new THREE.Mesh(
		new THREE.BoxGeometry(0.4,0.8,3),
		new THREE.MeshPhongMaterial({color:0xf40000})
	);
	sata_2_1.position.y = 0; 
	sata_2_1.position.x = -11.4;
	sata_2_1.position.z = -5.77;
	sata_2_1.userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ConectorSATA/"};
	scene.add(sata_2_1);
}

//CONECTOR DE 24 PINES (ALIMENTACIÓN)____________________________________________________________________________________________________________
//__________________________________________________________________________________________________________________
function draw24PinConnector(){
	pin_connector = new THREE.Mesh(
		new THREE.BoxGeometry(17.7,1.2,4.1),
		new THREE.MeshPhongMaterial({color:0xffffff})
	);
	pin_connector.position.y = 0.3; 
	pin_connector.position.x = 0.3;
	pin_connector.position.z = 15.6;
	pin_connector.userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ConectorAlimentacion/"};
	scene.add(pin_connector);

	const geometry = new THREE.BoxGeometry(1.4,1.8,1.2);
	const material = new THREE.MeshPhongMaterial({color:0x181717, wireframe:USE_WIREFRAME});
	var pin = [];

	for(let i = 0; i < 12; i++){
		pin[i] = new THREE.Mesh(geometry, material);
		pin[i].position.z = 16.55;
		pin[i].position.x = -7.8+(i*1.47);
		pin[i].position.y = 0.3;
		pin[i].rotation.y = 1.577;
		pin[i].rotation.z = 0.5*Math.PI;
		pin[i].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ConectorAlimentacion/"};
		scene.add( pin[i] );

		pin[i+1] = new THREE.Mesh(geometry, material);
		pin[i+1].position.z = 14.55;
		pin[i+1].position.x = -7.8+(i*1.47);
		pin[i+1].position.y = 0.3;
		pin[i+1].rotation.y = 1.577;
		pin[i+1].rotation.z = 0.5*Math.PI;
		pin[i+1].userData = { URL: "https://yordimunozvazquez.github.io/PaginaWeb_ConectorAlimentacion/"};
		scene.add( pin[i+1] );
	}
}

//ILUMINACIÓN DEL JUEGO_____________________________________________________________________________________________
//__________________________________________________________________________________________________________________
function iluminacion(){


	hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0xbbdefb, .75)
	shadowLight = new THREE.DirectionalLight(0xffffff, .8);

	shadowLight.position.set(950, 250, 350);

	shadowLight.castShadow = true;

	shadowLight.shadow.camera.left = 950;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 550;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 955;
	shadowLight.shadow.camera.far = 1000;

	
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;
	ambientLight = new THREE.AmbientLight(0xffffff, .3);

	
	scene.add(hemisphereLight);  
	scene.add(shadowLight);
	scene.add(ambientLight);

}

//MUNDO_____________________________________________________________________________________________________________
//__________________________________________________________________________________________________________________
function paisaje(){
	var materialArray = [];
	var texture_Enfrente = new THREE.TextureLoader().load('img/Enfrente.png');
	var texture_Atras = new THREE.TextureLoader().load('img/Atras.png');
	var texture_Arriba = new THREE.TextureLoader().load('img/Arriba.png');
	var texture_Abajo = new THREE.TextureLoader().load('img/Abajo.png');
	var texture_Derecho = new THREE.TextureLoader().load('img/Derecho.png');
	var texture_Izquierda = new THREE.TextureLoader().load('img/Izquierda.png');

	materialArray.push(new THREE.MeshBasicMaterial( { map: texture_Enfrente }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: texture_Atras }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: texture_Arriba }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: texture_Abajo }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: texture_Derecho }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: texture_Izquierda }));
	
	for (let i = 0; i < 6; i++)
	materialArray[i].side = THREE.BackSide;
	
	var skyboxGeo = new THREE.BoxGeometry( 2000, 2000, 2000);
	var skybox = new THREE.Mesh( skyboxGeo, materialArray );
	scene.add( skybox );

}
