import express from "express";
import { z } from "zod";
import { getZodError } from "src/utilities/getZodError.js";

const router = express.Router();

const budgets: { id: number; name: string }[] = [];

router.get("/api/budgets", (req, res) => {
  res.send(budgets);
});

router.get("/api/budgets/:id", (req, res) => {
  res.send({ name: "budget", id: req.params.id });
});

router.post("/api/budgets", (req, res) => {
  const { error } = validateBudget(req.body);
  if (error) return res.status(400).send(getZodError(error));

  const budget = {
    id: budgets.length + 1,
    name: req.body.name,
  };
  budgets.push(budget);
  res.send(budget);
});

router.put("/api/budgets/:id", (req, res) => {
  const budget = budgets.find((b) => b.id === +req.params.id);
  if (!budget)
    return res.status(404).send("The budget with the given ID was not found.");

  const { error } = validateBudget(req.body);
  if (error) return res.status(400).send(getZodError(error));

  budget.name = req.body.name;
  res.send(budget);
});

router.delete("/api/budgets/:id", (req, res) => {
  const budget = budgets.find((b) => b.id === +req.params.id);
  if (!budget)
    return res.status(404).send("The budget with the given ID was not found.");

  const index = budgets.indexOf(budget);
  budgets.splice(index, 1);

  res.send(budget);
});

function validateBudget(budget: any) {
  const Schema = z.object({ name: z.string().min(3) });
  const result = Schema.safeParse(budget);

  const data = result.success ? result.data : null;
  const error = !result.success ? result.error : null;

  return { data, error };
}

export default router;
