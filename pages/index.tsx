import { NextPage } from "next";
import MenuComponent from "../components/menu";

const HomePage: NextPage = () => {
    return <main className="home-page">
        <MenuComponent/>
    </main>
}

export default  HomePage;
