import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  CalendarCheck,
  ClipboardList,
  FileText,
  Layers,
  ListChecks,
  NotebookText,
  Sparkles,
} from "lucide-react";
import { createElement } from "react";

const ICONS: Record<string, LucideIcon> = {
  BookOpenCheck,
  CalendarCheck,
  ClipboardList,
  FileText,
  Layers,
  ListChecks,
  NotebookText,
  Sparkles,
};

/** Resolves the icon names stored in data files to Lucide components. */
export function resourceIcon(name: string): LucideIcon {
  return ICONS[name] ?? BookOpenCheck;
}

/** Render helper — keeps icon resolution out of component render bodies. */
export function ResourceIcon({
  name,
  size = 16,
}: {
  name: string;
  size?: number;
}) {
  return createElement(resourceIcon(name), {
    size,
    strokeWidth: 2,
    "aria-hidden": true,
  });
}
