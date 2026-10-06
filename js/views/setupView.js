// Setup Module Views (User Setup, Roles, Module Permissions, Audit Logs, and Master Data)

import { ERP_DATA } from '../data/mockData.js';
import { TabBar } from '../components/tabBar.js';
import { Toast } from '../components/toast.js';
import { Modal } from '../components/modal.js';
import { renderEmptyState } from '../components/emptyState.js';

export const SetupView = {
  activeFilter: {
    searchTerm: '',
    role: 'ALL',
    department: 'ALL',
    plant: 'ALL',
    status: 'ALL'
  },
  selectedRoleForPermissions: 'ROLE-ADMIN',

  render(containerId, subPage = 'users', activeHash = '#/setup/user-setup/users') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div id="setup-tab-bar-container"></div>
      <div id="setup-subpage-content" class="mt-4"></div>
    `;

    const tabContext = TabBar.render('setup-tab-bar-container', activeHash);
    const subContainer = document.getElementById('setup-subpage-content');

    const clean = (activeHash || '').replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const submenuId = parts[1] || 'user-setup';
    const tabId = parts[2] || subPage || 'users';

    if (submenuId === 'user-setup') {
      switch (tabId) {
        case 'users':
          this.renderUsersTab(subContainer);
          break;
        case 'roles':
          this.renderRolesTab(subContainer);
          break;
        case 'module-permissions':
          this.renderPermissionsTab(subContainer);
          break;
        case 'audit-logs':
          this.renderAuditLogsTab(subContainer);
          break;
        default:
          this.renderUsersTab(subContainer);
          break;
      }
    } else {
      // Other setup submenus
      const tabLabel = tabContext?.submenu?.tabs?.find(t => t.id === tabId)?.label || tabId.replace(/-/g, ' ');
      subContainer.innerHTML = renderEmptyState({
        title: `Setup: ${tabLabel}`,
        description: `Configure enterprise plant registries, species catalogs, and system configuration parameters. Full User Setup CRUD features are active under User Setup.`,
        moduleName: "Setup",
        tabName: tabLabel
      });
    }
  },

  // 1. USERS TAB
  renderUsersTab(container) {
    const users = this.getFilteredUsers();

    const totalUsers = ERP_DATA.users.length;
    const activeUsers = ERP_DATA.users.filter(u => u.status === 'Active').length;
    const totalRoles = ERP_DATA.roles.length;

    container.innerHTML = `
      <div class="space-y-4">
        <!-- KPI Metric Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="bg-white p-3.5 rounded-xl border border-[#DFE1E6] shadow-2xs">
            <div class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider">Total Enterprise Users</div>
            <div class="text-xl font-extrabold text-[#172B4D] mt-1">${totalUsers}</div>
            <div class="text-[11px] text-[#36B37E] font-semibold mt-0.5">${activeUsers} Active Accounts</div>
          </div>
          <div class="bg-white p-3.5 rounded-xl border border-[#DFE1E6] shadow-2xs">
            <div class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider">Configured Roles</div>
            <div class="text-xl font-extrabold text-[#0052CC] mt-1">${totalRoles} Roles</div>
            <div class="text-[11px] text-[#5E6C84] mt-0.5">RBAC Matrix Active</div>
          </div>
          <div class="bg-white p-3.5 rounded-xl border border-[#DFE1E6] shadow-2xs">
            <div class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider">Plant Units Access</div>
            <div class="text-xl font-extrabold text-[#6554C0] mt-1">4 Plants</div>
            <div class="text-[11px] text-[#5E6C84] mt-0.5">Multi-Facility Access</div>
          </div>
          <div class="bg-white p-3.5 rounded-xl border border-[#DFE1E6] shadow-2xs">
            <div class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider">Security Compliance</div>
            <div class="text-xl font-extrabold text-[#006644] mt-1">100% SSO</div>
            <div class="text-[11px] text-[#00875A] font-semibold mt-0.5">2FA & Role Guard On</div>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center justify-between pb-3 border-b border-[#EBECF0]">
            <h3 class="text-sm font-bold text-[#172B4D]">Search & Filters</h3>
            <div class="flex items-center gap-2">
              <button id="users-toggle-filter-btn" class="px-2.5 py-1 text-xs font-semibold text-[#0052CC] hover:bg-[#DEEBFF] rounded transition-colors flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                <span id="users-toggle-filter-text">Hide Filter</span>
              </button>
              <button id="btn-create-user-modal" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>Register New User</span>
              </button>
            </div>
          </div>

          <div id="users-filter-body" class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SEARCH USER</label>
              <input type="text" id="user-search-input" value="${this.activeFilter.searchTerm}" placeholder="Name, Email, Phone..." class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">ROLE</label>
              <select id="user-role-filter" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="ALL">All Roles (Select)</option>
                ${ERP_DATA.roles.map(r => `<option value="${r.name}" ${this.activeFilter.role === r.name ? 'selected' : ''}>${r.name}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">DEPARTMENT</label>
              <select id="user-dept-filter" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="ALL">All Departments</option>
                <option value="Executive Management" ${this.activeFilter.department === 'Executive Management' ? 'selected' : ''}>Executive Management</option>
                <option value="Quality Assurance" ${this.activeFilter.department === 'Quality Assurance' ? 'selected' : ''}>Quality Assurance</option>
                <option value="Raw Material Purchase" ${this.activeFilter.department === 'Raw Material Purchase' ? 'selected' : ''}>Raw Material Purchase</option>
                <option value="Processing Plant Operations" ${this.activeFilter.department === 'Processing Plant Operations' ? 'selected' : ''}>Plant Operations</option>
                <option value="Coldstore & Warehousing" ${this.activeFilter.department === 'Coldstore & Warehousing' ? 'selected' : ''}>Coldstore & Warehousing</option>
                <option value="Accounts & Finance" ${this.activeFilter.department === 'Accounts & Finance' ? 'selected' : ''}>Accounts & Finance</option>
                <option value="Export Logistics" ${this.activeFilter.department === 'Export Logistics' ? 'selected' : ''}>Export Logistics</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">STATUS</label>
              <select id="user-status-filter" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="ALL">All Status</option>
                <option value="Active" ${this.activeFilter.status === 'Active' ? 'selected' : ''}>Active</option>
                <option value="Inactive" ${this.activeFilter.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
              </select>
            </div>

            <div class="flex items-end gap-2">
              <button id="users-apply-filter-btn" class="btn-primary w-full py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
              <button id="users-reset-filter-btn" class="px-2.5 py-1.5 bg-[#EBECF0] hover:bg-[#DFE1E6] text-[#42526E] rounded text-xs font-semibold cursor-pointer">
                Reset
              </button>
            </div>
          </div>
        </div>

        <!-- Users Table Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-xs overflow-hidden">
          <!-- Table Toolbar -->
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between flex-wrap gap-2">
            <div class="text-xs font-bold text-[#172B4D] flex items-center gap-2">
              <span>Enterprise User Directory</span>
              <span class="lozenge lozenge-inprogress text-[10px]">${users.length} Records</span>
            </div>

            <div class="flex items-center gap-2">
              <button id="users-copy-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                <span>Copy</span>
              </button>
              <button id="users-excel-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#36B37E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Excel</span>
              </button>
              <button id="users-pdf-btn" class="px-2.5 py-1 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                <span>PDF</span>
              </button>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto">
            <table class="erp-table text-xs">
              <thead>
                <tr>
                  <th class="w-20">User ID</th>
                  <th>Full Name & Contact</th>
                  <th>Role / Persona</th>
                  <th>Department</th>
                  <th>Plant Access</th>
                  <th>Last Login</th>
                  <th>Status</th>
                  <th class="sticky-action-col text-center w-36">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EBECF0]">
                ${users.length === 0 ? `
                  <tr>
                    <td colspan="8" class="text-center py-8 text-[#6B778C]">No enterprise users matched the current filters.</td>
                  </tr>
                ` : users.map(u => `
                  <tr class="hover:bg-[#FAFBFC] transition-colors">
                    <td class="font-bold text-[#0052CC]">${u.id}</td>
                    <td>
                      <div class="flex items-center gap-2.5">
                        <img src="${u.avatar}" alt="${u.name}" class="w-8 h-8 rounded-full object-cover ring-1 ring-[#DFE1E6] shrink-0" />
                        <div>
                          <div class="font-bold text-[#172B4D]">${u.name}</div>
                          <div class="text-[11px] text-[#5E6C84]">${u.email} • ${u.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold text-[11px] ${u.roleCode === 'ROLE-ADMIN' ? 'bg-[#DEEBFF] text-[#0052CC]' : 'bg-[#EAE6FF] text-[#6554C0]'}">
                        ${u.role}
                      </span>
                    </td>
                    <td class="text-[#42526E] font-medium">${u.department}</td>
                    <td>
                      <div class="flex items-center gap-1 flex-wrap">
                        ${u.plantAccess.map(p => `<span class="lozenge lozenge-default text-[10px]">${p}</span>`).join('')}
                      </div>
                    </td>
                    <td class="text-[#5E6C84] text-[11px]">${u.lastLogin}</td>
                    <td>
                      <button data-action="toggle-status" data-id="${u.id}" class="cursor-pointer ${u.status === 'Active' ? 'lozenge lozenge-success' : 'lozenge lozenge-danger'}" title="Click to toggle status">
                        ${u.status}
                      </button>
                    </td>
                    <td class="sticky-action-col text-center">
                      <div class="flex items-center justify-center gap-1">
                        <button data-action="view-user" data-id="${u.id}" class="p-1.5 text-[#0052CC] hover:bg-[#DEEBFF] rounded transition-colors" title="View User Details & Permissions">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        </button>
                        <button data-action="edit-user" data-id="${u.id}" class="p-1.5 text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#EBECF0] rounded transition-colors" title="Edit User Account">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button data-action="delete-user" data-id="${u.id}" class="p-1.5 text-[#FF5630] hover:bg-[#FFEBE6] rounded transition-colors" title="Delete User">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.bindUsersTabEvents();
  },

  getFilteredUsers() {
    return ERP_DATA.users.filter(u => {
      if (this.activeFilter.searchTerm) {
        const t = this.activeFilter.searchTerm.toLowerCase();
        const matches = u.name.toLowerCase().includes(t) || u.email.toLowerCase().includes(t) || u.phone.includes(t) || u.id.toLowerCase().includes(t);
        if (!matches) return false;
      }
      if (this.activeFilter.role !== 'ALL' && u.role !== this.activeFilter.role) {
        return false;
      }
      if (this.activeFilter.department !== 'ALL' && u.department !== this.activeFilter.department) {
        return false;
      }
      if (this.activeFilter.status !== 'ALL' && u.status !== this.activeFilter.status) {
        return false;
      }
      return true;
    });
  },

  bindUsersTabEvents() {
    // Toggle Filter
    const toggleBtn = document.getElementById('users-toggle-filter-btn');
    const filterBody = document.getElementById('users-filter-body');
    const toggleText = document.getElementById('users-toggle-filter-text');
    if (toggleBtn && filterBody) {
      toggleBtn.onclick = () => {
        if (filterBody.classList.contains('hidden')) {
          filterBody.classList.remove('hidden');
          toggleText.innerText = 'Hide Filter';
        } else {
          filterBody.classList.add('hidden');
          toggleText.innerText = 'Show Filter';
        }
      };
    }

    // Filter Buttons
    const searchInput = document.getElementById('user-search-input');
    const roleFilter = document.getElementById('user-role-filter');
    const deptFilter = document.getElementById('user-dept-filter');
    const statusFilter = document.getElementById('user-status-filter');
    const applyBtn = document.getElementById('users-apply-filter-btn');
    const resetBtn = document.getElementById('users-reset-filter-btn');

    const triggerFilter = () => {
      this.activeFilter.searchTerm = searchInput?.value || '';
      this.activeFilter.role = roleFilter?.value || 'ALL';
      this.activeFilter.department = deptFilter?.value || 'ALL';
      this.activeFilter.status = statusFilter?.value || 'ALL';
      const container = document.getElementById('setup-subpage-content');
      if (container) this.renderUsersTab(container);
    };

    if (applyBtn) applyBtn.onclick = triggerFilter;
    if (searchInput) {
      searchInput.onkeydown = (e) => {
        if (e.key === 'Enter') triggerFilter();
      };
    }

    if (resetBtn) {
      resetBtn.onclick = () => {
        this.activeFilter = { searchTerm: '', role: 'ALL', department: 'ALL', plant: 'ALL', status: 'ALL' };
        const container = document.getElementById('setup-subpage-content');
        if (container) this.renderUsersTab(container);
      };
    }

    // Register New User
    const createBtn = document.getElementById('btn-create-user-modal');
    if (createBtn) {
      createBtn.onclick = () => this.showCreateUserModal();
    }

    // Toolbar Exports
    const copyBtn = document.getElementById('users-copy-btn');
    if (copyBtn) {
      copyBtn.onclick = () => {
        Toast.show('User Directory copied to clipboard (8 records)', 'info', 'Clipboard Export');
      };
    }

    const excelBtn = document.getElementById('users-excel-btn');
    if (excelBtn) {
      excelBtn.onclick = () => {
        Toast.show('Generating Devi_Fisheries_Users_List.xlsx...', 'success', 'Excel Export Ready');
      };
    }

    const pdfBtn = document.getElementById('users-pdf-btn');
    if (pdfBtn) {
      pdfBtn.onclick = () => {
        Toast.show('Generating Enterprise_User_Directory_Report.pdf...', 'success', 'PDF Ready');
      };
    }

    // Table Actions
    document.querySelectorAll('[data-action="view-user"]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const u = ERP_DATA.users.find(x => x.id === id);
        if (u) this.showUserDetailsDrawer(u);
      };
    });

    document.querySelectorAll('[data-action="edit-user"]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const u = ERP_DATA.users.find(x => x.id === id);
        if (u) this.showEditUserModal(u);
      };
    });

    document.querySelectorAll('[data-action="delete-user"]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const u = ERP_DATA.users.find(x => x.id === id);
        if (u) this.showDeleteUserModal(u);
      };
    });

    document.querySelectorAll('[data-action="toggle-status"]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const u = ERP_DATA.users.find(x => x.id === id);
        if (u) {
          u.status = u.status === 'Active' ? 'Inactive' : 'Active';
          Toast.show(`User account ${u.name} is now ${u.status}`, 'info', 'Status Updated');
          const container = document.getElementById('setup-subpage-content');
          if (container) this.renderUsersTab(container);
        }
      };
    });
  },

  // MODAL: Create User
  showCreateUserModal() {
    const nextId = `USR-00${ERP_DATA.users.length + 1}`;

    Modal.open({
      title: 'Register New Enterprise User',
      size: 'lg',
      content: `
        <form id="create-user-form" class="space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-[#172B4D] mb-1">User ID</label>
              <input type="text" id="new-user-id" value="${nextId}" readonly class="w-full text-xs px-3 py-2 bg-[#FAFBFC] border border-[#DFE1E6] rounded font-bold text-[#0052CC]" />
            </div>
            <div>
              <label class="block font-bold text-[#172B4D] mb-1">Full Name *</label>
              <input type="text" id="new-user-name" placeholder="e.g. Ramesh Varma" required class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-[#172B4D] mb-1">Corporate Email Address *</label>
              <input type="email" id="new-user-email" placeholder="ramesh.v@devifisheries.com" required class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
            <div>
              <label class="block font-bold text-[#172B4D] mb-1">Mobile / Phone Number *</label>
              <input type="text" id="new-user-phone" placeholder="+91 98480 00000" required class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-[#172B4D] mb-1">Assigned Role *</label>
              <select id="new-user-role" required class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                ${ERP_DATA.roles.map(r => `<option value="${r.name}" data-code="${r.id}">${r.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#172B4D] mb-1">Department *</label>
              <select id="new-user-dept" required class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="Raw Material Purchase">Raw Material Purchase</option>
                <option value="Quality Assurance">Quality Assurance (QC Lab)</option>
                <option value="Processing Plant Operations">Plant Operations</option>
                <option value="Pre-Processing">Pre-Processing</option>
                <option value="Coldstore & Warehousing">Coldstore & Warehousing</option>
                <option value="Accounts & Finance">Accounts & Finance</option>
                <option value="Export Logistics">Export Logistics</option>
                <option value="Executive Management">Executive Management</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-bold text-[#172B4D] mb-1.5">Processing Plant Units Access *</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <label class="flex items-center gap-2 p-2 border border-[#DFE1E6] rounded bg-[#FAFBFC] cursor-pointer hover:bg-[#DEEBFF]">
                <input type="checkbox" name="plant-access" value="DFL UNIT-5 (JPT)" checked class="rounded text-[#0052CC]" />
                <span class="font-medium text-[#172B4D]">Unit-5 (JPT)</span>
              </label>
              <label class="flex items-center gap-2 p-2 border border-[#DFE1E6] rounded bg-[#FAFBFC] cursor-pointer hover:bg-[#DEEBFF]">
                <input type="checkbox" name="plant-access" value="DFL UNIT-3 (PSP)" checked class="rounded text-[#0052CC]" />
                <span class="font-medium text-[#172B4D]">Unit-3 (PSP)</span>
              </label>
              <label class="flex items-center gap-2 p-2 border border-[#DFE1E6] rounded bg-[#FAFBFC] cursor-pointer hover:bg-[#DEEBFF]">
                <input type="checkbox" name="plant-access" value="DFL UNIT-6 (JPT-II)" class="rounded text-[#0052CC]" />
                <span class="font-medium text-[#172B4D]">Unit-6 (JPT-II)</span>
              </label>
              <label class="flex items-center gap-2 p-2 border border-[#DFE1E6] rounded bg-[#FAFBFC] cursor-pointer hover:bg-[#DEEBFF]">
                <input type="checkbox" name="plant-access" value="DFL UNIT-4 (PND)" class="rounded text-[#0052CC]" />
                <span class="font-medium text-[#172B4D]">Unit-4 (PND)</span>
              </label>
            </div>
          </div>

          <div class="p-3 bg-[#DEEBFF] border border-[#B3D4FF] rounded flex items-center justify-between">
            <div class="text-[#0747A6]">
              <strong>Single Sign-On (SSO):</strong> An invite with secure temporary credentials will be dispatched to the employee email.
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="new-user-active" checked class="rounded text-[#0052CC]" />
              <span class="font-bold text-[#0747A6]">Active User</span>
            </label>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Create Account',
          type: 'primary',
          onClick: (m) => {
            const name = document.getElementById('new-user-name')?.value;
            const email = document.getElementById('new-user-email')?.value;
            const phone = document.getElementById('new-user-phone')?.value;
            const roleEl = document.getElementById('new-user-role');
            const role = roleEl?.value;
            const roleCode = roleEl?.options[roleEl.selectedIndex]?.dataset.code || 'ROLE-PURCHASE';
            const dept = document.getElementById('new-user-dept')?.value;
            const isActive = document.getElementById('new-user-active')?.checked;

            const selectedPlants = Array.from(document.querySelectorAll('input[name="plant-access"]:checked')).map(cb => cb.value);

            if (!name || !email) {
              Toast.show('Please fill in required fields (Name & Email)', 'error', 'Validation Error');
              return;
            }

            const newUser = {
              id: nextId,
              name,
              email,
              phone: phone || '+91 98480 00000',
              role,
              roleCode,
              department: dept,
              plantAccess: selectedPlants.length > 0 ? selectedPlants : ['DFL UNIT-5 (JPT)'],
              status: isActive ? 'Active' : 'Inactive',
              lastLogin: 'Never (Pending First Login)',
              createdAt: '06/10/2026',
              avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80`
            };

            ERP_DATA.users.unshift(newUser);

            // Add Audit log
            ERP_DATA.userAuditLogs.unshift({
              id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
              timestamp: '06/10/2026, 10:20:00 AM',
              user: ERP_DATA.currentUser.name,
              role: ERP_DATA.currentUser.role,
              module: 'User Setup',
              action: `Created User Account ${name} (${newUser.id})`,
              ip: '192.168.1.10',
              status: 'Success'
            });

            m.close();
            Toast.show(`User ${name} registered successfully with ID ${nextId}`, 'success', 'User Created');
            
            const container = document.getElementById('setup-subpage-content');
            if (container) this.renderUsersTab(container);
          }
        }
      ]
    });
  },

  // MODAL: Edit User
  showEditUserModal(user) {
    Modal.open({
      title: `Edit User Account: ${user.name} (${user.id})`,
      size: 'lg',
      content: `
        <form id="edit-user-form" class="space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-[#172B4D] mb-1">User ID</label>
              <input type="text" value="${user.id}" readonly class="w-full text-xs px-3 py-2 bg-[#FAFBFC] border border-[#DFE1E6] rounded font-bold text-[#0052CC]" />
            </div>
            <div>
              <label class="block font-bold text-[#172B4D] mb-1">Full Name *</label>
              <input type="text" id="edit-user-name" value="${user.name}" required class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-[#172B4D] mb-1">Corporate Email Address *</label>
              <input type="email" id="edit-user-email" value="${user.email}" required class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
            <div>
              <label class="block font-bold text-[#172B4D] mb-1">Phone Number</label>
              <input type="text" id="edit-user-phone" value="${user.phone}" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-[#172B4D] mb-1">Role *</label>
              <select id="edit-user-role" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                ${ERP_DATA.roles.map(r => `<option value="${r.name}" data-code="${r.id}" ${r.name === user.role ? 'selected' : ''}>${r.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#172B4D] mb-1">Department *</label>
              <select id="edit-user-dept" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="Raw Material Purchase" ${user.department === 'Raw Material Purchase' ? 'selected' : ''}>Raw Material Purchase</option>
                <option value="Quality Assurance" ${user.department === 'Quality Assurance' ? 'selected' : ''}>Quality Assurance (QC Lab)</option>
                <option value="Processing Plant Operations" ${user.department === 'Processing Plant Operations' ? 'selected' : ''}>Plant Operations</option>
                <option value="Pre-Processing" ${user.department === 'Pre-Processing' ? 'selected' : ''}>Pre-Processing</option>
                <option value="Coldstore & Warehousing" ${user.department === 'Coldstore & Warehousing' ? 'selected' : ''}>Coldstore & Warehousing</option>
                <option value="Accounts & Finance" ${user.department === 'Accounts & Finance' ? 'selected' : ''}>Accounts & Finance</option>
                <option value="Export Logistics" ${user.department === 'Export Logistics' ? 'selected' : ''}>Export Logistics</option>
                <option value="Executive Management" ${user.department === 'Executive Management' ? 'selected' : ''}>Executive Management</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-[#172B4D] mb-1">Account Status</label>
              <select id="edit-user-status" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="Active" ${user.status === 'Active' ? 'selected' : ''}>Active (Can Log In)</option>
                <option value="Inactive" ${user.status === 'Inactive' ? 'selected' : ''}>Inactive (Account Locked)</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-[#172B4D] mb-1">Password Actions</label>
              <button type="button" id="btn-reset-user-pwd" class="w-full py-2 bg-[#FAFBFC] border border-[#DFE1E6] hover:bg-[#DEEBFF] text-[#0052CC] font-semibold rounded transition-colors text-left px-3 flex items-center justify-between">
                <span>Send Password Reset Email</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </button>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Save Changes',
          type: 'primary',
          onClick: (m) => {
            user.name = document.getElementById('edit-user-name')?.value || user.name;
            user.email = document.getElementById('edit-user-email')?.value || user.email;
            user.phone = document.getElementById('edit-user-phone')?.value || user.phone;
            const roleEl = document.getElementById('edit-user-role');
            user.role = roleEl?.value || user.role;
            user.roleCode = roleEl?.options[roleEl.selectedIndex]?.dataset.code || user.roleCode;
            user.department = document.getElementById('edit-user-dept')?.value || user.department;
            user.status = document.getElementById('edit-user-status')?.value || user.status;

            ERP_DATA.userAuditLogs.unshift({
              id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
              timestamp: '06/10/2026, 10:22:00 AM',
              user: ERP_DATA.currentUser.name,
              role: ERP_DATA.currentUser.role,
              module: 'User Setup',
              action: `Modified Account Profile for ${user.name} (${user.id})`,
              ip: '192.168.1.10',
              status: 'Success'
            });

            m.close();
            Toast.show(`Account details updated for ${user.name}`, 'success', 'Changes Saved');

            const container = document.getElementById('setup-subpage-content');
            if (container) this.renderUsersTab(container);
          }
        }
      ]
    });

    setTimeout(() => {
      const resetBtn = document.getElementById('btn-reset-user-pwd');
      if (resetBtn) {
        resetBtn.onclick = () => {
          Toast.show(`Password reset dispatch sent to ${user.email}`, 'info', 'Email Dispatched');
        };
      }
    }, 50);
  },

  // MODAL: Delete User
  showDeleteUserModal(user) {
    Modal.open({
      title: `Delete User: ${user.name}?`,
      size: 'sm',
      content: `
        <div class="space-y-3 text-xs">
          <div class="p-3 bg-[#FFEBE6] border border-[#FFBDAD] rounded text-[#BF2600]">
            <strong>Warning:</strong> You are about to permanently remove <strong>${user.name}</strong> (${user.id}) from the fisheries enterprise system. All assigned plant clearances and credentials will be revoked.
          </div>
          <div class="p-2 border border-[#DFE1E6] rounded bg-[#FAFBFC] space-y-1">
            <div class="text-[#172B4D]"><strong>Role:</strong> ${user.role}</div>
            <div class="text-[#172B4D]"><strong>Department:</strong> ${user.department}</div>
            <div class="text-[#172B4D]"><strong>Email:</strong> ${user.email}</div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Delete User Permanently',
          type: 'danger',
          onClick: (m) => {
            const idx = ERP_DATA.users.findIndex(x => x.id === user.id);
            if (idx !== -1) {
              ERP_DATA.users.splice(idx, 1);

              ERP_DATA.userAuditLogs.unshift({
                id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
                timestamp: '06/10/2026, 10:24:00 AM',
                user: ERP_DATA.currentUser.name,
                role: ERP_DATA.currentUser.role,
                module: 'User Setup',
                action: `Deleted User ${user.name} (${user.id})`,
                ip: '192.168.1.10',
                status: 'Warning'
              });

              m.close();
              Toast.show(`User ${user.name} has been deleted.`, 'success', 'User Deleted');
              
              const container = document.getElementById('setup-subpage-content');
              if (container) this.renderUsersTab(container);
            }
          }
        }
      ]
    });
  },

  // DRAWER: View User Details & Permissions
  showUserDetailsDrawer(user) {
    const existing = document.getElementById('user-details-drawer');
    if (existing) existing.remove();

    const drawer = document.createElement('div');
    drawer.id = 'user-details-drawer';
    drawer.className = 'fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity';

    drawer.innerHTML = `
      <div class="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-fade-in text-xs">
        <!-- Header -->
        <div class="p-4 border-b border-[#EBECF0] flex items-center justify-between bg-[#FAFBFC]">
          <div class="flex items-center gap-3">
            <img src="${user.avatar}" alt="${user.name}" class="w-10 h-10 rounded-full object-cover ring-2 ring-[#0052CC]" />
            <div>
              <h3 class="font-black text-sm text-[#172B4D]">${user.name}</h3>
              <div class="text-[11px] text-[#5E6C84]">${user.id} • ${user.role}</div>
            </div>
          </div>
          <button id="close-user-drawer" class="p-1.5 text-[#6B778C] hover:text-[#172B4D] hover:bg-[#EBECF0] rounded">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Body Scrollable -->
        <div class="p-4 overflow-y-auto space-y-4 flex-1">
          <!-- Profile Card -->
          <div class="p-3 border border-[#DFE1E6] rounded-xl bg-white space-y-2">
            <h4 class="font-bold text-[#172B4D] border-b border-[#EBECF0] pb-1.5 uppercase text-[10px] tracking-wider text-[#5E6C84]">Personal & Access Details</h4>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div><span class="text-[#6B778C]">Email:</span> <div class="font-semibold text-[#172B4D]">${user.email}</div></div>
              <div><span class="text-[#6B778C]">Phone:</span> <div class="font-semibold text-[#172B4D]">${user.phone}</div></div>
              <div><span class="text-[#6B778C]">Department:</span> <div class="font-semibold text-[#172B4D]">${user.department}</div></div>
              <div><span class="text-[#6B778C]">Status:</span> <div><span class="lozenge ${user.status === 'Active' ? 'lozenge-success' : 'lozenge-danger'}">${user.status}</span></div></div>
              <div><span class="text-[#6B778C]">Created:</span> <div class="font-semibold text-[#172B4D]">${user.createdAt}</div></div>
              <div><span class="text-[#6B778C]">Last Login:</span> <div class="font-semibold text-[#172B4D]">${user.lastLogin}</div></div>
            </div>
          </div>

          <!-- Plant Clearances -->
          <div class="p-3 border border-[#DFE1E6] rounded-xl bg-white space-y-2">
            <h4 class="font-bold text-[#172B4D] border-b border-[#EBECF0] pb-1.5 uppercase text-[10px] tracking-wider text-[#5E6C84]">Authorized Processing Units</h4>
            <div class="flex items-center gap-1.5 flex-wrap">
              ${user.plantAccess.map(p => `<span class="lozenge lozenge-inprogress text-[11px]">${p}</span>`).join('')}
            </div>
          </div>

          <!-- Effective Permissions Matrix -->
          <div class="p-3 border border-[#DFE1E6] rounded-xl bg-white space-y-2">
            <h4 class="font-bold text-[#172B4D] border-b border-[#EBECF0] pb-1.5 uppercase text-[10px] tracking-wider text-[#5E6C84]">Module Access Rights</h4>
            <div class="divide-y divide-[#EBECF0] text-[11px]">
              ${ERP_DATA.modulePermissions.map(m => `
                <div class="py-1.5 flex items-center justify-between">
                  <span class="font-semibold text-[#172B4D]">${m.module}</span>
                  <div class="flex items-center gap-1">
                    <span class="px-1.5 py-0.5 rounded bg-[#E3FCEF] text-[#006644] font-bold text-[9px]">READ</span>
                    <span class="px-1.5 py-0.5 rounded bg-[#DEEBFF] text-[#0747A6] font-bold text-[9px]">WRITE</span>
                    ${user.roleCode === 'ROLE-ADMIN' ? '<span class="px-1.5 py-0.5 rounded bg-[#FFEBE6] text-[#BF2600] font-bold text-[9px]">ADMIN</span>' : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-3 border-t border-[#EBECF0] bg-[#FAFBFC] flex items-center justify-end gap-2">
          <button id="drawer-edit-btn" class="btn-primary px-3 py-1.5 rounded font-bold text-xs">Edit User</button>
        </div>
      </div>
    `;

    document.body.appendChild(drawer);

    document.getElementById('close-user-drawer').onclick = () => drawer.remove();
    drawer.onclick = (e) => {
      if (e.target === drawer) drawer.remove();
    };

    const drawerEditBtn = document.getElementById('drawer-edit-btn');
    if (drawerEditBtn) {
      drawerEditBtn.onclick = () => {
        drawer.remove();
        this.showEditUserModal(user);
      };
    }
  },

  // 2. ROLES TAB
  renderRolesTab(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <!-- Header & Action -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 class="text-sm font-bold text-[#172B4D]">Role-Based Access Control (RBAC)</h3>
            <p class="text-xs text-[#5E6C84] mt-0.5">Define persona permissions, functional authorities, and departmental security profiles.</p>
          </div>
          <button id="btn-create-role-modal" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Create New Role</span>
          </button>
        </div>

        <!-- Roles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${ERP_DATA.roles.map(r => `
            <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs flex flex-col justify-between space-y-3 hover:border-[#0052CC] transition-colors">
              <div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-sm text-[#172B4D]">${r.name}</span>
                  <span class="lozenge ${r.isSystem ? 'lozenge-purple' : 'lozenge-default'} text-[10px]">${r.isSystem ? 'System' : 'Custom'}</span>
                </div>
                <div class="text-[11px] font-mono text-[#0052CC] mt-0.5">${r.code}</div>
                <p class="text-xs text-[#5E6C84] mt-2 leading-relaxed">${r.description}</p>
              </div>

              <div class="pt-3 border-t border-[#EBECF0] flex items-center justify-between text-xs">
                <span class="text-[#42526E] font-semibold">${r.userCount} Active Users</span>
                <div class="flex items-center gap-1">
                  <button data-action="edit-role" data-id="${r.id}" class="px-2 py-1 text-[#0052CC] hover:bg-[#DEEBFF] rounded font-semibold transition-colors cursor-pointer">
                    Edit
                  </button>
                  ${!r.isSystem ? `
                    <button data-action="delete-role" data-id="${r.id}" class="px-2 py-1 text-[#FF5630] hover:bg-[#FFEBE6] rounded font-semibold transition-colors cursor-pointer">
                      Delete
                    </button>
                  ` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindRolesTabEvents();
  },

  bindRolesTabEvents() {
    const createBtn = document.getElementById('btn-create-role-modal');
    if (createBtn) {
      createBtn.onclick = () => this.showCreateRoleModal();
    }

    document.querySelectorAll('[data-action="edit-role"]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const r = ERP_DATA.roles.find(x => x.id === id);
        if (r) this.showEditRoleModal(r);
      };
    });

    document.querySelectorAll('[data-action="delete-role"]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const r = ERP_DATA.roles.find(x => x.id === id);
        if (r) {
          const idx = ERP_DATA.roles.findIndex(x => x.id === id);
          if (idx !== -1) {
            ERP_DATA.roles.splice(idx, 1);
            Toast.show(`Role ${r.name} removed.`, 'success', 'Role Deleted');
            const container = document.getElementById('setup-subpage-content');
            if (container) this.renderRolesTab(container);
          }
        }
      };
    });
  },

  showCreateRoleModal() {
    Modal.open({
      title: 'Create New Security Role',
      size: 'md',
      content: `
        <form class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Role Title *</label>
            <input type="text" id="new-role-name" placeholder="e.g. Sanitation & Hygiene Inspector" required class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Role Code *</label>
            <input type="text" id="new-role-code" placeholder="SAN_INSP" required class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded uppercase focus:outline-none focus:border-[#0052CC]" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Description</label>
            <textarea id="new-role-desc" rows="3" placeholder="Explain the responsibilities and scope of this role..." class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]"></textarea>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Create Role',
          type: 'primary',
          onClick: (m) => {
            const name = document.getElementById('new-role-name')?.value;
            const code = document.getElementById('new-role-code')?.value;
            const desc = document.getElementById('new-role-desc')?.value;

            if (!name || !code) {
              Toast.show('Please enter Role Title and Code', 'error', 'Validation Error');
              return;
            }

            ERP_DATA.roles.push({
              id: `ROLE-${code.toUpperCase()}`,
              name,
              code: code.toUpperCase(),
              description: desc || 'Custom defined role profile.',
              userCount: 0,
              isSystem: false,
              status: 'Active',
              permissions: ['purchase_read', 'qc_read']
            });

            m.close();
            Toast.show(`Role ${name} created successfully`, 'success', 'Role Created');
            const container = document.getElementById('setup-subpage-content');
            if (container) this.renderRolesTab(container);
          }
        }
      ]
    });
  },

  showEditRoleModal(role) {
    Modal.open({
      title: `Edit Role: ${role.name}`,
      size: 'md',
      content: `
        <form class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Role Title *</label>
            <input type="text" id="edit-role-name" value="${role.name}" required class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Role Code</label>
            <input type="text" value="${role.code}" readonly class="w-full text-xs px-3 py-2 bg-[#FAFBFC] border border-[#DFE1E6] rounded font-mono" />
          </div>
          <div>
            <label class="block font-bold text-[#172B4D] mb-1">Description</label>
            <textarea id="edit-role-desc" rows="3" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">${role.description}</textarea>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Save Role',
          type: 'primary',
          onClick: (m) => {
            role.name = document.getElementById('edit-role-name')?.value || role.name;
            role.description = document.getElementById('edit-role-desc')?.value || role.description;
            m.close();
            Toast.show(`Role ${role.name} updated.`, 'success', 'Saved');
            const container = document.getElementById('setup-subpage-content');
            if (container) this.renderRolesTab(container);
          }
        }
      ]
    });
  },

  // 3. MODULE PERMISSIONS TAB
  permissionSearchTerm: '',
  permissionCategoryFilter: 'ALL',

  renderPermissionsTab(container) {
    const selectedRole = ERP_DATA.roles.find(r => r.id === this.selectedRoleForPermissions) || ERP_DATA.roles[0];

    const categories = Array.from(new Set(ERP_DATA.modulePermissions.map(m => m.category)));

    const filteredModules = ERP_DATA.modulePermissions.filter(m => {
      if (this.permissionCategoryFilter !== 'ALL' && m.category !== this.permissionCategoryFilter) {
        return false;
      }
      if (this.permissionSearchTerm) {
        const t = this.permissionSearchTerm.toLowerCase();
        return m.module.toLowerCase().includes(t) || m.category.toLowerCase().includes(t) || m.code.toLowerCase().includes(t);
      }
      return true;
    });

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Role Selector & Filter Header Card -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-[#DEEBFF] text-[#0052CC] flex items-center justify-center font-bold">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-bold text-[#172B4D]">Enterprise Module Permission Matrix</h3>
                <span class="lozenge lozenge-inprogress text-[10px]">${ERP_DATA.modulePermissions.length} Total Sub-Modules</span>
              </div>
              <p class="text-xs text-[#5E6C84]">Granular role-based access control across all 32 legacy domains and functional processing workflows.</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <label class="text-xs font-bold text-[#5E6C84]">SELECT ROLE:</label>
            <select id="matrix-role-select" class="text-xs font-bold px-3 py-2 bg-white border-2 border-[#0052CC] rounded-lg text-[#0052CC] focus:outline-none cursor-pointer">
              ${ERP_DATA.roles.map(r => `
                <option value="${r.id}" ${r.id === selectedRole.id ? 'selected' : ''}>${r.name} (${r.code})</option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-3 shadow-2xs flex items-center justify-between flex-wrap gap-3 text-xs">
          <div class="flex items-center gap-2 flex-1 max-w-lg">
            <div class="relative flex-1">
              <input 
                type="text" 
                id="perm-search-input" 
                value="${this.permissionSearchTerm}" 
                placeholder="Search sub-modules (e.g., Antibiotic, Deheading, Coldstore, BAP, Anti-Dumping)..." 
                class="w-full text-xs pl-8 pr-3 py-1.5 bg-[#FAFBFC] border border-[#DFE1E6] rounded focus:bg-white focus:outline-none focus:border-[#0052CC]"
              />
              <svg class="w-3.5 h-3.5 text-[#6B778C] absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <select id="perm-category-select" class="text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
              <option value="ALL">All Categories (${categories.length})</option>
              ${categories.map(c => `<option value="${c}" ${this.permissionCategoryFilter === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>

          <!-- Bulk Quick Preset Actions -->
          <div class="flex items-center gap-2">
            <button id="perm-grant-all-btn" class="px-2.5 py-1 bg-[#E3FCEF] hover:bg-[#ABF5D1] text-[#006644] font-bold rounded text-[11px] transition-colors cursor-pointer">
              Grant All Full
            </button>
            <button id="perm-read-only-btn" class="px-2.5 py-1 bg-[#DEEBFF] hover:bg-[#B3D4FF] text-[#0747A6] font-bold rounded text-[11px] transition-colors cursor-pointer">
              Read Only
            </button>
            <button id="save-permissions-btn" class="btn-primary px-3.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Save Matrix</span>
            </button>
          </div>
        </div>

        <!-- Permissions Table -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-xs overflow-hidden">
          <div class="p-3 border-b border-[#EBECF0] flex items-center justify-between bg-[#FAFBFC]">
            <span class="text-xs font-bold text-[#172B4D]">Configuring Authority for: <strong class="text-[#0052CC]">${selectedRole.name}</strong> (${filteredModules.length} Sub-modules Shown)</span>
            <span class="text-[11px] text-[#5E6C84]">Role Code: <code class="font-bold text-[#0052CC]">${selectedRole.code}</code></span>
          </div>

          <div class="overflow-x-auto max-h-[600px]">
            <table class="erp-table text-xs">
              <thead>
                <tr>
                  <th class="w-40">Category</th>
                  <th class="w-72">Functional Module / Sub-Item</th>
                  <th class="text-center w-24">Read / View</th>
                  <th class="text-center w-24">Create</th>
                  <th class="text-center w-24">Edit</th>
                  <th class="text-center w-24">Delete</th>
                  <th class="text-center w-28">Export Data</th>
                  <th class="text-center w-32">QC / Approval</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EBECF0]" id="permissions-tbody">
                ${filteredModules.length === 0 ? `
                  <tr>
                    <td colspan="8" class="text-center py-8 text-[#6B778C]">No functional modules matched "${this.permissionSearchTerm}".</td>
                  </tr>
                ` : filteredModules.map((m, idx) => {
                  const isSuperAdmin = selectedRole.code === 'SUPER_ADMIN';
                  const isQCManager = selectedRole.code === 'QC_MGR';
                  const isPurchase = selectedRole.code === 'PUR_OFF';
                  const isPlant = selectedRole.code === 'PLANT_SUP';
                  const isColdstore = selectedRole.code === 'CS_MGR';

                  let canRead = true;
                  let canCreate = isSuperAdmin;
                  let canEdit = isSuperAdmin;
                  let canDelete = isSuperAdmin;
                  let canExport = true;
                  let canApprove = isSuperAdmin;

                  if (isQCManager) {
                    canCreate = m.category === 'Quality Control' || m.category === 'QC Audits' || m.category === 'Dashboards';
                    canEdit = canCreate;
                    canApprove = m.category === 'Quality Control' || m.category === 'QC Audits' || m.category === 'RM Purchase';
                  } else if (isPurchase) {
                    canCreate = m.category === 'RM Purchase' || m.category === 'Dashboards';
                    canEdit = canCreate;
                    canDelete = m.code === 'pur_bookings' || m.code === 'pur_arrivals';
                    canApprove = m.category === 'RM Purchase';
                  } else if (isPlant) {
                    canCreate = m.category === 'Pre-Processing' || m.category === 'Production' || m.category === 'Dashboards';
                    canEdit = canCreate;
                    canApprove = m.category === 'Production';
                  } else if (isColdstore) {
                    canCreate = m.category === 'Coldstore' || m.category === 'Dashboards';
                    canEdit = canCreate;
                    canApprove = m.category === 'Coldstore';
                  }

                  return `
                    <tr class="hover:bg-[#FAFBFC] transition-colors">
                      <td class="text-[#5E6C84] font-semibold text-[11px]">
                        <span class="px-2 py-0.5 rounded bg-[#F4F5F7] border border-[#DFE1E6]">${m.category}</span>
                      </td>
                      <td class="font-bold text-[#172B4D]">
                        <div>${m.module}</div>
                        <div class="text-[10px] font-mono text-[#6B778C] font-normal">${m.code}</div>
                      </td>
                      <td class="text-center">
                        <input type="checkbox" ${canRead ? 'checked' : ''} class="perm-check perm-read rounded text-[#0052CC] cursor-pointer" />
                      </td>
                      <td class="text-center">
                        <input type="checkbox" ${canCreate ? 'checked' : ''} class="perm-check perm-create rounded text-[#0052CC] cursor-pointer" />
                      </td>
                      <td class="text-center">
                        <input type="checkbox" ${canEdit ? 'checked' : ''} class="perm-check perm-edit rounded text-[#0052CC] cursor-pointer" />
                      </td>
                      <td class="text-center">
                        <input type="checkbox" ${canDelete ? 'checked' : ''} class="perm-check perm-delete rounded text-[#FF5630] cursor-pointer" />
                      </td>
                      <td class="text-center">
                        <input type="checkbox" ${canExport ? 'checked' : ''} class="perm-check perm-export rounded text-[#0052CC] cursor-pointer" />
                      </td>
                      <td class="text-center">
                        <input type="checkbox" ${canApprove ? 'checked' : ''} class="perm-check perm-approve rounded text-[#36B37E] cursor-pointer" />
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Bind Search & Filter
    const searchInput = document.getElementById('perm-search-input');
    const catSelect = document.getElementById('perm-category-select');
    const roleSelect = document.getElementById('matrix-role-select');
    const saveBtn = document.getElementById('save-permissions-btn');
    const grantAllBtn = document.getElementById('perm-grant-all-btn');
    const readOnlyBtn = document.getElementById('perm-read-only-btn');

    if (searchInput) {
      searchInput.oninput = (e) => {
        this.permissionSearchTerm = e.target.value;
        const c = document.getElementById('setup-subpage-content');
        if (c) this.renderPermissionsTab(c);
      };
    }

    if (catSelect) {
      catSelect.onchange = (e) => {
        this.permissionCategoryFilter = e.target.value;
        const c = document.getElementById('setup-subpage-content');
        if (c) this.renderPermissionsTab(c);
      };
    }

    if (roleSelect) {
      roleSelect.onchange = (e) => {
        this.selectedRoleForPermissions = e.target.value;
        const c = document.getElementById('setup-subpage-content');
        if (c) this.renderPermissionsTab(c);
      };
    }

    if (grantAllBtn) {
      grantAllBtn.onclick = () => {
        document.querySelectorAll('.perm-check').forEach(cb => cb.checked = true);
        Toast.show(`Granted full unrestricted permissions for role: ${selectedRole.name}`, 'info', 'Preset Applied');
      };
    }

    if (readOnlyBtn) {
      readOnlyBtn.onclick = () => {
        document.querySelectorAll('.perm-check').forEach(cb => cb.checked = false);
        document.querySelectorAll('.perm-read, .perm-export').forEach(cb => cb.checked = true);
        Toast.show(`Set Read-Only permissions for role: ${selectedRole.name}`, 'info', 'Preset Applied');
      };
    }

    if (saveBtn) {
      saveBtn.onclick = () => {
        Toast.show(`Permission matrix successfully saved and synchronized across all ${ERP_DATA.modulePermissions.length} enterprise modules for ${selectedRole.name}`, 'success', 'Permissions Updated');
      };
    }
  },

  // 4. AUDIT & SECURITY LOGS TAB
  renderAuditLogsTab(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 class="text-sm font-bold text-[#172B4D]">User Session & Security Audit Trail</h3>
            <p class="text-xs text-[#5E6C84] mt-0.5">Immutable tracking of user authentication, master data modifications, and authorization approvals.</p>
          </div>
          <button id="logs-export-btn" class="px-3 py-1.5 border border-[#DFE1E6] hover:bg-[#FAFBFC] rounded text-xs font-semibold text-[#42526E] flex items-center gap-1.5 cursor-pointer">
            <svg class="w-4 h-4 text-[#36B37E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span>Export Audit Log</span>
          </button>
        </div>

        <div class="bg-white rounded-xl border border-[#DFE1E6] shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="erp-table text-xs">
              <thead>
                <tr>
                  <th class="w-24">Log ID</th>
                  <th>Timestamp</th>
                  <th>User & Role</th>
                  <th>Target Module</th>
                  <th>Action Performed</th>
                  <th>IP Address</th>
                  <th class="text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EBECF0]">
                ${ERP_DATA.userAuditLogs.map(log => `
                  <tr class="hover:bg-[#FAFBFC] transition-colors">
                    <td class="font-bold text-[#0052CC] font-mono">${log.id}</td>
                    <td class="text-[#5E6C84] text-[11px] whitespace-nowrap">${log.timestamp}</td>
                    <td>
                      <div class="font-bold text-[#172B4D]">${log.user}</div>
                      <div class="text-[10px] text-[#6554C0]">${log.role}</div>
                    </td>
                    <td><span class="lozenge lozenge-default text-[10px]">${log.module}</span></td>
                    <td class="text-[#172B4D] font-medium">${log.action}</td>
                    <td class="font-mono text-[11px] text-[#5E6C84]">${log.ip}</td>
                    <td class="text-center">
                      <span class="lozenge lozenge-success text-[10px]">${log.status}</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    const exportBtn = document.getElementById('logs-export-btn');
    if (exportBtn) {
      exportBtn.onclick = () => {
        Toast.show('Exporting Security_Audit_Trail_2026.csv...', 'success', 'Audit Export Dispatched');
      };
    }
  }
};
