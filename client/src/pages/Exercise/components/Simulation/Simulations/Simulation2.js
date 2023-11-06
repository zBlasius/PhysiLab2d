import React, { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  World,
  Body,
  Bodies,
  Runner,
  Mouse,
  MouseConstraint,
  Constraint,
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

    const ground = Bodies.rectangle(cw / 2, ch * 0.9, cw, 30, {
      isStatic: true,
      friction: 0.8,
    });

    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    render.mouse = mouse;

    const numSegments = 10; // Número de segmentos da corda
    const segmentWidth = 15; // Largura de cada segmento
    const segmentHeight = 10; // Altura de cada segmento
    const pendulum = createPendulum(
      cw / 2,
      100,
      numSegments,
      segmentWidth,
      segmentHeight
    );

    World.add(engine.world, [mouseConstraint, ground, ...pendulum]);

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

  function createPendulum(x, y, numSegments, segmentWidth, segmentHeight) {
    const ropeSegments = [];
    let prevBody = null;

    for (let i = 0; i < numSegments; i++) {
      const segment = Bodies.rectangle(
        x,
        y + i * (segmentHeight + 5),
        segmentWidth,
        segmentHeight,
        {
          friction: 0.5,
          density: 0.2,
        }
      );

      if (prevBody) {
        const constraint = Constraint.create({
          bodyA: prevBody,
          pointA: { x: 0, y: segmentHeight / 2 },
          bodyB: segment,
          pointB: { x: 0, y: -segmentHeight / 2 },
          length: segmentHeight + 5,
          stiffness: 0.9,
        });
        World.add(engineRef.current.world, constraint);

        if (i >= numSegments - 1) {
          const constraintPend = Constraint.create({
            bodyA: prevBody,
            pointA: { x: 0, y: segmentHeight / 2 },
            bodyB: segment,
            pointB: { x: 0, y: -segmentHeight / 2 },
            length: segmentHeight + 5,
            stiffness: 0.9,
          });

          const ball = Bodies.circle(x, y + (i + 1) * (segmentHeight + 5), 30, {
            density: 0.04,
            frictionAir: 0.005,
          });

          World.add(engineRef.current.world, constraintPend);
          World.add(engineRef.current.world, ball);

          const constraintPend2 = Constraint.create({
            bodyA: segment,
            pointA: { x: 0, y: segmentHeight / 2 },
            bodyB: ball,
            pointB: { x: 0, y: 0 },
            length: 35,
            stiffness: 0.9,
          });

          World.add(engineRef.current.world, constraintPend2);
        }
      } else {
        const constraintFIXO = Constraint.create({
          pointA: { x: x, y: y }, // Ponto no espaço onde o constraint deve ser fixo
          bodyB: segment, // Corpo ao qual o constraint está fixo
          length: 0, // O comprimento do constraint (zero para um constraint fixo)
          stiffness: 1, // A rigidez do constraint
        });

        World.add(engineRef.current.world, constraintFIXO);
      }

      ropeSegments.push(segment);
      prevBody = segment;
    }

    return ropeSegments;
  }

  return <div style={{ height: "100%", width: "100%", position: "relative" }} ref={scene}></div>;
};

export default Simulation2;
