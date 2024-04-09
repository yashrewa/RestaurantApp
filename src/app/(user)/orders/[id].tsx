import orders from "@/assets/data/orders";
import { useOrderDetails } from "@/src/api/orders";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/orderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

export default function OrderDetailScreen() {

    const { id }: { id: string } = useLocalSearchParams()
    // const order = orders?.find(x => x?.id.toString() == id);

    const { data: order, error, isLoading } = useOrderDetails(parseInt(id))



    if (isLoading) {
        return <ActivityIndicator />
    }
    if (error) {
        return <Text> Not found </Text>
    }
    return (
        <>
            <View style={styles.container}>
                <Stack.Screen options={{ title: `Order #${id}` }} />
                <OrderListItem order={order} />
            </View>
            <FlatList
                data={order?.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10, padding: 10 }}
            />

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        maxWidth: '100%',
        backgroundColor: 'white',
        padding: 10,
        gap: 20,
        borderRadius: 20,
    },

})