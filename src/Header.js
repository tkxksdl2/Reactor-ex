import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Container,  Button, Image } from "react-bootstrap";

class Header extends Component{
    state = {
        buttonDisplay: "true"
    }


    render() {
        const buttonStyle = {
            margin: "0px 5px 0px 10px",
            display: this.state.buttonDisplay
        }
        return (
            <div>
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">PlayGround</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="me-auto">
                    <Nav.Link to="/">
                        <button style={buttonStyle} className="btn btn-secondary">
                        글목록
                        </button>
                    </Nav.Link>
                    <Nav.Link to="/">
                        <button style={buttonStyle} className="btn btn-secondary">
                            글쓰기
                        </button>
                    </Nav.Link>
                    <Button style={buttonStyle} variant="light">
                        로그아웃
                    </Button>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            </div>
        )
    }
}

export default Header;