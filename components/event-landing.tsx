import Link from "next/link";
import { ArrowRight, Orbit, Sparkles } from "lucide-react";

const pillars = [
  {
    label: "Build",
    title: "Turn parts into a working machine.",
    text: "Build a real robot and watch it come alive.",
  },
  {
    label: "Move",
    title: "See movement become understandable.",
    text: "See how motors, wheels, and control create real movement.",
  },
  {
    label: "Sense",
    title: "Discover how robots read the world.",
    text: "See how robots react to the world around them.",
  },
  {
    label: "Think",
    title: "Learn systems, not just gadgets.",
    text: "See how power, control, movement, and sensors work together.",
  },
  {
    label: "Create",
    title: "Build confidence through making.",
    text: "Create, test, fix, and improve your machine.",
  },
];

const outcomes = [
  "Build confidence by making a robot move.",
  "Learn how robots are built and controlled.",
  "Think like an engineer while solving real problems.",
  "Have fun with robotics in an active, creative way.",
];

const experienceMoments = [
  "Build a robot with your own hands.",
  "Drive it, test it, and fix fast.",
  "Take on challenges that make movement feel real.",
  "See robotics as something you can actually do.",
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
      <section className="relative px-4 py-6 sm:px-6 md:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-35" />
        <div className="mx-auto flex min-h-screen max-w-[92rem] flex-col justify-between">
          <header className="relative z-10 flex items-center justify-between gap-4 py-3 sm:py-4">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-cyan-200/70 sm:text-[0.68rem] sm:tracking-[0.36em]">Robotics Event Experience</p>
              <h1 className="mt-2 font-display text-xl uppercase leading-none sm:text-2xl md:text-3xl">Robotics 101</h1>
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

          <div className="relative z-10 grid flex-1 items-center gap-8 py-8 sm:gap-10 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-0">
            <div className="space-y-6 sm:space-y-8">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-cyan-200/70 sm:text-[0.72rem] sm:tracking-[0.4em]">Promotional Showcase</p>
              <div className="space-y-4 sm:space-y-6">
                <h2 className="max-w-5xl font-display text-4xl uppercase leading-[0.92] sm:text-5xl md:text-6xl lg:text-8xl lg:leading-[0.88]">
                  Build it. Drive it. Make it move.
                </h2>
                <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 md:text-xl">
                  Robotics 101 is a hands-on robotics experience for kids and high school students who want to build, drive, and understand real machines.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/day-01"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-cyan-300/45 bg-cyan-300/12 px-5 py-3 font-mono text-xs uppercase tracking-[0.24em] text-cyan-50 transition hover:bg-cyan-300/18 sm:w-auto sm:px-6"
                >
                  Enter Day 01
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,20,34,0.95),rgba(5,10,16,0.92))] p-5 sm:rounded-[2.4rem] sm:p-6 lg:rounded-[2.8rem] lg:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(87,214,255,0.22),transparent_36%)]" />
              <div className="relative flex min-h-[24rem] flex-col justify-between gap-6 sm:min-h-[28rem] lg:min-h-[32rem]">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-white/10 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-slate-300 sm:px-4 sm:text-[0.65rem] sm:tracking-[0.26em]">
                    Event Promise
                  </span>
                  <Orbit className="h-6 w-6 shrink-0 text-cyan-200/80 sm:h-8 sm:w-8" />
                </div>
                <div className="space-y-4">
                  <p className="font-display text-3xl uppercase leading-none sm:text-4xl lg:text-5xl">Get hands-on with a real robot.</p>
                  <p className="max-w-md text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                    This event makes robotics feel real from the start. You build it, test it, and see what each part does.
                  </p>
                </div>
                <div className="grid gap-3">
                  {dayOnePreview.map((item, index) => (
                    <div key={item} className="flex flex-col gap-2 rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-cyan-200/70 sm:text-[0.64rem] sm:tracking-[0.28em]">0{index + 1}</span>
                      <span className="font-display text-lg uppercase leading-tight sm:text-xl">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[92rem]">
          <div className="mb-8 max-w-3xl">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-200/70 sm:text-[0.68rem] sm:tracking-[0.34em]">Robotics Pillars</p>
            <h3 className="mt-4 font-display text-3xl uppercase leading-[0.95] sm:text-4xl lg:text-5xl lg:leading-[0.9]">The event is built around five big robotics ideas.</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-5">
            {pillars.map((item, index) => (
              <article
                key={item.label}
                className={
                  index === 2
                    ? "rounded-[1.8rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-5 sm:rounded-[2.1rem] sm:p-6 lg:rounded-[2.3rem] lg:p-7"
                    : "rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5 sm:rounded-[2.1rem] sm:p-6 lg:rounded-[2.3rem] lg:p-7"
                }
              >
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-200/70 sm:text-[0.68rem] sm:tracking-[0.32em]">{item.label}</p>
                <h3 className="mt-4 font-display text-2xl uppercase leading-none sm:text-3xl lg:mt-5 lg:text-4xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300 sm:mt-4 sm:text-base sm:leading-7">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[92rem] gap-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(87,214,255,0.07),rgba(255,155,98,0.06))] p-5 sm:gap-8 sm:rounded-[2.4rem] sm:p-8 lg:rounded-[2.8rem] lg:p-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-slate-400 sm:text-[0.68rem] sm:tracking-[0.34em]">Why It Matters</p>
            <h3 className="mt-4 font-display text-3xl uppercase leading-[0.95] sm:text-4xl lg:mt-5 lg:text-5xl lg:leading-[0.9]">Engineering gets real here.</h3>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
              Students do not just watch robots. They build them, control them, and learn how they work.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {outcomes.map((item, index) => (
              <div key={item} className="rounded-[1.2rem] border border-white/10 bg-slate-950/45 px-4 py-4 sm:rounded-[1.4rem]">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.26em] text-cyan-200/70 sm:text-[0.62rem] sm:tracking-[0.3em]">Outcome {index + 1}</p>
                <p className="mt-3 font-display text-xl uppercase leading-tight sm:text-2xl sm:leading-none">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[92rem] gap-6 sm:gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:rounded-[2.4rem] sm:p-8 lg:rounded-[2.8rem] lg:p-10">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-200/70 sm:text-[0.68rem] sm:tracking-[0.34em]">Event Experience</p>
            <h3 className="mt-4 font-display text-3xl uppercase leading-[0.95] sm:text-4xl lg:text-5xl lg:leading-[0.9]">Robotics 101 is built for action.</h3>
            <div className="mt-6 grid gap-4 sm:mt-8">
              {experienceMoments.map((item, index) => (
                <div key={item} className="rounded-[1.2rem] border border-white/10 bg-slate-950/45 px-4 py-4 sm:rounded-[1.5rem] sm:px-5">
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-cyan-200/70 sm:text-[0.62rem] sm:tracking-[0.28em]">Experience 0{index + 1}</p>
                  <p className="mt-3 text-base leading-7 text-slate-200 sm:text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-5 sm:rounded-[2.4rem] sm:p-8 lg:rounded-[2.8rem] lg:p-10">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-100/75 sm:text-[0.68rem] sm:tracking-[0.34em]">Featured Chapter</p>
            <h3 className="mt-4 font-display text-3xl uppercase leading-[0.95] sm:text-4xl lg:text-5xl lg:leading-[0.9]">Day 01 starts with motion.</h3>
            <p className="mt-4 text-base leading-7 text-cyan-50/88 sm:mt-5 sm:text-lg sm:leading-8">
              Day 01 is where students meet the robot, build the base, power it on, and start driving.
            </p>
            <p className="mt-4 text-sm leading-6 text-cyan-50/80 sm:mt-5 sm:text-base sm:leading-7">
              It is the perfect starting point because movement makes robotics click fast.
            </p>
            <Link
              href="/day-01"
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full border border-cyan-300/45 bg-slate-950/30 px-5 py-3 font-mono text-xs uppercase tracking-[0.24em] text-cyan-50 sm:mt-8 sm:w-auto sm:px-6"
            >
              Launch Day 01
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[92rem] flex-col items-start justify-between gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:gap-8 sm:rounded-[2.4rem] sm:p-8 lg:flex-row lg:items-end lg:rounded-[2.8rem] lg:p-10">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-200/70 sm:text-[0.68rem] sm:tracking-[0.34em]">Closing Signal</p>
            <h3 className="mt-4 font-display text-3xl uppercase leading-[0.95] sm:text-4xl lg:text-5xl lg:leading-[0.9]">Robotics 101 turns curiosity into action.</h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              For kids and high school students, it is a fun first step into building, driving, and thinking like a roboticist.
            </p>
          </div>
          <Link
            href="/day-01"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-cyan-300/45 bg-cyan-300/12 px-5 py-3 font-mono text-xs uppercase tracking-[0.24em] text-cyan-50 sm:w-auto sm:px-6"
          >
            Start with Day 01
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
