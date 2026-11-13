// CARSTAIR Pro — Trading Journal

const trades = [
  {
    id: 1,
    symbol: "US100",
    side: "Long",
    pnl: 67.36,
    r: 0.67,
    grade: "A",
    setup: "Killzone Sweep",
    emotions: "patient, focused, disciplined",
    date: "2026-11-12",
    invested: 10072.04,
    position: 10139.40
  },
  {
    id: 2,
    symbol: "NQ",
    side: "Long",
    pnl: 189.50,
    r: 1.8,
    grade: "A+",
    setup: "Opening Drive",
    emotions: "confident, calm",
    date: "2026-11-11"
  },
  {
    id: 3,
    symbol: "US100",
    side: "Short",
    pnl: -42.10,
    r: -0.9,
    grade: "B",
    setup: "Break & Retest",
    emotions: "hesitant",
    date: "2026-11-11"
  },
  {
    id: 4,
    symbol: "MNQ",
    side: "Long",
    pnl: 112.00,
    r: 1.4,
    grade: "A",
    setup: "Manipulation",
    emotions: "patient, disciplined",
    date: "2026-11-10"
  },
  {
    id: 5,
    symbol: "US100",
    side: "Long",
    pnl: 78.25,
    r: 1.1,
    grade: "A",
    setup: "Killzone Sweep",
    emotions: "focused",
    date: "2026-11-10"
  },
  {
    id: 6,
    symbol: "NQ",
    side: "Short",
    pnl: -28.00,
    r: -0.6,
    grade: "C",
    setup: "FOMO entry",
    emotions: "impatient, FOMO",
    date: "2026-11-07"
  }
];

// ---------- Views ----------
document.querySelectorAll(".nav-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    btn.classList.add("active");
    const view = document.getElementById(`view-${btn.dataset.view}`);
    if (view) view.classList.add("active");
  });
});

// ---------- Liquid Glass Toggle ----------
const glassToggle = document.getElementById("glassToggle");
const savedGlass = localStorage.getItem("carstair-liquid-glass") === "true";

if (savedGlass) {
  document.body.classList.add("liquid-glass");
}

glassToggle.addEventListener("click", () => {
  document.body.classList.toggle("liquid-glass");
  const isOn = document.body.classList.contains("liquid-glass");
  localStorage.setItem("carstair-liquid-glass", isOn);
});

// ---------- Render Trades ----------
function renderRecentTrades() {
  const container = document.getElementById("recentTrades");
  if (!container) return;

  container.innerHTML = trades
    .slice(0, 6)
    .map(
      (t) => `
    <div class="trade-card glassable">
      <div class="trade-card-top">
        <div>
          <div class="trade-symbol">${t.symbol}</div>
          <div class="trade-side">${t.side}</div>
        </div>
        <div class="trade-grade ${t.grade === "A+" ? "aplus" : "a"}">${t.grade}</div>
      </div>
      <div class="trade-pnl ${t.pnl >= 0 ? "positive" : "negative"}">
        ${t.pnl >= 0 ? "+" : ""}$${Math.abs(t.pnl).toFixed(2)}
      </div>
      <div class="trade-details">
        <span>${t.r}R</span>
        <span>${t.setup}</span>
        <span>${t.date}</span>
      </div>
    </div>
  `
    )
    .join("");
}

function renderJournal() {
  const container = document.getElementById("journalList");
  if (!container) return;

  container.innerHTML = trades
    .map(
      (t) => `
    <div class="journal-item glassable">
      <div>
        <div class="j-symbol">${t.symbol}</div>
        <div class="j-side">${t.side}</div>
      </div>
      <div>
        <div class="j-setup">${t.setup}</div>
        <div class="j-emotions">${t.emotions || ""}</div>
      </div>
      <div class="j-pnl ${t.pnl >= 0 ? "positive" : "negative"}">
        ${t.pnl >= 0 ? "+" : ""}$${Math.abs(t.pnl).toFixed(2)}
      </div>
      <div class="j-grade">${t.grade}</div>
    </div>
  `
    )
    .join("");
}

// ---------- Modal ----------
const modal = document.getElementById("tradeModal");
const addBtn = document.getElementById("addTradeBtn");
const cancelBtn = document.getElementById("cancelTrade");
const form = document.getElementById("tradeForm");

if (addBtn) {
  addBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });
}

if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}

document.querySelector(".modal-backdrop")?.addEventListener("click", () => {
  modal.classList.add("hidden");
});

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const newTrade = {
      id: Date.now(),
      symbol: data.get("symbol"),
      side: data.get("side"),
      pnl: parseFloat(data.get("pnl")),
      r: parseFloat(data.get("r")) || 0,
      grade: data.get("grade"),
      setup: data.get("setup") || "Manual",
      emotions: data.get("emotions") || "",
      date: new Date().toISOString().slice(0, 10)
    };
    trades.unshift(newTrade);
    renderRecentTrades();
    renderJournal();
    modal.classList.add("hidden");
    form.reset();
  });
}

// Init
renderRecentTrades();
renderJournal();
