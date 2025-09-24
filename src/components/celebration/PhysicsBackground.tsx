import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const PhysicsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const wallsRef = useRef<Matter.Body[]>([]);

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

    // Currency colors representing various countries/cultures (e.g., green for USD-like, blue for EUR-like, etc.)
    const currencies = [
      'hsl(120, 60%, 50%)', // Green (e.g., USD)
      'hsl(200, 60%, 50%)', // Blue (e.g., EUR)
      'hsl(30, 80%, 60%)',  // Orange (e.g., INR)
      'hsl(300, 60%, 50%)', // Purple (e.g., JPY)
      'hsl(0, 80%, 50%)',   // Red (e.g., CNY)
      'hsl(60, 80%, 50%)',  // Yellow (e.g., AUD)
      'hsl(240, 60%, 50%)', // Dark blue (e.g., GBP)
      'hsl(180, 60%, 50%)', // Teal (e.g., CAD)
      'hsl(340, 70%, 50%)', // Pink (e.g., KRW)
      'hsl(100, 60%, 50%)', // Lime (e.g., BRL)
      'hsl(145, 85%, 45%)', // Forest green
      'hsl(45, 95%, 65%)',  // Gold yellow
      'hsl(210, 85%, 55%)', // Steel blue
      'hsl(270, 85%, 55%)', // Violet
    ];

    // Create boundaries (walls)
    const walls = [
      Bodies.rectangle(window.innerWidth / 2, -10, window.innerWidth, 20, { isStatic: true }),
      Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 10, window.innerWidth, 20, { isStatic: true }),
      Bodies.rectangle(-10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true }),
      Bodies.rectangle(window.innerWidth + 10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true }),
    ];
    wallsRef.current = walls;

    // Create balloons with initial velocities
    const balloons = Array.from({ length: 10 }, (_, i) => {
      const x = Math.random() * (window.innerWidth - 100) + 50;
      const y = Math.random() * (window.innerHeight - 100) + 50;
      const balloon = Bodies.circle(x, y, 25 + Math.random() * 15, {
        restitution: 0.9,
        frictionAir: 0.01,
        density: 0.001,
        render: {
          fillStyle: currencies[i % currencies.length],
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

    // Create currency notes with initial velocities
    const moneyNotes = Array.from({ length: 15 }, (_, i) => {
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
      ...moneyNotes,
      mouseConstraint,
    ]);

    // Add continuous random forces to keep objects moving and prevent rest
    Events.on(engine, 'beforeUpdate', () => {
      [...balloons, ...moneyNotes].forEach((body) => {
        // Apply random forces more frequently
        if (Math.random() < 0.1) {
          Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.005,
            y: (Math.random() - 0.5) * 0.005,
          });
        }
        
        // Keep balloons floating upward occasionally
        if (balloons.includes(body) && Math.random() < 0.03) {
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

    // Handle scroll to simulate blowing objects upward
    const handleScroll = () => {
      [...balloons, ...moneyNotes].forEach((body) => {
        Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * 0.003,
          y: -0.008,
        });
      });
    };
    window.addEventListener('scroll', handleScroll);

    // Handle resize
    const handleResize = () => {
      if (!renderRef.current || !engineRef.current) return;
      const { World, Bodies } = Matter;
      // Remove old walls
      wallsRef.current.forEach((wall) => World.remove(engineRef.current!.world, wall));
      // Create new walls
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      const newWalls = [
        Bodies.rectangle(newWidth / 2, -10, newWidth, 20, { isStatic: true }),
        Bodies.rectangle(newWidth / 2, newHeight + 10, newWidth, 20, { isStatic: true }),
        Bodies.rectangle(-10, newHeight / 2, 20, newHeight, { isStatic: true }),
        Bodies.rectangle(newWidth + 10, newHeight / 2, 20, newHeight, { isStatic: true }),
      ];
      wallsRef.current = newWalls;
      World.add(engineRef.current.world, newWalls);
      // Resize render
      renderRef.current.canvas.width = newWidth;
      renderRef.current.canvas.height = newHeight;
      renderRef.current.options.width = newWidth;
      renderRef.current.options.height = newHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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