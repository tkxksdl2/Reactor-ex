import React, { useMemo, useState } from "react";
import { Form, Button} from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials:true };

const MypageForm = () => {  
    const [state, setEmail] = useState({
        email: ""
    });
    
    const getEmail = () => {
        const send_param = {
            headers,
            _id: Cookies.get("login_id")
        };
        console.log(send_param);
        axios
            .post("http://localhost:8080/member/getEmail", send_param)
            .then(returnData => {
                setEmail({...state,
                          email:returnData.data.email});
            })
            .catch(err => {
                console.log(err);
            });
    };

    useMemo(() => {
        getEmail();
    }, []);


    const marginButton = {
        margin: 10
    }
    const divStyle = {
        margin: 50
    }

    return (
        <div style={divStyle}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>email</Form.Label>
                <Form.Control type="email" disabled value={state.email} />
                <Form.Label>name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
                <Form.Label>password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
                <Form.Label>new password</Form.Label>
                <Form.Control type="password" placeholder="Endter New password" />
                <Form.Label>new password</Form.Label>
                <Form.Control type="password" placeholder="Endter New password" />
            </Form.Group>
            <Button variant="secondary" style={marginButton}>
                회원정보 수정
            </Button>
            <Button variant="dark">
                회원 탈퇴
            </Button>
            
        </div>
    );

}

export default MypageForm