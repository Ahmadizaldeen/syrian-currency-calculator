import { useState } from "react";
import "./App.css"; // يمكنك إضافة CSS كما في النسخة القديمة

const oldCurrency = [100, 200, 500, 1000, 2000, 5000];
const newCurrency = [1, 5, 10, 25, 50, 100, 200, 500, 1000];

function CurrencyRow({ value, type, count, onCountChange }) {
  const oldAmount = type === "old" ? count * value : count * value * 100;
  const newAmount = oldAmount / 100;

  return (
    <div className="row">
      <span>{value}</span>
      <input
        type="number"
        min="0"
        value={count}
        onChange={(e) => onCountChange(value, type, Number(e.target.value))}
      />
      <span>{oldAmount} قديمة</span>
      <span>{newAmount} جديدة</span>
    </div>
  );
}

function App() {
  const [counts, setCounts] = useState({}); // لتخزين كل الفئات

  const handleCountChange = (value, type, newCount) => {
    setCounts((prev) => ({
      ...prev,
      [`${type}-${value}`]: newCount,
    }));
  };

  let totalOld = 0;
  Object.entries(counts).forEach(([key, count]) => {
    const [type, value] = key.split("-");
    const v = Number(value);
    totalOld += type === "old" ? count * v : count * v * 100;
  });

  return (
    <div className="App">
      <h1>حاسبة الليرة السورية</h1>

      <div className="total">
        <div>المجموع الكلي:</div>
        <div>{totalOld} ليرة قديمة</div>
        <div>{totalOld / 100} ليرة جديدة</div>
      </div>

      <h2>الليرة القديمة</h2>
      {oldCurrency.map((v) => (
        <CurrencyRow
          key={`old-${v}`}
          value={v}
          type="old"
          count={counts[`old-${v}`] || 0}
          onCountChange={handleCountChange}
        />
      ))}

      <h2>الليرة الجديدة</h2>
      {newCurrency.map((v) => (
        <CurrencyRow
          key={`new-${v}`}
          value={v}
          type="new"
          count={counts[`new-${v}`] || 0}
          onCountChange={handleCountChange}
        />
      ))}
    </div>
  );
}

export default App;
