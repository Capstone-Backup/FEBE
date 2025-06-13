import { API_BASE_URL } from '../main.js';

export function renderPrediksiView() {
  document.getElementById("app").innerHTML = `
    <div class="dashboard-container">
      <main class="dashboard-main">
        <header class="profile-header">
          <button class="back-btn" id="backDashboard">←</button>
          <h2>Prediksi Diabetes</h2>
        </header>
        <section class="profile-section">
          <label>Gender</label>
          <select id="genderInput">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label>Usia</label>
          <input type="number" id="ageInput" placeholder="Usia" min="0" />
          <label>BMI</label>
          <input type="number" step="0.1" id="bmiInput" placeholder="Contoh: 22.5" />
          <label>HbA1c Level (%)</label>
          <input type="number" step="0.1" id="hba1cInput" placeholder="Contoh: 5.6" />
          <label>Blood Glucose Level (mg/dL)</label>
          <input type="number" step="1" id="glucoseLevelInput" placeholder="Contoh: 110" />
          <label>Riwayat Merokok</label>
          <select id="smokingHistoryInput">
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unknown">Unknown</option>
          </select>
          <button class="predict-btn" id="btnPrediksi">Prediksi</button>

          <div id="predictionResult" style="margin-top: 1rem; font-weight: bold; font-size: 1.1rem;"></div>
        </section>
      </main>
    </div>
  `;

  document.getElementById("btnPrediksi").addEventListener("click", async () => {
    const gender = document.getElementById("genderInput").value;
    const age = parseInt(document.getElementById("ageInput").value);
    const bmi = parseFloat(document.getElementById("bmiInput").value);
    const hba1c = parseFloat(document.getElementById("hba1cInput").value);
    const glucoseLevel = parseFloat(document.getElementById("glucoseLevelInput").value);
    const smokingHistory = document.getElementById("smokingHistoryInput").value;

    const resultBox = document.getElementById("predictionResult");
    resultBox.style.color = "#444";
    resultBox.innerText = "⏳ Memproses prediksi...";

    if (!gender || isNaN(age) || isNaN(bmi) || isNaN(hba1c) || isNaN(glucoseLevel) || !smokingHistory) {
      resultBox.style.color = "#eab308"; // kuning/abu
      resultBox.innerText = "⚠️ Harap lengkapi semua data dengan benar.";
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gender,
          age,
          bmi,
          hba1c_level: hba1c,
          blood_glucose_level: glucoseLevel,
          smoking_history: smokingHistory
        })
      });

      if (!response.ok) throw new Error("Gagal menghubungi server.");

      const data = await response.json();
      const prediction = data.prediction;

      if (prediction === "Negative") {
        resultBox.style.color = "#16a34a"; 
        resultBox.innerText = "✅ Hasil Prediksi: Tidak Terindikasi Diabetes (Negative)";
      } else if (prediction === "Positive") {
        resultBox.style.color = "#dc2626"; 
        resultBox.innerText = "❌ Hasil Prediksi: Terindikasi Diabetes (Positive)";
      } else {
        resultBox.style.color = "#6b7280"; 
        resultBox.innerText = "ℹ️ Hasil tidak dapat ditentukan.";
      }

    } catch (error) {
      resultBox.style.color = "#dc2626"; 
      resultBox.innerText = "❌ Terjadi kesalahan saat memproses prediksi.";
    }
  });

  document.getElementById("backDashboard").addEventListener("click", () => {
    import('./dashboard.js').then(m => m.renderDashboard());
  });
}
