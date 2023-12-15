import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Home from "./views/Home";
import Tv from "./views/Tv";
import Search from "./views/Search";
import DetailComp from "./views/DetailComp";
import ErrorPage from "./views/ErrorPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
          children: [
            {
              path: "movie/:id",
              element: <DetailComp />,
            },
          ],
        },
        {
          path: "tv",
          element: <Tv />,
          children: [
            {
              path: ":id",
              element: <DetailComp />,
            },
          ],
        },
        {
          path: "search",
          element: <Search />,
          children: [
            {
              path: ":id",
              element: <DetailComp />,
            },
          ],
        },
      ],
    },
  ],
  {basename: process.env.PUBLIC_URL}
);
