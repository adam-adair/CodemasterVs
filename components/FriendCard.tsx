/* eslint-disable react/no-unstable-nested-components */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Card, Button, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import { NavigationProp, TFriend } from '../types/frontend';
import { removeFriend } from '../store/reducers/friends';

const size = 24;

export default function FriendCard({ friend }: { friend: TFriend }) {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const themedStyles = styles(theme);
  const dispatch = useDispatch();
  return (
    <Card style={[themedStyles.margin]}>
      <Card.Title
        title={friend.userName}
        subtitle={friend.email}
        right={() => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'flex-end',
              margin: 7,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Ionicons
                name="md-close-circle"
                size={size}
                style={{
                  padding: 7,
                  marginHorizontal: 7,
                }}
                onPress={() => dispatch(removeFriend(friend))}
                color={theme.colors.error}
              />
            </View>
          </View>
        )}
      />
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('ContactsBuildCode', { friend });
          }}
          style={{ width: '100%' }}
        >
          Challenge!
        </Button>
      </Card.Actions>
    </Card>
  );
}
