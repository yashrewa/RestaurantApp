import { FlatList, Pressable, StyleSheet } from 'react-native';

// import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/orderListItem';
import { useAdminOrderList } from '@/src/api/orders';



export default function OrderScreen() {

    const { data: orders } = useAdminOrderList({ archived: true })

    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            keyExtractor={(order) => order?.id.toString()}
            numColumns={1}
            contentContainerStyle={{ gap: 10, padding: 10 }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
