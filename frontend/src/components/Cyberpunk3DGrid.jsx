import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Plane, Stars } from '@react-three/drei';
import * as THREE from 'three';

const MovingGrid = () => {
    const gridRef = useRef();

    useFrame((state) => {
        if (gridRef.current) {
            // Move grid constantly towards camera to create flow effect
            gridRef.current.position.z = (state.clock.getElapsedTime() * 0.5) % 2;
        }
    });

    return (
        <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <Plane
                ref={gridRef}
                args={[100, 100, 50, 50]}
                position={[0, 0, 0]}
            >
                <meshBasicMaterial
                    color="#00f2ff"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </Plane>
            <Plane
                args={[100, 100, 50, 50]}
                position={[0, 0, -50]} // Second plane for infinity illusion
            >
                <meshBasicMaterial
                    color="#00f2ff"
                    wireframe
                    transparent
                    opacity={0.1}
                />
            </Plane>
        </group>
    );
};

const Cyberpunk3DGrid = () => {
    return (
        <div className="fixed inset-0 w-screen h-screen -z-10 bg-black overflow-hidden pointer-events-none">
            <Canvas camera={{ position: [0, 2, 8], fov: 75 }}>
                <color attach="background" args={['#050505']} />
                <fog attach="fog" args={['#050505', 5, 20]} />
                <ambientLight intensity={1.5} />

                <MovingGrid />

                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />
            </Canvas>
        </div>
    );
};

export default Cyberpunk3DGrid;
