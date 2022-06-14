import 'react-native-gesture-handler';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, SafeAreaView, ScrollView, View, Button} from 'react-native';
import { useEffect, useState } from 'react';

import InvView from './Components/InvView';
import LoginScreen from './Components/LoginScreen';
import MainSpeedDial from './Components/MainSpeedDial';
import NewItemForm from './Components/NewItemForm';
import SearchBar from './Components/SearchBar';
import Users from './Components/Users';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const DUMINV = [
  {
    itemName: "Pro Elite",
    desc: "Pentair PE-40 Pro Elite with 6 Stage carbon tank",
    count: 5
  },
  {
    itemName: "700 Series",
    desc: "Autotrol 268, 48k Softener with 6 Stage carbon tank",
    count: 6
  },
  {
    itemName: "200 Series",
    desc: "Autotrol 268, 48k Softener with 1 activated carbon",
    count: 7
  },
  {
    itemName: "100 Series",
    desc: "Autotrol 268, 48k Softener",
    count: 8
  }
];

function HomeScreen({ isAdmin, navigation }) {
  const [dummyInv, setDummyInv]       = useState(DUMINV);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding]       = useState(false);

  const pushInv = (newItem) => {
    setDummyInv(dummyInv => [...dummyInv, newItem])
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View>
          <Text>
            Logged in as {isAdmin ? "Admin" : "null"}
          </Text>
        </View>

        <View>
          {isSearching && <SearchBar setIsSearching={setIsSearching}/>}
        </View>

        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <InvView dummyInv={dummyInv} />
          </ScrollView>
        </SafeAreaView>

        <MainSpeedDial setDummyInv={setDummyInv} setIsSearching={setIsSearching} setIsAdding={setIsAdding} isAdding={isAdding} isSearching={isSearching}/>
      </View>

      <View>
        {isAdding && <NewItemForm  pushInv={pushInv} setIsAdding={setIsAdding}/>}
      </View>

    </SafeAreaProvider>
  );
}

// for side bar navigations
const Drawer = createDrawerNavigator();

export default function App() {
  const [isAdmin, setIsAdmin]         = useState(false);
  const [isUser, setIsUser]           = useState(false);
  const [loginBtn, setLoginBtn]       = useState('Login');

  useEffect(() => {
    if(isAdmin || isUser) setLoginBtn('Logout');
  })

  function HomeScreenWithProps() {
    return (
      <HomeScreen isAdmin={isAdmin} isUser={isUser} setIsAdmin={setIsAdmin} setIsUser={setIsUser} />
    )
  }

  function LoginWithProps() {
    return (
      <LoginScreen  isAdmin={isAdmin} isUser={isUser} setIsAdmin={setIsAdmin} setIsUser={setIsUser} />
    )
  }
  return (
    <NavigationContainer>
        <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
        {/* { (isAdmin || isUser) && <Drawer.Screen name="Home" component={HomeScreenWithProps} /> } */}
        <Drawer.Screen name="Home" component={HomeScreenWithProps} />
        {/* { (isAdmin) && <Drawer.Screen name="Users" component={Users} /> } */}
        <Drawer.Screen name="Users" component={Users} /> 
        <Drawer.Screen name={loginBtn} component={LoginWithProps}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    margin: "1%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
