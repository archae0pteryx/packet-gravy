import { Slot } from 'expo-router'
import { SafeAreaView } from 'react-native'
// import { Text } from "@rneui/base";
// import { View } from 'expo-router'
import Header from '../components/Header'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider, createTheme } from '@rneui/themed'
import { StyleSheet } from 'react-native'

const theme = createTheme({})

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='dark' />
      <SafeAreaView style={styles.container}>
        <Header />
        <Slot />
      </SafeAreaView>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 90,
  },
  text: {},
})
