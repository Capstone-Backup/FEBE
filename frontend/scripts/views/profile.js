import { renderSidebar, setupSidebarNavigation, setupBackToDashboard } from './sidebar.js';

export function renderProfileView() {
  const profileData = JSON.parse(localStorage.getItem("profileData")) || {};

  document.getElementById("app").innerHTML = `
    <div class="dashboard-container">
      ${renderSidebar("Profil")} <!-- Menggunakan sidebar yang terpisah -->
      <main class="dashboard-main">
        <header class="profile-header">
          <button class="back-btn" id="backDashboard">←</button>
          <h2>Profile</h2>
          <button id="editBtn" class="edit-btn"><i class="fas fa-pen"></i></button>
        </header>

        <section class="profile-section">
          <div class="profile-item"><i class="fas fa-user"></i> ${profileData.name || "Manusia"}</div>
          <div class="profile-item"><i class="fas fa-birthday-cake"></i> ${profileData.age ? profileData.age + " tahun" : "0 tahun"}</div>
          <div class="profile-item"><i class="fas fa-venus-mars"></i> ${profileData.gender || "Tidak Diketahui"}</div>
          <div class="profile-item"><i class="fas fa-envelope"></i> ${profileData.email || "Email address"}</div>
          <div class="profile-item"><i class="fas fa-phone"></i> ${profileData.phone || "+62 000000000"}</div>
          <div class="profile-item"><i class="fas fa-lock"></i> Password</div>
        </section>
      </main>
    </div>
  `;

  // Event listener untuk tombol edit
  document.getElementById("editBtn").addEventListener("click", renderEditProfileView);

  setupSidebarNavigation();
  setupBackToDashboard("backDashboard");
}

export function renderEditProfileView() {
  const profileData = JSON.parse(localStorage.getItem("profileData")) || {};

  document.getElementById("app").innerHTML = `
    <div class="dashboard-container">
      ${renderSidebar("Profil")} <!-- Menggunakan sidebar yang terpisah -->
      <main class="dashboard-main">
        <header class="profile-header">
          <button class="back-btn" id="backBtn">←</button>
          <h2>Edit Profile</h2>
        </header>

        <section class="profile-section">
          <div class="profile-item"><i class="fas fa-user"></i><input type="text" value="${profileData.name || ''}" placeholder="Full Name"></div>
          <div class="profile-item"><i class="fas fa-birthday-cake"></i><input type="number" value="${profileData.age || 0}" placeholder="Age" min="0"></div>
          <div class="profile-item">
            <i class="fas fa-venus-mars"></i>
            <select id="genderInput">
              <option value="male" ${profileData.gender === 'male' ? 'selected' : ''}>Male</option>
              <option value="female" ${profileData.gender === 'female' ? 'selected' : ''}>Female</option>
            </select>
          </div>
          <div class="profile-item"><i class="fas fa-envelope"></i><input type="email" value="${profileData.email || ''}" placeholder="Email"></div>
          <div class="profile-item"><i class="fas fa-phone"></i><input type="tel" value="${profileData.phone || ''}" placeholder="Phone"></div>
          <div class="profile-item"><i class="fas fa-lock"></i><input type="password" placeholder="Password (leave empty to keep current)"></div>
          <button id="saveProfileBtn" class="save-btn">Simpan Perubahan</button>
        </section>
      </main>
    </div>
  `;

  // Event listener untuk menyimpan perubahan
  document.getElementById("saveProfileBtn").addEventListener("click", () => {
    const updatedProfile = {
      name: document.querySelector('input[type="text"]').value,
      age: document.querySelector('input[type="number"]').value,
      gender: document.getElementById("genderInput").value,
      email: document.querySelector('input[type="email"]').value,
      phone: document.querySelector('input[type="tel"]').value,
      password: document.querySelector('input[type="password"]').value // Password bisa diabaikan jika tidak diubah
    };

    localStorage.setItem("profileData", JSON.stringify(updatedProfile));
    alert("Perubahan berhasil disimpan!");
    renderProfileView(); // Kembali ke tampilan profil
  });

  // Event listener untuk tombol kembali
  document.getElementById("backBtn").addEventListener("click", () => {
    renderProfileView();
  });

  setupSidebarNavigation();
}