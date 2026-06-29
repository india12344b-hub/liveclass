import { motion } from 'framer-motion';
import { Brain, Compass, Landmark, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';

const features = [
  {
    title: 'AI Teacher That Feels Real',
    description: 'A natural tutor that speaks clearly and adapts to your learning rhythm.',
    icon: Brain,
  },
  {
    title: 'Concepts Made Super Simple',
    description: 'Even hard topics are broken into simple steps with relatable examples.',
    icon: Compass,
  },
  {
    title: 'Personalized Just For You',
    description: 'Lessons are tailored around your pace, doubts, and preferred style.',
    icon: Sparkles,
  },
  {
    title: 'Learn Anytime Anywhere',
    description: 'Study from your phone, tablet, or laptop with a seamless classroom experience.',
    icon: PhoneCall,
  },
  {
    title: 'Boost Confidence & Marks',
    description: 'Frequent practice and instant feedback keep students positive and prepared.',
    icon: ShieldCheck,
  },
  {
    title: 'For All Boards',
    description: 'Aligned to CBSE, ICSE, and state board syllabi for school learning success.',
    icon: Landmark,
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-600">Why Students Love LiveClass</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Learning that feels personal, calm, and effective.
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-[24px] border border-slate-200 bg-slate-50 p-8 shadow-[0_18px_70px_-40px_rgba(15,23,42,0.45)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm">
                <Icon size={22} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{feature.description}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
