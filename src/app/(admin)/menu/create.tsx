import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams } from 'expo-router'


const CreateProductScreen = () => {
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [errors, setErrors] = useState<string>('')
    const [image, setImage] = useState<string | null>(null);

    const { id } = useLocalSearchParams()
    const isUpdating = !!id;

    const resetField = () => {
        setName('')
        setPrice('')
    }
    const validateinput = () => {
        if (!name) {
            setErrors('name is required')
            return false
        }
        if (!price) {
            setErrors('price is required')
            return false
        }
        if (isNaN(parseFloat(price))) {
            setErrors('price is not a number')
            return false
        }
        setErrors('')
        return true
    }

    const onsubmit = () => {
        if (isUpdating) {
            onUpdate()
        } else {
            onCreate()
        }
    }
    const onUpdate = () => {
        if (!validateinput()) {
            return;
        }


        console.log('Product Updated')
        // Update the information in Supabase

        resetField();
    }

    const onCreate = () => {
        if (!validateinput()) {
            return;
        }


        console.log('Product Created')
        // Save the information in Supabase

        resetField();
    }

    const onDelete = () => {
        console.warn('Delete hogaya bhai')
    }

    const confirmDelete = () => {
        Alert.alert('Confirm', "Are you sure you want to delete?", [{
            text: 'Cancel'
        }, {
            text: 'Confirm',
            style: 'destructive',
            onPress: onDelete
        }])
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdating ? 'Update This' : 'Add New Dish' }} />
            <Image source={{ uri: image || 'https://cdn-icons-png.flaticon.com/512/135/135161.png' }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput value={name} onChangeText={setName} placeholder='name' style={styles.input} />
            <Text style={styles.label} >Price</Text>
            <TextInput value={price} onChangeText={setPrice} placeholder='(Rs.) 80' keyboardType='numeric' style={styles.input} />
            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button onPress={onsubmit} text={isUpdating ? 'Update' : 'Create'} />
            {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
        </View>
    )
}

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
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20
    }
})

export default CreateProductScreen