const roleButtons = document.querySelectorAll('.role-btn');
let selectedRole = 'farmer';

roleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    roleButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedRole = btn.dataset.role;
  });
});

const registerForm = document.getElementById('registerForm');
const errorMsg = document.getElementById('errorMsg');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  errorMsg.textContent = '';

  const name = document.getElementById('name').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const location = document.getElementById('location').value.trim();
  const password = document.getElementById('password').value;

  if (!name || !mobile || !location || !password) {
    errorMsg.textContent = 'Please fill in all fields.';
    return;
  }
  if (!/^\d{10}$/.test(mobile)) {
    errorMsg.textContent = 'Enter a valid 10-digit mobile number.';
    return;
  }

  // TEMPORARY mock — replace with real API call once backend exists
  console.log('Register:', { name, mobile, location, password, role: selectedRole });

  localStorage.setItem('agrilink_role', selectedRole);
  localStorage.setItem('agrilink_user', name);
  window.location.href = 'index.html'; // send back to login after "registering"
});