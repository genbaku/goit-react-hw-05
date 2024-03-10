import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const fetchMovieCast = async () => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
            const options = {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODM1OWJhOGI4MzIxODY2ZTZiYzg1OGRjNDFkNjVhYSIsInN1YiI6IjY1ZWI0ODdkNjY3NTFkMDE4NmFlMjg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p-a75sYlidx_38396SjbEmJjRCLXYZeKf-WXyhemqsI'
                }
            };

            try {
                const response = await axios.get(url, options);
                setCast(response.data.cast);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovieCast();
    }, [movieId]);

    return (
        <div>
            <ul>
                {cast.map(actor => (
                    <li key={actor.id}>
                        <p>Name: {actor.name}</p>
                        <p>Character: {actor.character}</p>
                        {actor.profile_path && (
                            <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.name} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
