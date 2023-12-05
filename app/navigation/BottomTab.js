import {Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {bottomStack} from '../common/utils';
import {gstyles} from '../common/gstyles';
import {colors} from '../common/colors';

const Tab = createBottomTabNavigator();

export function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: gstyles.tabBar,
      }}>
      {bottomStack.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={item.icon}
                resizeMode="contain"
                style={[
                  gstyles.tabIcon,
                  {tintColor: focused ? colors.red : colors.grey},
                ]}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  gstyles.tabLabel,
                  {color: focused ? colors.red : colors.grey},
                ]}>
                {item.label}
              </Text>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
