export const pages = import.meta.glob("./content/*.md", {
  query: "?raw",
  import: "default",
  eager: true
}) as Record<string, string>;
