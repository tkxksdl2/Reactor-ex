import React, {Component, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import { CKEditor } from "ckeditor4-react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials:true };

const BoardWriteForm = () => {
    const [state, setData] = useState({
        data:"내용을 입력하세요.",
    });
    let boardTitle = "";

    console.log('처음',state);
    const location = useLocation();
  
    useEffect(() => {
        if (location.state !== null){
            setData({...state,
                        data: location.state.content,
                    }
            );
            console.log('setdata 직후',state);
        }
    }, []);

    console.log('이후',state);
    
    // componentDidMount() {
    //     if (this.props.location !== undefined){
    //         this.boardTitle.value = this.props.location.query.title;
    //     }
    // };


    // componentWillMount(){
    //     if (this.props.location !== undefined) {
    //         this.setState({
    //             data: this.props.location.query.content
    //         });
    //     }
    // };

    const onEditorChange = evt => {
        setData(prevState => {
           return ({...prevState,
                    data: evt.editor.getData()});
        });
        console.log(state);
    };

    const writeBoard = () => {
        let url;
        let send_param;

        const boardTitle = state.boardTitle.value;
        const boardContent = state.data;
        console.log(state.boardTitle);
        console.log(boardTitle, boardContent);

        if (boardTitle === undefined || boardTitle ==="") {
            alert("글 제목을 입력해주세요.");
            boardTitle.focus();
            return;
        } else if (boardContent === undefined || boardContent ==="") {
            alert("글 내용을 입력해주세요.");
            boardContent.focus();
            return;
        }

        if (location.state !== null){
            url = "http://localhost:8080/board/update";
            send_param = {
                headers,
                "_id" : location.state._id,
                "title" : boardTitle,
                "Content" : boardContent
            };
        } else {
            url = "http://localhost:8080/board/write";
            send_param = {
                headers,
                "_id": Cookies.get("login_id"),
                "title": boardTitle,
                "content": boardContent
            };
        }

        axios
            .post(url, send_param)
            .then(returnData => {
                if (returnData.data.message){
                    alert(returnData.data.message);
                    window.location.href = "/";
                } else{
                    alert("글쓰기 실패");
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    
    const divStyle = {
        margin: 50
    };
    const titleStyle = {
        marginBottom: 5
    };
    const ButtonStyle = {
        marginTop: 5
    };

    return( 
        <div style={divStyle} className="App">
                <h2>글 쓰기</h2>
                <Form.Control
                    type="text"
                    style={titleStyle}
                    placeholder="글 제목"
                    ref={ref => (boardTitle = ref)}
                />
                <CKEditor
                    initData={state.data}
                    onChange={onEditorChange}
                    onInstanceReady={ () => {
                        alert( '게시글을 입력하세요!' );
                    } }
                />
                <Button style={ButtonStyle} onClick={writeBoard}>
                    저장하기
                </Button>
        </div>
    );
    
};

export default BoardWriteForm;