// --- Role selection ---
const roleButtons = document.querySelectorAll('.role-btn');
let selectedRole = 'farmer';

roleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    roleButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedRole = btn.dataset.role;
    
    // Add a slight pop animation when selecting a role
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 150);
  });
});

// --- Login form handling ---
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');
const submitBtn = loginForm.querySelector('button[type="submit"]');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMsg.textContent = '';
  errorMsg.style.opacity = '0';
  
  const identifier = document.getElementById('identifier').value.trim();
  const password = document.getElementById('password').value;

  if (!identifier || !password) {
    showError('Please fill in all fields.');
    return;
  }

  // Visual feedback for loading state
  const originalBtnContent = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Signing In...';
  submitBtn.style.opacity = '0.8';
  submitBtn.disabled = true;

  // TEMPORARY: mock login delay
  setTimeout(() => {
    const mockUsers = {
      farmer: { redirect: 'dashboard-farmer.html' },
      buyer: { redirect: 'dashboard-buyer.html' },
      fpo: { redirect: 'dashboard-fpo.html' }
    };

    console.log('Login attempt:', { identifier, password, role: selectedRole });

    // Simulate success and redirect based on role
    localStorage.setItem('agrilink_role', selectedRole);
    localStorage.setItem('agrilink_user', identifier);
    window.location.href = mockUsers[selectedRole].redirect;
  }, 800);
});

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.style.transition = 'opacity 0.3s ease';
  errorMsg.style.opacity = '1';
}