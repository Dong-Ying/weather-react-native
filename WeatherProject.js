import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    Image,
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
                <Image source={require('./images/sky.jpg')}
                       style={styles.backdrop}>
                    <View style={styles.overlay}>
                        <View style={styles.row}>
                            <Text style={styles.mainText}>
                                Current weather for
                            </Text>
                            <View style={styles.zipContainer}>
                                <TextInput
                                    style={[styles.zipCode, styles.mainText]}
                                    returnKeyType="go"
                                    onSubmitEditing={this._handleTextChange.bind(this)}/>
                            </View>
                        </View>
                        <Forecast
                            main={this.state.forecast.main}
                            description={this.state.forecast.description}
                            temp={this.state.forecast.temp}/>
                    </View>
                </Image>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30
    },
    backdrop: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover"
    },
    overlay: {
        paddingTop: 20,
        backgroundColor: '#000000',
        opacity: 0.5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    zipContainer: {
        marginLeft: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD'
    },
    zipCode: {
        width: 50,
        height: 16
    },
    mainText: {
        color: '#FFFFFF'
    }
});

module.exports = WeatherProject;
