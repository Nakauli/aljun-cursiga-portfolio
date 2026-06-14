import { useState } from "react";
import { Check, Copy, Download, Facebook, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";
import { profile } from "../data/profile.js";

const socials = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "Facebook", href: profile.facebook, icon: Facebook },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Portfolio", href: profile.portfolio, icon: Send },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const openEmailDraft = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const projectType = formData.get("projectType");
    const timeline = formData.get("timeline");
    const message = formData.get("message");
    const subject = encodeURIComponent(`${projectType} inquiry from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\nProject type: ${projectType}\nPreferred timeline: ${timeline || "Flexible / to be discussed"}\nFrom: ${name}\nReply to: ${email}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative z-10 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Contact" title="Let's build something useful">
          Reach out for web projects, portfolio work, academic collaborations, layout design, or system concepts.
        </SectionHeader>

        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <motion.div
            className="rounded-[8px] border border-slate-200/80 bg-white/75 p-6 shadow-panel backdrop-blur dark:border-white/10 dark:bg-white/[0.06]"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <div className="contact-row justify-between gap-4">
                <a href={`mailto:${profile.email}`} className="flex min-w-0 items-center gap-3 hover:text-cyan-700 dark:hover:text-cyan-200">
                  <Mail className="flex-none" size={20} />
                  <span className="truncate">{profile.email}</span>
                </a>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-slate-200 bg-white/80 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.06] dark:hover:text-cyan-200"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <div className="contact-row">
                <MapPin size={20} />
                <span>{profile.location}</span>
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Social Links
              </p>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;
                  const disabled = social.href === "#";
                  const classes =
                    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 transition dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200";
                  if (disabled) {
                    return (
                      <span key={social.label} className={`${classes} cursor-not-allowed opacity-40`} aria-label={`${social.label} link coming soon`}>
                        <Icon size={18} />
                      </span>
                    );
                  }
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className={`${classes} hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-200`} aria-label={social.label}>
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
              <p aria-live="polite" className="mt-3 min-h-5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {copied ? "Email address copied." : ""}
              </p>
            </div>

            <a href={profile.cvPath} download className="btn-primary mt-8 w-full justify-center">
              Download My CV
              <Download size={18} />
            </a>
          </motion.div>

          <motion.form
            className="rounded-[8px] border border-slate-200/80 bg-white/75 p-6 shadow-panel backdrop-blur dark:border-white/10 dark:bg-white/[0.06]"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            onSubmit={openEmailDraft}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="form-field">
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" required minLength="2" placeholder="Your name" />
              </label>
              <label className="form-field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
              </label>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="form-field">
                <span>Project type</span>
                <select name="projectType" required defaultValue="">
                  <option value="" disabled>
                    Choose a project type
                  </option>
                  <option value="Website development">Website development</option>
                  <option value="Full-stack system">Full-stack system</option>
                  <option value="UI/UX or layout design">UI/UX or layout design</option>
                  <option value="Academic collaboration">Academic collaboration</option>
                  <option value="General portfolio">General inquiry</option>
                </select>
              </label>
              <label className="form-field">
                <span>Preferred timeline</span>
                <select name="timeline" defaultValue="">
                  <option value="">Flexible / to be discussed</option>
                  <option value="Within 2 weeks">Within 2 weeks</option>
                  <option value="Within 1 month">Within 1 month</option>
                  <option value="Within 2-3 months">Within 2-3 months</option>
                  <option value="Exploring for later">Exploring for later</option>
                </select>
              </label>
            </div>
            <label className="form-field mt-5">
              <span>Message</span>
              <textarea name="message" required minLength="10" rows="6" placeholder="Tell me about the project" />
            </label>
            <button type="submit" className="btn-secondary mt-6">
              Open Email Draft
              <Send size={18} />
            </button>
            <p className="mt-4 text-xs leading-6 text-slate-500 dark:text-slate-400">
              This opens your email app with the message prepared, so you can review it before sending.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
