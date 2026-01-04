import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-8">
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using this website and our applications, you accept and agree 
                  to be bound by the terms and provisions of this agreement. If you do not agree 
                  to these terms, please do not use our services.
                </p>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-3">Use License</h2>
                <p className="text-muted-foreground">
                  Permission is granted to temporarily download one copy of the applications for 
                  personal, non-commercial transitory viewing only. This is the grant of a license, 
                  not a transfer of title, and under this license you may not modify or copy the 
                  materials, use them for any commercial purpose, or attempt to reverse engineer 
                  any software.
                </p>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>
                <p className="text-muted-foreground">
                  The materials on this website and in our applications are provided on an 'as is' 
                  basis. We make no warranties, expressed or implied, and hereby disclaim and negate 
                  all other warranties including, without limitation, implied warranties or conditions 
                  of merchantability, fitness for a particular purpose, or non-infringement of 
                  intellectual property.
                </p>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-3">Limitations</h2>
                <p className="text-muted-foreground">
                  In no event shall we or our suppliers be liable for any damages arising out of the 
                  use or inability to use the materials on our website or applications, even if we 
                  have been notified orally or in writing of the possibility of such damage.
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
