import {
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJsSquare,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiCanva, SiFigma, SiFlask, SiMariadb, SiMysql, SiOpenai, SiTailwindcss, SiXampp } from "react-icons/si";
import { AudioLines, Code2, Image, PenTool, Sparkles } from "lucide-react";

export const skillCategories = [
  {
    title: "Frontend",
    tone: "cyan",
    items: [
      { name: "HTML5", icon: FaHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
      { name: "JavaScript", icon: FaJsSquare },
      { name: "React.js", icon: FaReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    title: "Backend",
    tone: "emerald",
    items: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "PHP", icon: FaPhp },
      { name: "Python", icon: FaPython },
      { name: "Flask", icon: SiFlask },
    ],
  },
  {
    title: "Database",
    tone: "amber",
    items: [
      { name: "MySQL", icon: SiMysql },
      { name: "MariaDB", icon: SiMariadb },
    ],
  },
  {
    title: "Design and Creative Tools",
    tone: "rose",
    items: [
      { name: "Adobe Photoshop", icon: Image },
      { name: "Adobe Illustrator", icon: PenTool },
      { name: "Adobe Express", icon: Sparkles },
      { name: "Canva", icon: SiCanva },
      { name: "Figma", icon: SiFigma },
    ],
  },
  {
    title: "Developer Tools",
    tone: "indigo",
    items: [
      { name: "VS Code", icon: Code2 },
      { name: "Git", icon: FaGitAlt },
      { name: "GitHub", icon: FaGithub },
      { name: "XAMPP", icon: SiXampp },
    ],
  },
  {
    title: "AI and Productivity Tools",
    tone: "violet",
    items: [
      { name: "ChatGPT", icon: SiOpenai },
      { name: "ElevenLabs", icon: AudioLines },
      { name: "Creative Workflow", icon: PenTool },
    ],
  },
];
