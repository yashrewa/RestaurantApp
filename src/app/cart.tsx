import { View, Text, Platform, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import CartProvider, { useCart } from '../providers/CartProvider'
import { CartItem, Product } from '../types'
import CartListItem from '../components/CartListItem'
import { FontAwesome } from '@expo/vector-icons'
import { Link } from 'expo-router'
import Button from '../components/Button'



const cartScreen = () => {
  const { items, total } = useCart()
  console.log(items)

  const { checkOut } = useCart()

  const handleCreateOrder = () => {
    checkOut()
  }


  return (
    <View style={{ padding: 10 }}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      {items.length === 0 && (
        <>
          <Text style={{ fontSize: 50, textAlign: 'center', marginTop: 21 }}> Add Items To Cart</Text>
          <Link href={'/menu/'} style={{ fontSize: 25, color: 'red', textAlign: 'center' }}>Check Out the Menu</Link>
        </>
      )}
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} key={item.product_id} />}
        contentContainerStyle={{ gap: 10 }}
      />
      {items.length > 0 && <Text style={{ fontSize: 20, marginTop: 20, fontWeight: '500' }}>Total Cart Value: {total}</Text>}

      {items.length > 0 && <Button text='Checkout' onPress={() => handleCreateOrder()} />}

    </View>
  )
}

export default cartScreen