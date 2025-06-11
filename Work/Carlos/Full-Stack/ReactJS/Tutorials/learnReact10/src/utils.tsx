import type { Person } from './Avatar';

export function getImageUrl(person: Person, size: string = 's'): string {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}