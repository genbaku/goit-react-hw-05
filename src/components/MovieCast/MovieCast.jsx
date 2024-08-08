import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css"; 
import noPoster from "../../components/NothingFoundPoster/NothingFound.png"; 

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
        <div className={css.container}>
            <ul className={css.castList}>
                {cast.map(actor => (
                    <li className={css.castItem} key={actor.id}>
                        <img
                            className={css.castProfilePic}
                            src={actor.profile_path ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}` : noPoster}
                            alt={actor.name}
                        />
                        <p className={css.castName}>{actor.name}</p>
                        <p className={css.castCharacter}>Character: {actor.character}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
