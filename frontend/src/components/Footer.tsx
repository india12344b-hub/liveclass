import { BookOpen, Globe2, MessageCircle, Sparkles } from 'lucide-react';

const companyLinks = ['About Us', 'Contact', 'Careers'];
const studentLinks = ['For Students', 'Live Demo', 'Practice'];
const parentLinks = ['For Parents', 'Progress', 'Safety'];
const supportLinks = ['Help Center', 'FAQs', 'Community'];

const socialIcons = [
  { icon: Globe2, label: 'Website' },
  { icon: MessageCircle, label: 'Community' },
  { icon: BookOpen, label: 'Learning' },
  { icon: Sparkles, label: 'Updates' },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-4 py-12 text-slate-300 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <p className="text-xl font-semibold text-white">LiveClass</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            Learning that feels personal, engaging, and effortless for every student and every parent.
          </p>
          <div className="mt-6 flex gap-3">
            {socialIcons.map((social) => {
              const Icon = social.icon;
              return (
                <a key={social.label} href="#" className="rounded-full border border-slate-800 p-2 text-slate-400 transition hover:border-violet-500 hover:text-white">
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">Company</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {companyLinks.map((link) => <li key={link}>{link}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">Students</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {studentLinks.map((link) => <li key={link}>{link}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">Parents</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {parentLinks.map((link) => <li key={link}>{link}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">Support</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {supportLinks.map((link) => <li key={link}>{link}</li>)}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 LiveClass. All rights reserved.</p>
        <p>Designed for better learning experiences.</p>
      </div>
    </footer>
  );
}
