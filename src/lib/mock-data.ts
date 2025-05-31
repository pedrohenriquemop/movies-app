export type MovieList = {
  id: string;
  userId: string;
  name: string;
  movieIds: string[];
};

const mockLists: MovieList[] = [
  {
    id: "list-1",
    userId: "user-1",
    name: "My Favorites",
    movieIds: ["33333333", "12345678"],
  },
];

let nextListId = mockLists.length + 1;
export const generateListId = (): string => `list-${nextListId++}`;

export const getListsByUser = (userId: string): MovieList[] => {
  return mockLists.filter((list) => list.userId === userId);
};

export const getListById = (listId: string): MovieList | undefined => {
  return mockLists.find((list) => list.id === listId);
};

export const createList = (userId: string, name: string): MovieList => {
  const id = generateListId();
  const newList: MovieList = { id, userId, name, movieIds: [] };
  mockLists.push(newList);
  return newList;
};

export const deleteList = (listId: string): boolean => {
  const initialLength = mockLists.length;
  mockLists.splice(
    mockLists.findIndex((list) => list.id === listId),
    1,
  );
  return mockLists.length < initialLength;
};

export const addMovieToList = (
  listId: string,
  movieId: string,
): MovieList | undefined => {
  const list = getListById(listId);
  if (list && !list.movieIds.includes(movieId)) {
    list.movieIds.push(movieId);
  }
  return list;
};

export const removeMovieFromList = (
  listId: string,
  movieId: string,
): MovieList | undefined => {
  const list = getListById(listId);
  if (list) {
    list.movieIds = list.movieIds.filter((id) => id !== movieId);
  }
  return list;
};
