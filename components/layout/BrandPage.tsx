"use client";

import { motion, useReducedMotion } from "framer-motion";

const heroCards = [
  { title: "Systems", tone: "bg-white/80" },
  { title: "Ideas", tone: "bg-lavender" },
  { title: "Impact", tone: "bg-white/70" },
  { title: "Experiments", tone: "bg-white/80" },
  { title: "Learning", tone: "bg-lavender/70" },
];

const aboutCards = [
  {
    title: "Who I Am",
    body: "I’m a software engineer who cares about turning ideas into systems that actually hold up in the real world.\n\nI focus on clarity, tradeoffs, and building things that survive real usage—not just demos.",
  },
  {
    title: "How I Work",
    body: "I prefer thoughtful decisions over rushed code, and simple systems over clever ones.\n\nI believe good engineering is calm, intentional, and honest about constraints.",
  },
  {
    title: "Why This Site",
    body: "This site is a living record of my work, experiments, and thinking.\n\nNot to impress—but to show how I approach problems and grow through building.",
  },
];

const whatIDoCards = [
  {
    title: "Systems Engineering",
    description:
      "Designing and building systems that are reliable, understandable, and maintainable.",
  },
  {
    title: "Product Thinking",
    description: "Translating vague ideas into concrete, usable software with real-world impact.",
  },
  {
    title: "Experimentation",
    description: "Exploring ideas through side projects, prototypes, and controlled chaos.",
  },
];

export function BrandPage() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    show: { opacity: 1, y: 0 },
  };

  const float = (index: number) => ({
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : index * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  });

  return (
    <div className="space-y-20">
      <section className="space-y-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Software Engineering
            </p>
            <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
              Hello, I’m Zaid. I build software that turns ideas into impact.
            </h1>
            <motion.p
              className="text-lg text-slate-600"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: [0, -6, 0],
                      rotate: [0, -1, 0],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              “I help ideas, products, and systems explode in impact — responsibly.”
            </motion.p>
            <p className="text-base text-slate-500">
              Clear thinking. Real-world systems. Thoughtful execution.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-soft">
                Contact Me
              </button>
              <button className="rounded-full border border-white/80 bg-white/80 px-6 py-3 text-sm font-semibold text-ink">
                View Work
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { title: "Availability", detail: "Now booking Q2" },
                { title: "Focus", detail: "Products & platforms" },
                { title: "Response", detail: "Within 24 hours" },
              ].map((item) => (
                <div
                  className="rounded-2xl border border-white/80 bg-white/90 p-4 text-sm text-slate-600 shadow-soft"
                  key={item.title}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.title}</p>
                  <p className="mt-2 font-semibold text-ink">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="relative grid gap-4 sm:grid-cols-2">
            {heroCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial="hidden"
                animate="show"
                variants={float(index)}
                className={`rounded-3xl ${card.tone} p-6 shadow-soft`}
                style={!prefersReducedMotion ? { transform: `translateY(${index % 2 === 0 ? -6 : 6}px)` } : undefined}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{card.title}</p>
                <p className="mt-6 text-2xl font-semibold text-ink">{card.title}</p>
                <p className="mt-3 text-sm text-slate-500">
                  Structured depth for {card.title.toLowerCase()} and decision clarity.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">About</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">A calm, credible introduction.</h2>
        </motion.div>
        <div className="grid gap-6 lg:grid-cols-3">
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-soft"
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{card.title}</p>
              <p className="mt-4 text-xl font-semibold text-ink">{card.title}</p>
              <p className="mt-3 whitespace-pre-line text-sm text-slate-600">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">What I Do</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">
            Think. Make. Solve.
          </h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {whatIDoCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
              className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-soft"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender text-accent">
                <span className="text-lg font-semibold">{index + 1}</span>
              </div>
              <p className="mt-5 text-xl font-semibold text-ink">{card.title}</p>
              <p className="mt-3 text-sm text-slate-600">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
