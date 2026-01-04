import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Code2, Zap, Target, Heart } from "lucide-react";

const techStack = [
  "React, TypeScript, Tailwind CSS",
  "Vite",
  "Supabase & PostgreSQL",
  "Git & GitHub",
  "Linux (including security-focused environments)",
];

const About = () => {
  return (
    <Layout>
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                About <span className="gradient-text">Me</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A passionate developer focused on creating impactful software solutions.
              </p>
            </motion.div>

            {/* Story Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">My Story</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I’m RS, currently studying Computer Science and Engineering with Cyber Security Specialization.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                I didn’t start with a clear plan to become a developer or a cybersecurity professional. Like many people, my interest in technology grew gradually. At first, it was just curiosity — using computers, exploring software, and wanting to understand how things work instead of only using them.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Over time, that curiosity turned into interest. I started learning more about programming, systems, and how applications are built. While exploring these areas, I became especially interested in how systems can fail, how mistakes happen, and how they can be prevented. That’s what slowly pulled me toward cybersecurity.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                I’m still learning. I don’t claim to know everything, and I don’t rush to label myself as an expert. I prefer taking time to understand things properly, even if that means learning slowly and making mistakes along the way.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This website reflects that journey — learning, building, experimenting, and improving step by step.
              </p>
            </motion.div>

            {/* What I Build */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">What I Build</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Right now, I spend my time learning and building things related to technology and security.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                That includes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                <li>Creating websites and small applications to understand how real systems work</li>
                <li>Exploring how authentication, data storage, and user flows are designed</li>
                <li>Learning security concepts by looking at how applications can be misused or broken</li>
                <li>Experimenting with Linux and development tools to strengthen my foundation</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                I build projects mainly to learn, not to impress. Every project helps me understand something new, whether it’s development, design, or security.
              </p>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Tech Stack</h2>
              </div>
              <p className="text-muted-foreground mb-4">These are tools I currently use or actively learn as part of my journey:</p>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I want to grow into a well-rounded technology professional with a strong understanding of both development and cybersecurity. My goal is to gain real experience, learn how systems work in the real world, and eventually build things that are reliable, secure, and genuinely useful.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                I don’t believe in shortcuts or hype. I believe progress comes from consistency, curiosity, and patience — and that’s the approach I’m following.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
