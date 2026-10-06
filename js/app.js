// Master Application Controller & Router for Fisheries ERP

import { ERP_DATA } from './data/mockData.js';
import { Toast } from './components/toast.js';
import { Modal } from './components/modal.js';
import { Header } from './components/header.js';
import { Sidebar, NAV_HIERARCHY } from './components/sidebar.js';
import { Breadcrumbs } from './components/breadcrumbs.js';
import { TourGuide } from './components/tourGuide.js';

// Views
import { LoginView } from './views/loginView.js';
import { PurchaseView } from './views/purchaseView.js';
import { PreprocessingView } from './views/preprocessingView.js';
import { QCView } from './views/qcView.js';
import { ProductionView } from './views/productionView.js';
import { ColdstoreView } from './views/coldstoreView.js';
import { InventoryView } from './views/inventoryView.js';
import { SalesView } from './views/salesView.js';
import { ReportsView } from './views/reportsView.js';
import { SetupView } from './views/setupView.js';

export const App = {
  init() {
    Toast.init();
    this.bindHashChange();
    this.route();
  },

  bindHashChange() {
    window.addEventListener('hashchange', () => this.route());
  },

  route() {
    const rawHash = window.location.hash || '';
    // If explicitly on login page
    if (rawHash === '#/login' || rawHash === '#/signin' || rawHash === '#login') {
      document.getElementById('app-root').innerHTML = `<div id="login-view-container"></div>`;
      LoginView.render('login-view-container');
      return;
    }

    // If empty hash, default to main dashboard
    if (rawHash === '' || rawHash === '#' || rawHash === '#/') {
      window.location.hash = '#/purchase/dashboard/rm-dashboard';
      return;
    }

    // Ensure main ERP shell is mounted
    this.ensureShellMounted();

    // Clean hash: remove leading # and /
    const clean = rawHash.replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const moduleName = parts[0] || 'purchase';
    let submenuName = parts[1] || '';
    let tabName = parts[2] || '';

    // Auto-resolve default module, submenu, and tab if missing or shorthand
    const modObj = NAV_HIERARCHY.find(m => m.id === moduleName) || NAV_HIERARCHY[0];
    let subObj = modObj.submenus.find(s => s.id === submenuName);
    if (!subObj) {
      // Check if parts[1] was actually a tab ID under one of the submenus
      for (const sm of modObj.submenus) {
        if (sm.tabs.some(t => t.id === submenuName)) {
          subObj = sm;
          tabName = submenuName;
          submenuName = sm.id;
          break;
        }
      }
      if (!subObj) {
        subObj = modObj.submenus[0];
        submenuName = subObj.id;
      }
    }
    if (!tabName) {
      tabName = subObj.defaultTab || subObj.tabs[0]?.id || '';
    }

    const resolvedHash = `#/${modObj.id}/${subObj.id}/${tabName}`;

    // Render Navigation Sidebar & Breadcrumbs
    Sidebar.render('sidebar-container', resolvedHash);
    Breadcrumbs.render('breadcrumbs-container', resolvedHash);

    const mainContainer = 'main-content-container';

    switch (modObj.id) {
      case 'purchase':
        PurchaseView.render(mainContainer, tabName || 'rm-dashboard', resolvedHash);
        break;
      case 'preprocessing':
        PreprocessingView.render(mainContainer, tabName || 'floor-overview', resolvedHash);
        break;
      case 'quality':
        QCView.render(mainContainer, tabName || 'qc-overview', resolvedHash);
        break;
      case 'production':
        ProductionView.render(mainContainer, tabName || 'overview', resolvedHash);
        break;
      case 'coldstore':
        ColdstoreView.render(mainContainer, tabName || 'overview', resolvedHash);
        break;
      case 'inventory':
        InventoryView.render(mainContainer, tabName || 'overview', resolvedHash);
        break;
      case 'sales':
        SalesView.render(mainContainer, tabName || 'overview', resolvedHash);
        break;
      case 'reports':
        ReportsView.render(mainContainer, tabName || 'yield-reports', resolvedHash);
        break;
      case 'setup':
        SetupView.render(mainContainer, tabName || 'users', resolvedHash);
        break;
      default:
        PurchaseView.render(mainContainer, 'rm-dashboard', '#/purchase/dashboard/rm-dashboard');
        break;
    }

    // Scroll to top of main content
    const mainEl = document.getElementById(mainContainer);
    if (mainEl) mainEl.scrollTop = 0;

    // Check if Onboarding Tour should start (e.g. after login)
    if (sessionStorage.getItem('trigger_tour_on_login') === 'true') {
      sessionStorage.removeItem('trigger_tour_on_login');
      setTimeout(() => {
        TourGuide.start();
      }, 500);
    }
  },

  ensureShellMounted() {
    const existing = document.getElementById('erp-app-shell');
    if (!existing) {
      document.getElementById('app-root').innerHTML = `
        <div id="erp-app-shell" class="min-h-screen bg-[#F4F5F7]">
          <!-- Left Fixed Sidebar (Spacious 288px width to prevent dropdown cutoff) -->
          <div id="sidebar-container" class="fixed top-0 left-0 bottom-0 w-72 z-40 transition-all duration-300"></div>

          <!-- Main Layout Wrapper (offset by fixed sidebar width) -->
          <div id="main-layout-wrapper" class="ml-72 flex flex-col min-h-screen transition-all duration-300">
            <!-- Top Sticky Header -->
            <div id="header-container" class="sticky top-0 z-30 bg-white"></div>

            <!-- Breadcrumbs Bar -->
            <div class="px-6 py-2 bg-white border-b border-[#DFE1E6] flex items-center justify-between sticky top-14 z-20 shadow-2xs">
              <div id="breadcrumbs-container"></div>
            </div>

            <!-- Module Subview Injected Here (Full-Width Responsive UI) -->
            <main id="main-content-container" class="p-6 flex-1 w-full"></main>
          </div>
        </div>
      `;

      // Mount Header
      Header.render('header-container');
    }
  },

  // GLOBAL SEARCH MODAL
  openGlobalSearchModal() {
    Modal.open({
      title: 'Global Search across Fisheries ERP',
      size: 'lg',
      content: `
        <div class="space-y-4">
          <!-- Search Input -->
          <div class="relative">
            <input 
              type="text" 
              id="modal-global-search-input" 
              placeholder="Type Lot number, Arrival No, Booking PB, Supplier, Bill No..." 
              autofocus 
              class="w-full text-sm pl-10 pr-4 py-2.5 bg-[#FAFBFC] border-2 border-[#0052CC] rounded-lg focus:outline-none"
            />
            <svg class="w-5 h-5 text-[#0052CC] absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>

          <!-- Dynamic Search Results -->
          <div id="global-search-results" class="max-h-96 overflow-y-auto space-y-4 text-xs">
            ${this.renderInitialSearchResults()}
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close (Esc)', type: 'secondary', onClick: (m) => m.close() }
      ]
    });

    setTimeout(() => {
      const input = document.getElementById('modal-global-search-input');
      const resultsContainer = document.getElementById('global-search-results');
      if (input && resultsContainer) {
        input.focus();
        input.addEventListener('input', (e) => {
          resultsContainer.innerHTML = this.performGlobalSearch(e.target.value);
          this.bindSearchResultClicks();
        });
      }
      this.bindSearchResultClicks();
    }, 50);
  },

  renderInitialSearchResults() {
    return `
      <div>
        <div class="text-[10px] font-bold text-[#6B778C] uppercase tracking-wider mb-2">Suggested Quick Searches</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button class="search-preset-btn p-2 bg-[#FAFBFC] hover:bg-[#DEEBFF] border border-[#DFE1E6] rounded text-left transition-colors" data-term="LOT-2026">
            <span class=" font-bold text-[#0052CC]">LOT-2026-00125</span>
            <div class="text-[10px] text-[#5E6C84]">Vannamei Shrimp Traceability</div>
          </button>
          <button class="search-preset-btn p-2 bg-[#FAFBFC] hover:bg-[#DEEBFF] border border-[#DFE1E6] rounded text-left transition-colors" data-term="RMA-2026">
            <span class=" font-bold text-[#36B37E]">RMA-2026-00341</span>
            <div class="text-[10px] text-[#5E6C84]">Today's Fresh Dock Arrival</div>
          </button>
          <button class="search-preset-btn p-2 bg-[#FAFBFC] hover:bg-[#DEEBFF] border border-[#DFE1E6] rounded text-left transition-colors" data-term="BILL-2026">
            <span class=" font-bold text-[#6554C0]">BILL-2026-118</span>
            <div class="text-[10px] text-[#5E6C84]">Godavari Aqua Invoice</div>
          </button>
        </div>
      </div>
    `;
  },

  performGlobalSearch(term) {
    if (!term || term.trim() === '') {
      return this.renderInitialSearchResults();
    }

    const t = term.toLowerCase();

    // Search in Lots
    const matchingLots = ERP_DATA.lots.filter(l => 
      l.lotNumber.toLowerCase().includes(t) || 
      l.species.toLowerCase().includes(t) || 
      l.supplierName.toLowerCase().includes(t)
    );

    // Search in Arrivals
    const matchingArrivals = ERP_DATA.rmArrivals.filter(a => 
      a.arrivalNumber.toLowerCase().includes(t) || 
      a.supplierName.toLowerCase().includes(t) || 
      a.vehicleNumber.toLowerCase().includes(t)
    );

    // Search in Supplier Bills
    const matchingBills = ERP_DATA.supplierBills.filter(b => 
      b.billNo.toLowerCase().includes(t) || 
      b.supplierName.toLowerCase().includes(t)
    );

    let html = '';

    if (matchingLots.length > 0) {
      html += `
        <div>
          <div class="text-[10px] font-bold text-[#0052CC] uppercase tracking-wider mb-1">Purchase Lots (${matchingLots.length})</div>
          <div class="divide-y divide-[#EBECF0] border border-[#DFE1E6] rounded-lg overflow-hidden bg-white">
            ${matchingLots.map(l => `
              <div class="p-2.5 hover:bg-[#FAFBFC] flex items-center justify-between cursor-pointer search-result-item" data-action="trace-lot" data-key="${l.lotNumber}">
                <div>
                  <div class=" font-bold text-[#0052CC]">${l.lotNumber} - ${l.species}</div>
                  <div class="text-[11px] text-[#5E6C84]">${l.supplierName} • Landing: ${l.landingSource}</div>
                </div>
                <div class="text-right">
                  <div class=" font-bold text-[#172B4D]">${l.receivedQtyKg.toLocaleString()} KG</div>
                  <span class="lozenge lozenge-success text-[10px]">${l.lotStatus}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (matchingArrivals.length > 0) {
      html += `
        <div>
          <div class="text-[10px] font-bold text-[#36B37E] uppercase tracking-wider mb-1">Raw Material Arrivals (${matchingArrivals.length})</div>
          <div class="divide-y divide-[#EBECF0] border border-[#DFE1E6] rounded-lg overflow-hidden bg-white">
            ${matchingArrivals.map(a => `
              <div class="p-2.5 hover:bg-[#FAFBFC] flex items-center justify-between cursor-pointer search-result-item" data-action="nav" data-hash="#/purchase/operations/rm-arrivals">
                <div>
                  <div class=" font-bold text-[#36B37E]">${a.arrivalNumber} - ${a.species}</div>
                  <div class="text-[11px] text-[#5E6C84]">${a.supplierName} • Vehicle: ${a.vehicleNumber}</div>
                </div>
                <div class="text-right">
                  <div class=" font-bold text-[#172B4D]">${a.netWeightKg.toLocaleString()} KG</div>
                  <span class="lozenge lozenge-inprogress text-[10px]">${a.receivingStatus}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (matchingBills.length > 0) {
      html += `
        <div>
          <div class="text-[10px] font-bold text-[#6554C0] uppercase tracking-wider mb-1">Supplier Bills (${matchingBills.length})</div>
          <div class="divide-y divide-[#EBECF0] border border-[#DFE1E6] rounded-lg overflow-hidden bg-white">
            ${matchingBills.map(b => `
              <div class="p-2.5 hover:bg-[#FAFBFC] flex items-center justify-between cursor-pointer search-result-item" data-action="nav" data-hash="#/purchase/transactions-bills/supplier-bills">
                <div>
                  <div class=" font-bold text-[#6554C0]">${b.billNo} - ${b.supplierName}</div>
                  <div class="text-[11px] text-[#5E6C84]">Lot: ${b.lotNumber} • Due: ${b.dueDate}</div>
                </div>
                <div class="text-right">
                  <div class=" font-bold text-[#006644]">₹ ${b.totalAmountInr.toLocaleString()}</div>
                  <span class="lozenge lozenge-warning text-[10px]">${b.status}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (html === '') {
      html = `
        <div class="text-center py-8 text-[#6B778C]">
          No ERP records matched "<strong>${term}</strong>". Try searching for <code>LOT</code>, <code>RMA</code>, or <code>GODAVARI</code>.
        </div>
      `;
    }

    return html;
  },

  bindSearchResultClicks() {
    document.querySelectorAll('.search-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const term = btn.dataset.term;
        const input = document.getElementById('modal-global-search-input');
        if (input) {
          input.value = term;
          input.dispatchEvent(new Event('input'));
        }
      });
    });

    document.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const action = item.dataset.action;
        Modal.close();

        if (action === 'trace-lot') {
          const lotKey = item.dataset.key;
          const lot = ERP_DATA.lots.find(l => l.lotNumber === lotKey);
          if (lot) {
            window.location.hash = '#/purchase/operations/lot-tracking';
            setTimeout(() => PurchaseView.showLotTraceabilityDrawer(lot), 200);
          }
        } else if (action === 'nav') {
          const hash = item.dataset.hash;
          if (hash) window.location.hash = hash;
        }
      });
    });
  }
};

// Auto boot on DOM load or immediately if already ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
