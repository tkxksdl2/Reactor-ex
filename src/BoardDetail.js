import React, {Component, useEffect, useState} from "react";
import { Table, Button } from "react-bootstrap";
import {useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import { render } from "@testing-library/react";
axios.defaults.withCredentials = true;
const headers = { withCredentials:true };


const BoardDetail = () => {
    const [state, setBoard] = useState({
        board: []
    });

    const location = useLocation();
    
    useEffect(() => {
        if (location.state._id !== undefined) {
            console.log('return', state.board);
            getDetail();
        } else {
            window.location.href = "/";
        }
      }, []);


    const deleteBoard = _id => {
        const send_param = {
            headers,
            _id
        };
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios
                .post("http://localhost:8080/board/delete", send_param)
                .then(returnData => {
                    alert("게시글이 삭제 되었습니다.");
                    window.location.href = "/";
                })
                .catch(err => {
                    console.log(err);
                    alert("글 삭제 실패");
                })
        }
    };

    const getDetail = () => {
        const send_param ={
            headers,
            _id: location.state._id
        };
    
        const marginBottom = {
            marginBottom: 5
        };
        axios
            .post("http://localhost:8080/board/detail", send_param)
            .then(returnData => {
                if (returnData.data.board[0]){
                    console.log("게시글 찾기 성공");
                    console.log(returnData.data.board[0].content);
                    const board = (
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>{returnData.data.board[0].title}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            dangerouslySetInnerHTML={{
                                                __html: returnData.data.board[0].content
                                            }}
                                        ></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="d-grid gap-2">
                                <NavLink
                                    to= "/boardWrite"
                                    state= {{ title:returnData.data.board[0].title,
                                            content:returnData.data.board[0].content,
                                            _id : location.state._id
                                }}>
                                    <div className="d-grid gap-2">
                                            <Button variant="secondary" style={marginBottom}>
                                                글 수정
                                            </Button>
                                    </div>
                                </NavLink>
                                <Button 
                                    variant="light"
                                    onClick={deleteBoard.bind(
                                        null,
                                        location.state._id
                                    )}
                                >
                                    글 삭제
                                </Button>
                            </div>
                        </div>
                    );
                    setBoard({ ...board, board:board});
                } else {
                    alert("글 상세 조회 실패");
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const divStyle = {
        margin:50
    };

    console.log(state.board)
    
    return (
        <div style={divStyle}>
            {state.board}
        </div>
    );
        
};

export default BoardDetail;