export function getImageUrl(imageId: string, size: number): string {
   let sizeSuffix = '';
  if (size < 160) {
    sizeSuffix = 's';
  } else if (size < 400) {
    sizeSuffix = 'm';
  } else {
    sizeSuffix = 'l';
  }
  
  return (
    'https://i.imgur.com/' +
    imageId +
    sizeSuffix +
    '.jpg'
  );
}
