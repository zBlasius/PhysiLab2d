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
  Composites,
  Composite,
  Events,
  Vector,
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

    const ground = Bodies.rectangle(cw / 2, ch * 0.9, cw, 30, {
      isStatic: true,
      friction: 0.8,
    });

    // add mouse control
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

    const group = Body.nextGroup(true);
    const length = 200;
    const width = 15;

    const pendulum = Composites.stack(350, 160, 1, 1, -20, 0, function (x, y) {
      return Bodies.rectangle(x, y, length, width, {
        collisionFilter: { group: group },
        frictionAir: 0.0025,
        chamfer: 5,
        render: {
          lineWidth: 1,
        },
      });
    });

    Composites.chain(pendulum, 0.45, 0, -0.45, 0, {
      stiffness: 0.9,
      length: 0,
      angularStiffness: 0.7,
      render: {
        strokeStyle: "#4a485b",
      },
    });

    Composite.add(
      pendulum,
      Constraint.create({
        bodyB: pendulum.bodies[0],
        pointB: { x: -length * 0.42, y: 0 },
        pointA: {
          x: pendulum.bodies[0].position.x - length * 0.42,
          y: pendulum.bodies[0].position.y,
        },
        stiffness: 0.9,
        length: 0,
        render: {
          strokeStyle: "#4a485b",
        },
      })
    );

    World.add(engine.world, [mouseConstraint, ground, pendulum]);

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
