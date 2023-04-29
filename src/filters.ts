export function truncateWords(str: string, count: number): string {
    if (!str) return str;
    return str.split(' ').slice(0, count).join(' ');
  }
  