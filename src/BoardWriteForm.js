import React, {Component} from "react";

class BoardWriteform extends Component {

    render (){
        const divStyle = {
            margin: 50
        };
        const titleStyle = {
            marginBottom: 5
        };
        const Buttonstyle = {
            marginTop: 5
        };

        return( 
            <div style={divStyle} className="App">
                <h2>글 쓰기</h2>
            </div>
        );
    };
};

export default BoardWriteform;