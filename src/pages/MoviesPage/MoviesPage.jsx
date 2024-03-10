import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export default function MoviesPage() {
    const [searchResults, setSearchResults] = useState([]);
    const [params, setParams] = useSearchParams();
    const searchTerm = params.get("search") ?? "";
    const changeSearch = (newSearch) => {
        params.set("search", newSearch)
        setParams(params)
    }
    const location = useLocation();

    const handleSearch = async (e) => {
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&language=en-US&page=1&include_adult=false`;
        const options = {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODM1OWJhOGI4MzIxODY2ZTZiYzg1OGRjNDFkNjVhYSIsInN1YiI6IjY1ZWI0ODdkNjY3NTFkMDE4NmFlMjg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p-a75sYlidx_38396SjbEmJjRCLXYZeKf-WXyhemqsI'
            }
        };

        try {
            const response = await axios.get(url, options);
            setSearchResults(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (searchResults.length === 0 && searchTerm !== "") {
            handleSearch({ preventDefault: () => {} }); // вызываем handleSearch с пустым событием для запуска запроса при загрузке
        }
    }, []);

    return (
        <>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search movies"
                    value={searchTerm}
                    onChange={(e) => changeSearch(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {searchResults.map((movie) => (
                    <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`} state={location}>
                            {movie.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
