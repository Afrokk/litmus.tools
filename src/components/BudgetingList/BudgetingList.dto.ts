interface BudgetItem {
  fieldName: string;
  fieldType?: string;
};

interface UserBudgetItems extends BudgetItem {
  value: string; 
}

interface PresetBudgetItems extends BudgetItem {
  value: number;
}

export type { BudgetItem, UserBudgetItems, PresetBudgetItems };
