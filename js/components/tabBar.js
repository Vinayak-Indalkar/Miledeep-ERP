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
      <div class="border-b border-[#DFE1E6] mb-4 flex items-center justify-between gap-4 flex-wrap bg-white px-4 pt-1 rounded-t-lg shadow-xs">
        <!-- Tabs Navigation List -->
        <div class="flex items-center gap-1 overflow-x-auto pb-[-1px]">
          ${submenu.tabs.map(tab => {
            const isActive = tab.id === currentTabId;
            return `
              <a 
                href="${tab.hash}" 
                class="px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${isActive ? 'tab-active border-[#0052CC] text-[#0052CC] bg-[#FAFBFC]' : 'border-transparent text-[#5E6C84] hover:text-[#172B4D] hover:border-[#DFE1E6]'}"
              >
                <span>${tab.label}</span>
                ${tab.highlight ? `<span class="w-2 h-2 rounded-full bg-[#FFAB00]"></span>` : ''}
              </a>
            `;
          }).join('')}
        </div>
      </div>
    `;

    return { module, submenu, currentTabId };
  }
};
