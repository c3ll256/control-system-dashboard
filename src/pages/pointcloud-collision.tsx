import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import protobuf from "protobufjs";

type Point = {
  x: number;
  y: number;
  z: number;
};

type PointCloud = {
  points: Point[];
};

type PointClouds = {
  cloud: PointCloud;
  objCloud: PointCloud;
  collisionPoints: PointCloud;
};

const PointcloudCollision = () => {
  const [modelInfo, setModelInfo] = useState<string>("");
  const [showTransformControls, setShowTransformControls] = useState(true);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const controlSocketRef = useRef<WebSocket | null>(null);
  const transformControlRef = useRef<TransformControls | null>(null);
  // const tempObjCloudRef = useRef<THREE.Points | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  // 添加一个函数来切换 TransformControls 的可见性
  const toggleTransformControls = () => {
    if (transformControlRef.current && groupRef.current) {
      setShowTransformControls(!showTransformControls);
      if (showTransformControls) {
        transformControlRef.current.detach();
      } else {
        transformControlRef.current.attach(groupRef.current);
      }
    }
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02020B);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current?.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 5);
    controls.update();

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Grid and axes helpers
    const gridHelper = new THREE.GridHelper(2, 20);
    scene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper(1);
    // scene.add(axesHelper);

    // Create a group to hold both the OBJ model and point cloud
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    console.log("Starting model load...");
    const loader = new OBJLoader();
    
    loader.load(
      "Lotus_V2.obj",
      function (object) {
        let vertexCount = 0;
        let meshCount = 0;
        
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            meshCount++;
            vertexCount += child.geometry.attributes.position.count;
            
            child.material = new THREE.MeshPhongMaterial({
              color: 0x674DAD,
              side: THREE.DoubleSide
            });
          }
        });

        const bbox = new THREE.Box3().setFromObject(object);
        const size = bbox.getSize(new THREE.Vector3());
        const center = bbox.getCenter(new THREE.Vector3());

        console.log('Model Stats:', {
          size,
          center,
          meshCount,
          vertexCount
        });

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 0.5 / maxDim;
        object.scale.setScalar(scale);
        object.rotation.y = -(Math.PI / 2);
        // const matrix = new THREE.Matrix4();
        // matrix.makeScale(-1, 1, 1);
        // object.applyMatrix4(matrix);

        group.add(object);

        camera.position.set(1, 1, 1);
        controls.target.set(0, 0, 0);
        camera.lookAt(0, 0, 0);
        controls.update();

        setModelInfo(`Model loaded: ${meshCount} meshes, ${vertexCount} vertices, Scale: ${scale}`);

        // const boxHelper = new THREE.BoxHelper(object, 0xffff00);
        // group.add(boxHelper);
      },
      (xhr) => {
        setModelInfo(`Loading: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    protobuf
      .load("/point_cloud.proto")
      .then((root) => {
        const PointClouds = root.lookupType("PointClouds");
        const socket = new WebSocket("ws://192.168.124.11:8766");
        controlSocketRef.current = new WebSocket("ws://192.168.124.11:8767");
        socket.binaryType = "arraybuffer";
        controlSocketRef.current.binaryType = "arraybuffer";

        const createPointCloud = (color: number) => {
          const points = new THREE.Points(
            new THREE.BufferGeometry(),
            new THREE.PointsMaterial({ color: color, size: 0.0006 })
          );
          points.frustumCulled = false;
          return points;
        };

        // const newPointCloud = createPointCloud(0xf0f0f0);
        const newPointCloud = createPointCloud(0xBEE6FF);
        // y 旋转 30 度
        newPointCloud.position.y = 0.27;
        newPointCloud.position.z = 0.165;
        newPointCloud.position.x = 0.08;
        newPointCloud.rotation.x = -(Math.PI / 7);
        newPointCloud.rotation.y = (Math.PI);
        newPointCloud.scale.setScalar(0.2);

        scene.add(newPointCloud);

        const newObjCloud = createPointCloud(0x00ff00);
        // group.add(newObjCloud);

        const newCollisionPoints = createPointCloud(0xff0000);
        scene.add(newCollisionPoints);

        const transformControl = new TransformControls(camera, renderer.domElement);
        scene.add(transformControl);
        transformControl.rotation.z = Math.PI;
        transformControl.attach(group);
        transformControlRef.current = transformControl;

        socket.onopen = () => {
          console.log("Connected to WebSocket server");
        };

        controlSocketRef.current.onopen = () => {
          console.log("Connected to Control WebSocket server");
        };

        let lastRenderTime = 0;
        const renderInterval = 16;

        socket.onmessage = (event) => {
          const currentTime = Date.now();
          if (currentTime - lastRenderTime < renderInterval) {
            return;
          }
          lastRenderTime = currentTime;

          const protoPointClouds = PointClouds.decode(
            new Uint8Array(event.data)
          ) as unknown as PointClouds;

          const updatePointCloud = (
            pointsList: Point[],
            pointCloud: THREE.Points | null
          ) => {
            const positions = new Float32Array(pointsList.length * 3);
            pointsList.forEach((point: Point, index: number) => {
              positions[index * 3] = point.x;
              positions[index * 3 + 1] = point.y;
              positions[index * 3 + 2] = point.z;
            });
            if (pointCloud) {
              pointCloud.geometry.setAttribute(
                "position",
                new THREE.BufferAttribute(positions, 3)
              );
              pointCloud.geometry.attributes.position.needsUpdate = true;
            }
          };

          updatePointCloud(protoPointClouds.cloud.points, newPointCloud);
          updatePointCloud(protoPointClouds.objCloud.points, newObjCloud);
          updatePointCloud(protoPointClouds.collisionPoints.points, newCollisionPoints);
        };

        transformControl.addEventListener("dragging-changed", (event) => {
          controls.enabled = !event.value;
          if (!event.value && controlSocketRef.current?.readyState === WebSocket.OPEN) {
            const position = group.position;
            const rotation = group.rotation;

            const controlMessage = JSON.stringify({
              target_x: position.x,
              target_y: position.y,
              target_z: position.z,
              target_rotate_x: rotation.x,
              target_rotate_y: rotation.y,
              target_rotate_z: rotation.z,
            });

            controlSocketRef.current.send(controlMessage);
          }
        });

        return () => {
          mountRef.current?.removeChild(renderer.domElement);
          socket.close();
          controlSocketRef.current?.close();
        };
      })
      .catch((error) => {
        console.error("Failed to load protobuf file:", error);
      });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mountRef} className="w-full h-full" />
      {/* Debug info overlay */}
      <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-4">
        {modelInfo}
      </div>
      {/* Transform Controls Toggle Button */}
      <button
        onClick={toggleTransformControls}
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {showTransformControls ? 'Hide' : 'Show'} Transform Controls
      </button>
    </div>
  );
};

export default PointcloudCollision;