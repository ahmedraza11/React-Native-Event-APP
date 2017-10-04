import {
    AsyncStorage,
    ToastAndroid
} from 'react-native';

export class AuthService {

    static LoadSignupUserAccounts(Accounts) {
        AsyncStorage.getItem('FeedAccount', (err, result) => {
            if (!result == null) {
                Accounts.push(JSON.parse(result));
            }
        });
        return Accounts;
    }
    static LoadSigninUserAccounts(Accounts) {
        const res = AsyncStorage.getItem('FeedAccount', (result) => result);
        return res;
    }
    static HandleSignup(state, navigation, Accounts) {
        const { navigate } = navigation;
        const user = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password,
            profileImage: null
        }

        if (user.firstName !== null && state.lastName !== null && state.email !== null && state.password) {
            Accounts.push(user);
            AsyncStorage.setItem("FeedAccount", JSON.stringify(Accounts)).then(() => {
                ToastAndroid.show("Registered Successfull ", ToastAndroid.LONG);
                navigate('loginScreen');
            });
        } else {
            ToastAndroid.show("Please Fill up the Form", ToastAndroid.LONG);
        }

        return Accounts;
    }
    static HandleLogin(state, Accounts, navigation) {
        const { navigate } = navigation;
        let Authenticated;
        let username;
        if (state.email !== null && state.password !== null) {
            userFilteredData = Accounts.some((v) => {
                if (state.email == v.email && state.password == v.password) {
                    username= v.firstName;
                    Authenticated = true;
                } else {
                    Authenticated = false;
                }
            });
            if (Authenticated) {
                ToastAndroid.show("Logged in Successfull ", ToastAndroid.LONG);
                navigate('eventListScreen', { name: username });
            } else {
                ToastAndroid.show("Invalid Username or Password ", ToastAndroid.SHORT);
            }
            return userFilteredData;

        } else {
            ToastAndroid.show("Please fill up the Form ", ToastAndroid.SHORT);
        }
    }
}