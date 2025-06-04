export function getImageUrl(person: {imageId: string}, size: string = 's'): string {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}