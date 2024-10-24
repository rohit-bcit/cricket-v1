import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import LiveScore from "../pages/LiveScore";
import Teams from "../pages/Teams";
import Schedule from "../pages/Schedule";
import NewsandBlog from "../pages/NewsandBlog";
import History from "../pages/History";
import Series from "../pages/Series";
import SingleBlog from "../pages/SinglePost";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "live-score", element: <LiveScore /> },
            { path: "teams", element: <Teams /> },
            { path: "schedule", element: <Schedule /> },
            { path: "news", element: <NewsandBlog />}, 
            { path: "history", element: <History /> },
            { path: "series", element: <Series /> },
            { path: "/:slug", element: <SingleBlog /> },
        ]
    }
]);

export default router;
