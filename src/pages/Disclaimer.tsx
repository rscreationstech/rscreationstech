import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

const Disclaimer = () => {
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
              <span className="gradient-text">Disclaimer</span>
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-8">
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-3">Website Disclaimer</h2>
                <p className="text-muted-foreground">
                  The information provided by this website and our applications is for general 
                  informational purposes only. All information is provided in good faith, however, 
                  we make no representation or warranty of any kind, express or implied, regarding 
                  the accuracy, adequacy, validity, reliability, availability, or completeness of 
                  any information.
                </p>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-3">External Links Disclaimer</h2>
                <p className="text-muted-foreground">
                  This website may contain links to external websites that are not provided or 
                  maintained by us. We do not guarantee the accuracy, relevance, timeliness, or 
                  completeness of any information on these external websites.
                </p>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-3">Fair Use Disclaimer</h2>
                <p className="text-muted-foreground">
                  This website may contain copyrighted material the use of which has not always 
                  been specifically authorized by the copyright owner. We are making such material 
                  available for criticism, comment, news reporting, teaching, scholarship, or 
                  research. We believe this constitutes 'fair use' under copyright law.
                </p>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-3">Errors and Omissions</h2>
                <p className="text-muted-foreground">
                  While we have made every attempt to ensure that the information contained in this 
                  site has been obtained from reliable sources, we are not responsible for any errors 
                  or omissions, or for the results obtained from the use of this information.
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

export default Disclaimer;
