import React, { useEffect, useRef } from "react";
import { Engine, Render, World, Bodies, Runner, Events } from "matter-js";

const RenderBox = ({ speed }) => {
  const scene = useRef(null);

  // FIXME: Speed
  useEffect(() => {
    const cw = scene.current.clientWidth;
    const ch = scene.current.clientHeight;

    // create engine
    const engine = Engine.create({
      timing: {
        timeScale: speed, // TIME
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

    // Create walls of the square
    const wallOptions = {
      isStatic: true,
      render: {
        strokeStyle: "#000",
        fillStyle: "transparent",
        lineWidth: 1,
      },
    };

    const halfWallThickness = 0.5; // Half of the wall thickness

    const squareWalls = [
      // Top wall
      Bodies.rectangle(
        cw / 2,
        halfWallThickness,
        cw,
        2 * halfWallThickness,
        wallOptions
      ),
      // Left wall
      Bodies.rectangle(
        halfWallThickness,
        ch / 2,
        2 * halfWallThickness,
        ch,
        wallOptions
      ),
      // Bottom wall
      Bodies.rectangle(
        cw / 2,
        ch - halfWallThickness,
        cw,
        2 * halfWallThickness,
        wallOptions
      ),
      // Right wall
      Bodies.rectangle(
        cw - halfWallThickness,
        ch / 2,
        2 * halfWallThickness,
        ch,
        wallOptions
      ),
    ];

    // Create the floor
    const floor = Bodies.rectangle(
      cw / 2,
      ch - halfWallThickness,
      cw,
      2 * halfWallThickness,
      {
        isStatic: true,
        render: {
          strokeStyle: "#000",
          fillStyle: "transparent",
          lineWidth: 1,
        },
      }
    );

    // Add square, walls, and floor to the world
    World.add(world, [...squareWalls, floor]);

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
