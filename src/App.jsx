import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import HomePage from './components/pages/HomePage/HomePage';
import MoviesPage from './components/pages/MoviesPage/MoviesPage';
import MovieDetailsPage from "./components/pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage';


export default function App  ()  {
  return (
    <div>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="/movies/:movieId/cast" element={<MovieCast />} />
        <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}