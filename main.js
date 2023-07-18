import * as THREE from "three";

let scene, camera, renderer;
let cube, sphere;

function init() {
  // Create a scene
  scene = new THREE.Scene();

  // Create a camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create a renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create a cube
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cube);

  // Create a sphere
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  // Move the sphere
  sphere.position.x = Math.sin(Date.now() * 0.001) * 2;

  // Check for collision
  const spherePosition = new THREE.Vector3();
  sphere.getWorldPosition(spherePosition);

  const cubePosition = new THREE.Vector3();
  cube.getWorldPosition(cubePosition);

  const distance = spherePosition.distanceTo(cubePosition);

  if (distance < 1) {
    cube.material.color.set(0xff0000); // Set cube color to red if collision occurs
  } else {
    cube.material.color.set(0x00ff00); // Set cube color to green if no collision
  }

  // Render the scene
  renderer.render(scene, camera);
}

init();
animate();
