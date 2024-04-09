import { Image, StyleSheet, Text, View, Pressable } from "react-native"
import { Order, Product } from '@/src/types';
import Colors from "../constants/Colors";
import orders from "@/assets/data/orders";
import { Link, Stack, useSegments } from "expo-router";
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";
import { Tables } from "../database.types";

dayjs.extend(relativeTime)
export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food./default.png';

type ProductListItemProps = {
    product: Product;
}

type OrderListItemProps = {
    order: Tables<'orders'>;
}
function OrderListItem({ order }: OrderListItemProps) {
    // const { item } = item;
    // console.warn('ITEM', order )

    const segments = useSegments()
    return (
        <Link href={`/${segments[0]}/orders/${order.id}` as any} asChild>
            <Pressable style={styles.container}>
                <View style={styles.div1}>
                    <Text style={styles.title}>OrderNo. {order.id}</Text>
                    <Text style={styles.time}> {dayjs(order.created_at).fromNow()} </Text>
                </View>
                <View>
                    <Text style={styles.status}> {order.status} </Text>
                </View>
            </Pressable>
        </Link>

    )
}


export default OrderListItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: '100%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center'

    },
    div1: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    status: {
        color: 'gray',
        fontSize: 16,
        fontWeight: '700'
    },
    time: {

        fontSize: 15,
        color: 'gray',
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