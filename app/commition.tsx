import { View, Text, ScrollView, TextInput, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useEffect, useState } from "react"
import { Link } from "expo-router"
import axios from "axios"
import moment from "moment"

export default function Index() {
  const [date, setDate] = useState(new Date())

  const onChange = (e, selectedDate) => {
    setDate(selectedDate)
  }

  const [commitions, setCommitions] = useState([])

  const getCommitions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/commition")
      const data = response.data.data
      console.log(data)

      setCommitions(data)
    } catch (error) {
      console.error(error)
    }
  }

  function rupiah(amount) {
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount)
    return formattedAmount.replace("Rp", "Rp ")
  }

  useEffect(() => {
    getCommitions()
  }, [])

  return (
    <View className="h-screen">
      <View className="relative px-4">
        <Link className="h-8 w-8" href="/">
          <Ionicons name="arrow-back-outline" size={24} color="rgb(249 115 22)" />
        </Link>
        <View className="absolute inset-x-0 top-2 w-screen flex-row justify-center items-center">
          <Text className="text-orange-500 font-semibold">Komisi</Text>
        </View>
      </View>
      <ScrollView>
        <View className="p-4 pb-[5vh]">
          <ScrollView horizontal={true}>
            <View className="divide-y divide-gray-300 border border-gray-300 rounded-lg">
              <View className="flex-row divide-x divide-gray-300 bg-gray-100">
                <View className="w-36 px-3 py-5">
                  <Text className="text-gray-700 font-semibold uppercase">Marketing</Text>
                </View>
                <View className="w-36 px-3 py-5">
                  <Text className="text-gray-700 font-semibold uppercase">Bulan</Text>
                </View>
                <View className="w-36 px-3 py-5">
                  <Text className="text-gray-700 font-semibold uppercase">Omzet</Text>
                </View>
                <View className="w-36 px-3 py-5">
                  <Text className="text-gray-700 font-semibold uppercase">Komisi %</Text>
                </View>
                <View className="w-36 px-3 py-5">
                  <Text className="text-gray-700 font-semibold uppercase">Komisi Nominal</Text>
                </View>
              </View>

              {/* Commitions */}
              {commitions.map((commition) => (
                <View key={commition.id} className="flex-row divide-x divide-gray-300">
                  <View className="w-36 px-3 py-5">
                    <Text className="text-gray-600">{commition.name}</Text>
                  </View>
                  <View className="w-36 px-3 py-5">
                    <Text className="text-gray-600">{commition.month}</Text>
                  </View>
                  <View className="w-36 px-3 py-5">
                    <Text className="text-gray-600">{rupiah(commition.omzet)}</Text>
                  </View>
                  <View className="w-36 px-3 py-5">
                    <Text className="text-gray-600">{commition.commitionPercent} %</Text>
                  </View>
                  <View className="w-36 px-3 py-5">
                    <Text className="text-gray-600">{rupiah(commition.commitionNominal)}</Text>
                  </View>
                </View>
              ))}
              {/* Commitions */}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}
