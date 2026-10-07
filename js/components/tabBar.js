// On-Screen Horizontal Tab Bar Component

import { NAV_HIERARCHY } from './sidebar.js';

export const TabBar = {
  render(containerId, activeHash) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const clean = (activeHash || '').replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const modId = parts[0] || 'purchase';
    const subId = parts[1] || 'dashboard';
    const tabId = parts[2] || '';

    const module = NAV_HIERARCHY.find(m => m.id === modId);
    if (!module) return null;

    const submenu = module.submenus.find(s => s.id === subId) || module.submenus[0];
    if (!submenu) return null;

    const currentTabId = tabId || submenu.defaultTab;

    container.innerHTML = `
      <nav aria-label="${submenu.title} tabs navigation" class="mb-4">
        <div 
          role="tablist" 
          aria-label="${submenu.title} views" 
          id="${containerId}-tablist"
          class="flex items-center gap-1.5 overflow-x-auto bg-white p-1.5 rounded-lg border border-[#DFE1E6] shadow-2xs"
        >
          ${submenu.tabs.map(tab => {
            const isActive = tab.id === currentTabId;
            return `
              <a 
                id="tab-${tab.id}"
                role="tab"
                href="${tab.hash}" 
                aria-selected="${isActive ? 'true' : 'false'}"
                tabindex="${isActive ? '0' : '-1'}"
                aria-controls="panel-${tab.id}"
                class="px-3.5 py-1.5 min-h-[32px] text-xs font-semibold rounded-md whitespace-nowrap transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052CC] focus-visible:ring-offset-1 ${isActive ? 'tab-active bg-[#0052CC] text-white shadow-2xs' : 'text-[#42526E] hover:text-[#0052CC] hover:bg-[#F4F5F7]'}"
              >
                <span>${tab.label}</span>
                ${tab.highlight ? `
                  <span class="w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-[#FFAB00]'}" aria-hidden="true"></span>
                  <span class="sr-only">(Priority Feature)</span>
                ` : ''}
              </a>
            `;
          }).join('')}
        </div>
      </nav>
    `;

    this.bindKeyboardNav(containerId);

    return { module, submenu, currentTabId };
  },

  bindKeyboardNav(containerId) {
    const tablistEl = document.getElementById(`${containerId}-tablist`);
    if (!tablistEl) return;

    const tabElements = Array.from(tablistEl.querySelectorAll('[role="tab"]'));
    if (!tabElements.length) return;

    tabElements.forEach((tabEl, index) => {
      tabEl.addEventListener('keydown', (e) => {
        let targetIndex = -1;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          targetIndex = (index + 1) % tabElements.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          targetIndex = (index - 1 + tabElements.length) % tabElements.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          targetIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          targetIndex = tabElements.length - 1;
        } else if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          tabEl.click();
          return;
        }

        if (targetIndex !== -1) {
          const targetTab = tabElements[targetIndex];
          targetTab.focus();
          targetTab.click();
        }
      });
    });
  }
};
