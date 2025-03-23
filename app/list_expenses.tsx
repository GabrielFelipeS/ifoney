import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Expense from "./types/expense.type";
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { loggedIn } from "./_layout";

export default function ListExpenses() {
 const router = useRouter();
 const { expenses, removeExpense } = loggedIn();

const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

const handleDelete = (id: string) => {
  Alert.alert(
    "Excluir Despesa",
    "Tem certeza que deseja excluir essa despesa?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => removeExpense(id),
      },
    ]
  );
};

const handleAddExpense = () => {
  router.push("/add_expenses")
};

const renderExpenseItem = ({ item }: { item: Expense }) => (
  <View style={styles.expenseItem}>
   <View>
    <Text style={styles.expenseName}>{item.name}</Text>
    <Text style={styles.expenseAmount}>R$ {item.amount.toFixed(2)}</Text>
    <Text style={styles.expenseCategory}>{item.category.name}</Text>
   </View>
    <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
      <FontAwesome name="trash" size={24} color="red" />
    </TouchableOpacity>
  </View>
);

return (
  <View style={styles.container}>
    <Text style={styles.title}>Gastos</Text>
    
    <Text style={styles.totalLabel}>Total gasto:</Text>
    <Text style={styles.totalAmount}>R$ {totalSpent.toFixed(2)}</Text>
    
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />

    <LinearGradient
      colors={['#a8eb12', '#00bf72']} 
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 1 }}   
      locations={[0.1, 0.9]} 
      style={styles.addButton}
    >
      <TouchableOpacity onPress={handleAddExpense}>
        <Text style={styles.addButtonText}>+ Adicionar Despesa</Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
);
};

const styles = StyleSheet.create({
container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
totalLabel: { fontSize: 18, marginVertical: 10 },
totalAmount: { fontSize: 22, fontWeight: "bold", color: "#34C759" },
expenseItem: {
  flexDirection: 'row',
  justifyContent: "space-between",
  backgroundColor: "#FFF",
  padding: 15,
  borderRadius: 8,
  marginBottom: 10,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 3,
},
expenseName: { fontSize: 16, fontWeight: "bold" },
expenseAmount: { fontSize: 14, color: "#D32F2F" },
expenseCategory: { fontSize: 12, color: "#666" },
deleteButton: { marginTop: 10, padding: 8, borderRadius: 5 },
deleteButtonText: { color: "#FFF", fontWeight: "bold" },
addButton: {
  backgroundColor: "#007AFF",
  padding: 15,
  borderRadius: 50,
  position: "absolute",
  bottom: 20,
  right: 20,
  elevation: 5,
},
addButtonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});

