import React from "react";

class NameForm extends React.Component{
    constructor(props){
        super(props);
        this.input = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        alert('A name was submitted '+ this.input.current.value);
        e.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" ref={this.input}/>
                </label>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

class FileInput extends React.Component{
    constructor(props){
        super(props);
        this.FileInput = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        const filename = this.filename.current.files[0].name;
        alert('file name is '+ filename);
        e.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    upload file:
                    <input type="file" ref={this.FileInput}/>
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default NameForm;
export {FileInput};