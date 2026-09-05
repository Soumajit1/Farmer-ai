document.addEventListener('DOMContentLoaded', () => {
  // --- Toast Notification System ---
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'info';
    if (type === 'success') icon = 'check-circle';
    if (type === 'warning') icon = 'alert-triangle';
    
    toast.innerHTML = `<i data-lucide="${icon}" style="color: var(--color-primary);"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    lucide.createIcons({ root: toast });

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if(toast.parentNode === toastContainer) {
          toastContainer.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  window.showToast = showToast;

  // --- Dynamic Tab Switching for Dashboard Navigation ---
  const navItems = document.querySelectorAll('.nav-item');
  const pageTitle = document.querySelector('.page-title');
  const allPanes = document.querySelectorAll('.tab-pane');

  navItems.forEach(link => {
    // Skip logout link or real links
    if (link.getAttribute('href') !== '#' && !link.classList.contains('nav-item')) return;
    if (link.textContent.trim() === 'Log Out') return;
    
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      navItems.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');
      
      const tabName = link.textContent.trim();
      if(pageTitle) pageTitle.textContent = tabName;
      
      const targetId = 'tab-' + tabName.toLowerCase().replace(/\s+/g, '-');
      
      let found = false;
      allPanes.forEach(pane => {
        if(pane.id === targetId) {
            pane.classList.add('active');
            found = true;
        } else {
            pane.classList.remove('active');
        }
      });
      
      // Re-init icons in case the pane was hidden
      lucide.createIcons();
      
      // If no matching tab-pane is found, fall back to "Under Development"
      if (!found && document.getElementById('tab-under-dev')) {
          allPanes.forEach(p => p.classList.remove('active'));
          const devPane = document.getElementById('tab-under-dev');
          devPane.classList.add('active');
          document.getElementById('dev-title').textContent = tabName;
      }
    });
  });

  // Handle all generic buttons not in the sidebar
  document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('button:not([type="submit"]):not(.nav-item)');
      if (btn && !btn.id && !btn.getAttribute('onclick')) {
          e.preventDefault();
          showToast('Action triggered successfully. (Mock)', 'success');
      }
  });

  // Handle Profile Dropdown / Topbar Actions
  const userProfile = document.querySelector('.user-profile');
  if (userProfile) {
    userProfile.addEventListener('click', () => {
      showToast('Profile dropdown opened. (Mock)', 'info');
    });
  }
});
