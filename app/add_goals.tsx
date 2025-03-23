import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal, Alert, Button } from "react-native";
import Goal from "./types/goal.type";
import DateTimePicker from '@react-native-community/datetimepicker'
import { LinearGradient } from "expo-linear-gradient";

export default function AddGoals() {
  const [goals, setGoals] = useState<Goal[]>([{
    id: "1",
    name: "string",
    amount: 2,
    dueDate: "2025-03-21",
  }]);
  
  const [newGoalName, setNewGoalName] = useState<string>("");
  const [newGoalAmount, setNewGoalAmount] = useState<number>(0);
  const [newGoalDueDate, setNewGoalDueDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState<Goal | null>(null);

  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  
  const handleAddGoal = () => {
    if (!newGoalName || newGoalAmount <= 0) {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
      return;
    }

    const newGoal: Goal = {
      id: (Math.random() * 1000).toString(),
      name: newGoalName,
      amount: newGoalAmount,
      dueDate: newGoalDueDate.toISOString(),
    };

    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setNewGoalName("");
    setNewGoalAmount(0);
    setShowDatePicker(false);
  };

  const handleEditGoal = (goal: Goal) => {
    setGoalToEdit(goal);
    setNewGoalName(goal.name);
    setNewGoalAmount(goal.amount);
    setNewGoalDueDate(new Date(goal.dueDate));
    setEditModalVisible(true);
  };

  const handleSaveGoalEdit = () => {
    if (!newGoalName || newGoalAmount <= 0) {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
      return;
    }

    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === goalToEdit?.id
          ? { ...goal, name: newGoalName, amount: newGoalAmount, dueDate: newGoalDueDate.toISOString() }
          : goal
      )
    );
    setEditModalVisible(false);
  };

  const handleDeleteGoal = (id: string) => {
    Alert.alert("Excluir Meta", "Você tem certeza que deseja excluir esta meta?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => {
          setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
        },
      },
    ]);
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Definir Metas</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Meta"
        value={newGoalName}
        onChangeText={setNewGoalName}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={newGoalAmount.toString()}
        onChangeText={(text) => setNewGoalAmount(Number(text))}
      />

      <TouchableOpacity style={styles.dateButton} onPress={() => setShow(true)}>
        <Text style={styles.dateButtonText}>
          {date.toLocaleDateString("pt-BR") || "Selecione a Data"}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <LinearGradient
        colors={['#a8eb12', '#00bf72']} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }}   
        locations={[0.1, 0.9]} 
        style={styles.addButton}
      >
        <TouchableOpacity onPress={handleAddGoal}>
          <Text style={styles.addButtonText}>Adicionar Meta</Text>
        </TouchableOpacity>
      </LinearGradient>
      {/* Lista de Metas */}
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text style={styles.goalText}>{item.name}</Text>
            <Text style={styles.goalText}>
              {item.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </Text>
            <Text style={styles.goalText}>{new Date(item.dueDate).toLocaleDateString("pt-BR")}</Text>

            <TouchableOpacity onPress={() => handleEditGoal(item)}>
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDeleteGoal(item.id)}>
              <Text style={styles.deleteButton}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal de Edição de Meta */}
      {editModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Editar Meta</Text>

              <TextInput
                style={styles.input}
                placeholder="Nome da Meta"
                value={newGoalName}
                onChangeText={setNewGoalName}
              />

              <TextInput
                style={styles.input}
                placeholder="Valor"
                keyboardType="numeric"
                value={newGoalAmount.toString()}
                onChangeText={(text) => setNewGoalAmount(Number(text))}
              />

              <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.dateButtonText}>
                  {newGoalDueDate.toLocaleDateString() || "Selecione a Data de Vencimento"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={handleSaveGoalEdit}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
    borderColor: "#CCC",
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  dateButton: {
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    borderColor: "#CCC",
    borderWidth: 1,
  },
  dateButtonText: { fontSize: 16 },
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    borderColor: "#CCC",
    borderWidth: 1,
  },
  goalText: { fontSize: 16 },
  editButton: { color: "#007AFF", fontSize: 14 },
  deleteButton: { color: "red", fontSize: 14 },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#FFF", fontSize: 16 },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#dc3545",
  },
  cancelButtonText: { color: "#FFF", fontSize: 16 },
});
