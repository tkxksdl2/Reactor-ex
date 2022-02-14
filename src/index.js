import React  from "react";
import reactDom from "react-dom";
import { BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

reactDom.render(
    <BrowserRouter>
        <Header/>
        <Body/>
        <Footer/>
    </BrowserRouter>,
    document.querySelector("#container")
)