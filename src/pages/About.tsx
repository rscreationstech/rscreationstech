import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Code2, Zap, Target, Heart } from "lucide-react";

const techStack = [
  "React", "TypeScript", "Next.js", "Node.js",
  "Python", "PostgreSQL", "Supabase", "Tailwind CSS",
  "Docker", "AWS", "Git", "Framer Motion"
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
                I'm a software developer with a passion for building applications that make a difference. 
                My journey started with curiosity about how things work, which led me down the path of 
                programming and software development. Over the years, I've had the opportunity to work on 
                various projects, from mobile apps to web platforms, always striving to create elegant 
                solutions to complex problems.
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
                I specialize in building modern web and mobile applications with a focus on user experience 
                and performance. From developer tools to consumer apps, I enjoy tackling challenges that 
                require creative thinking and technical expertise. Every project is an opportunity to learn 
                something new and push the boundaries of what's possible.
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
                I believe technology should empower people and make their lives easier. My goal is to 
                continue building products that solve real problems while contributing to the developer 
                community through open-source projects and knowledge sharing. The future of software is 
                collaborative, accessible, and user-centered—and I'm excited to be part of it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
