import { motion } from 'framer-motion';
import { BookOpen, HeartHandshake, Lightbulb } from 'lucide-react';

const cards = [
  {
    title: 'For Students',
    description: 'Study with a teacher that understands your pace, answers your doubts instantly, and adapts to every concept.',
    bullets: ['Personalized learning', 'Voice-led explanations', 'Instant revision support'],
    icon: BookOpen,
  },
  {
    title: 'For Parents',
    description: 'Keep learning safe, structured, and motivating with progress insights and dependable guidance at home.',
    bullets: ['Safe learning environment', 'Weekly progress insights', 'Reliable practice plans'],
    icon: HeartHandshake,
  },
  {
    title: 'How It Works',
    description: 'Start with a live demo, experience the classroom, and begin learning in a calm, interactive way.',
    bullets: ['Join in minutes', 'Live whiteboard learning', 'Practice anytime'],
    icon: Lightbulb,
  },
];

export function InfoCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="grid gap-6 lg:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_20px_80px_-45px_rgba(15,23,42,0.55)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <Icon size={22} />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{card.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-violet-600" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
