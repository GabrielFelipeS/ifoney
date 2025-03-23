import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { loggedIn } from "./_layout";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const HomeScreen = () => {
    const router = useRouter();

  // Simulando despesas recentes (mock)
  const { expenses } = loggedIn()

  const amount = expenses.filter(expenses => expenses.date.getMonth() == new Date().getMonth()).map(expense => expense.amount).reduce((prevAmount, curAmount) => prevAmount + curAmount, 0)
  return (
    <View style={styles.container}>
      {/* Saudações */}
      <Text style={styles.greeting}>Olá, Gabriel! 👋</Text>

      {/* Resumo financeiro */}
      <TouchableOpacity onPress={() => router.push("/dashboard")}>
       <LinearGradient style={styles.balanceContainer}
          colors={['#a8eb12', '#00bf72', '#003A52']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }}   
        >
         <View>
          <Text style={styles.balanceLabel}>Gasto total no mês</Text>
          <Text style={styles.balanceValue}>
          {amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </Text>
         </View>
         <View style={styles.IconBalanceContainer}>
          <AntDesign style={styles.IconBalance} name="barschart" size={24} color="black" />
         </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Botões de ação */}
      <View style={styles.actionsContainer}>
        <LinearGradient style={styles.button}
          colors={["#a8eb12", "#00bf72", "#003A52"]} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }} 
          locations={[0.1, 0.8, 0.9]} 
        >
          <TouchableOpacity onPress={() => router.push("/add_expenses")}>
            <Text style={styles.buttonText}>+ Adicionar Despesa</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient style={styles.button}
          colors={["#003A52","#00bf72","#a8eb12" ]} 
          start={{ x: 0, y: 1 }} 
          end={{ x: 0, y: 0 }}   
          locations={[0.1, 0.5, 0.9]} 
        >
          <TouchableOpacity onPress={() => router.push("/add_category")}>
            <Text style={styles.buttonText}>Gerenciar Categorias</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient style={styles.button}
         colors={["#a8eb12", "#00bf72", "#003A52"]} 
         start={{ x: 1, y: 0 }} 
         end={{ x: 0, y: 1 }} 
         locations={[0.1, 0.8, 0.9]} 
        >
          <TouchableOpacity onPress={() => router.push("/add_goals")}>
            <Text style={styles.buttonText}>Definir Metas</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Últimas despesas */}
      <Text style={styles.sectionTitle}>Últimas Despesas</Text>
      <FlatList
        data={expenses.slice(0,5)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}
         >
            <Text style={styles.expenseName}>{item.name}</Text>
            <Text style={styles.expenseAmount}>R$ {item.amount.toFixed(2)}</Text>
            <Text style={styles.expenseCategory}>{item.category.name}</Text>
            </View>
        )}
      />

        <LinearGradient style={styles.actionsContainer}
          colors={['#a8eb12', '#00bf72', '#003A52']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }}   
          locations={[0.1, 0.1, 0.2]} 
        >
        <TouchableOpacity style={styles.button} onPress={() => router.push("/list_expenses")}>
          <Text style={styles.buttonText}>Ver mais gastos</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  greeting: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  balanceContainer: {  flexDirection: 'row', backgroundColor: "#34C759", padding: 15, borderRadius: 10, marginBottom: 20 },
  IconBalanceContainer: {  flex: 1, justifyContent: 'center', alignItems: 'flex-end'},
  IconBalance: { color: '#fff',  padding: 15},
  balanceLabel: { color: "#fff", fontSize: 16 },
  balanceValue: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  actionsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  button: { padding: 10,borderRadius: 8, alignItems: "center", flex: 1, marginHorizontal: 5 },
  buttonText: { color: "#fff", fontWeight: "bold",  textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  expenseItem: { backgroundColor: "#FFF", padding: 10, borderRadius: 8, marginBottom: 5 },
  expenseName: { fontSize: 16, color: "#555",fontWeight: "bold" },
  expenseAmount: { fontSize: 14, color: "#D32F2F" },
  expenseCategory: { fontSize: 12, color: "#666" },
});

export default HomeScreen;
