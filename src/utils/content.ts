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
    },
    {
      id: "rocket_quickstart",
      title: "Quick Start",
      icon: RocketIcon,
      content: rocketQuickStart,
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
        },
        {
          id: "tool_configuration",
          title: "Configuration",
          icon: Settings2Icon,
          content: toolConfiguration,
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
        },
        {
          id: "terminal_cli-usage",
          title: "CLI Usage",
          icon: TerminalIcon,
          content: terminalCommands,
        },
      ],
    },
  ];
}
