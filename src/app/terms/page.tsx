import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for iBelieveQuest',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-8">
      <div className="space-y-4">
        <h1 className="font-headline text-4xl font-bold text-primary">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-6 text-foreground/90">
        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing and using iBelieveQuest, you accept and agree to be bound by the terms and provision of this agreement. 
            In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable 
            to such services. Any participation in this service will constitute acceptance of this agreement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-semibold">2. Description of Service</h2>
          <p>
            iBelieveQuest is a blog providing articles, insights, and discussions regarding faith and thoughtful questions. 
            The content is for informational and educational purposes only.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-semibold">3. User Conduct</h2>
          <p>
            You agree to use the site only for lawful purposes. You agree not to take any action that might compromise the 
            security of the site, render the site inaccessible to others, or otherwise cause damage to the site or the content.
          </p>
          <p>
            When posting comments, you agree not to submit any content that is defamatory, abusive, profane, threatening, 
            offensive, or illegal. We reserve the right to remove any comments that violate these guidelines.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-semibold">4. Intellectual Property</h2>
          <p>
            The site and its original content, features, and functionality are owned by iBelieveQuest and are protected by 
            international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-semibold">5. External Links</h2>
          <p>
            Our website may contain links to external sites that are not operated by us. We have no control over the content 
            and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-semibold">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We do so by posting and drawing attention to the updated 
            terms on the site. Your decision to continue to visit and make use of the site after such changes have been made 
            constitutes your formal acceptance of the new Terms of Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-semibold">7. Contact Us</h2>
          <p>
            If you have any questions about this Agreement, please feel free to <a href="/contact" className="text-primary hover:underline">contact us</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
