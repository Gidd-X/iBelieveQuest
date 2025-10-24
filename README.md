# iBelieveQuest

A Next.js application for faith-based content and spiritual exploration, where faith meets questions and questions lead to discovery.

## About

iBelieveQuest is a space where we don't shy away from life's hard questions. Whether you're wondering about the meaning of life, wrestling with doubts, exploring Christianity, or seeking spiritual clarity, this is your place to ask, seek, and grow.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **AI Integration**: Google Genkit for religious passage suggestions

## Features

- 📖 Blog articles with rich content
- 💬 Comment system with pagination
- 🤖 AI-powered religious passage suggestions
- 📱 Fully responsive design
- ⚡ Server-side rendering and static generation
- 🔒 Type-safe with TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Gidd-X/iBelieveQuest.git
cd iBelieveQuest
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) to view the app.

### Building for Production

```bash
npm run build
npm run start
```

## Database Schema

The application uses two main tables:

### Blogs Table
- `id`: Unique identifier
- `title`: Blog post title
- `content`: HTML content
- `excerpt`: Short description
- `author`: Author name
- `cover_photo`: Cover image URL
- `tags`: Array of tags
- `created_at`: Timestamp

### Comments Table
- `id`: Unique identifier
- `blog_id`: Reference to blog post
- `name`: Commenter name
- `comment`: Comment text
- `created_at`: Timestamp

## Project Structure

```
src/
├── app/              # Next.js app router pages and layouts
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   └── ...          # Custom components
├── lib/             # Utility functions and configurations
│   ├── supabase/    # Supabase client setup
│   └── utils.ts     # Helper functions
├── hooks/           # Custom React hooks
└── ai/              # AI integration logic
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript compiler check

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please open an issue on GitHub.
