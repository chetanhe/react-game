import React from "react";
class KeyboardFriendly extends React.Component{
    constructor(props){
        super(props);
        this.state = {open:false};
        this.timeoutID = null;
        this.toggleContainer = React.createRef();
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onClickOutSideHandler = this.onClickOutSideHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
    }

    componentDidMount(){
        window.addEventListener('click', this.onClickOutSideHandler);
    }

    componentWillUnmount(){
        window.removeEventListener('click', this.onClickOutSideHandler);
    }

    onClickOutSideHandler(e){
        if(this.state.open && !this.toggleContainer.current.contains(e.target)){
            this.setState({open: false});
        }
    }

    onClickHandler(){
        this.setState((currentState)=>({
            open: !currentState.open
        }));
    }

    onBlurHandler(){
        this.timeoutID = setTimeout(()=>{
            this.setState({
                open:false
            });
        });
    }

    onFocusHandler(){
        clearTimeout(this.timeoutID);
    }

    render(){
        return (
            <div>
                <div key="1" ref={this.toggleContainer}>
                    <button onClick={this.onClickHandler} aria-haspopup="true" aria-expanded={this.state.open}>Select option</button>
                   {this.state.open &&
                    <ul>
                        <li>Option 1</li>
                        <li>Option 2</li>
                        <li>Option 3</li>
                    </ul>
                   }
                    
                </div>
                <div key="2">
                    <button>Load option</button>
                </div>
                <div key="3">
                    <button>Remove the option</button>
                </div>
            </div>
        );
    }
}

export default KeyboardFriendly;