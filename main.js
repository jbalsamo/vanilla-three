import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";

// Create a scene
const scene = new THREE.Scene();

// Create a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(-1, 2, 2);
scene.add(directionalLight);

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a flat stage
// const geometry = new THREE.PlaneGeometry(10, 10);
// const material = new THREE.MeshBasicMaterial({ color: 0x808080 });
// const stage = new THREE.Mesh(geometry, material);
// scene.add(stage);

// Create a small red sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Position the sphere to the left of the cube and 2 away.
sphere.position.x = -2;

// Create a green cube
const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Make the sphere draggable
const dragControls = new DragControls([sphere], camera, renderer.domElement);

// Rotate the cube
function rotateCube() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}

// Change the color of the cube to a random color on collision
function changeCubeColor(color) {
  cube.material.color.set(color);
}

// Check for collision between the sphere and the cube
function checkCollision() {
  const sphereBoundingBox = new THREE.Box3().setFromObject(sphere);
  const cubeBoundingBox = new THREE.Box3().setFromObject(cube);

  if (sphereBoundingBox.intersectsBox(cubeBoundingBox)) {
    changeCubeColor(0x0000ff);
  } else {
    changeCubeColor(0x00ff00);
  }
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  rotateCube();
  checkCollision();
  renderer.render(scene, camera);
}

animate();
