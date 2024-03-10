import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { Suspense } from 'react';
import Navigation from './components/Navigation/Navigation';

const HomePage = lazy(() => import("./components/pages/HomePage/HomePage"))
const MoviesPage = lazy(() => import("./components/pages/MoviesPage/MoviesPage"))
const MovieDetailsPage = lazy(() => import("./components/pages/MovieDetailsPage/MovieDetailsPage"))
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"))
const MovieReviews = lazy(() => import("./components/MovieReviews/MovieReviews"))
const NotFoundPage = lazy(() => import("./components/pages/NotFoundPage/NotFoundPage"))

export default function App() {
  return (
    <div>
      <Navigation />

      <Suspense fallback={<h1>LOADING PAGE...</h1>}>      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="/movies/:movieId/cast" element={<MovieCast />} />
            <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}