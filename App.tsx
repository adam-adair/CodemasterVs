/* eslint-disable react/no-unstable-nested-components */
import 'expo-dev-client';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme as NavDefaultTheme,
  DarkTheme as NavDarkTheme,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { LogBox } from 'react-native';
import {
  Provider as StoreProvider,
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Provider as PaperProvider,
  useTheme,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Portal,
  Modal,
} from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AdMobBanner } from 'expo-ads-admob';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import store from './store';
import { loadLocalProfile } from './store/reducers/profile';
import {
  SoloContainer,
  ProfileContainer,
  ContactsContainer,
  ReceivedContainer,
} from './screens';
import { RootState, RootTabParamList } from './types/frontend';
import { adUnitID } from './constants';
import { loadLocalFriends } from './store/reducers/friends';
import { loadLocalGames } from './store/reducers/games';
import Tutorial from './components/Tutorial';
import styles from './styles';
import { setTutorialVisible } from './store/reducers/tutorialVisible';

LogBox.ignoreLogs(['Setting a timer', 'AsyncStorage has']);

const Tab = createBottomTabNavigator<RootTabParamList>();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function NavigationWrapper() {
  const tutorialVisible = useSelector(
    (state: RootState) => state.tutorialVisible
  );

  const dispatch = useDispatch();
  const theme = useTheme();
  const themedStyles = styles(theme);

  const navigationTheme = theme.dark
    ? {
        ...NavDarkTheme,
        ...theme,
        colors: {
          ...NavDarkTheme.colors,
          ...theme.colors,
        },
      }
    : {
        ...NavDefaultTheme,
        ...theme,
        colors: {
          ...NavDefaultTheme.colors,
          ...theme.colors,
        },
      };
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    async function requestTrackingPermissions() {
      try {
        await requestTrackingPermissionsAsync();
      } catch (error) {
        console.log(`tracking error: ${error}`);
      }
    }
    requestTrackingPermissions();
  }, []);

  React.useEffect(() => {
    const loadTutorial = async () => {
      const jsonValue = await AsyncStorage.getItem('@tutorial');
      const tutorial = jsonValue ? JSON.parse(jsonValue) : { finished: false };
      if (!tutorial.finished) dispatch(setTutorialVisible(true));
      setIsReady(true);
    };

    loadTutorial();
    dispatch(loadLocalProfile());
    dispatch(loadLocalFriends());
    dispatch(loadLocalGames());
  }, [dispatch]);

  if (!isReady) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName: React.ComponentProps<typeof Ionicons>['name'] =
              'alert-circle';
            if (route.name === 'SoloContainer') iconName = 'md-grid';
            if (route.name === 'ReceivedContainer') iconName = 'list';
            if (route.name === 'ProfileContainer') iconName = 'person';
            if (route.name === 'ContactsContainer') iconName = 'people';
            return (
              <Ionicons
                size={24}
                name={iconName}
                color={focused ? theme.colors.primary : theme.colors.disabled}
              />
            );
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.disabled,
          keyboardHandlingEnabled: false,
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="SoloContainer"
          component={SoloContainer}
          options={{ title: 'Solo' }}
        />
        <Tab.Screen
          name="ReceivedContainer"
          component={ReceivedContainer}
          options={{ title: 'Received' }}
        />
        <Tab.Screen
          name="ContactsContainer"
          component={ContactsContainer}
          options={{ title: 'Contacts' }}
        />
        <Tab.Screen
          name="ProfileContainer"
          component={ProfileContainer}
          options={{ title: 'Profile' }}
        />
      </Tab.Navigator>
      <Portal>
        <Modal
          visible={tutorialVisible}
          onDismiss={() => dispatch(setTutorialVisible(false))}
          contentContainerStyle={themedStyles.modalContainer}
        >
          <Tutorial />
        </Modal>
      </Portal>
    </NavigationContainer>
  );
}

function PaperWrapper() {
  const profile = useSelector((state: RootState) => state.profile);
  const theme = profile.darkTheme ? PaperDarkTheme : PaperDefaultTheme;
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID={adUnitID}
          servePersonalizedAds
        />
        <NavigationWrapper />
      </SafeAreaView>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <StoreProvider store={store}>
      <RootSiblingParent>
        <SafeAreaProvider>
          <PaperWrapper />
        </SafeAreaProvider>
      </RootSiblingParent>
    </StoreProvider>
  );
}
