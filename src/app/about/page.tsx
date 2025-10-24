import Image from 'next/image';

/**
 * Default hero image for about page
 */
const ABOUT_HERO_IMAGE = 'https://images.unsplash.com/photo-1504252060324-1c76e2e09939?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtaXN0eSUyMG1vdW50YWluc3xlbnwwfHx8fDE3NjEzMTg1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080';

/**
 * About page component
 * Displays the mission and purpose of iBelieve Quest
 */
export default function AboutPage(): JSX.Element {
  return (
    <div className="overflow-hidden rounded-lg bg-card shadow-lg">
      <div className="relative h-64 w-full md:h-80">
        <Image
          src={ABOUT_HERO_IMAGE}
          alt="A person looking out over a misty mountain range at sunrise"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-primary/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="p-4 text-center font-headline text-4xl font-bold text-white md:text-6xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Our Quest
          </h1>
        </div>
      </div>
      <div className="p-6 md:p-12">
        <div className="mx-auto max-w-4xl space-y-6 text-lg leading-relaxed text-foreground">
          <p className="text-2xl font-light italic">
            "Welcome to iBelieve Quest. This is a space where faith meets questions, and questions lead to discovery."
          </p>
          <p>
            Life is full of mysteries. Faith is full of wrestlings. Religion often raises more questions than answers. Here, we don't shy away from the hard stuff; we lean into it. Whether you're wondering about the meaning of life, wrestling with doubts, exploring Christianity, or seeking spiritual clarity, this is your place to ask, seek, and grow.
          </p>
          <p>
            At iBelieve Quest, we believe the journey of questioning isn't a weakness; it's the path to deeper faith and greater understanding. With thought-provoking articles, honest reflections, and open conversations, we explore the controversial, the challenging, and the inspiring truths about life, belief, and spirituality.
          </p>
          <p className="font-bold text-primary">
            This isn't about easy answers. It's about honest exploration. And every question matters.
          </p>
          <p>
            Join the quest. Subscribe today and let's walk this journey together; one question, one truth, one step at a time.
          </p>
        </div>
      </div>
    </div>
  );
}
