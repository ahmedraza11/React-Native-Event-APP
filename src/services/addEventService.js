import {
    AsyncStorage,
    ToastAndroid
} from 'react-native';

export class AddEventService {

    static loadEvents(Events) {
        AsyncStorage.getItem('Events', (err, result) => {
            if (!result == null) {
                Events.push(JSON.parse(result));
            }
        });
        return Events;
    }

    static eventListloadEvents(Events) {
        AsyncStorage.getItem('Events', (err, result) => {
            if (!result == null) {
                Events.push(JSON.parse(result));
            }
        });
        return Events;
    }

    static createEvent(state,Events) {
        
        const event = {
            eventName: state.eventName,
            eventDesc: state.eventDesc,
            placeName: state.name,
            placeAddress: state.address,
            date: state.Date,
            time: state.Time,
            createdBy: state.createdBy
        }

            Events.push(event);
            AsyncStorage.setItem('Events',JSON.stringify(Events)).then(()=>{
                ToastAndroid.show("Event Created!" ,ToastAndroid.SHORT);
            });
        return event;
        }
}