export function isGenre(str) {
  const genres = [
    "Action",
    "Adventure",
    "Avant",
    "Award",
    "Boys",
    "Comedy",
    "Drama",
    "Fantasy",
    "Girls",
    "Gourmet",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Slice",
    "Sports",
    "Supernatural",
    "Suspense",
  ];
  return genres.includes(str);
}

export function removeUnderscore(str) {
  return str.replace(/_/g, " ");
}

export const GENRES = {
  Action: 1,
  Adventure: 2,
  "Avant Garde": 5,
  "Award Winning": 46,
  "Boys Love": 28,
  Comedy: 4,
  Drama: 8,
  Fantasy: 10,
  "Girls Love": 26,
  Gourmet: 47,
  Horror: 14,
  Mystery: 7,
  Romance: 22,
  "Sci-Fi": 24,
  "Slice of Life": 36,
  Sports: 30,
  Supernatural: 37,
  Suspense: 41,
};
