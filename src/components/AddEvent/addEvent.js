import React, { Component } from 'react';
// import { addEventStyles } from './eventDetailStyles';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { AddEventService } from '../../services/addEventService';

import {
    Icon,
    Header,
    Card,
    FormInput,
    FormLabel,
} from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';

const Events = [];
class AddEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDateTimePickerVisible: false,
            selectedDateTime: null,
            eventDesc: null,
            eventName: null,
            createdBy: this.props.navigation.state.params.name
        }
    }
    componentWillMount() {
        const data = AddEventService.loadEvents(Events);
        console.log("All Events ", Events);
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });


    _handleDatePicked = (date) => {
        this.setState({ selectedDateTime: date });
        this._hideDateTimePicker();
    };

    handleCreateEvent() {
        const eventData = AddEventService.createEvent(this.state, Events);
        console.log("Event Data", eventData);
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Header
                    leftComponent={<Icon name="menu" color="white" onPress={() => { navigate('DrawerOpen') }} />}
                    centerComponent={{ text: 'Add Event', style: { color: '#fff' } }}
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
                <Card
                    title="Add Event"
                    containerStyle={{ marginTop: 80 }}
                >

                    <FormLabel>Event Name</FormLabel>
                    <FormInput onChangeText={(txt) => this.setState({ eventName: txt })} />

                    <FormLabel>Event Description</FormLabel>
                    <FormInput onChangeText={(txt) => this.setState({ eventDesc: txt })} />

                    <TouchableOpacity style={{ backgroundColor: "#009688", width: 130, padding: 5, marginBottom: 10, marginTop: 10 }} onPress={this._showDateTimePicker} >
                        <Text style={{ color: '#fff' }}>Add Date and Time</Text>
                    </TouchableOpacity>
                    <Button
                        title="Create Event"
                        onPress={() => this.handleCreateEvent()}
                    />
                </Card>

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode="datetime"
                />
            </View>

        );
    }
}
export default AddEvent;