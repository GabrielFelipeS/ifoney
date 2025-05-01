import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import Expense from "./types/expense.type";
import { LinearGradient } from "expo-linear-gradient";
import { loggedIn } from "./_layout";
import Category from "./types/category.type";

export default function AddExpenses() {
  const router = useRouter();
  const { categories, addExpense } = loggedIn()


  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [idCategory, setIdCategory] = useState<string>("1");

  const [open, setOpen] = useState(false);
  
  const [items, setItems] = useState(categories.map(category => { 
    const item: ItemType<string> = {label: category.name, value: category.id}
    return item
  }));
  
  const handleSaveExpense = () => {
    if (!name || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
      return;
    }

    const newExpense: Expense = {
      id: Math.random().toString(),
      name,
      amount: parseFloat(amount),
      categoryId: categories.filter(category => category.id == idCategory)[0].id,   
      date: new Date()   
    };

    addExpense(newExpense)
    
    console.log("Despesa salva:", newExpense);

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Despesa</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da despesa"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Categoria</Text>
      <DropDownPicker
        open={open}
        value={idCategory}
        items={items}
        setOpen={setOpen}
        setValue={setIdCategory}
        setItems={setItems}
        placeholder="Escolha a categoria"
        style={styles.picker}

      />

      <TouchableOpacity onPress={handleSaveExpense}>
        <LinearGradient
          colors={['#a8eb12', '#00bf72']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }}   
          locations={[0.1, 0.9]} 
          style={styles.saveButton}
        >
        
          <Text style={styles.saveButtonText}>Salvar Despesa</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5", justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    borderColor: "#CCC",
    borderWidth: 1,
  },
  label: { fontSize: 16, marginTop: 15, marginBottom: 5 },
  picker: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    fontSize: 16,
    padding: 10,
    marginBottom: 20,
  },
  dropDown: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 50,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});
