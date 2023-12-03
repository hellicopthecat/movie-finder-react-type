import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Home from "./views/Home";
import Tv from "./views/Tv";
import Search from "./views/Search";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {path: "/", element: <Home />},
        {path: "tv", element: <Tv />},
        {path: "search", element: <Search />},
      ],
    },
  ],
  {basename: process.env.PUBLIC_URL}
);
