<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>HabitFlow · Social Productivity SaaS | Project Overview</title>
    <!-- Google Fonts & simple CSS reset -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(145deg, #f5f7fc 0%, #eef2f8 100%);
            font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, sans-serif;
            line-height: 1.5;
            color: #1a2c3e;
            padding: 2rem 1rem;
        }

        .container {
            max-width: 1280px;
            margin: 0 auto;
            background: rgba(255,255,255,0.96);
            backdrop-filter: blur(0px);
            border-radius: 2rem;
            box-shadow: 0 25px 45px -12px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.05);
            overflow: hidden;
            transition: all 0.2s ease;
        }

        /* header hero */
        .hero {
            background: linear-gradient(135deg, #0b2b3b 0%, #1c4e5c 100%);
            padding: 2.5rem 2.5rem 2rem 2.5rem;
            color: white;
            border-bottom: 1px solid rgba(255,255,255,0.15);
        }

        .hero h1 {
            font-size: 2.6rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            background: linear-gradient(120deg, #fff, #c9e9ff);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            display: inline-block;
            margin-bottom: 0.5rem;
        }

        .hero-badge {
            display: inline-flex;
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(4px);
            border-radius: 60px;
            padding: 0.3rem 1rem;
            font-size: 0.8rem;
            font-weight: 500;
            margin-bottom: 1rem;
            border: 1px solid rgba(255,255,255,0.3);
        }

        .hero p {
            font-size: 1.1rem;
            max-width: 80%;
            opacity: 0.9;
            margin-top: 0.75rem;
        }

        /* layout grid */
        .content {
            padding: 2.2rem 2.5rem;
        }

        .two-columns {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .card {
            background: #ffffff;
            border-radius: 1.5rem;
            box-shadow: 0 8px 20px rgba(0,0,0,0.02), 0 2px 6px rgba(0,0,0,0.05);
            border: 1px solid #e9edf2;
            transition: transform 0.2s, box-shadow 0.2s;
            overflow: hidden;
        }

        .card:hover {
            box-shadow: 0 20px 30px -12px rgba(0,0,0,0.1);
            transform: translateY(-2px);
        }

        .card-header {
            padding: 1.25rem 1.5rem 0.4rem 1.5rem;
            border-bottom: 2px solid #f0f3f8;
            font-weight: 700;
            font-size: 1.35rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            color: #1a4b6e;
        }

        .card-header i.emoji {
            font-size: 1.7rem;
        }

        .card-body {
            padding: 1.2rem 1.5rem 1.6rem 1.5rem;
        }

        .feature-list {
            list-style: none;
            margin-top: 0.5rem;
        }

        .feature-list li {
            margin-bottom: 0.7rem;
            padding-left: 1.5rem;
            position: relative;
            font-size: 0.95rem;
            color: #2c3f4f;
        }

        .feature-list li::before {
            content: "▹";
            position: absolute;
            left: 0;
            color: #2b7a62;
            font-weight: 600;
        }

        .tag-group {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 1rem 0 0.5rem;
        }

        .tag {
            background: #eef2fa;
            padding: 0.2rem 0.8rem;
            border-radius: 30px;
            font-size: 0.75rem;
            font-weight: 500;
            color: #1e5a6b;
        }

        .badge-new {
            background: #2c7a5e20;
            border-left: 3px solid #2b7a62;
            padding: 0.8rem 1rem;
            border-radius: 1rem;
            margin-top: 1rem;
            font-size: 0.85rem;
        }

        hr {
            margin: 1.8rem 0;
            border: none;
            height: 1px;
            background: linear-gradient(to right, #e2e8f0, transparent);
        }

        .section-title {
            font-size: 1.7rem;
            font-weight: 700;
            margin: 2rem 0 1rem 0;
            letter-spacing: -0.01em;
            background: linear-gradient(135deg, #1f5e6e, #143e4a);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            display: inline-block;
        }

        .grid-3 {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-top: 1rem;
        }

        .chip-card {
            background: #fafcff;
            border-radius: 1.2rem;
            border: 1px solid #eef2f8;
            padding: 1.2rem;
            transition: all 0.2s;
        }

        .chip-card strong {
            display: block;
            font-size: 1rem;
            margin-bottom: 0.5rem;
            color: #165a6b;
        }

        .vision-block {
            background: linear-gradient(110deg, #eef7f0, #ffffff);
            border-radius: 1.5rem;
            padding: 1.8rem;
            margin: 2rem 0 1.2rem;
            border: 1px solid #dde9e5;
        }

        .footer-doc {
            background: #f8fafd;
            border-top: 1px solid #e9edf2;
            padding: 1.2rem 2.5rem;
            font-size: 0.85rem;
            color: #546e7a;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        @media (max-width: 780px) {
            .hero p { max-width: 100%; }
            .two-columns { grid-template-columns: 1fr; gap: 1.2rem; }
            .content { padding: 1.5rem; }
            .hero h1 { font-size: 2rem; }
        }

        button, .fake-btn {
            background: none;
            border: none;
        }

        .list-icon {
            font-weight: 600;
            margin-right: 0.4rem;
        }

        .inline-code {
            background: #ecf3f8;
            border-radius: 12px;
            padding: 0.2rem 0.45rem;
            font-family: monospace;
            font-size: 0.85rem;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="hero">
        <div class="hero-badge">🚀 PRODUCTIVITY + SOCIAL ECOSYSTEM</div>
        <h1>HabitFlow · Social Productivity SaaS</h1>
        <p>Habit tracking · Gamified collaboration · Real‑time community · AI assistance</p>
        <p style="font-size: 0.9rem; margin-top: 1rem;">📌 Current stack: Laravel · MySQL · Livewire · planned React/Next.js migration · Docker ready</p>
    </div>

    <div class="content">
        <!-- CURRENT SITUATION CARD -->
        <div class="card" style="margin-bottom: 1.8rem;">
            <div class="card-header">
                <span class="emoji">📋</span> Current Application Status
            </div>
            <div class="card-body">
                <p style="margin-bottom: 1rem; font-weight: 500;">The platform is a <strong>Laravel-based social ecosystem</strong> that already delivers:</p>
                <div class="two-columns" style="margin-bottom: 0;">
                    <div>
                        <ul class="feature-list">
                            <li>User registration, authentication & profiles</li>
                            <li>Posts categorized by topics + image uploads</li>
                            <li>Comments, likes & friend requests</li>
                            <li>Personal task & habit tracking with completion logs</li>
                        </ul>
                    </div>
                    <div>
                        <ul class="feature-list">
                            <li>Reporting system & content moderation</li>
                            <li>Admin/moderator tools: ban users, hide posts</li>
                            <li>Global categories & real-time notifications</li>
                            <li>Social connections, community oversight</li>
                        </ul>
                    </div>
                </div>
                <div class="tag-group">
                    <span class="tag">✅ Social Hub</span>
                    <span class="tag">✅ Habit Tracker MVP</span>
                    <span class="tag">✅ Moderation Ready</span>
                    <span class="tag">✅ Task Logs</span>
                </div>
            </div>
        </div>

        <!-- PLANNED FEATURES: 2 COLUMN LAYOUT -->
        <div class="two-columns">
            <!-- LEFT: Auth & Communication -->
            <div class="card">
                <div class="card-header"><span class="emoji">🔐</span> Authentication & Real-time</div>
                <div class="card-body">
                    <ul class="feature-list">
                        <li><strong>OAuth integrations:</strong> GitHub, Facebook, Google</li>
                        <li><strong>JWT authentication</strong> support (API readiness)</li>
                        <li><strong>Real-time live chat</strong> — 1:1 conversations</li>
                        <li>Group chats & <strong>Clan/community chats</strong></li>
                        <li>🎙️ Audio messages in conversations</li>
                    </ul>
                    <div class="badge-new">🚀 Improves engagement & scalable messaging</div>
                </div>
            </div>

            <!-- RIGHT: Dashboard & Productivity -->
            <div class="card">
                <div class="card-header"><span class="emoji">📊</span> Dashboard & Productivity</div>
                <div class="card-body">
                    <ul class="feature-list">
                        <li>Fix dashboard stability + <strong>analytics graphs</strong></li>
                        <li>Progress tracking & shared <strong>“Login Habit”</strong> system</li>
                        <li><strong>Kanban Board</strong> (task management)</li>
                        <li><strong>Eisenhower Matrix</strong> (priority planning)</li>
                        <li>Visual habit streaks & productivity metrics</li>
                    </ul>
                    <div class="tag-group"><span class="tag">📈 Charts</span><span class="tag">✅ Matrix</span><span class="tag">📌 Kanban</span></div>
                </div>
            </div>
        </div>

        <!-- Community & UX Improvements -->
        <div class="two-columns">
            <div class="card">
                <div class="card-header"><span class="emoji">🌍</span> Community & Gamification</div>
                <div class="card-body">
                    <ul class="feature-list">
                        <li>Video sharing in posts + improved UX/UI</li>
                        <li><strong>Rewards & achievements</strong> system</li>
                        <li>Group / clan challenges & shared habits</li>
                        <li><strong>Clan/tribe system:</strong> members, scores, challenges, cooperative habits</li>
                        <li>Weekly email reports & smart notifications</li>
                    </ul>
                    <div class="badge-new">🏆 Gamify habits — earn clan reputation & complete group quests</div>
                </div>
            </div>
            <div class="card">
                <div class="card-header"><span class="emoji">🤖</span> AI & Payment Integration</div>
                <div class="card-body">
                    <ul class="feature-list">
                        <li>🤖 <strong>AI chatbot assistant</strong> for support and guidance</li>
                        <li>💳 <strong>Payment system integration</strong> (subscriptions, premium features)</li>
                        <li>Interactive & user-friendly interface redesign</li>
                        <li>About/Documentation page: rules, achievements, founder info, contact</li>
                        <li>Onboarding tour & dynamic help center</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Technical Improvements + DevOps -->
        <div class="card" style="margin: 1.5rem 0 1rem 0;">
            <div class="card-header"><span class="emoji">⚙️</span> Technical & Infrastructure Roadmap</div>
            <div class="card-body">
                <div class="grid-3">
                    <div class="chip-card"><strong>🐳 Dockerize</strong> Full containerization (dev/prod parity)</div>
                    <div class="chip-card"><strong>🚀 Host & Deploy</strong> Cloud-native deployment (AWS/DO/K8s ready)</div>
                    <div class="chip-card"><strong>⚛️ React/Next.js frontend</strong> Migration from Blade to modern SPA + SSR</div>
                    <div class="chip-card"><strong>📈 Scalability</strong> Queue workers, cache layer, DB optimisation</div>
                    <div class="chip-card"><strong>🔌 API First</strong> JWT + REST/Websockets for realtime features</div>
                    <div class="chip-card"><strong>🧪 CI/CD pipelines</strong> Automated tests & deployment workflows</div>
                </div>
            </div>
        </div>

        <!-- PROJECT VISION + VIBE -->
        <div class="vision-block">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1rem;">
                <span style="font-size: 2rem;">✨</span>
                <h2 style="font-size: 1.7rem; font-weight: 700; color: #134e5c;">The Vision — modern SaaS ecosystem</h2>
            </div>
            <p style="font-size: 1.05rem; margin-bottom: 1rem;">Transform habit tracking into a <strong>social, collaborative & gamified</strong> journey. The platform merges <strong>productivity tools, community bonds, and AI assistance</strong> to keep users engaged and accountable.</p>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;">
                <span style="background: #e2f0eb; border-radius: 50px; padding: 0.4rem 1rem;">🎯 Productivity Core</span>
                <span style="background: #e2f0eb; border-radius: 50px; padding: 0.4rem 1rem;">👥 Social Interaction</span>
                <span style="background: #e2f0eb; border-radius: 50px; padding: 0.4rem 1rem;">🏅 Gamification</span>
                <span style="background: #e2f0eb; border-radius: 50px; padding: 0.4rem 1rem;">🤝 Clan Collaboration</span>
                <span style="background: #e2f0eb; border-radius: 50px; padding: 0.4rem 1rem;">🧠 AI Copilot</span>
            </div>
            <p style="margin-top: 1.4rem; font-style: italic; color: #2c5a6e;">"From individual tasks to shared habits — building an engaging environment where users improve their lives, compete with friends, and grow together."</p>
        </div>

        <!-- ENHANCED FEATURE OVERVIEW: achievements, reports, clan challenges -->
        <div class="two-columns" style="margin-top: 0.4rem;">
            <div class="card">
                <div class="card-header"><span class="emoji">📢</span> Notifications & Reminders</div>
                <div class="card-body">
                    <ul class="feature-list">
                        <li>Smart push / in-app reminders for habits</li>
                        <li>Weekly email reports with progress stats & insights</li>
                        <li>Mentions, clan invitations, achievement unlocks</li>
                        <li>Customizable digest frequency</li>
                    </ul>
                </div>
            </div>
            <div class="card">
                <div class="card-header"><span class="emoji">🏅</span> Challenges & Clan Ecosystem</div>
                <div class="card-body">
                    <ul class="feature-list">
                        <li><strong>Group challenges</strong> and clan leaderboards</li>
                        <li>Shared habits: cooperative streaks (friends & clans)</li>
                        <li>Clan scores, weekly competitions, custom rewards</li>
                        <li>Cooperative habit reminders & progress visibility</li>
                    </ul>
                    <div class="tag-group"><span class="tag">🔥 clan wars</span><span class="tag">🤝 shared habits</span><span class="tag">🏆 leaderboard</span></div>
                </div>
            </div>
        </div>

        <!-- DOCUMENTATION PAGE MENTION + CONTACT -->
        <div style="background: #f9fbfe; border-radius: 1.3rem; padding: 1.2rem 1.5rem; margin: 1rem 0; border: 1px solid #e2ecf2;">
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: space-between; align-items: center;">
                <div>
                    <span style="font-weight: 700; font-size: 1.1rem;">📄 About / Documentation page</span>
                    <p style="font-size: 0.9rem; margin-top: 4px;">Community rules · Achievements gallery · Founder info · Contact & support · API preview</p>
                </div>
                <div style="background: #dee9f2; border-radius: 40px; padding: 0.3rem 1rem; font-size: 0.8rem;">🔄 roadmap updated weekly</div>
            </div>
        </div>

        <!-- ADDITIONAL: AI CHATBOT + PAYMENTS BADGE -->
        <div class="grid-3" style="margin-bottom: 0.8rem;">
            <div class="chip-card" style="background: #fef6e0;"><strong>🧠 AI Assistant</strong> — Smart coaching, task suggestions, motivational nudges, FAQ automation.</div>
            <div class="chip-card" style="background: #e8f0fe;"><strong>💎 Payment System</strong> — Subscription tiers, premium clans, advanced analytics & custom achievements.</div>
            <div class="chip-card" style="background: #e2f3e8;"><strong>🎯 Interactive UX/UI</strong> — Modern design system, dark/light mode, micro-interactions & animations.</div>
        </div>

        <!-- final summary + current vs future -->
        <hr />
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
            <div>
                <h3 style="font-weight: 600;">🚦 Migration Path: from Laravel monolith → SaaS powerhouse</h3>
                <p style="color: #2c5f6e; max-width: 600px;">Incremental rollout: Docker, Next.js frontend, WebSockets for realtime, then AI & Payments integration. Full JWT ready for mobile apps.</p>
            </div>
            <div style="background: #1f5e6e10; border-radius: 2rem; padding: 0.6rem 1.2rem;">
                <span class="inline-code">v2.0 — HabitFlow Social Productivity</span>
            </div>
        </div>

        <div style="margin: 2rem 0 0.5rem; text-align: center; font-size: 0.8rem; color: #608b9b;">
            ⚡ built with Laravel · Next.js ready · realtime chat · habit gamification · clan ecosystem
        </div>
    </div>

    <div class="footer-doc">
        <span>📌 Repository: HabitFlow SaaS — Productivity meets community</span>
        <span>👩‍💻 Founder & core team · open to contributions · 📧 contact@habitflow.example</span>
    </div>
</div>
</body>
</html>
