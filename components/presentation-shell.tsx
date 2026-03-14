
"use client";

import Link from "next/link";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Menu, Sparkles, X } from "lucide-react";
import { RobotStage } from "@/components/robot-stage";
import { cn } from "@/lib/utils";

type SceneKey = "hero" | "theme" | "goals" | "segments" | "robot" | "activities" | "outcomes";
type RobotMode = "viewer" | "parts" | "exploded";

type Scene = {
  id: string;
  index: string;
  eyebrow: string;
  label: string;
  title: string;
  description: string;
  type: SceneKey;
  subsections: { id: string; label: string }[];
};

const scenes: Scene[] = [
  {
    id: "day-one-arrival",
    index: "01",
    eyebrow: "Day 01",
    label: "Arrival",
    title: "Meet the robot, build the base, and make it move.",
    description: "Day 01 makes robotics feel real fast.",
    type: "hero",
    subsections: [
      { id: "day-one-hook", label: "Hook" },
      { id: "day-one-structure", label: "Focus" },
    ],
  },
  {
    id: "theme",
    index: "02",
    eyebrow: "Theme",
    label: "Movement First",
    title: "Understand how robots move by building and controlling one.",
    description: "Start with real movement, then build understanding from there.",
    type: "theme",
    subsections: [
      { id: "theme-core", label: "Core Idea" },
      { id: "theme-preview", label: "Preview" },
    ],
  },
  {
    id: "goals",
    index: "03",
    eyebrow: "Goals",
    label: "Objectives",
    title: "By the end of the session, students should know the robot, control it, and trust it.",
    description: "Clear goals, beginner-friendly language, real progress.",
    type: "goals",
    subsections: [
      { id: "goal-list", label: "Goals" },
      { id: "goal-no-code", label: "Constraint" },
    ],
  },
  {
    id: "session-flow",
    index: "04",
    eyebrow: "Session Flow",
    label: "Nine Segments",
    title: "The day moves from first look to first challenge.",
    description: "A clear path from first look to first challenge.",
    type: "segments",
    subsections: [
      { id: "segments-1-4", label: "Foundation" },
      { id: "segments-5-9", label: "Control + Challenge" },
    ],
  },
  {
    id: "robot-platform",
    index: "05",
    eyebrow: "Robot Platform",
    label: "Kit View",
    title: "This is the robot students build, power, and drive on Day 01.",
    description: "Now updated with the real kit parts.",
    type: "robot",
    subsections: [
      { id: "robot-parts", label: "Parts" },
      { id: "robot-motion", label: "Motion" },
    ],
  },
  {
    id: "activities",
    index: "06",
    eyebrow: "Practice + Challenge",
    label: "Drive Skills",
    title: "Students go from basic control to a real maze challenge.",
    description: "Drive, correct, improve, repeat.",
    type: "activities",
    subsections: [
      { id: "activity-drills", label: "Drills" },
      { id: "activity-maze", label: "Maze" },
    ],
  },
  {
    id: "outcomes",
    index: "07",
    eyebrow: "Learning Outcomes",
    label: "What Sticks",
    title: "Students leave Day 01 with more control, more confidence, and a better feel for robotics.",
    description: "What they learned today, and what comes next.",
    type: "outcomes",
    subsections: [
      { id: "outcome-list", label: "Outcomes" },
      { id: "outcome-next", label: "Day 2" },
    ],
  },
];

const goals = [
  {
    title: "Understand the main parts of a robot",
    text: "Students learn the main systems that make the robot work.",
  },
  {
    title: "Install key robot components",
    text: "Students build the robot by placing key parts themselves.",
  },
  {
    title: "Connect simple wiring",
    text: "Students see that correct connections matter just as much as commands.",
  },
  {
    title: "Learn how robot movement works",
    text: "Students connect motion to motors, power, and wheels.",
  },
  {
    title: "Drive a robot using tank drive control",
    text: "Students feel how left and right wheel speed changes turning.",
  },
  {
    title: "No programming is introduced yet",
    text: "Day 01 stays focused on hardware and motion so it feels fun, not overwhelming.",
  },
];

const segments = [
  {
    title: "Welcome & Introduction to Robotics",
    duration: "30 min",
    text: "Students meet the big robot ideas: control, movement, and sensing. Simple examples make each one easy to picture.",
  },
  {
    title: "Robot Kit Introduction",
    duration: "20 min",
    text: "Students get to know the chassis, motors, wheels, controller board, battery, and Bluetooth parts before building.",
  },
  {
    title: "Guided Robot Assembly",
    duration: "60 min",
    text: "Students build the base, add the drive parts, and turn loose pieces into one robot.",
  },
  {
    title: "First Robot Activation",
    duration: "30 min",
    text: "Students power on the robot and see it move for the first time.",
  },
  {
    title: "Tank Drive Exploration",
    duration: "45 min",
    text: "Students use tank drive and quickly see how turning really works.",
  },
  {
    title: "Driving Skill Activities",
    duration: "45 min",
    text: "Students practice control, straight driving, and clean turns before the maze.",
  },
  {
    title: "Mini Maze Practice",
    duration: "10 min",
    text: "A short practice maze lets students test turning and correction before the main run.",
  },
  {
    title: "Mini Maze Challenge",
    duration: "25 min",
    text: "The day ends with a maze challenge that makes driving feel like a real mission.",
  },
  {
    title: "Preview of Day 2",
    duration: "10 min",
    text: "The session ends with a quick look at robots that can sense obstacles.",
  },
];

const learningOutcomes = [
  {
    title: "Basic robot components make more sense",
    text: "Students can name the key systems on the robot.",
  },
  {
    title: "Motors and movement feel less mysterious",
    text: "Students see that movement comes from real parts working together.",
  },
  {
    title: "Differential steering becomes visible",
    text: "Students understand that turning comes from left and right wheel speed changes.",
  },
  {
    title: "Confidence grows through control",
    text: "Students feel more confident testing movement and fixing mistakes.",
  },
  {
    title: "The workshop platform feels familiar",
    text: "By the end of Day 01, the robot already feels familiar.",
  },
];

const partsLegend = [
  { id: "all", label: "Full Platform" },
  { id: "core", label: "Chassis" },
  { id: "sensor", label: "Nano + TB6612FNG Board" },
  { id: "arm-left", label: "N20 Motor Left" },
  { id: "arm-right", label: "N20 Motor Right" },
  { id: "mobility", label: "N20 Wheels + 2x18650" },
];

export function PresentationShell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeScene, setActiveScene] = useState(scenes[0].id);
  const [activeSubsection, setActiveSubsection] = useState(scenes[0].subsections[0]?.id ?? "");
  const [robotMode, setRobotMode] = useState<RobotMode>("viewer");
  const [activePart, setActivePart] = useState("all");
  const [animateRobot, setAnimateRobot] = useState(true);

  useEffect(() => {
    const root = containerRef.current;

    if (!root) return;

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveScene(visible.target.dataset.scene ?? scenes[0].id);
        }
      },
      { root, threshold: [0.35, 0.55, 0.75] },
    );

    const subsectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveSubsection(visible.target.dataset.subscene ?? "");
        }
      },
      { root, threshold: [0.5, 0.7, 0.9] },
    );

    root.querySelectorAll<HTMLElement>("[data-scene]").forEach((scene) => sceneObserver.observe(scene));
    root.querySelectorAll<HTMLElement>("[data-subscene]").forEach((subscene) => subsectionObserver.observe(subscene));

    return () => {
      sceneObserver.disconnect();
      subsectionObserver.disconnect();
    };
  }, []);

  const activeSceneData = useMemo(() => scenes.find((scene) => scene.id === activeScene) ?? scenes[0], [activeScene]);

  const scrollToId = (id: string) => {
    const target = containerRef.current?.querySelector<HTMLElement>(`#${id}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#0e1b34_0%,#08111d_35%,#04070c_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(87,214,255,0.07)_0,transparent_18%,transparent_82%,rgba(255,155,98,0.08)_100%)]" />
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-40" />

      <button
        type="button"
        aria-label="Toggle day one outline"
        onClick={() => setMenuOpen((open) => !open)}
        className="fixed left-3 top-3 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white backdrop-blur sm:left-4 sm:top-4 sm:h-12 sm:w-12 md:left-6 md:top-6"
      >
        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside className={cn("fixed left-0 top-0 z-30 h-screen w-[86vw] max-w-[20rem] border-r border-white/10 bg-slate-950/90 p-4 backdrop-blur-xl transition-transform duration-500 sm:p-6", menuOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="mt-16 space-y-6">
          <div className="space-y-3">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.36em] text-cyan-200/70">Day 01 Outline</p>
            <h2 className="max-w-[14rem] font-display text-3xl uppercase leading-none text-white">Meet, Build, Drive</h2>
          </div>
          <nav className="space-y-2">
            {scenes.map((scene) => {
              const isActive = scene.id === activeScene;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => scrollToId(scene.id)}
                  className={cn(
                    "group flex w-full items-start gap-4 rounded-3xl border px-4 py-3 text-left transition",
                    isActive ? "border-cyan-300/60 bg-cyan-300/10 text-white" : "border-white/8 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/[0.05]",
                  )}
                >
                  <span className="font-mono text-xs tracking-[0.34em] text-cyan-200/70">{scene.index}</span>
                  <span className="space-y-1">
                    <span className="block text-sm uppercase tracking-[0.22em] text-white/65">{scene.eyebrow}</span>
                    <span className="block font-display text-xl uppercase leading-none">{scene.label}</span>
                    <span className="block text-xs text-slate-400">{scene.description}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="fixed right-5 top-6 z-20 hidden items-center gap-6 rounded-full border border-white/10 bg-slate-950/60 px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.3em] text-slate-300 backdrop-blur lg:flex">
        <span>{activeSceneData.index}</span>
        <span className="text-white">{activeSceneData.label}</span>
        <span className="text-cyan-200/80">{activeSubsection.replaceAll("-", " ")}</span>
      </div>

      <main ref={containerRef} className="relative h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">
        <HeroScene />
        <ThemeScene />
        <GoalsScene />
        <SegmentsScene />
        <RobotScene
          robotMode={robotMode}
          activePart={activePart}
          animateRobot={animateRobot}
          setRobotMode={(value) => startTransition(() => setRobotMode(value))}
          setActivePart={(value) => startTransition(() => setActivePart(value))}
          setAnimateRobot={() => startTransition(() => setAnimateRobot((value) => !value))}
        />
        <ActivitiesScene />
        <OutcomesScene />
      </main>
    </div>
  );
}
function SceneFrame({ scene, className, children }: { scene: Scene; className?: string; children: React.ReactNode }) {
  return (
    <section id={scene.id} data-scene={scene.id} className={cn("relative min-h-screen snap-start overflow-hidden px-4 py-20 sm:px-6 sm:py-24 md:px-10 lg:px-16", className)}>
      <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-[92rem] flex-col sm:min-h-[calc(100vh-12rem)]">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.38em] text-cyan-200/70">{scene.eyebrow}</p>
            <h2 className="mt-3 max-w-4xl font-display text-3xl uppercase leading-[0.95] sm:text-5xl sm:leading-[0.9] lg:text-7xl">{scene.title}</h2>
          </div>
          <div className="hidden rounded-full border border-white/12 px-4 py-2 font-mono text-xs uppercase tracking-[0.34em] text-slate-300 md:block">{scene.index}</div>
        </div>
        {children}
      </div>
    </section>
  );
}

function HeroScene() {
  const scene = scenes[0];

  return (
    <SceneFrame scene={scene} className="flex items-center">
      <div className="grid flex-1 gap-6 sm:gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10">
        <div className="flex flex-col justify-between gap-8">
          <div id="day-one-hook" data-subscene="day-one-hook" className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-slate-100">
                <ArrowLeft className="h-4 w-4" /> Robotics 101
              </Link>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 md:text-xl">
              Day 01 is where students stop just imagining robots and start building one. They meet the platform, power it up, and make it move.
            </p>
          </div>
          <div id="day-one-structure" data-subscene="day-one-structure" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Theme", "Build it. Drive it. Understand it."],
              ["Focus", "Hands-on hardware first, coding later."],
              ["Result", "Students leave with a robot that moves and skills they can feel."],
            ].map(([label, text]) => (
              <div key={label} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-cyan-200/70">{label}</p>
                <p className="mt-4 text-base leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,20,34,0.95),rgba(5,10,16,0.92))] p-5 sm:rounded-[2.4rem] sm:p-6 lg:rounded-[2.8rem] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(87,214,255,0.22),transparent_34%)]" />
          <div className="relative flex min-h-[24rem] flex-col justify-between gap-6 sm:min-h-[30rem]">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-white/12 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.26em] text-slate-300">Day 01 Session</span>
              <Sparkles className="h-8 w-8 text-cyan-200/80" />
            </div>
            <div>
              <p className="font-display text-3xl uppercase leading-none sm:text-4xl lg:text-5xl">Build first. Drive second. Sense later.</p>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-300">This first chapter makes robotics click fast and sets up sensing next.</p>
            </div>
            <div className="grid gap-3">
              {segments.slice(0, 3).map((segment, index) => (
                <div key={segment.title} className="flex items-center justify-between rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <span className="font-mono text-[0.64rem] uppercase tracking-[0.28em] text-cyan-200/70">0{index + 1}</span>
                  <span className="font-display text-xl uppercase">{segment.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}

function ThemeScene() {
  const scene = scenes[1];

  return (
    <SceneFrame scene={scene}>
      <div className="grid flex-1 gap-6 sm:gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div id="theme-core" data-subscene="theme-core" className="rounded-[2rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-5 sm:rounded-[2.4rem] sm:p-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-cyan-100/75">Theme</p>
          <p className="mt-6 font-display text-3xl uppercase leading-[0.95] sm:text-4xl sm:leading-[0.92] lg:text-5xl lg:leading-[0.9]">Movement is the fastest way to make robotics click.</p>
          <p className="mt-6 max-w-xl text-base leading-7 text-cyan-50/88 sm:text-lg sm:leading-8">Students can feel the robot respond right away. That makes the big ideas easier to understand.</p>
        </div>
        <div className="grid gap-6">
          <div id="theme-preview" data-subscene="theme-preview" className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:rounded-[2.4rem] sm:p-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-orange-100/70">Why This Works</p>
            <div className="mt-6 space-y-5">
              <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/55 p-4 sm:rounded-[1.5rem] sm:p-5">
                <p className="font-display text-2xl uppercase sm:text-3xl">Systems Thinking</p>
                <p className="mt-3 text-base leading-7 text-slate-300">Students see that a robot is a team of parts working together.</p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/55 p-4 sm:rounded-[1.5rem] sm:p-5">
                <p className="font-display text-2xl uppercase sm:text-3xl">A clear path to Day 2</p>
                <p className="mt-3 text-base leading-7 text-slate-300">Once movement feels easy, adding sensors makes sense.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}

function GoalsScene() {
  const scene = scenes[2];

  return (
    <SceneFrame scene={scene}>
      <div className="grid flex-1 gap-6 sm:gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div id="goal-list" data-subscene="goal-list" className="grid gap-4 sm:grid-cols-2">
          {goals.map((goal, index) => (
            <div key={goal.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:rounded-[2rem] sm:p-6">
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.3em] text-cyan-200/70">Goal 0{index + 1}</p>
              <p className="mt-4 font-display text-3xl uppercase leading-none">{goal.title}</p>
              <p className="mt-4 text-base leading-7 text-slate-300">{goal.text}</p>
            </div>
          ))}
        </div>
        <div id="goal-no-code" data-subscene="goal-no-code" className="rounded-[2rem] border border-orange-300/18 bg-orange-200/[0.06] p-5 sm:rounded-[2.4rem] sm:p-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-orange-100/70">Instructional Constraint</p>
          <p className="mt-6 font-display text-3xl uppercase leading-[0.95] sm:text-4xl sm:leading-[0.92] lg:text-5xl lg:leading-[0.9]">No programming is introduced yet.</p>
          <p className="mt-6 text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">This keeps Day 01 simple, hands-on, and fun. Students learn the robot first, then level up later.</p>
        </div>
      </div>
    </SceneFrame>
  );
}
function SegmentsScene() {
  const scene = scenes[3];

  return (
    <SceneFrame scene={scene}>
      <div className="grid flex-1 gap-4 sm:gap-6 xl:grid-cols-2">
        <div id="segments-1-4" data-subscene="segments-1-4" className="space-y-4">
          {segments.slice(0, 4).map((segment, index) => (
            <article key={segment.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:rounded-[2rem] sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.3em] text-cyan-200/70">Segment 0{index + 1}</p>
                  <h3 className="mt-3 font-display text-3xl uppercase leading-none">{segment.title}</h3>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-slate-300">{segment.duration}</span>
              </div>
              <p className="mt-4 text-base leading-7 text-slate-300">{segment.text}</p>
            </article>
          ))}
        </div>
        <div id="segments-5-9" data-subscene="segments-5-9" className="space-y-4">
          {segments.slice(4).map((segment, index) => (
            <article key={segment.title} className={index === 3 ? "rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.07] p-6" : "rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.3em] text-cyan-200/70">Segment 0{index + 5}</p>
                  <h3 className="mt-3 font-display text-3xl uppercase leading-none">{segment.title}</h3>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-slate-300">{segment.duration}</span>
              </div>
              <p className="mt-4 text-base leading-7 text-slate-300">{segment.text}</p>
            </article>
          ))}
        </div>
      </div>
    </SceneFrame>
  );
}

function RobotScene({ robotMode, activePart, animateRobot, setRobotMode, setActivePart, setAnimateRobot }: { robotMode: RobotMode; activePart: string; animateRobot: boolean; setRobotMode: (value: RobotMode) => void; setActivePart: (value: string) => void; setAnimateRobot: () => void; }) {
  const scene = scenes[4];

  return (
    <SceneFrame scene={scene} className="bg-[linear-gradient(180deg,rgba(2,5,9,0.96),rgba(7,17,31,1))]">
      <div className="grid flex-1 gap-4 sm:gap-6 xl:grid-cols-[0.74fr_1.26fr]">
        <div className="flex flex-col gap-6">
          <div id="robot-parts" data-subscene="robot-parts" className="rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-5 sm:rounded-[2.2rem] sm:p-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-cyan-200/70">Platform Components</p>
            <p className="mt-4 text-sm leading-6 text-slate-300">Real Day 01 kit: custom Nano + TB6612FNG board, 2x18650 battery pack, N20 motors, N20 wheels, and Bluetooth for Arduino control.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {partsLegend.map((part) => (
                <button key={part.id} type="button" onClick={() => setActivePart(part.id)} className={cn("rounded-[1.2rem] border px-4 py-3 text-left font-mono text-[0.7rem] uppercase tracking-[0.2em] transition", activePart === part.id ? "border-cyan-300/70 bg-cyan-300/12 text-cyan-50" : "border-white/10 bg-slate-950/45 text-slate-300 hover:border-white/20")}>
                  {part.label}
                </button>
              ))}
            </div>
          </div>

          <div id="robot-motion" data-subscene="robot-motion" className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-5 sm:rounded-[2.2rem] sm:p-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-cyan-200/70">Kit Views</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[["viewer", "Platform View"], ["parts", "Parts Focus"], ["exploded", "Exploded Assembly"]].map(([value, label]) => (
                <button key={value} type="button" onClick={() => setRobotMode(value as RobotMode)} className={cn("rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] transition", robotMode === value ? "border-cyan-300/70 bg-cyan-300/14 text-cyan-50" : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20")}>
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between rounded-[1.6rem] border border-white/10 bg-slate-950/55 px-4 py-3">
              <div>
                <p className="font-display text-2xl uppercase">Motion Demo</p>
                <p className="text-sm text-slate-400">Show how the board, motors, wheels, and battery work as one system.</p>
              </div>
              <button type="button" onClick={setAnimateRobot} className={cn("rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.24em]", animateRobot ? "border-orange-300/50 bg-orange-300/12 text-orange-50" : "border-white/10 bg-white/[0.03] text-slate-300")}>
                {animateRobot ? "Motion On" : "Motion Off"}
              </button>
            </div>
          </div>
        </div>

        <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f] sm:min-h-[30rem] sm:rounded-[2.6rem]">
          <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-start gap-2 border-b border-white/10 bg-slate-950/45 px-4 py-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">Workshop Platform Viewer</p>
              <p className="mt-1 font-display text-2xl uppercase text-white">Custom Nano + TB6612FNG robot platform</p>
            </div>
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-cyan-100/70">{robotMode} / {activePart}</div>
          </div>
          <div className="h-full pt-20">
            <RobotStage mode={robotMode} activePart={activePart} animate={animateRobot} />
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}

function ActivitiesScene() {
  const scene = scenes[5];

  return (
    <SceneFrame scene={scene}>
      <div className="grid flex-1 gap-6 sm:gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div id="activity-drills" data-subscene="activity-drills" className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:rounded-[2.5rem] sm:p-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-cyan-200/70">Skill Activities</p>
          <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">Students test, adjust, and improve before the maze.</p>
          <div className="mt-8 space-y-5">
            {[
              "Discover the controls and learn how each side affects motion.",
              "Try straight-line driving and notice how small errors change direction.",
              "Practice precision parking to improve correction and stopping control.",
              "Use tank drive with more control and less guessing.",
            ].map((item, index) => (
              <div key={item} className="flex items-center gap-4 rounded-[1.4rem] border border-white/10 bg-slate-950/45 px-4 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 font-mono text-xs">0{index + 1}</span>
                <span className="text-base leading-7 text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div id="activity-maze" data-subscene="activity-maze" className="grid gap-6">
          <div className="rounded-[2rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-5 sm:rounded-[2.5rem] sm:p-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-cyan-100/75">Mini Maze Practice</p>
            <p className="mt-5 font-display text-2xl uppercase leading-none sm:text-3xl lg:text-4xl">Students test turning and navigation before the final run.</p>
            <p className="mt-4 text-base leading-7 text-cyan-50/88">The practice maze turns basic driving into smarter control.</p>
          </div>
          <div className="rounded-[2rem] border border-orange-300/18 bg-orange-200/[0.06] p-5 sm:rounded-[2.5rem] sm:p-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-orange-100/75">Mini Maze Challenge</p>
            <p className="mt-5 font-display text-2xl uppercase leading-none sm:text-3xl lg:text-4xl">Fastest, cleanest, and smoothest run.</p>
            <p className="mt-4 text-base leading-7 text-slate-200">The challenge gives the day a fun finish and a chance to show what stuck.</p>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
function OutcomesScene() {
  const scene = scenes[6];

  return (
    <SceneFrame scene={scene} className="bg-[radial-gradient(circle_at_top,rgba(87,214,255,0.12),transparent_30%),linear-gradient(180deg,rgba(8,14,24,0.94),rgba(2,4,7,1))]">
      <div className="grid flex-1 gap-6 sm:gap-8 lg:grid-cols-[1fr_1fr]">
        <div id="outcome-list" data-subscene="outcome-list" className="grid gap-3 sm:gap-4">
          {learningOutcomes.map((item, index) => (
            <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 sm:rounded-[1.9rem] sm:p-6">
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.3em] text-cyan-200/70">Outcome 0{index + 1}</p>
              <p className="mt-4 font-display text-3xl uppercase leading-none">{item.title}</p>
              <p className="mt-4 text-base leading-7 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
        <div id="outcome-next" data-subscene="outcome-next" className="flex flex-col justify-between rounded-[2rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-5 sm:rounded-[2.5rem] sm:p-8">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-cyan-100/75">Next Session</p>
            <h3 className="mt-6 font-display text-3xl uppercase leading-[0.95] sm:text-4xl sm:leading-[0.92] lg:text-5xl lg:leading-[0.9]">Day 2 introduces obstacle detection with the ultrasonic sensor.</h3>
            <p className="mt-6 text-base leading-7 text-cyan-50/88 sm:text-lg sm:leading-8">Next, students help the robot detect obstacles and react on its own.</p>
          </div>
          <div className="rounded-[1.4rem] border border-white/12 bg-slate-950/45 p-4 sm:rounded-[1.8rem] sm:p-5">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.28em] text-slate-400">Facilitator note</p>
            <p className="mt-3 text-base leading-7 text-slate-200">Day 01 is ready to present with the real kit details included.</p>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
