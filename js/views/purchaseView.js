// Real-World Production Fisheries ERP Purchase Dashboard & CRUD Operations

import { ERP_DATA } from '../data/mockData.js';
import { DataTable } from '../components/table.js';
import { Charts } from '../components/charts.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';
import { TabBar } from '../components/tabBar.js';
import { Skeleton } from '../components/skeleton.js';

export const PurchaseView = {
  // Store local state for CRUD & filter presets
  activePeriod: 'FY 2026-2027',
  activePriceCount: '80',

  commercialRates: [
    { id: 'CR-01', species: 'Vannamei Shrimp', count: '16/20 pcs/lb', rateInr: 440, rateUsd: 5.30, effectiveDate: '2026-10-01', status: 'ACTIVE' },
    { id: 'CR-02', species: 'Vannamei Shrimp', count: '21/25 pcs/lb', rateInr: 410, rateUsd: 4.95, effectiveDate: '2026-10-01', status: 'ACTIVE' },
    { id: 'CR-03', species: 'Vannamei Shrimp', count: '26/30 pcs/lb', rateInr: 380, rateUsd: 4.60, effectiveDate: '2026-10-01', status: 'ACTIVE' },
    { id: 'CR-04', species: 'Black Tiger Shrimp', count: '16/20 pcs/lb', rateInr: 620, rateUsd: 7.50, effectiveDate: '2026-10-01', status: 'ACTIVE' },
    { id: 'CR-05', species: 'Asian Seabass', count: '500-800 g/pc', rateInr: 320, rateUsd: 3.85, effectiveDate: '2026-10-01', status: 'ACTIVE' }
  ],

  bookingsList: [
    { bookingNo: 'PB-2026-089', supplier: 'Godavari Coastal Aqua Farms', pond: 'Pond #4B & 5A', species: 'Vannamei Shrimp', bookedQty: 2000, expectedDate: '2026-10-04', advancePaid: '$ 3,000', status: 'FULFILLED' },
    { bookingNo: 'PB-2026-092', supplier: 'Sagar Marine Hatcheries & Cultivators', pond: 'Kakinada Bay Cage 1', species: 'Black Tiger Shrimp', bookedQty: 3500, expectedDate: '2026-10-03', advancePaid: '$ 5,000', status: 'FULFILLED' },
    { bookingNo: 'PB-2026-095', supplier: 'Krishna Delta Prawn Harvesters', pond: 'Cluster #9', species: 'Vannamei Shrimp', bookedQty: 4000, expectedDate: '2026-10-05', advancePaid: '$ 4,500', status: 'FULFILLED' },
    { bookingNo: 'PB-2026-102', supplier: 'Godavari Coastal Aqua Farms', pond: 'Pond #14', species: 'Vannamei Shrimp', bookedQty: 3200, expectedDate: '2026-10-08', advancePaid: '$ 0', status: 'CONFIRMED' }
  ],

  commercialTxns: [
    { txnId: 'CTX-2026-0041', date: '2026-10-04', supplier: 'Godavari Coastal Aqua Farms', description: 'Raw Material Harvest Intake Lot LOT-2026-00125', amountUsd: 9156, amountInr: 760000, type: 'PURCHASE_PAYABLE', status: 'POSTED' },
    { txnId: 'CTX-2026-0040', date: '2026-10-03', supplier: 'Sagar Marine Hatcheries', description: 'Black Tiger Harvest Booking PB-2026-092 Advance', amountUsd: 5000, amountInr: 415000, type: 'ADVANCE_PAID', status: 'POSTED' },
    { txnId: 'CTX-2026-0039', date: '2026-10-01', supplier: 'Krishna Delta Prawn Harvesters', description: 'Ice & Crate Transportation Settlement', amountUsd: 820, amountInr: 68060, type: 'LOGISTICS_FEE', status: 'CLEARED' }
  ],

  paymentsList: [
    { voucherNo: 'PAY-2026-051', paymentDate: '2026-10-04', supplierName: 'Godavari Coastal Aqua Farms', billNo: 'BILL-2026-118', bankRef: 'HDFC-RTGS-990184', amountInr: 380000, amountUsd: 4578, paymentMode: 'RTGS / Bank Wire', status: 'COMPLETED' },
    { voucherNo: 'PAY-2026-048', paymentDate: '2026-10-02', supplierName: 'Sagar Marine Hatcheries', billNo: 'BILL-2026-117', bankRef: 'SBI-NEFT-440192', amountInr: 1085000, amountUsd: 13072, paymentMode: 'NEFT', status: 'COMPLETED' },
    { voucherNo: 'PAY-2026-042', paymentDate: '2026-09-30', supplierName: 'Krishna Delta Prawn Harvesters', billNo: 'BILL-2026-115', bankRef: 'ICICI-IMPS-889102', amountInr: 1512000, amountUsd: 18216, paymentMode: 'Direct Bank Transfer', status: 'COMPLETED' }
  ],

  centersList: [
    { centerName: 'Bhimavaram Center #1', code: 'BVM-C1', plant: 'DFL UNIT-5 (JPT)', totalLots: 38, totalQtyKg: 40200, yieldPct: 69.4, avgRateInr: 385 },
    { centerName: 'Kakinada Sea Intake #2', code: 'KKD-C2', plant: 'DFL UNIT-3 (PSP)', totalLots: 28, totalQtyKg: 27150, yieldPct: 69.1, avgRateInr: 410 },
    { centerName: 'Amalapuram Harvesters #4', code: 'AML-C4', plant: 'DFL UNIT-6 (JPT-II)', totalLots: 22, totalQtyKg: 22500, yieldPct: 68.8, avgRateInr: 375 },
    { centerName: 'Machilipatnam Delta #3', code: 'MCN-C3', plant: 'DFL UNIT-4 (PND)', totalLots: 20, totalQtyKg: 20100, yieldPct: 69.8, avgRateInr: 390 },
    { centerName: 'Ongole Coastal Hub #1', code: 'ONG-C1', plant: 'DFL UNIT-2 (KKD)', totalLots: 16, totalQtyKg: 16050, yieldPct: 69.2, avgRateInr: 380 },
    { centerName: 'Visakhapatnam Gate Dock', code: 'VSP-D1', plant: 'DFL UNIT-1 (VSP)', totalLots: 14, totalQtyKg: 13200, yieldPct: 70.1, avgRateInr: 420 }
  ],

  purchaseReportsList: [
    { id: 'RPT-01', title: 'Purchase Report', desc: 'Item-wise purchase details', icon: '📄', color: 'bg-[#DEEBFF] text-[#0052CC]' },
    { id: 'RPT-02', title: 'Count-wise Report', desc: 'Purchase by count/size', icon: '#️⃣', color: 'bg-[#E6FCFF] text-[#008DA6]' },
    { id: 'RPT-03', title: 'Center-wise Report', desc: 'Purchase by center', icon: '🏢', color: 'bg-[#FFF0B3] text-[#8f4d00]' },
    { id: 'RPT-04', title: 'Supplier-wise Report', desc: 'Purchase by supplier', icon: '👥', color: 'bg-[#E3FCEF] text-[#006644]' },
    { id: 'RPT-05', title: 'Purchase Abstract', desc: 'Center-wise abstract', icon: '📑', color: 'bg-[#EAE6FF] text-[#403294]' },
    { id: 'RPT-06', title: 'Date-wise Report', desc: 'Purchase by date', icon: '📅', color: 'bg-[#FFEBE6] text-[#BF2600]' },
    { id: 'RPT-07', title: 'Bill-wise Report', desc: 'Supplier/center bills', icon: '📋', color: 'bg-[#FFF0B3] text-[#8f4d00]' },
    { id: 'RPT-08', title: 'Monthly Report', desc: 'Month-wise purchase', icon: '🗓️', color: 'bg-[#E3FCEF] text-[#006644]' },
    { id: 'RPT-09', title: 'Payment Report', desc: 'Payment date-wise', icon: '💳', color: 'bg-[#FFEBE6] text-[#BF2600]' },
    { id: 'RPT-10', title: 'Purchase Supplier-wise', desc: 'Supplier-wise purchase', icon: '👤', color: 'bg-[#DEEBFF] text-[#0052CC]' },
    { id: 'RPT-11', title: 'Supplier Bill-wise', desc: 'Supplier bill details', icon: '🧾', color: 'bg-[#EAE6FF] text-[#403294]' },
    { id: 'RPT-12', title: 'Supplier Ledger', desc: 'Ledger report', icon: '📖', color: 'bg-[#E3FCEF] text-[#006644]' },
    { id: 'RPT-13', title: 'TDS Report', desc: 'TDS deduction report', icon: '🏷️', color: 'bg-[#FFF0B3] text-[#8f4d00]' },
    { id: 'RPT-14', title: 'RM Arrival', desc: 'Overall RM arrival', icon: '🚚', color: 'bg-[#EAE6FF] text-[#403294]' },
    { id: 'RPT-15', title: 'Agent Commission', desc: 'Agent commission report', icon: '💼', color: 'bg-[#DEEBFF] text-[#0052CC]' }
  ],

  render(containerId, subPage = 'rm-dashboard', activeHash = '#/purchase/dashboard/rm-dashboard') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Render On-Screen Tabs Header
    container.innerHTML = `
      <div id="purchase-tab-bar-container"></div>
      <div id="purchase-subpage-content"></div>
    `;

    TabBar.render('purchase-tab-bar-container', activeHash);
    const subContainer = document.getElementById('purchase-subpage-content');

    // Display instant Skeleton Shimmer Placeholder matching the target tab
    if (subPage === 'rm-dashboard') {
      subContainer.innerHTML = Skeleton.renderDashboard();
    } else if (subPage === 'commercial-dashboard') {
      subContainer.innerHTML = Skeleton.renderReportsGrid();
    } else {
      subContainer.innerHTML = Skeleton.renderTable(6, 6);
    }

    // Smoothly transition into loaded data
    setTimeout(() => {
      switch (subPage) {
        // 1. Sub Menu: Dashboard
        case 'rm-dashboard':
          this.renderRMDashboard(subContainer);
          break;
        case 'commercial-dashboard':
          this.renderCommercialDashboard(subContainer);
          break;

        // 2. Sub Menu: Operations
        case 'lot-tracking':
          this.renderLotTracking(subContainer);
          break;
        case 'bookings':
          this.renderBookings(subContainer);
          break;
        case 'rm-arrivals':
          this.renderRMArrivals(subContainer);
          break;

        // 3. Sub Menu: Transactions & Bills
        case 'supplier-bills':
          this.renderSupplierBills(subContainer);
          break;
        case 'commercial-txns':
          this.renderCommercialTransactions(subContainer);
          break;

        // 4. Sub Menu: Payments
        case 'payment-summary':
          this.renderPaymentSummary(subContainer);
          break;
        case 'bill-date-payment':
          this.renderBillDatePayment(subContainer);
          break;

        default:
          this.renderRMDashboard(subContainer);
          break;
      }
    }, 140);
  },

  // =========================================================================
  // SUB MENU: DASHBOARD -> TAB 1: RAW MATERIAL DASHBOARD (COMPLETE USER DESIGN)
  // =========================================================================
  renderRMDashboard(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        
        <!-- Main Dashboard Header Card with Collapsible Filters -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center justify-between pb-3 border-b border-[#EBECF0]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D]">Search &amp; Filters</h3>
            </div>

            <!-- Filter Controls: Reset & Toggle Open/Close -->
            <div class="flex items-center gap-2">
              <button type="button" onclick="const s = document.querySelectorAll('#rm-filter-body select'); s.forEach(sel => sel.selectedIndex = 0); Toast.show('Filters reset', 'info');" class="text-xs font-semibold text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#F4F5F7] px-2.5 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-colors cursor-pointer" title="Reset all filters">
                <svg class="w-3.5 h-3.5 text-[#6B778C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Reset</span>
              </button>

              <button type="button" onclick="const b = document.getElementById('rm-filter-body'); const t = this.querySelector('.rm-toggle-text'); const ic = this.querySelector('svg'); b.classList.toggle('hidden'); if(b.classList.contains('hidden')){ t.innerText='Show Filter'; ic.classList.add('-rotate-90'); this.className='text-xs font-semibold text-[#5E6C84] bg-[#FAFBFC] hover:bg-[#EBECF0] px-3 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer'; } else { t.innerText='Hide Filter'; ic.classList.remove('-rotate-90'); this.className='text-xs font-semibold text-[#0052CC] bg-[#DEEBFF]/80 hover:bg-[#DEEBFF] px-3 py-1.5 rounded border border-[#B3D4FF] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer'; }" class="text-xs font-semibold text-[#0052CC] bg-[#DEEBFF]/80 hover:bg-[#DEEBFF] px-3 py-1.5 rounded border border-[#B3D4FF] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer">
                <svg class="w-3.5 h-3.5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                <span class="rm-toggle-text">Hide Filter</span>
              </button>
            </div>
          </div>

          <!-- Collapsible Filter Inputs Grid -->
          <div id="rm-filter-body" class="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs transition-all duration-200">
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SPECIES</label>
              <select class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option>All Species (Select)</option>
                <option selected>Vannamei (VM)</option>
                <option>Black Tiger (BT)</option>
                <option>Asian Seabass</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">CENTER</label>
              <select class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option>All Centers (Select)</option>
                <option>Bhimavaram Center #1</option>
                <option>Kakinada Sea Intake #2</option>
                <option>Amalapuram Harvesters #4</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">PLANT</label>
              <select class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option>All Plants (Select)</option>
                <option>DFL UNIT-5 (JPT)</option>
                <option>DFL UNIT-3 (PSP)</option>
                <option>DFL UNIT-6 (JPT-II)</option>
                <option>DFL UNIT-4 (PND)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">FROM DATE</label>
              <input type="text" value="${new Date().toLocaleDateString('en-GB')}" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">TO DATE</label>
              <input type="text" value="${new Date().toLocaleDateString('en-GB')}" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>

            <div class="flex items-end gap-2">
              <button onclick="Toast.show('Dashboard filters applied successfully', 'info');" class="btn-primary w-full py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 4 Color-Coded Main KPI Cards from Screenshot 1 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <!-- 1. Total Quantity (Blue) -->
          <div class="bg-gradient-to-r from-[#DEEBFF]/80 to-white border border-[#B3D4FF] rounded-xl p-4 shadow-xs flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-[#0052CC] uppercase tracking-wider">TOTAL QUANTITY</span>
              <div class="text-2xl font-black text-[#172B4D] mt-1 ">142,500 <span class="text-sm font-normal text-[#5E6C84]">Kg</span></div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#B3D4FF]/60 flex items-center justify-center text-[#0052CC]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
            </div>
          </div>

          <!-- 2. Head On Qty (Green) -->
          <div class="bg-gradient-to-r from-[#E3FCEF]/80 to-white border border-[#ABF5D1] rounded-xl p-4 shadow-xs flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-[#006644] uppercase tracking-wider">HEAD ON QTY</span>
              <div class="text-2xl font-black text-[#172B4D] mt-1 ">142,500 <span class="text-sm font-normal text-[#5E6C84]">Kg</span></div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#ABF5D1]/60 flex items-center justify-center text-[#006644]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
            </div>
          </div>

          <!-- 3. Damage Weight (Red) -->
          <div class="bg-gradient-to-r from-[#FFEBE6]/80 to-white border border-[#FFBDAD] rounded-xl p-4 shadow-xs flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-[#BF2600] uppercase tracking-wider">DAMAGE WEIGHT</span>
              <div class="text-2xl font-black text-[#BF2600] mt-1 ">1,250 <span class="text-sm font-normal text-[#5E6C84]">Kg</span></div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#FFBDAD]/60 flex items-center justify-center text-[#BF2600]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
          </div>

          <!-- 4. Pending Production (Yellow) -->
          <div class="bg-gradient-to-r from-[#FFF0B3]/80 to-white border border-[#FFE380] rounded-xl p-4 shadow-xs flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-[#8f4d00] uppercase tracking-wider">PENDING PRODUCTION</span>
              <div class="text-2xl font-black text-[#8f4d00] mt-1 ">48,200 <span class="text-sm font-normal text-[#5E6C84]">Kg</span></div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#FFE380]/60 flex items-center justify-center text-[#8f4d00]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
          </div>
        </div>

        <!-- Section 1 Charts from Screenshot 1: Sum of QTY by SPECIES & Sum of QTY by PLANT -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div class="lg:col-span-4 bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-xs">
            <h3 class="font-bold text-sm text-[#172B4D] mb-3">Sum of QTY by SPECIES</h3>
            <div class="h-64">
              <canvas id="chart-sum-qty-species"></canvas>
            </div>
          </div>

          <div class="lg:col-span-8 bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-xs">
            <h3 class="font-bold text-sm text-[#172B4D] mb-3">Sum of QTY by PLANT</h3>
            <div class="h-64">
              <canvas id="chart-sum-qty-plant"></canvas>
            </div>
          </div>
        </div>

        <!-- Section 2 Charts from Screenshot 2: Production Details & Pending Production Details -->
        <div class="grid grid-cols-1 gap-4">
          <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-xs">
            <div class="flex items-center justify-between mb-2">
              <div>
                <h3 class="font-bold text-sm text-[#172B4D]">Production Details</h3>
                <p class="text-xs text-[#6B778C]">Production quantity and composition by category</p>
              </div>
            </div>
            <div class="h-56">
              <canvas id="chart-production-composition"></canvas>
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-xs">
            <div class="flex items-center justify-between mb-2">
              <div>
                <h3 class="font-bold text-sm text-[#172B4D]">Pending Production Details</h3>
                <p class="text-xs text-[#6B778C]">Remaining unpeeled and un-frozen production across plants</p>
              </div>
            </div>
            <div class="h-56">
              <canvas id="chart-pending-production-plants"></canvas>
            </div>
          </div>
        </div>

        <!-- Section 3 from Screenshot 3: Time Vs Price Analysis + Abstract Cards -->
        <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-xs space-y-4">
          <div class="flex items-center justify-between flex-wrap gap-2 border-b border-[#EBECF0] pb-3">
            <div>
              <h3 class="font-bold text-base text-[#172B4D]">Time Vs Price Analysis</h3>
              <p class="text-xs text-[#6B778C]">Daily trend curves across count sizes (80, 90, 100 counts/kg)</p>
            </div>
            
            <!-- Count Size Pills from Screenshot 3 -->
            <div class="flex items-center gap-1 overflow-x-auto text-[11px]  py-1">
              ${['20', '20.5', '21', '22', '23', '24', '24.5', '25', '26', '27', '28', '29', '30', '31', '32', '32.5', '33', '34'].map(cnt => `
                <button class="px-2 py-0.5 rounded border border-[#DFE1E6] bg-[#FAFBFC] hover:bg-[#DEEBFF] text-[#172B4D]">${cnt}</button>
              `).join('')}
              <button class="btn-primary px-3 py-1 rounded text-xs ml-2 font-semibold">View current prices</button>
            </div>
          </div>

          <div class="h-64">
            <canvas id="chart-time-vs-price"></canvas>
          </div>

          <!-- Bottom Split Cards from Screenshot 3: Purchase Abstract & RM Arrival Summary -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-3 border-t border-[#EBECF0]">
            <!-- Purchase Abstract Card -->
            <div class="bg-[#FAFBFC] p-4 rounded-lg border border-[#DFE1E6]">
              <h4 class="font-bold text-xs text-[#172B4D] uppercase tracking-wider mb-3">Purchase Abstract</h4>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="bg-white p-2.5 rounded border border-[#EBECF0]">
                  <span class="text-[#6B778C] text-[11px]">HONV QTY</span>
                  <div class=" font-bold text-sm text-[#0052CC] mt-0.5">138,500 KG</div>
                </div>
                <div class="bg-white p-2.5 rounded border border-[#EBECF0]">
                  <span class="text-[#6B778C] text-[11px]">HONV VALUE</span>
                  <div class=" font-bold text-sm text-[#006644] mt-0.5">₹ 5,26,30,000</div>
                </div>
                <div class="bg-white p-2.5 rounded border border-[#EBECF0]">
                  <span class="text-[#6B778C] text-[11px]">HONBT QTY</span>
                  <div class=" font-bold text-sm text-[#6554C0] mt-0.5">4,000 KG</div>
                </div>
                <div class="bg-white p-2.5 rounded border border-[#EBECF0]">
                  <span class="text-[#6B778C] text-[11px]">HONBT VALUE</span>
                  <div class=" font-bold text-sm text-[#006644] mt-0.5">₹ 24,80,000</div>
                </div>
              </div>
            </div>

            <!-- RM Arrival Summary Card -->
            <div class="bg-[#FAFBFC] p-4 rounded-lg border border-[#DFE1E6]">
              <h4 class="font-bold text-xs text-[#172B4D] uppercase tracking-wider mb-3">RM Arrival Summary</h4>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="bg-white p-2.5 rounded border border-[#EBECF0]">
                  <span class="text-[#6B778C] text-[11px]">TOTAL QTY (KG)</span>
                  <div class=" font-bold text-base text-[#0052CC] mt-0.5">142,500 KG</div>
                </div>
                <div class="bg-white p-2.5 rounded border border-[#EBECF0]">
                  <span class="text-[#6B778C] text-[11px]">TOTAL VALUE (INR / USD)</span>
                  <div class=" font-bold text-base text-[#006644] mt-0.5">₹ 5.51 Cr <span class="text-xs text-[#5E6C84]">($664k)</span></div>
                </div>
              </div>
              <div class="mt-3 p-2 bg-[#DEEBFF] text-[#0747A6] rounded text-[11px] flex justify-between items-center font-medium">
                <span>Avg Processing Yield: <strong>69.37%</strong></span>
                <span>Active Supplier Centers: <strong>6 Units</strong></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: Top 10 Centers by Total Quantity Table -->
        <div class="bg-white p-4 rounded-xl border border-[#DFE1E6] shadow-xs">
          <div class="flex items-center justify-between mb-3">
            <div>
              <h3 class="font-bold text-sm text-[#172B4D]">Quantity by Center</h3>
              <p class="text-[11px] text-[#6B778C]">Top procurement centers ranked by intake volume</p>
            </div>
            <a href="#/purchase/operations/rm-arrivals" class="text-xs font-semibold text-[#0052CC] hover:underline">View All Arrivals →</a>
          </div>
          <div id="rm-top-centers-table"></div>
        </div>

      </div>
    `;

    // Render all real-world charts
    setTimeout(() => {
      // 1. Sum of QTY by SPECIES
      Charts.renderBarChart(
        'chart-sum-qty-species',
        ['Vannamei (VM)', 'Black Tiger (BT)'],
        [{
          label: 'Quantity (KG)',
          data: [138500, 4000],
          backgroundColor: '#5C6BC0',
          borderRadius: 4
        }],
        {
          scales: {
            y: {
              beginAtZero: true,
              max: 150000,
              ticks: { stepSize: 30000 }
            }
          }
        }
      );

      // 2. Sum of QTY by PLANT (Units 1 to 6)
      Charts.renderBarChart(
        'chart-sum-qty-plant',
        [
          'DFL UNIT-5 (JPT)',
          'DFL UNIT-3 (PSP)',
          'DFL UNIT-6 (JPT-II)',
          'DFL UNIT-4 (PND)',
          'DFL UNIT-2 (KKD)',
          'DFL UNIT-1 (VSP)'
        ],
        [{
          label: 'Intake Quantity (KG)',
          data: [40000, 27000, 22500, 20000, 16000, 13200],
          backgroundColor: '#80DEEA',
          borderRadius: 4
        }],
        {
          scales: {
            y: {
              beginAtZero: true,
              max: 40000,
              ticks: { stepSize: 10000 }
            }
          }
        }
      );

      // 3. Production Composition Multi-Series
      Charts.renderBarChart(
        'chart-production-composition',
        ['Intake Batch #1', 'Intake Batch #2', 'Intake Batch #3', 'Intake Batch #4', 'Intake Batch #5'],
        [
          { label: 'HeadOn Qty (T)', data: [45, 38, 42, 35, 40], backgroundColor: '#2196F3' },
          { label: 'Grading Qty (T)', data: [43, 37, 40, 34, 38], backgroundColor: '#4CAF50' },
          { label: 'VaOut Qty (T)', data: [28, 24, 27, 22, 26], backgroundColor: '#FF9800' },
          { label: 'SoakOut Qty (T)', data: [29, 25, 28, 23, 27], backgroundColor: '#E91E63' },
          { label: 'Freezing Qty (T)', data: [29, 25, 28, 23, 27], backgroundColor: '#9C27B0' }
        ]
      );

      // 4. Pending Production Across Plants
      Charts.renderBarChart(
        'chart-pending-production-plants',
        ['DFL Unit-5', 'DFL Unit-3', 'DFL Unit-6', 'DFL Unit-4', 'DFL Unit-2', 'DFL Unit-1'],
        [{
          label: 'Pending Unprocessed (Tons)',
          data: [14.2, 10.5, 8.8, 6.2, 5.0, 3.5],
          backgroundColor: '#FFAB00',
          borderRadius: 4
        }]
      );

      // 5. Time Vs Price Spline Chart from Screenshot 3
      Charts.renderLineChart(
        'chart-time-vs-price',
        ['2026-09-05', '2026-09-06', '2026-09-10', '2026-09-11', '2026-09-13', '2026-09-16', '2026-09-17', '2026-09-18', '2026-09-20', '2026-09-24', '2026-09-26', '2026-09-27', '2026-10-04'],
        [
          { label: 'Count 80 (₹/KG)', data: [310, 305, 310, 315, 300, 310, 310, 310, 310, 310, 310, 310, 320], borderColor: '#2196F3', fill: false },
          { label: 'Count 90 (₹/KG)', data: [280, 280, 280, 280, 280, 285, 285, 285, 280, 285, 285, 285, 290], borderColor: '#4CAF50', fill: false },
          { label: 'Count 100 (₹/KG)', data: [270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 280], borderColor: '#FF9800', fill: false }
        ],
        {
          scales: {
            y: {
              min: 260,
              max: 330,
              ticks: { stepSize: 10 }
            }
          }
        }
      );
    }, 50);

    // Quantity by Center Table
    new DataTable({
      containerId: 'rm-top-centers-table',
      data: this.centersList,
      keyField: 'code',
      pageSize: 6,
      searchable: false,
      exportable: true,
      hideTopFilterBar: true,
      columns: [
        { field: 'code', header: 'Center Code', render: (v) => `<span class=" font-bold text-[#0052CC]">${v}</span>` },
        { field: 'centerName', header: 'Center Name', render: (v) => `<span class="font-semibold text-[#172B4D]">${v}</span>` },
        { field: 'plant', header: 'Mapped Plant Facility' },
        { field: 'totalLots', header: 'Lots Supplied', render: (v) => `<span class=" font-bold">${v} Lots</span>` },
        { field: 'totalQtyKg', header: 'Total Qty (KG)', render: (v) => `<span class=" font-bold text-[#006644]">${v.toLocaleString()} KG</span>` },
        { field: 'yieldPct', header: 'Avg Yield %', render: (v) => `<span class="font-bold text-[#0052CC] ">${v}%</span>` },
        { field: 'avgRateInr', header: 'Avg Rate (INR)', render: (v) => `<span class="">₹ ${v}/KG</span>` }
      ]
    });
  },

  // =========================================================================
  // SUB MENU: DASHBOARD -> TAB 2: COMMERCIAL DASHBOARD + PURCHASE REPORTS GRID
  // =========================================================================
  renderCommercialDashboard(container) {
    container.innerHTML = `
      <div class="space-y-5 animate-fade-in">
        <!-- Purchase Reports Grid matching Screenshot 4 -->
        <div class="bg-white p-5 rounded-xl border border-[#DFE1E6] shadow-xs">
          <h2 class="text-base font-extrabold text-[#172B4D] mb-4 flex items-center gap-2 border-b border-[#EBECF0] pb-2.5">
            <span>Purchase Reports</span>
            <span class="lozenge lozenge-purple text-[10px]">15 Report Extractors Active</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            ${this.purchaseReportsList.map(rpt => `
              <div 
                class="purchase-report-card bg-[#FAFBFC] hover:bg-white border border-[#DFE1E6] hover:border-[#0052CC] p-3.5 rounded-lg transition-all shadow-2xs hover:shadow cursor-pointer flex flex-col justify-between group"
                data-report-title="${rpt.title}"
              >
                <div>
                  <div class="w-8 h-8 rounded-md ${rpt.color} flex items-center justify-center text-sm font-bold mb-2 shadow-2xs">
                    ${rpt.icon}
                  </div>
                  <h4 class="font-bold text-xs text-[#172B4D] group-hover:text-[#0052CC] transition-colors leading-tight">${rpt.title}</h4>
                  <p class="text-[10px] text-[#6B778C] mt-1 leading-snug">${rpt.desc}</p>
                </div>
                <div class="mt-3 pt-2 border-t border-[#EBECF0] flex items-center justify-between text-[10px] text-[#0052CC] font-semibold opacity-80 group-hover:opacity-100">
                  <span>Generate Extract</span>
                  <span>→</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Commercial Benchmark CRUD Table -->
        <div id="commercial-rates-table-container"></div>
      </div>
    `;

    const ratesTable = new DataTable({
      containerId: 'commercial-rates-table-container',
      data: this.commercialRates,
      keyField: 'id',
      tableTitle: 'Active Species & Count-Wise Procurement Price Benchmarks (CRUD)',
      columns: [
        { field: 'id', header: 'Rate ID', render: (v) => `<span class=" font-bold text-[#0052CC]">${v}</span>` },
        { field: 'species', header: 'Species' },
        { field: 'count', header: 'Count / Grade' },
        { field: 'rateInr', header: 'Benchmark Rate (INR)', render: (v) => `<span class="font-bold">₹ ${v} / KG</span>` },
        { field: 'rateUsd', header: 'USD Equivalent', render: (v) => `<span class=" text-[#006644] font-bold">$ ${v.toFixed(2)}</span>` },
        { field: 'effectiveDate', header: 'Effective Date' },
        { field: 'status', header: 'Status', type: 'status' }
      ],
      actions: [
        {
          label: 'Edit',
          icon: `<svg class="w-4 h-4 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
          onClick: (row) => PurchaseView.openEditCommercialRateModal(row, ratesTable)
        },
        {
          label: 'Delete',
          icon: `<svg class="w-4 h-4 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
          onClick: (row) => PurchaseView.deleteCommercialRate(row, ratesTable)
        }
      ]
    });

    // Report Card click simulation
    document.querySelectorAll('.purchase-report-card').forEach(card => {
      card.addEventListener('click', () => {
        const title = card.dataset.reportTitle;
        Modal.open({
          title: `Generated Extract: ${title}`,
          size: 'md',
          content: `
            <div class="space-y-3 text-xs">
              <div class="p-3 bg-[#DEEBFF] text-[#0747A6] rounded border border-[#B3D4FF]">
                <strong>Report Generated:</strong> Extraction for <strong>${title}</strong> covering FY 2026-2027 cycle completed with 151 records.
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="p-2 border border-[#EBECF0] rounded">
                  <span class="text-[#6B778C]">Total Records:</span>
                  <div class="font-bold text-[#172B4D]">151 Lots</div>
                </div>
                <div class="p-2 border border-[#EBECF0] rounded">
                  <span class="text-[#6B778C]">Total Weight:</span>
                  <div class="font-bold  text-[#006644]">142,500 KG</div>
                </div>
              </div>
            </div>
          `,
          footerButtons: [
            { label: 'Download CSV', type: 'primary', onClick: (m) => { m.close(); Toast.show(`${title} CSV downloaded.`, 'success'); } },
            { label: 'Close', type: 'secondary', onClick: (m) => m.close() }
          ]
        });
      });
    });
  },

  // =========================================================================
  // SUB MENU: OPERATIONS -> TAB 1: LOT TRACKING
  // =========================================================================
  renderLotTracking(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- PURCHASE DETAILS Filter Card matching Screenshot -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
          <div class="flex items-center justify-between pb-3 border-b border-[#EBECF0]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">PURCHASE DETAILS</h3>
            </div>
            
            <div class="flex items-center gap-2">
              <button id="btn-create-lot-modal" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs">
                <span>+ Register New Lot</span>
              </button>
            </div>
          </div>

          <!-- Filter Controls -->
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">PURCHASE STATION</label>
              <select id="lot-station-filter" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]">
                <option value="ALL">All Purchase Station</option>
                <option value="SKM">Srikakulam Station (SKM)</option>
                <option value="RPL">Rajahmundry Plant (RPL)</option>
                <option value="KKD">Kakinada Dock (KKD)</option>
                <option value="BVM">Bhimavaram Center (BVM)</option>
                <option value="VSP">Visakhapatnam Gate (VSP)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">MONTH</label>
              <select id="lot-month-filter" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]">
                <option selected>October</option>
                <option>September</option>
                <option>August</option>
                <option>July</option>
                <option>June</option>
                <option>May</option>
                <option>April</option>
                <option>March</option>
                <option>February</option>
                <option>January</option>
                <option>December</option>
                <option>November</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">YEAR</label>
              <select id="lot-year-filter" class="w-full text-xs px-3 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]">
                <option selected>2026</option>
                <option>2025</option>
                <option>2024</option>
              </select>
            </div>

            <div class="flex items-end">
              <button id="lot-search-btn" type="button" class="btn-primary w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer">
                <span>Search</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        <div id="lot-tracking-table-container"></div>
      </div>
    `;

    const tableInstance = new DataTable({
      containerId: 'lot-tracking-table-container',
      data: ERP_DATA.lots,
      keyField: 'id',
      pageSize: 10,
      hideTopFilterBar: true,
      columns: [
        { 
          field: 'id', 
          header: 'ID', 
          render: (val) => `<span class="font-bold text-[#172B4D]">${val}</span>` 
        },
        { 
          field: 'arrivalDate', 
          header: 'Arrival Date', 
          render: (val) => `<span class="text-[#172B4D]">${val}</span>` 
        },
        { 
          field: 'lotNumber', 
          header: 'Lot Number', 
          render: (val, row) => `
            <div>
              <span class="font-bold text-[#0052CC] hover:underline cursor-pointer" title="Click to view trace">${val}</span>
            </div>
          `
        },
        { 
          field: 'arrivalQty', 
          header: 'Arrival Qty', 
          render: (val) => `<span class="font-semibold text-[#172B4D]">${typeof val === 'number' ? val.toFixed(3) : val}</span>` 
        },
        { 
          field: 'abStatus', 
          header: 'Ab Status', 
          render: (val) => {
            const isPending = !val || String(val).toLowerCase().includes('pending');
            const bg = isPending ? 'bg-[#22C55E]' : 'bg-[#0052CC]';
            return `<span class="inline-block text-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white whitespace-nowrap shadow-2xs ${bg}">${val || 'Test Pending'}</span>`;
          }
        },
        { 
          field: 'deheadingQty', 
          header: 'Deheading Qty', 
          render: (val) => `<span class="text-[#172B4D] font-medium">${typeof val === 'number' ? val.toFixed(2) : (val || '0.00')}</span>` 
        },
        { 
          field: 'gradingQty', 
          header: 'Grading Qty', 
          render: (val) => `<span class="text-[#172B4D] font-medium">${val || 0}</span>` 
        },
        { 
          field: 'vaQty', 
          header: 'VA Qty', 
          render: (val) => `<span class="text-[#172B4D] font-medium">${val || 0}</span>` 
        },
        { 
          field: 'soakingQty', 
          header: 'Soaking Qty', 
          render: (val) => `<span class="text-[#172B4D] font-medium">${val || 0}</span>` 
        },
        { 
          field: 'packedQty', 
          header: 'Packed Qty', 
          render: (val) => `<span class="text-[#172B4D] font-medium">${val || 0}</span>` 
        }
      ],
      actions: [
        {
          label: 'Trace',
          icon: `<span class="btn-primary px-2 py-0.5 rounded text-[10px] flex items-center gap-1">Trace →</span>`,
          onClick: (row) => PurchaseView.showLotTraceabilityDrawer(row)
        },
        {
          label: 'Edit',
          icon: `<svg class="w-4 h-4 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
          onClick: (row) => PurchaseView.openEditLotModal(row, tableInstance)
        },
        {
          label: 'Delete',
          icon: `<svg class="w-4 h-4 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
          onClick: (row) => PurchaseView.deleteLot(row, tableInstance)
        }
      ],
      onRowClick: (row) => PurchaseView.showLotTraceabilityDrawer(row)
    });

    const searchBtn = document.getElementById('lot-search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        const stationVal = document.getElementById('lot-station-filter')?.value;
        const monthVal = document.getElementById('lot-month-filter')?.value;
        const yearVal = document.getElementById('lot-year-filter')?.value;

        if (stationVal && stationVal !== 'ALL') {
          tableInstance.searchTerm = stationVal;
        } else {
          tableInstance.searchTerm = '';
        }
        tableInstance.applyFilters();
        Toast.show(`Filtered lots for ${stationVal === 'ALL' ? 'All Stations' : stationVal} - ${monthVal} ${yearVal}`, 'info');
      });
    }

    const createLotBtn = document.getElementById('btn-create-lot-modal');
    if (createLotBtn) {
      createLotBtn.addEventListener('click', () => PurchaseView.openCreateLotModal(tableInstance));
    }
  },

  // =========================================================================
  // SUB MENU: OPERATIONS -> TAB 2: BOOKINGS (FULL CRUD)
  // =========================================================================
  renderBookings(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#DFE1E6] pb-3">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Pre-Harvest Pond Bookings & Farmer Contracts</h1>
            <p class="text-xs text-[#5E6C84] mt-0.5">Pre-harvest agreements, pond reservations, expected harvest schedules, and advances.</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-create-booking" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs">
              <span>New Booking</span>
            </button>
          </div>
        </div>

        <div id="bookings-table-container"></div>
      </div>
    `;

    const bookingsTable = new DataTable({
      containerId: 'bookings-table-container',
      data: this.bookingsList,
      keyField: 'bookingNo',
      tableTitle: 'Recorded Pond Bookings (CRUD)',
      columns: [
        { field: 'bookingNo', header: 'Booking ID', render: (v) => `<span class=" font-bold text-[#0052CC]">${v}</span>` },
        { field: 'supplier', header: 'Farmer / Cultivator' },
        { field: 'pond', header: 'Pond Location' },
        { field: 'species', header: 'Species' },
        { field: 'bookedQty', header: 'Booked Quantity', render: (v) => `<span class=" font-bold">${v.toLocaleString()} KG</span>` },
        { field: 'expectedDate', header: 'Expected Harvest' },
        { field: 'advancePaid', header: 'Advance' },
        { field: 'status', header: 'Status', type: 'status' }
      ],
      actions: [
        {
          label: 'Edit',
          icon: `<svg class="w-4 h-4 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
          onClick: (row) => PurchaseView.openEditBookingModal(row, bookingsTable)
        },
        {
          label: 'Delete',
          icon: `<svg class="w-4 h-4 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
          onClick: (row) => PurchaseView.deleteBooking(row, bookingsTable)
        }
      ]
    });

    const createBtn = document.getElementById('btn-create-booking');
    if (createBtn) {
      createBtn.addEventListener('click', () => PurchaseView.openCreateBookingModal(bookingsTable));
    }
  },

  // =========================================================================
  // SUB MENU: OPERATIONS -> TAB 3: RAW MATERIAL ARRIVALS (FULL CRUD)
  // =========================================================================
  renderRMArrivals(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#DFE1E6] pb-3">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Raw Material Arrivals (Dock Weighbridge)</h1>
            <p class="text-xs text-[#5E6C84] mt-0.5">Physical intake of fresh harvest catch, gross/tare weighment, temperature check, and de-icing.</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-create-arrival-modal" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs">
              <span>Create RM Arrival</span>
            </button>
          </div>
        </div>

        <div id="rm-arrivals-table-container"></div>
      </div>
    `;

    const arrivalsTable = new DataTable({
      containerId: 'rm-arrivals-table-container',
      data: ERP_DATA.rmArrivals,
      keyField: 'arrivalNumber',
      pageSize: 10,
      tableTitle: 'Recorded Raw Material Arrivals (Create, View, Edit, Delete)',
      columns: [
        { field: 'arrivalNumber', header: 'Arrival No', render: (val) => `<span class=" font-bold text-[#0052CC]">${val}</span>` },
        { field: 'lotNumber', header: 'Linked Lot', render: (val) => `<span class=" text-[#172B4D] font-medium">${val}</span>` },
        { field: 'supplierName', header: 'Supplier' },
        { field: 'vehicleNumber', header: 'Vehicle / Driver', render: (val, row) => `<div><span class=" font-semibold">${val}</span><div class="text-[10px] text-[#6B778C]">${row.driverName}</div></div>` },
        { field: 'species', header: 'Species' },
        { field: 'grossWeightKg', header: 'Gross Wt', render: (val) => `<span class="">${val} KG</span>` },
        { field: 'tareWeightKg', header: 'Tare Wt', render: (val) => `<span class="">${val} KG</span>` },
        { field: 'netWeightKg', header: 'Net Wt', render: (val) => `<span class=" font-bold text-[#0747A6]">${val.toLocaleString()} KG</span>` },
        { field: 'temperatureCelsius', header: 'Temp', render: (val) => `<span class="lozenge ${val <= 3.0 ? 'lozenge-success' : 'lozenge-warning'} ">${val} °C</span>` },
        { field: 'qcStatus', header: 'QC Status', type: 'status' },
        { field: 'receivingStatus', header: 'Receiving Status', type: 'status' }
      ],
      actions: [
        {
          label: 'View',
          icon: `<svg class="w-4 h-4 text-[#5E6C84]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`,
          onClick: (row) => PurchaseView.showArrivalDetails(row)
        },
        {
          label: 'Edit',
          icon: `<svg class="w-4 h-4 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
          onClick: (row) => PurchaseView.openEditArrivalModal(row, arrivalsTable)
        },
        {
          label: 'Delete',
          icon: `<svg class="w-4 h-4 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
          onClick: (row) => PurchaseView.deleteArrival(row, arrivalsTable)
        }
      ]
    });

    const createBtn = document.getElementById('btn-create-arrival-modal');
    if (createBtn) {
      createBtn.addEventListener('click', () => PurchaseView.openCreateArrivalModal(arrivalsTable));
    }
  },

  // =========================================================================
  // SUB MENU: TRANSACTIONS & BILLS -> TAB 1: SUPPLIER BILL SUMMARY
  // =========================================================================
  renderSupplierBills(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#DFE1E6] pb-3">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Supplier Bill Summary & Farmer Invoices</h1>
            <p class="text-xs text-[#5E6C84] mt-0.5">Commercial bills, count deductions, payment terms, and disbursement status.</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-create-supplier-bill" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs">
              <span>Generate Bill</span>
            </button>
          </div>
        </div>

        <div id="supplier-bills-table-container"></div>
      </div>
    `;

    const billsTable = new DataTable({
      containerId: 'supplier-bills-table-container',
      data: ERP_DATA.supplierBills,
      keyField: 'billNo',
      tableTitle: 'Supplier Commercial Invoices (CRUD)',
      columns: [
        { field: 'billNo', header: 'Bill Number', render: (v) => `<span class=" font-bold text-[#0052CC]">${v}</span>` },
        { field: 'supplierName', header: 'Supplier' },
        { field: 'lotNumber', header: 'Linked Lot', render: (v) => `<span class="">${v}</span>` },
        { field: 'weightKg', header: 'Weight (KG)', render: (v) => `<span class="">${v.toLocaleString()} KG</span>` },
        { field: 'ratePerKg', header: 'Rate (INR/KG)', render: (v) => `₹ ${v}` },
        { field: 'totalAmountInr', header: 'Total INR', render: (v) => `<span class="font-bold">₹ ${v.toLocaleString()}</span>` },
        { field: 'totalAmountUsd', header: 'Total USD', render: (v) => `<span class="font-bold  text-[#006644]">$ ${v.toLocaleString()}</span>` },
        { field: 'dueDate', header: 'Due Date' },
        { field: 'status', header: 'Status', type: 'status' }
      ],
      actions: [
        {
          label: 'Edit',
          icon: `<svg class="w-4 h-4 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
          onClick: (row) => PurchaseView.openEditBillModal(row, billsTable)
        },
        {
          label: 'Delete',
          icon: `<svg class="w-4 h-4 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
          onClick: (row) => PurchaseView.deleteBill(row, billsTable)
        }
      ]
    });

    const createBillBtn = document.getElementById('btn-create-supplier-bill');
    if (createBillBtn) {
      createBillBtn.addEventListener('click', () => PurchaseView.openCreateBillModal(billsTable));
    }
  },

  // =========================================================================
  // SUB MENU: TRANSACTIONS & BILLS -> TAB 2: COMMERCIAL TRANSACTIONS
  // =========================================================================
  renderCommercialTransactions(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#DFE1E6] pb-3">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Commercial General Ledger & Transactions</h1>
            <p class="text-xs text-[#5E6C84] mt-0.5">Procurement journal entries, raw material freight, advance adjustments, and payments.</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-add-txn" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs">
              <span>Record Journal Entry</span>
            </button>
          </div>
        </div>

        <div id="commercial-txns-table-container"></div>
      </div>
    `;

    const txnsTable = new DataTable({
      containerId: 'commercial-txns-table-container',
      data: this.commercialTxns,
      keyField: 'txnId',
      tableTitle: 'Commercial Transactions Ledger (CRUD)',
      columns: [
        { field: 'txnId', header: 'Txn Ref', render: (v) => `<span class=" font-bold text-[#0052CC]">${v}</span>` },
        { field: 'date', header: 'Date' },
        { field: 'supplier', header: 'Party / Supplier' },
        { field: 'description', header: 'Description' },
        { field: 'amountInr', header: 'Amount (INR)', render: (v) => `<span class="font-bold">₹ ${v.toLocaleString()}</span>` },
        { field: 'amountUsd', header: 'Amount (USD)', render: (v) => `<span class=" text-[#006644] font-bold">$ ${v.toLocaleString()}</span>` },
        { field: 'type', header: 'Type', type: 'status' },
        { field: 'status', header: 'Ledger Status', type: 'status' }
      ],
      actions: [
        {
          label: 'Delete',
          icon: `<svg class="w-4 h-4 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
          onClick: (row) => {
            Modal.confirm({
              title: `Delete Transaction ${row.txnId}`,
              message: 'Are you sure you want to void this commercial ledger transaction?',
              isDestructive: true,
              onConfirm: () => {
                const idx = PurchaseView.commercialTxns.findIndex(t => t.txnId === row.txnId);
                if (idx > -1) {
                  PurchaseView.commercialTxns.splice(idx, 1);
                  txnsTable.setData(PurchaseView.commercialTxns);
                  Toast.show(`Transaction ${row.txnId} voided.`, 'success');
                }
              }
            });
          }
        }
      ]
    });

    const addTxnBtn = document.getElementById('btn-add-txn');
    if (addTxnBtn) {
      addTxnBtn.addEventListener('click', () => {
        Modal.open({
          title: 'Record Commercial Transaction Entry',
          size: 'md',
          content: `
            <form class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Txn ID</label>
                  <input type="text" value="CTX-2026-${Math.floor(1000 + Math.random() * 9000)}" readonly class="w-full text-xs  px-3 py-1.5 bg-[#EBECF0] border border-[#DFE1E6] rounded" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Date</label>
                  <input type="date" value="2026-10-05" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Party / Supplier</label>
                <select id="modal-txn-party" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                  ${ERP_DATA.suppliers.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Description</label>
                <input type="text" id="modal-txn-desc" value="Freight and crate handling charge" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Amount (INR)</label>
                  <input type="number" id="modal-txn-inr" value="45000" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Transaction Type</label>
                  <select id="modal-txn-type" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                    <option value="LOGISTICS_FEE">LOGISTICS_FEE</option>
                    <option value="ADVANCE_PAID">ADVANCE_PAID</option>
                    <option value="PURCHASE_PAYABLE">PURCHASE_PAYABLE</option>
                  </select>
                </div>
              </div>
            </form>
          `,
          footerButtons: [
            { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
            { 
              label: 'Post Transaction', 
              type: 'primary', 
              onClick: (m) => {
                const party = document.getElementById('modal-txn-party').value;
                const desc = document.getElementById('modal-txn-desc').value;
                const inr = parseFloat(document.getElementById('modal-txn-inr').value) || 0;
                const type = document.getElementById('modal-txn-type').value;

                const newTxn = {
                  txnId: `CTX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                  date: new Date().toISOString().substring(0, 10),
                  supplier: party,
                  description: desc,
                  amountInr: inr,
                  amountUsd: Math.round(inr / 83),
                  type: type,
                  status: 'POSTED'
                };

                PurchaseView.commercialTxns.unshift(newTxn);
                txnsTable.setData(PurchaseView.commercialTxns);
                m.close();
                Toast.show(`Transaction ${newTxn.txnId} posted to general ledger.`, 'success');
              }
            }
          ]
        });
      });
    }
  },

  // =========================================================================
  // SUB MENU: PAYMENTS -> TAB 1: PAYMENT SUMMARY
  // =========================================================================
  renderPaymentSummary(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#DFE1E6] pb-3">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Supplier Payment Summary & Aging</h1>
            <p class="text-xs text-[#5E6C84] mt-0.5">Disbursement trends, RTGS settlements, bank authorizations, and aging schedules.</p>
          </div>
          <div class="flex items-center gap-2">
            <a href="#/purchase/payments/bill-date-payment" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs">
              <span>Record Payment</span>
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-lg border border-[#DFE1E6] shadow-xs">
            <span class="text-xs text-[#6B778C]">Total Paid (October)</span>
            <div class="text-2xl font-bold text-[#006644] mt-1">$ 35,866 <span class="text-xs font-normal text-[#5E6C84]">USD</span></div>
            <div class="text-[11px] text-[#5E6C84] mt-1">₹ 29.77 Lakhs settled via RTGS</div>
          </div>
          <div class="bg-white p-4 rounded-lg border border-[#DFE1E6] shadow-xs">
            <span class="text-xs text-[#6B778C]">Pending Approval Vouchers</span>
            <div class="text-2xl font-bold text-[#FFAB00] mt-1">1 Voucher</div>
            <div class="text-[11px] text-[#5E6C84] mt-1">Godavari Aqua ₹ 3.80 Lakhs</div>
          </div>
          <div class="bg-white p-4 rounded-lg border border-[#DFE1E6] shadow-xs">
            <span class="text-xs text-[#6B778C]">Primary Disbursement Bank</span>
            <div class="text-2xl font-bold text-[#0052CC] mt-1">State Bank of India</div>
            <div class="text-[11px] text-[#5E6C84] mt-1">Corporate Branch (INVTZ)</div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg border border-[#DFE1E6] shadow-xs">
          <h3 class="font-bold text-sm text-[#172B4D] mb-3">Recent Payment Disbursements</h3>
          <div id="payment-summary-table-container"></div>
        </div>
      </div>
    `;

    new DataTable({
      containerId: 'payment-summary-table-container',
      data: this.paymentsList,
      keyField: 'voucherNo',
      columns: [
        { field: 'voucherNo', header: 'Voucher No', render: (v) => `<span class=" font-bold text-[#0052CC]">${v}</span>` },
        { field: 'paymentDate', header: 'Payment Date' },
        { field: 'supplierName', header: 'Supplier' },
        { field: 'billNo', header: 'Settled Bill' },
        { field: 'bankRef', header: 'Bank Ref / UTR', render: (v) => `<span class=" text-xs">${v}</span>` },
        { field: 'amountInr', header: 'Amount (INR)', render: (v) => `<span class="font-bold">₹ ${v.toLocaleString()}</span>` },
        { field: 'amountUsd', header: 'Amount (USD)', render: (v) => `<span class=" font-bold text-[#006644]">$ ${v.toLocaleString()}</span>` },
        { field: 'status', header: 'Status', type: 'status' }
      ]
    });
  },

  // =========================================================================
  // SUB MENU: PAYMENTS -> TAB 2: BILL & DATE-WISE PAYMENT (FULL CRUD)
  // =========================================================================
  renderBillDatePayment(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#DFE1E6] pb-3">
          <div>
            <h1 class="text-xl font-extrabold text-[#172B4D]">Bill & Date-Wise Payment Vouchers</h1>
            <p class="text-xs text-[#5E6C84] mt-0.5">Disbursement vouchers, UTR transaction matching, invoice linkage, and adjustments.</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-record-new-payment" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs">
              <span>Record Payment Voucher</span>
            </button>
          </div>
        </div>

        <div id="bill-date-payment-table-container"></div>
      </div>
    `;

    const payTable = new DataTable({
      containerId: 'bill-date-payment-table-container',
      data: this.paymentsList,
      keyField: 'voucherNo',
      tableTitle: 'Vendor Payment Vouchers (CRUD)',
      columns: [
        { field: 'voucherNo', header: 'Voucher No', render: (v) => `<span class=" font-bold text-[#0052CC]">${v}</span>` },
        { field: 'paymentDate', header: 'Payment Date' },
        { field: 'supplierName', header: 'Beneficiary Supplier' },
        { field: 'billNo', header: 'Against Bill No' },
        { field: 'paymentMode', header: 'Payment Mode' },
        { field: 'bankRef', header: 'Bank UTR Ref', render: (v) => `<span class=" text-xs">${v}</span>` },
        { field: 'amountInr', header: 'Paid INR', render: (v) => `<span class="font-bold">₹ ${v.toLocaleString()}</span>` },
        { field: 'amountUsd', header: 'Paid USD', render: (v) => `<span class=" font-bold text-[#006644]">$ ${v.toLocaleString()}</span>` },
        { field: 'status', header: 'Status', type: 'status' }
      ],
      actions: [
        {
          label: 'Delete',
          icon: `<svg class="w-4 h-4 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
          onClick: (row) => {
            Modal.confirm({
              title: `Delete Voucher ${row.voucherNo}`,
              message: 'Are you sure you want to delete this payment voucher record?',
              isDestructive: true,
              onConfirm: () => {
                const idx = PurchaseView.paymentsList.findIndex(p => p.voucherNo === row.voucherNo);
                if (idx > -1) {
                  PurchaseView.paymentsList.splice(idx, 1);
                  payTable.setData(PurchaseView.paymentsList);
                  Toast.show(`Payment voucher ${row.voucherNo} removed.`, 'success');
                }
              }
            });
          }
        }
      ]
    });

    const recordBtn = document.getElementById('btn-record-new-payment');
    if (recordBtn) {
      recordBtn.addEventListener('click', () => {
        Modal.open({
          title: 'Record New Supplier Payment Voucher',
          size: 'md',
          content: `
            <form class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Voucher Number</label>
                  <input type="text" value="PAY-2026-${Math.floor(100 + Math.random() * 900)}" readonly class="w-full text-xs  px-3 py-1.5 bg-[#EBECF0] border border-[#DFE1E6] rounded" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Payment Date</label>
                  <input type="date" value="2026-10-05" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1">Beneficiary Supplier</label>
                <select id="modal-pay-supplier" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                  ${ERP_DATA.suppliers.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
                </select>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Against Supplier Bill</label>
                  <select id="modal-pay-bill" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                    ${ERP_DATA.supplierBills.map(b => `<option value="${b.billNo}">${b.billNo} - ₹${b.totalAmountInr.toLocaleString()}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Payment Mode</label>
                  <select id="modal-pay-mode" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                    <option value="RTGS / Bank Wire">RTGS / Bank Wire</option>
                    <option value="NEFT">NEFT</option>
                    <option value="Cheque / Draft">Cheque / Demand Draft</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Amount Paid (INR)</label>
                  <input type="number" id="modal-pay-inr" value="760000" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#172B4D] mb-1">Bank UTR / Ref Number</label>
                  <input type="text" id="modal-pay-utr" value="SBI-RTGS-${Math.floor(100000 + Math.random() * 900000)}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
                </div>
              </div>
            </form>
          `,
          footerButtons: [
            { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
            {
              label: 'Save & Issue Voucher',
              type: 'primary',
              onClick: (m) => {
                const sup = document.getElementById('modal-pay-supplier').value;
                const bill = document.getElementById('modal-pay-bill').value;
                const mode = document.getElementById('modal-pay-mode').value;
                const inr = parseFloat(document.getElementById('modal-pay-inr').value) || 0;
                const utr = document.getElementById('modal-pay-utr').value;

                const newPay = {
                  voucherNo: `PAY-2026-${Math.floor(100 + Math.random() * 900)}`,
                  paymentDate: new Date().toISOString().substring(0, 10),
                  supplierName: sup,
                  billNo: bill,
                  bankRef: utr,
                  amountInr: inr,
                  amountUsd: Math.round(inr / 83),
                  paymentMode: mode,
                  status: 'COMPLETED'
                };

                PurchaseView.paymentsList.unshift(newPay);
                payTable.setData(PurchaseView.paymentsList);
                m.close();
                Toast.show(`Payment voucher ${newPay.voucherNo} generated successfully.`, 'success');
              }
            }
          ]
        });
      });
    }
  },

  // =========================================================================
  // CRUD MODAL HANDLERS FOR LOT TRACKING
  // =========================================================================
  openCreateLotModal(tableInstance) {
    Modal.open({
      title: 'Register New Raw Material Lot',
      size: 'md',
      content: `
        <form class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Lot Number (Auto-Gen)</label>
              <input type="text" id="newlot-no" value="LOT-2026-${Math.floor(10000 + Math.random() * 90000)}" readonly class="w-full text-xs  px-3 py-1.5 bg-[#EBECF0] border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Purchase Booking No</label>
              <input type="text" id="newlot-pb" value="PB-2026-105" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#172B4D] mb-1">Supplier / Farm Cultivator</label>
            <select id="newlot-sup" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
              ${ERP_DATA.suppliers.map(s => `<option value="${s.id}|${s.name}">${s.name} (${s.region})</option>`).join('')}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
              <select id="newlot-spec" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                ${ERP_DATA.species.map(sp => `<option value="${sp.name}">${sp.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Variety</label>
              <select id="newlot-var" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                ${ERP_DATA.varieties.map(v => `<option value="${v.name}">${v.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Quantity Received (KG)</label>
              <input type="number" id="newlot-qty" value="3000" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Landing / Farm Pond Source</label>
              <input type="text" id="newlot-source" value="Pond #8B, Undi Road" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        { 
          label: 'Save & Register Lot', 
          type: 'primary', 
          onClick: (m) => {
            const lotNo = document.getElementById('newlot-no').value;
            const pb = document.getElementById('newlot-pb').value;
            const supParts = document.getElementById('newlot-sup').value.split('|');
            const spec = document.getElementById('newlot-spec').value;
            const variety = document.getElementById('newlot-var').value;
            const qty = parseFloat(document.getElementById('newlot-qty').value) || 2000;
            const source = document.getElementById('newlot-source').value;

            const newLot = {
              lotNumber: lotNo,
              supplierId: supParts[0],
              supplierName: supParts[1],
              purchaseBookingNo: pb,
              species: spec,
              variety: variety,
              grade: '26/30 pcs/lb',
              bookingQtyKg: qty,
              receivedQtyKg: qty,
              qcAcceptedQtyKg: qty,
              preProcessedQtyKg: 0,
              productionOutputKg: 0,
              coldstoreQtyKg: 0,
              dispatchedQtyKg: 0,
              balanceQtyKg: qty,
              yieldPercent: 0,
              arrivalDate: new Date().toISOString().substring(0, 10),
              landingSource: source,
              harvestTemp: '2.5 °C',
              processingStatus: 'Staged at Dock',
              qcStatus: 'PASSED',
              antibioticStatus: 'CLEARED',
              currentLocation: 'Dock Area #1',
              lotStatus: 'ACTIVE',
              assignedBatches: [],
              salesContracts: [],
              traceabilityTimeline: [
                { stage: 'Farm Harvest & Booking', date: new Date().toISOString().substring(0, 16), quantity: `${qty.toLocaleString()} KG`, operator: supParts[1], status: 'Completed', details: `Source: ${source}` },
                { stage: 'RM Arrival & Weighment', date: new Date().toISOString().substring(0, 16), quantity: `${qty.toLocaleString()} KG`, operator: 'Receiving Gate #2', status: 'Completed', details: 'Direct weighment completed.' }
              ]
            };

            ERP_DATA.lots.unshift(newLot);
            if (tableInstance) tableInstance.setData(ERP_DATA.lots);
            m.close();
            Toast.show(`Lot ${newLot.lotNumber} registered successfully.`, 'success', 'Lot Created');
          } 
        }
      ]
    });
  },

  openEditLotModal(lot, tableInstance) {
    Modal.open({
      title: `Edit Lot: ${lot.lotNumber}`,
      size: 'md',
      content: `
        <form class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-[#172B4D] mb-1">Lot Number</label>
            <input type="text" value="${lot.lotNumber}" readonly class="w-full text-xs  px-3 py-1.5 bg-[#EBECF0] border border-[#DFE1E6] rounded" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#172B4D] mb-1">Supplier</label>
            <input type="text" id="editlot-sup" value="${lot.supplierName}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
              <input type="text" id="editlot-spec" value="${lot.species}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Grade</label>
              <input type="text" id="editlot-grade" value="${lot.grade}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">RM Received Qty (KG)</label>
              <input type="number" id="editlot-qty" value="${lot.receivedQtyKg}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Current Location</label>
              <input type="text" id="editlot-loc" value="${lot.currentLocation}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Update Lot',
          type: 'primary',
          onClick: (m) => {
            lot.supplierName = document.getElementById('editlot-sup').value;
            lot.species = document.getElementById('editlot-spec').value;
            lot.grade = document.getElementById('editlot-grade').value;
            lot.receivedQtyKg = parseFloat(document.getElementById('editlot-qty').value) || lot.receivedQtyKg;
            lot.currentLocation = document.getElementById('editlot-loc').value;

            if (tableInstance) tableInstance.setData(ERP_DATA.lots);
            m.close();
            Toast.show(`Lot ${lot.lotNumber} updated successfully.`, 'success', 'Lot Updated');
          }
        }
      ]
    });
  },

  deleteLot(lot, tableInstance) {
    Modal.confirm({
      title: `Delete Lot ${lot.lotNumber}`,
      message: `Are you sure you want to delete Lot <strong>${lot.lotNumber}</strong> (${lot.species})? This will permanently remove its mass-balance ledger entry.`,
      confirmText: 'Delete Lot',
      isDestructive: true,
      onConfirm: () => {
        const idx = ERP_DATA.lots.findIndex(l => l.lotNumber === lot.lotNumber);
        if (idx > -1) {
          ERP_DATA.lots.splice(idx, 1);
          if (tableInstance) tableInstance.setData(ERP_DATA.lots);
          Toast.show(`Lot ${lot.lotNumber} deleted.`, 'success', 'Deleted');
        }
      }
    });
  },

  // =========================================================================
  // CRUD MODAL HANDLERS FOR RAW MATERIAL ARRIVALS
  // =========================================================================
  openCreateArrivalModal(tableInstance) {
    Modal.open({
      title: 'Record Fresh Raw Material Arrival & Weighment',
      size: 'lg',
      content: `
        <form class="space-y-4">
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Number</label>
              <input type="text" id="newarr-no" value="RMA-2026-${Math.floor(10000 + Math.random() * 90000)}" readonly class="w-full text-xs  px-3 py-1.5 bg-[#EBECF0] border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Harvest Lot Number</label>
              <input type="text" id="newarr-lot" value="LOT-2026-${Math.floor(10000 + Math.random() * 90000)}" readonly class="w-full text-xs  px-3 py-1.5 bg-[#EBECF0] border border-[#DFE1E6] rounded text-[#0052CC]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Date & Time</label>
              <input type="text" id="newarr-time" value="${new Date().toISOString().replace('T', ' ').substring(0, 16)}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Supplier / Farm</label>
              <select id="newarr-sup" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                ${ERP_DATA.suppliers.map(s => `<option value="${s.name}">${s.name} (${s.region})</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
              <select id="newarr-spec" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                ${ERP_DATA.species.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Vehicle Registration</label>
              <input type="text" id="newarr-veh" value="AP 37 TE 9011" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Driver Name</label>
              <input type="text" id="newarr-driver" value="K. Ramu" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Core Temp (°C)</label>
              <input type="number" step="0.1" id="newarr-temp" value="2.6" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
          </div>

          <!-- Live Automatic Net Weight Calculation Box -->
          <div class="p-3 bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg">
            <span class="text-xs font-bold text-[#172B4D] block mb-2">Weighbridge Scale Readings</span>
            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-[#5E6C84] mb-1">Gross Weight (KG)</label>
                <input type="number" id="arr-gross-wt" value="3200" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-[#5E6C84] mb-1">Tare Weight (Tubs & Ice KG)</label>
                <input type="number" id="arr-tare-wt" value="450" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-[#0747A6] mb-1">Calculated Net Weight</label>
                <div id="arr-calc-net" class="text-sm font-bold  px-3 py-1.5 bg-[#DEEBFF] text-[#0052CC] rounded border border-[#B3D4FF]">
                  2,750 KG
                </div>
              </div>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        { 
          label: 'Submit Arrival Entry', 
          type: 'primary', 
          onClick: (m) => {
            const arrNo = document.getElementById('newarr-no').value;
            const lotNo = document.getElementById('newarr-lot').value;
            const sup = document.getElementById('newarr-sup').value;
            const spec = document.getElementById('newarr-spec').value;
            const veh = document.getElementById('newarr-veh').value;
            const driver = document.getElementById('newarr-driver').value;
            const temp = parseFloat(document.getElementById('newarr-temp').value) || 2.5;
            const gross = parseFloat(document.getElementById('arr-gross-wt').value) || 3000;
            const tare = parseFloat(document.getElementById('arr-tare-wt').value) || 400;
            const net = Math.max(0, gross - tare);

            const newArr = {
              arrivalNumber: arrNo,
              lotNumber: lotNo,
              supplierName: sup,
              vehicleNumber: veh,
              driverName: driver,
              driverPhone: '+91 98480 00000',
              species: spec,
              variety: 'Head-On Shell-On (HOSO)',
              countPcsKg: 55,
              grossWeightKg: gross,
              tareWeightKg: tare,
              netWeightKg: net,
              arrivalTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
              temperatureCelsius: temp,
              icingRatio: '1 : 1.2',
              qcStatus: 'PASSED',
              receivingStatus: 'STAGED_AT_DOCK',
              inspector: 'Anjaneyulu',
              notes: 'Inspected and verified.'
            };

            ERP_DATA.rmArrivals.unshift(newArr);
            if (tableInstance) tableInstance.setData(ERP_DATA.rmArrivals);
            m.close();
            Toast.show(`Arrival ${newArr.arrivalNumber} recorded and routed to Dock Staging.`, 'success', 'Arrival Registered');
          } 
        }
      ]
    });

    setTimeout(() => {
      const gross = document.getElementById('arr-gross-wt');
      const tare = document.getElementById('arr-tare-wt');
      const net = document.getElementById('arr-calc-net');

      const updateNet = () => {
        const g = parseFloat(gross.value) || 0;
        const t = parseFloat(tare.value) || 0;
        const n = Math.max(0, g - t);
        net.innerText = `${n.toLocaleString()} KG`;
      };

      if (gross && tare && net) {
        gross.addEventListener('input', updateNet);
        tare.addEventListener('input', updateNet);
      }
    }, 50);
  },

  openEditArrivalModal(arrival, tableInstance) {
    Modal.open({
      title: `Edit RM Arrival: ${arrival.arrivalNumber}`,
      size: 'md',
      content: `
        <form class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-[#172B4D] mb-1">Vehicle Registration</label>
            <input type="text" id="editarr-veh" value="${arrival.vehicleNumber}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Driver Name</label>
              <input type="text" id="editarr-driver" value="${arrival.driverName}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Core Temp (°C)</label>
              <input type="number" step="0.1" id="editarr-temp" value="${arrival.temperatureCelsius}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Gross Weight (KG)</label>
              <input type="number" id="editarr-gross" value="${arrival.grossWeightKg}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Tare Weight (KG)</label>
              <input type="number" id="editarr-tare" value="${arrival.tareWeightKg}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Update Arrival',
          type: 'primary',
          onClick: (m) => {
            arrival.vehicleNumber = document.getElementById('editarr-veh').value;
            arrival.driverName = document.getElementById('editarr-driver').value;
            arrival.temperatureCelsius = parseFloat(document.getElementById('editarr-temp').value) || arrival.temperatureCelsius;
            const g = parseFloat(document.getElementById('editarr-gross').value) || arrival.grossWeightKg;
            const t = parseFloat(document.getElementById('editarr-tare').value) || arrival.tareWeightKg;
            arrival.grossWeightKg = g;
            arrival.tareWeightKg = t;
            arrival.netWeightKg = Math.max(0, g - t);

            if (tableInstance) tableInstance.setData(ERP_DATA.rmArrivals);
            m.close();
            Toast.show(`Arrival ${arrival.arrivalNumber} updated.`, 'success');
          }
        }
      ]
    });
  },

  deleteArrival(arrival, tableInstance) {
    Modal.confirm({
      title: `Delete Arrival ${arrival.arrivalNumber}`,
      message: `Are you sure you want to remove arrival record <strong>${arrival.arrivalNumber}</strong>?`,
      confirmText: 'Delete Arrival',
      isDestructive: true,
      onConfirm: () => {
        const idx = ERP_DATA.rmArrivals.findIndex(a => a.arrivalNumber === arrival.arrivalNumber);
        if (idx > -1) {
          ERP_DATA.rmArrivals.splice(idx, 1);
          if (tableInstance) tableInstance.setData(ERP_DATA.rmArrivals);
          Toast.show(`Arrival ${arrival.arrivalNumber} deleted.`, 'success');
        }
      }
    });
  },

  // =========================================================================
  // CRUD MODAL HANDLERS FOR BOOKINGS
  // =========================================================================
  openCreateBookingModal(tableInstance) {
    Modal.open({
      title: 'Create Pre-Harvest Pond Booking',
      size: 'md',
      content: `
        <form class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Booking Number</label>
              <input type="text" id="newbkg-no" value="PB-2026-${Math.floor(100 + Math.random() * 900)}" readonly class="w-full text-xs  px-3 py-1.5 bg-[#EBECF0] border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Expected Harvest Date</label>
              <input type="date" id="newbkg-date" value="2026-10-12" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#172B4D] mb-1">Farmer / Supplier</label>
            <select id="newbkg-sup" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
              ${ERP_DATA.suppliers.map(s => `<option value="${s.name}">${s.name} (${s.region})</option>`).join('')}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Pond / Source</label>
              <input type="text" id="newbkg-pond" value="Pond #15, Akividu" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
              <select id="newbkg-spec" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                ${ERP_DATA.species.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Booked Quantity (KG)</label>
              <input type="number" id="newbkg-qty" value="3500" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Advance Paid</label>
              <input type="text" id="newbkg-adv" value="$ 4,000" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Create Booking',
          type: 'primary',
          onClick: (m) => {
            const no = document.getElementById('newbkg-no').value;
            const date = document.getElementById('newbkg-date').value;
            const sup = document.getElementById('newbkg-sup').value;
            const pond = document.getElementById('newbkg-pond').value;
            const spec = document.getElementById('newbkg-spec').value;
            const qty = parseFloat(document.getElementById('newbkg-qty').value) || 3000;
            const adv = document.getElementById('newbkg-adv').value;

            const newB = {
              bookingNo: no,
              supplier: sup,
              pond: pond,
              species: spec,
              bookedQty: qty,
              expectedDate: date,
              advancePaid: adv,
              status: 'CONFIRMED'
            };

            PurchaseView.bookingsList.unshift(newB);
            if (tableInstance) tableInstance.setData(PurchaseView.bookingsList);
            m.close();
            Toast.show(`Booking ${newB.bookingNo} created.`, 'success');
          }
        }
      ]
    });
  },

  openEditBookingModal(booking, tableInstance) {
    Modal.open({
      title: `Edit Booking: ${booking.bookingNo}`,
      size: 'md',
      content: `
        <form class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-[#172B4D] mb-1">Pond / Location</label>
            <input type="text" id="editbkg-pond" value="${booking.pond}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Booked Quantity (KG)</label>
              <input type="number" id="editbkg-qty" value="${booking.bookedQty}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Expected Date</label>
              <input type="date" id="editbkg-date" value="${booking.expectedDate}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Update Booking',
          type: 'primary',
          onClick: (m) => {
            booking.pond = document.getElementById('editbkg-pond').value;
            booking.bookedQty = parseFloat(document.getElementById('editbkg-qty').value) || booking.bookedQty;
            booking.expectedDate = document.getElementById('editbkg-date').value;

            if (tableInstance) tableInstance.setData(PurchaseView.bookingsList);
            m.close();
            Toast.show(`Booking ${booking.bookingNo} updated.`, 'success');
          }
        }
      ]
    });
  },

  deleteBooking(booking, tableInstance) {
    Modal.confirm({
      title: `Delete Booking ${booking.bookingNo}`,
      message: `Are you sure you want to cancel and delete Booking <strong>${booking.bookingNo}</strong>?`,
      confirmText: 'Delete Booking',
      isDestructive: true,
      onConfirm: () => {
        const idx = PurchaseView.bookingsList.findIndex(b => b.bookingNo === booking.bookingNo);
        if (idx > -1) {
          PurchaseView.bookingsList.splice(idx, 1);
          if (tableInstance) tableInstance.setData(PurchaseView.bookingsList);
          Toast.show(`Booking ${booking.bookingNo} removed.`, 'success');
        }
      }
    });
  },

  // =========================================================================
  // CRUD MODAL HANDLERS FOR SUPPLIER BILLS
  // =========================================================================
  openCreateBillModal(tableInstance) {
    Modal.open({
      title: 'Generate New Supplier Commercial Bill',
      size: 'md',
      content: `
        <form class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Bill Number</label>
              <input type="text" id="newbill-no" value="BILL-2026-${Math.floor(120 + Math.random() * 800)}" readonly class="w-full text-xs  px-3 py-1.5 bg-[#EBECF0] border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Due Date</label>
              <input type="date" id="newbill-due" value="2026-10-25" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#172B4D] mb-1">Supplier</label>
            <select id="newbill-sup" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
              ${ERP_DATA.suppliers.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Linked Lot</label>
              <select id="newbill-lot" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded ">
                ${ERP_DATA.lots.map(l => `<option value="${l.lotNumber}">${l.lotNumber}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Net Weight (KG)</label>
              <input type="number" id="newbill-wt" value="2500" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Rate per KG (INR)</label>
              <input type="number" id="newbill-rate" value="385" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Status</label>
              <select id="newbill-status" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                <option value="PENDING_PAYMENT">PENDING_PAYMENT</option>
                <option value="PARTIALLY_PAID">PARTIALLY_PAID</option>
                <option value="PAID">PAID</option>
              </select>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Create Bill',
          type: 'primary',
          onClick: (m) => {
            const no = document.getElementById('newbill-no').value;
            const due = document.getElementById('newbill-due').value;
            const sup = document.getElementById('newbill-sup').value;
            const lot = document.getElementById('newbill-lot').value;
            const wt = parseFloat(document.getElementById('newbill-wt').value) || 2000;
            const rate = parseFloat(document.getElementById('newbill-rate').value) || 380;
            const stat = document.getElementById('newbill-status').value;
            const inr = wt * rate;
            const usd = Math.round(inr / 83);

            const newB = {
              billNo: no,
              supplierName: sup,
              lotNumber: lot,
              weightKg: wt,
              ratePerKg: rate,
              totalAmountInr: inr,
              totalAmountUsd: usd,
              billDate: new Date().toISOString().substring(0, 10),
              dueDate: due,
              status: stat
            };

            ERP_DATA.supplierBills.unshift(newB);
            if (tableInstance) tableInstance.setData(ERP_DATA.supplierBills);
            m.close();
            Toast.show(`Supplier Bill ${newB.billNo} generated.`, 'success');
          }
        }
      ]
    });
  },

  openEditBillModal(bill, tableInstance) {
    Modal.open({
      title: `Edit Bill: ${bill.billNo}`,
      size: 'md',
      content: `
        <form class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Rate per KG (INR)</label>
              <input type="number" id="editbill-rate" value="${bill.ratePerKg}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Status</label>
              <select id="editbill-status" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                <option value="PENDING_PAYMENT" ${bill.status === 'PENDING_PAYMENT' ? 'selected' : ''}>PENDING_PAYMENT</option>
                <option value="PARTIALLY_PAID" ${bill.status === 'PARTIALLY_PAID' ? 'selected' : ''}>PARTIALLY_PAID</option>
                <option value="PAID" ${bill.status === 'PAID' ? 'selected' : ''}>PAID</option>
              </select>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Update Bill',
          type: 'primary',
          onClick: (m) => {
            const r = parseFloat(document.getElementById('editbill-rate').value) || bill.ratePerKg;
            bill.ratePerKg = r;
            bill.totalAmountInr = bill.weightKg * r;
            bill.totalAmountUsd = Math.round(bill.totalAmountInr / 83);
            bill.status = document.getElementById('editbill-status').value;

            if (tableInstance) tableInstance.setData(ERP_DATA.supplierBills);
            m.close();
            Toast.show(`Bill ${bill.billNo} updated.`, 'success');
          }
        }
      ]
    });
  },

  deleteBill(bill, tableInstance) {
    Modal.confirm({
      title: `Delete Bill ${bill.billNo}`,
      message: `Are you sure you want to delete Bill <strong>${bill.billNo}</strong>?`,
      confirmText: 'Delete Bill',
      isDestructive: true,
      onConfirm: () => {
        const idx = ERP_DATA.supplierBills.findIndex(b => b.billNo === bill.billNo);
        if (idx > -1) {
          ERP_DATA.supplierBills.splice(idx, 1);
          if (tableInstance) tableInstance.setData(ERP_DATA.supplierBills);
          Toast.show(`Bill ${bill.billNo} deleted.`, 'success');
        }
      }
    });
  },

  // =========================================================================
  // CRUD MODAL HANDLERS FOR COMMERCIAL PRICE BENCHMARKS
  // =========================================================================
  openCreateCommercialRateModal(tableInstance) {
    Modal.open({
      title: 'Add Commercial Price Benchmark',
      size: 'md',
      content: `
        <form class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
              <select id="newrate-spec" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                ${ERP_DATA.species.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Count / Grade</label>
              <input type="text" id="newrate-count" value="31/40 pcs/lb" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Rate (INR / KG)</label>
              <input type="number" id="newrate-inr" value="350" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Rate (USD / KG)</label>
              <input type="number" step="0.05" id="newrate-usd" value="4.25" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Save Benchmark',
          type: 'primary',
          onClick: (m) => {
            const spec = document.getElementById('newrate-spec').value;
            const count = document.getElementById('newrate-count').value;
            const inr = parseFloat(document.getElementById('newrate-inr').value) || 350;
            const usd = parseFloat(document.getElementById('newrate-usd').value) || 4.25;

            const newRate = {
              id: `CR-0${PurchaseView.commercialRates.length + 1}`,
              species: spec,
              count: count,
              rateInr: inr,
              rateUsd: usd,
              effectiveDate: new Date().toISOString().substring(0, 10),
              status: 'ACTIVE'
            };

            PurchaseView.commercialRates.push(newRate);
            if (tableInstance) tableInstance.setData(PurchaseView.commercialRates);
            m.close();
            Toast.show(`Price benchmark for ${spec} (${count}) added.`, 'success');
          }
        }
      ]
    });
  },

  openEditCommercialRateModal(rate, tableInstance) {
    Modal.open({
      title: `Edit Price Benchmark: ${rate.id}`,
      size: 'md',
      content: `
        <form class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Rate (INR / KG)</label>
              <input type="number" id="editrate-inr" value="${rate.rateInr}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Rate (USD / KG)</label>
              <input type="number" step="0.05" id="editrate-usd" value="${rate.rateUsd}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded " />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Update Benchmark',
          type: 'primary',
          onClick: (m) => {
            rate.rateInr = parseFloat(document.getElementById('editrate-inr').value) || rate.rateInr;
            rate.rateUsd = parseFloat(document.getElementById('editrate-usd').value) || rate.rateUsd;

            if (tableInstance) tableInstance.setData(PurchaseView.commercialRates);
            m.close();
            Toast.show(`Price benchmark ${rate.id} updated.`, 'success');
          }
        }
      ]
    });
  },

  deleteCommercialRate(rate, tableInstance) {
    Modal.confirm({
      title: `Delete Price Benchmark ${rate.id}`,
      message: `Are you sure you want to delete the benchmark for ${rate.species} (${rate.count})?`,
      confirmText: 'Delete Benchmark',
      isDestructive: true,
      onConfirm: () => {
        const idx = PurchaseView.commercialRates.findIndex(r => r.id === rate.id);
        if (idx > -1) {
          PurchaseView.commercialRates.splice(idx, 1);
          if (tableInstance) tableInstance.setData(PurchaseView.commercialRates);
          Toast.show(`Benchmark ${rate.id} removed.`, 'success');
        }
      }
    });
  },

  // =========================================================================
  // TRACEABILITY & ARRIVAL DETAILS DRAWERS
  // =========================================================================
  showLotTraceabilityDrawer(lot) {
    const content = `
      <div class="space-y-6">
        <!-- Lot Summary Header Card -->
        <div class="bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg p-4">
          <div class="flex items-start justify-between">
            <div>
              <span class="text-xs  font-bold text-[#0052CC]">${lot.lotNumber}</span>
              <h2 class="text-lg font-bold text-[#172B4D] mt-0.5">${lot.species} (${lot.variety})</h2>
              <p class="text-xs text-[#5E6C84] mt-0.5">${lot.supplierName} • Landing: ${lot.landingSource}</p>
            </div>
            <span class="lozenge lozenge-success">${lot.lotStatus}</span>
          </div>

          <!-- Quantitative Mass Balance Pipeline Card -->
          <div class="mt-4 pt-3 border-t border-[#DFE1E6] bg-white p-3 rounded border border-[#EBECF0]">
            <span class="text-[11px] font-bold text-[#172B4D] uppercase tracking-wider block mb-2">Quantitative Mass-Balance Audit (KG)</span>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
              <div class="bg-[#F4F5F7] p-2 rounded">
                <div class="text-[10px] text-[#6B778C]">RM Received</div>
                <div class="font-bold  text-[#172B4D] mt-0.5">${lot.receivedQtyKg.toLocaleString()} KG</div>
              </div>
              <div class="bg-[#E3FCEF] p-2 rounded">
                <div class="text-[10px] text-[#006644]">QC Accepted</div>
                <div class="font-bold  text-[#006644] mt-0.5">${lot.qcAcceptedQtyKg.toLocaleString()} KG</div>
              </div>
              <div class="bg-[#DEEBFF] p-2 rounded">
                <div class="text-[10px] text-[#0747A6]">Pre-Processed</div>
                <div class="font-bold  text-[#0747A6] mt-0.5">${lot.preProcessedQtyKg.toLocaleString()} KG</div>
              </div>
              <div class="bg-[#EAE6FF] p-2 rounded">
                <div class="text-[10px] text-[#403294]">Production Output</div>
                <div class="font-bold  text-[#403294] mt-0.5">${lot.productionOutputKg.toLocaleString()} KG</div>
              </div>
              <div class="bg-[#FFF0B3] p-2 rounded">
                <div class="text-[10px] text-[#8f4d00]">Dispatched</div>
                <div class="font-bold  text-[#8f4d00] mt-0.5">${lot.dispatchedQtyKg.toLocaleString()} KG</div>
              </div>
              <div class="bg-[#E6FCFF] p-2 rounded">
                <div class="text-[10px] text-[#008DA6]">Coldstore Balance</div>
                <div class="font-bold  text-[#008DA6] mt-0.5">${lot.balanceQtyKg.toLocaleString()} KG</div>
              </div>
            </div>
            <div class="text-right text-[11px] text-[#5E6C84] mt-2">
              Overall Plant Yield: <strong class="text-[#0052CC] ">${lot.yieldPercent}%</strong> | Current Storage: <strong>${lot.currentLocation}</strong>
            </div>
          </div>
        </div>

        <!-- Interactive Tabs for Traceability Details -->
        <div>
          <div class="border-b border-[#DFE1E6] flex gap-4 text-xs font-semibold mb-4">
            <button class="pb-2 border-b-2 border-[#0052CC] text-[#0052CC]">Traceability Timeline</button>
            <button class="pb-2 text-[#5E6C84] hover:text-[#172B4D]">QC & Antibiotic Certificate</button>
            <button class="pb-2 text-[#5E6C84] hover:text-[#172B4D]">Batches & Export Allocations</button>
          </div>

          <!-- Chronological Step-by-Step Flow -->
          <div class="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DFE1E6]">
            ${lot.traceabilityTimeline.map((step) => `
              <div class="relative group">
                <div class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#0052CC] ring-4 ring-white border-2 border-white"></div>
                <div class="bg-white border border-[#DFE1E6] rounded-lg p-3 hover:border-[#4C9AFF] transition-colors shadow-xs">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-[#172B4D] text-xs">${step.stage}</span>
                    <span class="text-[10px]  text-[#6B778C]">${step.date}</span>
                  </div>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="lozenge lozenge-success text-[10px]">${step.status}</span>
                    <span class="text-xs  font-semibold text-[#0747A6]">${step.quantity}</span>
                  </div>
                  <p class="text-xs text-[#42526E] mt-1.5 leading-relaxed">${step.details}</p>
                  <div class="text-[10px] text-[#8993A4] mt-1">Responsible: ${step.operator}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    Modal.openDrawer({
      title: `Complete Lot Traceability: ${lot.lotNumber}`,
      subtitle: `${lot.species} • Harvested from ${lot.supplierName}`,
      content: content,
      width: 'w-full md:w-[750px]',
      footerContent: `
        <button class="btn-secondary px-3 py-1.5 rounded text-xs" onclick="window.print()">Print HACCP Audit Certificate</button>
        <button class="btn-primary px-3 py-1.5 rounded text-xs" onclick="document.getElementById('erp-drawer-close-btn').click()">Done</button>
      `
    });
  },

  showArrivalDetails(arrival) {
    Modal.open({
      title: `Arrival Entry: ${arrival.arrivalNumber}`,
      size: 'md',
      content: `
        <div class="space-y-3 text-xs">
          <div class="flex justify-between items-center p-3 bg-[#FAFBFC] border border-[#DFE1E6] rounded">
            <div>
              <span class="text-[#6B778C]">Linked Lot:</span> <strong class=" text-[#0052CC]">${arrival.lotNumber}</strong>
            </div>
            <span class="lozenge lozenge-success">${arrival.qcStatus}</span>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="p-2 border border-[#EBECF0] rounded">
              <span class="text-[#6B778C]">Supplier:</span> <div class="font-bold text-[#172B4D]">${arrival.supplierName}</div>
            </div>
            <div class="p-2 border border-[#EBECF0] rounded">
              <span class="text-[#6B778C]">Vehicle / Driver:</span> <div class="font-bold text-[#172B4D]">${arrival.vehicleNumber} (${arrival.driverName})</div>
            </div>
            <div class="p-2 border border-[#EBECF0] rounded">
              <span class="text-[#6B778C]">Species & Variety:</span> <div class="font-bold text-[#172B4D]">${arrival.species} - ${arrival.variety}</div>
            </div>
            <div class="p-2 border border-[#EBECF0] rounded">
              <span class="text-[#6B778C]">Net Weight:</span> <div class="font-bold  text-[#006644]">${arrival.netWeightKg.toLocaleString()} KG</div>
            </div>
            <div class="p-2 border border-[#EBECF0] rounded">
              <span class="text-[#6B778C]">Core Temperature:</span> <div class="font-bold ">${arrival.temperatureCelsius} °C</div>
            </div>
            <div class="p-2 border border-[#EBECF0] rounded">
              <span class="text-[#6B778C]">Inspector:</span> <div class="font-bold">${arrival.inspector}</div>
            </div>
          </div>

          <div class="p-3 bg-[#F4F5F7] rounded text-[#42526E]">
            <strong>Receiving Notes:</strong> ${arrival.notes}
          </div>
        </div>
      `,
      footerButtons: [{ label: 'Close', type: 'secondary', onClick: (m) => m.close() }]
    });
  }
};
