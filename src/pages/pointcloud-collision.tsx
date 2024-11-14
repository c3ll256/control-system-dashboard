import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
// import pako from 'pako';
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
  const mountRef = useRef<HTMLDivElement | null>(null);
  // const [pointCloud, setPointCloud] = useState<THREE.Points | null>(null);
  // const [objCloud, setObjCloud] = useState<THREE.Points | null>(null);
  // const [collisionPoints, setCollisionPoints] = useState<THREE.Points | null>(null);
  const controlSocketRef = useRef<WebSocket | null>(null);
  const transformControlRef = useRef<TransformControls | null>(null);
  const tempObjCloudRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2c3e50);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Renderer setup
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

    // Grid helper (smaller size)
    const gridHelper = new THREE.GridHelper(2, 20);
    scene.add(gridHelper);

    // Axes helper
    const axesHelper = new THREE.AxesHelper(1);
    scene.add(axesHelper);

    console.log("Starting model load...");
    const loader = new OBJLoader();
    
    loader.load(
      // "/Lixiang_L9_V2.obj", // 确保使用绝对路径
      // "model_3_V2.obj",
      // "model_Y_V2.obj",
      "Lotus_V2.obj",
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
              color: 0x808080,  // 灰色
              side: THREE.DoubleSide
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

    protobuf
      .load("/point_cloud.proto")
      .then((root) => {
        const PointClouds = root.lookupType("PointClouds");
        const socket = new WebSocket("ws://127.0.0.1:8766");
        controlSocketRef.current = new WebSocket("ws://127.0.0.1:8767"); // Control WebSocket
        socket.binaryType = "arraybuffer";
        controlSocketRef.current.binaryType = "arraybuffer";

        scene.rotation.z = Math.PI; // 旋转场景，使 z 轴朝上

        const createPointCloud = (color: number) => {
          const points = new THREE.Points(
            new THREE.BufferGeometry(),
            new THREE.PointsMaterial({ color: color, size: 0.0001 })
          );
          points.frustumCulled = false; // 这个很重要，可以让相机看到超出视锥体的点云
          return points;
        };

        const newPointCloud = createPointCloud(0xf0f0f0); // Gray color
        scene.add(newPointCloud);
        // setPointCloud(newPointCloud);

        const newObjCloud = createPointCloud(0x00ff00); // Green color
        scene.add(newObjCloud);
        // setObjCloud(newObjCloud);

        const newCollisionPoints = createPointCloud(0xff0000); // Red color
        scene.add(newCollisionPoints);
        // setCollisionPoints(newCollisionPoints);

        // 初始化 objCloud 位置
        newObjCloud.position.set(0, 0, 0); // 根据需要设置初始位置

        // 创建临时 objCloud
        const tempObjCloud = createPointCloud(0x00ff00);
        tempObjCloud.position.copy(newObjCloud.position);
        tempObjCloud.rotation.copy(newObjCloud.rotation);
        scene.add(tempObjCloud);
        tempObjCloudRef.current = tempObjCloud;

        // 添加 TransformControls
        const transformControl = new TransformControls(
          camera,
          renderer.domElement
        );
        scene.add(transformControl);
        // 翻转过来
        transformControl.rotation.z = Math.PI;
        transformControl.attach(tempObjCloud); // 始终附加到临时 objCloud
        transformControlRef.current = transformControl;

        socket.onopen = () => {
          console.log("Connected to WebSocket server");
        };

        controlSocketRef.current.onopen = () => {
          console.log("Connected to Control WebSocket server");
        };

        let lastRenderTime = 0;
        const renderInterval = 16; // 1000 milliseconds = 1 second

        socket.onmessage = (event) => {
          const currentTime = Date.now();
          if (currentTime - lastRenderTime < renderInterval) {
            return; // Skip this update if the interval has not been met
          }
          lastRenderTime = currentTime;

          // 使用 pako 解压数据
          // const compressedData = new Uint8Array(event.data);
          // const decompressedData = pako.inflate(compressedData);
          // const protoPointClouds = PointClouds.decode(decompressedData);

          // 不使用 pako 解压数据
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

          // if (protoPointClouds.cloud.points.length > 260000) {
          updatePointCloud(protoPointClouds.cloud.points, newPointCloud);
          // }

          updatePointCloud(protoPointClouds.objCloud.points, newObjCloud);
          updatePointCloud(
            protoPointClouds.collisionPoints.points,
            newCollisionPoints
          );
        };

        // 监听 TransformControls 的拖动事件，禁用/启用 OrbitControls
        transformControl.addEventListener("dragging-changed", (event) => {
          controls.enabled = !event.value;
          if (
            !event.value &&
            controlSocketRef.current?.readyState === WebSocket.OPEN
          ) {
            const position = tempObjCloud.position;
            const rotation = tempObjCloud.rotation;

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
    </div>
  );
};

export default PointcloudCollision;
