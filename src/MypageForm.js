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
    
    const [userInfo, setUserInfo] = useState({
        name: "",
        password: "",
        newpass: "",
        confirm: ""
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


    const update = () =>{
        const email = state.email;
        const name = userInfo.name.value;
        const password = userInfo.password.value;
        const newpass = userInfo.newpass.value;
        const confirm = userInfo.confirm.value;
        const regExp2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

        if (name === "" || name === undefined){
            alert("이름을 입력해주세요.");
            userInfo.name.focus();
            return;
        } else if (password === "" || password === undefined){
            alert("비밀번호를 입력해주세요.");
            userInfo.password.focus();
            return;
        } else if (newpass === "" || newpass === undefined){
            alert("새 비밀번호를 입력해주세요.");
            userInfo.newpass.focus();
            return;
        } else if (confirm === "" || confirm === undefined){
            alert("새 비밀번호 확인을 입력해주세요.");
            userInfo.confirm.focus();
            return;
        }

        if (newpass.match(regExp2) === null || newpass.match(regExp2) === undefined){
            alert("비밀번호를 숫자와 문자, 특수문자 포함 8~16자리로 입력해주세요.");
            userInfo.password.focus();
            return;
        } else if (newpass !== confirm){
            alert("비밀번호 확인이 올바르지 않습니다.");
            userInfo.confirm.focus();
            return;
        }

        const send_param = {
            headers,
            email: email,
            password: password,
            name: name,
            newpass: newpass
        } 

        axios
            .post("http://localhost:8080/member/update", send_param)
            .then(returnData => {
                console.log(returnData.data.check);
                if (returnData.data.check === true){
                    alert(returnData.data.message)
                    Cookies.remove("login_id");
                    window.location.href = "/";
                } else {
                    alert(returnData.data.message);
                    userInfo.password.focus();
                    return;
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const deleteUser = () => {
        const send_param = {
            headers,
            _id:Cookies.get("login_id")
        };
        if (window.confirm("정말 탈퇴하시겠습니까?")){
            axios
                .post("http://localhost:8080/member/delete", send_param)
                .then(returnData => {
                    alert(returnData.message);
                    Cookies.remove("login_id");
                    window.location.href = "/";
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

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
                <Form.Control 
                    type="text" 
                    maxLength="20"
                    placeholder="Enter name"
                    ref={ref => (userInfo.name = ref)} />
                <Form.Label>password</Form.Label>
                <Form.Control 
                    type="password" 
                    maxLength="64"
                    placeholder="Enter password"
                    ref={ref => (userInfo.password = ref)} />
                <Form.Label>new password</Form.Label>
                <Form.Control 
                    type="password"
                    maxLength="64" 
                    placeholder="Enter New password"
                    ref={ref => (userInfo.newpass = ref)} />
                <Form.Label>confirm</Form.Label>
                <Form.Control 
                    type="password"
                    maxLength="64" 
                    placeholder="Confirm New password"
                    ref={ref => (userInfo.confirm = ref)} />
            </Form.Group>
            <Button 
                variant="secondary" 
                style={marginButton}
                onClick={update}
            >
                회원정보 수정
            </Button>
            <Button variant="dark" onClick={deleteUser}>
                회원 탈퇴
            </Button>
            
        </div>
    );

}

export default MypageForm