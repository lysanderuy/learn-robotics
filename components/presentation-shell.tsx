"use client";

import Link from "next/link";
import { startTransition, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, Menu, Sparkles, X } from "lucide-react";
import { RobotStage } from "@/components/robot-stage";
import { cn } from "@/lib/utils";

type RobotMode = "viewer" | "parts" | "exploded";

type SceneMeta = {
  id: string;
  index: string;
  eyebrow: string;
  label: string;
  shortTitle: string;
  firstBeatId: string;
  subsections: { id: string; label: string }[];
};

type Beat = {
  id: string;
  sceneId: string;
  sectionLabel: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  render: (helpers: BeatHelpers) => ReactNode;
};

type BeatHelpers = {
  robotMode: RobotMode;
  activePart: string;
  animateRobot: boolean;
  setRobotMode: (value: RobotMode) => void;
  setActivePart: (value: string) => void;
  toggleAnimateRobot: () => void;
};

const scenes: SceneMeta[] = [
  {
    id: "arrival",
    index: "01",
    eyebrow: "Day 01",
    label: "Arrival",
    shortTitle: "Meet, Build, Drive",
    firstBeatId: "arrival-hook",
    subsections: [
      { id: "arrival-hook", label: "Hook" },
      { id: "arrival-focus", label: "Focus" },
    ],
  },
  {
    id: "theme",
    index: "02",
    eyebrow: "Theme",
    label: "Movement First",
    shortTitle: "Movement First",
    firstBeatId: "theme-core",
    subsections: [
      { id: "theme-core", label: "Core Idea" },
      { id: "theme-why", label: "Why It Works" },
    ],
  },
  {
    id: "goals",
    index: "03",
    eyebrow: "Goals",
    label: "Objectives",
    shortTitle: "Know The Mission",
    firstBeatId: "goals-overview",
    subsections: [
      { id: "goals-overview", label: "Goals" },
      { id: "goals-boundary", label: "No Code Yet" },
    ],
  },
  {
    id: "journey",
    index: "04",
    eyebrow: "Journey",
    label: "Flow",
    shortTitle: "The Day As A Journey",
    firstBeatId: "journey-start",
    subsections: [
      { id: "journey-start", label: "Meet" },
      { id: "journey-build", label: "Build" },
      { id: "journey-drive", label: "Drive" },
      { id: "journey-challenge", label: "Challenge" },
    ],
  },
  {
    id: "robot",
    index: "05",
    eyebrow: "Robot Platform",
    label: "Kit View",
    shortTitle: "Know The Robot",
    firstBeatId: "robot-platform",
    subsections: [
      { id: "robot-platform", label: "Platform" },
      { id: "robot-views", label: "Views" },
    ],
  },
  {
    id: "challenge",
    index: "06",
    eyebrow: "Practice + Challenge",
    label: "Maze",
    shortTitle: "Practice To Challenge",
    firstBeatId: "challenge-rules",
    subsections: [{ id: "challenge-rules", label: "Maze Rules" }],
  },
  {
    id: "outcomes",
    index: "07",
    eyebrow: "Learning Outcomes",
    label: "What Sticks",
    shortTitle: "What You Leave With",
    firstBeatId: "outcomes-core",
    subsections: [
      { id: "outcomes-core", label: "Outcomes" },
      { id: "outcomes-next", label: "Day 2" },
    ],
  },
];

const partsLegend = [
  { id: "all", label: "Full Platform", role: "See the whole system working together." },
  { id: "core", label: "Chassis", role: "Holds every major part in place." },
  { id: "sensor", label: "Nano + TB6612FNG Board", role: "Acts like the decision and motor control center." },
  { id: "arm-left", label: "N20 Motor Left", role: "Drives the left side of the robot." },
  { id: "arm-right", label: "N20 Motor Right", role: "Drives the right side of the robot." },
  { id: "mobility", label: "N20 Wheels + 2x18650", role: "Turns power into floor contact and motion." },
];

const beats: Beat[] = [
  {
    id: "arrival-hook",
    sceneId: "arrival",
    sectionLabel: "Hook",
    eyebrow: "Day 01",
    title: "Welcome to Robotics 101.",
    subtitle: "You begin with what robotics is, where you already see it, and how that connects to the robot you will build today.",
    render: () => (
      <div className="grid h-full gap-4 lg:grid-cols-[1.02fr_0.98fr] lg:gap-5">
        <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(6,16,27,0.94),rgba(4,8,14,0.96))] p-4 sm:rounded-[1.9rem] sm:p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(87,214,255,0.14),transparent_30%)]" />
          <div className="relative flex h-full flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-slate-100">
                <ArrowLeft className="h-4 w-4" /> Robotics 101
              </Link>
              <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-cyan-50">Day 01</span>
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-cyan-200/70">Starting point</p>
                <p className="max-w-2xl font-display text-[1.5rem] uppercase leading-[0.92] sm:text-[1.95rem] lg:text-[2.35rem]">Robotics is about building machines that can sense, decide, and act.</p>
                <p className="max-w-2xl text-sm leading-5 text-slate-300 sm:text-[0.92rem] sm:leading-6">Before you touch the kit, you first understand the big idea so each part already has a meaning.</p>
              </div>
              <div className="grid gap-3 sm:auto-rows-fr sm:grid-cols-3">
                {[
                  ["Sense", "Robots notice what is around them."],
                  ["Think", "A controller chooses what to do next."],
                  ["Act", "Motors or mechanisms carry out the response."],
                ].map(([title, text]) => (
                  <div key={title} className="flex h-full flex-col rounded-[1rem] border border-white/10 bg-slate-950/40 p-3 sm:p-3.5">
                    <p className="font-display text-[0.98rem] uppercase leading-none sm:text-[1.1rem]">{title}</p>
                    <p className="mt-1.5 text-sm leading-5 text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-sm leading-5 text-slate-400">By the end of the session, you will see that idea on a real robot that you build and drive yourself.</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-rows-[auto_1fr]">
          <div className="rounded-[1.7rem] border border-cyan-300/18 bg-cyan-300/[0.08] p-4 sm:rounded-[1.9rem] sm:p-5">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-cyan-100/75">Today in order</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {[
                ["01", "Intro to robotics"],
                ["02", "Examples around you"],
                ["03", "Competition robots"],
                ["04", "Build and drive the kit"],
              ].map(([n, text]) => (
                <div key={n} className="flex items-center gap-3 rounded-[1rem] border border-white/10 bg-slate-950/35 px-3 py-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/12 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-cyan-50">{n}</span>
                  <p className="font-display text-[0.95rem] uppercase leading-none sm:text-[1rem]">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[1.9rem] sm:p-5">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-400">Event bridge</p>
            <p className="mt-3 font-display text-[1.05rem] uppercase leading-[0.98] sm:text-[1.2rem]">The same ideas behind everyday robots and competition robots show up in this event.</p>
            <p className="mt-2.5 text-sm leading-5 text-slate-300">That is why Day 01 starts broad, then moves into the platform you will build and control.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "arrival-focus",
    sceneId: "arrival",
    sectionLabel: "Focus",
    eyebrow: "Day 01",
    title: "You already see robotics in daily life and in local competition robots.",
    subtitle: "You move from familiar examples, to competition robots, to the kind of robotics you will build in this event.",
    render: () => (
      <div className="grid h-full gap-4 xl:grid-cols-[1.02fr_0.98fr] xl:gap-5">
        <div className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.018))] p-4 sm:rounded-[1.9rem] sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-cyan-200/70">Everyday robotics</p>
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-slate-500">Around you already</p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["Automatic doors", "Sense someone and open."],
              ["Robot vacuum", "Moves and avoids obstacles."],
              ["Washing machine", "Follows a programmed sequence."],
              ["Traffic and gate systems", "Use sensing and control to manage flow."],
            ].map(([title, text]) => (
              <div key={title} className="flex min-h-[6.6rem] items-start gap-3 rounded-[1.05rem] border border-white/10 bg-slate-950/40 p-3.5">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300" />
                <div>
                  <p className="font-display text-[1rem] uppercase leading-none sm:text-[1.08rem]">{title}</p>
                  <p className="mt-2 text-sm leading-5 text-slate-300">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 lg:grid-rows-[auto_1fr]">
          <div className="rounded-[1.7rem] border border-orange-300/18 bg-orange-200/[0.07] p-4 sm:rounded-[1.9rem] sm:p-5">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-orange-100/75">Common competition robots here</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {[
                ["Line follower", "Reads the floor and stays on a path."],
                ["Sumobot", "Pushes, reacts, and stays inside the arena."],
                ["Robohockey", "Moves fast, aims, and responds under pressure."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[1.05rem] border border-white/10 bg-slate-950/30 px-3.5 py-3">
                  <p className="font-display text-[1rem] uppercase leading-none sm:text-[1.08rem]">{title}</p>
                  <p className="mt-2 text-sm leading-5 text-orange-50/82">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[1.9rem] sm:p-5">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-400">Why this matters here</p>
            <p className="mt-3 font-display text-[1.12rem] uppercase leading-[0.98] sm:text-[1.28rem]">You are about to learn the same core ideas that make those robots work.</p>
            <p className="mt-3 text-sm leading-5 text-slate-300">That is why Day 01 starts with movement, control, motors, and wheels before adding sensing later.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "theme-core",
    sceneId: "theme",
    sectionLabel: "Core Idea",
    eyebrow: "Theme",
    title: "Movement is the fastest way to make robotics click.",
    subtitle: "Once you can watch a robot move, the rest of the system becomes easier to understand.",
    render: () => (
      <div className="grid h-full gap-4 xl:grid-cols-[0.7fr_1.3fr] xl:gap-5">
        <div className="rounded-[1.7rem] border border-cyan-300/18 bg-cyan-300/[0.08] p-4 sm:rounded-[1.9rem] sm:p-5">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-cyan-100/75">Big idea</p>
          <p className="mt-4 max-w-md font-display text-[1.35rem] uppercase leading-[0.94] sm:text-[1.7rem] lg:text-[2rem]">When you can watch input turn into motion, the robot starts making sense.</p>
          <p className="mt-3 max-w-sm text-sm leading-5 text-cyan-50/88">Movement lets you connect power, control, motors, and wheels as one visible system.</p>
        </div>
        <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[1.9rem] sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-400">Signal flow</p>
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-slate-500">Command to motion</p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-[repeat(5,minmax(0,1fr))] xl:items-start">
            {[["Input", "You give a command."], ["Board", "The controller decides the signal."], ["Motors", "The motors spin with intent."], ["Wheels", "The wheels touch the floor."], ["Motion", "The robot turns or drives."]].map(([title, text], index) => (
              <div key={title} className="relative">
                {index < 4 ? <div className="signal-connector absolute left-[calc(100%-0.45rem)] top-[1.85rem] z-0 hidden h-px w-[calc(100%+0.9rem)] xl:block" /> : null}
                <div className="relative flex h-full flex-col rounded-[1rem] border border-white/10 bg-slate-950/45 px-3 py-3 text-center">
                  <span className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-cyan-200/70">0{index + 1}</span>
                  <p className="mt-2 font-display text-[1rem] uppercase leading-none sm:text-[1.08rem]">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "theme-why",
    sceneId: "theme",
    sectionLabel: "Why It Works",
    eyebrow: "Theme",
    title: "You learn the idea first, then prove it with the real robot.",
    subtitle: "That keeps the lesson clear without flooding you with too much theory.",
    render: () => (
      <div className="grid h-full gap-4 xl:grid-cols-[1.02fr_0.98fr] xl:gap-6">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/40 p-5 sm:p-6">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-400">Simple model</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-5 text-center"><p className="font-display text-[1.6rem] uppercase leading-none">Sense</p><p className="mt-2 text-sm leading-6 text-slate-300">Notice what matters.</p></div>
            <div className="hidden items-center justify-center font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70 sm:flex">-&gt;</div>
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-5 text-center"><p className="font-display text-[1.6rem] uppercase leading-none">Think</p><p className="mt-2 text-sm leading-6 text-slate-300">Choose the response.</p></div>
            <div className="hidden items-center justify-center font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70 sm:flex">-&gt;</div>
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-5 text-center"><p className="font-display text-[1.6rem] uppercase leading-none">Act</p><p className="mt-2 text-sm leading-6 text-slate-300">Move with purpose.</p></div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-orange-300/18 bg-orange-200/[0.06] p-5 sm:p-6">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-orange-100/75">Mapped to the kit</p>
          <div className="mt-6 space-y-4">
            <div className="border-l border-orange-200/35 pl-4"><p className="font-display text-xl uppercase leading-none">Board = Brain</p><p className="mt-2 text-sm leading-5 text-orange-50/82 sm:text-[0.95rem] sm:leading-6">The board tells the motors what to do.</p></div>
            <div className="border-l border-orange-200/35 pl-4"><p className="font-display text-xl uppercase leading-none">Motors = Motion source</p><p className="mt-2 text-sm leading-5 text-orange-50/82 sm:text-[0.95rem] sm:leading-6">The motors create the spin that movement depends on.</p></div>
            <div className="border-l border-orange-200/35 pl-4"><p className="font-display text-xl uppercase leading-none">Sensor = Eyes later</p><p className="mt-2 text-sm leading-6 text-orange-50/82 sm:text-base sm:leading-7">The sensor is what lets the robot notice distance next.</p></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "goals-overview",
    sceneId: "goals",
    sectionLabel: "Goals",
    eyebrow: "Goals",
    title: "By the end of the session, you should understand the robot well enough to build and drive it with purpose.",
    subtitle: "The goals move from understanding, to building, to controlling the robot.",
    render: () => (
      <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.018))] p-5 sm:p-6">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-cyan-200/70">Mission board</p>
        <div className="mt-6 grid gap-4 xl:auto-rows-fr xl:grid-cols-3">
          <div className="flex h-full flex-col rounded-[1.4rem] border border-white/10 bg-slate-950/45 p-4 sm:p-5"><p className="font-display text-[1.8rem] uppercase leading-none">Understand</p><div className="mt-4 space-y-3"><div className="flex items-start gap-3 rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3"><span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" /><p className="text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">Know the brain, power, and drive parts.</p></div><div className="flex items-start gap-3 rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3"><span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" /><p className="text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">See how the robot matches the idea: sense, think, act.</p></div></div></div>
          <div className="flex h-full flex-col rounded-[1.4rem] border border-white/10 bg-slate-950/45 p-4 sm:p-5"><p className="font-display text-[1.8rem] uppercase leading-none">Build</p><div className="mt-4 space-y-3"><div className="flex items-start gap-3 rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3"><span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" /><p className="text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">Assemble the base so every part has a place.</p></div><div className="flex items-start gap-3 rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3"><span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" /><p className="text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">Wire the key parts so the robot can move cleanly.</p></div></div></div>
          <div className="flex h-full flex-col rounded-[1.4rem] border border-white/10 bg-slate-950/45 p-4 sm:p-5"><p className="font-display text-[1.8rem] uppercase leading-none">Control</p><div className="mt-4 space-y-3"><div className="flex items-start gap-3 rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3"><span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" /><p className="text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">Use tank steering to understand turning.</p></div><div className="flex items-start gap-3 rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3"><span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" /><p className="text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">Practice driving with correction instead of rushing.</p></div></div></div>
        </div>
      </div>
    ),
  },
  {
    id: "goals-boundary",
    sceneId: "goals",
    sectionLabel: "No Code Yet",
    eyebrow: "Goals",
    title: "No programming is introduced yet.",
    subtitle: "You focus on the machine first so the day stays fun, clear, and manageable.",
    render: () => (
      <div className="grid h-full gap-4 lg:grid-cols-[0.78fr_1.22fr] lg:gap-6">
        <div className="flex items-center rounded-[2rem] border border-orange-300/18 bg-orange-200/[0.07] p-5 sm:p-6"><div><p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-orange-100/75">Boundary of Day 01</p><p className="mt-5 font-display text-[2rem] uppercase leading-[0.92] sm:text-[2.5rem] lg:text-[3rem]">You learn the machine first, then level up later.</p></div></div>
        <div className="grid gap-3 sm:auto-rows-fr sm:grid-cols-3">
          <div className="flex h-full flex-col rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5"><p className="font-display text-[1.45rem] uppercase leading-[0.94]">No coding pressure</p><p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">More attention goes to parts, power, and movement.</p></div>
          <div className="flex h-full flex-col rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5"><p className="font-display text-[1.45rem] uppercase leading-[0.94]">Better build quality</p><p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">You can focus on assembly and clean connections first.</p></div>
          <div className="flex h-full flex-col rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5"><p className="font-display text-[1.45rem] uppercase leading-[0.94]">Smoother Day 2</p><p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">Sensing makes more sense once the robot already moves.</p></div>
        </div>
      </div>
    ),
  },
  {
    id: "journey-start",
    sceneId: "journey",
    sectionLabel: "Meet",
    eyebrow: "Journey",
    title: "First, you build the mental model: what a robot is, what it needs, and how it behaves.",
    subtitle: "You first learn the simple model behind the robot, then match it to the real build.",
    render: () => (
      <JourneyBoard active="Meet" blurb="The day starts by connecting the big idea of robotics to the real platform in front of you." details={[["Robotics basics", "You define a robot as something that senses, thinks, and acts."], ["Examples", "You connect that idea to everyday machines and familiar school competition robots."], ["Kit connection", "You match that same idea to the actual Day 01 platform."]]} />
    ),
  },
  {
    id: "journey-build",
    sceneId: "journey",
    sectionLabel: "Build",
    eyebrow: "Journey",
    title: "Then you assemble the robot and watch the ideas become physical.",
    subtitle: "The ideas stop being abstract once they become parts you can assemble and power.",
    render: () => (
      <JourneyBoard active="Build" blurb="This is where concepts turn into hardware: frame, board, power, motors, and wheels all find their place." details={[["Frame", "You place the chassis, power, and main electronics where they belong."], ["Connections", "You wire the key parts so the robot can receive power and control signals."], ["Activation", "The first power-on proves that separate parts can now behave like one machine."]]} />
    ),
  },
  {
    id: "journey-drive",
    sceneId: "journey",
    sectionLabel: "Drive",
    eyebrow: "Journey",
    title: "Next, you turn movement into something you can understand and control.",
    subtitle: "Driving helps you see how steering, correction, and control actually work.",
    render: () => (
      <JourneyBoard active="Drive" blurb="Driving is where wheel behavior starts to make sense. Left and right wheel changes become visible turning decisions." details={[["Steering", "Turning happens when the left and right wheels do different things."], ["Control", "You practice straight runs, smooth turns, and stopping on purpose."], ["Correction", "You learn how to recover calmly instead of overcorrecting."]]} />
    ),
  },
  {
    id: "journey-challenge",
    sceneId: "journey",
    sectionLabel: "Challenge",
    eyebrow: "Journey",
    title: "Then you apply the learning in a simple challenge that makes sense.",
    subtitle: "The maze is where movement, correction, and control come together in one task.",
    render: () => (
      <JourneyBoard active="Challenge" blurb="The maze is the first full application moment. You stop practicing pieces and start guiding the robot through one complete task." details={[["Read the course", "You identify the start, turns, narrow lane, and finish before driving."], ["Drive strategy", "You learn when to slow down, when to turn, and how to keep the robot centered."], ["Challenge run", "Clean control matters more than rushing because recovery is part of driving well."]]} />
    ),
  },
  {
    id: "robot-platform",
    sceneId: "robot",
    sectionLabel: "Platform",
    eyebrow: "Robot Platform",
    title: "This is the robot you build, power, and drive on Day 01.",
    subtitle: "Each visible part has a job in helping the robot move.",
    render: ({ activePart, setActivePart, robotMode, setRobotMode, animateRobot, toggleAnimateRobot }) => (
      <div className="grid h-full gap-4 xl:grid-cols-[0.82fr_1.18fr] xl:gap-5">
        <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[2rem] sm:p-5">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-cyan-200/70">Part map</p>
          <p className="mt-3 text-sm leading-5 text-slate-300">This Day 01 kit uses a custom Nano + TB6612FNG board, a 2x18650 battery pack, N20 motors, N20 wheels, and Bluetooth control.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.05rem] border border-white/10 bg-slate-950/40 p-3.5"><p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-cyan-200/70">Brain</p><p className="mt-2 font-display text-[1rem] uppercase leading-none">Nano + driver board</p><p className="mt-2 text-sm leading-5 text-slate-300">Decides what the motors should do.</p></div>
            <div className="rounded-[1.05rem] border border-white/10 bg-slate-950/40 p-3.5"><p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-cyan-200/70">Power</p><p className="mt-2 font-display text-[1rem] uppercase leading-none">2x18650 battery</p><p className="mt-2 text-sm leading-5 text-slate-300">Stores the energy the robot needs.</p></div>
            <div className="rounded-[1.05rem] border border-white/10 bg-slate-950/40 p-3.5"><p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-cyan-200/70">Drive</p><p className="mt-2 font-display text-[1rem] uppercase leading-none">N20 motors + wheels</p><p className="mt-2 text-sm leading-5 text-slate-300">Turn electrical power into motion.</p></div>
            <div className="rounded-[1.05rem] border border-white/10 bg-slate-950/40 p-3.5"><p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-cyan-200/70">Link</p><p className="mt-2 font-display text-[1rem] uppercase leading-none">Bluetooth control</p><p className="mt-2 text-sm leading-5 text-slate-300">Creates the control link between you and the robot.</p></div>
          </div>
          <div className="mt-4 rounded-[1.05rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-3.5">
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-cyan-100/75">Tap a part</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {partsLegend.map((part) => (
                <button key={part.id} type="button" onClick={() => setActivePart(part.id)} className={cn("rounded-full border px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] transition", activePart === part.id ? "border-cyan-300/70 bg-cyan-300/12 text-cyan-50" : "border-white/10 bg-slate-950/45 text-slate-300 hover:border-white/20")}>
                  {part.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="relative min-h-[16rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07111f] sm:min-h-[20rem] sm:rounded-[2rem] xl:min-h-0">
          <div className="absolute inset-x-0 top-0 z-10 flex flex-col gap-2 border-b border-white/10 bg-slate-950/55 px-3 py-3 backdrop-blur sm:px-5 sm:py-3.5">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-3"><div><p className="font-mono text-[0.54rem] uppercase tracking-[0.2em] text-slate-400 sm:text-[0.58rem] sm:tracking-[0.24em]">Workshop Platform Viewer</p><p className="mt-1 break-words font-display text-[1.05rem] uppercase leading-tight text-white sm:text-[1.65rem]">Custom Nano + TB6612FNG robot platform</p></div><div className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-cyan-100/70 sm:text-[0.56rem] sm:tracking-[0.18em]">{robotMode} / {activePart}</div></div>
            <div className="flex flex-wrap gap-2">
              {[ ["viewer", "Platform"], ["parts", "Parts"], ["exploded", "Exploded"] ].map(([value, label]) => (
                <button key={value} type="button" onClick={() => setRobotMode(value as RobotMode)} className={cn("rounded-full border px-2.5 py-2 font-mono text-[0.56rem] uppercase tracking-[0.16em] transition sm:px-3 sm:text-[0.62rem] sm:tracking-[0.2em]", robotMode === value ? "border-cyan-300/70 bg-cyan-300/14 text-cyan-50" : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20")}>
                  {label}
                </button>
              ))}
              <button type="button" onClick={toggleAnimateRobot} className={cn("rounded-full border px-2.5 py-2 font-mono text-[0.56rem] uppercase tracking-[0.16em] sm:px-3 sm:text-[0.62rem] sm:tracking-[0.2em]", animateRobot ? "border-orange-300/50 bg-orange-300/12 text-orange-50" : "border-white/10 bg-white/[0.03] text-slate-300")}>{animateRobot ? "Motion On" : "Motion Off"}</button>
            </div>
          </div>
          <div className="h-full pt-[7.4rem] sm:pt-24"><RobotStage mode={robotMode} activePart={activePart} animate={animateRobot} /></div>
        </div>
      </div>
    ),
  },
  {
    id: "robot-views",
    sceneId: "robot",
    sectionLabel: "Views",
    eyebrow: "Robot Platform",
    title: "Use the viewer to connect the parts to the motion.",
    subtitle: "Seeing one system at a time makes the whole robot easier to understand.",
    render: () => (
      <div className="grid h-full gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-400">Mode strip</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-4 rounded-[1.2rem] border border-white/10 bg-slate-950/35 p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/12 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cyan-50">01</span><div><p className="font-display text-xl uppercase leading-none">Platform</p><p className="mt-2 text-sm leading-5 text-slate-300 sm:text-[0.95rem] sm:leading-6">See the robot as one connected machine.</p></div></div>
            <div className="flex items-start gap-4 rounded-[1.2rem] border border-white/10 bg-slate-950/35 p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/12 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cyan-50">02</span><div><p className="font-display text-xl uppercase leading-none">Parts</p><p className="mt-2 text-sm leading-5 text-slate-300 sm:text-[0.95rem] sm:leading-6">Study one system at a time and connect it to its job.</p></div></div>
            <div className="flex items-start gap-4 rounded-[1.2rem] border border-white/10 bg-slate-950/35 p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/12 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cyan-50">03</span><div><p className="font-display text-xl uppercase leading-none">Exploded</p><p className="mt-2 text-sm leading-5 text-slate-300 sm:text-[0.95rem] sm:leading-6">See where each part sits before the whole robot comes together.</p></div></div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-5 sm:p-6">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-cyan-100/75">How to read the robot</p>
          <div className="mt-6 grid gap-4 sm:auto-rows-fr sm:grid-cols-2">
            <div className="border-l border-cyan-200/35 pl-4"><p className="font-display text-xl uppercase leading-none">Start wide</p><p className="mt-2 text-sm leading-6 text-cyan-50/82 sm:text-base sm:leading-7">First see the full shape and how the main systems relate.</p></div>
            <div className="border-l border-cyan-200/35 pl-4"><p className="font-display text-xl uppercase leading-none">Zoom into roles</p><p className="mt-2 text-sm leading-6 text-cyan-50/82 sm:text-base sm:leading-7">Then isolate the board, power, or drive parts one at a time.</p></div>
            <div className="border-l border-cyan-200/35 pl-4"><p className="font-display text-xl uppercase leading-none">Rebuild mentally</p><p className="mt-2 text-sm leading-6 text-cyan-50/82 sm:text-base sm:leading-7">Exploded view helps you imagine how the parts fit together.</p></div>
            <div className="border-l border-cyan-200/35 pl-4"><p className="font-display text-xl uppercase leading-none">Connect to motion</p><p className="mt-2 text-sm leading-6 text-cyan-50/82 sm:text-base sm:leading-7">Every mode should help you answer: what makes the robot move?</p></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "challenge-rules",
    sceneId: "challenge",
    sectionLabel: "Maze Challenge",
    eyebrow: "Practice + Challenge",
    title: "The maze gives your driving practice a real job to do.",
    subtitle: "A simple course is enough to practice steering, pacing, correction, and precise stopping.",
    render: () => (
      <div className="grid h-full gap-4 lg:grid-cols-[1.06fr_0.94fr] lg:gap-5">
        <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,20,33,0.95),rgba(5,12,20,0.97))] p-4 sm:rounded-[2rem] sm:p-5">
          <div className="course-board-grid absolute inset-0 opacity-40" />
          <div className="relative h-full">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-cyan-100/75">Practice maze</p>
            <div className="relative mt-4 h-[13.5rem] rounded-[1.15rem] border border-white/10 bg-slate-950/55 sm:h-[15.5rem] md:h-[17rem]">
              <div className="absolute left-[12%] top-[18%] h-[12%] w-[10%] rounded-[999px] border-2 border-cyan-300/70 bg-cyan-300/10" />
              <div className="absolute left-[18%] top-[22%] h-[12%] w-[38%] rounded-r-[999px] border-t-2 border-r-2 border-cyan-300/70" />
              <div className="absolute left-[54%] top-[22%] h-[34%] w-[10%] border-r-2 border-cyan-300/70" />
              <div className="absolute left-[37%] top-[52%] h-[10%] w-[27%] rounded-bl-[999px] border-b-2 border-l-2 border-cyan-300/70" />
              <div className="absolute left-[37%] top-[61%] h-[18%] w-[10%] border-l-2 border-cyan-300/70" />
              <div className="absolute left-[37%] top-[77%] h-[10%] w-[38%] rounded-r-[999px] border-b-2 border-r-2 border-cyan-300/70" />
              <div className="absolute left-[8%] top-[16%] rounded-full border border-cyan-300/35 bg-slate-950/80 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-cyan-50">Start</div>
              <div className="absolute left-[61%] top-[15%] rounded-full border border-orange-300/35 bg-slate-950/80 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-orange-50">Turn 1</div>
              <div className="absolute left-[26%] top-[47%] rounded-full border border-orange-300/35 bg-slate-950/80 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-orange-50">Turn 2</div>
              <div className="absolute left-[33%] top-[63%] rounded-full border border-white/15 bg-slate-950/80 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-slate-200">Narrow lane</div>
              <div className="absolute left-[73%] top-[73%] h-[14%] w-[14%] rounded-[1rem] border-2 border-cyan-300/70 bg-cyan-300/10" />
              <div className="absolute left-[70%] top-[88%] rounded-full border border-cyan-300/35 bg-slate-950/80 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-cyan-50">Finish box</div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-rows-[auto_1fr]">
          <div className="rounded-[1.8rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-4 sm:rounded-[2rem] sm:p-5"><p className="font-display text-[1.35rem] uppercase leading-[0.96] sm:text-[1.65rem]">Drive clean, turn early, finish in control.</p><p className="mt-3 text-sm leading-5 text-cyan-50/88 sm:text-[0.95rem] sm:leading-6">This course teaches when to slow down, how to recover from mistakes, and how to stop accurately inside a target zone.</p></div>
          <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[2rem] sm:p-5">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-orange-100/70">Rules</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-[1rem] border border-white/10 bg-slate-950/35 px-3.5 py-3"><p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-orange-100/70">Rule 01</p><p className="mt-2 text-sm leading-5 text-slate-200">Start at the line and finish inside the end zone.</p></div>
              <div className="rounded-[1rem] border border-white/10 bg-slate-950/35 px-3.5 py-3"><p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-orange-100/70">Rule 02</p><p className="mt-2 text-sm leading-5 text-slate-200">Fastest clean run wins, but control matters more than rushing.</p></div>
              <div className="rounded-[1rem] border border-white/10 bg-slate-950/35 px-3.5 py-3"><p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-orange-100/70">Rule 03</p><p className="mt-2 text-sm leading-5 text-slate-200">If the robot touches the edge, recover and keep your run controlled.</p></div>
              <div className="rounded-[1rem] border border-white/10 bg-slate-950/35 px-3.5 py-3"><p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-orange-100/70">Rule 04</p><p className="mt-2 text-sm leading-5 text-slate-200">This version works as the training challenge until the final maze is ready.</p></div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "outcomes-core",
    sceneId: "outcomes",
    sectionLabel: "Outcomes",
    eyebrow: "Learning Outcomes",
    title: "By the end of Day 01, you should understand the robot more clearly and control it with more confidence.",
    subtitle: "These are the ideas that should stick after the session ends.",
    render: () => (
      <div className="grid h-full gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6"><p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-400">What now makes sense</p><p className="mt-5 font-display text-[2rem] uppercase leading-[0.92] sm:text-[2.5rem] lg:text-[3rem]">The robot feels less mysterious because the parts now connect to real behavior.</p></div>
        <div className="rounded-[2rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-5 sm:p-6"><div className="grid gap-4 sm:auto-rows-fr sm:grid-cols-2"><div className="flex h-full flex-col rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-slate-100 sm:text-base sm:leading-7">You can name the key systems on the robot.</div><div className="flex h-full flex-col rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-slate-100 sm:text-base sm:leading-7">You can explain where motion comes from.</div><div className="flex h-full flex-col rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-slate-100 sm:text-base sm:leading-7">You can see why turning depends on left and right wheel changes.</div><div className="flex h-full flex-col rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-slate-100 sm:text-base sm:leading-7">You can drive with more control and recover from mistakes.</div><div className="rounded-[1.2rem] border border-cyan-200/25 bg-slate-950/35 px-4 py-4 text-sm leading-6 text-cyan-50/88 sm:col-span-2 sm:text-base sm:leading-7">The platform already feels familiar instead of confusing.</div></div></div>
      </div>
    ),
  },
  {
    id: "outcomes-next",
    sceneId: "outcomes",
    sectionLabel: "Day 2",
    eyebrow: "Learning Outcomes",
    title: "Day 2 adds a new skill: the robot starts noticing what is in front of it.",
    subtitle: "Day 01 is about movement. Day 2 adds sensing and reaction.",
    render: () => (
      <div className="grid h-full gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-4">
        <div className="rounded-[2rem] border border-cyan-300/18 bg-cyan-300/[0.08] p-5 sm:p-6"><p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-cyan-100/75">Today</p><p className="mt-5 font-display text-[2rem] uppercase leading-[0.92] sm:text-[2.5rem] lg:text-[3rem]">You help the robot move with purpose.</p><p className="mt-4 text-sm leading-6 text-cyan-50/88 sm:text-base sm:leading-7">Movement is the first skill because it makes motors, wheels, power, and steering easy to see.</p></div>
        <div className="hidden items-center justify-center font-mono text-sm uppercase tracking-[0.32em] text-orange-100/70 lg:flex">-&gt;</div>
        <div className="rounded-[2rem] border border-orange-300/18 bg-orange-200/[0.07] p-5 sm:p-6"><p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-orange-100/75">Next</p><p className="mt-5 font-display text-[2rem] uppercase leading-[0.92] sm:text-[2.5rem] lg:text-[3rem]">The robot starts detecting obstacles and changing what it does.</p><p className="mt-4 text-sm leading-6 text-orange-50/82 sm:text-base sm:leading-7">An ultrasonic sensor gives the robot a way to notice distance. That is when movement becomes reaction.</p></div>
      </div>
    ),
  },
];

function JourneyBoard({ active, blurb, details }: { active: string; blurb: string; details: string[][] }) {
  const steps = ["Meet", "Build", "Drive", "Challenge"];
  const activeIndex = steps.indexOf(active);
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
      <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.018))] p-5 sm:p-6">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-cyan-200/70">Learning route</p>
        <div className="mt-6 grid gap-4 md:grid-cols-4 md:items-start">
          {steps.map((step, index) => (
            <div key={step} className="relative flex items-center gap-4 md:block md:text-center">
              {index < steps.length - 1 ? <div className="journey-connector absolute left-[calc(50%+2rem)] top-[1.4rem] hidden h-px w-[calc(100%-1rem)] md:block" /> : null}
              <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-full border font-mono text-[0.62rem] uppercase tracking-[0.24em] md:mx-auto", index <= activeIndex ? "border-cyan-300/60 bg-cyan-300/12 text-cyan-50" : "border-white/10 bg-slate-950/40 text-slate-500")}>0{index + 1}</div>
              <div className="md:mt-4"><p className={cn("font-display text-xl uppercase leading-none", index === activeIndex ? "text-white" : "text-slate-500")}>{step}</p><p className="mt-2 max-w-[10rem] text-xs leading-5 text-slate-400 md:mx-auto md:text-sm md:leading-6">{step === "Meet" ? "See the robot idea." : step === "Build" ? "Turn ideas into hardware." : step === "Drive" ? "Understand control." : "Use it in one task."}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        <div className="rounded-[1.8rem] border border-cyan-300/18 bg-cyan-300/[0.07] p-5 sm:rounded-[2rem] sm:p-6"><p className="font-display text-[1.65rem] uppercase leading-[0.94] sm:text-[2rem]">{active}</p><p className="mt-3 text-sm leading-6 text-cyan-50/88 sm:text-base sm:leading-7">{blurb}</p></div>
        <div className="grid gap-3 sm:auto-rows-fr sm:grid-cols-3 xl:grid-cols-1">{details.map(([title, text]) => (<div key={title} className="flex h-full flex-col rounded-[1.15rem] border border-white/10 bg-slate-950/40 p-4"><p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-slate-400">{title}</p><p className="mt-2 text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">{text}</p></div>))}</div>
      </div>
    </div>
  );
}

export function PresentationShell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeBeat, setActiveBeat] = useState(beats[0].id);
  const [robotMode, setRobotMode] = useState<RobotMode>("viewer");
  const [activePart, setActivePart] = useState("all");
  const [animateRobot, setAnimateRobot] = useState(true);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) setActiveBeat(visible.target.dataset.beat ?? beats[0].id);
      },
      { root, threshold: [0.55, 0.72, 0.9] },
    );
    root.querySelectorAll<HTMLElement>("[data-beat]").forEach((beat) => observer.observe(beat));
    return () => observer.disconnect();
  }, []);

  const activeBeatIndex = useMemo(() => beats.findIndex((beat) => beat.id === activeBeat), [activeBeat]);
  const activeBeatData = beats[activeBeatIndex] ?? beats[0];
  const activeScene = scenes.find((scene) => scene.id === activeBeatData.sceneId) ?? scenes[0];
  const progressPercent = useMemo(() => ((Math.max(activeBeatIndex, 0) + 1) / beats.length) * 100, [activeBeatIndex]);

  const scrollToBeat = (id: string) => {
    const target = containerRef.current?.querySelector<HTMLElement>(`#${id}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!["ArrowDown", "PageDown", "ArrowUp", "PageUp"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "ArrowDown" || event.key === "PageDown") scrollToBeat(beats[Math.min(activeBeatIndex + 1, beats.length - 1)].id);
      if (event.key === "ArrowUp" || event.key === "PageUp") scrollToBeat(beats[Math.max(activeBeatIndex - 1, 0)].id);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeBeatIndex]);

  const helpers: BeatHelpers = {
    robotMode,
    activePart,
    animateRobot,
    setRobotMode: (value) => startTransition(() => setRobotMode(value)),
    setActivePart: (value) => startTransition(() => setActivePart(value)),
    toggleAnimateRobot: () => startTransition(() => setAnimateRobot((value) => !value)),
  };

  return (
    <div className="relative h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#0e1b34_0%,#08111d_35%,#04070c_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(87,214,255,0.07)_0,transparent_18%,transparent_82%,rgba(255,155,98,0.08)_100%)]" />
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-40" />
      <div className="fixed inset-x-0 top-0 z-30 h-[3px] bg-white/5"><div className="h-full bg-[linear-gradient(90deg,#57d6ff,#9ae8ff,#ff9b62)] shadow-[0_0_18px_rgba(87,214,255,0.45)] transition-[width] duration-500" style={{ width: `${progressPercent}%` }} /></div>
      <button type="button" aria-label="Toggle day one outline" onClick={() => setMenuOpen((open) => !open)} className="fixed left-3 top-3 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white backdrop-blur sm:left-4 sm:top-4 sm:h-12 sm:w-12 md:left-6 md:top-6">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      <aside className={cn("fixed left-0 top-0 z-30 h-screen w-[90vw] max-w-[20rem] border-r border-white/10 bg-slate-950/90 p-4 backdrop-blur-xl transition-transform duration-500 sm:w-[86vw] sm:p-6", menuOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="mt-16 space-y-6">
          <div className="space-y-3"><p className="font-mono text-[0.68rem] uppercase tracking-[0.36em] text-cyan-200/70">Day 01 Outline</p><h2 className="max-w-[14rem] font-display text-3xl uppercase leading-none text-white">Meet, Build, Drive</h2></div>
          <nav className="space-y-3">
            {scenes.map((scene) => {
              const isActive = scene.id === activeScene.id;
              return <div key={scene.id} className={cn("rounded-3xl border px-4 py-3", isActive ? "border-cyan-300/60 bg-cyan-300/10" : "border-white/8 bg-white/[0.02]")}><button type="button" onClick={() => scrollToBeat(scene.firstBeatId)} className="flex w-full items-start gap-4 text-left"><span className="font-mono text-xs tracking-[0.34em] text-cyan-200/70">{scene.index}</span><span className="min-w-0 space-y-1"><span className="block text-sm uppercase tracking-[0.22em] text-white/65">{scene.eyebrow}</span><span className="block break-words font-display text-lg uppercase leading-tight sm:text-xl sm:leading-none">{scene.label}</span><span className="block text-xs text-slate-400">{scene.shortTitle}</span></span></button><div className="mt-3 flex flex-wrap gap-2 pl-8">{scene.subsections.map((sub) => <button key={sub.id} type="button" onClick={() => scrollToBeat(sub.id)} className={cn("rounded-full border px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] transition", sub.id === activeBeat ? "border-cyan-300/60 bg-cyan-300/12 text-cyan-50" : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200")}>{sub.label}</button>)}</div></div>;
            })}
          </nav>
        </div>
      </aside>
      <div className="fixed right-5 top-5 z-20 hidden items-center gap-5 rounded-full border border-white/10 bg-slate-950/60 px-5 py-3 font-mono text-[0.66rem] uppercase tracking-[0.28em] text-slate-300 backdrop-blur lg:flex"><span>{activeScene.index}</span><span className="text-white">{activeScene.label}</span><span className="text-cyan-200/80">{activeBeatData.sectionLabel}</span></div>
      <main ref={containerRef} className="relative h-screen overflow-y-auto scroll-smooth md:snap-y md:snap-mandatory">{beats.map((beat) => <BeatFrame key={beat.id} beat={beat}>{beat.render(helpers)}</BeatFrame>)}</main>
    </div>
  );
}

function BeatFrame({ beat, children }: { beat: Beat; children: ReactNode }) {
  return <section id={beat.id} data-beat={beat.id} className="relative min-h-screen overflow-visible px-3 py-6 sm:px-6 sm:py-8 md:h-screen md:snap-start md:overflow-hidden md:px-8 lg:px-12"><div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[92rem] min-w-0 flex-col md:h-full md:min-h-0"><div className="mb-3 shrink-0 sm:mb-4"><p className="font-mono text-[0.6rem] uppercase tracking-[0.26em] text-cyan-200/70 sm:text-[0.64rem] sm:tracking-[0.3em]">{beat.eyebrow} / {beat.sectionLabel}</p><h2 className="mt-2 max-w-5xl break-words font-display text-[1.12rem] uppercase leading-[0.98] sm:text-[1.58rem] lg:text-[1.95rem] xl:text-[2.2rem]">{beat.title}</h2>{beat.subtitle ? <p className="mt-2 max-w-3xl text-sm leading-5 text-slate-400 sm:text-[0.92rem] sm:leading-6">{beat.subtitle}</p> : null}</div><div className="min-h-0 flex-1">{children}</div></div></section>;
}
