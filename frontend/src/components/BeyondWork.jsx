import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import '../styles/beyond-work.css';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Images
import heroBg from '../assets/personal/hero_bg.jpg';
import profileImg from '../assets/personal/about_me.jpg';
import mobile1 from '../assets/personal/mobile_1.jpg';
import mobile2 from '../assets/personal/mobile_2.jpg';
import mobile3 from '../assets/personal/mobile_3.jpg';
import mobile4 from '../assets/personal/mobile_4.jpg';
import skating1 from '../assets/personal/skating_1.jpg';
import skating2 from '../assets/personal/skating_2.jpg';
import sketching1 from '../assets/personal/sketching_1.jpg';
import sketching2 from '../assets/personal/sketching_2.jpg';
import travel1 from '../assets/personal/travel_1.jpg';
import travel2 from '../assets/personal/travel_2.jpg';
import travel3 from '../assets/personal/travel_3.jpg';
import fitnessMain from '../assets/personal/fitness_main.jpg';
import fitnessCollage from '../assets/personal/fitness_collage.jpg';

// Paper Plane Image
import paperPlaneImg from '../assets/personal/paper_plane.png';

const BeyondWork = () => {
    const containerRef = useRef(null);
    const planeRef = useRef(null);
    const bgRef = useRef(null);

    useGSAP(() => {
        if (!planeRef.current) return;

        const sections = gsap.utils.toArray('.bw-section');
        const hero = document.querySelector('.bw-hero');
        const ending = document.querySelector('.bw-ending');

        // Include Hero and Ending in the flow
        // Hero = index 0
        const allSegments = [hero, ...sections, ending].filter(Boolean);

        const width = window.innerWidth;
        const height = window.innerHeight;
        const margin = 100;

        // Physics State
        const state = {
            currentX: width - margin,
            currentY: height * 0.65, // Start lower in Hero (65%)
            currentScale: 1,
            targetX: width - margin,
            targetY: height * 0.65,
            targetScale: 1,
            rotation: 0,
            forceLevel: false
        };

        // Initialize Plane Position
        gsap.set(planeRef.current, {
            x: state.currentX,
            y: state.currentY,
            scale: state.currentScale,
            opacity: 1
        });

        // Setup Scroll Triggers for Target Calculation
        allSegments.forEach((section, i) => {
            if (!section) return;

            ScrollTrigger.create({
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                onUpdate: (self) => {
                    // Logic: Where should the plane be?

                    let sectionStartX, sectionEndX;

                    // --- ENDING SECTION (LANDING) ---
                    if (section === ending) {
                        // Continuity: Start from where the previous section left off.
                        const prevIndex = i - 1;
                        if (prevIndex >= 0) {
                            const prevIsEven = prevIndex % 2 === 0;
                            // If prev was even: Right -> Left. End is Left (margin).
                            // If prev was odd: Left -> Right. End is Right (width-margin).
                            sectionStartX = prevIsEven ? margin : width - margin;
                        } else {
                            sectionStartX = width / 2;
                        }

                        // Destination: Center of screen
                        sectionEndX = width / 2;

                        // Target Y: Fly smoothly to bottom
                        // User wants it "Just below the last text line".
                        // Text is usually vertically centered or slightly up. 
                        // 85% is a safe bet for "below".
                        state.targetY = gsap.utils.interpolate(height * 0.3, height * 0.85, self.progress);

                        state.targetScale = 1.0;

                        // Force Horizontal Landing
                        // As we approach the end of the scroll (progress > 0.6), level out.
                        if (self.progress > 0.6) {
                            state.forceLevel = true;
                        } else {
                            state.forceLevel = false;
                        }

                    } else {
                        // --- NORMAL FLIGHT ---
                        const isEven = i % 2 === 0;
                        sectionStartX = isEven ? width - margin : margin;
                        sectionEndX = isEven ? margin : width - margin;

                        // Y-Axis Band
                        // Hero starts lower (65% -> 75%)
                        if (i === 0) {
                            state.targetY = gsap.utils.interpolate(height * 0.65, height * 0.75, self.progress);
                        } else {
                            // Normal Sections
                            state.targetY = gsap.utils.interpolate(height * 0.3, height * 0.7, self.progress);
                        }

                        state.targetScale = 1.0;
                        state.forceLevel = false;
                    }

                    // Interpolate X position
                    state.targetX = gsap.utils.interpolate(sectionStartX, sectionEndX, self.progress);
                },
                onEnterBack: () => {
                    state.targetScale = 1;
                    state.forceLevel = false;
                }
            });
        });

        // Ticker for Physics (Inertia)
        const updatePhysics = () => {
            // LERP: Move current towards target
            const ease = 0.08;

            const dx = state.targetX - state.currentX;
            const dy = state.targetY - state.currentY;
            const ds = state.targetScale - state.currentScale;

            if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 && Math.abs(ds) < 0.01 && !state.forceLevel) return;

            state.currentX += dx * ease;
            state.currentY += dy * ease;
            state.currentScale += ds * ease;

            // Rotation Logic
            let targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);

            // If forced to level (Landing), override target angle to 0
            if (state.forceLevel) {
                targetAngle = 0;
            }

            // Smooth rotation interpolation
            let diff = targetAngle - state.rotation;
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;

            state.rotation += diff * 0.1;

            gsap.set(planeRef.current, {
                x: state.currentX,
                y: state.currentY,
                scale: state.currentScale,
                rotation: state.rotation,
                transformOrigin: "center center"
            });
        };

        gsap.ticker.add(updatePhysics);

        // --- BACKGROUND COLORS ---
        const bgColors = [
            'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', // Hero
            'linear-gradient(135deg, #a6c1ee 0%, #fbc2eb 100%)', // About
            'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)', // Mobile
            'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', // Skating
            'linear-gradient(135deg, #fff3e0 0%, #ffccbc 100%)', // Sketching
            'linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%)', // Travel
            'linear-gradient(135deg, #fbc2eb 0%, #fad0c4 100%)', // Fitness
            'linear-gradient(135deg, #2d3436 0%, #000000 100%)'  // End
        ];

        gsap.set(bgRef.current, { background: bgColors[0] });

        // Hero + Sections triggers for BG
        const colorSegments = [hero, ...sections];

        colorSegments.forEach((section, i) => {
            if (bgColors[i]) {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => gsap.to(bgRef.current, { background: bgColors[i], duration: 1.0 }),
                    onEnterBack: () => {
                        const prevColor = bgColors[i - 1] || bgColors[i];
                        gsap.to(bgRef.current, { background: prevColor, duration: 1.0 })
                    },
                });
            }
        });

        return () => {
            gsap.ticker.remove(updatePhysics);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };

    }, { scope: containerRef });

    const Polaroid = ({ src, alt, caption }) => (
        <div className="bw-polaroid">
            <img src={src} alt={alt} onError={(e) => { e.target.style.opacity = '0.1'; e.target.parentElement.style.background = '#f0f0f0'; }} />
            {caption && <div className="bw-caption">{caption}</div>}
        </div>
    );

    // Force refresh on load
    React.useEffect(() => {
        const handleLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    return (
        <div ref={containerRef} className="bw-wrapper">

            {/* FIXED BACKGROUND */}
            <div ref={bgRef} className="bw-fixed-bg"></div>

            {/* FLIGHT LAYER - FIXED POSITION */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 99999, pointerEvents: 'none' }}>
                <div ref={planeRef} className="bw-paper-plane" style={{
                    width: '150px',
                    height: 'auto',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 999,
                    willChange: 'transform'
                }}>
                    <div className="bw-plane-inner" style={{ width: '100%', height: '100%' }}>
                        <img src={paperPlaneImg} alt="Paper Plane" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(5px 10px 10px rgba(0,0,0,0.2))' }} />
                    </div>
                </div>
            </div>

            {/* HERO */}
            <section className="bw-hero">
                <div className="bw-hero-content">
                    <h1>Story Of My Life...</h1>
                    <p className="bw-hero-tagline">Discomfort Is Where Growth Lies !</p>
                </div>
            </section>

            {/* SECTIONS */}

            {/* 2. ABOUT ME */}
            <section className="bw-section">
                <div className="bw-section-content">
                    <div className="bw-text-side">
                        <h2 className="bw-title">About Me</h2>
                        <div className="bw-story-text">
                            <p>"My name is Amit Pandey, and my portfolio is a representation of all that I've learned and accomplished so far.</p>
                            <p>I'm a graduate with BSc(Statistics) and currently pursuing Data Science and its application from IIT Madras.</p>
                            <p>I'm an extrovert and always do the things that I love. I'm fond of Coding, I'm a teacher, student, Skating Coach, and Photographer. I love hanging out with my loved ones, listening to songs, reading fictional novels, and playing guitar in my free time."</p>
                        </div>
                    </div>
                    <div className="bw-image-side">
                        <Polaroid src={profileImg} alt="Me" caption="That's Me!" />
                    </div>
                </div>
            </section>

            {/* 3. MOBILE PHOTOGRAPHY */}
            <section className="bw-section">
                <div className="bw-section-content">
                    <div className="bw-text-side">
                        <h2 className="bw-title">Mobile Photography</h2>
                        <div className="bw-story-text">
                            <p>Capturing moments through the lens has always been a way for me to freeze time. It's about finding beauty in the mundane.</p>
                            <p>When I look at the world through my mobile screen, I see stories that others might miss. The play of light and shadow, the vibrant colors of a street market, or the quiet solitude of a night sky.</p>
                            <p>Every click is a memory preserved forever, a feeling held still. It's my way of documenting the journey of life.</p>
                        </div>
                    </div>
                    <div className="bw-image-side">
                        <Polaroid src={mobile1} alt="Mobile 1" caption="Cloudy Skies" />
                        <Polaroid src={mobile2} alt="Mobile 2" caption="A photo from my campus" />
                        <Polaroid src={mobile3} alt="Mobile 3" caption="Pondicherry Diaries" />
                    </div>
                </div>
            </section>

            {/* 4. SKATING JOURNEY */}
            <section className="bw-section">
                <div className="bw-section-content">
                    <div className="bw-text-side">
                        <h2 className="bw-title">Skating Journey</h2>
                        <div className="bw-story-text">
                            <p>One of my happiest hobbies is <strong>skating</strong>. Since childhood, I always wanted to learn it, but I never really got the chance—until one day I decided to seriously think about what truly makes me happy. There are many little things that bring a smile to my face, and skating is definitely one of them.</p>
                            <p>It all started one day when I saw a boy wearing skate shoes while I was hanging out with my friends. Out of curiosity, I called him over and asked about the price of the shoes and whether he could help train me. The very next day, I bought my <strong>first pair of skate shoes for ₹1500</strong> and began learning this new skill, practicing day and night.</p>
                            <p>On the second day itself, a skating coach noticed me pushing myself beyond 100% and decided to help. With his guidance and my determination, within just <strong>four days I had learned skating to a good extent</strong>. The photo beside this paragraph was taken on my <strong>6th day of practice</strong>, when I was climbing a <strong>50–60 degree slope</strong>. I kept falling and getting back up, but after several attempts I finally managed to roll all the way to the top—and come back down too. That day, I didn’t just learn skating, I learned the true meaning of <strong>balance</strong>.</p>
                            <p>After three months of consistent practice, I began teaching skating to others. Today, I am proud to say that I am a <strong>Coach</strong> and run my own academy: <strong>INNERFIRES SKATING ACADEMY</strong>.</p>
                            <p>Along this journey, I even got selected to represent at the Nationals in Mohali. Unfortunately, due to personal reasons, I couldn’t participate—but that selection itself remains one of my proudest milestones. Skating has not only given me a skill but also a way of life. Every fall, every climb, and every spin reminds me that joy comes when we dare to chase our passions.</p>
                        </div>
                    </div>
                    <div className="bw-image-side">
                        <Polaroid src={skating1} alt="Skating 1" caption=".....Fourth day of learning Skating..... NIT Ghat, Patna." />
                        <Polaroid src={skating2} alt="Skating 2" caption="..................CuTe StUdEnTs................  Energy Park, Patna." />
                    </div>
                </div>
            </section>

            {/* 5. SKETCHING */}
            <section className="bw-section">
                <div className="bw-section-content">
                    <div className="bw-text-side">
                        <h2 className="bw-title">Sketching</h2>
                        <div className="bw-story-text">
                            <p>Ever since childhood, I found myself doodling on the back of notebooks, on scraps of paper, or even on the corners of my textbooks. For me, sketching has always been more than just lines and shades—it’s a <strong>quiet conversation with myself</strong>.</p>
                            <p>One evening, I was sitting alone after a long day of classes. My mind felt cluttered, and I picked up a pencil without thinking. I started sketching a simple cup placed on my table. The funny thing was, as the lines took shape, my thoughts slowed down too. That small cup turned into a reminder—sometimes, peace hides in the simplest of things.</p>
                            <p>Over time, I began sketching everything that caught my attention—faces in the crowd, trees on the roadside, even the chaos of a messy desk. One of my favorite works was an eye, where I tried to capture the depth and unspoken emotions hidden within it. Another time, I drew a peaceful scenery with a pond, a small home, and a wooden path resting on pillars across the water—a place that felt calm and alive on paper. Each sketch taught me patience. Every shade made me realize that beauty is not always in perfection but in the effort you put in.</p>
                            <p>The most surprising part is how people connect with sketches. When someone looks at one of my drawings and says, “This feels exactly like my place” or “I don’t know why, but this reminds me of my childhood”—that’s when I feel the real magic of sketching. It’s not just art; it’s about evoking emotions, bringing back memories, and letting others see the world through my eyes for a moment.</p>
                            <p>Sketching, for me, is a bridge—between what I feel inside and what others can relate to. Just like life, every line may not be perfect, but when you step back, it all comes together into a story worth remembering.</p>
                        </div>
                    </div>
                    <div className="bw-image-side">
                        <Polaroid src={sketching1} alt="Sketching 1" caption="Dark Arts" />
                        <Polaroid src={sketching2} alt="Sketching 2" caption="The Eye" />
                    </div>
                </div>
            </section>

            {/* 6. TRAVELLING */}
            <section className="bw-section">
                <div className="bw-section-content">
                    <div className="bw-text-side">
                        <h2 className="bw-title">Travelling</h2>
                        <div className="bw-story-text">
                            <p>For me, travelling is not just about reaching a new place—it’s about collecting stories, feelings, and little pieces of life that stay with you forever.</p>
                            <p>I’ve wandered through <strong>Chennai</strong>, where the air carries the smell of sea and filter coffee, and <strong>Kolkata</strong>, where every street corner has a story of history, art, and culture. I’ve stood near the Nepal border close to Balmiki Nagar Tiger Reserve, where the forests whisper with a kind of silence you don’t find in cities. Each place has left me with a different lesson, a different perspective.</p>
                            <p>But if I have to choose the journey that changed me, it was my one-week trip to <strong>Sikkim</strong> with my two best friends. The moment we entered Gangtok, I felt like stepping into another world—streets lined with colorful prayer flags, small cafés serving steaming momos, and locals greeting us with warm smiles. Walking there felt like walking inside a painting where every corner had its own color.</p>
                            <p>One memory is etched in my heart forever—the ride through the mountains at 6000 feet above sea level. Our driver was a character straight out of a movie—fearless, cheerful, and absolutely hilarious. He drove at a thrilling speed, taking sharp turns on narrow mountain cliffs as if the roads were his playground. While we were holding on tightly, half scared and half thrilled, he was singing old Hindi songs at the top of his voice, as though danger didn’t exist.</p>
                            <p>Travelling does that—it wakes you up. It’s not just about the scenery; it’s about meeting people, sharing stories, listening to their journeys, and realizing how connected we all are despite our differences.</p>
                            <p>That trip taught me something I’ll never forget: Life is too short to just sit at home working endlessly. Sometimes, you need to step out, get lost, take risks, and let the world surprise you. That’s where real growth happens.</p>
                        </div>
                    </div>
                    <div className="bw-image-side">
                        <Polaroid src={travel1} alt="Travel 1" caption="Mysore palace" />
                        <Polaroid src={travel2} alt="Travel 2" caption="It invites curiosity without narrating the whole story." />
                        <Polaroid src={travel3} alt="Travel 3" caption="The best trip of my life, sikkim.. March 2022" />
                    </div>
                </div>
            </section>

            {/* 7. MEDITATION & FITNESS */}
            <section className="bw-section">
                <div className="bw-section-content">
                    <div className="bw-text-side">
                        <h2 className="bw-title">Meditation & Fitness</h2>
                        <div className="bw-story-text">
                            <p>Since childhood, I was always the naughty one—never sitting in one place, always running, jumping, playing, and wandering. That energy became a habit, and gradually exercise and running became a natural part of my life.</p>
                            <p>Later, when I was in Patna, I noticed people doing <strong>yoga in the park near my home</strong>. My sister often told me about the power of yoga, so I decided to give it a try. At first, it was just another form of exercise for me, but slowly I began to realize yoga was different—it was not just about the body but also about the mind. The calmness, balance, and control it brought into my life was something new, something deeper.</p>
                            <p>But life has its own way of teaching lessons. After years of pushing my body—running endlessly, doing heavy exercises without proper rest, not drinking enough water, and ignoring diet—I faced multiple health issues. From gallbladder stone surgery to stomach infections, bloating, and recurring pain, my body started reminding me that even strength has its limits.</p>
                            <p>Those tough days taught me something I’ll never forget: <strong>health is not just about how much you can push yourself—it’s about balance</strong>. Exercise without care, yoga without mindfulness, or meditation without discipline can become meaningless.</p>
                            <p>Now, after experiencing both sides of life, I’ve built a simple philosophy for myself:
                                <br />• Drink as much water as you can.
                                <br />• Eat healthy and stick to a balanced diet plan.
                                <br />• Dedicate 30–40 minutes in the morning to exercise or yoga—it’s enough.
                                <br />• Always warm up before pushing your body.
                                <br />• And above all, don’t forget your mind—a few minutes of meditation daily can recharge you more than hours of rest.</p>
                            <p>When I sit in meditation or hold a yoga pose at sunrise, I feel the same playful energy from my childhood, but now it’s calmer, wiser, and more focused. For me, <strong>exercise builds strength, yoga brings balance, and meditation gives peace</strong>. Together, they keep me grounded and remind me that life is not about extremes, but about harmony.</p>
                        </div>
                    </div>
                    <div className="bw-image-side">
                        <Polaroid src={fitnessMain} alt="Fitness" caption="Dream to achieve this balance" />
                        <Polaroid src={fitnessCollage} alt="Collage" caption="Strength & Balance" />
                    </div>
                </div>
            </section>

            <section className="bw-ending">
                <h2>Thank you for the ride.</h2>
                <p style={{ color: '#29b6f6', fontSize: '1.5rem', fontFamily: '"Dancing Script"' }}>See you in the next chapter!</p>
            </section>

        </div>
    );
};

export default BeyondWork;
