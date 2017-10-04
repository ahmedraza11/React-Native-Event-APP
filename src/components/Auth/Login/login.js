import React, { Component } from 'react';
import { loginStyles } from './loginStyles';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage

} from 'react-native';

import {
    Header,
    FormInput,
    FormLabel,
    Button
} from 'react-native-elements';
import { AuthService } from '../../../services/authService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const Accounts = [];
class Login extends Component {

    constructor() {
        super();
        this.state = {
            user: Object,
            email: null,
            password: null,
        }
    }
    static navigationOptions = {
        header: null
    };
    componentDidMount() {
        AuthService.LoadSigninUserAccounts().then((res) => {
            this.setState({ user: JSON.parse(res) })
            console.log('chckiing response from login', this.state.user);
        });
    }
    _handleLogin() {
        const filteredData = AuthService.HandleLogin(this.state, this.state.user, this.props.navigation);
        console.log("Filtered data", filteredData);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView style={loginStyles.container}>
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    leftComponent={<Image source={{ uri: 'https://lh3.googleusercontent.com/8Oy0WcjlP8p-m2oUAwuKVLCjKggkILPxmyPfqTB6IBLoe2abC83vq5NtoLC2kXL64Ro=w300' }} style={{ width: 35, height: 35 }} />}
                    centerComponent={{ text: 'StackInnovations Event App', style: { color: '#fff' } }}
                    outerContainerStyles={{ backgroundColor: '#0097A7' }}
                />
                <View style={loginStyles.form}>
                    <Text style={loginStyles.formHeading}>Login Form</Text>
                    <View style={loginStyles.formFields}>

                        <FormLabel>Email</FormLabel>
                        <FormInput
                            keyboardType="email-address"
                            onChangeText={(txt) => this.setState({ email: txt })}
                        />
                        <FormLabel>Password</FormLabel>
                        <FormInput
                            secureTextEntry={true}
                            onChangeText={(txt) => this.setState({ password: txt })}
                        />

                    </View>

                    <Button
                        title="Login"
                        buttonStyle={loginStyles.loginButton}
                        onPress={() => this._handleLogin()}
                    />
                    <View style={loginStyles.registerSuggestionText}>
                        <Text>Not Registered</Text>
                        <TouchableOpacity onPress={() => navigate('signupScreen')}>
                            <Text style={{ fontWeight: 'bold' }}>Signup Now!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}
export default Login;