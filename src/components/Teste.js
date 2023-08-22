import { useEffect, useRef, useState } from "react";
import { Engine, Render, Bodies, World, Events, Runner } from "matter-js";

function Teste(props) {
  const scene = useRef();

  const [restartSwitch, setRestartSwitch] = useState(0);

  useEffect(() => {
    const cw = document.body.clientWidth * 0.95;
    const ch = document.body.clientHeight * 0.85;

    const colorA = "#f55a3c";
    const colorB = "#f5d259";

    // create engine
    const engine = Engine.create({
      timing: {
        timeScale: 0.5,
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

    const collider = Bodies.rectangle(cw / 2, ch + 10, cw, 20, {
      isSensor: true,
      isStatic: true,
      render: {
        strokeStyle: colorA,
        fillStyle: "transparent",
        lineWidth: 1,
      },
    });

    // Desenha o quadrado!
    World.add(world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      collider,
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, {
        isStatic: true,
      }), // CHÃO
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
    ]);

    const ball = Bodies.circle(100, 100, 50, {
      mass: 10,
      restitution: 0.9,
      friction: 0.005,
      render: {
        fillStyle: "#0000ff",
      },
    });
    World.add(world, [ball]);

    Events.on(engine, "collisionStart", function (event) {
      var pairs = event.pairs;

      for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        if (pair.bodyA === collider) {
          console.log("COLISÃO: ", pair.collision.pair.timeCreated / 1000);
          console.log("BOLA: ", ball);
          pair.bodyB.render.strokeStyle = colorA;
        }
      }
    });

    Events.on(engine, "collisionEnd", function (event) {
      var pairs = event.pairs;

      for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        if (pair.bodyA === collider) {
          pair.bodyB.render.strokeStyle = colorB;
        }
      }
    });

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

  function onClick(e) {
    setRestartSwitch((bool) => bool + 1);
  }

  return (
    <div>
      <button onClick={(e) => onClick(e)}>Restart</button>
      <div ref={scene} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default Teste;
