import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
// import pako from 'pako';
import protobuf from 'protobufjs';

type Point = {
  x: number;
  y: number;
  z: number;
}

type PointCloud = {
  points: Point[];
}

type PointClouds = {
  cloud: PointCloud;
  objCloud: PointCloud;
  collisionPoints: PointCloud;
}

const PointcloudCollision = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  // const [pointCloud, setPointCloud] = useState<THREE.Points | null>(null);
  // const [objCloud, setObjCloud] = useState<THREE.Points | null>(null);
  // const [collisionPoints, setCollisionPoints] = useState<THREE.Points | null>(null);
  const controlSocketRef = useRef<WebSocket | null>(null);
  const transformControlRef = useRef<TransformControls | null>(null);
  const tempObjCloudRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    protobuf.load("/point_cloud.proto")
      .then((root) => {
        const PointClouds = root.lookupType("PointClouds");
        const socket = new WebSocket('ws://192.168.124.14:8766');
        controlSocketRef.current = new WebSocket('ws://192.168.124.14:8767'); // Control WebSocket

        socket.binaryType = 'arraybuffer';
        controlSocketRef.current.binaryType = 'arraybuffer';

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // 提高分辨率
        mountRef.current?.appendChild(renderer.domElement);

        scene.rotation.z = Math.PI; // 旋转场景，使 z 轴朝上

        const controls = new OrbitControls(camera, renderer.domElement);
        camera.position.set(0, 0, 5);
        controls.update();

        const createPointCloud = (color: number) => {
          const points = new THREE.Points(
            new THREE.BufferGeometry(),
            new THREE.PointsMaterial({ color: color, size: 0.0001 })
          );
          points.frustumCulled = false; // 这个很重要，可以让相机看到超出视锥体的点云
          return points
        };

        const newPointCloud = createPointCloud(0xF0F0F0); // Gray color
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
        const transformControl = new TransformControls(camera, renderer.domElement);
        scene.add(transformControl);
        // 翻转过来
        transformControl.rotation.z = Math.PI;
        transformControl.attach(tempObjCloud); // 始终附加到临时 objCloud
        transformControlRef.current = transformControl;

        socket.onopen = () => {
          console.log('Connected to WebSocket server');
        };

        controlSocketRef.current.onopen = () => {
          console.log('Connected to Control WebSocket server');
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
          const protoPointClouds = PointClouds.decode(new Uint8Array(event.data)) as unknown as PointClouds;

          const updatePointCloud = (pointsList: Point[], pointCloud: THREE.Points | null) => {
            const positions = new Float32Array(pointsList.length * 3);
            pointsList.forEach((point: Point, index: number) => {
              positions[index * 3] = point.x;
              positions[index * 3 + 1] = point.y;
              positions[index * 3 + 2] = point.z;
            });
            if (pointCloud) {
              pointCloud.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
              pointCloud.geometry.attributes.position.needsUpdate = true;
            }
          };

          // if (protoPointClouds.cloud.points.length > 260000) {
            updatePointCloud(protoPointClouds.cloud.points, newPointCloud);
          // }

          updatePointCloud(protoPointClouds.objCloud.points, newObjCloud);
          updatePointCloud(protoPointClouds.collisionPoints.points, newCollisionPoints);
        };

        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();

        // 监听 TransformControls 的拖动事件，禁用/启用 OrbitControls
        transformControl.addEventListener('dragging-changed', (event) => {
          controls.enabled = !event.value;
          if (!event.value && controlSocketRef.current?.readyState === WebSocket.OPEN) {
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
  }, []);

  return (
    <div className="relative">
      <div ref={mountRef} />
    </div>
  );
};

export default PointcloudCollision;
