/*
Function to make the web
*/

function makeWeb(barnSize) {

	var webColor = 0xc0c0c0;

	//create a single web material to be used by all circles
	var webMat = new THREE.MeshBasicMaterial({color: webColor, wireframe: true});

	//create two objects, one for the whole web and one for the inner part
	var web = new THREE.Object3D();
	var innerWeb = new THREE.Object3D();


	//create the inner web using concentric circle geometries
	var cg1 = new THREE.CircleGeometry(10,8);
	var circ1 = new THREE.Mesh(cg1, webMat);
	innerWeb.add(circ1);

	var cg2 = new THREE.CircleGeometry(17,8);
	var circ2 = new THREE.Mesh(cg2, webMat);
	innerWeb.add(circ2);

	var cg3 = new THREE.CircleGeometry(22,8);
	var circ3 = new THREE.Mesh(cg3, webMat);
	innerWeb.add(circ3);

	var cg4 = new THREE.CircleGeometry(29,8);
	var circ4 = new THREE.Mesh(cg4, webMat);
	innerWeb.add(circ4);

	var cg5 = new THREE.CircleGeometry(35,8);
	var circ5 = new THREE.Mesh(cg5, webMat);
	innerWeb.add(circ5);

	innerWeb.position.set(-0.8*barnSize,2.4*barnSize,1.5*barnSize);
	web.add(innerWeb); //add the the entire web


	//create a single line material to be used by all the lines
	var lineMat = new THREE.LineBasicMaterial({color: webColor});


	//create all the lines and add them to the web
	var lg1 = new THREE.Geometry();
	lg1.vertices.push(new THREE.Vector3(0,2.4*barnSize,1.5*barnSize));
	lg1.vertices.push(new THREE.Vector3(2*barnSize,2.8*barnSize,1.5*barnSize));
	var l1 = new THREE.Line(lg1, lineMat);
	web.add(l1);

	var lg2 = new THREE.Geometry();
	lg2.vertices.push(new THREE.Vector3(-0.18*barnSize,1.8*barnSize,1.5*barnSize));
	lg2.vertices.push(new THREE.Vector3(2*barnSize,2.4*barnSize,1.5*barnSize));
	var l2 = new THREE.Line(lg2, lineMat);
	web.add(l2);

	var lg3 = new THREE.Geometry();
	lg3.vertices.push(new THREE.Vector3(-0.18*barnSize,3*barnSize,1.5*barnSize));
	lg3.vertices.push(new THREE.Vector3(1.45*barnSize,3.4*barnSize,1.5*barnSize));
	var l3 = new THREE.Line(lg3, lineMat);
	web.add(l3);

	var lg4 = new THREE.Geometry();
	lg4.vertices.push(new THREE.Vector3(-0.8*barnSize,3.2*barnSize,1.5*barnSize));
	lg4.vertices.push(new THREE.Vector3(-0.8*barnSize,3.5*barnSize,1.5*barnSize));
	var l4 = new THREE.Line(lg4, lineMat);
	web.add(l4);

	var lg5 = new THREE.Geometry();
	lg5.vertices.push(new THREE.Vector3(-1.4*barnSize,3*barnSize,1.5*barnSize));
	lg5.vertices.push(new THREE.Vector3(-1.6*barnSize,3.2*barnSize,1.5*barnSize));
	var l5 = new THREE.Line(lg5, lineMat);
	web.add(l5);

	var lg6 = new THREE.Geometry();
	lg6.vertices.push(new THREE.Vector3(-barnSize,2.4*barnSize,1.5*barnSize));
	lg6.vertices.push(new THREE.Vector3(-2*barnSize,2.4*barnSize,1.5*barnSize));
	var l6 = new THREE.Line(lg6, lineMat);
	web.add(l6);

	var lg7 = new THREE.Geometry();
	lg7.vertices.push(new THREE.Vector3(-1.4*barnSize,1.8*barnSize,1.5*barnSize));
	lg7.vertices.push(new THREE.Vector3(-2*barnSize,1.3*barnSize,1.5*barnSize));
	var l7 = new THREE.Line(lg7, lineMat);
	web.add(l7);

	var lg8 = new THREE.Geometry();
	lg8.vertices.push(new THREE.Vector3(-0.8*barnSize,1.53*barnSize,1.5*barnSize));
	lg8.vertices.push(new THREE.Vector3(-2*barnSize,0.7*barnSize,1.5*barnSize));
	var l8 = new THREE.Line(lg8, lineMat);
	web.add(l8);

	return web;

}
