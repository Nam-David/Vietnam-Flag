import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true,
  antialias: true
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.z = 18;

const loader = new THREE.TextureLoader();
const geometry = new THREE.PlaneGeometry(20,14,9,11);
const material = new THREE.MeshBasicMaterial({
  map: loader.load('Flag_of_Vietnam.png'),
});

//create mesh 
const flagMesh = new THREE.Mesh(geometry, material);

//add object to the scene
scene.add(flagMesh); 

flagMesh.rotation.set(-0.5,0,0);

const clock = new THREE.Clock()


function animateFlag() {
  const time = clock.getElapsedTime();
  
  // Loop through each vertex in the flag's geometry and modify its position
  const positionAttribute = geometry.attributes.position;
  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    
    // Create a wave effect by modifying the Z position based on a sine wave
    const wave = Math.sin(x * 3 + time * 5) * 0.5;
    
    // Set the new Z position for each vertex
    positionAttribute.setZ(i, wave);
  }
  
  // Notify Three.js that the vertices have been updated
  positionAttribute.needsUpdate = true;
}


// Animation loop
function animate() {

  requestAnimationFrame(animate);
  animateFlag(); // Apply the waving effect

  renderer.render(scene, camera);
}
animate();





// import * as THREE from 'three';

// // Create a scene, camera, and renderer
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;

// const renderer = new THREE.WebGLRenderer();

// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Create   a flag plane geometry and texture
// const flagGeometry = new THREE.PlaneGeometry(2, 1, 10, 10); // Adjust dimensions as needed
// const flagTexture = new THREE.TextureLoader().load('Flag_of_Vietnam.png'); // Replace with your flag image path

// // Create a material with the flag texture and a displacement map
// const flagMaterial = new THREE.MeshStandardMaterial({
//     map: flagTexture,
//     displacementMap: flagTexture,
//     displacementScale: 0.2,
//     displacementBias: 0.1,
// });

// // Create a mesh using the flag geometry and material
// const flagMesh = new THREE.Mesh(flagGeometry, flagMaterial);
// scene.add(flagMesh);

// // Create a wind simulation effect
// const windForce = new THREE.Vector3(0.05, 0, 0); // Adjust wind strength and direction as needed
// const windSpeed = 0.09;

// // Animation loop
// function animate() {
//     requestAnimationFrame(animate);

//     // Apply wind force to the flag mesh vertices
//     for (let i = 0; i < flagMesh.geometry.attributes.position.count; i++) {
//         const vertex = flagMesh.geometry.attributes.position.array[i * 3];
//         const displacement = windForce.clone().multiplyScalar(Math.sin(vertex * windSpeed + Date.now() * 0.001));
//         flagMesh.geometry.attributes.position.array[i * 3] = vertex + displacement.x;
//         flagMesh.geometry.attributes.position.array[i * 3 + 1] = displacement.y;
//     }

//     flagMesh.geometry.attributes.position.needsUpdate = true;

//     renderer.render(scene, camera);
// }

// animate();







// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
