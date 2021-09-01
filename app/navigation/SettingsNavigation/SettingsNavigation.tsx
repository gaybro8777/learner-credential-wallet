import React from 'react';
import { View, Image, Linking } from 'react-native';
import { Header, Text, Button, ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import walletImage from '../../assets/wallet.png';
import mixins from '../../styles/mixins';
import theme from '../../styles/theme';
import styles from './SettingsNavigation.styles';
import mockCredential from '../../mock/credential';
import { lock, reset, addCredential } from '../../store/slices/wallet';
import { NavHeader } from '../../components';
import {
  SettingsItemProps,
  SettingsProps,
  RestoreProps,
  BackupProps,
  AboutProps,
} from '../';

const Stack = createStackNavigator();

function SettingsItem({ title, onPress }: SettingsItemProps): JSX.Element {
  return (
    <ListItem
      containerStyle={styles.listItemContainer}
      onPress={onPress}
    >
      <ListItem.Content>
        <ListItem.Title style={styles.listItemTitle}>
          {title}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}

function Settings({ navigation }: SettingsProps): JSX.Element {
  const dispatch = useDispatch();

  return (
    <>
      <Header
        centerComponent={{ text: 'Settings', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      <View style={styles.settingsContainer}>
        <SettingsItem title="Restore" onPress={() => navigation.navigate('Restore')} />
        <SettingsItem title="Backup" onPress={() => navigation.navigate('Backup')} />
        <SettingsItem title="About" onPress={() => navigation.navigate('About')} />
        <SettingsItem title="Sign out" onPress={() => dispatch(lock())} />
        <SettingsItem
          title="Add credential (dev)"
          onPress={() => dispatch(addCredential(mockCredential))}
        />
        <SettingsItem
          title="Reset wallet (dev)"
          onPress={async () => dispatch(reset())}
        />
      </View>
    </>
  );
}

function Restore({ navigation: { goBack } }: RestoreProps): JSX.Element {
  return (
    <>
      <NavHeader goBack={goBack} title="Restore" />
      <View style={styles.bodyContainer}>
        <Text style={styles.paragraph}>Select a wallet file (.extension) from your device to restore from.</Text>
        <Button
          title="Choose a file"
          buttonStyle={mixins.buttonIcon}
          titleStyle={mixins.buttonIconTitle}
          iconRight
          icon={
            <MaterialIcons
              name="upload-file"
              size={theme.iconSize}
              color={theme.color.iconInactive}
            />
          }
        />
      </View>
    </>
  );
}

function Backup({ navigation }: BackupProps): JSX.Element {
  return (
    <>
      <NavHeader goBack={() => navigation.navigate('Settings')} title="Backup" />
      <View style={styles.bodyContainer}>
        <Text style={styles.paragraph}>This will export your wallet contents into a file for you to download.</Text>
        <Button
          title="Backup my wallet"
          buttonStyle={mixins.buttonIcon}
          titleStyle={mixins.buttonIconTitle}
          iconRight
          icon={
            <MaterialIcons
              name="file-download"
              size={theme.iconSize}
              color={theme.color.iconInactive}
            />
          }
        />
      </View>
    </>
  );
}

function About({ navigation }: AboutProps): JSX.Element {
  return (
    <>
      <NavHeader goBack={() => navigation.navigate('Settings')} title="About" />
      <View style={styles.bodyContainer}>
        <Image style={styles.image} source={walletImage} />
        <Text style={styles.paragraph}>EDU Wallet</Text>
        <Text style={styles.paragraph}>
          This mobile wallet was developed by the Digital Credentials Consortium, a network of leading international universities designing an open infrastructure for academic credentials.
        </Text>
        <Text style={styles.paragraph}>
            More information at <Text style={styles.link} onPress={() => Linking.openURL('https://digitalcredentials.mit.edu')} >https://digitalcredentials.mit.edu</Text>.
        </Text>
        <Text style={styles.paragraph}>
          Copyright 2021 Massachusetts Institute of Technology
        </Text>
      </View>
    </>
  );
}

export default function SettingsNavigation(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Settings"
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Restore" component={Restore} />
      <Stack.Screen name="Backup" component={Backup} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}