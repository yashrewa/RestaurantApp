import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { MealSize } from '@/src/types';
import { useProduct } from '@/src/api/products';
import { fallbackImage } from '@/src/constants/fallbackImage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';


const sizes: MealSize[] = ['Quarter', 'Half', 'Full']
const productDetailPage = () => {
  const [selectedSize, setSelectedSize] = useState<MealSize>('Half')
  const router = useRouter();
  const { id }: { id: string } = useLocalSearchParams();
  // const product = products.find(p => p.id === parseInt(id));'
  const { data: product, error, isLoading } = useProduct(parseFloat(id))




  const { addItem } = useCart()


  const handleAddToCart = () => {
    if (product && addItem) {
      addItem(product, selectedSize)
      console.warn('Added to Cart')
      router.push('/cart')
    }

  }


  if (isLoading) return <ActivityIndicator size={'large'} />

  if (error) return (
    <SafeAreaView>
      <View style={{ flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <FontAwesome name='ban' style={{ fontSize: 80, color: 'gray' }} />
        <Text style={{ textAlign: 'center', fontSize: 28, color: 'gray' }}>Failed to get the data please try after sometimes</Text>
      </View>
    </SafeAreaView>
  )

  if (!product) {
    return (
      <View>
        <Stack.Screen options={{ title: 'Not Found' }} />
        <Text style={{ fontSize: 70, justifyContent: 'center', alignItems: 'center' }}>Product Not Found</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image source={{ uri: product.image || fallbackImage }} style={styles.image} />
      <Text>Select Size</Text>

      {/* Take size ka description from the owner */}
      <View style={styles.sizes}>
        {sizes?.map(size => (
          <Pressable key={size} onPress={() => setSelectedSize(size)} style={[styles.size, { backgroundColor: selectedSize === size ? 'gainsboro' : 'white' }]}>
            <Text style={[styles.sizeText, { color: selectedSize === size ? 'black' : 'gray' }]} >{size}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>₹{product.price}</Text>
      <Button
        text='Add To Cart'
        onPress={handleAddToCart}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 12,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  sizes: {
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  size: {
    width: '20%',
    paddingLeft: '1%',
    // aspectRatio: 2 / 1,
    borderRadius: 3,
    marginVertical: 6,
    paddingVertical: 6,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 18,
  }

})

export default productDetailPage
