import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { loggedIn } from "./_layout";
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#00bf72',
  backgroundGradientFrom: '#a8eb12',
  backgroundGradientTo: '#003A52',
  decimalPlaces: 2, 
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 10,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#003A52',
  },
};

const Dashboard = () => {
  const router = useRouter();
  const { categories, expenses } = loggedIn()

  const expensesActualMonth = expenses.filter(expense => expense.date.getMonth() == new Date().getMonth())

  const categorizeECounts = () => {
    const categoryTotals: { [key: string]: number } = {};
  
    expensesActualMonth.forEach(expense => {
      const categoryName = expense.category.name;
      categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + 1;
      categoryTotals["Total"] = (categoryTotals["Total"] || 0) +  categoryTotals[categoryName];
    });

    const total = Object.values(categoryTotals).reduce((acc, amount) => acc + amount, 0);
    categoryTotals["Total"] = total;

    return categoryTotals;
  };

  const categorizeExpenses = () => {
    const categoryTotals: { [key: string]: number } = {};
  
    expensesActualMonth.forEach(expense => {
      const categoryName = expense.category.name;
      categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) +  expense.amount;
    });

    const total = Object.values(categoryTotals).reduce((acc, amount) => acc + amount, 0);
    categoryTotals["Total"] = total;

    return categoryTotals;
  };

  const totalExpensesByCategory = categorizeExpenses();

  const categorizeExpensesData = categorizeECounts();

  const totalExponses =  Object.values(totalExpensesByCategory).reduce((prevValue, currentValue) => prevValue + currentValue, 0)

  const barChartData = {
    labels: Object.keys(totalExpensesByCategory),
    datasets: [
      {
        data: Object.values(totalExpensesByCategory),
        strokeWidth: 2,
      },
    ],
  };

  const barCountCategoriesExpensesChartData = {
    labels: Object.keys(categorizeExpensesData),
    datasets: [
      {
        data: Object.values(categorizeExpensesData)
      },
    ],
  };

  const pieChartData = Object.keys(totalExpensesByCategory).map(category => ({
    name: category,
    population: totalExpensesByCategory[category],
    color: `#${Math.floor(Math.random()*16777215).toString(16)}`, 
    legendFontColor: "#7F7F7F",
    legendFontSize: 15, 
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Dashboard</Text>
       <View style={styles.actionsContainer}>
              <LinearGradient style={styles.button}
               colors={['#a8eb12', '#00bf72', '#003A52']} 
               start={{ x: 0, y: 0 }} 
               end={{ x: 1, y: 1 }}  
              >
              
                  <Text style={styles.buttonText}>Total gasto: { totalExponses }</Text>
              
              </LinearGradient>

              </View>
      <PieChart
        data={pieChartData}
        width={screenWidth - 8}
        height={220}
        style={styles.chars}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
      
      <BarChart
        data={barChartData}
        width={screenWidth - 8}
        height={300}
        style={styles.chars}
        chartConfig={{
          backgroundColor: '#003A52',
          backgroundGradientFrom: '#00bf72',
          backgroundGradientTo: '#a8eb12',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        fromZero={true}
        yAxisLabel="R$" 
        yAxisSuffix=" reais"
        verticalLabelRotation={30}
      />

      <BarChart
        data={barCountCategoriesExpensesChartData}
        width={screenWidth - 8}
        height={300}
        style={styles.chars}
        chartConfig={{
          backgroundColor: '#003A52',
          backgroundGradientFrom: '#00bf72',
          backgroundGradientTo: '#a8eb12',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        fromZero={true}
        yAxisLabel="" 
        yAxisSuffix=""
        verticalLabelRotation={30}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 5, backgroundColor: "#F5F5F5", color: "#34C759" },
  greeting: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  chars: { marginBottom: 15},
  actionsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  button: { padding: 10,borderRadius: 8, alignItems: "center", flex: 1, marginHorizontal: 5 },
  buttonText: { color: "#fff", fontWeight: "bold",  textAlign: 'center' },
});

export default Dashboard;
