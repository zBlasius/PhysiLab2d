import React, { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  World,
  Bodies,
  Runner,
  Mouse,
  MouseConstraint,
  Constraint,
  Composite,
} from "matter-js";

const Simulation2 = ({ speed, reset }) => {
  const scene = useRef(null);
  const engineRef = useRef(Engine.create());
  const collideRef = useRef(null);

  useEffect(() => {
    const cw = scene.current.clientWidth;
    const ch = scene.current.clientHeight;
    const engine = engineRef.current;
    collideRef.current = null;

    const render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "linear-gradient(to bottom, #f0f0f0, #dcdcdc)",
        // showCollisions: true,
        // showVelocity: true,
        // showDebug: true,
        // showBounds: true,
        // showPositions: true,
      },
    });
    const runner = Runner.create();

    Render.run(render);
    Runner.run(runner, engine);

    const ground = Bodies.rectangle(cw / 2, ch, cw, 20, {
      isStatic: true,
      friction: 0.8,
    });
    Composite.add(engine.world, ground);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    const ballA = Bodies.circle(250, 400, 30, {
      density: 0.04,
      frictionAir: 0.005,
    });
    const ballConstraintA = Constraint.create({
      pointA: { x: 250, y: 70 },
      bodyB: ballA,
    });
    Composite.add(engine.world, [ballA, ballConstraintA]);

    const ballB = Bodies.circle(250, 300, 30, {
      density: 0.04,
      frictionAir: 0.005,
    });
    const ballConstraintB = Constraint.create({
      pointA: { x: 250, y: 70 },
      bodyB: ballB,
    });
    Composite.add(engine.world, [ballB, ballConstraintB]);

    const ballC = Bodies.circle(900, 400, 45, {
      density: 0.08,
      frictionAir: 0.005,
    });
    const ballConstraintC = Constraint.create({
      pointA: { x: 900, y: 70 },
      bodyB: ballC,
    });
    Composite.add(engine.world, [ballC, ballConstraintC]);

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
  }, [reset]);

  useEffect(() => {
    if (engineRef?.current) {
      engineRef.current.timing.timeScale = speed;
    }
  }, [speed]);

  return (
    <div
      style={{
        height: "100%",
        margin: "auto",
        width: "100%",
        position: "relative",
        zIndex: 90,
      }}
      ref={scene}
    />
  );
};

export default Simulation2;
