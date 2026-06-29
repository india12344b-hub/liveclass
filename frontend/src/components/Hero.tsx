import { motion } from 'framer-motion';
import { ArrowRight, Brain, Mic, NotebookPen, Sparkles, Waves, MessageCircleMore, Hand } from 'lucide-react';

const features = [
  { label: 'Real-time Voice Class', icon: Mic },
  { label: 'Interactive Whiteboard', icon: NotebookPen },
  { label: 'Concept Clarity', icon: Brain },
];

const quickActions = [
  { label: 'Raise Hand', icon: Hand },
  { label: 'Ask Doubt', icon: MessageCircleMore },
  { label: 'Notes', icon: NotebookPen },
  { label: 'Save', icon: Sparkles },
];

export function Hero() {
  return (
    <section id="home" className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center"
      >
        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
          <Sparkles size={16} />
          India’s Most Loved AI Teacher
        </div>

        <h1 className="max-w-2xl text-4xl font-black leading-[0.95] tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
          Learn Better.
          <span className="mt-3 block text-violet-600">Understand Deeper.</span>
          <span className="mt-3 block text-slate-900">With Priya Ma’am ✨</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
          Live 1-to-1 classes with an AI teacher for Class 5 to 12 across all boards.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.label} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                <Icon size={16} className="text-violet-600" />
                {feature.label}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#demo" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700">
            Try Live Demo Class
            <ArrowRight size={16} />
          </a>
          <a href="#register" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:text-violet-700">
            Register Now
          </a>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Already have an account?{' '}
          <a href="#login" className="font-semibold text-violet-600 hover:text-violet-700">
            Login
          </a>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
      >
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-violet-50 p-5 shadow-[0_40px_120px_-30px_rgba(91,61,245,0.35)] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Today’s Class</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Physics</h2>
              <p className="mt-2 max-w-[220px] text-sm text-slate-500">Work, Energy and Power</p>
            </div>
            <div className="rounded-full bg-violet-600 px-3 py-2 text-xs font-semibold text-white shadow-md">
              Live Demo Class
            </div>
          </div>

          <div className="mt-6 rounded-[28px] border border-violet-100 bg-gradient-to-br from-violet-100 via-fuchsia-50 to-white p-4 sm:p-5">
            <div className="flex items-center gap-4">
              <div className="relative flex h-28 w-24 items-end justify-center overflow-hidden rounded-[24px] bg-gradient-to-br from-violet-500 via-indigo-500 to-fuchsia-500 shadow-lg">
                <div className="absolute left-4 top-4 h-8 w-8 rounded-full border-4 border-white/80" />
                <div className="mb-3 h-14 w-16 rounded-t-[16px] bg-white/80" />
              </div>
              <div className="flex-1 rounded-[24px] bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-medium text-slate-500">Priya Ma’am is explaining</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">The concept of work</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-violet-600">
                  <Waves size={16} />
                  Voice waveform active
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                  <MessageCircleMore size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Student question</p>
                  <p className="text-sm text-slate-500">Why does energy transform?</p>
                </div>
              </div>
            </div>
            <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                  <Sparkles size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Teacher response</p>
                  <p className="text-sm text-slate-500">Let’s visualize it together.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 rounded-[24px] border border-slate-200 bg-slate-950 p-4 text-white sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <div key={action.label} className="flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-3">
                  <Icon size={16} className="text-violet-300" />
                  <span className="text-sm font-medium">{action.label}</span>
                </div>
              );
            })}
          </div>

          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -left-4 top-16 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl lg:block"
          >
            <p className="text-sm font-semibold text-slate-800">Live Demo</p>
            <p className="mt-1 text-sm text-slate-500">Interactive session</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
