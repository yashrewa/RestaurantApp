import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type Profile = {
    avatarUrl: string,
    full_name: string,
    group: string,
    id: string,
    updated_at: string,
    userName: string
}

type AuthData = {
    session: Session | null,
    profile: Profile | null,
    isAdmin: boolean,
    loading: boolean
}

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    isAdmin: false,
    profile: null
})
export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session)

            if (session) {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session?.user.id)
                    .single();
                setProfile(data || null)
            }
            setLoading(false)
        }
        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {

            if (_event === 'SIGNED_OUT' || _event === 'SIGNED_IN') {
                setSession(session);
            }
        })
    }, [])

    console.log(profile)

    return (
        <AuthContext.Provider value={{ session, loading, profile, isAdmin: profile?.group === 'ADMIN' }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)