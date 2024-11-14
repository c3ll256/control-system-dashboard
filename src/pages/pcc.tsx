import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const PointcloudCollisionTest = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [modelInfo, setModelInfo] = useState<string>("");

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2c3e50);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(2, 2, 2);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Reference cube (smaller size for scale reference)
    const cubeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    // Grid helper (smaller size)
    const gridHelper = new THREE.GridHelper(2, 20);
    scene.add(gridHelper);

    // Axes helper
    const axesHelper = new THREE.AxesHelper(1);
    scene.add(axesHelper);

    // Load OBJ with modified handling
    console.log("Starting model load...");
    const loader = new OBJLoader();
    
    loader.load(
      // "/Lixiang_L9_V2.obj", // 确保使用绝对路径
      "model_3_V2.obj",
      // "model_Y_V2.obj",
      // "Lotus_V2.obj",
      function (object) {
        // Log model details
        let vertexCount = 0;
        let meshCount = 0;
        
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            meshCount++;
            vertexCount += child.geometry.attributes.position.count;
            
            // 为每个mesh添加明显的材质
            child.material = new THREE.MeshPhongMaterial({
              color: 0xff0000,  // 使用红色
              side: THREE.DoubleSide, 
              wireframe: true,  // 使用线框模式
              transparent: true,
              opacity: 0.8
            });

            // 输出每个mesh的边界框
            const bbox = new THREE.Box3().setFromObject(child);
            const size = bbox.getSize(new THREE.Vector3());
            console.log(`Mesh ${meshCount} size:`, size);
          }
        });

        // 获取整个模型的边界框
        const bbox = new THREE.Box3().setFromObject(object);
        const size = bbox.getSize(new THREE.Vector3());
        const center = bbox.getCenter(new THREE.Vector3());

        console.log('Model Stats:', {
          size,
          center,
          meshCount,
          vertexCount
        });

        // 重置模型位置到原点
        object.position.set(0, 0, 0);
        
        // 尝试不同的缩放方式
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 0.5 / maxDim; // 缩放到0.5个单位
        object.scale.setScalar(scale);

        scene.add(object);

        // 更新相机位置以适应模型
        camera.position.set(1, 1, 1);
        controls.target.set(0, 0, 0);
        camera.lookAt(0, 0, 0);
        controls.update();

        // 更新界面信息
        setModelInfo(`Model loaded: ${meshCount} meshes, ${vertexCount} vertices, Scale: ${scale}`);

        // 添加包围盒辅助显示
        const boxHelper = new THREE.BoxHelper(object, 0xffff00);
        scene.add(boxHelper);
      },
      (xhr) => {
        setModelInfo(`Loading: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
      },
      (error) => {
        console.error('Error loading model:', error);
        // setModelInfo(`Error: ${error.message}`);
      }
    );

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mountRef} className="w-full h-full" />
      {/* Debug info overlay */}
      <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-4">
        {modelInfo}
      </div>
    </div>
  );
};

export default PointcloudCollisionTest;