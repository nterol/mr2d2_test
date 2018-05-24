import Reactotron from 'reactotron-react-native'

Reactotron
  .configure({
      host: '127.0.0.1',
      port: 8081
    })
  .useReactNative()
  .connect()