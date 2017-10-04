import React, { Component } from 'react';
import { signupStyles } from './signupStyles';
import {
    View,
    Text,
    Image,
    Modal,
    AsyncStorage

} from 'react-native';

import { Button, Header, FormInput, FormLabel } from 'react-native-elements';
// import Camera from 'react-native-camera';
import { AuthService } from '../../../services/authService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const Accounts = [];
class Signup extends Component {
    constructor() {
        super();
        // this.camera = null;
        this.state = {
            modalOpen: false,
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            profileImage: null,
            Accounts: []
        }
    }
    componentWillMount() {
        const data = AuthService.LoadSignupUserAccounts(Accounts);
        console.log("sign up data ",data)        
    }
    // componentDidMount(){
    //     this.state.Accounts == null ?
    //     this.state.Accounts.push({firstName:"abc",lastName:"abc",email:"abc",password:"abc"}) : null
    // }
    static navigationOptions = {
        header: null
    };
    
    _handleSignup() {
        const data = AuthService.HandleSignup(this.state, this.props.navigation, Accounts);
        console.log("Accounts from Signup", data);
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView style={signupStyles.container}>
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    leftComponent={<Image source={{ uri: 'https://lh3.googleusercontent.com/8Oy0WcjlP8p-m2oUAwuKVLCjKggkILPxmyPfqTB6IBLoe2abC83vq5NtoLC2kXL64Ro=w300' }} style={{ width: 35, height: 35 }} />}
                    centerComponent={{ text: 'StackInnovations Feed App', style: { color: '#fff' } }}
                    outerContainerStyles={{ backgroundColor: '#0288D1' }}
                />

                <View style={signupStyles.form}>

                    <Text style={signupStyles.formHeading}>Signup Form</Text>
                    <View style={signupStyles.formFields}>

                        <View>
                            <FormLabel>First Name</FormLabel>
                            <FormInput
                                onChangeText={(txt) => this.setState({ firstName: txt })}
                            />

                            <FormLabel>Last Name</FormLabel>
                            <FormInput
                                onChangeText={(txt) => this.setState({ lastName: txt })}
                            />

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
                            title="Sign up"
                            buttonStyle={signupStyles.SignupButton}
                            onPress={() => this._handleSignup()}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}
export default Signup;