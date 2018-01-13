/*
Barn - Final Project
Lauren Luo & Ainsley St. Clair
Nov 15, 2017
*/


/*
Master function which creates a barn for our scene
*/
function makeBarn(size, textures) {

	var barn = new THREE.Object3D();

	//colors used
	var roofColor = 0x808080;
	var barnColor = 0x8b4513;

	var barnSize = size;

	//textures and material for the roof
	textures[2].wrapS = THREE.MirroredRepeatWrapping; //horizontal
  	textures[2].wrapT = THREE.MirroredRepeatWrapping; //vertical
  	textures[2].repeat.set(1,1);
  	textures[2].needsUpdate = true;
	var roofMat = new THREE.MeshPhongMaterial({color: roofColor, side: THREE.DoubleSide, map: textures[2]});

	//textures and material for the wood
	textures[3].wrapS = THREE.MirroredRepeatWrapping; //horizontal
  	textures[3].wrapT = THREE.MirroredRepeatWrapping; //vertical
  	textures[3].repeat.set(2,2);
  	textures[3].needsUpdate = true;
	var barnMat = new THREE.MeshPhongMaterial({color: barnColor, side: THREE.DoubleSide, map: textures[3]});

	//create the roof
	var roofGeom =  new THREE.PlaneGeometry(barnSize*4.4, barnSize*2);
	var roof = new THREE.Mesh(roofGeom, roofMat);
	roof.rotation.x = 1.25;
	roof.position.set(barnSize*2, barnSize*3.34, barnSize*0.75);
	barn.add(roof);

	//create geometries for all of the barn parts
	var beam = new THREE.BoxGeometry(barnSize/9, barnSize*4.2, barnSize/9);
	var frontPole = new THREE.BoxGeometry(barnSize/9, barnSize*3.5, barnSize/9);
	var backPole = new THREE.BoxGeometry(barnSize/9, barnSize*3, barnSize/9);
	var sideH = new THREE.BoxGeometry(barnSize/9, barnSize*1.5, barnSize/4);
	var tri = new THREE.BoxGeometry(barnSize/9, barnSize, barnSize/9);
	var slat = new THREE.BoxGeometry(barnSize/2, barnSize*4, barnSize/9);

	//create the front and back beams at the top that hold the roof
	var frontBeam = new THREE.Mesh(beam, barnMat);
	frontBeam.rotation.z = Math.PI/2;
	frontBeam.position.set(barnSize*2,barnSize*3.5,barnSize*1.5);
	barn.add(frontBeam);

	var backBeam = new THREE.Mesh(beam, barnMat);
	backBeam.rotation.z = Math.PI/2;
	backBeam.position.set(barnSize*2,barnSize*3,0);
	barn.add(backBeam);

	//create the four vertical poles
	var frontLPole = new THREE.Mesh(frontPole, barnMat);
	frontLPole.position.set(0,barnSize*1.75,barnSize*1.5);
	barn.add(frontLPole);

	var frontRPole = new THREE.Mesh(frontPole, barnMat);
	frontRPole.position.set(barnSize*4,barnSize*1.75,barnSize*1.5);
	barn.add(frontRPole);

	var backLPole = new THREE.Mesh(backPole, barnMat);
	backLPole.position.set(0,barnSize*1.5,0);
	barn.add(backLPole);

	var backRPole = new THREE.Mesh(backPole, barnMat);
	backRPole.position.set(barnSize*4,barnSize*1.5,0);
	barn.add(backRPole);

	//create the four horizontal beams on the right and left sides
	var leftHBP = new THREE.Mesh(sideH, barnMat);
	leftHBP.rotation.x = Math.PI/2;
	leftHBP.position.set(0,barnSize*0.75,barnSize*0.75);
	barn.add(leftHBP);

	var leftHTP = new THREE.Mesh(sideH, barnMat);
	leftHTP.rotation.x = Math.PI/2;
	leftHTP.position.set(0,barnSize*1.5,barnSize*0.75);
	barn.add(leftHTP);

	var rightHBP = new THREE.Mesh(sideH, barnMat);
	rightHBP.rotation.x = Math.PI/2;
	rightHBP.position.set(barnSize*4,barnSize*0.75,barnSize*0.75);
	barn.add(rightHBP);

	var rightHTP = new THREE.Mesh(sideH, barnMat);
	rightHTP.rotation.x = Math.PI/2;
	rightHTP.position.set(barnSize*4,barnSize*1.5,barnSize*0.75);
	barn.add(rightHTP);

	//create the angles beams at the front left and right 
	var leftTri = new THREE.Mesh(tri, barnMat);
	leftTri.rotation.z = -Math.PI/4;
	leftTri.position.set(barnSize*1/(2*Math.sqrt(2)),barnSize*(3.5-1/(2*Math.sqrt(2))),barnSize*1.5);
	barn.add(leftTri);

	var rightTri = new THREE.Mesh(tri, barnMat);
	rightTri.rotation.z = Math.PI/4;
	rightTri.position.set(barnSize*(4-1/(2*Math.sqrt(2))),barnSize*(3.5-1/(2*Math.sqrt(2))),barnSize*1.5);
	barn.add(rightTri);

	//create the beams that form the solid back of the barn
	var slat1 = new THREE.Mesh(slat, barnMat);
	slat1.rotation.z = Math.PI/2;
	slat1.position.set(barnSize*2,6*barnSize/16,0);
	barn.add(slat1);

	var slat2 = new THREE.Mesh(slat, barnMat);
	slat2.rotation.z = Math.PI/2;
	slat2.position.set(barnSize*2,9*barnSize/16 + 6*barnSize/16,0);
	barn.add(slat2);

	var slat3 = new THREE.Mesh(slat, barnMat);
	slat3.rotation.z = Math.PI/2;
	slat3.position.set(barnSize*2,2*9*barnSize/16 + 6*barnSize/16,0);
	barn.add(slat3);

	var slat4 = new THREE.Mesh(slat, barnMat);
	slat4.rotation.z = Math.PI/2;
	slat4.position.set(barnSize*2,3*9*barnSize/16 + 6*barnSize/16,0);
	barn.add(slat4);

	var slat5 = new THREE.Mesh(slat, barnMat);
	slat5.rotation.z = Math.PI/2;
	slat5.position.set(barnSize*2,4*9*barnSize/16 + 6*barnSize/16,0);
	barn.add(slat5);


	return barn;
}
