import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native"
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

  const [transactions, setTransasctions] = useState([])

  const getTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/transaction")
      const data = response.data.data

      setTransasctions(data)
    } catch (error) {
      console.error(error)
    }
  }

  const [omzet, setOmzet] = useState(0)

  const getOmzet = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/omzet")
      const data = response.data.omzet
      console.log(response.data)

      setOmzet(data)
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
    getTransactions()
    getOmzet()
  }, [])

  return (
    <View className="h-screen">
      <ScrollView>
        <View className="p-4 pb-[20vh]">
          <View className="mb-4 border bg-orange-50 border-orange-500 rounded-lg p-4">
            <View className="flex-row justify-between items-center">
              <Text className="font-sembold">Omzet Bulan Ini</Text>
              <Text className="font-bold text-lg text-orange-500">{rupiah(omzet)}</Text>
            </View>
            <Link href="/commition">
              <Text className="text-orange-500 font-semibold underline">Lihat Semua Komisi</Text>
            </Link>
          </View>

          <Text className="mt-4">Filter Tanggal</Text>
          <View className="flex-row -ml-3 mt-2">
            <DateTimePicker value={date} mode={"date"} onChange={onChange} />
            <DateTimePicker value={date} mode={"date"} onChange={onChange} />
          </View>

          <Text className="mt-4">Cari</Text>
          <TextInput
            placeholder="Masukan No. Transaksi"
            className="bg-gray-200 rounded-lg px-4 py-2 mt-2"
          />

          <ScrollView className="mt-4" horizontal={true}>
            <View className="divide-y divide-gray-300 border border-gray-300 rounded-lg">
              <View className="flex-row divide-x divide-gray-300 bg-gray-100">
                <View className="w-36 px-3 py-5">
                  <Text className="text-gray-700 font-semibold uppercase">No. Transaksi</Text>
                </View>
                <View className="w-36 px-3 py-5">
                  <Text className="text-gray-700 font-semibold uppercase">Tanggal</Text>
                </View>
                <View className="w-36 px-3 py-5">
                  <Text className="text-gray-700 font-semibold uppercase">Cargo Fee</Text>
                </View>
                <View className="w-36 px-3 py-5">
                  <Text className="text-gray-700 font-semibold uppercase">Total Balance</Text>
                </View>
                <View className="w-36 px-3 py-5">
                  <Text className="text-gray-700 font-semibold uppercase">Grand Total</Text>
                </View>
                <View className="w-36 px-3 py-5">
                  <Text className="text-gray-700 font-semibold uppercase">Pembayaran</Text>
                </View>
              </View>

              {/* Transactions */}
              {transactions.map((transaction) => (
                <View key={transaction.id} className="flex-row divide-x divide-gray-300">
                  <View className="w-36 px-3 py-5">
                    <Text className="text-gray-600">{transaction.transaction_number}</Text>
                  </View>
                  <View className="w-36 px-3 py-5">
                    <Text className="text-gray-600">
                      {moment(transaction.date).format("DD MMMM YYYY")}
                    </Text>
                  </View>
                  <View className="w-36 px-3 py-5">
                    <Text className="text-gray-600">{rupiah(transaction.cargo_fee)}</Text>
                  </View>
                  <View className="w-36 px-3 py-5">
                    <Text className="text-gray-600">{rupiah(transaction.total_balance)}</Text>
                  </View>
                  <View className="w-36 px-3 py-5">
                    <Text className="text-gray-600">{rupiah(transaction.grand_total)}</Text>
                  </View>

                  {transaction.type == "cash" ? (
                    <View className="w-36 px-3 py-5">
                      <Text className="text-green-500 font-semibold">Cash</Text>
                    </View>
                  ) : transaction.status == "unpaid" ? (
                    <View className="w-36 px-3 py-5">
                      <Text className="text-green-500 font-semibold">Lunas</Text>
                      <Link
                        href={`/instalment/${transaction.id}`}
                        className="text-orange-500 font-semibold underline">
                        Lihat Cicilan
                      </Link>
                    </View>
                  ) : (
                    <View className="w-36 px-3 py-5">
                      <Text className="text-green-500 font-semibold">Belum Lunas</Text>
                      <Link
                        href={`/instalment/${transaction.id}`}
                        className="text-orange-500 font-semibold underline">
                        Lihat Cicilan
                      </Link>
                    </View>
                  )}
                </View>
              ))}
              {/* Transactions */}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <View className="absolute bottom-[15vh] right-0 left-0 justify-center items-center shadow-2xl">
        <TouchableOpacity>
          <Link href="/transaction/add">
            <View className="flex-row rounded-full bg-orange-500 items-center justify-center px-4 py-2 gap-x-2">
              <Text className="text-white">Tambah Transaksi</Text>
              <Ionicons name="add-circle-outline" size={24} color="white" />
            </View>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  )
}
