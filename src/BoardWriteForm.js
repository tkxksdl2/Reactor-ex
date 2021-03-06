import React, {useState, useMemo} from "react";
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
        boardTitle: {value:"글 제목"}
    });
    const location = useLocation();
  
    useMemo(() => {
        if (location.state !== null){
            setData({...state,
                        data: location.state.content,
                        boardTitle : {value: location.state.title}
                    }
            );
        }
    }, []);

    let boardRef = "";

    const onEditorChange = evt => {
        setData(prevState => {
           return ({...prevState,
                    data: evt.editor.getData()});
        });
    };

    const writeBoard = () => {
        let url;
        let send_param;

        let boardTitle;
        if (boardRef.value === undefined || boardRef.value === ""){
            boardTitle = state.boardTitle.value;
        } else {
            boardTitle = boardRef.value;
        }

        
        const boardContent = state.data;

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
                "content" : boardContent
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
                    placeholder={state.boardTitle.value}
                    ref={ref => (boardRef = ref)}
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