import React, { useEffect, useRef } from "react";
import { Engine, Render, World, Bodies, Runner, Events } from "matter-js";

const Exercise1 = ({ speed }) => {
  const scene = useRef(null);

  useEffect(() => {
    // ---- PRE CODE ----
    const cw = scene.current.clientWidth;
    const ch = scene.current.clientHeight;

    const engine = Engine.create();
    const render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "linear-gradient(to bottom, #f0f0f0, #dcdcdc)",
        showCollisions: true,
        showVelocity: true,
        showDebug: true,
        showBounds: true,
        showPositions: true,
      },
    });
    const runner = Runner.create();

    Render.run(render);
    Runner.run(runner, engine);
    // ---- PRE CODE ----

    const ground = Bodies.rectangle(cw / 2, ch * 0.9, cw, 30, {
      isStatic: true,
    });

    const car = Bodies.rectangle(cw / 6, ch * 0.9 - 40, 120, 80);

    World.add(engine.world, [ground, car]);

    // Cleanup
    return () => {
      World.clear(engine.world);
      Engine.clear(engine);
      Runner.stop(runner);
      Render.stop(render);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return <div style={{ height: "100%", width: "100%" }} ref={scene}></div>;
};

export default Exercise1;
