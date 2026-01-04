import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

const PrivacyPolicy = () => {
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
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-8">
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
                <p className="text-muted-foreground">
                  We collect information you provide directly to us, such as when you contact us 
                  through our website or download our applications. This may include your name, 
                  email address, and any other information you choose to provide.
                </p>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
                <p className="text-muted-foreground">
                  We use the information we collect to respond to your inquiries, improve our 
                  services, and communicate with you about updates and new features. We do not 
                  sell your personal information to third parties.
                </p>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-3">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. However, 
                  no method of transmission over the Internet is 100% secure.
                </p>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at 
                  hello@example.com.
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

export default PrivacyPolicy;
