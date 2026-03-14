import Link from "next/link";
import { ArrowRight, Orbit, Sparkles } from "lucide-react";

const pillars = [
  {
    label: "Build",
    title: "Turn parts into a working machine.",
    text: "Robotics 101 begins with real construction. Students learn that engineering is not magic. It is structure, wiring, assembly, and careful decisions that create motion.",
  },
  {
    label: "Move",
    title: "See movement become understandable.",
    text: "Instead of treating robots like black boxes, the event shows how motors, wheels, balance, and control work together to produce behavior you can test and improve.",
  },
  {
    label: "Sense",
    title: "Discover how robots read the world.",
    text: "As the event progresses, students move from basic motion into sensing, reaction, and autonomy, building toward robots that can respond to their environment.",
  },
  {
    label: "Think",
    title: "Learn systems, not just gadgets.",
    text: "Every activity is designed to teach how parts connect into a system: controller, power, movement, sensors, and the logic that links them.",
  },
  {
    label: "Create",
    title: "Build confidence through making.",
    text: "Robotics 101 is not about watching technology from a distance. It is about getting close enough to build it, drive it, question it, and understand it.",
  },
];

const outcomes = [
  "Hands-on engineering that feels exciting, not intimidating.",
  "A clearer understanding of how real robots are built and controlled.",
  "Confidence through testing, problem-solving, and visible progress.",
  "A learning experience that blends creativity, mechanics, logic, and challenge.",
];

const experienceMoments = [
  "Assemble real robot hardware and see how subsystems connect.",
  "Explore movement through direct control and practical driving tasks.",
  "Progress from simple action to smarter robotic behavior over time.",
  "Experience robotics as something you can create, not just observe.",
];

const dayOnePreview = [
  "Welcome & Introduction to Robotics",
  "Robot Kit Introduction",
  "Guided Robot Assembly",
  "First Robot Activation",
];

export function EventLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(87,214,255,0.12),transparent_28%),linear-gradient(180deg,#07111f_0%,#050814_42%,#04070c_100%)] text-white">
      <section className="relative px-6 py-8 md:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-35" />
        <div className="mx-auto flex min-h-screen max-w-[92rem] flex-col justify-between">
          <header className="relative z-10 flex items-center justify-between gap-4 py-4">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.36em] text-cyan-200/70">Robotics Event Experience</p>
              <h1 className="mt-2 font-display text-2xl uppercase leading-none md:text-3xl">Robotics 101</h1>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/day-01"
                className="rounded-full border border-cyan-300/40 bg-cyan-300/12 px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-cyan-50"
              >
                Explore Day 01
              </Link>
            </div>
          </header>

          <div className="relative z-10 grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-0">
            <div className="space-y-8">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.4em] text-cyan-200/70">Promotional Showcase</p>
              <div className="space-y-6">
                <h2 className="max-w-5xl font-display text-6xl uppercase leading-[0.88] md:text-8xl">
                  Step into robotics as something you can build, drive, and understand.
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                  Robotics 101 is an immersive introduction to real robotic systems. It turns curiosity into action by letting students explore movement, machine structure, sensing, and engineering thinking through hands-on experience.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/day-01"
                  className="inline-flex items-center gap-3 rounded-full border border-cyan-300/45 bg-cyan-300/12 px-6 py-3 font-mono text-xs uppercase tracking-[0.24em] text-cyan-50 transition hover:bg-cyan-300/18"
                >
                  Enter Day 01
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,20,34,0.95),rgba(5,10,16,0.92))] p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(87,214,255,0.22),transparent_36%)]" />
              <div className="relative flex min-h-[32rem] flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.26em] text-slate-300">
                    Event Promise
                  </span>
                  <Orbit className="h-8 w-8 text-cyan-200/80" />
                </div>
                <div className="space-y-4">
                  <p className="font-display text-5xl uppercase leading-none">Learn the machine by getting your hands on it.</p>
                  <p className="max-w-md text-base leading-7 text-slate-300">
                    This event is designed to make robotics feel real, technical, and achievable. Students do not just hear how robots work. They see it, build it, test it, and improve it.
                  </p>
                </div>
                <div className="grid gap-3">
                  {dayOnePreview.map((item, index) => (
                    <div key={item} className="flex items-center justify-between rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-3">
                      <span className="font-mono text-[0.64rem] uppercase tracking-[0.28em] text-cyan-200/70">0{index + 1}</span>
                      <span className="font-display text-xl uppercase">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[92rem]">
          <div className="mb-8 max-w-3xl">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.34em] text-cyan-200/70">Robotics Pillars</p>
            <h3 className="mt-4 font-display text-5xl uppercase leading-[0.9]">Robotics 101 is built around the ideas that make the field come alive.</h3>
          </div>
          <div className="grid gap-6 lg:grid-cols-5">
            {pillars.map((item, index) => (
              <article
                key={item.label}
                className={
                  index === 2
                    ? "rounded-[2.3rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-7"
                    : "rounded-[2.3rem] border border-white/10 bg-white/[0.03] p-7"
                }
              >
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-cyan-200/70">{item.label}</p>
                <h3 className="mt-5 font-display text-4xl uppercase leading-none">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[92rem] gap-8 rounded-[2.8rem] border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(87,214,255,0.07),rgba(255,155,98,0.06))] p-8 lg:grid-cols-[0.92fr_1.08fr] lg:p-10">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.34em] text-slate-400">Why It Matters</p>
            <h3 className="mt-5 font-display text-5xl uppercase leading-[0.9]">This is where engineering starts to feel personal, visible, and exciting.</h3>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Robotics 101 gives students a way to understand technology from the inside out. They do not just interact with finished systems. They learn how systems are made, why they behave the way they do, and how to improve them.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {outcomes.map((item, index) => (
              <div key={item} className="rounded-[1.4rem] border border-white/10 bg-slate-950/45 px-4 py-4">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-cyan-200/70">Outcome {index + 1}</p>
                <p className="mt-3 font-display text-2xl uppercase leading-none">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[92rem] gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2.8rem] border border-white/10 bg-white/[0.03] p-8 lg:p-10">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.34em] text-cyan-200/70">Event Experience</p>
            <h3 className="mt-4 font-display text-5xl uppercase leading-[0.9]">Robotics 101 is designed to be felt, not just explained.</h3>
            <div className="mt-8 grid gap-4">
              {experienceMoments.map((item, index) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 px-5 py-4">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-200/70">Experience 0{index + 1}</p>
                  <p className="mt-3 text-lg leading-7 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.8rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-8 lg:p-10">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.34em] text-cyan-100/75">Featured Chapter</p>
            <h3 className="mt-4 font-display text-5xl uppercase leading-[0.9]">Day 01 opens the event by teaching the language of motion.</h3>
            <p className="mt-5 text-lg leading-8 text-cyan-50/88">
              The first chapter of Robotics 101 is all about meeting the machine. Students learn the major parts of a robot, assemble the platform, activate movement, and begin driving with purpose.
            </p>
            <p className="mt-5 text-base leading-7 text-cyan-50/80">
              It is the perfect entry point because it turns robotics into something immediate and understandable. Once students feel movement in their hands, the rest of the event has a strong foundation to build on.
            </p>
            <Link
              href="/day-01"
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-cyan-300/45 bg-slate-950/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.24em] text-cyan-50"
            >
              Launch Day 01
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[92rem] flex-col items-start justify-between gap-8 rounded-[2.8rem] border border-white/10 bg-white/[0.03] p-8 lg:flex-row lg:items-end lg:p-10">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.34em] text-cyan-200/70">Closing Signal</p>
            <h3 className="mt-4 font-display text-5xl uppercase leading-[0.9]">Robotics 101 is where curiosity becomes engineering action.</h3>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              For students who want to understand real machines, real systems, and real problem-solving, this event creates a strong first step into robotics without losing the sense of wonder that makes the field exciting.
            </p>
          </div>
          <Link
            href="/day-01"
            className="inline-flex items-center gap-3 rounded-full border border-cyan-300/45 bg-cyan-300/12 px-6 py-3 font-mono text-xs uppercase tracking-[0.24em] text-cyan-50"
          >
            Start with Day 01
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
