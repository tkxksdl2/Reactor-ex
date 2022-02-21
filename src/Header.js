import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Container,  Button, Image } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials : true };

class Header extends Component{
    state = {
        buttonDisplay: "none"
    }

    componentDidMount() {
        if (Cookies.get('login_id')) {
            this.setState({
                buttonDisplay: "block"
            });
        } else {
            this.setState({
                buttonDisplay: "none"
            });
        }
    }

    logout = () => {
        axios
            .get("http://localhost:8080/member/logout", {
                headers
            })
            .then(returnData =>  {
                if (returnData.data.message){
                Cookies.remove("login_id");
                Cookies.remove("login_email");
                alert("로그아웃 되었습니다!");
                window.location.href = "/";
            }
        });
    };

    render() {
        const buttonStyle = {
            margin: "0px 5px 0px 10px",
            display: this.state.buttonDisplay
        };
        const imgDivStyle = {
            textAlign: "center",
        };
        const imgStyle = {
            width:"100%",
            height: "150px"
        }

        return (
            <div>
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">PlayGround</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="me-auto">
                    <Nav.Link href="/mypage">
                        <button style={buttonStyle} className="btn btn-secondary">
                            회원 정보
                        </button>
                    </Nav.Link>
                    <Nav.Link href="/">
                        <button style={buttonStyle} className="btn btn-secondary">
                            글목록
                        </button>
                    </Nav.Link>
                    <Nav.Link href="/boardWrite">
                        <button style={buttonStyle} className="btn btn-secondary">
                            글쓰기
                        </button>
                    </Nav.Link>
                    <Nav.Link>
                        <button style={buttonStyle} className="btn btn-light" onClick={this.logout}>
                            로그아웃
                        </button>
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <div style={imgDivStyle}>
                <img src="http://placeimg.com/1000/160/nature/sepia" style={imgStyle} ></img>
            </div>
            </div>
        )
    }
}

export default Header;