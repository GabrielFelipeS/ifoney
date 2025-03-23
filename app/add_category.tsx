import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Modal } from "react-native";
import Category from "./types/category.type";
import { LinearGradient } from "expo-linear-gradient";
import { loggedIn } from "./_layout";

export default function AddCategory() {
  const { categories, addCategories, removeCategory, editedCategory } = loggedIn();

  const [newCategory, setNewCategory] = useState<string>("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState<string>("");

  const handleAddCategory = () => {
    if (!newCategory) {
      Alert.alert("Erro", "Por favor, digite o nome da categoria.");
      return;
    }

    const newCategoryObj: Category = {
      id: (categories.length + 1).toString(), 
      name: newCategory,
    };

    addCategories(newCategoryObj)
    setNewCategory("");
  };

  const handleDeleteCategory = (id: string) => {
    Alert.alert("Excluir Categoria", "Você tem certeza que deseja excluir esta categoria?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => {
         removeCategory(id)
        },
      },
    ]);
  };

  const handleEditCategory = (category: Category) => {
    setCategoryToEdit(category);
    setEditedCategoryName(category.name);
    setEditModalVisible(true);
  };

  const handleSaveEditedCategory = () => {
    if (!editedCategoryName) {
      Alert.alert("Erro", "O nome da categoria não pode ser vazio.");
      return;
    }

    editedCategory(categoryToEdit, editedCategoryName)

    setEditModalVisible(false); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Categorias</Text>

      <TextInput
        style={styles.input}
        placeholder="Nova Categoria"
        value={newCategory}
        onChangeText={setNewCategory}
      />
      <TouchableOpacity onPress={handleAddCategory}>
        <LinearGradient style={styles.addButton} 
          colors={['#a8eb12', '#00bf72']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }}   
          locations={[0.1, 0.9]} 
        >
          <Text style={styles.addButtonText}>Adicionar Categoria</Text>
        </LinearGradient>
      </TouchableOpacity>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item.name}</Text>

            <TouchableOpacity onPress={() => handleEditCategory(item)}>
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDeleteCategory(item.id)}>
              <Text style={styles.deleteButton}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Categoria</Text>
            <TextInput
              style={styles.input}
              value={editedCategoryName}
              onChangeText={setEditedCategoryName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveEditedCategory}>
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
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  categoryItem: {
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
  categoryText: { fontSize: 16 },
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
    width: 100
  },
  saveButtonText: { color: "#FFF", fontSize: 16 },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#dc3545",
    width: 100
  },
  cancelButtonText: { color: "#FFF", fontSize: 16 },
});
