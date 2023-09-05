export type App = {
  user: User;
  budgets: Budget[];
  pools: Pool[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: number;
  currentIds: {
    budget: string;
    moneyGroup: string;
  };
};

export type Budget = {
  id: string;
  name: string;
  createdAt: number;
};

export type Pool = {
  id: string;
  type: PoolType;
  createdAt: number;
  totalAmountInPool: number;
  money: Money[];

  // This option will allow adding money to the pool that cannot be immediately named.
  // However, when named money is added to the pool, the amount is subtracted from here.
  // When there's no moneyWithoutName, new money will just be added to the pool.
  moneyWithoutName: {
    name: "others" | string;
    totalAmount: number;
  };
};

export type Money = {
  id: string;
  name: string;
  type: PoolType;
  createdAt: number;
  totalAmount: number;
  breakdown: MoneyBreakdown[];
};

type MoneyBreakdown = {
  amount: number;
  createdAt: number;
  name?: string; // if no name is provided, use Money.name
  description?: string;
};

export type PoolType = "income" | "expense";
