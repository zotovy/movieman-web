import { NextPage } from "next";
import MenuComponent from "../components/menu";
import MovieHorizontalList from "../components/MovieHorizontalList";

const HomePage: NextPage = () => {
    return <main className="home-page">
        <MenuComponent/>
        <MovieHorizontalList/>
    </main>
}

export default  HomePage;
