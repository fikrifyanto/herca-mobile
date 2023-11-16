import { View, Text, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Link, useLocalSearchParams } from "expo-router"
import { ScrollView } from "react-native-gesture-handler"
import { useState, useEffect } from "react"
import axios from "axios"
import moment from "moment"

export default function AddTransaction() {
  const params = useLocalSearchParams()
  const transactionID = params?.transaction

  const [payments, setPayments] = useState([])

  const getPayments = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/payment/${transactionID}`)
      const data = response.data.data

      setPayments(data)
    } catch (error) {
      console.error(error)
    }
  }

  const [transaction, setTransaction] = useState([])

  const getTransaction = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/transaction/${transactionID}`)
      const data = response.data.data

      setTransaction(data)
      console.log(transaction)
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
    getPayments()
    getTransaction()
  }, [])

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
      <View className="p-4 pb-[20vh]">
        <ScrollView>
          <View className="divide-y divide-gray-300 border border-gray-300 rounded-lg">
            <View className="flex-row divide-x divide-gray-300 bg-gray-100">
              <View className="w-36 px-3 py-5">
                <Text className="text-gray-700 font-semibold uppercase">Tanggal</Text>
              </View>
              <View className="w-36 px-3 py-5">
                <Text className="text-gray-700 font-semibold uppercase">Nominal</Text>
              </View>
            </View>
            {/* Payments */}
            {payments.map((payment) => (
              <View key={payment.id} className="flex-row divide-x divide-gray-300">
                <View className="w-36 px-3 py-5">
                  <Text className="text-gray-600">
                    {moment(payment.created_at).format("DD MMMM YYYY")}
                  </Text>
                </View>
                <View className="w-36 px-3 py-5">
                  <Text className="text-gray-600">{rupiah(payment.nominal)}</Text>
                </View>
              </View>
            ))}
            {/* Payments */}
          </View>
        </ScrollView>
      </View>

      {transaction?.status == "paid" && (
        <View className="absolute bottom-[15vh] right-0 left-0 justify-center items-center shadow-2xl">
          <Link href={`/instalment/${transactionID}/add`}>
            <View className="flex-row rounded-full bg-orange-500 items-center justify-center px-4 py-2 gap-x-2">
              <Text className="text-white">Tambah Pembayaran</Text>
              <Ionicons name="add-circle-outline" size={24} color="white" />
            </View>
          </Link>
        </View>
      )}
    </View>
  )
}
