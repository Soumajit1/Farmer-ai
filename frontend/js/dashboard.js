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

  // --- Dynamic Notifications Dropdown ---
  const topbarActions = document.querySelector('.topbar-actions');
  if (topbarActions) {
      // Find the button that looks like a bell/notifications
      const btns = topbarActions.querySelectorAll('button');
      let notifBtn = null;
      btns.forEach(b => {
          if (b.textContent.includes('Notifications') || b.innerHTML.includes('bell')) {
              notifBtn = b;
          }
      });

      if (notifBtn) {
          const dropdown = document.createElement('div');
          dropdown.className = 'notifications-dropdown';
          dropdown.innerHTML = `
              <div style="padding: 12px 16px; border-bottom: 1px solid #eee; font-weight: 600;">Notifications</div>
              <div class="notif-item">
                  <div style="font-weight: 500;">New Action Required</div>
                  <div style="font-size: 12px; color: var(--text-muted);">Please review the latest system updates.</div>
              </div>
              <div class="notif-item">
                  <div style="font-weight: 500;">Logistics Update</div>
                  <div style="font-size: 12px; color: var(--text-muted);">A shipment status was recently updated.</div>
              </div>
              <div style="padding: 12px; text-align: center; color: var(--color-primary); cursor: pointer; font-size: 13px;" onclick="window.showToast('All caught up!', 'success')">Mark all as read</div>
          `;
          
          topbarActions.style.position = 'relative'; // Ensure dropdown positions correctly
          topbarActions.appendChild(dropdown);
          
          notifBtn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              dropdown.classList.toggle('show');
          });
          
          document.addEventListener('click', (e) => {
              if (!dropdown.contains(e.target)) {
                  dropdown.classList.remove('show');
              }
          });
      }
  }

  // --- Interactive Mock Actions for Tables & Cards ---
  document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn || btn.type === 'submit' || btn.classList.contains('nav-item')) return;
      if (btn.closest('.notifications-dropdown')) return; // handled above

      const btnText = btn.textContent.trim().toLowerCase();

      // Action: Accept / Approve
      if (btnText === 'accept' || btnText === 'approve') {
          e.preventDefault();
          const row = btn.closest('tr');
          if (row) {
              row.style.background = 'rgba(0, 191, 165, 0.1)';
              btn.parentElement.innerHTML = '<span class="badge badge-success">Approved</span>';
              showToast('Request approved successfully!', 'success');
          }
      }
      // Action: Reject / Suspend / Remove
      else if (btnText === 'reject' || btnText === 'suspend' || btnText === 'remove') {
          e.preventDefault();
          const container = btn.closest('tr') || btn.closest('.card-3d');
          if (container) {
              container.style.opacity = '0.5';
              container.style.pointerEvents = 'none';
              showToast(`Action '${btnText}' executed successfully.`, 'warning');
          }
      }
      // Action: Download
      else if (btnText.includes('download') || btnText.includes('export')) {
          e.preventDefault();
          showToast('Generating document... Download will start shortly.', 'info');
      }
      // Action: Add / Edit
      else if (btnText.includes('add') || btnText.includes('edit')) {
          e.preventDefault();
          showToast('Opening form editor...', 'info');
      }
      // Generic fallback (only if no onclick is present)
      else if (!btn.id && !btn.getAttribute('onclick')) {
          e.preventDefault();
          // We don't want to show generic toasts for the notification bell itself
          if (!btn.innerHTML.includes('bell')) {
              showToast('Action triggered successfully. (Mock)', 'success');
          }
      }
  });

  // Handle Profile Dropdown / Topbar Actions
  const userProfile = document.querySelector('.user-profile');
  if (userProfile) {
    userProfile.addEventListener('click', () => {
      showToast('Profile settings will be available in the next phase.', 'info');
    });
  }
});
