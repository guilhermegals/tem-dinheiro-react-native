import React from "react";
import { Text, View } from "react-native";
import styles from "../Styles";

export default function Header() {
    return (
        <View style={styles.headerBar}>
            <Text style={styles.appName}>Têm dinheiro?</Text>
        </View>
    );
}
