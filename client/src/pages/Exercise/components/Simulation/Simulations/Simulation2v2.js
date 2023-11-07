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

    const angleInRadiansA = (150 * Math.PI) / 180; // Converter 45 graus para radianos
    const ropeLengthA = 280; // Distância vertical entre o ponto de ancoragem e o centro de massa

    const ballXA = 300 + ropeLengthA * Math.cos(angleInRadiansA);
    const ballYA = 70 + ropeLengthA * Math.sin(angleInRadiansA);

    const ballA = Bodies.circle(ballXA, ballYA, 30, {
      density: 0.04,
      frictionAir: 0.005,
    });
    const ballConstraintA = Constraint.create({
      pointA: { x: 300, y: 70 },
      bodyB: ballA,
    });
    Composite.add(engine.world, [ballA, ballConstraintA]);

    const angleInRadiansB = (150 * Math.PI) / 180; // Converter 45 graus para radianos
    const ropeLengthB = 140; // Distância vertical entre o ponto de ancoragem e o centro de massa

    const ballXB = 300 + ropeLengthB * Math.cos(angleInRadiansB);
    const ballYB = 70 + ropeLengthB * Math.sin(angleInRadiansB);

    const ballB = Bodies.circle(ballXB, ballYB, 30, {
      density: 0.04,
      frictionAir: 0.005,
    });
    const ballConstraintB = Constraint.create({
      pointA: { x: 300, y: 70 },
      bodyB: ballB,
    });
    Composite.add(engine.world, [ballB, ballConstraintB]);

    const angleInRadiansC = (150 * Math.PI) / 180; // Converter 45 graus para radianos
    const ropeLengthC = 280; // Distância vertical entre o ponto de ancoragem e o centro de massa

    const ballXC = 950 + ropeLengthC * Math.cos(angleInRadiansC);
    const ballYC = 70 + ropeLengthC * Math.sin(angleInRadiansC);

    const ballC = Bodies.circle(ballXC, ballYC, 45, {
      density: 0.08,
      frictionAir: 0.005,
    });
    const ballConstraintC = Constraint.create({
      pointA: { x: 950, y: 70 },
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
