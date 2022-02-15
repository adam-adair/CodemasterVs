import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { TProfile, TGame } from './shared';

export type TPeg = {
  pegSize: number;
  colorIndex: number;
  empty: boolean;
};

export type TFriend = {
  uid: string;
  userName: string;
  email: string;
};

export interface RootState {
  profile: TProfile;
  friends: TFriend[];
  games: TGame[];
  tutorialVisible: boolean;
  profileLoading: boolean;
  adCounter: number;
}

// navigation types

export type RootTabParamList = {
  SoloContainer: undefined;
  SoloGame: { game: TGame };
  SoloBuild: undefined;
  ReceivedContainer: undefined;
  ReceivedList: undefined;
  ContactsContainer: undefined;
  ContactsList: undefined;
  ContactsBuildCode: { friend: TFriend };
  ProfileContainer: undefined;
  Profile: undefined;
  ProfileRegister: undefined;
  ProfileForgot: undefined;
  ReceivedGame: { game: TGame };
};

export type SoloContainerProps = BottomTabScreenProps<
  RootTabParamList,
  'SoloContainer'
>;
export type SoloBuildProps = BottomTabScreenProps<
  RootTabParamList,
  'SoloBuild'
>;

export type SoloGameProps = BottomTabScreenProps<RootTabParamList, 'SoloGame'>;

export type ContactsContainerProps = BottomTabScreenProps<
  RootTabParamList,
  'ContactsContainer'
>;
export type ReceivedListProps = BottomTabScreenProps<
  RootTabParamList,
  'ReceivedList'
>;
export type ProfileContainerProps = BottomTabScreenProps<
  RootTabParamList,
  'ProfileContainer'
>;

export type ProfileRegisterProps = NativeStackScreenProps<
  RootTabParamList,
  'ProfileRegister'
>;
export type ProfileProps = NativeStackScreenProps<RootTabParamList, 'Profile'>;

export type ProfileForgotProps = NativeStackScreenProps<
  RootTabParamList,
  'ProfileForgot'
>;

export type ContactsBuildCodeProps = NativeStackScreenProps<
  RootTabParamList,
  'ContactsBuildCode'
>;

export type ReceivedGameProps = NativeStackScreenProps<
  RootTabParamList,
  'ReceivedGame'
>;

export type NavigationProp = NativeStackNavigationProp<RootTabParamList>;
