import { _Image, Image, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import ProductListItem from '@/src/components/ProductistItem';
import { supabase } from '@/src/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { FontAwesome } from '@expo/vector-icons';
import { useProductList } from '@/src/api/products';



export default function MenuScreen() {
  const { data: products, isLoading, error } = useProductList()



  if (isLoading) return <ActivityIndicator size={'large'} />

  if (error) return (
    <SafeAreaView>
      <View style={{ flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <FontAwesome name='ban' style={{ fontSize: 80, color: 'gray' }} />
        <Text style={{ textAlign: 'center', fontSize: 28, color: 'gray' }}>Failed to get the data please try after sometimes</Text>
      </View>
    </SafeAreaView>
  )



  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />

  );
}


