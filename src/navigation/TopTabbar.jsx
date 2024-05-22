import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CommunityScreen from "../screens/CommunityScreen";

import { Colors } from "../theme/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { TabBarData } from "../data/TabbarData";

const Tab = createMaterialTopTabNavigator();
const TopTabbar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={() => ({
        tabBarActiveTintColor: Colors.tertiary,
        tabBarInactiveTintColor: Colors.secondaryColor,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.tertiary,
        },

        tabBarStyle: {
          backgroundColor: Colors.primaryColor,
        },
      })}
    >
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
            tabBarShowLabel:false,
          tabBarIcon: ({ color }) => (
            <Icon type="FontAweSome" name="people" size={25} color={color} />
          ),
        }}
      />

      {TabBarData.map((tab)=> <Tab.Screen key={tab.id} name={tab.name} component={tab.route}/>)}
     
      
    </Tab.Navigator>
  );
};

export default TopTabbar;
