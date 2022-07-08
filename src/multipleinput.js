import React from "react";

class Reservation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isGoing: true,
            numberofguests: 2
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name;
        this.setState({
            [name]:value
        });
    }

    render(){
        return (
            <form>
                <label>
                    Is going:
                    <input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleChange}/>
                </label>
                <label>
                    Number of guests:
                    <input type="text" name="numberofguests" value={this.state.numberofguests} onChange={this.handleChange}/>
                </label>
            </form>
        );
    }
}

export default Reservation;