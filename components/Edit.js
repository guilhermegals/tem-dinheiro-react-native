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

export default function Edit(props) {

    // Item a ser editado
    const oldRecord = props.location.state;

    // Definição das propriedades Hooks
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('1');
    const [quantity, setQuantity] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const history = useHistory();

    useEffect(() => {
        // Verifica se o elemento atual existe, caso não existe o usuário é redirecionado para a Home
        if(oldRecord) {
            setTitle(oldRecord.title);
            setDate(oldRecord.date);
            setType(oldRecord.type);
            setQuantity(oldRecord.quantity);
        }
        else history.push('/');
    }, [])

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

    // Função para remover um registro
    const removeRecord = async () => {
        // Obtenção da coleção atual
        const result = await AsyncStorage.getItem('records');
        const records = JSON.parse(result) || [];

        // Remoção do registro atual da coleção
        const newRecords = records.filter((r) => r.id !== oldRecord.id);

        // Atualização do array no banco de dados
        await AsyncStorage.setItem('records', JSON.stringify(newRecords));

        // Volta para home
        history.push("/");
    }

    const updateRecord = async () => {
        // Verificação se não existe campo vazio
        if (!title || !date || !type || !quantity) return;

        // Obtenção da coleção atual
        const result = await AsyncStorage.getItem('records');
        const records = JSON.parse(result) || [];

        // Remove o registro atual da coleção
        const newRecords = records.filter((r) => r.id !== oldRecord.id);

        // Adição do registro na lista
        newRecords.push({
            id: oldRecord.id,
            title: title,
            date: date,
            type: type,
            quantity: quantity
        });

        // Atualização do array no banco de dados
        await AsyncStorage.setItem('records', JSON.stringify(newRecords));

        // Volta para home
        history.push("/");
    }

    return (
        <SafeAreaView>
            <Text style={[styles.h1, { margin: 12 }]}>
                Editar Registro
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
            <TouchableOpacity onPress={updateRecord}>
                <View style={[styles.button, styles.primary, { marginTop: 24 }]} >
                    <Text style={{ color: "white" }}>
                        EDITAR
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={removeRecord}>
                <View style={[styles.button, styles.danger, { marginTop: 24 }]} >
                    <Text style={{ color: "white" }}>
                        DELETAR
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
