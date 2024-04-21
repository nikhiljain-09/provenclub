import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AppContext} from '../store/AppContext';

const Main = () => {
  const {
    isDarkTheme,
    bottomLoading,
    fetchTrendingGifsBySearch,
    getTrendingGifs,
    loading,
    data,
    error,
  } = useContext(AppContext);

  const [inputText, setInputText] = useState('');

  // we can implement debounce here
  function onChangeText(text: string) {
    setInputText(text);
    fetchTrendingGifsBySearch(text);
  }

  function onBottomReached() {
    getTrendingGifs((data?.pagination?.offset ?? 0) + 20);
  }

  if (error) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.centerContainer}>
          <Text
            style={
              isDarkTheme ? styles.errorDarkThemeStyle : styles.errorTextStyle
            }>
            Erorr: {error}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        value={inputText}
        onChangeText={onChangeText}
        placeholder="Search gif"
        style={styles.inputContainer}
      />
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          ListEmptyComponent={() => {
            return <Text>No data found!</Text>;
          }}
          ListFooterComponent={() => {
            if (bottomLoading) {
              return <ActivityIndicator />;
            }
          }}
          onEndReached={onBottomReached}
          data={data?.data}
          keyExtractor={(item, index) => index + item?.id}
          renderItem={({index, item}) => {
            // we can show images also with name using <Image/>
            return (
              <Text>
                {index} {item?.title}
              </Text>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    height: '100%',
  },
  inputContainer: {
    borderWidth: 1,
    margin: 16,
    height: 42,
    borderRadius: 4,
    padding: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  errorTextStyle: {
    color: 'black',
  },
  errorDarkThemeStyle: {
    color: 'white',
  },
});

export default Main;
