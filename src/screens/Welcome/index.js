import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import LottieView from 'lottie-react-native';
import {setSignIn, setUser, selectUser} from '../../redux/slices/authSlice';
import {useDispatch, useSelector} from 'react-redux';

const Welcome = ({navigation}) => {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [username, setUsername] = useState(user);
  const loggedIn = () => {
    dispatch(setSignIn(true));
    dispatch(setUser(username));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboards}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.lottie}>
            <LottieView
              source={require('../../img/116271-meditation-work-stress-relief.json')}
              autoPlay
              loop
              resizeMode="contain"
            />
          </View>
          <View style={styles.box}>
            <View style={styles.welcome}>
              <Text style={{fontSize: 26, marginBottom: 10}}>WELCOME</Text>
              <Text style={{fontSize: 9}}>Do Meditation, Stay Focused.</Text>
              <Text style={{fontSize: 12}}>Live a healhy life.</Text>
            </View>
            <TextInput
              placeholder="Your Name"
              placeholderTextColor={'lightgrey'}
              onBlur={() => {
                setIsFocused(false);
                Keyboard.dismiss();
              }}
              onFocus={() => setIsFocused(true)}
              style={[
                styles.input,
                isFocused && {borderWidth: 1, borderColor: 'black'},
              ]}
              onChangeText={newText => setUsername(newText)}
              value={username}
              caretHidden
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                loggedIn(username);
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Welcome;
