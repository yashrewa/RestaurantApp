import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import Button from '@/src/components/Button';
import { Link, Redirect, useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../providers/AuthProvider';



const signIn = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setpassword] = useState<string>('')

    const {session} = useAuth()


    const router = useRouter()
    const handleSignIn = async () => {

        // perform the authentication using the above state of email and password

        const { data, error } = await supabase.auth.signInWithPassword({
            email, password
        })
        if(error) Alert.alert(error.message)
       
        // here route will deped on the type of user trying to login as the userType will be provider by the database login request
    }

    // if(session) return <Redirect href={'/'}/>
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder='Example@mail.com' />
            <Text style={styles.label}>Password</Text>
            <TextInput value={password} onChangeText={setpassword} style={styles.input} secureTextEntry={true} keyboardType='visible-password' />

            <Button onPress={handleSignIn} text='Sign In' />
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