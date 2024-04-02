import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect, useRouter } from 'expo-router';
import Colors from '../constants/Colors';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';

const index = () => {
  const router = useRouter()
  const { session, loading, isAdmin } = useAuth()
  // console.log(session)
  if (loading) {
    return <ActivityIndicator />
  }

  if (!session) return <Redirect href={'/signIn'} />


  if (!isAdmin) {
    return <Redirect href={'/(user)/'} />
  }

  const handleLogout = async () => {
    const logout = await supabase.auth.signOut()
    const refresh = await supabase.auth.refreshSession()
    // router.push('/')
  }
  if (isAdmin) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <Text style={style.header}>Welcome to Adarsh Egg Center</Text>
        <Link href={'/(user)'} asChild>
          <Button text="USER" />
        </Link>
        <Link href={'/(admin)/'} asChild>
          <Button text="ADMIN" />
        </Link>
      </View>
    );
  }
};

const style = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 30,
    color: Colors.light.text
  }
})

export default index;