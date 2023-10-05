// The Plan for this App.

type Budget = {
  id: string
  name: string
  incomes: Income[]
  expenses: Expense[]
  debts: Debt[]
  createdAt: DateType // - date it was created
  updatedAt: DateType // - date an update was made, such as name update, or any other update.
}

type Income = {
  id: string
  name: string
  currency: Currency // - Eg USDT Currency
  amount: number // 1000
  trades: Trade[]
}

type Currency = {
  name: string //  example, USDT Tether
  symbol: CurrencySymbol
  code: CurrencyCode
}

type CurrencySymbol = "$"

type CurrencyCode = "USDT" | "USD"

type Trade = {
  // this amount is the base currency of an income.
  amountTraded: number

  // The amount received after trading
  amountReceived: number

  // The Currency inwhich we received the tradedAmount
  currency: Currency

  /**
   * This will determine how I divide to get the rate.
   * By default, divide amountReceived / amountTrade (Received/Traded)
   *
   * If order is Traded/Received, then we divide amountTraded / amountReceived
   *
   * We divide in one order or another to get the rate.
   */
  rateOrder?: "Received/Traded" | "Traded/Received" // default is "Received/Traded"

  /**
   * Computed automatically by dividing in rateOrder
   * Eg. let amountReceived = 500000, amountTraded = 500
   * 500000/500 = 1000;
   * => rate = 1 USDT ~ 1000 NGN
   */
  rate: string // format = 1 USDT ~ 1000 NGN

  createdAt: DateType

  /**
   * This is optional and it's debatable whether it's needed or not.
   * I haven't thought of a use case for it.
   */
  type?: "Sell" | "Buy"
}

type DateType = number

type Expense = {}

type Debt = {}

const income: Income = {
  id: "",
  amount: 1000,
  currency: { code: "USDT", name: "Tether USDT", symbol: "$" },
  name: "Salary",
  trades: [],
}
