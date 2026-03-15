import Link from "next/link";
import { ArrowRight, Orbit, Sparkles } from "lucide-react";

const pillars = [
  {
    number: "01",
    label: "Build",
    title: "Build the machine.",
    text: "Turn parts into a robot you can control.",
  },
  {
    number: "02",
    label: "Move",
    title: "Make motion click.",
    text: "See how motors and wheels create movement.",
  },
  {
    number: "03",
    label: "Sense",
    title: "Teach it to sense.",
    text: "See how robots detect and react around them.",
  },
  {
    number: "04",
    label: "Think",
    title: "Think in systems.",
    text: "See how power, control, and motion connect.",
  },
  {
    number: "05",
    label: "Create",
    title: "Create with confidence.",
    text: "Test, fix, and improve your own robot.",
  },
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
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_0%,rgba(87,214,255,0.16),transparent_26%),radial-gradient(circle_at_80%_18%,rgba(255,155,98,0.08),transparent_20%),linear-gradient(180deg,#07111f_0%,#050814_42%,#04070c_100%)] text-white">
      <section className="relative px-4 py-5 sm:px-6 md:px-10 lg:px-16">
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
                className="rounded-full border border-cyan-300/40 bg-cyan-300/12 px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-cyan-50 shadow-[0_0_30px_rgba(87,214,255,0.12)] transition hover:border-cyan-200/55 hover:bg-cyan-300/18"
              >
                Explore Day 01
              </Link>
            </div>
          </header>

          <div className="relative z-10 grid flex-1 items-center gap-6 py-8 sm:gap-8 sm:py-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:py-0">
            <div className="space-y-5 sm:space-y-7">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-cyan-200/70 sm:text-[0.72rem] sm:tracking-[0.4em]">Promotional Showcase</p>
              <div className="space-y-4 sm:space-y-6">
                <h2 className="max-w-5xl break-words font-display text-[2.1rem] uppercase leading-[0.92] sm:text-5xl md:text-6xl lg:text-8xl lg:leading-[0.88]">
                  Build it. Drive it. Make it move.
                </h2>
                <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 md:text-xl">
                  Robotics 101 is a hands-on robotics experience where you build, drive, and understand real machines.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/day-01"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-cyan-300/45 bg-cyan-300/12 px-5 py-3 font-mono text-xs uppercase tracking-[0.24em] text-cyan-50 shadow-[0_0_40px_rgba(87,214,255,0.1)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/55 hover:bg-cyan-300/18 sm:w-auto sm:px-6"
                >
                  Enter Day 01
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,20,34,0.96),rgba(5,10,16,0.94))] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)] ring-1 ring-white/5 sm:rounded-[2.2rem] sm:p-6 lg:rounded-[2.4rem] lg:p-7">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(87,214,255,0.22),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.045),transparent_30%,transparent_70%,rgba(255,255,255,0.02))]" />
              <div className="relative flex min-h-[21rem] flex-col justify-between gap-5 sm:min-h-[28rem] lg:min-h-[32rem]">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-white/10 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-slate-300 sm:px-4 sm:text-[0.65rem] sm:tracking-[0.26em]">
                    Event Promise
                  </span>
                  <Orbit className="h-6 w-6 shrink-0 text-cyan-200/80 sm:h-8 sm:w-8" />
                </div>
                <div className="space-y-4">
                  <p className="break-words font-display text-[1.9rem] uppercase leading-[0.95] sm:text-4xl sm:leading-none lg:text-5xl">Get hands-on with a real robot.</p>
                  <p className="max-w-md text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                    This event makes robotics feel real from the start. You build it, test it, and see what each part does.
                  </p>
                </div>
                <div className="grid gap-2.5 sm:gap-3">
                  {dayOnePreview.map((item, index) => (
                    <div key={item} className="flex flex-col gap-2 rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:border-white/20 hover:bg-white/[0.07] sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-cyan-200/70 sm:text-[0.64rem] sm:tracking-[0.28em]">0{index + 1}</span>
                      <span className="break-words font-display text-base uppercase leading-tight sm:text-xl">{item}</span>
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
          <div className="mb-6 max-w-3xl sm:mb-8">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-200/70 sm:text-[0.68rem] sm:tracking-[0.34em]">Robotics Pillars</p>
            <h3 className="mt-4 font-display text-3xl uppercase leading-[0.95] sm:text-4xl lg:text-5xl lg:leading-[0.9]">The event is built around five big robotics ideas.</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6 xl:auto-rows-fr xl:grid-cols-5">
            {pillars.map((item, index) => (
              <article
                key={item.label}
                className={
                  index === 2
                    ? "h-full min-h-[17rem] rounded-[1.7rem] border border-cyan-300/16 bg-[linear-gradient(180deg,rgba(87,214,255,0.09),rgba(87,214,255,0.035))] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.2)] ring-1 ring-cyan-200/8 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/24 sm:min-h-[17.5rem] sm:rounded-[1.95rem] sm:p-5 lg:min-h-[18rem] lg:rounded-[2.15rem] lg:p-6 xl:min-h-[18.5rem]"
                    : "h-full min-h-[17rem] rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.042),rgba(255,255,255,0.016))] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)] ring-1 ring-white/5 transition duration-300 hover:-translate-y-1 hover:border-white/16 sm:min-h-[17.5rem] sm:rounded-[1.95rem] sm:p-5 lg:min-h-[18rem] lg:rounded-[2.15rem] lg:p-6 xl:min-h-[18.5rem]"
                }
              >
                <div className="relative flex h-full flex-col overflow-hidden">
                  <span className="pointer-events-none absolute -bottom-1 right-0 font-display text-[7.8rem] leading-none text-white/[0.05] sm:-bottom-4 sm:text-[7.8rem] lg:text-[8.25rem]">
                    {item.number}
                  </span>
                  <p className="relative z-10 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-200/70 sm:text-[0.68rem] sm:tracking-[0.32em]">{item.label}</p>
                  <div className="relative z-10 mt-4 flex h-[4.8rem] items-start sm:h-[5.5rem] lg:mt-5 lg:h-[5.8rem]">
                    <h3 className="max-w-[11.5ch] break-words font-display text-[1.65rem] uppercase leading-[0.94] sm:text-[2rem] lg:text-[2.15rem]">{item.title}</h3>
                  </div>
                  <p className="relative z-10 mt-3 max-w-[13rem] text-sm leading-6 text-slate-300 sm:mt-4 sm:text-[0.98rem] sm:leading-7">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[92rem] overflow-hidden rounded-[1.9rem] border border-white/10 bg-[radial-gradient(circle_at_18%_18%,rgba(87,214,255,0.14),transparent_24%),radial-gradient(circle_at_82%_72%,rgba(255,155,98,0.08),transparent_22%),linear-gradient(120deg,rgba(255,255,255,0.035),rgba(87,214,255,0.04),rgba(255,155,98,0.035))] p-5 shadow-[0_18px_56px_rgba(0,0,0,0.22)] ring-1 ring-white/5 sm:rounded-[2.2rem] sm:p-7 lg:rounded-[2.4rem] lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
            <div className="space-y-5 lg:space-y-6">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-slate-400 sm:text-[0.68rem] sm:tracking-[0.34em]">Why It Matters</p>
              <h3 className="max-w-2xl font-display text-[2.2rem] uppercase leading-[0.93] sm:text-4xl lg:text-[4.15rem] lg:leading-[0.88]">
                You stop guessing how robots work.
              </h3>
              <p className="max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                You build, drive, test, and understand the machine from the inside out.
              </p>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute left-4 right-4 top-[1.05rem] hidden h-px bg-gradient-to-r from-cyan-300/15 via-cyan-200/55 to-orange-200/15 md:block" />
              <div className="grid gap-4 md:grid-cols-[0.9fr_0.9fr_0.9fr_1.3fr] md:gap-3">
                {[
                  ["Build", "Use real parts"],
                  ["Drive", "Feel real control"],
                  ["Test", "Fix what changes"],
                  ["Understand", "See the full system"],
                ].map(([word, caption], index) => (
                  <div key={word} className="relative pt-0 md:pt-8">
                    <div className="mb-3 flex items-center gap-3 md:mb-4 md:flex-col md:items-start md:gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-300/35 bg-slate-950/55 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-cyan-100/80 sm:h-8 sm:w-8 sm:text-[0.62rem]">
                        0{index + 1}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-cyan-300/35 to-transparent md:hidden" />
                    </div>
                    <div className="rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:bg-transparent md:px-0 md:py-0 md:shadow-none">
                      <p className="font-display text-[1.5rem] uppercase leading-[0.92] text-white sm:text-[1.7rem] lg:text-[1.85rem]">{word}</p>
                      <p className="mt-2 max-w-[12rem] font-mono text-[0.58rem] uppercase tracking-[0.22em] text-cyan-100/75 sm:text-[0.62rem] sm:tracking-[0.26em]">
                        {caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[92rem] gap-5 sm:gap-6 lg:grid-cols-[1fr_1fr] lg:gap-6">
          <div className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.018))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)] ring-1 ring-white/5 sm:rounded-[2.2rem] sm:p-7 lg:rounded-[2.4rem] lg:p-8">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-200/70 sm:text-[0.68rem] sm:tracking-[0.34em]">Event Experience</p>
            <h3 className="mt-4 break-words font-display text-3xl uppercase leading-[0.95] sm:text-4xl lg:text-5xl lg:leading-[0.9]">Robotics 101 is built for action.</h3>
            <div className="mt-6 grid gap-4 sm:mt-8">
              {experienceMoments.map((item, index) => (
                <div key={item} className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(2,8,16,0.72),rgba(2,8,16,0.52))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition duration-300 hover:border-white/16 sm:rounded-[1.5rem] sm:px-5">
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-cyan-200/70 sm:text-[0.62rem] sm:tracking-[0.28em]">Experience 0{index + 1}</p>
                  <p className="mt-3 text-base leading-7 text-slate-200 sm:text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.9rem] border border-cyan-300/18 bg-[linear-gradient(180deg,rgba(87,214,255,0.09),rgba(87,214,255,0.04))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] ring-1 ring-cyan-200/8 sm:rounded-[2.2rem] sm:p-7 lg:rounded-[2.4rem] lg:p-8">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-100/75 sm:text-[0.68rem] sm:tracking-[0.34em]">Featured Chapter</p>
            <h3 className="mt-4 break-words font-display text-3xl uppercase leading-[0.95] sm:text-4xl lg:text-5xl lg:leading-[0.9]">Day 01 starts with motion.</h3>
            <p className="mt-4 text-base leading-7 text-cyan-50/88 sm:mt-5 sm:text-lg sm:leading-8">
              Day 01 is where you meet the robot, build the base, power it on, and start driving.
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
        <div className="mx-auto flex max-w-[92rem] flex-col items-start justify-between gap-6 rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.018))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] ring-1 ring-white/5 sm:gap-7 sm:rounded-[2.2rem] sm:p-7 lg:flex-row lg:items-end lg:rounded-[2.4rem] lg:p-8">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-200/70 sm:text-[0.68rem] sm:tracking-[0.34em]">Closing Signal</p>
            <h3 className="mt-4 break-words font-display text-3xl uppercase leading-[0.95] sm:text-4xl lg:text-5xl lg:leading-[0.9]">Robotics 101 turns curiosity into action.</h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              It is a fun first step into building, driving, and thinking like a roboticist.
            </p>
          </div>
          <Link
            href="/day-01"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-cyan-300/45 bg-cyan-300/12 px-5 py-3 font-mono text-xs uppercase tracking-[0.24em] text-cyan-50 shadow-[0_0_36px_rgba(87,214,255,0.1)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/55 hover:bg-cyan-300/18 sm:w-auto sm:px-6"
          >
            Start with Day 01
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
