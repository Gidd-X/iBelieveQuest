'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg md:p-6">
      <div className="container mx-auto flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 space-y-2 pr-8 md:pr-4">
          <h3 className="font-semibold text-lg">We value your privacy</h3>
          <p className="text-sm text-muted-foreground">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies. Read more in our{' '}
            <Link href="/privacy-policy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto shrink-0">
          <Button variant="outline" onClick={declineCookies} className="w-full sm:w-auto">
            Reject All
          </Button>
          <Button onClick={acceptCookies} className="w-full sm:w-auto">
            Accept All
          </Button>
        </div>
        <button 
          onClick={declineCookies} 
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground md:right-6 md:top-6"
          aria-label="Close cookie banner"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
