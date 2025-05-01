import Category from "./category.type";
import Expense from "./expense.type";

export type ExpenseWithCategory = Expense & { category: Category };