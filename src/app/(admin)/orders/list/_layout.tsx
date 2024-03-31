import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)


export default function OrderListNavigator() {
    return (<>
        <TopTabs>
            <TopTabs.Screen name="index" options={{title:'active'}}/>
        </TopTabs>
    </>
    )
}
// <SafeAreaView edges={['top']} style={{flex: 1,backgroundColor:'white'}}>
// </SafeAreaView>