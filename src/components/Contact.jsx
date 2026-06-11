import { Github, Linkedin, Mail, MapPin, Send, Download, Facebook } from "lucide-react";
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
              <a href={`mailto:${profile.email}`} className="contact-row">
                <Mail size={20} />
                <span>{profile.email}</span>
              </a>
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
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={disabled ? undefined : "_blank"}
                      rel={disabled ? undefined : "noreferrer"}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 transition hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:text-cyan-200"
                      aria-label={social.label}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
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
            action={`mailto:${profile.email}`}
            method="post"
            encType="text/plain"
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
            <label className="form-field mt-5">
              <span>Message</span>
              <textarea name="message" required minLength="10" rows="6" placeholder="Tell me about the project" />
            </label>
            <button type="submit" className="btn-secondary mt-6">
              Send Message
              <Send size={18} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
