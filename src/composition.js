import React from "react";

class Dialogue extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>{this.props.title}</h1>
                {this.props.children}
            </div>
        );
    }
}

class SignupDialogue extends React.Component{
    constructor(props){
        super(props);
        this.state = {email:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({email:e.target.value});
    }

    handleSubmit(e){
        alert("submited email "+this.state.email);
    }

    render(){
        const produRows = [1,2,3];
        return(
            <div>
            <Dialogue title="signup">
                <input type="text" value={this.state.email} onChange={this.handleChange} />
                <button type="button" onClick={this.handleSubmit}>Submit</button>
            </Dialogue>
            <p>{produRows}</p>
            </div>
        );
    }
}

export default SignupDialogue;