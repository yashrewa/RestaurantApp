import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
// import Button from '../../components/Button';

import { Link, Redirect, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../providers/AuthProvider';
import Button from '@/src/components/Button';


const signUp = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const [mobile, setMobile] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()


    const { session } = useAuth()

    const handleSignUp = async () => {
        // Logic to add the user to the database for the first time and redirect back to the login page
        // const phone = '91'+mobile
        // console.warn(phone)
        setLoading(true)
        const { error, data } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) Alert.alert(error.message)




        if (data) {
            setLoading(false)
            Alert.alert('Signup Successfull')
            router.push('/signIn')
        }
    }


    // if (session) return <Redirect href={'/'} />



    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder='Example@mail.com' />
            <Text style={styles.label}>Password</Text>
            <TextInput value={password} onChangeText={setpassword} style={styles.input} secureTextEntry={true} keyboardType='visible-password' />
            {/* <Text style={styles.label}>Mobile Number</Text>
            <TextInput value={mobile} onChangeText={setMobile} style={styles.input} keyboardType='phone-pad' /> */}
            <Button text={loading ? "Signing In" : "Signup"} disabled={loading} onPress={handleSignUp} />
            <Text style={styles.textButton}><Link href={'/signIn'}>Already have an account? Click here to Sign In</Link></Text>
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