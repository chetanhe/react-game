import React from "react";

function LogoutButton(props){
    return (
        <button onClick={props.onClick}>Logout</button>
    );
}

function LoginButton(props){
    return (
        <button onClick={props.onClick}>Login</button>
    );
}

function UserGreeting(){
    return <h1>Welcome back!</h1>;
  }
  
  function GuestGreeting(){
    return <h1>Please sign up.</h1>;
  }
  
  function Greeting(props){
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn){
      return <UserGreeting/>;
    }
    return <GuestGreeting />;
  }
  

class LoginControl extends React.Component{
    constructor(props){
        super(props);
        this.state = {isLoggedIn: false};
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick(){
        this.setState((state)=>({
            isLoggedIn: true
        }));
    }

    handleLogoutClick(){
        this.setState((state)=>({
            isLoggedIn: false
        }));
    }

    render(){
        const loggedIn = this.state.isLoggedIn;
        let button;
        if(loggedIn){
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        }else{
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                <Greeting isLoggedIn={loggedIn}/>
                {button}
            </div>
        );
    }
}

export default LoginControl;