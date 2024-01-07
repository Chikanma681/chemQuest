
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const DonutAnimation = () => {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x242424);
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshNormalMaterial({ color: "646cf", wireframe: true });
    const donut = new THREE.Mesh(geometry, material);
    scene.add(donut);

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      donut.rotation.x += 0.01;
      donut.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    let myTween;
    const handleMouseMove = (event) => {
      if (myTween) {
        myTween.kill();
      }
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      myTween = gsap.to(donut.rotation, { duration: 0.1, x: mouseY * -1, y: mouseX });
    }
    window.addEventListener('mousemove', handleMouseMove);

    const animProps = { scale: 1 };
    gsap.to(animProps, {
      duration: 10,
      scale: 1.3,
      repeat: -1,
      yoyo: true,
      ease: "sine",
      onUpdate: () => {
        donut.scale.set(animProps.scale, animProps.scale, animProps.scale);
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} />;
};

export default DonutAnimation;
