export type BudgetCategory = 'food' | 'transport' | 'hotel' | 'activity' | 'other';

export interface BudgetItem {
  id: string;
  trip_id: string;
  category: BudgetCategory;
  label: string;
  planned_amount: number;
  actual_amount: number;
  date: string | null;
  created_at: string;
  updated_at?: string;
}

export interface BudgetSummary {
  total_planned: number;
  total_actual: number;
  by_category: Record<BudgetCategory, { planned: number; actual: number }>;
  items: BudgetItem[];
}

export interface CreateBudgetItemDto {
  category: BudgetCategory;
  label: string;
  planned_amount: number;
  actual_amount?: number;
  date?: string;
}

export interface UpdateBudgetItemDto extends Partial<CreateBudgetItemDto> {}
