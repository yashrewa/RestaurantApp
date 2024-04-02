import { _Image, ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native';
import ProductListItem from '@/src/components/ProductistItem';
import { useProductList } from '@/src/api/products';
import { FontAwesome } from '@expo/vector-icons';


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


