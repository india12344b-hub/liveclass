import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function BottomCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="overflow-hidden rounded-[32px] bg-gradient-to-r from-violet-600 via-violet-500 to-fuchsia-500 px-6 py-10 text-white shadow-[0_35px_110px_-40px_rgba(91,61,245,0.65)] sm:px-8 lg:px-10"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-100">LiveClass</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Experience the future of learning with Priya Ma’am.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-violet-50">
              Join a calm, interactive, and personalized classroom that makes every concept feel easier.
            </p>
          </div>
          <a href="#demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50">
            Try Live Demo Class
            <ArrowRight size={16} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
