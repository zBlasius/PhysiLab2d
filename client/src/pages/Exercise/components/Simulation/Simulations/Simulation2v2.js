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

    const teto = Bodies.rectangle(cw / 2, 0, cw, 120, {
      isStatic: true,
      friction: 0.8,
    });
    Composite.add(engine.world, teto);

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

    const angleInRadiansA = (150 * Math.PI) / 180; // Convert 45 degrees to radians
    const ropeLengthA = 260; // Vertical distance between the anchor point and the center of mass

    const ballXA = 300 + ropeLengthA * Math.cos(angleInRadiansA);
    const ballYA = 120 + ropeLengthA * Math.sin(angleInRadiansA);

    const ballA = Bodies.circle(ballXA, ballYA, 25, {
      density: 0.04,
      frictionAir: 0.005,
    });
    const ballConstraintA = Constraint.create({
      pointA: { x: 300, y: 120 },
      bodyB: ballA,
    });

    // Add labels to the balls during creation
    ballA.label = "250g - 26cm";

    // Create HTML elements for the labels
    const labelBallA = document.createElement("div");
    labelBallA.innerText = ballA.label;
    labelBallA.style.position = "absolute";
    labelBallA.style.left = `${ballA.position.x - 25}px`;
    labelBallA.style.top = `${ballA.position.y - 70}px`;
    labelBallA.style.color = "red";
    labelBallA.style.font = "16px Arial";
    scene.current.appendChild(labelBallA);

    Composite.add(engine.world, [ballA, ballConstraintA]);

    const angleInRadiansB = (150 * Math.PI) / 180; // Convert 45 degrees to radians
    const ropeLengthB = 130; // Vertical distance between the anchor point and the center of mass

    const ballXB = 300 + ropeLengthB * Math.cos(angleInRadiansB);
    const ballYB = 120 + ropeLengthB * Math.sin(angleInRadiansB);

    const ballB = Bodies.circle(ballXB, ballYB, 25, {
      density: 0.04,
      frictionAir: 0.005,
    });
    const ballConstraintB = Constraint.create({
      pointA: { x: 300, y: 120 },
      bodyB: ballB,
    });

    // Create and append the label for ballB
    ballB.label = "250g - 13cm"; // Adjust the label as needed

    const labelBallB = document.createElement("div");
    labelBallB.innerText = ballB.label;
    labelBallB.style.position = "absolute";
    labelBallB.style.left = `${ballB.position.x - 25}px`;
    labelBallB.style.top = `${ballB.position.y - 70}px`;
    labelBallB.style.color = "blue"; // You can change the color
    labelBallB.style.font = "16px Arial";
    scene.current.appendChild(labelBallB);

    Composite.add(engine.world, [ballB, ballConstraintB]);

    const angleInRadiansC = (150 * Math.PI) / 180; // Convert 45 degrees to radians
    const ropeLengthC = 260; // Vertical distance between the anchor point and the center of mass

    const ballXC = 950 + ropeLengthC * Math.cos(angleInRadiansC);
    const ballYC = 120 + ropeLengthC * Math.sin(angleInRadiansC);

    const ballC = Bodies.circle(ballXC, ballYC, 35, {
      density: 0.08,
      frictionAir: 0.005,
    });
    const ballConstraintC = Constraint.create({
      pointA: { x: 950, y: 120 },
      bodyB: ballC,
    });

    // Create and append the label for ballC
    ballC.label = "350g - 26cm"; // Adjust the label as needed

    const labelBallC = document.createElement("div");
    labelBallC.innerText = ballC.label;
    labelBallC.style.position = "absolute";
    labelBallC.style.left = `${ballC.position.x - 25}px`;
    labelBallC.style.top = `${ballC.position.y - 70}px`;
    labelBallC.style.color = "green"; // You can change the color
    labelBallC.style.font = "16px Arial";
    scene.current.appendChild(labelBallC);

    Composite.add(engine.world, [ballC, ballConstraintC]);

    const updateLabelPositions = () => {
      labelBallA.style.left = `${ballA.position.x - 40}px`;
      labelBallA.style.top = `${ballA.position.y - 55}px`;

      labelBallB.style.left = `${ballB.position.x - 40}px`;
      labelBallB.style.top = `${ballB.position.y - 55}px`;

      labelBallC.style.left = `${ballC.position.x - 40}px`;
      labelBallC.style.top = `${ballC.position.y - 70}px`;

      requestAnimationFrame(updateLabelPositions);
    };

    updateLabelPositions();

    return () => {
      World.clear(engine.world);
      Engine.clear(engine);
      Runner.stop(runner);
      Render.stop(render);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
      if (scene?.current?.contains(labelBallA)) {
        scene.current.removeChild(labelBallA);
      }
      if (scene?.current?.contains(labelBallB)) {
        scene.current.removeChild(labelBallB);
      }
      if (scene?.current?.contains(labelBallC)) {
        scene.current.removeChild(labelBallC);
      }
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
