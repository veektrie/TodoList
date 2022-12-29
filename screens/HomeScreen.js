import React, { useState, useRef } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Task } from '../components/Task';
import { Paystack, paystackProps } from 'react-native-paystack-webview';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };
  
  const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
      paddingTop: 80,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    items: {
      marginTop: 30,
    },
    writeTaskWrapper: {
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    paystack: {
      minWidth: "60%",
      backgroundColor: "#F9A826",
      padding: 10,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
    }
    
  });


 

  return (
    
      
    <View style={styles.container}>
      <View style={{ marginHorizontal: 15 }}>
        <Paystack
          paystackKey="pk_test_b725890ff35fd46f490c15b359788623a8596d2d"
          paystackSecretKey="sk_test_9d049d7f113a0e8968cabc9e88d379b95f00f30e"
          billingEmail="adugbovictory@gmail.com"
          amount={10000}
          billingName="Adugbo Victory"
          billingMobile="000000000"
          currency="NGN"
          onCancel={(e) => {
            console.log(e);
          }}
          onSuccess={(res) => {
            console.log(e);
          }}
          ref={paystackWebViewRef}
        />

      </View>
      
     



      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
  
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => paystackWebViewRef.current.startTransaction()}
          style={styles.addWrapper}
        >
          <View>
            <Text style={styles.paystack}>Pay</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
    
  );
}
