import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface Props {
    projectId: number | string;
}
// ----- Types -----
type ProjectDetail = {
    overview: string;
    challenge: string;
    solution: string;
    features: string[];
};

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
    detail: ProjectDetail;
};

/* ============================================================
   PROJECT DETAIL PAGE
   Route: /projects/{id}
   Laravel: Route::get('/projects/{id}', fn($id) => inertia('ProjectShow', ['projectId' => $id]));
   
   Pass the `project` prop from your controller, or use the
   static data below while you wire up the backend.
============================================================ */

/* ── Static data (remove once you have a real backend) ── */
const ALL_PROJECTS: Project[] = [
    {
        id: 1,
        title: 'ShelfSmart',
        tagline: 'Smart inventory for retail shops',
        desc: 'Smart inventory system to track stock, expiry and reduce waste in retail shops.',
        tech: ['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
        year: '2024',
        status: 'Live',
        color: '#16a34a',
        github: 'https://github.com/',
        live: 'https://shelfsmart.example.com',
        detail: {
            overview:
                'ShelfSmart helps retail shop owners track their inventory in real time, flag near-expiry products, and reduce wastage through automated alerts and smart reorder suggestions.',
            challenge:
                'Small retail shops often lose significant margin to expired or overstocked goods. Manual tracking is error-prone and time-consuming, and off-the-shelf solutions are too expensive or complex for small operators.',
            solution:
                'A dashboard-driven system with barcode scanning support, expiry calendars, and SMS/email alerts when stock hits threshold levels. Designed to be intuitive enough for a non-technical shop owner.',
            features: [
                'Barcode scanner integration via USB/mobile camera',
                'Expiry date tracking with colour-coded urgency',
                'Automated SMS & email alerts at custom thresholds',
                'Multi-user roles (owner, staff, viewer)',
                'Stock reorder suggestions based on sales velocity',
                'Export reports to PDF & CSV',
            ],
        },
    },
    {
        id: 2,
        title: 'ResQit',
        tagline: 'Rescue near-expiry food',
        desc: 'Platform to sell near-expiry products with discounts from local shops.',
        tech: ['React Native', 'Laravel API', 'MySQL', 'Firebase'],
        year: '2024',
        status: 'In Progress',
        color: '#ea580c',
        github: 'https://github.com/',
        live: null,
        detail: {
            overview:
                'ResQit connects local shops with consumers looking for discounted near-expiry goods — reducing food waste while letting shops recover margin on stock that would otherwise be thrown away.',
            challenge:
                'Tonnes of food are discarded daily because shops cannot shift near-expiry stock in time. Consumers have no single place to discover these deals, and shops lack simple tools to list them quickly.',
            solution:
                'A mobile-first two-sided marketplace where shops list discounted items in seconds and consumers browse by category, location, and expiry window. Notifications fire when deals appear nearby.',
            features: [
                'Separate shop & consumer apps (React Native)',
                'Real-time listing updates via WebSocket',
                'Location-based discovery with map view',
                'In-app chat between shop and buyer',
                'Order creation and pickup confirmation',
                'Push notifications for nearby deals',
            ],
        },
    },
    {
        id: 3,
        title: 'Condominium System',
        tagline: 'End-to-end condo management',
        desc: 'Full management system with roles, buildings, and resident management.',
        tech: ['Laravel', 'Inertia.js', 'React', 'Tailwind CSS', 'MySQL'],
        year: '2023',
        status: 'Live',
        color: '#7c3aed',
        github: 'https://github.com/',
        live: 'https://condo.example.com',
        detail: {
            overview:
                'A full-featured condominium management platform covering resident registration, facility booking, maintenance requests, billing, and announcements — all in one place.',
            challenge:
                'Condo managers were juggling spreadsheets, WhatsApp groups, and manual billing cycles. Residents had zero visibility into their accounts, pending requests, or facility availability.',
            solution:
                'A role-based web platform where management and residents each have tailored dashboards. Billing is automated, maintenance tickets are tracked end-to-end, and facilities can be booked online.',
            features: [
                'Role-based access (super-admin, building manager, resident)',
                'Facility booking with calendar conflict detection',
                'Maintenance ticket system with status tracking',
                'Automated monthly billing & payment recording',
                'Announcements & notice board',
                'Multi-building support under one account',
            ],
        },
    },
];

/* ============================================================
   SUB-COMPONENTS
============================================================ */

function BackButton() {
    return (
        <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-white/70 transition-colors group"
        >
            <span className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center group-hover:border-white/35 transition-colors text-xs">
                ←
            </span>
            Back to portfolio
        </Link>
    );
}

function StatusBadge({ status, color }: { status: string; color: string }) {
    return (
        <span
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border"
            style={{ color, borderColor: `${color}50`, background: `${color}15` }}
        >
            <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                    background: color,
                    boxShadow: status === 'Live' ? `0 0 6px ${color}` : 'none',
                }}
            />
            {status}
        </span>
    );
}

/* ============================================================
   MAIN PAGE
============================================================ */

/**
 * Props:
 *   project  — pass the full project object from your Laravel controller.
 *              Falls back to static data for development.
 *   projectId — alternatively pass just the ID and we look it up locally.
 */
export default function ProjectShow({ projectId }: Props) {
    // ...

export default function ProjectShow({ project, projectId }: { project?: Project; projectId?: string | number }) {
    // Use passed project OR look up from static data by ID
    const data = project ?? ALL_PROJECTS.find((p) => p.id === Number(projectId)) ?? ALL_PROJECTS[0];

    const fadeUp = {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    };

    const stagger = (i: number) => ({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.08, duration: 0.5 },
    });

    return (
        <>
            <Head title={`${data.title} — Mithusanth`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=sora:400,500,600,700,800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="bg-[#080808] text-white min-h-screen" style={{ fontFamily: "'Sora', sans-serif" }}>

                {/* ── Thin top accent line ── */}
                <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${data.color}, transparent)` }} />

                {/* ── Nav bar ── */}
                <div className="border-b border-white/6 bg-[#080808]/90 backdrop-blur sticky top-0 z-50">
                    <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
                        <BackButton />
                        <StatusBadge status={data.status} color={data.color} />
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-6 py-16">

                    {/* ── Hero block ── */}
                    <motion.div {...fadeUp} className="mb-20">
                        <div className="flex items-start justify-between gap-8 mb-6">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/25 mb-3">
                                    {data.year} · Case Study
                                </p>
                                <h1
                                    className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.06] tracking-tight"
                                    style={{ color: '#fff' }}
                                >
                                    {data.title}
                                </h1>
                                <p className="text-lg text-white/40 mt-3 font-medium">{data.tagline}</p>
                            </div>
                        </div>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2 mt-8">
                            {data.tech.map((t) => (
                                <span
                                    key={t}
                                    className="text-xs px-3 py-1.5 border rounded-md font-medium"
                                    style={{
                                        borderColor: `${data.color}40`,
                                        color: data.color,
                                        background: `${data.color}0f`,
                                    }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Action links */}
                        {(data.github || data.live) && (
                            <div className="flex gap-3 mt-8">
                                {data.github && (
                                    <a
                                        href={data.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/12 text-white/60 text-sm rounded-md hover:border-white/25 hover:text-white transition-colors"
                                    >
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                        </svg>
                                        View Source
                                    </a>
                                )}
                                {data.live && (
                                    <a
                                        href={data.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-md font-semibold transition-colors"
                                        style={{ background: data.color, color: '#000' }}
                                    >
                                        Live Site ↗
                                    </a>
                                )}
                            </div>
                        )}
                    </motion.div>

                    {/* ── Divider ── */}
                    <div className="h-px bg-white/6 mb-20" />

                    {/* ── Content sections ── */}
                    <div className="flex flex-col gap-20">

                        {/* Overview */}
                        <motion.div {...stagger(0)}>
                            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-white/25 mb-5">
                                Overview
                            </h2>
                            <p className="text-[17px] leading-[1.85] text-white/60">
                                {data.detail.overview}
                            </p>
                        </motion.div>

                        {/* Challenge + Solution side by side */}
                        <div className="grid grid-cols-2 gap-10">
                            <motion.div {...stagger(1)}>
                                <div
                                    className="w-8 h-1 rounded-full mb-5"
                                    style={{ background: data.color }}
                                />
                                <h2 className="text-sm font-semibold text-white mb-4">The Challenge</h2>
                                <p className="text-[15px] leading-[1.8] text-white/45">
                                    {data.detail.challenge}
                                </p>
                            </motion.div>

                            <motion.div {...stagger(2)}>
                                <div className="w-8 h-1 rounded-full mb-5 bg-white/20" />
                                <h2 className="text-sm font-semibold text-white mb-4">The Solution</h2>
                                <p className="text-[15px] leading-[1.8] text-white/45">
                                    {data.detail.solution}
                                </p>
                            </motion.div>
                        </div>

                        {/* Features */}
                        <motion.div {...stagger(3)}>
                            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-white/25 mb-8">
                                Key Features
                            </h2>
                            <ul className="grid grid-cols-2 gap-3">
                                {data.detail.features.map((f, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -12 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.07 }}
                                        className="flex items-start gap-3 p-4 rounded-lg border border-white/6 bg-white/2"
                                    >
                                        <span
                                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                            style={{ background: data.color }}
                                        />
                                        <span className="text-sm text-white/55 leading-relaxed">{f}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                    </div>

                    {/* ── Divider ── */}
                    <div className="h-px bg-white/6 mt-20 mb-16" />

                    {/* ── Other projects ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-white/25 mb-8">
                            Other Projects
                        </h2>
                        <div className="flex flex-col gap-3">
                            {ALL_PROJECTS.filter((p) => p.id !== data.id).map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/projects/${p.id}`}
                                    className="group flex items-center justify-between p-5 rounded-xl border border-white/6 bg-white/2 hover:bg-white/5 hover:border-white/12 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: p.color }} />
                                        <div>
                                            <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                                                {p.title}
                                            </div>
                                            <div className="text-xs text-white/30 mt-0.5">{p.tagline}</div>
                                        </div>
                                    </div>
                                    <span className="text-white/20 group-hover:text-white/60 transition-colors text-sm">→</span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Footer CTA ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 text-center py-16 border border-white/6 rounded-2xl bg-white/2"
                    >
                        <p className="text-white/30 text-sm mb-4">Interested in working together?</p>
                        <a
                            href="mailto:mithusanth@gmail.com"
                            className="inline-flex items-center gap-2 px-8 py-3 text-black text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
                            style={{ background: data.color }}
                        >
                            Get in touch →
                        </a>
                    </motion.div>

                </div>
            </div>
        </>
    );
}