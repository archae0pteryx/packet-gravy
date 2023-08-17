import { View } from 'react-native'
import { Link, Stack } from 'expo-router';
import { Button, Text, Image } from 'react-native'


// export default function Home() {
//   const [count, setCount] = React.useState(0)

//   return (
//     <>
//       <Stack.Screen
//         options={{
//           headerTitle: (props) => <LogoTitle {...props} />,
//           headerRight: () => (
//             <Button
//               onPress={() => setCount((c) => c + 1)}
//               title='Update count'
//             />
//           ),
//         }}
//       />
//       <Text>Count: {count}</Text>
//     </>
//   )
// }

// // function LogoTitle() {
// //   return (
// //     <Image
// //       style={{ width: 50, height: 50 }}
// //       source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
// //     />
// //   );
// // }

export default function Home() {
  return (
    <View>
      <Text
        style={{
          color: 'white',
        }}
      >
        Home Screen
      </Text>
      <Link href={{ pathname: 'details', params: { name: 'Bacon' } }}>
        Go to Details
      </Link>
    </View>
  )
}

// export default function Home() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Link href='/modal'>Present modal</Link>
//     </View>
//   )
// }
