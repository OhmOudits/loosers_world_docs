import { BookIcon, RocketIcon, WrenchIcon, Settings2Icon, CodeIcon, TerminalIcon, type LucideIcon } from 'lucide-react';

export interface Page {
  id: string;
  title: string;
  content: string;
  icon: LucideIcon;
}

export interface Section {
  id: string;
  title: string;
  pages: Page[];
}

export function getContent(): Section[] {
  const rootPages = [
    {
      id: 'book_introduction',
      title: 'Introduction',
      icon: BookIcon,
      content: `# Introduction

Welcome to our comprehensive documentation. This guide will help you understand and make the most of our platform.

## Overview

Our platform provides:
- Fast and reliable performance
- Secure by default
- Easy to customize
- Extensive API

## Key Features

- **Performance**: Built with speed in mind
- **Security**: Industry-standard security practices
- **Flexibility**: Adapt to your needs
- **Support**: Active community and support

## Getting Help

If you need help, you can:
- Join our Discord community
- Open a GitHub issue
- Read our FAQ
- Contact support`
    },
    {
      id: 'rocket_quickstart',
      title: 'Quick Start',
      icon: RocketIcon,
      content: `# Quick Start

Get up and running in minutes with our quick start guide.

## Installation

\`\`\`bash
npm install my-package
\`\`\`

## Basic Setup

Create a new project:

\`\`\`typescript
import { createProject } from 'my-package';

const project = createProject({
  name: 'My Project'
});
\`\`\`

## Next Steps

- Configure your project
- Add authentication
- Deploy to production

## Examples

Check out our examples repository for more detailed examples.`
    }
  ];

  return [
    {
      id: 'root',
      title: 'Root',
      pages: rootPages
    },
    {
      id: 'installation',
      title: 'Installation',
      pages: [
        {
          id: 'wrench_getting-started',
          title: 'Getting Started',
          icon: WrenchIcon,
          content: `# Getting Started

Welcome to our documentation! This guide will help you get up and running quickly.

## Prerequisites

Before you begin, ensure you have:
- Node.js 16 or later
- npm 7 or later
- A modern web browser

## Installation

Install the package using your preferred package manager:

\`\`\`bash
npm install my-package
# or
yarn add my-package
\`\`\`

## Quick Start

Here's a basic example to get you started:

\`\`\`typescript
import { createApp } from 'my-package';

const app = createApp({
  name: 'My App',
  theme: 'dark'
});

app.start();
\`\`\``
        },
        {
          id: 'tool_configuration',
          title: 'Configuration',
          icon: Settings2Icon,
          content: `# Configuration

Learn how to configure the package to suit your needs.

## Basic Configuration

Create a configuration file named \`config.json\`:

\`\`\`json
{
  "theme": "dark",
  "language": "en",
  "features": {
    "analytics": true,
    "authentication": true
  }
}
\`\`\`

## Environment Variables

Set up your environment variables:

\`\`\`bash
APP_SECRET=your-secret-key
API_URL=https://api.example.com
\`\`\`

## Advanced Options

For advanced use cases, you can customize the behavior:

\`\`\`typescript
import { configure } from 'my-package';

configure({
  cache: {
    type: 'redis',
    ttl: 3600
  },
  logging: {
    level: 'debug',
    format: 'json'
  }
});
\`\`\``
        }
      ]
    },
    {
      id: 'usage',
      title: 'Usage',
      pages: [
        {
          id: 'code_examples',
          title: 'Code Examples',
          icon: CodeIcon,
          content: `# Code Examples

Explore common usage patterns and examples.

## Basic Usage

Here's a simple example:

\`\`\`typescript
import { createWidget } from 'my-package';

const widget = createWidget({
  title: 'My Widget',
  theme: 'dark'
});

widget.render();
\`\`\`

## Advanced Patterns

For more complex scenarios:

\`\`\`typescript
import { Widget, useTheme } from 'my-package';

function CustomWidget() {
  const theme = useTheme();
  
  return (
    <Widget
      theme={theme}
      onUpdate={() => {
        console.log('Widget updated');
      }}
    />
  );
}
\`\`\``
        },
        {
          id: 'terminal_cli-usage',
          title: 'CLI Usage',
          icon: TerminalIcon,
          content: `# CLI Usage

Learn how to use the command-line interface.

## Basic Commands

Start the development server:

\`\`\`bash
my-package dev
\`\`\`

Build for production:

\`\`\`bash
my-package build
\`\`\`

## Configuration

Create a configuration file:

\`\`\`bash
my-package init
\`\`\`

## Advanced Usage

Deploy to production:

\`\`\`bash
my-package deploy --env production
\`\`\`

Generate types:

\`\`\`bash
my-package generate-types
\`\`\``
        }
      ]
    }
  ];
}