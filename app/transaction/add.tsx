import { View, Text, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"

export default function AddTransaction() {
  function submit() {
    console.log("oke")
  }

  return (
    <View className="h-screen">
      <View className="relative px-4">
        <Link href="/">
          <Ionicons name="arrow-back-outline" size={24} color="rgb(249 115 22)" />
        </Link>
        <View className="absolute inset-x-0 top-2 w-screen flex-row justify-center items-center">
          <Text className="text-orange-500 font-semibold">Tambah Transaksi</Text>
        </View>
      </View>
      <ScrollView>
        <View className="p-4">
          <Text>Tanggal</Text>
          <TextInput
            placeholder="Masukan No. Transaksi"
            className="bg-gray-200 rounded-lg px-4 py-2 mt-2"
          />
          <Text className="mt-4">Cargo Fee</Text>
          <TextInput
            placeholder="Masukan No. Transaksi"
            className="bg-gray-200 rounded-lg px-4 py-2 mt-2"
          />
          <Text className="mt-4">Total Balance</Text>
          <TextInput
            placeholder="Masukan No. Transaksi"
            className="bg-gray-200 rounded-lg px-4 py-2 mt-2"
          />
          <Text className="mt-4">Grand Total</Text>
          <TextInput
            placeholder="Masukan No. Transaksi"
            className="bg-gray-200 rounded-lg px-4 py-2 mt-2"
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={submit}
        className="absolute inset-x-0 bottom-[10vh] bg-orange-500 rounded-full p-4 flex-row justify-center mx-4">
        <Text className="text-white">Tambahkan</Text>
      </TouchableOpacity>
    </View>
  )
}
