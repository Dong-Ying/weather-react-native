import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

class Forecast extends Component {
    render() {
        return (
            <View>
                <Text style={styles.bigText}>
                    {this.props.main}
                </Text>
                <Text style={styles.mainText}>
                    Current Conditions: {this.props.description}
                </Text>
                <Text style={styles.bigText}>
                    {this.props.temp} F
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bigText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FF0000',
        margin: 10
    },
    mainText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#FF0000'
    },
});

module.exports = Forecast;
