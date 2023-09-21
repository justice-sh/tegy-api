# tegy-api-v2

# Tegy: a simple budget tracking application

![img](https://alltogether.swe.org/wp-content/uploads/2021/09/budget_header.jpg)

## About

    Tegy: the simple budget tracker

    Tegy keeps record of the incomes and
    expenses of your budget in batches, though
    you can use only one batch, the default batch, if you like. That's it.

    You can use Tegy as your rough record, later, write it down in your
    book; or use it as your main budget recorder. Either way, with Tegy,
    you'll never have a messy record.

    And you can have multiple budgets with the same account.

    So, what are you waiting for? Do you want to have a clean budget
    record?

## Features

    1. Add budget items
    2. Delete budget items
    3. Create batches
    4. Create budgets
    5. Switch between batches
    6. Switch between budgets
    7. Edit batch
    8. Edit budget

### Batch

    A Batch consist of the following:

    1. Start date: the date the batch was created
    2. End date: the date the batch ended
    3. Incomes: all the money that came in
    4. Expenses: all the money that went out

    You can have as many batches as you want, or have only one batch, the default batch that was created when you signed-up.

### Default Behavior of a Batch

    By default
    1. a batch ends the day another batch is created.
    2. When a new batch is created, all of the contents of the old batch, are copied to the new batch, except for their amounts.

    This default behavior can be changed in settings.

### Income & Expense = BudgetItem

    Incomes and Expenses are both considered as BudgetItems.

    A BudgetItem consist of the following:

    1. Description: a short description of what the money is for
    2. Amount: the amount of money that was spent or received
    3. Type: whether the item is an income or an expense

### Setting

    You can edit or change the name and dates of a batch in settings.

<!-- [LINK TO SITE](https://tegy.netlify.app) -->
