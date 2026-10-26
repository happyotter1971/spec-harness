// A small sample module so a new app passes its checks. Replace it with the app's own code.

export function greet(name: string): string {
  const cleaned = name.trim();
  if (cleaned === "") {
    return "Hello.";
  }
  return `Hello, ${cleaned}.`;
}
