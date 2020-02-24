import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default class FollowButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFollowing: false,
        }
    }

    toggleFollow = async () => {
        const followingState = await !this.state.isFollowing
        this.setState({ isFollowing: followingState })
    }

    render() {
        const { isFollowing } = this.state
        const colorValue = isFollowing ? '#8FBC8F' : 'black'
        const buttonText = isFollowing ? 'Following' : 'Follow'
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.toggleFollow} style={{backgroundColor: colorValue, height: 40, width: 110, justifyContent: 'center', alignItems: 'center', borderRadius: 2 }}>
                    <Text style={styles.followButtonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    followButtonText: {
        fontSize: 16,
        color: 'white',
        justifyContent: 'center'
    },
})