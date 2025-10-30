const { GoogleGenerativeAI } = require("@google/generative-ai");
const Expense = require("../models/Expense");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getFinancialAdvice = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    const expenseData = expenses.map(e => `Category: ${e.category}, Amount: ${e.amount}, Date: ${e.date}`).join('\n');

    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = `Based on the following spending patterns, provide some financial advice:\n${expenseData}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    res.json({ advice: text });
  } catch (error) {
    console.error("Error getting financial advice:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getFinancialAdvice };
