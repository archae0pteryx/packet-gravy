import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Header() {
  return <View style={{
    backgroundColor: '#f4511e',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 50,
    flexDirection: 'row',

  }}>
    <Link href="/details">Details</Link>
    <Link href="/modal">Modal</Link>
  </View>
}
