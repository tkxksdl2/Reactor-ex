import React  from "react";
import reactDom from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

reactDom.render(
    <div>
        <Header/>
        <Body/>
        <Footer/>
    </div>,
    document.querySelector("#container")
)