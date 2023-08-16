import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import Constants from 'expo-constants'
import { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@rneui/themed'
import { Text } from '@rneui/themed'
import * as SystemUI from 'expo-system-ui'
import { Button, Icon } from '@rneui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'

SystemUI.setBackgroundColorAsync('#222222')

const COLORS = {
  BACKGROUND: '#353535',
  ERROR: '#EF6F6C',
  PRIMARY: '#D9D9D9',
  SUCCESS: '#E7F9A9',
}

const theme = createTheme({
  lightColors: {
    primary: '#e7e7e8',
  },
  darkColors: {
    primary: '#363732',
    background: '#363732',
  },
  mode: 'dark',
})

function ConnectButton({ handlePress }: { handlePress: () => void }) {
  return (
    <Button onPress={handlePress}>
      <Icon type='material-community' name='lan-connect' color={COLORS.SUCCESS} size={60} />
    </Button>
  )
}

const DisconnectButton = ({ handlePress }: { handlePress: () => void }) => (
  <Button onPress={handlePress}>
    <Icon type='material-community' name='lan-disconnect' color={COLORS.ERROR} size={60} />
  </Button>
)

export default function App() {
  const [messages, setMessages] = useState<Record<string, unknown>[]>([])
  const [error, setError] = useState('')
  const [connected, setConnected] = useState(false)
  const [socket, setSocket] = useState<any>(null)

  const handleConnect = () => {
    console.log('connecting to socket...')
    if (!socket) {
      const socket = new WebSocket(`https://8a32-198-54-134-70.ngrok-free.app`)
      console.log('...socket connected')
      setSocket(socket)
    }
  }

  const handleDisconnect = () => {
    setMessages([])
    setError('')
    if (socket) {
      socket.close()
    }
  }

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        setError('')
        setConnected(true)
      }
      socket.onclose = () => {
        setError('')
        setConnected(false)
        setSocket(null)
      }
      socket.onmessage = (e: any) => {
        try {
          setError('')
          const json = JSON.parse(e.data)
          setMessages((prev) => [...prev, json])
        } catch (err: any) {
          console.error(err)
          setError(err?.message || 'an unknown error occurred')
        }
      }

      socket.onerror = (e: any) => {
        setError(e.message)
      }
      console.log('socket initialized')
    }
  }, [socket])

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.topButtons}>
          {connected ? (
            <ConnectButton handlePress={handleDisconnect} />
          ) : (
            <DisconnectButton handlePress={handleConnect} />
          )}
        </View>

        <View style={styles.codeContainer}>
          {messages.length ? <Text>{JSON.stringify(messages)}</Text> : <Text>No data</Text>}
        </View>
      </SafeAreaView>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
  },
  codeContainer: {
    backgroundColor: COLORS.BACKGROUND,
    color: COLORS.PRIMARY,
    marginTop: 50,
    padding: 20,
    width: '100%',
  },
  errorText: {
    color: COLORS.ERROR,
    marginBottom: 30,
    marginHorizontal: 20,
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: COLORS.ERROR,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
  },
  topButtons: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
})
