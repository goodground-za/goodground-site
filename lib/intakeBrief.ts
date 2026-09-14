import { intakeSections } from "@/content/launchIntake";
import { isVisible, splitMulti } from "@/lib/intakeValidate";

/** Body text keeps its line breaks and loses its control characters. */
const bodySafe = (value: string) =>
  value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");

/**
 * The brief, as Markdown.
 *
 * This is what actually lands in the inbox, and it is written to be usable
 * as-is: section headings in the form's own order, each question with the
 * answer underneath it, questions left blank marked rather than dropped so a
 * gap is visible instead of silently absent. Hidden conditional questions are
 * omitted entirely, because "not asked" and "not answered" are different
 * things and running them together would mislead whoever builds the site.
 */
export function buildBrief(read: (id: string) => string): string {
  const lines: string[] = [];
  lines.push("# Website launch offer — project brief");
  lines.push("");
  lines.push(`Received ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC`);
  lines.push("");

  for (const section of intakeSections) {
    lines.push(`## ${section.number}. ${section.title}`);
    lines.push("");
    for (const field of section.fields) {
      if (!isVisible(field, read)) continue;
      const raw = read(field.id).trim();
      lines.push(`**${field.label}**`);
      lines.push("");
      if (!raw) {
        lines.push("_Not answered._");
      } else if (field.type === "checkboxes") {
        for (const choice of splitMulti(raw)) lines.push(`- ${bodySafe(choice)}`);
      } else {
        lines.push(bodySafe(raw));
      }
      lines.push("");
    }
  }
  return lines.join("\n");
}
