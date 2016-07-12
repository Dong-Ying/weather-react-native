import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

var Forecast = require('./Forecast');

class WeatherProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zip: '',
            forecast: {
                main: 'Clouds',
                description: 'few clouds',
                temp: 45.7
            }
        };
    }

    _handleTextChange(event) {
        this.setState({zip: event.nativeEvent.text})
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} onSubmitEditing={this._handleTextChange.bind(this)}/>
                <Text style={styles.welcome}>
                    Your input {this.state.zip}
                </Text>
                <Forecast
                    main={this.state.forecast.main}
                    description={this.state.forecast.description}
                    temp={this.state.forecast.temp}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        fontSize: 20,
        borderWidth: 2,
        height: 40
    },
});


module.exports = WeatherProject;
