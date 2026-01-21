import React, { useEffect, useRef } from 'react';

const NeuralBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const config = {
            particleCount: 80, // Increased for 40% width
            connectionDistance: 140, // Slightly longer connections
            mouseDistance: 150,
            color: '0, 242, 255', // Cyan rgb
            baseOpacity: 0.8, // Higher opacity for "Strong" feel
            speed: 0.2 // Slow, premium motion
        };

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            const dpr = window.devicePixelRatio || 1;

            // Set actual size in memory (scaled to account for extra pixel density)
            canvas.width = parent.clientWidth * dpr;
            canvas.height = parent.clientHeight * dpr;

            // Normalize coordinate system to use css pixels
            ctx.scale(dpr, dpr);

            // Set visible style size
            canvas.style.width = `${parent.clientWidth}px`;
            canvas.style.height = `${parent.clientHeight}px`;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Mouse tracking
        const mouse = { x: null, y: null };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        class Particle {
            constructor() {
                // Initialize position within CSS pixel dimensions
                const rect = canvas.getBoundingClientRect();
                this.x = Math.random() * rect.width;
                this.y = Math.random() * rect.height;
                this.vx = (Math.random() - 0.5) * config.speed;
                this.vy = (Math.random() - 0.5) * config.speed;
                this.size = Math.random() * 2 + 1.5; // Sharper, slightly smaller variance
            }

            update() {
                const rect = canvas.getBoundingClientRect();
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > rect.width) this.vx *= -1;
                if (this.y < 0 || this.y > rect.height) this.vy *= -1;

                // Mouse interaction
                if (mouse.x != null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.mouseDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (config.mouseDistance - distance) / config.mouseDistance;

                        const direction = -1; // Repulsion
                        this.vx += forceDirectionX * force * 0.05 * direction;
                        this.vy += forceDirectionY * force * 0.05 * direction;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

                // Strong Glowing Edge Effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(${config.color}, 1)`;
                ctx.fillStyle = `rgba(${config.color}, 1)`; // Solid core for HD look
                ctx.fill();

                // Reset shadow for performance if needed, but we want glow on everything here
                ctx.shadowBlur = 0;
            }
        }

        const particles = [];
        const initParticles = () => {
            const rect = canvas.getBoundingClientRect();
            // Density calculation
            const area = rect.width * rect.height;
            const count = Math.min(config.particleCount, Math.floor(area / 4000)); // Higher density formula

            particles.length = 0;
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        initParticles();
        window.addEventListener('resize', () => setTimeout(initParticles, 100));

        // Intersection Observer to pause animation when off-screen
        let isVisible = true;
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
        }, { threshold: 0 });

        observer.observe(canvas);

        const animate = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            // Draw connections first (behind nodes)
            ctx.shadowBlur = 5;
            ctx.shadowColor = `rgba(${config.color}, 0.5)`;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);

                        const opacity = 1 - (distance / config.connectionDistance);
                        ctx.strokeStyle = `rgba(${config.color}, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="neural-canvas"
            style={{
                width: '100%',
                height: '100%',
                display: 'block',
                // Remove the fade mask if we want "strong glowing edge" everywhere in the box
                // Or keep a subtle one. User said "rest of the area" implies it fills its new container.
                maskImage: 'linear-gradient(to right, transparent 0%, black 20%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%)'
            }}
        />
    );
};

export default NeuralBackground;
