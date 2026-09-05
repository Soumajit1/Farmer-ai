document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.form-step');
  const indicators = document.querySelectorAll('.step-indicator');
  const nextBtns = document.querySelectorAll('.btn-next');
  const prevBtns = document.querySelectorAll('.btn-prev');
  const roleOptions = document.querySelectorAll('.role-option');
  const registerForm = document.getElementById('registerForm');
  const errorMsg = document.getElementById('errorMsg');
  const dynamicFields = document.getElementById('dynamic-fields');

  let currentStep = 1;
  let selectedRole = 'farmer';

  // Role Selection
  roleOptions.forEach(option => {
    option.addEventListener('click', () => {
      roleOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      selectedRole = option.dataset.role;
      updateDynamicFields();
    });
  });

  function updateDynamicFields() {
    dynamicFields.innerHTML = ''; // clear
    if (selectedRole === 'farmer') {
      dynamicFields.innerHTML = `
        <div class="input-group">
          <label>Primary Crop (Optional)</label>
          <input type="text" id="crop" placeholder="e.g. Wheat, Rice">
        </div>
      `;
    } else if (selectedRole === 'buyer') {
      dynamicFields.innerHTML = `
        <div class="input-group">
          <label>Company/Business Name</label>
          <input type="text" id="company" placeholder="e.g. Fresh Foods Ltd">
        </div>
      `;
    } else if (selectedRole === 'fpo') {
      dynamicFields.innerHTML = `
        <div class="input-group">
          <label>Number of Farmers</label>
          <input type="number" id="farmersCount" placeholder="e.g. 50">
        </div>
      `;
    }
  }
  
  // Init
  updateDynamicFields();

  // Navigation Logic
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        if (currentStep < 4) {
          currentStep++;
          updateUI();
          if (currentStep === 4) populateSummary();
        }
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateUI();
      }
    });
  });

  function validateStep(step) {
    // Basic validation
    if (step === 2) {
      const name = document.getElementById('name').value.trim();
      const mobile = document.getElementById('mobile').value.trim();
      const password = document.getElementById('password').value;
      if (!name || !mobile || !password) {
        alert("Please fill in all fields.");
        return false;
      }
      if (!/^\d{10}$/.test(mobile)) {
        alert("Enter a valid 10-digit mobile number.");
        return false;
      }
    }
    if (step === 3) {
      const location = document.getElementById('location').value.trim();
      if (!location) {
        alert("Location is required.");
        return false;
      }
    }
    return true;
  }

  function updateUI() {
    // Update Steps
    steps.forEach((step, idx) => {
      if (idx + 1 === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // Update Indicators
    indicators.forEach((indicator, idx) => {
      indicator.classList.remove('active', 'completed');
      if (idx + 1 === currentStep) {
        indicator.classList.add('active');
      } else if (idx + 1 < currentStep) {
        indicator.classList.add('completed');
        indicator.innerHTML = '✓';
      } else {
        indicator.innerHTML = idx + 1;
      }
    });
  }

  function populateSummary() {
    document.getElementById('summary-role').textContent = selectedRole;
    document.getElementById('summary-name').textContent = document.getElementById('name').value;
    document.getElementById('summary-mobile').textContent = document.getElementById('mobile').value;
  }

  // Form Submission
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsg.textContent = '';
    
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    submitBtn.innerHTML = 'Creating Account...';
    submitBtn.disabled = true;

    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;

    // Simulate API call
    setTimeout(() => {
      console.log('Registered successfully:', { role: selectedRole, name, mobile });
      localStorage.setItem('agrilink_role', selectedRole);
      localStorage.setItem('agrilink_user', name);
      window.location.href = 'index.html'; // Redirect to login
    }, 1000);
  });
});