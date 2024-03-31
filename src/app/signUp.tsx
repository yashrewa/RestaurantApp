import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import { Link, useRouter } from 'expo-router';
import Colors from '../constants/Colors';

const signUp = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const router = useRouter()
    const handleSignUp = () => {
        // Logic to add the user to the database for the first time and redirect back to the login page
        console.log(email, password)
        router.push('/(admin)/')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder='Example@mail.com' />
            <Text style={styles.label}>Password</Text>
            <TextInput value={password} onChangeText={setpassword} style={styles.input} secureTextEntry={true} keyboardType='visible-password' />
            <Button text='Sign in' onPress={handleSignUp} />
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
        borderBlockColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20
    }
})

export default signUp;