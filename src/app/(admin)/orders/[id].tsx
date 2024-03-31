import orders from "@/assets/data/orders";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/orderListItem";
import Colors from "@/src/constants/Colors";
import { OrderStatusList } from "@/src/types";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function OrderDetailScreen() {

    const { id } = useLocalSearchParams()
    const order = orders?.find(x => x?.id.toString() == id);

    if (!order) {
        return <Text> Not found </Text>
    }
    return (
        <>
            <View style={styles.container}>
                <Stack.Screen options={{ title: `Order #${id}` }} />
                <OrderListItem order={order} />
            </View>
            <FlatList
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10, padding: 10 }}
                ListFooterComponent={() => <>
                    <Text style={{ fontWeight: 'bold' }}>Status</Text>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        {OrderStatusList.map((status) => (
                            <Pressable
                                key={status}
                                onPress={() => console.warn('Update status')}
                                style={{
                                    borderColor: Colors.light.tint,
                                    borderWidth: 1,
                                    padding: 10,
                                    borderRadius: 5,
                                    marginVertical: 10,
                                    backgroundColor:
                                        order.status === status
                                            ? Colors.light.tint
                                            : 'transparent',
                                }}
                            >
                                <Text
                                    style={{
                                        color:
                                            order.status === status ? 'white' : Colors.light.tint,
                                    }}
                                >
                                    {status}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </>
                }
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