import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MyStatus from '../components/MyStatus'
import RecentStatus from '../components/RecentStatus'
import ViewedStatus from '../components/ViewedStatus'
import { Colors } from '../theme/Colors'

const StatusListScreen = () => {
  return (
    <View style={styles.container}>
      <MyStatus />
      <RecentStatus />
      <ViewedStatus />
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.background,
    padding: 16,
  }
})

export default StatusListScreen