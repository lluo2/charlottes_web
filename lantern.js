/*
* Written by: Priscilla Lee
* Course: CS 307, Fall 2017
* Assignment: Homework 6, Creative Scene (Wellesley Lamppost)
*
* This script creates a Wellesley Lamppost, using TubeRadialGeometries,
* bezier curves, TorusGeometries, and more.
*
* Copyright (Â©) 2015 by Priscilla Lee, all rights reserved.
*
* Modified By: Lauren Luo and Ainsley St. Clair
*/

// ===================================================================

/*
* Create a Wellesley lamppost, composed of multiple components.
* Its origin is at the center of its base's bottom.
* Its dimensions are ~roughly~ 25x120x10.
*/
function plee3Lamppost() {
  // Materials for the lamppost (black) and the light (white).
  var blackSmoothMat = new THREE.MeshPhongMaterial({
    color: "black",
    side: THREE.DoubleSide,
    specular: 0xc0c0c0,
    shininess: 15
  });

  var blackFlatMat = new THREE.MeshPhongMaterial({
    color: "black",
    side: THREE.DoubleSide,
    specular: 0xc0c0c0,
    shininess: 20,
    shading: THREE.FlatShading
  });

  var yellowFlatMat = new THREE.MeshPhongMaterial({
    color: 0xffb94e,
    side: THREE.DoubleSide,
    specular: 0xd0d0d0,
    shininess: 30,
    shading: THREE.FlatShading,
    transparent: true,
    opacity: 0.5
  });

  /* Create the lantern of a Wellesley lamppost. */
  function createLantern(lanternFaces) {
    var lantern = new THREE.Object3D();

    // The hook loop that hangs the lantern (torus geometry).
    var hookGeom = new THREE.TorusGeometry(1, 0.15, 32, 32, 3*Math.PI/2);
    var hookMesh = new THREE.Mesh(hookGeom, blackSmoothMat);
    hookMesh.rotation.y = Math.PI/2;
    lantern.add(hookMesh);

    // Store a y position, to build lantern from top to bottom.
    var yPosition = -1;

    // The tip of the lantern (composed of different sized cylinders).
    var tipDims = [
      {r: 0.35, h: 0.35},
      {r: 0.45, h: 0.35},
      {r: 0.6, h: 0.85},
      {r: 0.75, h: 1.3},
      {r: 1, h: 0.5}
    ];

    // Add each of those cylinders to form the tip of the lantern.
    for (var i = 0; i < tipDims.length; i++) {
      var dim = tipDims[i];
      var tipGeom = new THREE.CylinderGeometry(dim.r, dim.r, dim.h, 32);
      var tipMesh = new THREE.Mesh(tipGeom, blackSmoothMat);

      tipMesh.position.y = yPosition - dim.h/2;
      lantern.add(tipMesh);
      yPosition -= dim.h;
    }

    // Raise the tip of the lantern cover cone.
    yPosition += tipDims[tipDims.length-1].h/2;

    // The top cover of the lantern.
    var topHeight = 3;
    var topGeom = new THREE.ConeGeometry(6, topHeight, lanternFaces);
    var topMesh = new THREE.Mesh(topGeom, blackFlatMat);

    topMesh.position.y = yPosition - topHeight/2;
    lantern.add(topMesh);
    yPosition -= topHeight;

    // The rim of the top cover.
    var rimHeight = 1;
    var rimGeom = new THREE.CylinderGeometry(6, 5.5, rimHeight, lanternFaces);
    var rimMesh = new THREE.Mesh(rimGeom, blackFlatMat);

    rimMesh.position.y = yPosition - rimHeight/2;
    lantern.add(rimMesh);

    // Light (white inside)
    var lightHeight = 10;
    var lightGeom = new THREE.CylinderGeometry(5, 3.5, lightHeight, lanternFaces);
    var lightMesh = new THREE.Mesh(lightGeom, yellowFlatMat);

    lightMesh.position.y = yPosition - lightHeight/2;
    lantern.add(lightMesh);
    yPosition -= lightHeight;

    // Creates one of the eight bars that forms the lantern cage (around the light). */
    function createBar(topR, botR, height, width) {
      var barGeom = new THREE.Geometry();

      // Calculate protrusion dimensions (the pointy triangles).
      var protrudeR = Math.abs(topR - botR);
      var protrudeH = height/8;

      // Add the vertices.
      barGeom.vertices.push(new THREE.Vector3(-width/2, 0, botR)); // bottom left
      barGeom.vertices.push(new THREE.Vector3(+width/2, 0, botR)); // bottom right
      barGeom.vertices.push(new THREE.Vector3(+width/2, height, topR)); // top right
      barGeom.vertices.push(new THREE.Vector3(-width/2, height, topR)); // top left

      // Add the faces.
      barGeom.faces.push(new THREE.Face3(0, 1, 2));
      barGeom.faces.push(new THREE.Face3(0, 2, 3));

      // Calculate the normals for shading.
      barGeom.computeFaceNormals();

      return barGeom;
    }

    // Add eight bars to the lantern cage.
    for (var i = 0; i < 8; i++) {
      var barObj = new THREE.Object3D();

      var barGeom = createBar(5.5, 4, lightHeight, 0.6);
      var barMesh = new THREE.Mesh(barGeom, blackFlatMat);
      barObj.add(barMesh);

      barObj.rotation.y = i * Math.PI/4;
      barObj.position.y = yPosition;

      lantern.add(barObj);
    }

    // Bottom of lantern.
    var bottomDims = [
      {r1: 4, r2: 3.75, h: 1},
      {r1: 3, r2: 2.75, h: 1},
    ];

    // Add multiple cylinder geometries to form the bottom of the lantern.
    for (var i = 0; i < bottomDims.length; i++) {
      var dim = bottomDims[i];
      var botGeom = new THREE.CylinderGeometry(dim.r1, dim.r2, dim.h, lanternFaces);
      var botMesh = new THREE.Mesh(botGeom, blackFlatMat);

      botMesh.position.y = yPosition - dim.h/2;
      lantern.add(botMesh);
      yPosition -= dim.h;
    }

    return lantern;
  }

  function createHook() {
    var wallHook = new THREE.Object3D();

    var wallMountGeom = new THREE.CylinderGeometry(3,3,1,30);
    var wallMountMesh = new THREE.Mesh(wallMountGeom, blackFlatMat);
    wallMountMesh.rotation.x = Math.PI/2;
    wallMountMesh.position.z = -3;
    wallHook.add(wallMountMesh);

    // The hook loop that hangs the lantern (torus geometry).
    var wallHookGeom = new THREE.CylinderGeometry(0.5,0.5,6.5,30);
    var wallHookMesh = new THREE.Mesh(wallHookGeom, blackSmoothMat);
    wallHookMesh.rotation.x = Math.PI/2;
    wallHook.add(wallHookMesh);

    return wallHook;
  }

  // Create the lamppost, composed of multiple parts.
  var lamppost = new THREE.Object3D();

  // Add the lantern.
  var lantern = createLantern(8);
  lantern.rotation.y = Math.PI/2;
  lantern.position.z = 2.3;
  lamppost.add(lantern);

  var wallHook = createHook();
  lamppost.add(wallHook);

  return lamppost;
}
