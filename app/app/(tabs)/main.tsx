import React, { useRef, useEffect } from "react";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";
import { View, PanResponder } from "react-native";

export default function App() {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  let last_mx = 0;
  let last_my = 0;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // Primer contacto: posición inicial
        const startX = evt.nativeEvent.locationX;
        const startY = evt.nativeEvent.locationY;
        last_mx = startX;
        last_my = startY;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (cameraRef.current) {
          const mx = gestureState.moveX;
          const my = gestureState.moveY;
          let dir_x = mx - last_mx;
          let dir_y = my - last_my;

          cameraRef.current.position.x -= dir_x * (cameraRef.current.position.y*0.0022);
          cameraRef.current.position.z -= dir_y * (cameraRef.current.position.y*0.0022);
          
          //cameraRef.current.position.y += gestureState.dy * 0.0005;
          last_mx = mx;
          last_my = my;
        }
      },
    })
  ).current;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "a" || event.key === "A") {
        // Acción para 'A'
        cameraRef.current.rotation.y += 0.01;
      }
      if (event.key === "d" || event.key === "D") {
        // Acción para 'D'
        cameraRef.current.rotation.y -= 0.01;
      }
      if (event.key === "S" || event.key === "s") {
        // Acción para 'A'
        cameraRef.current.position.y -= 0.3;
      }
      if (event.key === "w" || event.key === "W") {
        // Acción para 'D'
        cameraRef.current.position.y += 0.3;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 3;
    camera.position.y = 8;

    camera.rotation.x = -1.05;
    camera.rotation.y = 0.14;
    camera.rotation.z = 0.12;
    cameraRef.current = camera;

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);
      
      //cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
    </View>
  );
}
