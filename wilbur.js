/*
Hwk6 Creative Scene
Lauren Luo & Ainsley St. Clair
Nov 15, 2017
*/


/*
Master function which creates wilbur the pig from his components and sits him
atop a pail
Note: only makes one size pig -- the origin in located in the center of wilbur's head
and he fits within a tight bounding box that is 70 units tall, 40 units wide, and 40 units deep.
*/
function makeWilbur(pigColor, pailColor, pailHandleColor, textures) {

	//create the wilbur object
	var wilbur = new THREE.Object3D();

	textures[4].wrapS = THREE.MirroredRepeatWrapping; //horizontal
  	textures[4].wrapT = THREE.MirroredRepeatWrapping; //vertical
  	textures[4].repeat.set(2,10);
  	textures[4].needsUpdate = true;

	//create the material for wilbur, the pail, and the pail handle
	var pigMat = new THREE.MeshPhongMaterial({color: pigColor, side: THREE.DoubleSide, map: textures[4]});
	var pailMat = new THREE.MeshPhongMaterial({color: pailColor, side: THREE.DoubleSide});
	var pailHandleMat = new THREE.MeshPhongMaterial({color: pailHandleColor, side: THREE.DoubleSide});

	//create components of wilbur and add to the object
	var head = makeHead(pigMat);
	wilbur.add(head);
	var body = makeBody(pigMat);
	wilbur.add(body);
	var tail = makeTail(pigMat);
	wilbur.add(tail);

	//rotate and position wilbur
	wilbur.rotation.y = Math.PI/4;
	wilbur.position.set(2,0,4);

	//create and position the pail, adding to the wilbur object
	var pail = makePail(pailMat, pailHandleMat);
	pail.position.y = -52;
	wilbur.add(pail);

	//return the wilbur
	return wilbur;
}


/*
function that creates and returns the pail for the pig to sit on
*/
function makePail(pailMat, pailHandleMat) {

	//create the pail object
	var pail = new THREE.Object3D();

	//create the pail, position, and add to the object
	var pailGeom = new THREE.CylinderGeometry(16,18,12,30);
	var pailMesh = new THREE.Mesh(pailGeom, pailMat);
	pailMesh.position.set(5,0,0);
	pail.add(pailMesh);

	//create the handles, position, and add to the object
	var handleGeom = new THREE.TorusGeometry(3,0.5,30,6,Math.PI);
	var handle1Mesh = new THREE.Mesh(handleGeom, pailHandleMat);
	handle1Mesh.position.set(-12,-3,0);
	handle1Mesh.rotation.set(Math.PI/2, 0, Math.PI/2);
	pail.add(handle1Mesh);
	var handle2Mesh = new THREE.Mesh(handleGeom, pailHandleMat);
	handle2Mesh.position.set(22,-3,0);
	handle2Mesh.rotation.set(Math.PI/2, 0, -Math.PI/2);
	pail.add(handle2Mesh);

	//return the pail object
	return pail;

}

/*
function that creates and returns the pigs head
*/
function makeHead(pigMat) {

	//create the head object
	var head = new THREE.Object3D();

	//create the sphere for the head and add it to the head objects
	var headGeom = new THREE.SphereGeometry(10, 15, 15);
	var headMesh = new THREE.Mesh(headGeom, pigMat);
	head.add(headMesh);

	//geometries and materials for the eyes
 	var irisGeom = new THREE.ConeGeometry(1,3);
  	var whiteGeom = new THREE.SphereGeometry(1.035);
  	var pupilGeom = new THREE.SphereGeometry(0.3);
  	var whiteMat = new THREE.MeshPhongMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
  	var blackMat = new THREE.MeshPhongMaterial({color: 0x000000, side: THREE.DoubleSide});

  	//create the first eye and add it to the head
  	var eye1 = new THREE.Object3D();
  	var iris1Mesh = new THREE.Mesh(irisGeom, blackMat);
  	iris1Mesh.rotation.x = -Math.PI/2;
  	eye1.add(iris1Mesh);
  	var white1Mesh = new THREE.Mesh(whiteGeom, whiteMat);
  	white1Mesh.position.set(0,0,1.5);
  	eye1.add(white1Mesh);
  	var pupil1Mesh = new THREE.Mesh(pupilGeom, whiteMat);
  	pupil1Mesh.position.set(-0.1,-0.4,0.4);
  	eye1.add(pupil1Mesh);
  	eye1.position.set(-8,4,5);
  	eye1.rotation.set(Math.PI+0.3,-Math.PI/7,0);
  	head.add(eye1);

  	//create the second eye and add it to the head
  	var eye2 = new THREE.Object3D();
  	var iris2Mesh = new THREE.Mesh(irisGeom, whiteMat);
  	iris2Mesh.rotation.x = -Math.PI/2;
  	eye2.add(iris2Mesh);
  	var white2Mesh = new THREE.Mesh(whiteGeom, blackMat);
  	white2Mesh.position.set(0,0,1.5);
  	eye2.add(white2Mesh);
  	var pupil2Mesh = new THREE.Mesh(pupilGeom, whiteMat);
  	pupil2Mesh.position.set(-0.25,0.85,1.7);
  	eye2.add(pupil2Mesh);
  	eye2.position.set(-8,4,-5);
  	eye2.rotation.set(0,-Math.PI/7,0);
  	head.add(eye2);

  	//create the snout and add it to the head
	var snoutPts = [];
	snoutPts.push(new THREE.Vector2(9.5,0));
	snoutPts.push(new THREE.Vector2(9,2));
	snoutPts.push(new THREE.Vector2(8,4));
	snoutPts.push(new THREE.Vector2(7,5));
	snoutPts.push(new THREE.Vector2(6,6));
	snoutPts.push(new THREE.Vector2(4,10));
	snoutPts.push(new THREE.Vector2(4,12));
	var snoutGeom = new THREE.LatheGeometry(snoutPts);
	var snout = new THREE.Mesh(snoutGeom, pigMat);
	snout.rotation.z = Math.PI/2;
	snout.position.set(-3,0,0);
	head.add(snout);

  	//line for extruding the tip of the nose
	var noseTip = new THREE.Shape();
	noseTip.moveTo( 0,0 );
	noseTip.lineTo( -1, 2 );
	noseTip.lineTo( -1, 3 );
	noseTip.lineTo( 0, 5 );
	noseTip.lineTo( 3, 6 );
	noseTip.lineTo( 4, 6 );
	noseTip.lineTo( 7, 5 );
	noseTip.lineTo( 8, 3 );
	noseTip.lineTo( 8, 2 );
	noseTip.lineTo( 7, 0 );
	noseTip.lineTo( 4, -1 );
	noseTip.lineTo( 3, -1 );

	//extrude settings for create the tip of the nose
	var extrudeSettings = {
		steps: 2,
		amount: 2,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelSegments: 1
	};

	//create the tip of the nose and add it to the head
	var noseTipGeom = new THREE.ExtrudeGeometry(noseTip, extrudeSettings);
	var noseTipMesh = new THREE.Mesh(noseTipGeom, pigMat);
	noseTipMesh.position.set(-15,-2,-4);
	noseTipMesh.rotation.y = -Math.PI/2;
	head.add( noseTipMesh );

	//create the nostrils and add them to the head
 	 var nostrilGeom = new THREE.SphereGeometry(1,8,6,0,Math.PI);
  	var nostrilMat = new THREE.MeshPhongMaterial({color: 0x000000, side: THREE.BackSide});

  	var nostril1Mesh = new THREE.Mesh(nostrilGeom, nostrilMat);
  	nostril1Mesh.position.set(-18.8,.5,2);
  	nostril1Mesh.rotation.y = Math.PI/2;
  	head.add(nostril1Mesh);
  	var nostril2Mesh = new THREE.Mesh(nostrilGeom, nostrilMat);
  	nostril2Mesh.position.set(-18.8,.5,-3);
  	nostril2Mesh.rotation.y = Math.PI/2;
  	head.add(nostril2Mesh);

  	//Points for the Bexier curves to make both ears
  	var leftEarPts = [
  		[ [0,0,0],  [4,6,1],  [6,4,1],  [10, 0, 0] ],
   	 	[ [0,4,-6], [2,2,-4],  [4,2,-3],  [10, 0, 0] ],
  		[ [0,-4,-6], [2,1,-4],  [4,1,-3],  [10, 0, 0] ],
  		[ [0,0,0],  [4,-2,0], [6,-3,0], [10, 0, 0] ],
	];
  	var rightEarPts = [
    	[ [0,0,0],  [4,6,1],  [6,4,1],  [10, 0, 0] ],
    	[ [0,4,6], [2,2,4],  [4,2,3],  [10, 0, 0] ],
    	[ [0,-4,6], [2,1,4],  [4,1,3],  [10, 0, 0] ],
    	[ [0,0,0],  [4,-2,0], [6,-3,0], [10, 0, 0] ],
	];

	//create the left ear and add it to the head, calls helper function createEar
	var lEar = createEar(leftEarPts, pigMat);
	lEar.position.set(5.5,5,7.5);
	lEar.rotation.y = -Math.PI/6;
	lEar.rotation.x = -Math.PI/6;
 	head.add(lEar);

 	//create the right ear and add it to the head, calls helper function createEar
  	var rEar = createEar(rightEarPts, pigMat);
	rEar.position.set(5.5,5,-7.5);
	rEar.rotation.y = Math.PI/6;
	rEar.rotation.x = Math.PI/6;
	head.add(rEar);

	//rotate the head
	head.rotation.z = -Math.PI/15;
	head.rotation.y = -Math.PI/13;

	//return the head object
	return head;
}

/*
function to create the pig's ear, called in createHead
*/
function createEar(earPts, pigMat) {
	var earGeom = new THREE.BezierSurfaceGeometry( earPts.reverse(), 10, 10 );
	var earMesh = new THREE.Mesh(earGeom, pigMat);
	return earMesh;
}

/*
function that creates and returns the pig's body
*/
function makeBody(pigMat) {

	//create the body object
	var body = new THREE.Object3D();

	//create the points to make the body using LatheGeometry
	var bodyPts = [];
	bodyPts.push(new THREE.Vector2(0,0));
	bodyPts.push(new THREE.Vector2(1,0.25));
	bodyPts.push(new THREE.Vector2(2,0.5));
	bodyPts.push(new THREE.Vector2(3,0.75));
	bodyPts.push(new THREE.Vector2(4,1));
	bodyPts.push(new THREE.Vector2(5,1.25));
	bodyPts.push(new THREE.Vector2(6,1.5));
	bodyPts.push(new THREE.Vector2(7,1.75));
	bodyPts.push(new THREE.Vector2(8,2));
	bodyPts.push(new THREE.Vector2(9,2.25));
	bodyPts.push(new THREE.Vector2(10,2.5));
	bodyPts.push(new THREE.Vector2(11,20));
	bodyPts.push(new THREE.Vector2(10,30));
	bodyPts.push(new THREE.Vector2(7,35));
	bodyPts.push(new THREE.Vector2(5,40));

	//create the body, position it, and add it to the object
	var bodyGeom = new THREE.LatheGeometry(bodyPts);
	var bodyMesh = new THREE.Mesh(bodyGeom, pigMat);
	bodyMesh.rotation.z = Math.PI/15;
	bodyMesh.position.set(10,-47,0);
	body.add(bodyMesh);

	//create the points to make the front legs using LatheGeometry
	var legPts = [];
	legPts.push(new THREE.Vector2(0,0));
	legPts.push(new THREE.Vector2(1,1));
	legPts.push(new THREE.Vector2(2,2));
	legPts.push(new THREE.Vector2(2.5,3));
	legPts.push(new THREE.Vector2(3,4));
	legPts.push(new THREE.Vector2(3.5,5));
	legPts.push(new THREE.Vector2(3,10));
	legPts.push(new THREE.Vector2(2,25));
	legPts.push(new THREE.Vector2(2.5,26));
	legPts.push(new THREE.Vector2(1,27));

	//create both legs, position them, and add them to the body
	var legGeom = new THREE.LatheGeometry(legPts);
	var rightLegMesh = new THREE.Mesh(legGeom, pigMat);
	rightLegMesh.position.set(-3,-20,-5);
	rightLegMesh.rotation.z = 15*Math.PI/16;
	body.add(rightLegMesh);
	var leftLegMesh = new THREE.Mesh(legGeom, pigMat);
	leftLegMesh.position.set(-3,-20,5);
	leftLegMesh.rotation.z = 25*Math.PI/26;
	body.add(leftLegMesh);

	//create the bum, position it, and add it to the body
	var bumGeom = new THREE.SphereGeometry(10.25);
	var bumMesh = new THREE.Mesh(bumGeom, pigMat);
	bumMesh.position.set(10,-45,0);
	body.add(bumMesh);

	//create separate objects for each hind leg
	var lHindleg = new THREE.Object3D();
	var rHindleg = new THREE.Object3D();

	//add the thighs to each hing leg
	var thigh = new THREE.SphereGeometry(8);
	var lThighMesh = new THREE.Mesh(thigh, pigMat);
	lHindleg.add(lThighMesh);
	var rThighMesh = new THREE.Mesh(thigh, pigMat);
	rHindleg.add(rThighMesh);

 	//points to create the hind feet using LatheGeometry
	var footPts = [];
	footPts.push(new THREE.Vector2(0,0));
	footPts.push(new THREE.Vector2(1,0));
	footPts.push(new THREE.Vector2(2,1));
	footPts.push(new THREE.Vector2(1.75,1.5));
	footPts.push(new THREE.Vector2(2,5));
	footPts.push(new THREE.Vector2(1,9));

	//create the hind feet and add them to the hind legs
	//position the hind legs and add them to the body
	var foot = new THREE.LatheGeometry(footPts);
	var lFootMesh = new THREE.Mesh(foot,pigMat);
	lFootMesh.position.set(-12,-3,4);
	lFootMesh.rotation.z = -Math.PI/2;
	lHindleg.add(lFootMesh);
	lHindleg.position.set(9,-42,4);
	body.add(lHindleg);
	var rFootMesh = new THREE.Mesh(foot,pigMat);
	rFootMesh.position.set(-12,-3,-4);
	rFootMesh.rotation.z = -Math.PI/2;
	rHindleg.add(rFootMesh);
	rHindleg.position.set(9,-42,-4);
	body.add(rHindleg);

	//return the body
	return body;
}


/*
function that creates and returns the pig's tail
*/
function makeTail(pigMat) {

	//define a Bexier curve for the shape of the tail
	var bezierCurve = new THREE.CubicBezierCurve3(
	   new THREE.Vector3(0,0,0),
	   new THREE.Vector3(10,12,4),
	   new THREE.Vector3(-10,1,-4),
	   new THREE.Vector3(8,4,0)
	);

	//create an array of radii for the TubeRadialGeometry function
	var radii = [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0];

	//create and position the tail
	var tailGeom = new THREE.TubeRadialGeometry(bezierCurve, 32, radii, 16, false);
	var tailMesh = new THREE.Mesh(tailGeom, pigMat);
	tailMesh.position.set(19, -42, 0);

	//return the tail
	return tailMesh;
}
