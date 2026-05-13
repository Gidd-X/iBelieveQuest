import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for iBelieveQuest',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-8">
      <div className="space-y-4">
        <h1 className="font-headline text-4xl font-bold text-primary">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-6 text-foreground/90">
        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to iBelieveQuest. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-semibold">2. The Data We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li><strong>Identity Data:</strong> includes first name, last name, or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data:</strong> includes information about how you use our website.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-semibold">3. How We Use Your Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>To manage our relationship with you (e.g., newsletter subscriptions).</li>
            <li>To administer and protect our business and this website.</li>
            <li>To deliver relevant website content and advertisements to you.</li>
            <li>To use data analytics to improve our website, products/services, marketing, customer relationships and experiences.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-semibold">4. Google AdSense and Cookies</h2>
          <p>
            We use Google AdSense to display ads on our site. Google, as a third-party vendor, uses cookies to serve ads on our site.
            Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our 
            sites and/or other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ads Settings</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-semibold">5. Your Legal Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-semibold">6. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us via our <a href="/contact" className="text-primary hover:underline">Contact Page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
