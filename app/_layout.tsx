import { Stack } from "expo-router";
import React, { createContext, useState, useContext } from 'react';
import User from "./types/user.type";
import Expense from "./types/expense.type";
import Category from "./types/category.type";
import { Alert } from "react-native";
import Goal from "./types/goal.type";

export const UserContext = createContext<{ users: User[]; addUser: (newUser: User) => void } | undefined>(undefined);

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const LoggedInContext = createContext<{ 
    user: User; login: (loggedIn: User) => void, 
    expenses: Expense[], addExpense: (expense: Expense) => void, removeExpense: (id: string) => void ,
    categories: Category[], addCategories: (category: Category) => void , removeCategory: (id: string) => void , editedCategory: (categoryToEdit: Category | null,name: string) => void
    goal: Goal | undefined, setGoal: (goal: Goal) => void
  } | undefined>(undefined);

export const loggedIn = () => {
  const context = useContext(LoggedInContext);
  if (!context) {
    throw new Error('LoggedIn must be used within a UserProvider');
  }
  return context;
};

export default function RootLayout() {
  const defaultUser: User = { name: 'Gabriel', email: "Email@gmail.com", password: '123' };

  const defaultCategories: Category[] = [
    { id: "1", name: "Alimentação" },
    { id: "2", name: "Transporte" },
    { id: "3", name: "Lazer" },
    { id: "4", name: "Saúde" },
    { id: "5", name: "Cursos" },
  ]


  const defaultExpenses: Expense[] = [
    { id: "1", name: "Almoço", amount: 25.0, category: defaultCategories[0], date: new Date() },
    { id: "2", name: "Transporte", amount: 12.5, category: defaultCategories[1], date: new Date() },
    { id: "3", name: "Café", amount: 5.0, category: defaultCategories[2], date: new Date() },
    { id: "5", name: "Sorvete", amount: 4.0, category: defaultCategories[0], date: new Date() },
    { id: "6", name: "Angular 19", amount: 25.0, category: defaultCategories[4], date: new Date()},
  ]


  const [goal, setGoal] = useState<Goal>()
  const [users, setUsers] = useState<User[]>([defaultUser]); 
  const [expenses, setExpenses] = useState<Expense[]>(defaultExpenses); 

  const [user, login] = useState<User>(defaultUser); 
  const [categories, setCategories] = useState<Category[]>(defaultCategories); 

  const addUser = (newUser: any) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const addExpense = (newExpense: Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  };

  const addCategories = (newCategory: Category) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const removeCategory = (id: string) => {
    if(expenses.filter((expense) => expense.category.id == id).length != 0) {
      Alert.alert("Erro", "Existe uma despesa cadastrada com essa categoria");
      return;
    }

    setCategories(categories.filter((category) => category.id !== id))
  };

  const editedCategory = (categoryToEdit: Category | null, editedCategoryName: string) => {
    if(categoryToEdit == null) return;

    setCategories(
      categories.map((category) =>
        category.id === categoryToEdit?.id ? { ...category, name: editedCategoryName } : category
      )
    )

    setExpenses(
      expenses.map((expense: Expense) => 
        expense.category.id === categoryToEdit?.id ? { ...expense, category: {id: categoryToEdit?.id, name: editedCategoryName} } : expense
      )
    )
  }

  return (
    <UserContext.Provider value={{ users, addUser}}>
      <LoggedInContext.Provider value={{ 
            user, login, 
            expenses, addExpense, removeExpense,
            categories, addCategories, removeCategory, editedCategory,
            goal, setGoal
          }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="splash" options={{ headerShown: false }} />
          <Stack.Screen name="add_expenses" options={{ headerShown: false }} />
          <Stack.Screen name="add_category" options={{ headerShown: false }} />
          <Stack.Screen name="add_goals" options={{ headerShown: false }} />
          <Stack.Screen name="list_expenses" options={{ headerShown: false }} />
          <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        </Stack>
      </LoggedInContext.Provider>
    </UserContext.Provider>
  );
}
