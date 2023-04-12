import React, {FormEvent, useState} from 'react';
import MovieCard from "./MovieCard";

export type MovieType = {
    adult: boolean
    backdrop_path: string
    genre_ids: Array<number>
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

const SearchMovies = () => {

    const [query, setQuery] = useState<string>('')
    const [movies, setMovies] = useState<MovieType[]>([])

    const searchMovies = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;

        // try {
        const res = await fetch(url);
        const data = await res.json()
        console.log(data.results)
        setMovies(data.results)
        // } catch (err) {
        //     console.error(err)
        // }
    }

    return (
        <>
            <form className='form' onSubmit={searchMovies}>
                <label
                    htmlFor="query"
                    className='label'>Movie Name</label>
                <input
                    className='input'
                    type="text"
                    name='query'
                    placeholder="i.e. Jurassic Park"
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    value={query}/>
                <button
                    className='button'
                    type='submit'>Search
                </button>
                <div className="card-list">

                </div>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard key={movie.id}
                               movie={movie}/>
                ))}
            </div>
        </>
    );
};

export default SearchMovies;