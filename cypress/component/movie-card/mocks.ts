import { MovieMetadata } from "@/components/movies-grid";

export const mockMovie: MovieMetadata = {
  title: "Test Movie Title",
  adult: "false",
  belongs_to_collection: null,
  budget: "10000000",
  genres:
    "[{'id': 28, 'name': 'Action'}, {'id': 878, 'name': 'Science Fiction'}]",
  homepage: "http://example.com/test-movie",
  id: "12345",
  imdb_id: "tt1234567",
  original_language: "en",
  original_title: "Test Movie Title",
  overview:
    "This is a test movie overview. It should be concise and informative.",
  vote_count: 1500,
  vote_average: 7.5,
};
