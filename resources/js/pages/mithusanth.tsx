import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState, type RefObject } from 'react';

/* ============================================================
   DATA — edit this section only
============================================================ */

const ME = {
    name: 'Mithusanth Sukumar',
    role: 'Full-Stack Developer',
    bio: 'Building scalable web & mobile applications with Laravel, React, and React Native. I care about clean architecture, fast UIs, and products that actually solve problems.',
    email: 'mithusanth@gmail.com',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
    image: '/images/profile.jpg',
};

const projects = [
    {
        id: 1,
        title: 'ShelfSmart',
        tagline: 'Smart inventory for retail',
        desc: 'Smart inventory system to track stock, expiry and reduce waste in retail shops.',
        tech: ['Laravel', 'React', 'MySQL'],
        year: '2024',
        status: 'Live',
        color: '#16a34a',
        detail: {
            overview: 'ShelfSmart helps retail shop owners track their inventory in real time, flag near-expiry products, and reduce wastage through automated alerts and smart reorder suggestions.',
            challenge: 'Small retail shops often lose significant margin to expired or overstocked goods. Manual tracking is error-prone and time-consuming.',
            solution: 'A dashboard-driven system with barcode scanning support, expiry calendars, and SMS/email alerts when stock hits threshold levels.',
            features: ['Barcode scanner integration', 'Expiry date tracking & alerts', 'Stock reorder suggestions', 'Multi-user roles', 'Export reports to PDF/CSV'],
        },
    },
    {
        id: 2,
        title: 'ResQit',
        tagline: 'Rescue near-expiry food',
        desc: 'Platform to sell near-expiry products with discounts from local shops.',
        tech: ['React Native', 'Laravel API'],
        year: '2024',
        status: 'In Progress',
        color: '#ea580c',
        detail: {
            overview: 'ResQit connects local shops with consumers looking for discounted near-expiry goods — reducing food waste while letting shops recover margin.',
            challenge: 'Tonnes of food are thrown away daily because shops cannot shift near-expiry stock in time, and consumers do not know where to find deals.',
            solution: 'A mobile-first marketplace where shops list discounted items and consumers browse by category, location, and expiry window.',
            features: ['Shop & consumer apps (React Native)', 'Real-time listing updates', 'Location-based discovery', 'In-app chat', 'Order & pickup management'],
        },
    },
    {
        id: 3,
        title: 'Condominium System',
        tagline: 'End-to-end condo management',
        desc: 'Full management system with roles, buildings, and resident management.',
        tech: ['Laravel', 'Inertia', 'Tailwind'],
        year: '2023',
        status: 'Live',
        color: '#7c3aed',
        detail: {
            overview: 'A full-featured condominium management platform covering resident registration, facility booking, maintenance requests, billing, and announcements.',
            challenge: 'Condo managers were juggling spreadsheets, WhatsApp groups, and manual billing. Residents had no visibility into their accounts or requests.',
            solution: 'A role-based web platform where management and residents each have tailored dashboards, with automated billing cycles and ticket tracking.',
            features: ['Role-based access (admin, manager, resident)', 'Facility booking system', 'Maintenance ticket tracking', 'Automated monthly billing', 'Announcement board'],
        },
    },
];

const skills = [
    { name: 'Laravel', level: 90 },
    { name: 'React', level: 85 },
    { name: 'TypeScript', level: 75 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'React Native', level: 70 },
    { name: 'MySQL', level: 80 },
    { name: 'Inertia.js', level: 85 },
    { name: 'REST APIs', level: 88 },
];

/* ============================================================
   NAVBAR
============================================================ */

function Nav({ showAvatar }: { showAvatar: boolean }) {
    return (
        <motion.header
            className="fixed top-0 w-full z-50"
            style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
        >
            <div className="border-b border-white/8 bg-[#080808]/80">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Left: avatar (appears on scroll) + name */}
                    <div className="flex items-center gap-3">
                        <AnimatePresence>
                            {showAvatar && (
                                <motion.div
                                    key="nav-avatar"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                                    className="w-8 h-8 rounded-full overflow-hidden border border-white/20 flex-shrink-0"
                                >
                                    <img src={ME.image} alt={ME.name} className="w-full h-full object-cover" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <span className="text-sm font-semibold tracking-tight text-white/90">
                            {ME.name.split(' ')[0]}
                        </span>
                    </div>

                    {/* Right: nav links */}
                    <nav className="flex items-center gap-1">
                        {['Projects', 'Skills', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="px-3 py-1.5 text-sm text-white/50 hover:text-white/90 transition-colors rounded-md hover:bg-white/5"
                            >
                                {item}
                            </a>
                        ))}
                        <a
                            href={`mailto:${ME.email}`}
                            className="ml-2 px-4 py-1.5 text-sm bg-white text-black rounded-md font-medium hover:bg-white/90 transition-colors"
                        >
                            Hire me
                        </a>
                    </nav>
                </div>
            </div>
        </motion.header>
    );
}

/* ============================================================
   HERO — split layout, image right
============================================================ */

function Hero({ imageRef }) {
    return (
        <section className="min-h-screen flex items-center max-w-6xl mx-auto px-6 pt-16">
            <div className="w-full grid grid-cols-2 gap-16 items-center">

                {/* LEFT — text */}
                <div>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-xs font-medium uppercase tracking-[0.15em] text-white/35 mb-6"
                    >
                        Full-Stack Developer
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-[clamp(2.8rem,5vw,4.5rem)] font-bold leading-[1.04] tracking-tight text-white mb-6"
                        style={{ fontFamily: "'Sora', 'Instrument Sans', sans-serif" }}
                    >
                        {ME.name.split(' ').map((word, i) => (
                            <span key={i} className="block">
                                {i === 1 ? <span className="text-[#a3e635]">{word}</span> : word}
                            </span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35, duration: 0.6 }}
                        className="text-[15px] leading-[1.8] text-white/45 max-w-sm mb-10"
                    >
                        {ME.bio}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex items-center gap-3 flex-wrap"
                    >
                        <a
                            href="#projects"
                            className="px-6 py-2.5 bg-[#a3e635] text-black text-sm font-semibold rounded-md hover:bg-[#bef264] transition-colors"
                        >
                            View Projects
                        </a>
                        <a
                            href={ME.github}
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-2.5 border border-white/15 text-white/70 text-sm rounded-md hover:border-white/30 hover:text-white transition-colors"
                        >
                            GitHub ↗
                        </a>
                    </motion.div>

                    {/* Social row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-center gap-4 mt-10"
                    >
                        <div className="h-px w-8 bg-white/15" />
                        <a href={ME.github} target="_blank" rel="noreferrer" className="text-xs text-white/30 hover:text-white/70 transition-colors uppercase tracking-widest">GitHub</a>
                        <a href={ME.linkedin} target="_blank" rel="noreferrer" className="text-xs text-white/30 hover:text-white/70 transition-colors uppercase tracking-widest">LinkedIn</a>
                        <a href={`mailto:${ME.email}`} className="text-xs text-white/30 hover:text-white/70 transition-colors uppercase tracking-widest">Email</a>
                    </motion.div>
                </div>

                {/* RIGHT — profile image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-center"
                >
                    {/* Image frame with decorative elements */}
                    <div className="relative" ref={imageRef}>
                        {/* Decorative ring */}
                        <div className="absolute -inset-4 rounded-full border border-white/6" />
                        <div className="absolute -inset-8 rounded-full border border-white/3" />

                        {/* Accent dot */}
                        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#a3e635] z-10 shadow-[0_0_12px_#a3e63580]" />

                        {/* Main image */}
                        <div className="w-[300px] h-[300px] rounded-full overflow-hidden border border-white/12 shadow-[0_0_60px_rgba(163,230,53,0.08)]">
                            <img
                                src={ME.image}
                                alt={ME.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Status badge */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#111] border border-white/10 rounded-full px-4 py-1.5 whitespace-nowrap">
                            <span className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635]" />
                            <span className="text-xs text-white/60 font-medium">Open to work</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

/* ============================================================
   PROJECTS
============================================================ */

function Projects() {
    return (
        <section id="projects" className="max-w-6xl mx-auto px-6 py-28">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-14"
            >
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/30 mb-3">Portfolio</p>
                <h2 className="text-4xl font-bold text-white tracking-tight">Selected Projects</h2>
            </motion.div>

            <div className="flex flex-col gap-4">
                {projects.map((p, i) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                        <Link
                            href={`/projects/${p.id}`}
                            className="group flex items-center justify-between gap-8 p-6 rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all duration-300 block"
                        >
                            <div className="flex items-center gap-6 flex-1 min-w-0">
                                {/* Color accent */}
                                <div
                                    className="w-1 h-12 rounded-full flex-shrink-0"
                                    style={{ background: p.color }}
                                />
                                <div className="min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-semibold text-white group-hover:text-[#a3e635] transition-colors">
                                            {p.title}
                                        </h3>
                                        <span
                                            className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                                            style={{ color: p.color, borderColor: `${p.color}40`, background: `${p.color}15` }}
                                        >
                                            {p.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-white/40 truncate">{p.desc}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 flex-shrink-0">
                                <div className="hidden md:flex flex-wrap gap-2">
                                    {p.tech.map((t) => (
                                        <span key={t} className="text-xs px-2.5 py-1 bg-white/6 border border-white/8 rounded-md text-white/50">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-xs text-white/25">{p.year}</span>
                                <span className="w-8 h-8 rounded-full border border-white/12 flex items-center justify-center text-white/30 group-hover:border-[#a3e635] group-hover:text-[#a3e635] transition-all text-sm">
                                    →
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/* ============================================================
   SKILLS
============================================================ */

function Skills() {
    return (
        <section id="skills" className="max-w-6xl mx-auto px-6 py-28">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-14"
            >
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/30 mb-3">Expertise</p>
                <h2 className="text-4xl font-bold text-white tracking-tight">Skills</h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                {skills.map((skill, i) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                    >
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-white/70">{skill.name}</span>
                            <span className="text-xs text-white/25">{skill.level}%</span>
                        </div>
                        <div className="h-px bg-white/8 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 + 0.2, duration: 0.8, ease: 'easeOut' }}
                                className="h-full bg-[#a3e635] rounded-full"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/* ============================================================
   CONTACT
============================================================ */

function Contact() {
    return (
        <section id="contact" className="max-w-6xl mx-auto px-6 py-28">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-white/8 rounded-2xl p-16 text-center bg-white/2"
            >
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/30 mb-4">Get in touch</p>
                <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Let's Work Together</h2>
                <p className="text-white/40 mb-10 max-w-md mx-auto text-[15px] leading-relaxed">
                    Open to freelance projects and full-time opportunities. If you have an idea, let's build it.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                    <a
                        href={`mailto:${ME.email}`}
                        className="px-8 py-3 bg-[#a3e635] text-black font-semibold rounded-md text-sm hover:bg-[#bef264] transition-colors"
                    >
                        {ME.email}
                    </a>
                    <a
                        href={ME.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="px-8 py-3 border border-white/15 text-white/60 rounded-md text-sm hover:text-white hover:border-white/30 transition-colors"
                    >
                        LinkedIn ↗
                    </a>
                </div>
            </motion.div>
        </section>
    );
}

/* ============================================================
   FOOTER
============================================================ */

function Footer() {
    return (
        <footer className="border-t border-white/6 max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
            <span className="text-xs text-white/20">© 2025 {ME.name}</span>
            <a
                href="#"
                className="text-xs text-white/20 hover:text-white/50 transition-colors flex items-center gap-1"
            >
                Back to top ↑
            </a>
        </footer>
    );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function Welcome() {
    const imageRef = useRef(null);
    const [showAvatar, setShowAvatar] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Show avatar in nav when the hero image is NOT visible
                setShowAvatar(!entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (imageRef.current) observer.observe(imageRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Head title={`${ME.name} — Portfolio`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=sora:400,500,600,700,800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="bg-[#080808] text-white min-h-screen">
                <Nav showAvatar={showAvatar} />
                <Hero imageRef={imageRef} />
                <Projects />
                <Skills />
                <Contact />
                <Footer />
            </div>
        </>
    );
}