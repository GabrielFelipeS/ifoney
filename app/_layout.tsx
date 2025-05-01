import { router, Stack } from "expo-router";
import React, { createContext, useState, useContext, useEffect } from 'react';
import User from "./types/user.type";
import Expense from "./types/expense.type";
import Category from "./types/category.type";
import { Alert } from "react-native";
import Goal from "./types/goal.type";
import firestoreService from './services/FirestoreService'
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "./factory/firebase";
import { ExpenseWithCategory } from "./types/expense-category.type";

export const UserContext = createContext<{ users: User[]; addUser: (newUser: User) => void } | undefined>(undefined);

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const LoggedInContext = createContext<{ 
    user: User | undefined; logar: (loggedIn: User) => void, 
    expenses: ExpenseWithCategory[], addExpense: (expense: Expense) => void, removeExpense: (id: string) => void ,
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
  const [goal, setGoal] = useState<Goal>()
  const [users, setUsers] = useState<User[]>([]); 
  const [expenses, setExpenses] = useState<ExpenseWithCategory[]>([]); 

  const [user, login] = useState<User>(); 
  const [categories, setCategories] = useState<Category[]>([]); 

  useEffect(() => {
    if(!user?.id) return 

    reloadCategories().catch(err => console.log(err))
  }, [user])

  useEffect(() => {
    if(!user?.id) return 

    reloadExpense().catch(err => console.log(err))
  }, [categories])
  
  const logar = (user: User) => {
    login(user)
  }

  const reloadCategories = async () => {
    const categoriesRef = collection(firestore, 'tbCategories')

    const categoriesQuery = query(
      categoriesRef,
      where('userId', '==', user?.id ?? ''),     
    );
  
    const categoriesSnapshot = await getDocs(categoriesQuery);

    if(categoriesSnapshot.empty) return

    const categories = categoriesSnapshot.docs.map(doc => ({     
      ...doc.data() as Category,  
      id: doc.id,  
    }))
    
    setCategories(categories )
  }

  const reloadExpense = async () => {
    const expensesRef = collection(firestore, 'tbExpenses')

    const expensesQuery = query(
      expensesRef,
      where('userId', '==', user?.id ?? ''),     
    );

    const expensesSnapshot = await getDocs(expensesQuery);
    
    if(expensesSnapshot.empty) return

    const categoriesMap = new Map(
      categories.map(cat => [cat.id, cat])
    );

    const expensesDocs: ExpenseWithCategory[] = expensesSnapshot.docs.map(doc => {
      const data = doc.data() as Expense;

      return {
        id: doc.id,
        name: data.name,
        amount: data.amount,
        date: data.date,
        categoryId: data.categoryId,
        userId: data.userId,
        category: categoriesMap.get(data.categoryId)!,
      };
    })

    setExpenses(expensesDocs)
  }


  const addUser = async (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);

    await firestoreService.insert('tbUsers', newUser).catch(err => console.log(err))
  };


  const addExpense = async (newExpense: Expense) => {
    const expenseToSave = {
      ...newExpense,
      userId: user?.id
    }

    const saveExpense = await firestoreService.insert('tbExpenses', expenseToSave)

    reloadExpense()
  };

  const removeExpense = async (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))

    await firestoreService.delete('tbExpenses', id).catch(err => console.log(err))
  };

  const addCategories = async (newCategory: Category) => {
    const categoryToSave = {
      ...newCategory,
      userId: user?.id
    }

    setCategories((prevCategories) => [...prevCategories, categoryToSave]);

   await firestoreService.insert('tbCategories', categoryToSave).catch(err => {
      console.log(err)
      alert('Ocorreu um erro ao salvar o arquivo')
      removeCategory(newCategory.id)
    })
  };

  const removeCategory = async (id: string) => {
    if(expenses.filter((expense) => expense.categoryId == id).length != 0) {
      Alert.alert("Erro", "Existe uma despesa cadastrada com essa categoria");
      return;
    }

    setCategories(categories.filter((category) => category.id !== id))

    await firestoreService.delete('tbCategories', id).catch(err => {
      console.log(err)
      reloadCategories()
    })
  };

  const editedCategory = async (categoryToEdit: Category | null, editedCategoryName: string) => {
    if(categoryToEdit == null) return;

    setCategories(
      categories.map((category) =>
        category.id === categoryToEdit?.id ? { ...category, name: editedCategoryName } : category
      )
    )

    await firestoreService.update('tbCategories', categoryToEdit.id,  { ...categoryToEdit, name: editedCategoryName })
    .catch(err => {
      console.log(err)
      reloadCategories()
    })
  }

  return (
    <UserContext.Provider value={{ users, addUser}}>
      <LoggedInContext.Provider value={{ 
            user, logar, 
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
