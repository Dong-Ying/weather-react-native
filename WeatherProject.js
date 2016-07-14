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
                main: '',
                description: '',
                temp: 0
            },
            backgroundImage: require('./images/sky.jpg')
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position)=> {
            this._getWeatherByCoordinates(position.coords.latitude, position.coords.longitude)
        }, (error)=> {
            console.log(error);
        }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    }

    _getWeatherByCoordinates(lat, lon) {
        var endpoint = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&lang=zh_cn&APPID=${APPID}";
        this._fetchWeather(endpoint);
    }

    _getWeatherByCityName(city) {
        var endpoint = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",cn&units=metric&lang=zh_cn&APPID=${APPID}";
        this._fetchWeather(endpoint);
    }

    _fetchWeather(endpoint) {
        fetch(endpoint)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    city: responseJson.name,
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

    _onUserInputChange(input) {
        this.setState({
            city: input
        });
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
                                    value={this.state.city}
                                    style={[styles.zipCode, styles.mainText]}
                                    returnKeyType="go"
                                    onSubmitEditing={(event) => {this._getWeatherByCityName(event.nativeEvent.text)}}
                                    onChangeText={(text) => {this._onUserInputChange(text)}}/>
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
