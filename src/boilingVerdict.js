import React from "react";

const scaleNames = {c: 'Celcius', f: 'Fahrenhit'};

function toCelcius(fahrenheit){
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenhit(celsius){
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert){
    const input = parseFloat(temperature);
    if(Number.isNaN(input)){
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded;
}

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {temperature:'', scale:''};
        this.handleCelciusChange = this.handleCelciusChange.bind(this);
        this.handleFahrenhitChange = this.handleFahrenhitChange.bind(this);
    }

    handleCelciusChange(temperature){
        this.setState({scale:'c', temperature});
    }

    handleFahrenhitChange(temperature){
        this.setState({scale:'f', temperature});
    }

    render(){
        const scale = this.state.scale;
        const temperature = this.state.temperature;

        const celcius = scale == 'f' ? tryConvert(temperature, toCelcius) : temperature;
        const fahrenhit = scale == 'c' ? tryConvert(temperature, toFahrenhit) : temperature;

        return(
            <div>
                <TemperatureInput scale="c" temperature={celcius} onTemperatureChange={this.handleCelciusChange} />
                <TemperatureInput scale="f" temperature={fahrenhit} onTemperatureChange={this.handleFahrenhitChange} />
            </div>
        );
    }
}

class TemperatureInput extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onTemperatureChange(e.target.value);
    }

    render(){
        const scale = this.props.scale;
        const temperature = this.props.temperature;
        return(
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}</legend>
                <input type="text" value={temperature} onChange={this.handleChange}/>
            </fieldset>
        );
    }
}

export default Calculator;