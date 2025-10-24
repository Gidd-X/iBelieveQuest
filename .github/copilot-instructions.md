# GitHub Copilot Instructions for iBelieveQuest

## Project Overview
iBelieveQuest is a Next.js 15 application for faith-based content and spiritual exploration. The app integrates with Supabase for data storage and uses modern React patterns with TypeScript.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **AI Integration**: Google Genkit for religious passage suggestions
- **State Management**: React hooks

## Key Principles

### Code Quality Standards
- Follow DRY (Don't Repeat Yourself) - Extract reusable logic into utility functions
- Apply KISS (Keep It Simple, Stupid) - Prefer simple, readable solutions
- Adhere to YAGNI (You Aren't Gonna Need It) - Don't add features until needed
- Enforce SRP (Single Responsibility Principle) - One function, one purpose
- Maintain SOC (Separation of Concerns) - Separate business logic from UI
- Ensure proper modularization - Split code into logical modules

### TypeScript Guidelines
- Always use explicit type annotations for function parameters and return types
- Use the Supabase-generated types from `@/lib/supabase.type.ts` for all database operations
- Define proper interfaces for component props
- Avoid `any` type - use proper types or `unknown` when necessary
- Use type aliases for complex types to improve readability

### Next.js Best Practices
- Use Server Components by default, Client Components only when needed
- Implement proper error handling with error.tsx and not-found.tsx
- Use Next.js Image component for all images with proper sizing
- Implement proper metadata for SEO
- Follow App Router conventions for file structure

### Supabase Integration
- Always use the typed Supabase client from `@/lib/supabase/server.ts` or `@/lib/supabase/client.ts`
- Use `Tables<'TableName'>` type for database rows
- Handle Supabase errors gracefully with proper user feedback
- Use server actions for mutations
- Implement proper data fetching patterns with caching

### Component Structure
- Keep components focused and single-purpose
- Extract reusable UI logic into custom hooks
- Use composition over inheritance
- Implement proper prop validation with TypeScript
- Add JSDoc comments for complex components

### Error Handling
- Always handle async errors with try-catch or error boundaries
- Provide user-friendly error messages
- Log errors appropriately for debugging
- Validate user inputs on both client and server

### Styling
- Use Tailwind utility classes
- Follow the design system in shadcn/ui components
- Ensure responsive design with mobile-first approach
- Maintain consistent spacing and typography

## File Structure
```
src/
├── app/              # Next.js app router pages
├── components/       # React components (ui/ for shadcn components)
├── lib/             # Utility functions and configurations
│   ├── supabase/    # Supabase client configuration
│   └── utils.ts     # Helper utilities
├── hooks/           # Custom React hooks
└── ai/              # AI integration logic
```

## Common Patterns

### Server Actions
```typescript
'use server'

import { createServerClient } from '@/lib/supabase/server'
import type { Tables } from '@/lib/supabase.type'

export async function getData(): Promise<Tables<'TableName'>[]> {
  const supabase = createServerClient()
  const { data, error } = await supabase.from('TableName').select('*')
  
  if (error) {
    console.error('Error fetching data:', error)
    return []
  }
  
  return data
}
```

### Client Components
```typescript
'use client'

import { useState } from 'react'
import type { Tables } from '@/lib/supabase.type'

interface ComponentProps {
  data: Tables<'TableName'>
}

export default function Component({ data }: ComponentProps): JSX.Element {
  // Component logic
}
```

## Database Schema
Main tables:
- `Blogs`: Blog posts with title, content, author, tags, cover_photo, excerpt
- `comments`: User comments on blog posts

Refer to `src/lib/supabase.type.ts` for complete type definitions.

## Testing Considerations
- Write clean, testable code
- Separate business logic from UI components
- Mock Supabase calls in tests
- Test error states and edge cases

## Environment Variables
Required variables (check .env.local):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Google AI API keys for genkit integration

## Additional Notes
- The app uses edge runtime for some routes
- Static generation is used where possible
- Comments section uses pagination
- AI suggester provides religious passage recommendations
