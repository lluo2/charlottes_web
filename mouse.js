/*  Mouse for CS307
    Author: Alice Li (ali7)
    Date: 11/15/2017
    A Three.js model of a mouse. Copyright (©) 2017 by Alice Li
    This program is released under the GNU General Public License

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

    Contact ali7@wellesley.edu with questions.
*/

// create a mouse with a specific head size: the length of the mouse's snout
// the rest of the mouse's dimensions are calculated from the headSize,
// so all mice of different sizes will have the same proportions.
// the mouse is centered at the middle of its torso with its feet on the ground.
// the bounding box dimensions are as follows:
// if the mouse is centered, then the torsoRadius is headSize*.9,
// and the bounding box for the mouse is as follows:
//                     (minx, maxx) = (-torsoRadius, torsoRadius)
//                     (miny, maxy) = (0, torsoRadius * 1.3 + torsoRadius)
//                     (minz, maxz) = (-torsoRadius * 1.6 - mouseSize * 3, mouseSize * 2)
// and the dimensions of the bounding box are:
//                            width = mouseSize * 1.8
//                           height = mouseSize * 2.07
//                            depth = mouseSize * 6.44
function ali7Mouse(headSize) {

  // materials -----------------------------------------------------------------
  // basic colors for mouse and scene
  var mouseBodyMat = new THREE.MeshBasicMaterial({color: 0x886655});
  var mouseNoseMat = new THREE.MeshBasicMaterial({color: 0xd58775});
  var mouseTailMat = new THREE.MeshBasicMaterial({color: 0x997766});
  var mouseWhiskerMat = new THREE.MeshBasicMaterial({color: 0xdddddd});

  // ears are double sided - we can see the inside and outside
  var mouseEarMat = new THREE.MeshBasicMaterial({color: 0x997766,
                                                 side: THREE.DoubleSide});
  // the mouse's eyes are shiny
  var mouseEyeMat = new THREE.MeshPhongMaterial({color: 0x222222, specular: 0xdddddd, shininess: 30});

  // fixed parameters ----------------------------------------------------------
  // i want to make my mouse scalable, but there are fixed aspects of the mouse,
  // such as angles of rotation, scaling factors, and sphere detail
  var fixedParams = {sphereDetail: 30,
                     eyeAngleX: TW.degrees2radians(10), eyeAngleY: Math.PI/3,
                     phiLength: Math.PI, thetaLength: Math.PI,
                     noseAngleX: TW.degrees2radians(-110),
                     earRotationX: Math.PI * .5,
                     earRotationY: -Math.PI * .25, earRotationZ: -Math.PI * 5/6,
                     torsoRotationX: Math.PI * .5, torsoScaleY: 1.6,
                     whiskerRotationX: Math.PI * .5,
                     whiskerRotationY: TW.degrees2radians(100),
                     footScaleY: 1.8, footRotationX: Math.PI * 1.5,
                     toeRotationY: Math.PI * .5, toeRotationX: Math.PI * .5
                     };

  // make the mouse's head -----------------------------------------------------
  function createHead(mouseParams) {
    var head = new THREE.Object3D();

    var headGeometry = new THREE.CylinderGeometry(mouseParams.headRadiusTop, mouseParams.headRadiusBottom,
                                                  mouseParams.headHeight, fixedParams.sphereDetail);
    var neckGeometry = new THREE.CylinderGeometry(mouseParams.headRadiusBottom, mouseParams.headRadiusBottom,
                                                  mouseParams.headHeight/5, fixedParams.sphereDetail);
    var headMesh = new THREE.Mesh(headGeometry, mouseBodyMat);
    var neckMesh = new THREE.Mesh(neckGeometry, mouseBodyMat);

    head.add(neckMesh);
    head.add(headMesh);
                                        // position neck in relation to the head
    neckMesh.position.y = -mouseParams.headHeight * .6;

    // add the rest of the features
    addNose(head, mouseParams);
    addEar(head, mouseParams, 1);
    addEar(head, mouseParams, -1);
    addEye(head, mouseParams, 1);
    addEye(head, mouseParams, -1);
    addWhisker(head, mouseParams, 1);
    addWhisker(head, mouseParams, -1);
    return head;
  }

  // make whiskers -------------------------------------------------------------
  function createWhisker(mouseParams) {
    var whiskerRadius = mouseParams.headRadiusTop/12;  // narrow whiskers
    var whiskerHeight = mouseParams.headHeight * 1.2;
    var whiskerGeom = new THREE.CylinderGeometry(whiskerRadius, whiskerRadius,
                                                  whiskerHeight, fixedParams.sphereDetail);
    var whiskerMesh = new THREE.Mesh(whiskerGeom, mouseWhiskerMat);
    return whiskerMesh;
  }

  function addWhisker(head, mouseParams, side) {
    var whiskerFrame = new THREE.Object3D();

    var whisker = createWhisker(mouseParams);

    whisker.position.y = mouseParams.headHeight * .3;
    whisker.rotation.x = fixedParams.whiskerRotationX * side;

    whiskerFrame.add(whisker);

    whiskerFrame.rotation.y = fixedParams.whiskerRotationY * side;
    head.add(whiskerFrame);
    return head;
  }

  // make eyes -----------------------------------------------------------------
  function createEye(mouseParams) {
    var eyeGeometry = new THREE.SphereGeometry(mouseParams.eyeRadius, fixedParams.sphereDetail,
                                               fixedParams.sphereDetail);
    var eyeMesh = new THREE.Mesh(eyeGeometry, mouseEyeMat);
    return eyeMesh;
  }

  function addEye(head, mouseParams, side) {
    var eyeFrame = new THREE.Object3D();

    var eye = createEye(mouseParams);

    var eyePosZ = (mouseParams.headRadiusTop - mouseParams.headRadiusBottom) * .75;
    eye.position.z = eyePosZ;

    eyeFrame.rotation.x = fixedParams.eyeAngleX;
    eyeFrame.rotation.y = fixedParams.eyeAngleY * side;

    eyeFrame.add(eye);
    head.add(eyeFrame);
    return head;
  }

  // make nose -----------------------------------------------------------------
  function createNose(mouseParams) {

    var noseRadius = mouseParams.headRadiusTop * .4;
    var noseGeometry = new THREE.SphereGeometry(noseRadius, fixedParams.sphereDetail,
                                                fixedParams.sphereDetail);
    var noseMesh = new THREE.Mesh(noseGeometry, mouseNoseMat);
    return noseMesh;
  }

  function addNose(head, mouseParams) {
    var noseFrame = new THREE.Object3D();
    var nose = createNose(mouseParams);
    nose.position.z = mouseParams.headRadiusBottom * .8;
    noseFrame.add(nose);

    noseFrame.rotation.x = fixedParams.noseAngleX;
    head.add(noseFrame);
    return head;
  }

  // make ears -----------------------------------------------------------------
  // ear is made from a hemisphere
  function createEar(mouseParams) {

    var earGeometry = new THREE.SphereGeometry(mouseParams.earRadius,
                                               fixedParams.sphereDetail, fixedParams.sphereDetail,
                                               0, fixedParams.phiLength,
                                               0, fixedParams.thetaLength);
    var earMesh = new THREE.Mesh(earGeometry, mouseEarMat);
    return earMesh;
  }

  function addEar(head, mouseParams, side) {
    var earFrame = new THREE.Object3D();
    var ear = createEar(mouseParams);

    ear.rotation.x = fixedParams.earRotationX;
    ear.rotation.y = side * fixedParams.earRotationY;
    ear.rotation.z = side * fixedParams.earRotationZ;

    // these scale numbers are taken from when i first made a mouse with proportions i liked.
    ear.position.x = side * (mouseParams.headRadiusBottom - mouseParams.headRadiusTop) * .85;
    ear.position.y = -mouseParams.headHeight * .4;
    ear.position.z = -(mouseParams.headRadiusBottom - mouseParams.headRadiusTop) * 1.15;

    earFrame.add(ear);
    head.add(earFrame);
    return head;
  }

  // make toes -----------------------------------------------------------------
  // toeNum means which toe is being created: my mouse has 4 toes:
  // 2 inside toes and 2 outside that are off to the side and angled.
  function createToe(mouseParams, toeNum) {
    var toeRadius = mouseParams.legRadiusBottom/4;
    var toeGeom = new THREE.ConeGeometry(toeRadius, mouseParams.legRadiusTop,
                                         fixedParams.sphereDetail, fixedParams.sphereDetail,
                                         false, 0, fixedParams.thetaLength);
    var toeMesh = new THREE.Mesh(toeGeom, mouseNoseMat);

    toeMesh.position.y = -mouseParams.legHeight/2;

    // toes 1 and 2 are made in the positive x direction, toes 3 and 4 are negative,
    // so this statement determines which side the toe should be on.
    var toeSide = (toeNum == 1 || toeNum == 2) ? 1 : -1;

    // toes 1 and 4 are the outsidemost toes.
    if (toeNum == 1 || toeNum == 4) {
      toeMesh.position.x = toeRadius * 3 * toeSide;
      toeMesh.position.z = (mouseParams.legRadiusBottom + mouseParams.legRadiusBottom
                             * fixedParams.footScaleY * 2) * .65;
      toeMesh.rotation.y = fixedParams.toeRotationY;
      toeMesh.rotation.x = fixedParams.toeRotationX;
    }
    // toes 2 and 3 are the innermost toes.
    else if (toeNum == 2 || toeNum == 3) {               // middle toe
      toeMesh.position.x = toeRadius * toeSide;
      toeMesh.position.z = (mouseParams.legRadiusBottom + mouseParams.legRadiusBottom
                             * fixedParams.footScaleY * 2) * .8;
      toeMesh.rotation.y = fixedParams.toeRotationY;
      toeMesh.rotation.x = fixedParams.toeRotationX;
    }
    return toeMesh;
  }

  // assemble leg --------------------------------------------------------------
  function createLeg(mouseParams) {
    var wholeLeg = new THREE.Object3D();

    var legGeom = new THREE.CylinderGeometry(mouseParams.legRadiusTop, mouseParams.legRadiusBottom,
                                             mouseParams.legHeight, fixedParams.sphereDetail);
    var footGeom = new THREE.SphereGeometry(mouseParams.legRadiusTop,
                                            fixedParams.sphereDetail, fixedParams.sphereDetail,
                                            0, fixedParams.phiLength,
                                            0, fixedParams.thetaLength);

    var legMesh = new THREE.Mesh(legGeom, mouseBodyMat);
    var footMesh = new THREE.Mesh(footGeom, mouseNoseMat);
    var toeMesh1 = createToe(mouseParams, 1);
    var toeMesh2 = createToe(mouseParams, 2);
    var toeMesh3 = createToe(mouseParams, 3);
    var toeMesh4 = createToe(mouseParams, 4);

    footMesh.position.y = -mouseParams.legHeight/2;
    footMesh.position.z = mouseParams.legRadiusBottom;
    footMesh.scale.y = fixedParams.footScaleY;
    footMesh.rotation.x = fixedParams.footRotationX;

    wholeLeg.add(legMesh);
    wholeLeg.add(footMesh);
    wholeLeg.add(toeMesh1);
    wholeLeg.add(toeMesh2);
    wholeLeg.add(toeMesh3);
    wholeLeg.add(toeMesh4);

    return wholeLeg;
  }

  // add a leg of the mouse
  // if you were the mouse looking down at your legs, leg 1 is the front left foot,
  // and the rest are numbered clockwise.
  function addLeg(mouse, mouseParams, legNum) {
    var leg = createLeg(mouseParams);

    var legFront = (legNum == 1 || legNum == 2) ? 1 : -1;
    var legSide = (legNum == 1 || legNum == 4) ? 1 : -1;

    leg.position.x = mouseParams.torsoRadius * .3 * legSide;
    leg.position.y = -mouseParams.torsoRadius * .8;
    leg.position.z = mouseParams.torsoRadius * legFront;

    mouse.add(leg);
    return mouse;
  }

  // make tail -----------------------------------------------------------------
  function createTail(mouseParams) {
    var bezierCurve = new THREE.CubicBezierCurve3(
       new THREE.Vector3(0, 0, 0),
       new THREE.Vector3(mouseParams.tailLength, 0, mouseParams.tailLength/3),
       new THREE.Vector3(mouseParams.tailLength * 2, 0, -mouseParams.tailLength/3),
       new THREE.Vector3(mouseParams.tailLength * 3, 0, mouseParams.tailLength/3)
    );

    // create a pattern of radii that vary along the spine
    var radii = [mouseParams.tailRadius, mouseParams.tailRadius, mouseParams.tailRadius * .75, 0];

    // create the tube geometry using the Bezier curve and radii
    var tailGeometry = new THREE.TubeRadialGeometry(bezierCurve, 32, radii, 16, false);
    var tail = new THREE.Mesh(tailGeometry, mouseTailMat);
    return tail;
  }

  function addTail(mouse, mouseParams) {
    var tailFrame = new THREE.Object3D();
    var tail = createTail(mouseParams);

    tail.rotation.y = TW.degrees2radians(90);

    tail.position.y = -mouseParams.torsoRadius/2;
    tail.position.z = -mouseParams.torsoRadius * fixedParams.torsoScaleY * .75;

    tailFrame.add(tail);
    mouse.add(tailFrame);
    return mouse;
  }

  // assemble torso ------------------------------------------------------------
  function createTorso(mouseParams) {
    var torso = new THREE.Object3D();
    var torsoGeom = new THREE.SphereGeometry(mouseParams.torsoRadius,
                                             fixedParams.sphereDetail, fixedParams.sphereDetail);
    var torsoMesh = new THREE.Mesh(torsoGeom, mouseBodyMat);
    torsoMesh.scale.y = fixedParams.torsoScaleY;
    torsoMesh.rotation.x = fixedParams.torsoRotationX;
    torso.add(torsoMesh);

    addTail(torso, mouseParams);
    addLeg(torso, mouseParams, 1);
    addLeg(torso, mouseParams, 2);
    addLeg(torso, mouseParams, 3);
    addLeg(torso, mouseParams, 4);

    return torso;
  }

  // assemble all: torso and head ----------------------------------------------
  function createBody(mouseParams) {
    var body = new THREE.Object3D();
    var head = createHead(mouseParams);
    var torso = createTorso(mouseParams);

    body.add(torso);

    torso.position.y = -mouseParams.headHeight/9;

    head.position.z = mouseParams.torsoRadius * fixedParams.torsoScaleY * 1.05;
    head.rotation.x = TW.degrees2radians(90);
    body.add(head);
    return body;
  }

  var mouseObj = new THREE.Object3D();

  // using headSize, calculate all attributes of the mouse that are not fixed
  var calcParams = {headHeight: headSize,
                    headRadiusTop: headSize * .17, headRadiusBottom: headSize * .61,
                    eyeRadius: headSize * .08,
                    earRadius: headSize/3.5,
                    legHeight: headSize/1.75,
                    legRadiusTop: headSize/8, legRadiusBottom: headSize/10,
                    torsoRadius: headSize * .9,
                    tailLength: headSize * 1.1,
                    tailRadius: headSize * .1
  }
  var mouseBody = createBody(calcParams);

  // adjust the y position to make the feet stand on y = 0
  mouseBody.position.y = calcParams.torsoRadius * 1.25;
  mouseObj.add(mouseBody);
  return mouseObj;
}
