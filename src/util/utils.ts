export const imgMaker = (posterURL: string, size: string = "w500") => {
  return `https://image.tmdb.org/t/p/${size}/${posterURL}`;
};
