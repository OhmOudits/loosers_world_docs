import {
  BookIcon,
  RocketIcon,
  WrenchIcon,
  Settings2Icon,
  CodeIcon,
  TerminalIcon,
  type LucideIcon,
} from "lucide-react";
import bookIntroduction from "../content/book_introduction.md?raw";
import rocketQuickStart from "../content/rocket_quickstart.md?raw";
import gettingStarted from "../content/installation/wrench_getting-started.md?raw";
import toolConfiguration from "../content/installation/tool_configuration.md?raw";
import codeExamples from "../content/usage/code_examples.md?raw";
import terminalCommands from "../content/usage/terminal_cli-usage.md?raw";

export interface Page {
  id: string;
  title: string;
  content: string;
  icon: LucideIcon;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  author: string;
}

export interface Section {
  id: string;
  title: string;
  pages: Page[];
}

export function getContent(): Section[] {
  const rootPages = [
    {
      id: "book_introduction",
      title: "Introduction",
      icon: BookIcon,
      content: bookIntroduction,
      metaTitle: "Introduction - Looser World Documentation",
      metaDescription: "Learn about the introduction to our platform.",
      keywords:
        "loosers world documentation, loosers world docs,loosers world getting started,loosers world",
      author: "John Doe",
    },
    {
      id: "rocket_quickstart",
      title: "Quick Start",
      icon: RocketIcon,
      content: rocketQuickStart,
      metaTitle: "Quick Start - Looser World Documentation",
      metaDescription: "Get started quickly with our guide and setup process.",
      keywords: "quick start, setup, beginner guide",
      author: "Jane Smith",
    },
  ];

  return [
    {
      id: "root",
      title: "Root",
      pages: rootPages,
    },
    {
      id: "installation",
      title: "Installation",
      pages: [
        {
          id: "wrench_getting-started",
          title: "Getting Started",
          icon: WrenchIcon,
          content: gettingStarted,
          metaTitle: "Getting Started - Looser World Documentation",
          metaDescription: "Step-by-step guide to getting started.",
          keywords: "installation, getting started, setup",
          author: "John Doe",
        },
        {
          id: "tool_configuration",
          title: "Configuration",
          icon: Settings2Icon,
          content: toolConfiguration,
          metaTitle: "Configuration - Looser World Documentation",
          metaDescription:
            "Learn how to configure tools for better performance.",
          keywords: "configuration, setup, performance",
          author: "Jane Smith",
        },
      ],
    },
    {
      id: "usage",
      title: "Usage",
      pages: [
        {
          id: "code_examples",
          title: "Code Examples",
          icon: CodeIcon,
          content: codeExamples,
          metaTitle: "Code Examples - Looser World Documentation",
          metaDescription: "Explore various code examples and implementations.",
          keywords: "code, programming, examples",
          author: "John Developer",
        },
        {
          id: "terminal_cli-usage",
          title: "CLI Usage",
          icon: TerminalIcon,
          content: terminalCommands,
          metaTitle: "CLI Usage - Looser World Documentation",
          metaDescription: "Understand command-line interface usage in depth.",
          keywords: "CLI, terminal, commands",
          author: "Jane Tech",
        },
      ],
    },
  ];
}
