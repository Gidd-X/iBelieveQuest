import type { Metadata } from 'next';
import ContactForm from '@/components/contact-form';
import { Mail, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with iBelieveQuest',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl py-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="font-headline text-4xl font-bold text-primary">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We&apos;d love to hear from you. Whether you have a question, feedback, or just want to connect, feel free to reach out.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have a question about faith, doubt, or a recent article? Use the form to send us a message directly. We read every email and will get back to you as soon as possible.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <a href="mailto:contact@ibelievequest.com" className="text-muted-foreground hover:text-primary transition-colors">
                  contact@ibelievequest.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Social Media</p>
                <p className="text-muted-foreground">
                  Connect with us on <a href="https://www.facebook.com/share/19e9XdXBmQ/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Facebook</a> and <a href="https://t.me/iBelieveQuest" target="_blank" rel="noreferrer" className="text-primary hover:underline">Telegram</a>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
