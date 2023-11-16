import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
import axios from "axios"
import moment from "moment"
import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import SelectDropdown from "react-native-select-dropdown"
import DateTimePicker from "@react-native-community/datetimepicker"

export default function AddTransaction() {
  const router = useRouter()

  const [marketingsOrigin, setMarketingsOrigin] = useState([])
  const [marketings, setMarketings] = useState([])
  const [selectColor, setSelectColor] = useState("rgb(156 163 175)")

  async function getMarketings() {
    try {
      const response = await axios.get("http://localhost:8000/api/marketing")
      const data = response.data.data.map(function (v) {
        return v.name
      })

      setMarketingsOrigin(response.data.data)
      setMarketings(data)
    } catch (error) {
      console.error(error)
    }
  }

  const [marketing, setMarketing] = useState("")
  const [cargoFee, setCargoFee] = useState("")
  const [totalBalance, setTotalBalance] = useState("")
  const [grandTotal, setGrandTotal] = useState("")
  const [type, setType] = useState("")

  const [date, setDate] = useState(new Date())
  const [showDate, setShowDate] = useState(false)

  function onChangeDate(e, selectedDate) {
    setDate(selectedDate)
    setShowDate(false)
  }

  function onPressDate() {
    setShowDate(true)
  }

  function submit() {
    const data = {
      marketing_id: marketing,
      date: moment(date).format("YYYY-MM-DD"),
      cargo_fee: cargoFee,
      total_balance: totalBalance,
      grand_total: grandTotal,
      type: type,
    }

    axios
      .post("http://localhost:8000/api/transaction", data)
      .then((response) => {
        router.push("/")
      })
      .catch((response) => {
        console.log(response)
      })
  }

  useEffect(() => {
    getMarketings()
  }, [])

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
          <Text>Marketing</Text>
          <SelectDropdown
            buttonStyle={{
              marginTop: 8,
              height: 30,
              width: "100%",
              borderRadius: 6,
              backgroundColor: "rgb(229 231 235)",
            }}
            buttonTextStyle={{ fontSize: 14, color: selectColor, textAlign: "left" }}
            data={marketings}
            onSelect={(selectedItem, index) => {
              setMarketing(marketingsOrigin[index].id)
              setSelectColor("black")
            }}
          />
          <View>
            <Text className="mt-4">Tanggal</Text>
            <TouchableOpacity
              onPress={onPressDate}
              className="bg-gray-200 rounded-lg px-4 py-2 mt-2">
              <Text>{moment(date).format("DD MMMM YYYY")}</Text>
            </TouchableOpacity>
            {showDate && (
              <View className="flex-row -ml-3 mt-2">
                <DateTimePicker value={date} mode={"date"} onChange={onChangeDate} />
              </View>
            )}
          </View>
          <Text className="mt-4">Cargo Fee</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={(v) => setCargoFee(v)}
            placeholder="Masukan Cargo Fee"
            className="bg-gray-200 rounded-lg px-4 py-2 mt-2"
          />
          <Text className="mt-4">Total Balance</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={(v) => setTotalBalance(v)}
            placeholder="Masukan Total Balance"
            className="bg-gray-200 rounded-lg px-4 py-2 mt-2"
          />
          <Text className="mt-4">Grand Total</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={(v) => setGrandTotal(v)}
            placeholder="Masukan Grand Total"
            className="bg-gray-200 rounded-lg px-4 py-2 mt-2"
          />
          <Text className="mt-4">Jenis Pembayaran</Text>
          <SelectDropdown
            buttonStyle={{
              marginTop: 8,
              height: 30,
              width: "100%",
              borderRadius: 6,
              backgroundColor: "rgb(229 231 235)",
            }}
            buttonTextStyle={{ fontSize: 14, color: selectColor, textAlign: "left" }}
            data={["cash", "credit"]}
            onSelect={(selectedItem, index) => {
              setType(selectedItem)
              setSelectColor("black")
            }}
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
