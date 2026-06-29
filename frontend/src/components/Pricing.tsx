import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, CheckCircle2, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '₹499',
    description: 'Perfect for trying premium live learning with a few focused sessions.',
    features: ['1 live demo', 'Daily doubt support', 'Notes & revision'],
  },
  {
    name: 'Pro',
    price: '₹799',
    featured: true,
    description: 'Most loved for ongoing support, concept rounds, and regular practice.',
    features: ['Unlimited concept sessions', 'Interactive whiteboard', 'Priority doubt solving'],
  },
  {
    name: 'Premium',
    price: '₹999',
    description: 'For students who want full mentorship and complete exam readiness.',
    features: ['Everything in Pro', 'Weekly progress reviews', 'Exam-focused practice'],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-600">Pricing</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Simple and affordable pricing for every learner.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Choose the plan that matches your learning rhythm and begin with clarity, confidence, and structure.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-45px_rgba(15,23,42,0.45)] lg:max-w-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-violet-600">
            <Sparkles size={16} />
            Our Promise
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-slate-900">Learn without pressure.</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Every session is built to make concepts easier, class engagement stronger, and confidence higher.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-violet-600"/>No hidden fees</li>
            <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-violet-600"/>Flexible pricing</li>
            <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-violet-600"/>Lifetime concept support</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.article
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.07 }}
            className={`rounded-[28px] border p-8 shadow-[0_25px_80px_-45px_rgba(15,23,42,0.35)] ${plan.featured ? 'border-violet-300 bg-violet-600 text-white' : 'border-slate-200 bg-white text-slate-900'}`}
          >
            {plan.featured ? (
              <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">Most Popular</div>
            ) : null}
            <h3 className="mt-6 text-2xl font-semibold">{plan.name}</h3>
            <p className={`mt-3 text-sm leading-7 ${plan.featured ? 'text-violet-50' : 'text-slate-600'}`}>{plan.description}</p>
            <p className="mt-8 text-4xl font-bold">{plan.price}</p>
            <p className={`mt-2 text-sm ${plan.featured ? 'text-violet-100' : 'text-slate-500'}`}>per month</p>
            <ul className="mt-8 space-y-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className={plan.featured ? 'text-white' : 'text-violet-600'} />
                  {feature}
                </li>
              ))}
            </ul>
            <a href="#register" className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${plan.featured ? 'bg-white text-violet-700 hover:bg-violet-50' : 'bg-slate-900 text-white hover:bg-slate-700'}`}>
              Get Started <ArrowRight size={16} />
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
