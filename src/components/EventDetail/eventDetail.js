import React, { Component } from 'react';
import { eventDetailStyles } from './eventDetailStyles';
import {
    View,
    Text,
    Image,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import { AddEventService } from '../../services/addEventService';

import {
    Header,
    Icon,
    Card,
    Divider
} from 'react-native-elements';

const currentEvent = {};
class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: [],
            eventId: props.navigation.state.params.id,
            // currentEvent: this.state.event[parseInt(this.state.eventId)]
        }
    }

    componentDidMount() {
        console.log("response Check");
        AsyncStorage.getItem('Events', (err, res) => {
            console.log("response", res);
            this.setState({ event: JSON.parse(res) });
        })
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        console.log("List Detail Data", this.state.event);
        console.log("Current Event id Data", this.state.eventId);
        return (
            <View>
                <Header
                    leftComponent={<Icon name="menu" color="white" onPress={() => { navigate('DrawerOpen') }} />}
                    centerComponent={{ text: 'Event Detail', style: { color: '#fff' } }}
                    rightComponent={
                        <TouchableOpacity>
                            <Icon
                                name='home'
                                color='#fff'
                                onPress={() => { goBack() }} />
                        </TouchableOpacity>
                    }
                    outerContainerStyles={{ backgroundColor: '#009688' }}
                />
                {console.log("Clicked Event On Detail page", this.state.event[parseInt(this.state.eventId)])}

                <Card
                    title={this.state.event.length !== 0 ? this.state.event[parseInt(this.state.eventId)].eventName : ''}
                    containerStyle={{ marginTop: 100 }}
                >
                    <Image
                        style={{ width: "auto", height: 150 }}
                        resizeMode="cover"
                        source={{ uri: "http://www.naijaevents.com/wp-content/uploads/2013/11/event1.png" }}
                    />

                    <Text></Text>
                    <Text>{this.state.event.length !== 0 ? this.state.event[parseInt(this.state.eventId)].eventDesc : ''}</Text>
                    <Divider />
                    <Text>{this.state.event.length !== 0 ? this.state.event[parseInt(this.state.eventId)].date : ''}</Text>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Created By: {this.state.event.length !== 0 ? this.state.event[parseInt(this.state.eventId)].createdBy : ''}</Text>
                </Card>
            </View>

        );
    }
}
export default EventDetail;