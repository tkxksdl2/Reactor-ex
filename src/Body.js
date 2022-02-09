import React, { Component } from "react";
import LoginForm from "./LoginForm";

import { Routes, Route } from "react-router-dom";

class Body extends Component {
    render(){
        let resultForm;
        function getResultForm() {
            resultForm = <Route exact path="/" element={<LoginForm />}></Route>;
            return resultForm;
        }
        getResultForm();
        return(
            <div>
                body
                <Routes>{resultForm}</Routes>
            </div>
        );
        
        
    }
}

export default Body;