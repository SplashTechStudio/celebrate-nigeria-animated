import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const PhysicsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Events } = Matter;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    
    // Reduce gravity for floating effect
    engine.world.gravity.y = 0.3;

    // Create renderer
    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
        showVelocity: false,
        showAngleIndicator: false,
        showDebug: false,
      },
    });
    renderRef.current = render;

    // Create boundaries (walls)
    const walls = [
      Bodies.rectangle(window.innerWidth / 2, -10, window.innerWidth, 20, { isStatic: true }),
      Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 10, window.innerWidth, 20, { isStatic: true }),
      Bodies.rectangle(-10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true }),
      Bodies.rectangle(window.innerWidth + 10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true }),
    ];

    // Create balloons
    const balloons = Array.from({ length: 8 }, (_, i) => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      return Bodies.circle(x, y, 25 + Math.random() * 15, {
        restitution: 0.8,
        frictionAir: 0.02,
        render: {
          fillStyle: i % 2 === 0 ? 'hsl(145, 85%, 45%)' : 'hsl(45, 95%, 65%)',
          strokeStyle: 'hsl(var(--celebration-white))',
          lineWidth: 2,
        },
      });
    });

    // Create cake pieces
    const cakes = Array.from({ length: 3 }, (_, i) => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      return Bodies.rectangle(x, y, 40, 30, {
        restitution: 0.6,
        frictionAir: 0.03,
        render: {
          fillStyle: 'hsl(25, 80%, 60%)',
          strokeStyle: 'hsl(45, 95%, 75%)',
          lineWidth: 2,
        },
      });
    });

    // Create money notes
    const currencies = ['#4CAF50', '#FF9800', '#2196F3', '#E91E63', '#9C27B0'];
    const moneyNotes = Array.from({ length: 12 }, (_, i) => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      return Bodies.rectangle(x, y, 60, 30, {
        restitution: 0.9,
        frictionAir: 0.04,
        render: {
          fillStyle: currencies[i % currencies.length],
          strokeStyle: 'hsl(var(--gold))',
          lineWidth: 1,
        },
      });
    });

    // Add mouse control
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

    // Add all bodies to world
    World.add(engine.world, [
      ...walls,
      ...balloons,
      ...cakes,
      ...moneyNotes,
      mouseConstraint,
    ]);

    // Add gentle random forces to keep objects moving
    Events.on(engine, 'beforeUpdate', () => {
      [...balloons, ...cakes, ...moneyNotes].forEach((body) => {
        if (Math.random() < 0.01) {
          Matter.Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.002,
            y: (Math.random() - 0.5) * 0.002,
          });
        }
      });
    });

    // Start the engine and renderer
    Engine.run(engine);
    Render.run(render);

    // Handle resize
    const handleResize = () => {
      if (renderRef.current) {
        renderRef.current.canvas.width = window.innerWidth;
        renderRef.current.canvas.height = window.innerHeight;
        renderRef.current.options.width = window.innerWidth;
        renderRef.current.options.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderRef.current) {
        Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
      }
      if (engineRef.current) {
        Engine.clear(engineRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default PhysicsBackground;
