import { Image, StyleSheet, Text, View, Pressable } from "react-native"
import { Product } from '@/src/types';
import Colors from "../constants/Colors";
import { Link, useSegments } from "expo-router";

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food./default.png';

type ProductListItemProps = {
    product: Product;
}


const ProductListItem = ({ product }: ProductListItemProps) => {

    const segments = useSegments();

    return (<>


        {segments[0] && <Link href={`/${segments[0]}/menu/${product.id}` as `${string}:${string}`} asChild>
            <Pressable style={styles.container}>
                <Image
                    source={{ uri: product.image || defaultPizzaImage }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}> ${product.price} </Text>
            </Pressable>
        </Link >
        }
    </>
    )
}


export default ProductListItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        maxWidth: '50%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    price: {
        color: Colors.light.tint,
        fontWeight: '900',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    }
});