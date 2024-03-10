import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchMovieReviews = async () => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
            const options = {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODM1OWJhOGI4MzIxODY2ZTZiYzg1OGRjNDFkNjVhYSIsInN1YiI6IjY1ZWI0ODdkNjY3NTFkMDE4NmFlMjg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p-a75sYlidx_38396SjbEmJjRCLXYZeKf-WXyhemqsI'
                }
            };

            try {
                const response = await axios.get(url, options);
                setReviews(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovieReviews();
    }, [movieId]);

    return (
        <div>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <p>Author: {review.author}</p>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <h2>NO REVIEWS YET</h2>
            )}
        </div>
    );
}
