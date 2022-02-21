import React, { Component } from "react";
import LoginForm from "./LoginForm";
import BoardForm from "./BoardForm";
import BoardWriteForm from "./BoardWriteForm";
import BoardDetail from "./BoardDetail";
import MypageForm from "./MypageForm";
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

        const flexContainer = {
            display: "flex",
            flexDirection: "row",
            justyfycontent: "center",
            height: "100vh"
        }

        const sideStyle ={
            backgroundColor: "gray",
            flexGrow: 1
        };
        
        const mainStyle = {
            flexBasis: "1000px"
        }
        
        return(
            
            <div style={flexContainer}>
                <div style={sideStyle}></div>
                <div style={mainStyle}>
                    <Routes>
                        <Route path="/mypage" element={<MypageForm />} />
                        <Route path="/board/detail" element={<BoardDetail />} />
                        <Route path="/boardWrite" element={<BoardWriteForm />} />   
                        {resultForm}
                    </Routes>
                </div>
                <div style={sideStyle}></div>
            </div>
            
        );
    }
}

export default Body;