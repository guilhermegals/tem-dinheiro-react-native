import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, Text, View, ScrollView } from 'react-native';
import styles from "./Styles";
import Header from "./components/Header";
import Home from "./components/Home";
import Add from "./components/Add";
import Edit from "./components/Edit";
import { NativeRouter, Route, Link } from "react-router-native";

export default function App() {
  return (
    <NativeRouter>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.app}>
        <Header />
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Route exact path="/" render={() => (
              <Home />
            )} />
            <Route path="/add" component={Add} />
            <Route path="/edit" component={Edit} />
          </ScrollView>
        </SafeAreaView>
        <StatusBar style="light" />
      </KeyboardAvoidingView>
    </NativeRouter>
  );
}
