import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import css from "./RandomMoviePage.module.css";

const GENRES_URL = 'https://api.themoviedb.org/3/genre/movie/list?language=en-US';
const RANDOM_MOVIE_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&language=en-US&page=1';

export default function RandomMoviePage() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [randomMovie, setRandomMovie] = useState(null); 
    const location = useLocation();
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(GENRES_URL, {
                    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODM1OWJhOGI4MzIxODY2ZTZiYzg1OGRjNDFkNjVhYSIsInN1YiI6IjY1ZWI0ODdkNjY3NTFkMDE4NmFlMjg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p-a75sYlidx_38396SjbEmJjRCLXYZeKf-WXyhemqsI` }
                });
                setGenres(response.data.genres);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGenres();
    }, []);

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    };

    const handleGenerateMovie = async () => {
        try {
            const genreQuery = selectedGenre !== 'all' ? `&with_genres=${selectedGenre}` : '';
            const url = `${RANDOM_MOVIE_URL}${genreQuery}`;

            const response = await axios.get(url, {
                headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODM1OWJhOGI4MzIxODY2ZTZiYzg1OGRjNDFkNjVhYSIsInN1YiI6IjY1ZWI0ODdkNjY3NTFkMDE4NmFlMjg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p-a75sYlidx_38396SjbEmJjRCLXYZeKf-WXyhemqsI` }
            });

            const movies = response.data.results;
            if (movies.length === 0) return;

            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            setRandomMovie(randomMovie);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={css.container}>
            <h1 className={css.title}>Find a Random Film</h1>
            <select className={css.genreSelect} onChange={handleGenreChange} value={selectedGenre}>
                <option value="all">All Genres</option>
                {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
            <button className={css.button} onClick={handleGenerateMovie}>Find Random Film</button>
            
            {randomMovie && (
                <div className={css.movieItem}>
                <Link className={css.link} to={`/movies/${randomMovie.id}`} state={location}>
                    <img className={css.poster} src={`${imageBaseUrl}${randomMovie.poster_path}`} alt={`${randomMovie.title} poster`} />
                    <span>{randomMovie.title}</span>
                </Link>
                <hr />
            </div>
            )}
        </div>
    );
}
