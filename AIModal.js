import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, Image, Keyboard, ScrollView } from 'react-native';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiAPI } from '../../secret';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const AIModal = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;  // Don't send if the message is empty
    setMessages(prev => [...prev, { id: Date.now().toString(), text: newMessage, sender: 'You' }]);
    setNewMessage('');
    setLoading(true);
    Keyboard.dismiss(); // Dismiss the keyboard when sending a message

    try {
      const genAI = new GoogleGenerativeAI(geminiAPI);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(`
        Imagine you are an AI assistant named Gemini, dedicated to supporting users of the Book_Chili app. Book_Chili is a platform that specializes in providing personalized book recommendations based on users' interests, reading habits, and favorite genres. 
        Your role is to engage with users in a friendly, knowledgeable, and helpful manner.
        You will help users discover new books, provide summaries, reviews, ratings, and more in Vietnamese.`);
      
      setMessages(prev => [...prev, { id: Date.now().toString(), text: result.response.text(), sender: 'AI' }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), text: 'Error: Unable to process your request.', sender: 'AI' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/Logo.png')}
            style={styles.logo} 
          />
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="close" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.chatArea }>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          style={styles.chatBox}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.sender === 'You' ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={loading}
          style={[styles.button, loading ? styles.buttonDisabled : null]}
        >
          <Text style={styles.buttonText}>{loading ? '...' : 'Send'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AIModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center', 
  },
  logo: {
    width: 140,
    height: 70,
    zIndex:10000,
    resizeMode:'cover'
  },
  closeButton: {
    padding: 5,
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  chatBox: {
    flex: 1,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    marginRight: 10,
    backgroundColor: '#f8f9fa',
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#007BFF',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#ADD8E6', 
    borderColor: '#FFD700', 
    borderWidth: 1,
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
  },
});