'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Send as TelegramIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { subscribeToNewsletter } from '@/app/actions';
import { motion } from 'framer-motion';

/**
 * Footer component
 * Site footer with newsletter subscription form
 */
export default function Footer(): JSX.Element {
  const [email, setEmail] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    startTransition(async () => {
      const result = await subscribeToNewsletter(email);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Subscription Failed',
          description: result.error,
        });
      } else {
        toast({
          title: 'Subscribed!',
          description: result.success,
        });
        setEmail('');
      }
    });
  };
  
  return (
    <footer className="mt-12 border-t bg-card overflow-hidden">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="grid gap-8 md:grid-cols-3"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="iBelieveQuest Logo" width={32} height={32} className="object-contain" />
              <h3 className="font-headline text-lg font-bold text-primary">iBelieveQuest</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              One question, one truth, one step at a time.
            </p>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-1">
            <h4 className="font-semibold">Subscribe to our newsletter</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Receive email notifications for new posts and updates.
            </p>
            <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-sm"
                aria-label="Email for newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Subscribe'}
              </Button>
            </form>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-1">
            <h4 className="font-semibold">Follow Us</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Join the conversation on our social channels.
            </p>
            <div className="mt-4 flex gap-4">
              <Link href="https://www.facebook.com/share/19e9XdXBmQ/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Button variant="outline" size="icon" className="transition-transform hover:scale-110">
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://t.me/iBelieveQuest" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <Button variant="outline" size="icon" className="transition-transform hover:scale-110">
                  <TelegramIcon className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 border-t pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground gap-4"
        >
          <p>&copy; {new Date().getFullYear()} iBelieveQuest. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
