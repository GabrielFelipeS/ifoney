import Category from "./category.type";

export default interface Expense {
    id: string;
    name: string;
    amount: number;
    categoryId: string;
    date: Date;
    userId?: string;
  }