import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import pako from 'pako';
import protobuf from 'protobufjs';

const App: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [pointCloud, setPointCloud] = useState<THREE.Points | null>(null);
  const [objCloud, setObjCloud] = useState<THREE.Points | null>(null);
  const [collisionPoints, setCollisionPoints] = useState<THREE.Points | null>(null);
  const controlSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    protobuf.load("/point_cloud.proto")
      .then((root) => {
        const PointClouds = root.lookupType("PointClouds");
        const socket = new WebSocket('ws://localhost:8766');
        controlSocketRef.current = new WebSocket('ws://localhost:8767'); // Control WebSocket

        socket.binaryType = 'arraybuffer';
        controlSocketRef.current.binaryType = 'arraybuffer';

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current?.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        camera.position.set(0, 0, 5);
        controls.update();

        const createPointCloud = (color: number) => {
          return new THREE.Points(
            new THREE.BufferGeometry(),
            new THREE.PointsMaterial({ color: color, size: 0.0005 })
          );
        };

        const newPointCloud = createPointCloud(0xF0F0F0); // Gray color
        scene.add(newPointCloud);
        setPointCloud(newPointCloud);

        const newObjCloud = createPointCloud(0x00ff00); // Green color
        scene.add(newObjCloud);
        setObjCloud(newObjCloud);

        const newCollisionPoints = createPointCloud(0xff0000); // Red color
        scene.add(newCollisionPoints);
        setCollisionPoints(newCollisionPoints);

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
          const protoPointClouds = PointClouds.decode(new Uint8Array(event.data));

          const updatePointCloud = (pointsList: any, pointCloud: THREE.Points | null) => {
            const positions = new Float32Array(pointsList.length * 3);
            pointsList.forEach((point: any, index: number) => {
              positions[index * 3] = point.x;
              positions[index * 3 + 1] = point.y;
              positions[index * 3 + 2] = point.z;
            });
            if (pointCloud) {
              pointCloud.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
              pointCloud.geometry.attributes.position.needsUpdate = true;
            }
          };

          updatePointCloud(protoPointClouds.cloud.points, newPointCloud);
          updatePointCloud(protoPointClouds.objCloud.points, newObjCloud);
          updatePointCloud(protoPointClouds.collisionPoints.points, newCollisionPoints);
        };

        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();

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

  const sendControlCommand = (targetX: number, targetY: number, targetZ: number, targetRotateX: number, targetRotateY: number, targetRotateZ: number) => {
    if (controlSocketRef.current?.readyState === WebSocket.OPEN) {
      const controlMessage = JSON.stringify({
        target_x: targetX,
        target_y: targetY,
        target_z: targetZ,
        target_rotate_x: targetRotateX,
        target_rotate_y: targetRotateY,
        target_rotate_z: targetRotateZ,
      });
      controlSocketRef.current.send(controlMessage);
    }
  };

  const handleControlSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const targetX = parseFloat(form.targetX.value);
    const targetY = parseFloat(form.targetY.value);
    const targetZ = parseFloat(form.targetZ.value);
    const targetRotateX = parseFloat(form.targetRotateX.value);
    const targetRotateY = parseFloat(form.targetRotateY.value);
    const targetRotateZ = parseFloat(form.targetRotateZ.value);

    sendControlCommand(targetX, targetY, targetZ, targetRotateX, targetRotateY, targetRotateZ);
  };

  return (
    <div className="relative">
      <div ref={mountRef} />
      <div className="absolute top-0 left-0 bg-white">
        <form onSubmit={handleControlSubmit}>
          <div>
            <label>Target X:</label>
            <input type="number" name="targetX" step="0.1" defaultValue="0" />
          </div>
          <div>
            <label>Target Y:</label>
            <input type="number" name="targetY" step="0.1" defaultValue="0" />
          </div>
          <div>
            <label>Target Z:</label>
            <input type="number" name="targetZ" step="0.1" defaultValue="0" />
          </div>
          <div>
            <label>Target Rotate X:</label>
            <input type="number" name="targetRotateX" step="0.1" defaultValue="0" />
          </div>
          <div>
            <label>Target Rotate Y:</label>
            <input type="number" name="targetRotateY" step="0.1" defaultValue="0" />
          </div>
          <div>
            <label>Target Rotate Z:</label>
            <input type="number" name="targetRotateZ" step="0.1" defaultValue="0" />
          </div>
          <button type="submit">Send Control Command</button>
        </form>
      </div>
    </div>
  );
};

export default App;
