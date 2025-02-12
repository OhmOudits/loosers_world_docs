import { Page } from "../types";

export const pages: Page[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: `# Getting Started

Welcome to Loosers World documentation! This guide will help you get up and running quickly.

## Quick Start

1. Install the package:
\`\`\`bash
npm install loosers-world
\`\`\`

2. Initialize your project:
\`\`\`bash
npx loosers-world init
\`\`\`

## Features

- ⚡️ Lightning fast performance
- 🔒 Built-in security
- 🎨 Beautiful UI components
- 📱 Mobile-first design

## System Requirements

- Node.js 16 or later
- npm 7 or later
- Modern web browser`,
    order: 1,
    chapter: "introduction",
  },
  {
    id: "installation",
    title: "Installation",
    content: `# Installation

To use Loosers World, you need to install it using npm or yarn.

## Using npm
\`\`\`bash
npm install loosers-world
\`\`\`

## Using yarn
\`\`\`bash
yarn add loosers-world
\`\`\`

Ensure that your environment meets the system requirements before proceeding.`,
    order: 2,
    chapter: "introduction",
  },
  {
    id: "usage",
    title: "Usage",
    content: `# Usage

Once installed, you can start using Loosers World in your project.

## Basic Example

\`\`\`typescript
import { LoosersWorld } from 'loosers-world';

const app = new LoosersWorld();
app.start();
\`\`\`

## Configuration

Customize settings by passing options during initialization:

\`\`\`typescript
const app = new LoosersWorld({
  theme: 'dark',
  enableSecurity: true,
});
app.start();
\`\`\`

Refer to the API documentation for more details on available options.`,
    order: 3,
    chapter: "usage",
  },
];

// Group pages by chapter
export const chapters = pages.reduce((acc, page) => {
  const chapter = acc.find((c) => c.id === page.chapter);
  if (chapter) {
    chapter.pages.push(page);
  } else {
    acc.push({
      id: page.chapter,
      title: page.chapter.charAt(0).toUpperCase() + page.chapter.slice(1),
      pages: [page],
    });
  }
  return acc;
}, [] as { id: string; title: string; pages: Page[] }[]);

// Sort pages within each chapter
chapters.forEach((chapter) => {
  chapter.pages.sort((a, b) => a.order - b.order);
});
