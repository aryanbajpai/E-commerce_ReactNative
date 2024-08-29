
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function TabNavigator({
  name,
  username,
  password,
  navigation,
  gender,
  onLogOut,
}) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f0c38e",
        },
        headerTintColor: "#48426d",
        headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
        contentStyle: {
          backgroundColor: "#df643f",
        }, // Hide headers for tab screens if desired
        tabBarLabelPosition: "below-icon",
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#f0c38e",
        tabBarInactiveTintColor: "#fff", 
        tabBarActiveBackgroundColor: '#312c51',
        tabBarInactiveBackgroundColor: '#312c51',
        tabBarLabelStyle: {fontSize: 11, marginBottom: 5},
        tabBarIconStyle: {marginTop: 5}
      }}
    >
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={23} color={color} /> // You can add an icon for this tab if needed
          ),
        }}
      >
        {(props) => (
          <ProfileScreen
            {...props}
            name={name}
            username={username}
            password={password}
            gender={gender}
            onLogOut={onLogOut}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart" size={23} color={color} /> // You can add an icon for this tab if needed
          ),
          tabBarBadge: 0,
          tabBarBadgeStyle: {marginLeft: 4,}
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={23} color={color} /> // You can add an icon for this tab if needed
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={23} color={color} /> // You can add an icon for this tab if needed
          ),
          tabBarBadge: 0,
          tabBarBadgeStyle: {marginLeft: 2,}
        }}
      />
    </Tab.Navigator>
  );
}