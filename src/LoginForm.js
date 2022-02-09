import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { getAllByRole } from "@testing-library/react";
// import $ from "jquery";
// import {} from "jquery.cookie";
axios.defaults.withCredentials = true; //같은 주소 기원으로 인식
const headers = { withCredentials: true} ;

class LoginForm extends Component {


    join = () => {
        const joinEmail = this.joinEmail.value;
        const joinName = this.joinName.value;
        const joinPw = this.joinPw.value;

        const send_param = {
            headers,
            email: this.joinEmail.value,
            name: this.joinName.value,
            password: this.joinPw.value
        };
        axios
            .post("https://localhost:8080/member/join", send_param)
            .then(returnData => {
                if (returnData.data.message) {
                    alert(returnData.data.message);
                    // 중복체크
                    if (returnData.data.dupYn === "1") {
                        this.joinEmail.value = "";
                        this.joinEmail.focus();
                    } else {
                        this.joinEmail.value = "";
                        this.joinName.valu = "";
                        this.joinPw.value = "";
                    }
                } else {
                    alert("회원가입 실패");
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    
    login = () => {
        const loginEmail = this.loginemail.value;
        const loginPw = this.loginPw.value;

    };

    render() {
        const formStyle = {
            margin: 50
        };
        const buttonStyle = {
            marginTop: 10
        };
        const borderStyle = {
            border: "3px solid gray",
            padding: "1rem" ,
            borderRadius: "20px",
        }

        return (
            <Form style={formStyle}>
                <Form.Group style={borderStyle} controlId="joinForm">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        maxLength="100"
                        ref={ref => this.joinEmail=ref}
                        placeholder="Enter email"
                    />
                    <div>
                    <Form.Text className="test-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    </div>

                    <Form.Label>name</Form.Label>
                    <Form.Control
                        type="text"
                        maxLength="20"
                        ref={ref => (this.joinName = ref)}
                        placeholder="name"
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        maxLength="64"
                        ref={ref => (this.joinPw = ref)}
                        placeholder="password"
                    />
                    <Button 
                        style={buttonStyle}
                        onClick={this.join}
                        type="button"
                        className="btn btn-dark"
                    >
                        회원가입
                    </Button>
                </Form.Group>

                <Form.Group style={borderStyle} className="my-5" controlId="loginForm">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email"
                        maxLength="100"
                        ref={ref => (this.loginEmail= ref)}
                        placeholder="Enter email"
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        maxLength="20"
                        ref={ref => (this.loginPw = ref)}
                        placeholder="Password"
                    />
                    {/* rechptcah 자리 */}
                    <Button style={buttonStyle}
                            onClick={this.login}
                            className="btn btn-dark">
                        로그인
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

export default LoginForm;