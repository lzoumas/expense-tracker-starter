import { useState } from 'react'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedDescription = description.trim();
    const parsedAmount = parseFloat(amount);
    if (!trimmedDescription || !parsedAmount || parsedAmount <= 0) return;

    onAdd({
      id: crypto.randomUUID(),
      description: trimmedDescription,
      amount: parsedAmount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          aria-label="Description"
          placeholder="Description"
          required
          pattern=".*\S+.*"
          title="Description cannot be blank"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          aria-label="Amount"
          placeholder="Amount"
          required
          min="0.01"
          step="any"
          title="Amount must be greater than zero"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select aria-label="Transaction type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm;
