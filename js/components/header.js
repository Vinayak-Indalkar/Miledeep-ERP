// Global Top Header Component

import { ERP_DATA } from '../data/mockData.js';
import { Toast } from './toast.js';
import { Modal } from './modal.js';
import { TourGuide } from './tourGuide.js';
import { Sidebar } from './sidebar.js';

export const Header = {
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <header class="bg-white border-b border-[#DFE1E6] h-14 px-4 flex items-center justify-between sticky top-0 z-30 select-none">
        <!-- Left: Hamburger Toggle Menu -->
        <div class="flex items-center gap-3">
          <button id="sidebar-toggle-btn" class="p-2 text-[#5E6C84] hover:text-[#0052CC] hover:bg-[#DEEBFF] rounded-md transition-colors cursor-pointer" title="Toggle Navigation Sidebar">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>

        <!-- Center: Spacer -->
        <div class="flex-1"></div>

        <!-- Right: Actions, Notifications & Profile -->
        <div class="flex items-center gap-2.5">
          <!-- Notifications -->
          <div class="relative">
            <button id="header-notifications-btn" class="p-1.5 text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#EBECF0] rounded relative transition-colors" title="Notifications">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span class="absolute top-1 right-1 w-2 h-2 bg-[#FF5630] rounded-full ring-2 ring-white"></span>
            </button>
            <div id="notifications-dropdown" class="hidden absolute right-0 mt-1 w-80 bg-white rounded-md shadow-xl border border-[#DFE1E6] py-2 z-50 text-xs">
              <div class="px-3 py-1.5 font-bold text-[#172B4D] border-b border-[#EBECF0] flex justify-between items-center">
                <span>Notifications (3 New)</span>
                <span class="text-[10px] text-[#0052CC] cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div class="divide-y divide-[#EBECF0] max-h-64 overflow-y-auto">
                <div class="p-3 hover:bg-[#FAFBFC] cursor-pointer">
                  <div class="flex items-center gap-1.5 text-[#0052CC] font-semibold text-[11px]">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#0052CC]"></span> RM Arrival #RMA-2026-00341
                  </div>
                  <div class="text-[#42526E] mt-0.5">Godavari Coastal 2,980 KG Vannamei Shrimp staged at Dock #1 awaiting QC approval.</div>
                  <div class="text-[10px] text-[#8993A4] mt-1">20 minutes ago</div>
                </div>
                <div class="p-3 hover:bg-[#FAFBFC] cursor-pointer">
                  <div class="flex items-center gap-1.5 text-[#36B37E] font-semibold text-[11px]">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#36B37E]"></span> QC Antibiotic Clearance
                  </div>
                  <div class="text-[#42526E] mt-0.5">LOT-2026-00128 Seabass passed all rapid nitrofurans & organoleptic panels.</div>
                  <div class="text-[10px] text-[#8993A4] mt-1">1 hour ago</div>
                </div>
                <div class="p-3 hover:bg-[#FAFBFC] cursor-pointer">
                  <div class="flex items-center gap-1.5 text-[#6554C0] font-semibold text-[11px]">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#6554C0]"></span> Export Vessel Gate-In
                  </div>
                  <div class="text-[#42526E] mt-0.5">Container ONEU-440912-8 (14 MT Black Tiger) cleared customs for Tokyo.</div>
                  <div class="text-[10px] text-[#8993A4] mt-1">3 hours ago</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tour Guide Direct Button -->
          <button id="header-direct-tour-btn" class="px-2.5 py-1 text-xs font-semibold text-[#0052CC] bg-[#DEEBFF] hover:bg-[#B3D4FF] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs" title="Start Interactive Onboarding Tour">
            <svg class="w-3.5 h-3.5 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span class="hidden sm:inline">Tour Guide</span>
          </button>

          <!-- Help / Docs Button -->
          <button id="header-help-btn" class="p-1.5 text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#EBECF0] rounded transition-colors cursor-pointer" title="ERP Help & Fishery Compliance Manual">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </button>

          <!-- User Profile Dropdown -->
          <div class="relative pl-1 border-l border-[#DFE1E6]">
            <button id="user-menu-btn" class="flex items-center gap-2 p-1 rounded hover:bg-[#EBECF0] transition-colors">
              <img src="${ERP_DATA.currentUser.avatar}" alt="Avatar" class="w-7 h-7 rounded-full object-cover ring-1 ring-[#DFE1E6]" />
              <div class="hidden lg:flex flex-col text-left">
                <span class="text-xs font-semibold text-[#172B4D] leading-tight">${ERP_DATA.currentUser.name}</span>
                <span class="text-[10px] text-[#5E6C84] leading-tight" id="user-role-badge">${ERP_DATA.currentUser.role}</span>
              </div>
              <svg class="w-3.5 h-3.5 text-[#6B778C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>

            <!-- User Menu Popup -->
            <div id="user-dropdown-menu" class="hidden absolute right-0 mt-1 w-64 bg-white rounded-md shadow-xl border border-[#DFE1E6] py-2 z-50 text-xs">
              <div class="px-3 py-2 border-b border-[#EBECF0]">
                <div class="font-bold text-[#172B4D]">${ERP_DATA.currentUser.name}</div>
                <div class="text-[11px] text-[#5E6C84]">${ERP_DATA.currentUser.email}</div>
                <div class="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#DEEBFF] text-[#0747A6] font-semibold text-[10px] rounded mt-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#0052CC]"></span>
                  ${ERP_DATA.currentUser.role}
                </div>
              </div>

              <div class="p-1 border-b border-[#EBECF0]">
                <button id="start-tour-dropdown-btn" class="w-full text-left px-3 py-2 hover:bg-[#DEEBFF] text-[#0052CC] rounded font-semibold flex items-center gap-2 transition-colors cursor-pointer">
                  <svg class="w-4 h-4 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Play Tour Guide Again
                </button>
              </div>

              <div class="p-1">
                <button id="logout-menu-btn" class="w-full text-left px-3 py-2 hover:bg-[#FFEBE6] text-[#BF2600] rounded font-medium flex items-center gap-2 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                  Sign Out / Lock Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;

    this.bindEvents();
  },

  bindEvents() {
    // Hamburger Sidebar Toggle (Collapse into Icon-Only mode instead of completely hiding)
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    if (toggleBtn) {
      toggleBtn.onclick = (e) => {
        e.stopPropagation();
        Sidebar.toggleCollapse();
      };
    }

    // Notifications Dropdown
    const notifBtn = document.getElementById('header-notifications-btn');
    const notifMenu = document.getElementById('notifications-dropdown');
    if (notifBtn && notifMenu) {
      notifBtn.onclick = (e) => {
        e.stopPropagation();
        notifMenu.classList.toggle('hidden');
      };
    }

    // User Dropdown
    const userBtn = document.getElementById('user-menu-btn');
    const userMenu = document.getElementById('user-dropdown-menu');
    if (userBtn && userMenu) {
      userBtn.onclick = (e) => {
        e.stopPropagation();
        userMenu.classList.toggle('hidden');
      };
    }

    // Close on click outside
    document.addEventListener('click', () => {
      if (notifMenu) notifMenu.classList.add('hidden');
      if (userMenu) userMenu.classList.add('hidden');
    });

    // Direct Header Tour Guide button
    const directTourBtn = document.getElementById('header-direct-tour-btn');
    if (directTourBtn) {
      directTourBtn.onclick = (e) => {
        e.stopPropagation();
        TourGuide.start(true);
      };
    }

    // Start Tour from user dropdown
    const startTourBtn = document.getElementById('start-tour-dropdown-btn');
    if (startTourBtn) {
      startTourBtn.onclick = (e) => {
        e.stopPropagation();
        if (userMenu) userMenu.classList.add('hidden');
        TourGuide.start(true);
      };
    }

    // Logout
    const logoutBtn = document.getElementById('logout-menu-btn');
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        window.location.hash = '#/login';
      };
    }

    // Help Button
    const helpBtn = document.getElementById('header-help-btn');
    if (helpBtn) {
      helpBtn.addEventListener('click', () => {
        Modal.open({
          title: 'Fisheries ERP Compliance & SOP Manual',
          size: 'lg',
          content: `
            <div class="space-y-4 text-xs">
              <div class="p-3 bg-[#DEEBFF] border border-[#B3D4FF] rounded text-[#0747A6] flex items-center justify-between">
                <div>
                  <strong>Standard Operating Procedures (SOP):</strong> Certified under USFDA Title 21 CFR Part 123 (Seafood HACCP), European Commission Regulations (EC No 853/2004), and BAP 4-Star Processing Standards.
                </div>
              </div>
              <div class="p-3.5 bg-gradient-to-r from-[#DEEBFF] via-[#EBF3FF] to-[#EAE6FF] border border-[#B3D4FF] rounded-lg flex items-center justify-between shadow-2xs">
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="font-bold text-[#0052CC] text-xs">🚀 Interactive Guided Onboarding Tour</h4>
                    <span class="lozenge lozenge-inprogress text-[10px]">4 Steps</span>
                  </div>
                  <p class="text-[#42526E] text-[11px] mt-0.5">Quick walkthrough of Department Modules, Sub-menus, Horizontal Tabs, and Smart Filters.</p>
                </div>
                <button id="modal-start-tour-btn" class="btn-primary px-3.5 py-2 rounded-lg font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <span>Play Tour Again</span>
                </button>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div class="p-3 border border-[#DFE1E6] rounded bg-[#FAFBFC]">
                  <h4 class="font-bold text-[#172B4D] mb-1">Raw Material & Antibiotic Policy</h4>
                  <p class="text-[#42526E]">All shrimp arrivals must have CAA farm registration logs. Screening for Nitrofurans (AOZ, AMOZ, SEM, AHD) & Chloramphenicol is mandatory before pre-processing.</p>
                </div>
                <div class="p-3 border border-[#DFE1E6] rounded bg-[#FAFBFC]">
                  <h4 class="font-bold text-[#172B4D] mb-1">Cold Chain Integrity</h4>
                  <p class="text-[#42526E]">Coldstore Chambers must operate at -22°C or colder with continuous telemetry logging. Export reefers must be set to -22.0°C with automated dataloggers.</p>
                </div>
              </div>
              <div class="p-3 border border-[#DFE1E6] rounded bg-[#FAFBFC]">
                <h4 class="font-bold text-[#172B4D] mb-1">Support & Hotline</h4>
                <p class="text-[#42526E]">For ERP system support or plant IT tickets, contact internal IT desk at <strong>ext 4022</strong> or email <code>erp-ops@devifisheries.com</code>.</p>
              </div>
            </div>
          `,
          footerButtons: [
            { label: 'Close', type: 'secondary', onClick: (m) => m.close() }
          ]
        });

        setTimeout(() => {
          const modalTourBtn = document.getElementById('modal-start-tour-btn');
          if (modalTourBtn) {
            modalTourBtn.addEventListener('click', () => {
              Modal.close();
              setTimeout(() => TourGuide.start(true), 150);
            });
          }
        }, 50);
      });
    }
  }
};
