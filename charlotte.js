/* Creates Charlotte, the spider 
Charlotte is a singe set size. The origin is in the center of her body and she fits within 
a bounding box of about 10x10x10
*/

//creates charlotte by putting together her different parts
function makeCharlotte(spiderColor) {
  var spiderMat = new THREE.MeshPhongMaterial({color: spiderColor, side: THREE.DoubleSide});

  var charlotte = new THREE.Object3D();
  var body = createBody(spiderMat);
  charlotte.add(body);
  var legs = createLegs(spiderMat);
  charlotte.add(legs);

  return charlotte;
}

//create charlotte's body
function createBody(spiderMat) {
  var body = new THREE.Object3D();

  var midGeom = new THREE.SphereGeometry(3,30,30);
  var midMesh = new THREE.Mesh(midGeom, spiderMat);
  body.add(midMesh);

  var headGeom = new THREE.SphereGeometry(2,30,30);
  var headMesh = new THREE.Mesh(headGeom, spiderMat);
  headMesh.position.x = -4;
  body.add(headMesh);

  return body;
}

//helper function to create a single leg
function createOneLeg(spiderMat) {
  var upperLegGeom = new THREE.CylinderGeometry(0.3,0.3,3.5);
  var lowerLegGeom = new THREE.ConeGeometry(0.3,4);

  var leg = new THREE.Object3D();

  var upperLegMesh = new THREE.Mesh(upperLegGeom, spiderMat);
  upperLegMesh.rotation.set(Math.PI/2,Math.PI/4,0);
  upperLegMesh.position.set(0,0,4);
  leg.add(upperLegMesh);
  var lowerLegMesh = new THREE.Mesh(lowerLegGeom, spiderMat);
  lowerLegMesh.rotation.set(5*Math.PI/6,0,0);
  lowerLegMesh.position.set(0,-1.75,6.5);
  leg.add(lowerLegMesh);

  leg.position.x = -1.5;
  return leg;
}

//function to create all the legs
function createLegs(spiderMat) {
  var legs = new THREE.Object3D();

  //back legs
  var leg1 = createOneLeg(spiderMat);
  leg1.rotation.set(0,Math.PI/5,0);
  var leg2 = createOneLeg(spiderMat);
  leg2.rotation.set(0,-Math.PI-Math.PI/5,0);

  //back middle legs
  var leg3 = createOneLeg(spiderMat);
  leg3.rotation.set(0,Math.PI/10,0);
  var leg4 = createOneLeg(spiderMat);
  leg4.rotation.set(0,-Math.PI-Math.PI/10,0);

  //front middle legs
  var leg5 = createOneLeg(spiderMat);
  var leg6 = createOneLeg(spiderMat);
  leg6.rotation.set(0,-Math.PI,0);

  //front legs
  var leg7 = createOneLeg(spiderMat);
  leg7.position.set(-1.4,0,-0.24);
  leg7.rotation.set(0,-Math.PI/8,0);
  var leg8 = createOneLeg(spiderMat);
  leg8.position.set(-1.4,0,0.24);
  leg8.rotation.set(0,-Math.PI+Math.PI/8,0);

  legs.add(leg1);
  legs.add(leg2);
  legs.add(leg3);
  legs.add(leg4);
  legs.add(leg5);
  legs.add(leg6);
  legs.add(leg7);
  legs.add(leg8);

  return legs;
}
