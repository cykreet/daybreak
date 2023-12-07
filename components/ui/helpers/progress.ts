export function progress(total: number, completed: number): number {
  return Math.round((completed / total) * 100);
}
