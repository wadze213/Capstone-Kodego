import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Components from "./components";
import Home from "./home";
import UserMenu from "./userMenu";

const Index = () => {
    return(
        <div>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home/>}></Route>
                    {/* debugging */}
                    <Route exact path='/components' element={<Components/>}></Route>
                    {/* User pages */}
                    <Route exact path='/usermenu' element={<UserMenu/>}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default Index;