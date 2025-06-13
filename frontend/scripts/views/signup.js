export function renderSignup() {
  document.getElementById("app").innerHTML = `
    <section class="screen">
      <button class="back-btn" id="btn-back" title="Kembali">
        <i class="fas fa-arrow-left"></i>
      </button>
      <div class="logo-group">
        <img src="./assets/logo.png" class="logo-icon" />
      </div>
      <h2>Create an account</h2>
      <p style="font-size:0.9rem; color:#fefefe;">Securely login to your account</p>
      <form id="signup-form" class="form-grid">
        <div class="input-icon"><i class="fas fa-user"></i><input type="text" placeholder="Full Name" required /></div>
        <div class="input-icon"><i class="fas fa-birthday-cake"></i><input type="number" placeholder="Age" required min="0" /></div>
        <div class="input-icon">
          <i class="fas fa-venus-mars"></i>
          <select id="genderInput" required>
            <option value="" disabled selected>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="input-icon"><i class="fas fa-envelope"></i><input type="email" placeholder="Email address" required /></div>
        <div class="input-icon"><i class="fas fa-phone"></i><input type="tel" placeholder="+62  Enter number" required /></div>
        <div class="input-icon">
          <i class="fas fa-lock"></i>
          <input type="password" id="signup-password" placeholder="Password" required />
          <button type="button" class="toggle-password" tabindex="-1">
            <i class="fas fa-eye"></i>
          </button>
        </div>
        <button type="submit" class="btn-primary">Create Account</button>
      </form>
      <small>I Already Have an Account <a href="#" id="link-login">Log in</a></small>
    </section>
  `;

  // Toggle password visibility
  document.querySelector('.toggle-password').addEventListener('click', function () {
    const pwd = document.getElementById('signup-password');
    const icon = this.querySelector('i');
    if (pwd.type === 'password') {
      pwd.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      pwd.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  });

  document.getElementById("link-login").addEventListener("click", (e) => {
    e.preventDefault();
    import('./login.js').then(m => m.renderLogin());
  });

  document.getElementById("btn-back").addEventListener("click", () => {
    import('./opening.js').then(m => m.renderOpening());
  });

  document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.querySelector('input[type="text"]').value;
    const age = document.querySelector('input[type="number"]').value;
    const gender = document.getElementById("genderInput").value;
    const email = document.querySelector('input[type="email"]').value;
    const phone = document.querySelector('input[type="tel"]').value;
    const password = document.querySelector('input[type="password"]').value;

    const userData = {
      nama: fullName,
      umur: age,
      gender: gender,
      email: email,
      no_telepon: phone,
      password: password
    };

    try {
      const response = await fetch("https://apidiaw-production.up.railway.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error("Gagal mendaftar");
      // Jika berhasil, tampilkan halaman sukses
      import('./successSignup.js').then(m => m.renderSuccessSignup());
    } catch (err) {
      alert("Gagal mendaftar: " + err.message);
    }
  });
}
