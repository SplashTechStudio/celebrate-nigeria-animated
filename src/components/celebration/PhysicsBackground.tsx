import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const PhysicsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Events, Runner, Body } = Matter;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    
    // Set gravity for natural falling motion
    engine.world.gravity.y = 0.8;
    engine.world.gravity.x = 0;

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

    // Create balloons with initial velocities
    const balloons = Array.from({ length: 8 }, (_, i) => {
      const x = Math.random() * (window.innerWidth - 100) + 50;
      const y = Math.random() * (window.innerHeight - 100) + 50;
      const balloon = Bodies.circle(x, y, 25 + Math.random() * 15, {
        restitution: 0.9,
        frictionAir: 0.01,
        density: 0.001,
        render: {
          fillStyle: i % 2 === 0 ? 'hsl(145, 85%, 45%)' : 'hsl(45, 95%, 65%)',
          strokeStyle: 'hsl(45, 100%, 95%)',
          lineWidth: 2,
        },
      });
      // Add initial random velocity
      Body.setVelocity(balloon, {
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4,
      });
      return balloon;
    });

    // Create cake pieces with initial velocities
    const cakes = Array.from({ length: 3 }, (_, i) => {
      const x = Math.random() * (window.innerWidth - 100) + 50;
      const y = Math.random() * (window.innerHeight - 100) + 50;
      const cake = Bodies.rectangle(x, y, 40, 30, {
        restitution: 0.8,
        frictionAir: 0.02,
        density: 0.002,
        render: {
          fillStyle: 'hsl(25, 80%, 60%)',
          strokeStyle: 'hsl(45, 95%, 75%)',
          lineWidth: 2,
        },
      });
      // Add initial random velocity
      Body.setVelocity(cake, {
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 3,
      });
      return cake;
    });

    // Create money notes with initial velocities
    const currencies = ['hsl(145, 85%, 45%)', 'hsl(45, 95%, 65%)', 'hsl(210, 85%, 55%)', 'hsl(340, 85%, 55%)', 'hsl(270, 85%, 55%)'];
    const moneyNotes = Array.from({ length: 12 }, (_, i) => {
      const x = Math.random() * (window.innerWidth - 100) + 50;
      const y = Math.random() * (window.innerHeight - 100) + 50;
      const note = Bodies.rectangle(x, y, 60, 30, {
        restitution: 0.95,
        frictionAir: 0.015,
        density: 0.0005,
        render: {
          fillStyle: currencies[i % currencies.length],
          strokeStyle: 'hsl(45, 95%, 75%)',
          lineWidth: 1,
        },
      });
      // Add initial random velocity
      Body.setVelocity(note, {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
      });
      return note;
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

    // Add continuous random forces to keep objects moving
    Events.on(engine, 'beforeUpdate', () => {
      [...balloons, ...cakes, ...moneyNotes].forEach((body) => {
        // Apply random forces more frequently
        if (Math.random() < 0.05) {
          Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.005,
            y: (Math.random() - 0.5) * 0.005,
          });
        }
        
        // Keep balloons floating upward occasionally
        if (balloons.includes(body) && Math.random() < 0.02) {
          Body.applyForce(body, body.position, {
            x: 0,
            y: -0.008,
          });
        }
      });
    });

    // Create runner for smooth animation
    const runner = Runner.create();
    runnerRef.current = runner;
    
    // Start the engine and renderer
    Runner.run(runner, engine);
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
      if (runnerRef.current) {
        Runner.stop(runnerRef.current);
      }
      if (renderRef.current) {
        Render.stop(renderRef.current);
        if (renderRef.current.canvas && renderRef.current.canvas.parentNode) {
          renderRef.current.canvas.remove();
        }
      }
      if (engineRef.current) {
        World.clear(engineRef.current.world, false);
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
