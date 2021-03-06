import React, {Component} from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;
const headers = {withCredentials:true};

class BoardRow extends Component {
    render () {
        return (
            <tr>
                <td>
                <NavLink to="/board/detail" state={{_id:this.props.id }}>
                        {this.props.createdAt.substring(0,10) }
                    </NavLink>
                </td>
                <td>
                    <NavLink to="/board/detail" state={{_id:this.props.id }}>
                        {this.props.name }
                    </NavLink>
                </td>
                <td>
                    <NavLink to="/board/detail" state={{_id:this.props.id }}>
                        {this.props.title}
                    </NavLink>
                </td>
            </tr>
        );
    }
}

class BoardForm extends Component {
    state = {
        boardList: []
    };

    componentDidMount() {
        this.getBoardList();
    };

    getBoardList = () => {
        const send_param = {
            headers,
            _id: Cookies.get("login_id")
        };
        axios
            .post("http://localhost:8080/board/getBoardList", send_param)
            .then(returnData => { 
                let boardList;
                if (returnData.data.list.length > 0) {
                    const boards = returnData.data.list;
                    boardList = boards.map(item => (
                        <BoardRow
                            key={Date.now() + Math.random() * 500}
                            id={item._id}
                            name={item.name}
                            createdAt={item.createdAt}
                            title={item.title}
                        ></BoardRow>
                    ));
                    this.setState({
                        boardList: boardList
                    });
                } else {
                    boardList = (
                        <tr>
                            <td colSpan="3">????????? ???????????? ???????????? ????????????.</td>
                        </tr>
                    );
                    this.setState({
                        boardList: boardList
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    render () {
        const divStyle = {
            margin: 50
        };

        return (
            <div>
                <div style={divStyle}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>??????</th>
                                <th>?????????</th>
                                <th>??? ??????</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.boardList}</tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default BoardForm;