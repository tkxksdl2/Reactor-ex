import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { getAllByRole } from "@testing-library/react";
import $ from "jquery";
//import {} from "jquery.cookie";
import Cookies from "js-cookie";
axios.defaults.withCredentials = true; //같은 주소 기원으로 인식
const headers = { withCredentials: true} ;

class LoginForm extends Component {


    join = () => {
        const joinEmail = this.joinEmail.value;
        const joinName = this.joinName.value;
        const joinPw = this.joinPw.value;
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const regExp2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

        if (joinEmail === "" || joinEmail === undefined){
            alert("이메일 주소를 입력해주세요.");
            this.joinEmail.focus();
            return;
        } else if (
            joinEmail.match(regExp) === null || joinEmail.match(regExp) === undefined) {
            alert("이메일 형식에 맞게 입력해주세요.");
            this.joinEmail.vlaue = "";
            this.joinEmail.focus();
        } else if (joinName === "" || joinName === undefined ){
            alert("이름을 입력해주세요.");
            this.joinName.focus();
            return;
        } else if (joinPw === "" || joinPw === undefined ){
            alert("비밀번호를 입력해주세요.");
            this.joinPw.focus();
            return;
        } else if (
            joinPw.match(regExp2) === null || joinPw.match(regExp2) === undefined){
            alert("비밀번호를 숫자와 문자, 특수문자 포함 8~16자리로 입력해주세요.");
            this.joinPw.value = "";
            this.joinPw.focus();
            return;
        }

        const send_param = {
            headers,
            email: this.joinEmail.value,
            name: this.joinName.value,
            password: this.joinPw.value
        };
        axios
            .post("http://localhost:8080/member/join", send_param)
            .then(returnData => {
                if (returnData.data.message) {
                    alert(returnData.data.message);
                    // 중복체크
                    if (returnData.data.dupYn === "1") {
                        this.joinEmail.value = "";
                        this.joinEmail.focus();
                    } else {
                        this.joinEmail.value = "";
                        this.joinName.value = "";
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
        const loginEmail = this.loginEmail.value;
        const loginPw = this.loginPw.value;
        
        if (loginEmail === "" || loginEmail === undefined) {
            alert("이메일 주소를 입력해주세요.");
            this.loginEmail.focus();
            return;
        } else if (loginPw === "" || loginPw === undefined) {
            alert("비밀번호를 입력해주세요.");
            this.loginPw.focus();
            return;
        }

        const send_param = {
            headers,
            email: this.loginEmail.value,
            password: this.loginPw.value
        };
        axios
            .post("http://localhost:8080/member/login", send_param)
            .then(returnData => {
                console.log(returnData);
                if (returnData.data.message){
                    Cookies.set("login_id", returnData.data._id, {expires:1} );
                    Cookies.set("login_email", returnData.data.email, {expires:1});
                    console.log(returnData.data);
                    alert(returnData.data.message);
                    window.location.reload();
                } else {
                    alert("로그인 실패");
                }
            })
            .catch(err => {
                console.log(err);
            });

    };

    logout = () => {
        console.log('로그아웃');
        alert("로그아웃.");
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