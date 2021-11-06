import logo from "./logo.svg";
import "./App.css";
import * as THREE from "three";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGL1Renderer({
      canvas: document.querySelector("#bg"),
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //camera.position.setZ(30);
    camera.position.set(10, 2, 0);
    renderer.render(scene, camera);

    const geometry = new THREE.BoxGeometry(3, 1, 3);
    const material = new THREE.MeshStandardMaterial({
      color: 0xff6347,
    });

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(-3, 10, -10);
    scene.add(dirLight);

    //scene.add(new THREE.Mesh(geometry, material));

    const controls = new OrbitControls(camera, renderer.domElement);

    const loader = new GLTFLoader();

    let planeObj;

    loader.load("/small-airplane-v3.glb", function (gltf) {
      gltf.scene.rotateX(0.3);
      scene.add(gltf.scene);
      planeObj = gltf.scene;
    });

    function animate() {
      requestAnimationFrame(animate);

      if (planeObj) {
        planeObj.rotation.x += 0.001;
        planeObj.rotation.y += 0.005;
        //planeObj.rotation.z += 0.01;
      }

      controls.update();

      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <canvas id="bg"></canvas>;
}

export default App;
