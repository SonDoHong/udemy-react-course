import { Routes, Route, Outlet } from "react-router-dom";

import Navigation from "./routers/navigation/navigation.component";
import Home from "./routers/home/home.component";

const Shop = () => {
    return (
        <div>
            <h2>I am the shop page</h2>
        </div>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />}/>
                <Route path="shop" element={<Shop />}/>
            </Route>
        </Routes>
    )
}

export default App;
