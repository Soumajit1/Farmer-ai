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
  const dashboardContainer = document.querySelector('.dashboard-container');
  
  let overviewContent = null;
  if(dashboardContainer) {
      overviewContent = dashboardContainer.innerHTML;
  }

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
      
      if(tabName.includes('Overview') || tabName === 'Marketplace' || tabName === 'Platform Overview' || tabName === 'FPO Overview') {
          // Restore original content
          dashboardContainer.innerHTML = overviewContent;
          lucide.createIcons({ root: dashboardContainer });
          
          // If there's a chart, we need to re-initialize it because destroying innerHTML destroys the canvas context
          // For a mock, a simple reload is easier to reset charts, but since it's a SPA mock, we will just show a toast
          showToast(`Switched back to ${tabName}`, 'success');
          
          // Reload page to re-render charts cleanly for the mock
          if(window.Chart) {
             window.location.reload(); 
          }
      } else {
          // Show placeholder for unbuilt modules
          dashboardContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; color: var(--text-muted); text-align: center;" class="fade-in">
                <i data-lucide="hammer" style="width: 48px; height: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                <h2 style="font-family: 'Outfit', sans-serif; color: var(--text-main); margin-bottom: 8px;">${tabName}</h2>
                <p>This module is currently under development for the next phase.</p>
                <button class="btn-secondary" style="margin-top: 24px;" onclick="window.location.reload()">Back to Overview</button>
            </div>
          `;
          lucide.createIcons({ root: dashboardContainer });
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
