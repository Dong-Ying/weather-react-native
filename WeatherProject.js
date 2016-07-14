import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    Image,
    View,
    CameraRoll,
    TouchableOpacity,
    Platform
} from 'react-native';

var ImagePicker = require('react-native-image-picker');
var Forecast = require('./Forecast');

class WeatherProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            forecast: {
                main: 'Clouds',
                description: 'few clouds',
                temp: 45.7
            },
            backgroundImage: require('./images/sky.jpg')
        };
    }

    _handleTextChange(city) {
        var endpoint = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",cn&units=metric&lang=zh_cn&APPID=a8ff30eed7887841a717c0e71af4afdd";
        fetch(endpoint)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    city: city,
                    forecast: {
                        main: responseJson.weather[0].main,
                        description: responseJson.weather[0].description,
                        temp: responseJson.main.temp
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            })
            .done();
    }

    _switchBackgroundImage() {
        var options = {
            title: 'Select your background image'
        };
        ImagePicker.showImagePicker(options, (response)=> {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                var source;
                if (Platform.OS === 'ios') {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                } else {
                    source = {uri: response.uri, isStatic: true};
                }
                this.setState({
                    backgroundImage: source
                });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={this.state.backgroundImage}
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
                                    onSubmitEditing={(event) => {this._handleTextChange(event.nativeEvent.text)}}/>
                            </View>
                        </View>
                        <Forecast
                            main={this.state.forecast.main}
                            description={this.state.forecast.description}
                            temp={this.state.forecast.temp}/>
                        <TouchableOpacity onPress={this._switchBackgroundImage.bind(this)}>
                            <Text style={{color: 'red'}}>Switch Background</Text>
                        </TouchableOpacity>
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
