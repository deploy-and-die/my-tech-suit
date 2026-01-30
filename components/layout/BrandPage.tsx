"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const heroCards = [
  { title: "Systems", tone: "bg-gradient-to-br from-accentLight/40 via-white to-white/90" },
  { title: "Ideas", tone: "bg-gradient-to-br from-lavender/60 to-white" },
  { title: "Impact", tone: "bg-gradient-to-br from-white to-accent/30" },
  { title: "Experiments", tone: "bg-gradient-to-br from-white via-lavender/40 to-accentLight/30" },
  { title: "Learning", tone: "bg-gradient-to-br from-lavender/70 to-white" },
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

  const waveAnimation = (index: number, baseDelay = 0) =>
    prefersReducedMotion
      ? undefined
      : {
          y: [0, -8, 0],
          transition: {
            duration: 4.5,
            repeat: Infinity,
            repeatType: "mirror",
            delay: baseDelay + index * 0.4,
            ease: "easeInOut",
          },
        };

  return (
    <div className="space-y-12 pt-12">
      <section className="space-y-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Software for humans</p>
            <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
              Hi, I’m Zaid. I’m an engineer who cares about thoughtful products and the people using them.
            </h1>
            <motion.p
              className="text-lg font-medium text-ink"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      backgroundPosition: ["0% 50%", "100% 50%"],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }
              }
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      backgroundImage: "linear-gradient(120deg, #1f1f3a, #c8b6ff, #b8c0ff, #1f1f3a)",
                      backgroundSize: "220% 220%",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }
              }
            >
              “I help ideas, products, and systems grow into meaningful impact, responsibly.”
            </motion.p>
            <p className="text-base text-slate-500">
              I ship calm, well-considered software that’s grounded in real conversations, not buzzwords.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                className="rounded-full bg-accentDark px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-ink"
                href="/contact"
              >
                Contact Me
              </Link>
              <Link
                className="rounded-full border border-accent/60 px-6 py-3 text-sm font-semibold text-accent transition hover:border-accentDark hover:text-accentDark"
                href="/work"
              >
                View Work
              </Link>
            </div>
          </motion.div>
          <div className="relative grid gap-4 sm:grid-cols-2">
            {heroCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial="hidden"
                animate={
                  prefersReducedMotion
                    ? "show"
                    : {
                        opacity: 1,
                        y: 0,
                        scale: [1, 1.05, 1],
                      }
                }
                variants={float(index)}
                className={`rounded-3xl ${card.tone} p-6 shadow-soft`}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.6, ease: "easeOut", delay: index * 0.1 }
                    : {
                        duration: 4,
                        repeat: Infinity,
                        repeatDelay: 0.6,
                        delay: 1 + index * 0.7,
                        ease: "easeInOut",
                      }
                }
                style={!prefersReducedMotion ? { transformOrigin: "center" } : undefined}
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
              className="rounded-3xl border border-accent/20 bg-white/80 p-6 shadow-soft"
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              animate={waveAnimation(index)}
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
              className="rounded-3xl border border-accent/20 bg-white/85 p-6 shadow-soft"
              animate={waveAnimation(index, 0.5)}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender/80 text-accentDark">
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
