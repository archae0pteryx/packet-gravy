import { View, Text } from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'

export default function Details() {
  const router = useRouter()
  const params = useLocalSearchParams()

  return (
    <View>
      <Text
        style={{
          color: 'white',
        }}
      >
        Details Screen
      </Text>
    </View>
  )
}
