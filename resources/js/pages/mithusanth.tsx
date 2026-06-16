import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/* ============================================================
   TYPES
============================================================ */

type Project = {
    id: number;
    title: string;
    tagline: string;
    desc: string;
    tech: string[];
    year: string;
    status: string;
    color: string;
    github: string | null;
    live: string | null;
    images: string[];          // put real paths like '/images/shelfsmart-1.jpg'
    purpose: string;
    overview: string;
    challenge: string;
    solution: string;
    features: string[];
};

/* ============================================================
   DATA  — edit this section only
============================================================ */

const ME = {
    name: 'Mithusanth Sukumar',
    role: 'Full-Stack Developer',
    bio: 'Building scalable web & mobile applications with Laravel, React, and React Native. I care about clean architecture, fast UIs, and products that actually solve problems.',
    email: 'mithusanthjack@gmail.com',
    github: 'https://github.com/Jack-Mithu',
    linkedin: 'https://linkedin.com/in/sukumar-mithushanth',
    image: '/images/profile.jpg',
};

const projects: Project[] = [
    {
        id: 1,
        title: 'ShelfSmart',
        tagline: 'Smart inventory for retail',
        desc: 'Smart inventory system to track stock, expiry and reduce waste in retail shops.',
        tech: ['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
        year: '2024',
        status: 'Live',
        color: '#16a34a',
        github: 'https://github.com/Jack-Mithu',
        live: null,
        // Replace with your real screenshot paths
        images: [
            '/images/homepage.png',
            '/images/Home.jpeg',
            '/images/AddProduct.jpeg',
            '/images/barcodeScan.jpeg',
            '/images/Product.jpeg',
            '/images/ProductDetails.jpeg',
            '/images/Alerts.jpeg',
            '/images/profile.jpeg',
        ],
        purpose: 'Help small retail shops eliminate inventory waste and expired stock loss through smart tracking.',
        overview: 'ShelfSmart helps retail shop owners track their inventory in real time, flag near-expiry products, and reduce wastage through automated alerts and smart reorder suggestions.',
        challenge: 'Small retail shops often lose significant margin to expired or overstocked goods. Manual tracking is error-prone and off-the-shelf solutions are too expensive for small operators.',
        solution: 'A dashboard-driven system with barcode scanning support, expiry calendars, and SMS/email alerts when stock hits threshold levels — intuitive enough for a non-technical shop owner.',
        features: [
            'Barcode scanner integration via USB/mobile camera',
            'Expiry date tracking with colour-coded urgency',
            'Automated SMS & email alerts at custom thresholds',
            'Multi-user roles (owner, staff, viewer)',
            'Stock reorder suggestions based on sales velocity',
            'Export reports to PDF & CSV',
        ],
    },
    // {
    //     id: 2,
    //     title: 'ResQit',
    //     tagline: 'Rescue near-expiry food',
    //     desc: 'Platform to sell near-expiry products with discounts from local shops.',
    //     tech: ['React Native', 'Laravel API', 'MySQL', 'Firebase'],
    //     year: '2024',
    //     status: 'In Progress',
    //     color: '#ea580c',
    //     github: 'https://github.com/Jack-Mithu',
    //     live: null,
    //     images: [
    //         '/images/resqit-1.jpg',
    //         '/images/resqit-2.jpg',
    //         '/images/resqit-3.jpg',
    //     ],
    //     purpose: 'Connect local shops with budget-conscious consumers to rescue near-expiry food and cut waste.',
    //     overview: 'ResQit connects local shops with consumers looking for discounted near-expiry goods — reducing food waste while letting shops recover margin on stock that would otherwise be thrown away.',
    //     challenge: 'Tonnes of food are discarded daily because shops cannot shift near-expiry stock in time. Consumers have no single place to discover these deals.',
    //     solution: 'A mobile-first two-sided marketplace where shops list discounted items in seconds and consumers browse by category, location, and expiry window.',
    //     features: [
    //         'Separate shop & consumer apps (React Native)',
    //         'Real-time listing updates via WebSocket',
    //         'Location-based discovery with map view',
    //         'In-app chat between shop and buyer',
    //         'Order creation and pickup confirmation',
    //         'Push notifications for nearby deals',
    //     ],
    // },
    {
        id: 3,
        title: 'Multi-School hub',
        tagline: 'End-to-end school management',
        desc: 'Full management system with roles, Teachers,students,courses,Assignments and Time tables.',
        tech: ['Laravel', 'Inertia.js', 'React', 'Tailwind CSS', 'MySQL'],
        year: '2023',
        status: 'Live',
        color: '#7c3aed',
        github: 'https://github.com/Jack-Mithu',
        live: 'https://multi-schoolhub.laravel.cloud/',
        images: [
            '/images/welcomPageOfMultiHub.png',
            '/images/SchoolDashBoardOfMulti.png',
            '/images/StudentDashboardOfMultiHub.png',
            '/images/AddNewTeacherOfMultihub.png',
            '/images/TeacherportalMultihub.png',
        ],
        purpose: 'To streamline school administration and improve communication between teachers, students, and parents.',
        overview: 'A full-featured school management platform covering student records, course management, assignment tracking, and communication — all in one place.',
        challenge: 'School administrators were using multiple systems for different tasks. Teachers had difficulty managing assignments and communicating with students.',
        solution: 'A role-based web platform where administrators, teachers, and students each have tailored dashboards. All processes are integrated for seamless management.',
        features: [
            'Role-based access for admins, teachers, and students',
            'Student record management',
            'Course management',
            'Assignment tracking',
            'Time table management',
            'Communication tools for teachers, students, and parents',
        ],
    },
];

const skills = [
    { name: 'Laravel', level: 100 },
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 75 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'React Native', level: 70 },
    { name: 'MySQL', level: 80 },
    { name: 'Inertia.js', level: 85 },
    { name: 'REST APIs', level: 88 },
];

/* ============================================================
   IMAGE SLIDESHOW
============================================================ */

function ImageSlider({ images, color }: { images: string[]; color: string }) {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

    return (
        <div
            className="relative w-full rounded-xl overflow-hidden bg-white/4 border border-white/8 flex items-center justify-center"
            style={{ maxHeight: '60vh' }}
        >
            <AnimatePresence mode="wait">
                <motion.img
                    key={current}
                    src={images[current]}
                    alt={`Screenshot ${current + 1}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-full max-h-[60vh] object-contain"
                    onError={(e) => {
                        // fallback placeholder when image not found
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
            </AnimatePresence>

            {/* Placeholder shown when image is missing */}
            <div className="absolute inset-0 flex items-center justify-center text-white/10 text-sm -z-0 select-none">
                Screenshot {current + 1} / {images.length}
            </div>

            {/* Prev / Next */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all z-10"
                    >
                        ←
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all z-10"
                    >
                        →
                    </button>
                </>
            )}

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className="w-1.5 h-1.5 rounded-full transition-all"
                        style={{
                            background: i === current ? color : 'rgba(255,255,255,0.3)',
                            transform: i === current ? 'scale(1.3)' : 'scale(1)',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

/* ============================================================
   PROJECT MODAL
============================================================ */

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                key="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            <motion.div
                key="modal-panel"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                className="fixed bottom-0 left-0 right-0 z-[101] max-h-[92vh] overflow-y-auto rounded-t-2xl bg-[#0f0f0f] border-t border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top accent line */}
                <div className="h-0.5 w-full rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />

                {/* Drag handle */}
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full bg-white/15" />
                </div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 pt-4">

                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="text-xs text-white/30 uppercase tracking-widest">{project.year}</span>
                                <span
                                    className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                                    style={{ color: project.color, borderColor: `${project.color}50`, background: `${project.color}18` }}
                                >
                                    {project.status}
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{project.title}</h2>
                            <p className="text-white/40 mt-1 text-sm sm:text-base">{project.tagline}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all text-sm"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Image slider */}
                    <div className="mb-8">
                        <ImageSlider images={project.images} color={project.color} />
                    </div>

                    {/* Tech stack */}
                    <div className="mb-8">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 mb-3">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="text-xs px-3 py-1.5 rounded-md border font-medium"
                                    style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}10` }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Purpose */}
                    <div className="mb-8 p-4 rounded-xl border border-white/6 bg-white/2">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 mb-2">Purpose</p>
                        <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed">{project.purpose}</p>
                    </div>

                    {/* Overview */}
                    <div className="mb-8">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 mb-3">Overview</p>
                        <p className="text-sm sm:text-[15px] text-white/55 leading-[1.85]">{project.overview}</p>
                    </div>

                    {/* Challenge + Solution */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="p-4 sm:p-5 rounded-xl border border-white/6 bg-white/2">
                            <div className="w-6 h-0.5 rounded-full mb-3" style={{ background: project.color }} />
                            <p className="text-xs font-semibold text-white mb-2">The Challenge</p>
                            <p className="text-xs sm:text-sm text-white/45 leading-relaxed">{project.challenge}</p>
                        </div>
                        <div className="p-4 sm:p-5 rounded-xl border border-white/6 bg-white/2">
                            <div className="w-6 h-0.5 rounded-full mb-3 bg-white/20" />
                            <p className="text-xs font-semibold text-white mb-2">The Solution</p>
                            <p className="text-xs sm:text-sm text-white/45 leading-relaxed">{project.solution}</p>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 mb-4">Key Features</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {project.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-3 p-3 rounded-lg border border-white/6 bg-white/2 text-xs sm:text-sm text-white/55 leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: project.color }} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action links */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 border border-white/12 text-white/60 text-sm rounded-lg hover:border-white/25 hover:text-white transition-colors"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                                View Source
                            </a>
                        )}
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm rounded-lg font-semibold transition-colors"
                                style={{ background: project.color, color: '#000' }}
                            >
                                Live Site ↗
                            </a>
                        )}
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
}

/* ============================================================
   NAVBAR
============================================================ */

function Nav({ showAvatar }: { showAvatar: boolean }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.header
            className="fixed top-0 w-full z-50"
            style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
        >
            <div className="border-b border-white/8 bg-[#080808]/80">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">

                    <div className="flex items-center gap-2.5">
                        <AnimatePresence>
                            {showAvatar && (
                                <motion.div
                                    key="nav-avatar"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/20 flex-shrink-0"
                                >
                                    <img src={ME.image} alt={ME.name} className="w-full h-full object-cover" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <span className="text-sm font-semibold tracking-tight text-white/90">
                            {ME.name.split(' ')[0]}
                        </span>
                    </div>

                    {/* Desktop nav */}
                    <nav className="hidden sm:flex items-center gap-1">
                        {['Projects', 'Skills', 'Contact'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`}
                                className="px-3 py-1.5 text-sm text-white/50 hover:text-white/90 transition-colors rounded-md hover:bg-white/5">
                                {item}
                            </a>
                        ))}
                        <a href={`mailto:${ME.email}`}
                            className="ml-2 px-4 py-1.5 text-sm bg-white text-black rounded-md font-medium hover:bg-white/90 transition-colors">
                            Hire me
                        </a>
                    </nav>

                    {/* Mobile hamburger */}
                    <button className="sm:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        <span className={`block w-5 h-px bg-white/70 transition-all duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                        <span className={`block w-5 h-px bg-white/70 transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-5 h-px bg-white/70 transition-all duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                    </button>
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                            className="sm:hidden overflow-hidden border-t border-white/6">
                            <div className="px-4 py-4 flex flex-col gap-1">
                                {['Projects', 'Skills', 'Contact'].map((item) => (
                                    <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                                        className="px-3 py-2.5 text-sm text-white/60 hover:text-white rounded-md hover:bg-white/5 transition-colors">
                                        {item}
                                    </a>
                                ))}
                                <a href={`mailto:${ME.email}`} className="mt-2 px-3 py-2.5 text-sm bg-white text-black rounded-md font-medium text-center">
                                    Hire me
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}

/* ============================================================
   HERO
============================================================ */

function Hero({ imageRef }: { imageRef: React.RefObject<HTMLDivElement> }) {
    return (
        <section className="overflow-hidden w-full pt-20 sm:pt-24 md:min-h-screen md:flex md:items-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-16 md:items-center py-10 md:py-0 gap-10">

                    {/* Image — top on mobile, right on desktop */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex justify-center order-first md:order-last"
                    >
                        <div className="relative p-8 sm:p-10" ref={imageRef}>
                            <div className="absolute inset-4 sm:inset-5 rounded-full border border-white/6" />
                            <div className="absolute inset-0 rounded-full border border-white/3" />
                            <div className="absolute top-6 right-6 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#a3e635] z-10 shadow-[0_0_12px_#a3e63580]" />
                            <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-[260px] md:h-[260px] rounded-full overflow-hidden border border-white/12 shadow-[0_0_60px_rgba(163,230,53,0.08)]">
                                <img src={ME.image} alt={ME.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#111] border border-white/10 rounded-full px-3 py-1.5 whitespace-nowrap z-10">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635]" />
                                <span className="text-[10px] sm:text-xs text-white/60 font-medium">Open to work</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text */}
                    <div className="order-last md:order-first text-center md:text-left">
                        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
                            className="text-xs font-medium uppercase tracking-[0.15em] text-white/35 mb-4 sm:mb-6">
                            Full-Stack Developer
                        </motion.p>
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
                            className="text-[clamp(2.2rem,8vw,4.5rem)] font-bold leading-[1.04] tracking-tight text-white mb-4 sm:mb-6">
                            {ME.name.split(' ').map((word, i) => (
                                <span key={i} className="block">
                                    {i === 1 ? <span className="text-[#a3e635]">{word}</span> : word}
                                </span>
                            ))}
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
                            className="text-sm sm:text-[15px] leading-[1.8] text-white/45 max-w-sm mx-auto md:mx-0 mb-8 sm:mb-10">
                            {ME.bio}
                        </motion.p>
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
                            <a href="#projects" className="px-5 sm:px-6 py-2.5 bg-[#a3e635] text-black text-sm font-semibold rounded-md hover:bg-[#bef264] transition-colors">
                                View Projects
                            </a>
                            <a href={ME.github} target="_blank" rel="noreferrer"
                                className="px-5 sm:px-6 py-2.5 border border-white/15 text-white/70 text-sm rounded-md hover:border-white/30 hover:text-white transition-colors">
                                GitHub ↗
                            </a>
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                            className="flex items-center gap-4 mt-8 sm:mt-10 justify-center md:justify-start">
                            <div className="h-px w-6 bg-white/15" />
                            <a href={ME.github} target="_blank" rel="noreferrer" className="text-[10px] sm:text-xs text-white/30 hover:text-white/70 transition-colors uppercase tracking-widest">GitHub</a>
                            <a href={ME.linkedin} target="_blank" rel="noreferrer" className="text-[10px] sm:text-xs text-white/30 hover:text-white/70 transition-colors uppercase tracking-widest">LinkedIn</a>
                            <a href={`mailto:${ME.email}`} className="text-[10px] sm:text-xs text-white/30 hover:text-white/70 transition-colors uppercase tracking-widest">Email</a>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}

/* ============================================================
   PROJECTS  (click to open modal)
============================================================ */

function Projects({ onOpen }: { onOpen: (p: Project) => void }) {
    return (
        <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-28">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10 sm:mb-14">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/30 mb-3">Portfolio</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Selected Projects</h2>
            </motion.div>

            <div className="flex flex-col gap-3 sm:gap-4">
                {projects.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                        <button
                            onClick={() => onOpen(p)}
                            className="group w-full flex items-center justify-between gap-4 sm:gap-8 p-4 sm:p-6 rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all duration-300 text-left"
                        >
                            <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                                <div className="w-1 h-10 sm:h-12 rounded-full flex-shrink-0" style={{ background: p.color }} />
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                                        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#a3e635] transition-colors">
                                            {p.title}
                                        </h3>
                                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border flex-shrink-0"
                                            style={{ color: p.color, borderColor: `${p.color}40`, background: `${p.color}15` }}>
                                            {p.status}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-white/40 truncate">{p.desc}</p>
                                    {/* Tech — mobile */}
                                    <div className="flex flex-wrap gap-1.5 mt-2 sm:hidden">
                                        {p.tech.map((t) => (
                                            <span key={t} className="text-[10px] px-2 py-0.5 bg-white/6 border border-white/8 rounded text-white/40">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                                {/* Tech — desktop */}
                                <div className="hidden sm:flex flex-wrap gap-2">
                                    {p.tech.map((t) => (
                                        <span key={t} className="text-xs px-2.5 py-1 bg-white/6 border border-white/8 rounded-md text-white/50">{t}</span>
                                    ))}
                                </div>
                                <span className="hidden sm:block text-xs text-white/25">{p.year}</span>
                                {/* "View details" hint */}
                                <span className="flex items-center gap-1.5 text-xs text-white/25 group-hover:text-[#a3e635] transition-colors">
                                    <span className="hidden sm:block">Details</span>
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/12 flex items-center justify-center group-hover:border-[#a3e635] transition-all text-sm">↗</span>
                                </span>
                            </div>
                        </button>
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
        <section id="skills" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-28">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 sm:mb-14">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/30 mb-3">Expertise</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Skills</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-6 sm:gap-y-8">
                {skills.map((skill, i) => (
                    <motion.div key={skill.name} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-white/70">{skill.name}</span>
                            <span className="text-xs text-white/25">{skill.level}%</span>
                        </div>
                        <div className="h-px bg-white/8 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }}
                                transition={{ delay: i * 0.06 + 0.2, duration: 0.8, ease: 'easeOut' }}
                                className="h-full bg-[#a3e635] rounded-full" />
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
        <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-28">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="border border-white/8 rounded-2xl p-8 sm:p-12 md:p-16 text-center bg-white/2">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/30 mb-4">Get in touch</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">Let's Work Together</h2>
                <p className="text-white/40 mb-8 sm:mb-10 max-w-md mx-auto text-sm sm:text-[15px] leading-relaxed">
                    Open to freelance projects and full-time opportunities. If you have an idea, let's build it.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href={`mailto:${ME.email}`}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#a3e635] text-black font-semibold rounded-md text-sm hover:bg-[#bef264] transition-colors text-center">
                        {ME.email}
                    </a>
                    <a href={ME.linkedin} target="_blank" rel="noreferrer"
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 border border-white/15 text-white/60 rounded-md text-sm hover:text-white hover:border-white/30 transition-colors text-center">
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
        <footer className="border-t border-white/6 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-white/20">© 2025 {ME.name}</span>
            <a href="#" className="text-xs text-white/20 hover:text-white/50 transition-colors flex items-center gap-1">
                Back to top ↑
            </a>
        </footer>
    );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function Welcome() {
    const imageRef = useRef<HTMLDivElement>(null);
    const [showAvatar, setShowAvatar] = useState(false);
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setShowAvatar(!entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (imageRef.current) observer.observe(imageRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Head title={`${ME.name} — Portfolio`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=sora:400,500,600,700,800&display=swap" rel="stylesheet" />
            </Head>

            <div className="bg-[#080808] text-white min-h-screen" style={{ fontFamily: "'Sora', sans-serif" }}>
                <Nav showAvatar={showAvatar} />
                <Hero imageRef={imageRef} />
                <Projects onOpen={setActiveProject} />
                <Skills />
                <Contact />
                <Footer />
            </div>

            {/* Project detail modal */}
            <AnimatePresence>
                {activeProject && (
                    <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
                )}
            </AnimatePresence>
        </>
    );
}