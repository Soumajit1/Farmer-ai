// --- Role selection ---
const roleButtons = document.querySelectorAll('.role-btn');
let selectedRole = 'farmer';

roleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    roleButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedRole = btn.dataset.role;
  });
});

// --- Login form handling ---
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMsg.textContent = '';

  const identifier = document.getElementById('identifier').value.trim();
  const password = document.getElementById('password').value;

  if (!identifier || !password) {
    errorMsg.textContent = 'Please fill in all fields.';
    return;
  }

  // TEMPORARY: mock login until backend API is built.
  // Once your backend (Step 2/3 below) is ready, replace this block
  // with a real fetch() call to your login endpoint.
  const mockUsers = {
    farmer: { redirect: 'dashboard-farmer.html' },
    buyer: { redirect: 'dashboard-buyer.html' },
    fpo: { redirect: 'dashboard-fpo.html' },
    admin: { redirect: 'dashboard-admin.html' }
  };

  console.log('Login attempt:', { identifier, password, role: selectedRole });

  // Simulate success and redirect based on role
  localStorage.setItem('agrilink_role', selectedRole);
  localStorage.setItem('agrilink_user', identifier);
  window.location.href = mockUsers[selectedRole].redirect;
});