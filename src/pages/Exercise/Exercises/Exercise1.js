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
  Composite,
  Constraint,
} from "matter-js";

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

    const scale = 1;
    const car = createCar(
      cw / 6,
      ch * 0.9 - 40,
      150 * scale,
      30 * scale,
      30 * scale
    );
    const car2 = createCar(
      cw * 0.6,
      ch * 0.9 - 40,
      150 * scale,
      30 * scale,
      30 * scale
    );

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

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    World.add(engine.world, [mouseConstraint, ground, car, car2]);

    // // Aplicar uma força horizontal constante às rodas do carro
    // const horizontalForce = 0.005; // Ajuste a força conforme necessário

    // // Configure uma função para aplicar a força continuamente
    // const applyHorizontalForce = () => {
    //   car.bodies.forEach((body) => {
    //     if (body.label === "Circle Body") {
    //       // Certifique-se de aplicar a força nas rodas do carro
    //       Body.applyForce(body, body.position, {
    //         x: horizontalForce,
    //         y: 0,
    //       });
    //     }
    //   });
    //   //   requestAnimationFrame(applyHorizontalForce);
    // };

    // Inicie o loop para aplicar a força
    // applyHorizontalForce();

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

  function createCar(xx, yy, width, height, wheelSize) {
    const group = Body.nextGroup(true),
      wheelBase = 20,
      wheelAOffset = -width * 0.5 + wheelBase,
      wheelBOffset = width * 0.5 - wheelBase,
      wheelYOffset = 0;

    const car = Composite.create({ label: "Car" }),
      body = Bodies.rectangle(xx, yy, width, height, {
        collisionFilter: {
          group: group,
        },
        chamfer: {
          radius: height * 0.5,
        },
        density: 0.0002,
      });

    const wheelA = Bodies.circle(
      xx + wheelAOffset,
      yy + wheelYOffset,
      wheelSize,
      {
        collisionFilter: {
          group: group,
        },
        friction: 0.8,
      }
    );

    const wheelB = Bodies.circle(
      xx + wheelBOffset,
      yy + wheelYOffset,
      wheelSize,
      {
        collisionFilter: {
          group: group,
        },
        friction: 0.8,
      }
    );

    const axelA = Constraint.create({
      bodyB: body,
      pointB: { x: wheelAOffset, y: wheelYOffset },
      bodyA: wheelA,
      stiffness: 1,
      length: 0,
    });

    const axelB = Constraint.create({
      bodyB: body,
      pointB: { x: wheelBOffset, y: wheelYOffset },
      bodyA: wheelB,
      stiffness: 1,
      length: 0,
    });

    const carBodyWidth = width * 1.3;
    const carBodyHeight = height * 1.3;
    const carBody = Bodies.rectangle(
      xx,
      yy - wheelSize / 2 - 15, // Aumentar a distância para afastar o carBody
      carBodyWidth,
      carBodyHeight,
      {
        collisionFilter: {
          group: group,
        },
        density: 0.0002,
      });

    // Retângulo em cima do carro no sentido retrato
    const rectangleOnTop = Bodies.rectangle(
      xx,
      yy - (carBodyHeight + height) / 2 - wheelSize / 2 - 5, // Ajustar a posição em cima do carro
      (height * 2) / 3, // Altura de 2/3 de uma roda
      width / 3, // Largura de 1/3 do tamanho do carro
      {
        collisionFilter: {
          group: group,
        },
        density: 0.0002,
      }
    );

    const axelCentral = Constraint.create({
      bodyB: rectangleOnTop,
      pointB: { x: 0, y: 0 },
      bodyA: body,
      stiffness: 1,
      length: 0,
    });

    Composite.addBody(car, body);
    Composite.addBody(car, wheelA);
    Composite.addBody(car, wheelB);
    // Composite.addBody(car, carBody);
    Composite.addBody(car, rectangleOnTop);
    Composite.addConstraint(car, axelA);
    Composite.addConstraint(car, axelB);
    Composite.addConstraint(car, axelCentral);

    return car;
  }

  return <div style={{ height: "100%", width: "100%" }} ref={scene}></div>;
};

export default Exercise1;
