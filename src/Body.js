import React, { Component } from "react";
import LoginForm from "./LoginForm";
import BoardForm from "./BoardForm";
import BoardWriteForm from "./BoardWriteForm";
import Cookies from "js-cookie";
import { Routes, Route } from "react-router-dom";

class Body extends Component {
    render(){
        let resultForm;
        function getResultForm() {
            if (Cookies.get('login_id')){
                resultForm = <Route path="/" element={<BoardForm />}></Route>;
            } else {
                resultForm = <Route path="/" element={<LoginForm />}></Route>;
            }
            return resultForm;
        }
        getResultForm();

        return(
            <div>
                <Routes>
                    <Route path="/boardWrite" element={<BoardWriteForm />} />   
                    {resultForm}
                </Routes>
            </div>
        );
    }
}

export default Body;