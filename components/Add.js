import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    Text,
    View,
    TextInput,
    Picker,
    SafeAreaView,
    Button,
    TouchableOpacity,
} from "react-native";
import styles from "../Styles";

export default function Add() {
    // Definição das propriedades Hooks
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('1');
    const [quantity, setQuantity] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const history = useHistory();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date.toISOString().split('T')[0]);
        hideDatePicker();
    };

    // Adição do registro
    const addRecord = async () => {

        // Verificação se não existem campo vazio
        if(!title || !date || !type || !quantity) return;

        // Obtenção da coleção atual
        const result = await AsyncStorage.getItem('records');
        var records = JSON.parse(result) || [];

        // Adição do novo elemento no array
        records.push({
            id: Math.random().toString().replace('0.', ''),
            title: title,
            date: date,
            type: type,
            quantity: quantity
        });

        // Atualização do array no banco de dados
        AsyncStorage.setItem('records', JSON.stringify(records));

        // Volta para home
        history.push("/");
    }

    return (
        <SafeAreaView>
            <Text style={[styles.h1, { margin: 12 }]}>
                Adicionar Registro
            </Text>

            <TextInput
                style={{ height: 48, fontSize: 22, marginBottom: 12 }}
                onChangeText={setTitle}
                value={title}
                placeholder="Título"
            />
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginBottom: 12
                }}
            />
            <View style={{ marginBottom: 12 }}>
                <Button title="Selecionar data" onPress={showDatePicker} />
                <Text style={{ fontSize: 22 }}>{date}</Text>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginBottom: 12
                }}
            />
            <Picker
                style={{ height: 48, fontSize: 22, marginBottom: 12 }}
                selectedValue={type}
                onValueChange={(itemValue, itemIndex) => setType(itemValue)}
            >
                <Picker.Item label="Gasto" value="1" />
                <Picker.Item label="Ganho" value="2" />
            </Picker>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginBottom: 12
                }}
            />
            <TextInput
                style={{ height: 48, fontSize: 22, marginBottom: 12 }}
                onChangeText={setQuantity}
                value={quantity}
                placeholder="Valor"
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={addRecord}>
                <View style={[styles.button, styles.primary, { marginTop: 24 }]} >
                    <Text style={{ color: "white" }}>
                        SALVAR
                    </Text>
                </View>
            </TouchableOpacity>
            <Link to="/">
                <View style={[styles.button, styles.secondary, { marginTop: 24 }]}>
                    <Text style={{ color: "black" }}>
                        VOLTAR
                    </Text>
                </View>
            </Link>
        </SafeAreaView>
    );
}
