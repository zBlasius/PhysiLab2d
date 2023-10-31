import React, { useEffect, useRef } from 'react';
import { Engine, Render, World, Bodies, Runner } from 'matter-js';

const RenderBox = ({ speed }) => {
  const scene = useRef(null);

  useEffect(() => {
    const cw = scene.current.clientWidth;
    const ch = scene.current.clientHeight;

    const engine = Engine.create({
      timing: {
        timeScale: speed,
      },
    });
    const world = engine.world;

    const render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
        showCollisions: true,
        showVelocity: true,
        showDebug: true,
        showBounds: true,
        showPositions: true,
      },
    });

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    // Walls
    const wallOptions = {
      isStatic: true,
      render: {
        strokeStyle: "#000",
        fillStyle: "transparent",
        lineWidth: 1,
      },
    };

    const halfWallThickness = 0.5;

    const squareWalls = [
      Bodies.rectangle(cw / 2, halfWallThickness, cw, 2 * halfWallThickness, wallOptions),
      Bodies.rectangle(halfWallThickness, ch / 2, 2 * halfWallThickness, ch, wallOptions),
      Bodies.rectangle(cw / 2, ch - halfWallThickness, cw, 2 * halfWallThickness, wallOptions),
      Bodies.rectangle(cw - halfWallThickness, ch / 2, 2 * halfWallThickness, ch, wallOptions),
    ];

    // "Chão"
    const ground = Bodies.rectangle(cw / 2, ch * (5 / 6), cw, 3, {
      isStatic: true,
      render: {
        strokeStyle: "#000",
        fillStyle: "#000",
        lineWidth: 3,
      },
    });

    // Add walls and ground to the world
    World.add(world, [...squareWalls, ground]);

    return () => {
      Render.stop(render);
      World.clear(world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return <div style={{ height: "100%", width: "100%" }} ref={scene}></div>;
};

export default RenderBox;