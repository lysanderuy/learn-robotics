
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
    title: "Meet the machine, build the platform, and learn what makes movement work.",
    description: "The first day of Robotics 101 turns robotics into something students can physically understand and control.",
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
    description: "Day 01 keeps the learning concrete by starting with physical systems before programming enters the picture.",
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
    title: "By the end of the session, students should understand the robot as a machine they can explain and drive.",
    description: "These goals come directly from the Day 01 plan and are written to stay clear for beginners.",
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
    title: "The day moves in a clear arc: introduction, assembly, activation, control, and challenge.",
    description: "Each segment below follows the PDF plan while sounding more natural and presentation-ready.",
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
    title: "This is where students connect parts, see the platform as a system, and link structure to motion.",
    description: "The viewer supports the Day 01 lesson, even before the final hardware names are locked in.",
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
    title: "Students go from simple control discovery to a focused maze challenge that makes steering feel real.",
    description: "This scene turns movement into a skill that can be practiced, improved, and demonstrated.",
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
    title: "Students leave Day 01 with a stronger mental model of robotics and more confidence around the platform.",
    description: "The final scene closes the day with what students now understand and where the event goes next.",
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
    text: "Students begin by naming the major systems that make a robot work, so later lessons have a strong foundation.",
  },
  {
    title: "Install key robot components",
    text: "Assembly is part of the learning. Students understand more when they physically place the parts themselves.",
  },
  {
    title: "Connect simple wiring",
    text: "Wiring introduces the idea that robotic behavior depends on correct connections, not just code or commands.",
  },
  {
    title: "Learn how robot movement works",
    text: "The session connects motion to motors, power, and wheel behavior so movement starts to make sense mechanically.",
  },
  {
    title: "Drive a robot using tank drive control",
    text: "Students use direct control to feel how left and right wheel speed create turning, correction, and steering.",
  },
  {
    title: "No programming is introduced yet",
    text: "Day 01 stays focused on hardware, motion, and confidence so students are not overloaded too early.",
  },
];

const segments = [
  {
    title: "Welcome & Introduction to Robotics",
    duration: "30 min",
    text: "Students are introduced to the idea that a robot is made of connected subsystems: a controller for decision-making, actuators for movement, and sensors for awareness. Examples like line followers, sumobots, and obstacle-avoiding robots help make that idea easy to picture.",
  },
  {
    title: "Robot Kit Introduction",
    duration: "20 min",
    text: "The robot kit is presented as a modular platform. Students become familiar with the chassis, motors, wheels, controller hardware, power source, and wireless control components before assembling anything.",
  },
  {
    title: "Guided Robot Assembly",
    duration: "60 min",
    text: "Students build with purpose. They install the drive components, attach the wheels, connect the motors, and prepare the platform for activation. This is the moment when the robot stops being an idea and starts becoming a machine.",
  },
  {
    title: "First Robot Activation",
    duration: "30 min",
    text: "The first power-on matters. Students connect the control setup, establish communication, and test movement for the first time. This stage is about seeing that assembly choices lead to visible behavior.",
  },
  {
    title: "Tank Drive Exploration",
    duration: "45 min",
    text: "Students experiment with tank drive control to understand differential steering. Instead of memorizing theory, they feel how robots turn by changing the speed relationship between the left and right sides.",
  },
  {
    title: "Driving Skill Activities",
    duration: "45 min",
    text: "Practice becomes skill-building. Students learn the controls, attempt clean straight-line driving, and work on precision challenges that make small movement errors easier to notice and fix.",
  },
  {
    title: "Mini Maze Practice",
    duration: "10 min",
    text: "A small practice maze gives students a safe place to test turning, correction, and navigation before the more focused challenge begins.",
  },
  {
    title: "Mini Maze Challenge",
    duration: "25 min",
    text: "The day culminates in a timed maze challenge. Students must combine control, accuracy, and calm decision-making to complete the course as cleanly as possible.",
  },
  {
    title: "Preview of Day 2",
    duration: "10 min",
    text: "The session closes by introducing the ultrasonic sensor and showing where the event is headed next: from movement alone toward robots that can detect and respond to the world around them.",
  },
];

const learningOutcomes = [
  {
    title: "Basic robot components make more sense",
    text: "Students can now identify the major systems that make up the robot platform.",
  },
  {
    title: "Motors and movement feel less mysterious",
    text: "Students understand that movement comes from physical mechanisms, not just buttons or commands.",
  },
  {
    title: "Differential steering becomes visible",
    text: "Tank drive helps students see how turning happens through wheel speed differences.",
  },
  {
    title: "Confidence grows through control",
    text: "Students gain comfort handling the platform, testing movement, and making corrections.",
  },
  {
    title: "The workshop platform feels familiar",
    text: "By the end of Day 01, students have a practical relationship with the robot they will continue building on.",
  },
];

const partsLegend = [
  { id: "all", label: "Full Platform" },
  { id: "core", label: "Chassis" },
  { id: "sensor", label: "Controller Area" },
  { id: "arm-left", label: "Left Drive" },
  { id: "arm-right", label: "Right Drive" },
  { id: "mobility", label: "Mobility Base" },
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
        className="fixed left-4 top-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white backdrop-blur md:left-6 md:top-6"
      >
        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside className={cn("fixed left-0 top-0 z-30 h-screen w-[20rem] border-r border-white/10 bg-slate-950/85 p-6 backdrop-blur-xl transition-transform duration-500", menuOpen ? "translate-x-0" : "-translate-x-full")}>
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
    <section id={scene.id} data-scene={scene.id} className={cn("relative min-h-screen snap-start overflow-hidden px-6 py-24 md:px-10 lg:px-16", className)}>
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-[92rem] flex-col">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.38em] text-cyan-200/70">{scene.eyebrow}</p>
            <h2 className="mt-3 max-w-4xl font-display text-5xl uppercase leading-[0.9] md:text-7xl">{scene.title}</h2>
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
      <div className="grid flex-1 gap-10 lg:grid-cols-[1.06fr_0.94fr]">
        <div className="flex flex-col justify-between gap-8">
          <div id="day-one-hook" data-subscene="day-one-hook" className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-slate-100">
                <ArrowLeft className="h-4 w-4" /> Robotics 101
              </Link>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Day 01 gives students a real first contact with robotics. They meet the platform, learn the major parts, assemble the drive system, activate the robot, and begin controlling motion with purpose.
            </p>
          </div>
          <div id="day-one-structure" data-subscene="day-one-structure" className="grid gap-4 md:grid-cols-3">
            {[
              ["Theme", "Robots become easier to understand when students can build and drive one themselves."],
              ["Focus", "The session stays grounded in hardware, motion, wiring, and control instead of programming."],
              ["Result", "Students finish with practical confidence and a stronger mental model of how robotic movement works."],
            ].map(([label, text]) => (
              <div key={label} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-cyan-200/70">{label}</p>
                <p className="mt-4 text-base leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,20,34,0.95),rgba(5,10,16,0.92))] p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(87,214,255,0.22),transparent_34%)]" />
          <div className="relative flex min-h-[30rem] flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-white/12 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.26em] text-slate-300">Day 01 Session</span>
              <Sparkles className="h-8 w-8 text-cyan-200/80" />
            </div>
            <div>
              <p className="font-display text-5xl uppercase leading-none">Build first. Drive second. Sense later.</p>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-300">This opening chapter keeps robotics tangible. Students start with visible systems and prepare for sensing in the next stage of the event.</p>
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
      <div className="grid flex-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div id="theme-core" data-subscene="theme-core" className="rounded-[2.4rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-cyan-100/75">Theme</p>
          <p className="mt-6 font-display text-5xl uppercase leading-[0.9]">Movement is the first language students learn in robotics.</p>
          <p className="mt-6 max-w-xl text-lg leading-8 text-cyan-50/88">By beginning with motion, Day 01 makes robotics feel immediate. Students can see the effect of assembly choices, motor behavior, wheel response, and control decisions without needing abstract theory first.</p>
        </div>
        <div className="grid gap-6">
          <div id="theme-preview" data-subscene="theme-preview" className="rounded-[2.4rem] border border-white/10 bg-white/[0.03] p-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-orange-100/70">What This Unlocks</p>
            <div className="mt-6 space-y-5">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5">
                <p className="font-display text-3xl uppercase">Systems Thinking</p>
                <p className="mt-3 text-base leading-7 text-slate-300">Students begin to see that a robot is not one thing. It is a collection of systems that must work together well.</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5">
                <p className="font-display text-3xl uppercase">A clear path to Day 2</p>
                <p className="mt-3 text-base leading-7 text-slate-300">Once movement makes sense, sensing becomes more meaningful. That is why the event introduces the ultrasonic sensor next.</p>
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
      <div className="grid flex-1 gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div id="goal-list" data-subscene="goal-list" className="grid gap-4 md:grid-cols-2">
          {goals.map((goal, index) => (
            <div key={goal.title} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.3em] text-cyan-200/70">Goal 0{index + 1}</p>
              <p className="mt-4 font-display text-3xl uppercase leading-none">{goal.title}</p>
              <p className="mt-4 text-base leading-7 text-slate-300">{goal.text}</p>
            </div>
          ))}
        </div>
        <div id="goal-no-code" data-subscene="goal-no-code" className="rounded-[2.4rem] border border-orange-300/18 bg-orange-200/[0.06] p-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-orange-100/70">Instructional Constraint</p>
          <p className="mt-6 font-display text-5xl uppercase leading-[0.9]">No programming is introduced yet.</p>
          <p className="mt-6 text-lg leading-8 text-slate-200">That choice keeps the lesson focused and beginner-friendly. Students are not asked to understand everything at once. First they learn what the robot is, how it is assembled, and how movement happens. Then later sessions can build on that with sensing and logic.</p>
        </div>
      </div>
    </SceneFrame>
  );
}
function SegmentsScene() {
  const scene = scenes[3];

  return (
    <SceneFrame scene={scene}>
      <div className="grid flex-1 gap-6 xl:grid-cols-2">
        <div id="segments-1-4" data-subscene="segments-1-4" className="space-y-4">
          {segments.slice(0, 4).map((segment, index) => (
            <article key={segment.title} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
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
      <div className="grid flex-1 gap-6 xl:grid-cols-[0.74fr_1.26fr]">
        <div className="flex flex-col gap-6">
          <div id="robot-parts" data-subscene="robot-parts" className="rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-cyan-200/70">Platform Components</p>
            <p className="mt-4 text-sm leading-6 text-slate-300">This section stays intentionally generic until the final classroom kit names are confirmed. For now, it helps students understand the robot as a set of connected mechanical and control areas.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {partsLegend.map((part) => (
                <button key={part.id} type="button" onClick={() => setActivePart(part.id)} className={cn("rounded-[1.2rem] border px-4 py-3 text-left font-mono text-[0.7rem] uppercase tracking-[0.2em] transition", activePart === part.id ? "border-cyan-300/70 bg-cyan-300/12 text-cyan-50" : "border-white/10 bg-slate-950/45 text-slate-300 hover:border-white/20")}>
                  {part.label}
                </button>
              ))}
            </div>
          </div>

          <div id="robot-motion" data-subscene="robot-motion" className="rounded-[2.2rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-cyan-200/70">Teaching Modes</p>
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
                <p className="text-sm text-slate-400">Use this view to explain how drive components create visible movement and turning behavior.</p>
              </div>
              <button type="button" onClick={setAnimateRobot} className={cn("rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.24em]", animateRobot ? "border-orange-300/50 bg-orange-300/12 text-orange-50" : "border-white/10 bg-white/[0.03] text-slate-300")}>
                {animateRobot ? "Motion On" : "Motion Off"}
              </button>
            </div>
          </div>
        </div>

        <div className="relative min-h-[34rem] overflow-hidden rounded-[2.6rem] border border-white/10 bg-[#07111f]">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-950/45 px-5 py-4 backdrop-blur">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">Workshop Platform Viewer</p>
              <p className="mt-1 font-display text-2xl uppercase text-white">A schematic view of the Day 01 robot kit</p>
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
      <div className="grid flex-1 gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div id="activity-drills" data-subscene="activity-drills" className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-cyan-200/70">Skill Activities</p>
          <p className="mt-5 text-lg leading-8 text-slate-300">Before the maze challenge begins, students need time to feel the controls, correct mistakes, and understand how the robot responds. These activities turn basic control into real driving skill.</p>
          <div className="mt-8 space-y-5">
            {[
              "Discover the controls and learn how each side affects motion.",
              "Attempt straight-line driving and notice how small errors change direction.",
              "Practice precision parking to improve correction and stopping control.",
              "Use tank drive more intentionally instead of treating it like a gamepad.",
            ].map((item, index) => (
              <div key={item} className="flex items-center gap-4 rounded-[1.4rem] border border-white/10 bg-slate-950/45 px-4 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 font-mono text-xs">0{index + 1}</span>
                <span className="text-base leading-7 text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div id="activity-maze" data-subscene="activity-maze" className="grid gap-6">
          <div className="rounded-[2.5rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-cyan-100/75">Mini Maze Practice</p>
            <p className="mt-5 font-display text-4xl uppercase leading-none">Students test turning and navigation before the final run.</p>
            <p className="mt-4 text-base leading-7 text-cyan-50/88">The practice maze is where control starts to become strategy. Students learn when to slow down, how to recover from mistakes, and how to guide the robot more deliberately through tight spaces.</p>
          </div>
          <div className="rounded-[2.5rem] border border-orange-300/18 bg-orange-200/[0.06] p-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-orange-100/75">Mini Maze Challenge</p>
            <p className="mt-5 font-display text-4xl uppercase leading-none">Fastest, cleanest, and smoothest run.</p>
            <p className="mt-4 text-base leading-7 text-slate-200">The challenge gives the day a real finish. Students are no longer just practicing control. They are applying what they learned under pressure, with visible goals and a shared sense of accomplishment.</p>
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
      <div className="grid flex-1 gap-8 lg:grid-cols-[1fr_1fr]">
        <div id="outcome-list" data-subscene="outcome-list" className="grid gap-4">
          {learningOutcomes.map((item, index) => (
            <div key={item.title} className="rounded-[1.9rem] border border-white/10 bg-white/[0.035] p-6">
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.3em] text-cyan-200/70">Outcome 0{index + 1}</p>
              <p className="mt-4 font-display text-3xl uppercase leading-none">{item.title}</p>
              <p className="mt-4 text-base leading-7 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
        <div id="outcome-next" data-subscene="outcome-next" className="flex flex-col justify-between rounded-[2.5rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-8">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-cyan-100/75">Next Session</p>
            <h3 className="mt-6 font-display text-5xl uppercase leading-[0.9]">Day 2 introduces obstacle detection with the ultrasonic sensor.</h3>
            <p className="mt-6 text-lg leading-8 text-cyan-50/88">By the end of Day 01, students understand the platform well enough to appreciate what sensing adds. The next step is teaching the robot to notice what is in front of it and react with purpose.</p>
          </div>
          <div className="rounded-[1.8rem] border border-white/12 bg-slate-950/45 p-5">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.28em] text-slate-400">Facilitator note</p>
            <p className="mt-3 text-base leading-7 text-slate-200">This chapter is now aligned to the PDF, clearer for beginners, and ready to present live. The only content still awaiting confirmation is the exact hardware naming for the kit section.</p>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
