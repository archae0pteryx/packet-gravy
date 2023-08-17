import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { ThemeProvider, createTheme } from '@rneui/themed'
import { Text } from '@rneui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Slot } from 'expo-router'

const theme = createTheme({})

export default function Home() {
  return (
    <View>
      <Text style={{
        color: 'white'
      }}>Gravy</Text>
    </View>
  )
}

