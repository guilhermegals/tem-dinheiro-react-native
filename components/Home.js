import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import styles from "../Styles";
import { Link, useHistory } from "react-router-native";

export default function Header() {
    const [records, setRecords] = useState([]);

    // Filtragem de todos os gastos
    const expenses = records.filter(function (record) {
        return record.type == '1';
    });
    // Somatario de todos os gastos
    const totalExpenses = expenses.reduce(function (a, b) {
        return a + parseFloat(b['quantity']);
    }, 0);

    // Filtragem de todos os ganhos
    const incomes = records.filter(function (record) {
        return record.type != '1';
    });
    // Somatario de todos os ganhos
    const totalIncomes = incomes.reduce(function (a, b) {
        return a + parseFloat(b['quantity']);
    }, 0);

    // Calculo do saldo
    const total = totalIncomes - totalExpenses;

    // Atualização dos registros
    const getRecords = async () => {
        const result = await AsyncStorage.getItem('records');

        if (result) {
            var objects = JSON.parse(result).sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            setRecords(objects);
        }
    }

    const history = useHistory();

    useEffect(() => {
        getRecords();
    }, []);

    // Redirecionamento do registro para edição
    const openRecord = (record) => {
        history.push({
            pathname: '/edit',
            state: record
        });
    };

    // Função para obter qual a cor do tipo do registro
    const getColor = (record) => {
        if (record.type === '1') return "lightcoral";
        else return "lightgreen";
    }

    return (
        <SafeAreaView>
            <View style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: 20 }}>
                <Text style={{ color: "black", fontSize: 32 }}>
                    Saldo: R$ {total}
                </Text>
                <Text style={{ color: "lightcoral", fontSize: 32 }}>
                    Gastos: R$ {totalExpenses}
                </Text>
                <Text style={{ color: "lightgreen", fontSize: 32 }}>
                    Ganhos: R$ {totalIncomes}
                </Text>
            </View>


            <Link to="/add">
                <View style={[styles.button, styles.primary]}>
                    <Text style={{ color: "white" }}>
                        ADICIONAR REGISTRO
                    </Text>
                </View>
            </Link>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginTop: 20
                }}
            />
            <View style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: 20 }}>
                {records.length > 0 ? (
                    <>
                        {records
                            .sort((a, b) => {
                                return new Date(b.date) - new Date(a.date);
                            }).map(record => (
                                <TouchableOpacity style={{ width: "100%" }} onPress={() => openRecord(record)}>
                                    <View style={{ backgroundColor: getColor(record), height: 60, display: "flex", flexDirection: "column", alignItems: "center", padding: 20 }} key={record.id}>

                                        <Text>
                                            {record.title} / {record.date} / R$ {record.quantity}
                                        </Text>

                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </>
                ) : (
                    <Text style={{ fontSize: 24 }}>
                        Você não possui registros
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
}
