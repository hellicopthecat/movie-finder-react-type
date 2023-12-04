import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Home from "./views/Home";
import Tv from "./views/Tv";
import Search from "./views/Search";
import MovieDetail from "./views/MovieDetail";
import TvDetail from "./views/TvDetail";
import ErrorPage from "./views/ErrorPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
          children: [
            {
              path: "movie/:id",
              element: <MovieDetail />,
            },
          ],
        },
        {
          path: "tv",
          element: <Tv />,
          children: [
            {
              path: ":id",
              element: <TvDetail />,
            },
          ],
        },
        {path: "search", element: <Search />},
      ],
    },
    {
      path: "/*",
      element: <ErrorPage />,
    },
  ],
  {basename: process.env.PUBLIC_URL}
);
