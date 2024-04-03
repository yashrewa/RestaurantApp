import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image, Alert, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/src/api/products'
import { fallbackImage, imagePlaceholder } from '@/src/constants/fallbackImage'


const CreateProductScreen = () => {
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [errors, setErrors] = useState<string>('')
    const [image, setImage] = useState<string | null>(null);
    const { mutateAsync: insertProduct } = useInsertProduct()
    const { mutateAsync: updateProduct } = useUpdateProduct()
    const { mutateAsync: deleteProduct, isPending } = useDeleteProduct()
    const router = useRouter();

    const { id }: { id: string } = useLocalSearchParams() || false
    const isUpdatingFuckedUpWay = !!id;

    if (id) {
        const { data: updatingProduct, error, isLoading } = useProduct(parseFloat(id))
        useEffect(() => {
            console.log(updatingProduct)
            if (updatingProduct) {
                setName(updatingProduct.name)
                setPrice(updatingProduct.price.toString())
                setImage(updatingProduct.image)
            }
        }, [updatingProduct])
    }



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
        if (isUpdatingFuckedUpWay) {
            onUpdate()
        } else {
            onCreate()
        }
    }
    const onUpdate = () => {
        if (!validateinput()) {
            return;
        }

        updateProduct({
            name, price: parseFloat(price), image, id: parseInt(id)
        }, {
            onSuccess: () => {
                Alert.alert('Product Created Successfully')
                resetField();
                router.back()
            }
        })
        console.log('Product Updated')
        // Update the information in Supabase

        resetField();
    }

    const onCreate = () => {
        if (!validateinput()) {
            return;
        }
        insertProduct({ name, price: parseFloat(price), image }, {
            onSuccess: () => {
                Alert.alert('Product Created Successfully')
                resetField();
                router.back()
            }
        })

        console.log('Product Created')
        // Save the information in Supabase
    }

    const onDelete = () => {
        deleteProduct(parseInt(id), {
            onSuccess: () => {
                router.push('/(admin)/menu')
            }
        })
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
            <Stack.Screen options={{ title: isUpdatingFuckedUpWay ? 'Update This' : 'Add New Dish' }} />
            <Image source={{ uri: image || imagePlaceholder }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput value={name} onChangeText={(e) => setName(e)} placeholder='name' style={styles.input} />
            <Text style={styles.label} >Price</Text>
            <TextInput value={price} onChangeText={(e) => setPrice(e)} placeholder='₹ 80' keyboardType='numeric' style={styles.input} />
            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button onPress={onsubmit} text={isUpdatingFuckedUpWay ? 'Update' : 'Create'} />
            {isUpdatingFuckedUpWay && <Text onPress={() => confirmDelete()} style={styles.textButton}>{isPending ? <ActivityIndicator /> : 'Delete'}</Text>}

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