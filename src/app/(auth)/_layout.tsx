import { useAuth } from "@/src/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
    const { session } = useAuth()
    const { profile } = useAuth()

    if (session || profile?.group === 'USER') {
        return <Redirect href={'/(user)/'} />
    }
    if(session || profile?.group === 'ADMIN'){
        return <Redirect href={'/(admin)/'} />
    }
    return <Stack />
}