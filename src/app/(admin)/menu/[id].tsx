import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { Link, Stack, useLocalSearchParams, usePathname, useRouter } from 'expo-router'
import products from '@/assets/data/products';
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { types } from '@babel/core';
import { MealSize } from '@/src/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useProduct } from '@/src/api/products';
import { fallbackImage } from '@/src/constants/fallbackImage';


const sizes: MealSize[] = ['Quarter', 'Half', 'Full']
const productDetailPage = () => {
  const { id }: { id: string } = useLocalSearchParams()
  const [selectedSize, setSelectedSize] = useState<MealSize>('Half')


  const { data: product, error, isLoading } = useProduct(parseFloat(id))





  const router = useRouter();


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
    <View style={{ flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <FontAwesome name='ban' style={{ fontSize: 80, color: 'gray' }} />
      <Text style={{ textAlign: 'center', fontSize: 28, color: 'gray' }}>Failed to get the data please try after sometimes</Text>
    </View>
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

      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}` as any} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.text}
                    style={{ marginRight: 5, opacity: pressed ? 0.5 : 1, }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen options={{ title: product?.name }} />
      <Image source={{ uri: product.image || fallbackImage }} style={styles.image} />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
      {/* <Button
        text='Add To Cart'
        onPress={handleAddToCart}
      /> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginTop: 'auto',
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
