import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Components from "./components";

const Index = () => {
    return(
        <div>
            <Router>
                <Routes>
                    <Route exact path='/components' element={<Components/>}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default Index;