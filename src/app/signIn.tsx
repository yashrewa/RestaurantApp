import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigation, useRouter } from 'expo-router';
import Colors from '../constants/Colors';


const signIn = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setpassword] = useState<string>('')


    const router = useRouter()
    const handleSignIn = () => {
        // perform the authentication using the above state of email and password
        console.warn(email, password)

        // here route will deped on the type of user trying to login as the userType will be provider by the database login request
        router.push('/(user)/')
    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder='Example@mail.com' />
            <Text style={styles.label}>Password</Text>
            <TextInput value={password} onChangeText={setpassword} style={styles.input} secureTextEntry={true} keyboardType='visible-password' />

            <Button onPress={handleSignIn} text='Sign in' />
            <Text style={styles.textButton}><Link href={'/signUp'}>Create an account</Link></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    label: {
        color: 'gray',
        fontSize: 16,

    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',

    },
    input: {
        backgroundColor: 'white',
        // borderBlockColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20
    }
})

export default signIn;