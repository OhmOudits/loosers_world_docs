import { Page } from '../types';

export const pages: Page[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    content: `# Getting Started

Welcome to Loosers World documentation! This guide will help you get up and running quickly.

## Installation

First, install the package using npm:

\`\`\`bash
npm install loosers-world
\`\`\`

Or using yarn:

\`\`\`bash
yarn add loosers-world
\`\`\`

## Basic Usage

Here's a simple example:

\`\`\`typescript
import { createWorld } from 'loosers-world';

const world = createWorld({
  name: 'My World',
  theme: 'dark',
  features: ['chat', 'profiles']
});

world.init();
\`\`\`

## Features

- ⚡️ Lightning fast performance
- 🔒 Built-in security
- 🎨 Beautiful UI components
- 📱 Mobile-first design

## Configuration

You can customize various settings:

\`\`\`javascript
{
  "theme": "dark",
  "language": "en",
  "features": {
    "chat": true,
    "profiles": true,
    "notifications": false
  }
}
\`\`\`

## System Requirements

- Node.js 16 or later
- npm 7 or later
- Modern web browser`,
    order: 1,
    chapter: 'introduction'
  }
];

// Group pages by chapter
export const chapters = pages.reduce((acc, page) => {
  const chapter = acc.find(c => c.id === page.chapter);
  if (chapter) {
    chapter.pages.push(page);
  } else {
    acc.push({
      id: page.chapter,
      title: page.chapter.charAt(0).toUpperCase() + page.chapter.slice(1),
      pages: [page]
    });
  }
  return acc;
}, [] as { id: string; title: string; pages: Page[] }[]);

// Sort pages within each chapter
chapters.forEach(chapter => {
  chapter.pages.sort((a, b) => a.order - b.order);
});