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
