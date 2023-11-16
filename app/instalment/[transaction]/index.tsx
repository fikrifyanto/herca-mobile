import { View, Text, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Link, useLocalSearchParams } from "expo-router"

export default function AddTransaction() {
  const params = useLocalSearchParams()
  const transactionID = params?.transaction

  return (
    <View className="h-screen">
      <View className="relative px-4">
        <Link className="h-8 w-8" href="/">
          <Ionicons name="arrow-back-outline" size={24} color="rgb(249 115 22)" />
        </Link>
        <View className="absolute inset-x-0 top-2 w-screen flex-row justify-center items-center">
          <Text className="text-orange-500 font-semibold">Detail Cicilan</Text>
        </View>
      </View>
      <View className="absolute bottom-[15vh] right-0 left-0 justify-center items-center shadow-2xl">
        <Link href={`/instalment/${transactionID}/add`}>
          <View className="flex-row rounded-full bg-orange-500 items-center justify-center px-4 py-2 gap-x-2">
            <Text className="text-white">Tambah Pembayaran</Text>
            <Ionicons name="add-circle-outline" size={24} color="white" />
          </View>
        </Link>
      </View>
    </View>
  )
}
