# Getting Started

Welcome to our documentation! This guide will help you get up and running quickly.

## Prerequisites

Before you begin, ensure you have:
- Node.js 16 or later
- npm 7 or later
- A modern web browser

## Installation

Install the package using your preferred package manager:

```bash
npm install my-package
# or
yarn add my-package
```

## Quick Start

Here's a basic example to get you started:

```typescript
import { createApp } from 'my-package';

const app = createApp({
  name: 'My App',
  theme: 'dark'
});

app.start();
```