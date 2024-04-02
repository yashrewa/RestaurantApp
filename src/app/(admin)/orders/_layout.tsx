import { Link, Stack } from "expo-router";

export default function MenuStack() {
    return (
        <Stack>
            {/* <Stack.Screen name="index" options={{ title: "Orders" , headerShown: false}} />s */}
            <Stack.Screen name="list" options={{ title: "list" , headerShown: false}} />
        </Stack>
    )
}