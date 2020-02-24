import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FollowButton from './FollowButton';
import LocationService from '../services/LocationService';

export default class Locations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            locations: null,
        }
    }

    componentDidMount() {
        this.fetchLocations();
    }

    //Fetch locations from LocationService
    async fetchLocations() {
        let apiLocations = await LocationService.fetchLocations();
        console.log(apiLocations)
        this.setState({
            locations: apiLocations,
        })
        this.convertToNumber();
    }

    // Since API returns string values for latitude and longitude we need to convert these values
    convertToNumber() {
        this.state.locations.forEach(user => {
            let convertedLat = Number(user.address.geo.lat);
            user.address.geo.lat = convertedLat;
            let convertedLong = Number(user.address.geo.lng);
            user.address.geo.lng = convertedLong;
        });
        this.setSortedLocationsBasedOnDistance();
    }

    // Add distance key to each object
    setSortedLocationsBasedOnDistance() {
        this.state.locations.forEach(user => {
            let result = this.calculateDistance(user.address.geo.lat, user.address.geo.lng);
            user.distance = result;
        });

        const sortedUsers = this.state.locations.sort(this.sortNumber);
        this.setState({
            locations: sortedUsers,
            isLoading: false,
        })
        console.log(this.state.locations);
    }

    // Using Haversine formula, calculate the distance between Karma and given location
    calculateDistance(lat, long) {
        let karmaCoordinates = {
            "lat": 59.330596,
            "lng": 18.0560967
        };

        let R = 6371; // km
        let dLat = (lat - karmaCoordinates.lat) * Math.PI / 180;
        let dLon = (long - karmaCoordinates.lng) * Math.PI / 180;
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(karmaCoordinates.lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;

        if (d > 1) {
            return Math.round(d);
        } else if (d <= 1) {
            return Math.round(d * 1000);
        }
        return d;
    }

    sortNumber(a, b) {
        return a.distance - b.distance;
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            )
        }
        else {
            let users = this.state.locations.map((val, key) => {
                return <View key={key} style={styles.item}>
                    <View style={styles.title}>
                        <Ionicons name="md-pin" size={30} color="black" style={{}} />
                        <Text style={styles.cityName}>{val.address.city}</Text>
                    </View>
                    <View>
                        <Text style={styles.distance}>{val.distance} km away</Text>
                        <FollowButton />
                    </View>
                </View>
            })
            return (
                <ScrollView contentContainerStyle={styles.container}>
                    {users}
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        alignSelf: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        textAlign: 'center',

    },
    title: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    item: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        margin: 20,
        width: '75%',
        height: 170,
        borderBottomWidth: 1,
        borderRadius: 2,
        borderBottomColor: '#eee',
        shadowColor: "#000",
        shadowOpacity: 0.20,
        shadowRadius: 2,
        elevation: 1,
    },
    cityName: {
        flex: 1,
        fontSize: 22,
        textAlign: 'center',
        padding: 10,
    },
    distance: {
        fontSize: 16,
        padding: 30,
    },
});