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
            date: state.selectedDateTime,
            createdBy: state.createdBy
        }

            Events.push(event);
            AsyncStorage.setItem('Events',JSON.stringify(Events)).then(()=>{
                ToastAndroid.show("Event Created!" ,ToastAndroid.SHORT);
            });
            // ToastAndroid.show("Please fill up the Form" ,ToastAndroid.SHORT);
        return event;
        }
}