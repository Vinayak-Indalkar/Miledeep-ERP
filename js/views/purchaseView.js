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
    { sNo: 1, bookingNo: 'PB-2026-089', bookingStation: 'Bhimavaram Center #1', bookingDate: '2026-10-04', species: 'Vannamei Shrimp', purchaseType: 'Direct Farmer Procurement', vehicleNo: 'AP 37 TE 4821', driverName: 'G. Narayana', grader: 'B. Venkatesh', agent: 'Coastal Marine Agency', farmLocation: 'Pond #4B & 5A, Akividu', supplier: 'Godavari Coastal Aqua Farms', bookingCount: '40 Count', bookingWeight: 2000, bookingRate: 440, arrivalPlant: 'DFL UNIT-5 (JPT)', remarks: 'Grade quality A, direct early morning harvest.', expectedDate: '2026-10-04', advancePaid: '$ 3,000', status: 'FULFILLED' },
    { sNo: 2, bookingNo: 'PB-2026-092', bookingStation: 'Kakinada Sea Intake #2', bookingDate: '2026-10-03', species: 'Black Tiger Shrimp', purchaseType: 'Hatchery Buyback Contract', vehicleNo: 'AP 05 TX 9102', driverName: 'M. Srinu', grader: 'K. Ramu', agent: 'Sagar Marine Brokers', farmLocation: 'Kakinada Bay Cage 1', supplier: 'Sagar Marine Hatcheries & Cultivators', bookingCount: '20 Count', bookingWeight: 3500, bookingRate: 620, arrivalPlant: 'DFL UNIT-3 (PSP)', remarks: 'Export batch benchmark rate locked.', expectedDate: '2026-10-03', advancePaid: '$ 5,000', status: 'FULFILLED' },
    { sNo: 3, bookingNo: 'PB-2026-095', bookingStation: 'Machilipatnam Delta #3', bookingDate: '2026-10-05', species: 'Vannamei Shrimp', purchaseType: 'Direct Farmer Procurement', vehicleNo: 'AP 16 TZ 3390', driverName: 'Ch. Prasad', grader: 'M. Nagesh', agent: 'Direct Farmer', farmLocation: 'Krishna Delta Cluster #9', supplier: 'Krishna Delta Prawn Harvesters', bookingCount: '50 Count', bookingWeight: 4000, bookingRate: 380, arrivalPlant: 'DFL UNIT-4 (PND)', remarks: 'Direct farmer pond harvest with aerated crates.', expectedDate: '2026-10-05', advancePaid: '$ 4,500', status: 'FULFILLED' },
    { sNo: 4, bookingNo: 'PB-2026-102', bookingStation: 'Bhimavaram Center #1', bookingDate: '2026-10-08', species: 'Vannamei Shrimp', purchaseType: 'Agent Procurement Order', vehicleNo: 'AP 37 TE 8812', driverName: 'K. Subba Rao', grader: 'B. Venkatesh', agent: 'Delta Seafood Associates', farmLocation: 'Pond #14, Undi Road', supplier: 'Godavari Coastal Aqua Farms', bookingCount: '30 Count', bookingWeight: 3200, bookingRate: 460, arrivalPlant: 'DFL UNIT-5 (JPT)', remarks: 'Agent booking agreement signed.', expectedDate: '2026-10-08', advancePaid: '$ 0', status: 'CONFIRMED' },
    { sNo: 5, bookingNo: 'PB-2026-105', bookingStation: 'Amalapuram Harvesters #4', bookingDate: '2026-10-09', species: 'Vannamei Shrimp', purchaseType: 'Direct Farmer Procurement', vehicleNo: 'AP 04 TT 5619', driverName: 'D. Rambabu', grader: 'G. Suribabu', agent: 'Direct Farmer', farmLocation: 'Konaseema Coastal Pond #3', supplier: 'Konaseema Marine Harvesters', bookingCount: '45 Count', bookingWeight: 2800, bookingRate: 410, arrivalPlant: 'DFL UNIT-6 (JPT-II)', remarks: 'Pond sample tested negative for antibiotics.', expectedDate: '2026-10-09', advancePaid: '$ 2,500', status: 'CONFIRMED' },
    { sNo: 6, bookingNo: 'PB-2026-108', bookingStation: 'Ongole Coastal Hub #1', bookingDate: '2026-10-10', species: 'Black Tiger Shrimp', purchaseType: 'Corporate Feed-Linked Booking', vehicleNo: 'AP 26 TV 1104', driverName: 'Y. Brahmaiah', grader: 'K. Ramu', agent: 'Nellore Aqua Syndicate', farmLocation: 'Nellore Block #12 Pond A', supplier: 'Nellore Brackish Aqua Cultivators', bookingCount: '25 Count', bookingWeight: 5000, bookingRate: 590, arrivalPlant: 'DFL UNIT-2 (KKD)', remarks: 'Feed linked contract with high yield estimation.', expectedDate: '2026-10-10', advancePaid: '$ 6,000', status: 'PENDING' },
    { sNo: 7, bookingNo: 'PB-2026-110', bookingStation: 'Visakhapatnam Gate Dock', bookingDate: '2026-10-11', species: 'Asian Seabass (Barramundi)', purchaseType: 'Spot Market Purchase', vehicleNo: 'AP 31 TH 7741', driverName: 'P. Appa Rao', grader: 'M. Nagesh', agent: 'East Coast Brokers', farmLocation: 'Deep Sea Cage #7', supplier: 'East Coast Aqua Society', bookingCount: '500-800 g/pc', bookingWeight: 1800, bookingRate: 320, arrivalPlant: 'DFL UNIT-1 (VSP)', remarks: 'Live harvest intake to dock.', expectedDate: '2026-10-11', advancePaid: '$ 1,500', status: 'PENDING' }
  ],

  rmArrivalsList: [
    {
      sNo: 1,
      id: 'RMA-2026-101',
      arrivalNumber: 'RMA-2026-101',
      date: '06/10/2026',
      company: 'DEVI FISHERIES LIMITED',
      plant: 'DFL UNIT-5 (JPT)',
      center: 'Bhimavaram Center #1',
      species: 'Vannamei (VM)',
      weight: 3850,
      balanceWeight: 1250,
      status: 'QC_CLEARED',
      averageRate: 425,
      amount: 1636250,
      balanceAmount: 531250,
      vehicleNumber: 'AP 37 TE 9011',
      driverName: 'K. Ramu',
      remarks: 'Fresh harvest intake, weighbridge dock verified.'
    },
    {
      sNo: 2,
      id: 'RMA-2026-102',
      arrivalNumber: 'RMA-2026-102',
      date: '06/10/2026',
      company: 'DEVI FISHERIES LIMITED',
      plant: 'DFL UNIT-3 (PSP)',
      center: 'Kakinada Sea Intake #2',
      species: 'Black Tiger (BT)',
      weight: 4200,
      balanceWeight: 800,
      status: 'RECEIVED',
      averageRate: 610,
      amount: 2562000,
      balanceAmount: 488000,
      vehicleNumber: 'AP 05 TX 9102',
      driverName: 'M. Srinu',
      remarks: 'Export batch benchmark rate locked.'
    },
    {
      sNo: 3,
      id: 'RMA-2026-103',
      arrivalNumber: 'RMA-2026-103',
      date: '06/10/2026',
      company: 'DEVI FISHERIES LIMITED',
      plant: 'DFL UNIT-4 (PND)',
      center: 'Machilipatnam Delta #3',
      species: 'Vannamei (VM)',
      weight: 2900,
      balanceWeight: 900,
      status: 'IN_PROCESS',
      averageRate: 390,
      amount: 1131000,
      balanceAmount: 351000,
      vehicleNumber: 'AP 16 TZ 3390',
      driverName: 'Ch. Prasad',
      remarks: 'De-icing completed, staged for pre-processing.'
    },
    {
      sNo: 4,
      id: 'RMA-2026-104',
      arrivalNumber: 'RMA-2026-104',
      date: '06/10/2026',
      company: 'DEVI FISHERIES LIMITED',
      plant: 'DFL UNIT-6 (JPT-II)',
      center: 'Amalapuram Harvesters #4',
      species: 'Vannamei (VM)',
      weight: 3100,
      balanceWeight: 1100,
      status: 'COMPLETED',
      averageRate: 415,
      amount: 1286500,
      balanceAmount: 456500,
      vehicleNumber: 'AP 04 TT 5619',
      driverName: 'D. Rambabu',
      remarks: 'Batch grading and count verification complete.'
    },
    {
      sNo: 5,
      id: 'RMA-2026-105',
      arrivalNumber: 'RMA-2026-105',
      date: '06/10/2026',
      company: 'DEVI FISHERIES LIMITED',
      plant: 'DFL UNIT-2 (KKD)',
      center: 'Ongole Coastal Hub #1',
      species: 'Black Tiger (BT)',
      weight: 5000,
      balanceWeight: 2000,
      status: 'QC_CLEARED',
      averageRate: 590,
      amount: 2950000,
      balanceAmount: 1180000,
      vehicleNumber: 'AP 26 TV 1104',
      driverName: 'Y. Brahmaiah',
      remarks: 'Brackish water harvest intake verified.'
    },
    {
      sNo: 6,
      id: 'RMA-2026-106',
      arrivalNumber: 'RMA-2026-106',
      date: '06/10/2026',
      company: 'DEVI FISHERIES LIMITED',
      plant: 'DFL UNIT-1 (VSP)',
      center: 'Visakhapatnam Gate Dock',
      species: 'Asian Seabass',
      weight: 1800,
      balanceWeight: 600,
      status: 'RECEIVED',
      averageRate: 320,
      amount: 576000,
      balanceAmount: 192000,
      vehicleNumber: 'AP 31 TH 7741',
      driverName: 'P. Appa Rao',
      remarks: 'Live harvest cage delivery.'
    }
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
        case 'bookings':
          this.renderBookings(subContainer);
          break;
        case 'rm-arrivals':
          this.renderRMArrivals(subContainer);
          break;
        case 'arrivals':
          this.renderArrivals(subContainer);
          break;
        case 'lot-tracking':
          this.renderLotTracking(subContainer);
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
                <span>Register New Lot</span>
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
  // SUB MENU: OPERATIONS -> TAB 1: BOOKINGS (FULL CRUD + SEARCH & FILTERS)
  // =========================================================================
  renderBookings(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#DFE1E6] pb-3">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-extrabold text-[#172B4D]">Pre-Harvest Pond Bookings & Farmer Contracts</h1>
              <span class="lozenge lozenge-blue font-bold text-xs">${this.bookingsList.length} Bookings</span>
            </div>
            <p class="text-xs text-[#5E6C84] mt-0.5">Pre-harvest agreements, pond reservations, expected harvest schedules, advances, and plant destination routing.</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-create-booking" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer">
              <span>New Booking</span>
            </button>
          </div>
        </div>

        <!-- Search / Filter Fields: Select Purchase, Select Arrival Plant, Date -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mb-4 transition-all duration-200">
          <div class="flex items-center justify-between pb-3 border-b border-[#EBECF0]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D]">Search &amp; Filters</h3>
            </div>

            <!-- Filter Controls: Reset & Toggle Open/Close -->
            <div class="flex items-center gap-2">
              <button type="button" id="booking-top-reset-btn" class="dt-top-filter-reset-btn text-xs font-semibold text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#F4F5F7] px-2.5 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-colors cursor-pointer" title="Reset all filters">
                <svg class="w-3.5 h-3.5 text-[#6B778C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Reset</span>
              </button>

              <button type="button" id="booking-top-toggle-btn" class="dt-top-filter-toggle-btn text-xs font-semibold text-[#0052CC] bg-[#DEEBFF]/80 hover:bg-[#DEEBFF] px-3 py-1.5 rounded border border-[#B3D4FF] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer">
                <svg class="w-3.5 h-3.5 dt-top-filter-toggle-icon transform transition-transform duration-200" id="booking-top-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                <span class="dt-top-filter-toggle-text" id="booking-top-toggle-text">Hide Filter</span>
              </button>
            </div>
          </div>

          <!-- Collapsible Filter Inputs Grid -->
          <div id="booking-top-filter-body" class="dt-top-filter-body mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs transition-all duration-200">
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT PURCHASE</label>
              <select id="booking-top-purchase-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="ALL">All Purchases (Select)</option>
                <option value="Direct Farmer Procurement">Direct Farmer Procurement</option>
                <option value="Hatchery Buyback Contract">Hatchery Buyback Contract</option>
                <option value="Agent Procurement Order">Agent Procurement Order</option>
                <option value="Corporate Feed-Linked Booking">Corporate Feed-Linked Booking</option>
                <option value="Spot Market Purchase">Spot Market Purchase</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SELECT ARRIVAL PLANT</label>
              <select id="booking-top-plant-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="ALL">All Arrival Plants (Select)</option>
                <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-4 (PND)">DFL UNIT-4 (PND)</option>
                <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-6 (JPT-II)">DFL UNIT-6 (JPT-II)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">DATE</label>
              <input type="date" id="booking-top-date-input" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
            </div>

            <div class="flex items-end gap-2">
              <button type="button" id="booking-top-search-btn" class="dt-top-filter-search-btn btn-primary w-full py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        <div id="bookings-table-container"></div>
      </div>
    `;

    const bookingsTable = new DataTable({
      containerId: 'bookings-table-container',
      data: this.bookingsList,
      keyField: 'bookingNo',
      tableTitle: 'Bookings List',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { 
          field: 'sNo', 
          header: 'S.No', 
          render: (v, row, index) => `<span class="font-bold text-[#5E6C84]">${index !== undefined ? index + 1 : 1}</span>` 
        },
        { 
          field: 'species', 
          header: 'Species', 
          render: (v) => `<span class="font-semibold text-[#172B4D]">${v}</span>` 
        },
        { 
          field: 'bookingNo', 
          header: 'Booking Number', 
          render: (v, row) => `<span class="font-bold text-[#0052CC] hover:underline cursor-pointer" onclick="window.__viewBookingDetails('${row.bookingNo}')">${v}</span>` 
        },
        { 
          field: 'bookingDate', 
          header: 'Booking Date', 
          render: (v, row) => `<span class="text-[#172B4D] font-medium">${v || row.expectedDate}</span>` 
        },
        { 
          field: 'purchaseType', 
          header: 'Purchase Type', 
          render: (v) => `<span class="font-medium text-[#172B4D] bg-[#F4F5F7] px-2 py-0.5 rounded text-[11px] border border-[#DFE1E6]">${v || 'Direct Procurement'}</span>` 
        },
        { 
          field: 'grader', 
          header: 'Grader', 
          render: (v) => `<span class="text-[#172B4D] font-medium">${v || 'B. Venkatesh'}</span>` 
        },
        { 
          field: 'agent', 
          header: 'Agent', 
          render: (v) => `<span class="text-[#5E6C84]">${v || 'Direct'}</span>` 
        },
        { 
          field: 'bookingCount', 
          header: 'Booking Count', 
          render: (v) => `<span class="font-bold text-[#0052CC]">${v || '40 Count'}</span>` 
        },
        { 
          field: 'bookingWeight', 
          header: 'Booking Weight', 
          render: (v, row) => `<span class="font-extrabold text-[#006644]">${(typeof v === 'number' ? v : (row.bookedQty || 0)).toLocaleString()} KG</span>` 
        },
        { 
          field: 'bookingRate', 
          header: 'Booking Rate', 
          render: (v) => `<span class="font-bold text-[#172B4D]">₹ ${v || 420} / KG</span>` 
        }
      ],
      actions: [
        {
          label: 'View',
          icon: `<svg class="w-4 h-4 text-[#5E6C84]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`,
          onClick: (row) => PurchaseView.showBookingDetails(row)
        },
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

    window.__viewBookingDetails = (bkgNo) => {
      const b = this.bookingsList.find(x => x.bookingNo === bkgNo);
      if (b) PurchaseView.showBookingDetails(b);
    };

    const filterPurchase = document.getElementById('booking-top-purchase-select');
    const filterPlant = document.getElementById('booking-top-plant-select');
    const filterDate = document.getElementById('booking-top-date-input');
    const searchBtn = document.getElementById('booking-top-search-btn');
    const resetBtn = document.getElementById('booking-top-reset-btn');
    const toggleBtn = document.getElementById('booking-top-toggle-btn');
    const filterBody = document.getElementById('booking-top-filter-body');
    const toggleText = document.getElementById('booking-top-toggle-text');
    const toggleIcon = document.getElementById('booking-top-toggle-icon');

    // Toggle hide/show filter
    if (toggleBtn && filterBody) {
      let isCollapsed = false;
      toggleBtn.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        if (isCollapsed) {
          filterBody.classList.add('hidden');
          if (toggleText) toggleText.innerText = 'Show Filter';
          if (toggleIcon) toggleIcon.classList.add('-rotate-90');
          toggleBtn.classList.remove('bg-[#DEEBFF]/80', 'text-[#0052CC]', 'border-[#B3D4FF]');
          toggleBtn.classList.add('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        } else {
          filterBody.classList.remove('hidden');
          if (toggleText) toggleText.innerText = 'Hide Filter';
          if (toggleIcon) toggleIcon.classList.remove('-rotate-90');
          toggleBtn.classList.add('bg-[#DEEBFF]/80', 'text-[#0052CC]', 'border-[#B3D4FF]');
          toggleBtn.classList.remove('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        }
      });
    }

    const applyBookingFilters = () => {
      const pVal = filterPurchase ? filterPurchase.value : 'ALL';
      const plVal = filterPlant ? filterPlant.value : 'ALL';
      const dVal = filterDate ? filterDate.value : '';

      const filtered = this.bookingsList.filter(b => {
        const matchPurchase = (pVal === 'ALL') || (b.purchaseType === pVal);
        const matchPlant = (plVal === 'ALL') || (b.arrivalPlant === plVal) || (b.arrivalPlant && b.arrivalPlant.includes(plVal));
        const matchDate = !dVal || (b.bookingDate === dVal) || (b.expectedDate === dVal);
        return matchPurchase && matchPlant && matchDate;
      });

      bookingsTable.setData(filtered);
      Toast.show(`Filtered ${filtered.length} booking records.`, 'info', 'Search Results');
    };

    if (searchBtn) searchBtn.addEventListener('click', applyBookingFilters);
    if (filterPurchase) filterPurchase.addEventListener('change', applyBookingFilters);
    if (filterPlant) filterPlant.addEventListener('change', applyBookingFilters);
    if (filterDate) filterDate.addEventListener('change', applyBookingFilters);

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (filterPurchase) filterPurchase.value = 'ALL';
        if (filterPlant) filterPlant.value = 'ALL';
        if (filterDate) filterDate.value = '';
        bookingsTable.setData(this.bookingsList);
        Toast.show('Filters have been reset. Displaying all bookings.', 'info');
      });
    }

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
        <!-- Header with Title and Create Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#DFE1E6] pb-3">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-extrabold text-[#172B4D]">Raw Material Arrivals</h1>
              <span class="lozenge lozenge-blue font-bold text-xs" id="rm-arrivals-count-badge">${this.rmArrivalsList.length} Records</span>
            </div>
            <p class="text-xs text-[#5E6C84] mt-0.5">Physical intake of fresh harvest catch, dock weighbridge readings, and processing balance ledgers.</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-create-arrival-modal" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer">
              <span>Create RM Arrival</span>
            </button>
          </div>
        </div>

        <!-- Search / Filter Fields: Date, Company, Species, Plant, Center, Weight, Amount, Average Rate -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs mb-4 transition-all duration-200">
          <div class="flex items-center justify-between pb-3 border-b border-[#EBECF0]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <h3 class="text-xs font-bold text-[#172B4D]">Search &amp; Filters</h3>
            </div>

            <!-- Filter Controls: Reset & Toggle Open/Close -->
            <div class="flex items-center gap-2">
              <button type="button" id="rm-top-reset-btn" class="dt-top-filter-reset-btn text-xs font-semibold text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#F4F5F7] px-2.5 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-colors cursor-pointer" title="Reset all filters">
                <svg class="w-3.5 h-3.5 text-[#6B778C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Reset</span>
              </button>

              <button type="button" id="rm-top-toggle-btn" class="dt-top-filter-toggle-btn text-xs font-semibold text-[#0052CC] bg-[#DEEBFF]/80 hover:bg-[#DEEBFF] px-3 py-1.5 rounded border border-[#B3D4FF] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer">
                <svg class="w-3.5 h-3.5 dt-top-filter-toggle-icon transform transition-transform duration-200" id="rm-top-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                <span class="dt-top-filter-toggle-text" id="rm-top-toggle-text">Hide Filter</span>
              </button>
            </div>
          </div>

          <!-- Collapsible Filter Inputs Grid -->
          <div id="rm-top-filter-body" class="dt-top-filter-body mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 text-xs transition-all duration-200">
            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">DATE</label>
              <input type="text" id="rm-top-date-input" value="06/10/2026" placeholder="06/10/2026" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">COMPANY</label>
              <select id="rm-top-company-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="ALL">All Companies</option>
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
                <option value="DEVI SEAFOODS">DEVI SEAFOODS</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">SPECIES</label>
              <select id="rm-top-species-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="ALL">Select Species</option>
                <option value="Vannamei (VM)">Vannamei (VM)</option>
                <option value="Black Tiger (BT)">Black Tiger (BT)</option>
                <option value="Asian Seabass">Asian Seabass</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">PLANT</label>
              <select id="rm-top-plant-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="ALL">Select Plant</option>
                <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-4 (PND)">DFL UNIT-4 (PND)</option>
                <option value="DFL UNIT-5 (JPT)">DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-6 (JPT-II)">DFL UNIT-6 (JPT-II)</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">CENTER</label>
              <select id="rm-top-center-select" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="ALL">Select Center</option>
                <option value="Bhimavaram Center #1">Bhimavaram Center #1</option>
                <option value="Kakinada Sea Intake #2">Kakinada Sea Intake #2</option>
                <option value="Machilipatnam Delta #3">Machilipatnam Delta #3</option>
                <option value="Amalapuram Harvesters #4">Amalapuram Harvesters #4</option>
                <option value="Ongole Coastal Hub #1">Ongole Coastal Hub #1</option>
                <option value="Visakhapatnam Gate Dock">Visakhapatnam Gate Dock</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">WEIGHT</label>
              <input type="text" id="rm-top-weight-input" placeholder="Enter Weight" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">AMOUNT</label>
              <input type="text" id="rm-top-amount-input" placeholder="Enter Amount" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">AVERAGE RATE</label>
              <input type="text" id="rm-top-avgrate-input" placeholder="Enter Average Rate" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
            </div>
          </div>

          <div class="mt-3 flex justify-end">
            <button type="button" id="rm-top-search-btn" class="dt-top-filter-search-btn btn-primary px-5 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <span>Search</span>
            </button>
          </div>
        </div>

        <!-- Table Container -->
        <div id="rm-arrivals-table-container"></div>
      </div>
    `;

    const arrivalsTable = new DataTable({
      containerId: 'rm-arrivals-table-container',
      data: this.rmArrivalsList,
      keyField: 'arrivalNumber',
      pageSize: 10,
      tableTitle: 'Raw Material Arrivals List',
      searchable: false,
      hideTopFilterBar: true,
      columns: [
        { 
          field: 'sNo', 
          header: 'SNO', 
          render: (v, row, index) => `<span class="font-bold text-[#5E6C84]">${index !== undefined ? index + 1 : 1}</span>` 
        },
        { 
          field: 'date', 
          header: 'Date', 
          render: (v) => `<span class="font-medium text-[#172B4D]">${v || '06/10/2026'}</span>` 
        },
        { 
          field: 'plant', 
          header: 'Plant', 
          render: (v) => `<span class="font-semibold text-[#0052CC]">${v || 'DFL UNIT-5 (JPT)'}</span>` 
        },
        { 
          field: 'center', 
          header: 'Center', 
          render: (v) => `<span class="text-[#172B4D] font-medium">${v || 'Bhimavaram Center #1'}</span>` 
        },
        { 
          field: 'species', 
          header: 'Species', 
          render: (v) => `<span class="font-semibold text-[#172B4D]">${v || 'Vannamei (VM)'}</span>` 
        },
        { 
          field: 'weight', 
          header: 'Weight', 
          render: (v) => `<span class="font-extrabold text-[#006644]">${(typeof v === 'number' ? v : parseFloat(v) || 0).toLocaleString()} KG</span>` 
        },
        { 
          field: 'balanceWeight', 
          header: 'Balance Weight', 
          render: (v) => `<span class="font-bold text-[#FF8B00]">${(typeof v === 'number' ? v : parseFloat(v) || 0).toLocaleString()} KG</span>` 
        },
        { 
          field: 'status', 
          header: 'Status', 
          type: 'status' 
        },
        { 
          field: 'averageRate', 
          header: 'Average Rate', 
          render: (v) => `<span class="font-bold text-[#172B4D]">₹ ${v || 425} / KG</span>` 
        },
        { 
          field: 'amount', 
          header: 'Amount', 
          render: (v) => `<span class="font-extrabold text-[#172B4D]">₹ ${(typeof v === 'number' ? v : parseFloat(v) || 0).toLocaleString()}</span>` 
        },
        { 
          field: 'balanceAmount', 
          header: 'Balance Amount', 
          render: (v) => `<span class="font-bold text-[#6554C0]">₹ ${(typeof v === 'number' ? v : parseFloat(v) || 0).toLocaleString()}</span>` 
        }
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

    const filterDate = document.getElementById('rm-top-date-input');
    const filterCompany = document.getElementById('rm-top-company-select');
    const filterSpecies = document.getElementById('rm-top-species-select');
    const filterPlant = document.getElementById('rm-top-plant-select');
    const filterCenter = document.getElementById('rm-top-center-select');
    const filterWeight = document.getElementById('rm-top-weight-input');
    const filterAmount = document.getElementById('rm-top-amount-input');
    const filterAvgRate = document.getElementById('rm-top-avgrate-input');
    const searchBtn = document.getElementById('rm-top-search-btn');
    const resetBtn = document.getElementById('rm-top-reset-btn');
    const toggleBtn = document.getElementById('rm-top-toggle-btn');
    const filterBody = document.getElementById('rm-top-filter-body');
    const toggleText = document.getElementById('rm-top-toggle-text');
    const toggleIcon = document.getElementById('rm-top-toggle-icon');

    // Toggle hide/show filter
    if (toggleBtn && filterBody) {
      let isCollapsed = false;
      toggleBtn.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        if (isCollapsed) {
          filterBody.classList.add('hidden');
          if (toggleText) toggleText.innerText = 'Show Filter';
          if (toggleIcon) toggleIcon.classList.add('-rotate-90');
          toggleBtn.classList.remove('bg-[#DEEBFF]/80', 'text-[#0052CC]', 'border-[#B3D4FF]');
          toggleBtn.classList.add('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        } else {
          filterBody.classList.remove('hidden');
          if (toggleText) toggleText.innerText = 'Hide Filter';
          if (toggleIcon) toggleIcon.classList.remove('-rotate-90');
          toggleBtn.classList.add('bg-[#DEEBFF]/80', 'text-[#0052CC]', 'border-[#B3D4FF]');
          toggleBtn.classList.remove('bg-[#FAFBFC]', 'text-[#5E6C84]', 'border-[#DFE1E6]');
        }
      });
    }

    const applyRMFilters = () => {
      const dVal = (filterDate ? filterDate.value : '').trim();
      const compVal = filterCompany ? filterCompany.value : 'ALL';
      const specVal = filterSpecies ? filterSpecies.value : 'ALL';
      const plVal = filterPlant ? filterPlant.value : 'ALL';
      const ctrVal = filterCenter ? filterCenter.value : 'ALL';
      const wtVal = filterWeight ? parseFloat(filterWeight.value) : null;
      const amtVal = filterAmount ? parseFloat(filterAmount.value) : null;
      const rateVal = filterAvgRate ? parseFloat(filterAvgRate.value) : null;

      const filtered = this.rmArrivalsList.filter(item => {
        const matchDate = !dVal || (item.date && item.date.includes(dVal));
        const matchComp = (compVal === 'ALL') || (item.company === compVal);
        const matchSpec = (specVal === 'ALL') || (item.species === specVal);
        const matchPlant = (plVal === 'ALL') || (item.plant === plVal) || (item.plant && item.plant.includes(plVal));
        const matchCenter = (ctrVal === 'ALL') || (item.center === ctrVal) || (item.center && item.center.includes(ctrVal));
        const matchWeight = isNaN(wtVal) || wtVal === null || (item.weight >= wtVal);
        const matchAmount = isNaN(amtVal) || amtVal === null || (item.amount >= amtVal);
        const matchRate = isNaN(rateVal) || rateVal === null || (item.averageRate >= rateVal);

        return matchDate && matchComp && matchSpec && matchPlant && matchCenter && matchWeight && matchAmount && matchRate;
      });

      arrivalsTable.setData(filtered);
      Toast.show(`Filtered ${filtered.length} raw material arrival records.`, 'info', 'Search Results');
    };

    if (searchBtn) searchBtn.addEventListener('click', applyRMFilters);
    if (filterCompany) filterCompany.addEventListener('change', applyRMFilters);
    if (filterSpecies) filterSpecies.addEventListener('change', applyRMFilters);
    if (filterPlant) filterPlant.addEventListener('change', applyRMFilters);
    if (filterCenter) filterCenter.addEventListener('change', applyRMFilters);

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (filterDate) filterDate.value = '06/10/2026';
        if (filterCompany) filterCompany.value = 'DEVI FISHERIES LIMITED';
        if (filterSpecies) filterSpecies.value = 'ALL';
        if (filterPlant) filterPlant.value = 'ALL';
        if (filterCenter) filterCenter.value = 'ALL';
        if (filterWeight) filterWeight.value = '';
        if (filterAmount) filterAmount.value = '';
        if (filterAvgRate) filterAvgRate.value = '';
        arrivalsTable.setData(this.rmArrivalsList);
        Toast.show('Filters have been reset. Displaying all RM arrivals.', 'info');
      });
    }

    const createBtn = document.getElementById('btn-create-arrival-modal');
    if (createBtn) {
      createBtn.addEventListener('click', () => PurchaseView.openCreateArrivalModal(arrivalsTable));
    }
  },

  // =========================================================================
  // SUB MENU: OPERATIONS -> TAB 3: ARRIVALS (CENTER CATCH INWARD REGISTER)
  // =========================================================================
  renderArrivals(container) {
    const totalCatchKg = ERP_DATA.arrivals.reduce((sum, a) => sum + (a.netCatchKg || 0), 0);
    const totalCrates = ERP_DATA.arrivals.reduce((sum, a) => sum + (a.cratesIn || 0), 0);

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Header with Title and Create Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#DFE1E6] pb-3">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-extrabold text-[#172B4D]">Arrivals Register (Center Catch Inward)</h1>
              <span class="lozenge lozenge-blue font-bold text-xs">${ERP_DATA.arrivals.length} Receipts</span>
            </div>
            <p class="text-xs text-[#5E6C84] mt-0.5">Procurement center intake records, crates tally, icing checks, and farm-to-dock harvest receipts.</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-create-arrival-record" class="btn-primary px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-xs cursor-pointer">
              <span>Create Arrival</span>
            </button>
          </div>
        </div>

        <!-- 4 KPI Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="bg-white p-3.5 rounded-xl border border-[#DFE1E6] shadow-xs">
            <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">Total Net Catch</span>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#006644]">${totalCatchKg.toLocaleString()} KG</span>
              <span class="text-[10px] text-[#006644] font-semibold bg-[#E3FCEF] px-1.5 py-0.5 rounded">Intake Verified</span>
            </div>
          </div>

          <div class="bg-white p-3.5 rounded-xl border border-[#DFE1E6] shadow-xs">
            <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">Active Centers</span>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0052CC]">5 Centers</span>
              <span class="text-[10px] text-[#0052CC] font-semibold bg-[#DEEBFF] px-1.5 py-0.5 rounded">All Active</span>
            </div>
          </div>

          <div class="bg-white p-3.5 rounded-xl border border-[#DFE1E6] shadow-xs">
            <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">Crates Inward</span>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#172B4D]">${totalCrates.toLocaleString()} Crates</span>
              <span class="text-[10px] text-[#6B778C] font-semibold bg-[#F4F5F7] px-1.5 py-0.5 rounded">100% Retained</span>
            </div>
          </div>

          <div class="bg-white p-3.5 rounded-xl border border-[#DFE1E6] shadow-xs">
            <span class="text-[11px] font-bold uppercase tracking-wider text-[#5E6C84] block mb-1">Avg Core Temp</span>
            <div class="flex items-baseline justify-between">
              <span class="text-xl font-extrabold text-[#0747A6]">2.6 °C</span>
              <span class="text-[10px] text-[#006644] font-semibold bg-[#E3FCEF] px-1.5 py-0.5 rounded">HACCP Target &lt; 4°C</span>
            </div>
          </div>
        </div>

        <!-- Table Mount Point -->
        <div id="center-arrivals-table-container"></div>
      </div>
    `;

    const arrivalsTable = new DataTable({
      containerId: 'center-arrivals-table-container',
      data: ERP_DATA.arrivals,
      keyField: 'id',
      pageSize: 10,
      tableTitle: 'Center Inward Catch Receipts & Dispatch Register (CRUD)',
      columns: [
        { 
          field: 'arrivalCode', 
          header: 'Arrival Code', 
          render: (val, row) => `<span class="font-bold text-[#0052CC] hover:underline cursor-pointer" onclick="window.__viewArrivalRecord('${row.id}')">${val}</span>` 
        },
        { 
          field: 'date', 
          header: 'Date & Time', 
          render: (val, row) => `<div><span class="font-medium text-[#172B4D]">${val}</span><div class="text-[10px] text-[#6B778C]">${row.time || 'Morning'}</div></div>` 
        },
        { field: 'center', header: 'Center / Station' },
        { 
          field: 'supplier', 
          header: 'Farmer / Supplier', 
          render: (val, row) => `<div><span class="font-semibold text-[#172B4D]">${val}</span><div class="text-[10px] text-[#6B778C]">${row.pond}</div></div>` 
        },
        { 
          field: 'species', 
          header: 'Species & Count', 
          render: (val, row) => `<div><span class="font-medium text-[#172B4D]">${val}</span><div class="text-[10px] font-bold text-[#0052CC]">${row.countRange}</div></div>` 
        },
        { 
          field: 'cratesIn', 
          header: 'Crates (In/Out)', 
          render: (val, row) => `<span class="font-bold">${val} / ${row.cratesOut || val}</span>` 
        },
        { 
          field: 'netCatchKg', 
          header: 'Net Catch (KG)', 
          render: (val) => `<span class="font-extrabold text-[#006644]">${val.toLocaleString()} KG</span>` 
        },
        { 
          field: 'temperature', 
          header: 'Temp (°C)', 
          render: (val) => {
            const num = parseFloat(val) || 2.5;
            const cls = num <= 3.0 ? 'lozenge-success' : 'lozenge-warning';
            return `<span class="lozenge ${cls}">${val}</span>`;
          } 
        },
        { 
          field: 'vehicleNo', 
          header: 'Vehicle & Driver', 
          render: (val, row) => `<div><span class="font-bold text-[#172B4D]">${val}</span><div class="text-[10px] text-[#6B778C]">${row.driverName}</div></div>` 
        },
        { 
          field: 'graderName', 
          header: 'Grader / Lead', 
          render: (val, row) => `<div><span class="text-[#172B4D]">${val}</span><div class="text-[10px] text-[#6B778C]">${row.supervisor}</div></div>` 
        },
        { field: 'status', header: 'Status', type: 'status' }
      ],
      actions: [
        {
          label: 'View',
          icon: `<svg class="w-4 h-4 text-[#5E6C84]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`,
          onClick: (row) => PurchaseView.showArrivalRecordDetails(row)
        },
        {
          label: 'Edit',
          icon: `<svg class="w-4 h-4 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
          onClick: (row) => PurchaseView.openEditArrivalRecordModal(row, arrivalsTable)
        },
        {
          label: 'Delete',
          icon: `<svg class="w-4 h-4 text-[#FF5630]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
          onClick: (row) => PurchaseView.deleteArrivalRecord(row, arrivalsTable)
        }
      ]
    });

    window.__viewArrivalRecord = (id) => {
      const item = ERP_DATA.arrivals.find(a => a.id === id);
      if (item) PurchaseView.showArrivalRecordDetails(item);
    };

    const createBtn = document.getElementById('btn-create-arrival-record');
    if (createBtn) {
      createBtn.addEventListener('click', () => PurchaseView.openCreateArrivalRecordModal(arrivalsTable));
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
    const nextArrNo = `RMA-2026-${100 + this.rmArrivalsList.length + 1}`;
    Modal.open({
      title: 'Create Raw Material Arrival',
      size: 'lg',
      content: `
        <form id="form-create-rm-arrival" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Number</label>
              <input type="text" id="rm-new-no" value="${nextArrNo}" readonly class="w-full text-xs px-3 py-1.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-bold text-[#0052CC]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Date</label>
              <input type="text" id="rm-new-date" value="06/10/2026" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Company</label>
              <select id="rm-new-company" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
                <option value="DEVI SEAFOODS">DEVI SEAFOODS</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Plant</label>
              <select id="rm-new-plant" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="DFL UNIT-5 (JPT)" selected>DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-3 (PSP)">DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-6 (JPT-II)">DFL UNIT-6 (JPT-II)</option>
                <option value="DFL UNIT-4 (PND)">DFL UNIT-4 (PND)</option>
                <option value="DFL UNIT-2 (KKD)">DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-1 (VSP)">DFL UNIT-1 (VSP)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Center</label>
              <select id="rm-new-center" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="Bhimavaram Center #1" selected>Bhimavaram Center #1</option>
                <option value="Kakinada Sea Intake #2">Kakinada Sea Intake #2</option>
                <option value="Machilipatnam Delta #3">Machilipatnam Delta #3</option>
                <option value="Amalapuram Harvesters #4">Amalapuram Harvesters #4</option>
                <option value="Ongole Coastal Hub #1">Ongole Coastal Hub #1</option>
                <option value="Visakhapatnam Gate Dock">Visakhapatnam Gate Dock</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
              <select id="rm-new-species" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="Vannamei (VM)" selected>Vannamei (VM)</option>
                <option value="Black Tiger (BT)">Black Tiger (BT)</option>
                <option value="Asian Seabass">Asian Seabass</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Weight (KG)</label>
              <input type="number" id="rm-new-weight" value="3850" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Balance Weight (KG)</label>
              <input type="number" id="rm-new-bal-weight" value="1250" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Average Rate (₹/KG)</label>
              <input type="number" id="rm-new-avgrate" value="425" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Status</label>
              <select id="rm-new-status" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="QC_CLEARED" selected>QC_CLEARED</option>
                <option value="RECEIVED">RECEIVED</option>
                <option value="IN_PROCESS">IN_PROCESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
          </div>

          <!-- Real-Time Amount Calculations Card -->
          <div class="p-3 bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg">
            <span class="text-xs font-bold text-[#172B4D] block mb-2">Real-Time Valuation Summary</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="p-2.5 bg-white border border-[#DFE1E6] rounded">
                <span class="text-[11px] font-semibold text-[#5E6C84] block mb-1">Total Amount (Weight × Avg Rate)</span>
                <div id="rm-new-amt-preview" class="text-sm font-extrabold text-[#172B4D]">
                  ₹ 16,36,250
                </div>
              </div>
              <div class="p-2.5 bg-white border border-[#DFE1E6] rounded">
                <span class="text-[11px] font-semibold text-[#5E6C84] block mb-1">Balance Amount (Bal Weight × Avg Rate)</span>
                <div id="rm-new-balamt-preview" class="text-sm font-extrabold text-[#6554C0]">
                  ₹ 5,31,250
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Vehicle Number</label>
              <input type="text" id="rm-new-veh" value="AP 37 TE 9011" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Driver Name</label>
              <input type="text" id="rm-new-driver" value="K. Ramu" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#172B4D] mb-1">Remarks</label>
            <textarea id="rm-new-remarks" rows="2" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">Fresh intake verified at dock weighbridge.</textarea>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Save',
          type: 'primary',
          onClick: (m) => {
            const arrNo = document.getElementById('rm-new-no').value;
            const date = document.getElementById('rm-new-date').value || '06/10/2026';
            const company = document.getElementById('rm-new-company').value || 'DEVI FISHERIES LIMITED';
            const plant = document.getElementById('rm-new-plant').value || 'DFL UNIT-5 (JPT)';
            const center = document.getElementById('rm-new-center').value || 'Bhimavaram Center #1';
            const species = document.getElementById('rm-new-species').value || 'Vannamei (VM)';
            const weight = parseFloat(document.getElementById('rm-new-weight').value) || 0;
            const balWeight = parseFloat(document.getElementById('rm-new-bal-weight').value) || 0;
            const avgRate = parseFloat(document.getElementById('rm-new-avgrate').value) || 0;
            const status = document.getElementById('rm-new-status').value || 'QC_CLEARED';
            const veh = document.getElementById('rm-new-veh').value || '';
            const driver = document.getElementById('rm-new-driver').value || '';
            const remarks = document.getElementById('rm-new-remarks').value || '';

            const amount = weight * avgRate;
            const balAmount = balWeight * avgRate;

            const newRecord = {
              sNo: this.rmArrivalsList.length + 1,
              id: arrNo,
              arrivalNumber: arrNo,
              date: date,
              company: company,
              plant: plant,
              center: center,
              species: species,
              weight: weight,
              balanceWeight: balWeight,
              status: status,
              averageRate: avgRate,
              amount: amount,
              balanceAmount: balAmount,
              vehicleNumber: veh,
              driverName: driver,
              remarks: remarks
            };

            this.rmArrivalsList.unshift(newRecord);
            if (tableInstance) tableInstance.setData(this.rmArrivalsList);
            const badge = document.getElementById('rm-arrivals-count-badge');
            if (badge) badge.innerText = `${this.rmArrivalsList.length} Records`;

            m.close();

            // Confirmation Popup after save
            Modal.success({
              title: 'Raw Material Arrival Saved Successfully',
              message: `Arrival record <strong>${arrNo}</strong> has been registered and verified.`,
              details: [
                { label: 'Arrival Number', value: arrNo },
                { label: 'Date', value: date },
                { label: 'Plant Facility', value: plant },
                { label: 'Procurement Center', value: center },
                { label: 'Species', value: species },
                { label: 'Intake Weight', value: `${weight.toLocaleString()} KG` },
                { label: 'Total Valuation', value: `₹ ${amount.toLocaleString()}` }
              ]
            });
            Toast.show(`Arrival ${arrNo} saved successfully.`, 'success', 'Arrival Registered');
          }
        }
      ]
    });

    setTimeout(() => {
      const wtInput = document.getElementById('rm-new-weight');
      const bwtInput = document.getElementById('rm-new-bal-weight');
      const rateInput = document.getElementById('rm-new-avgrate');
      const amtPrev = document.getElementById('rm-new-amt-preview');
      const bamtPrev = document.getElementById('rm-new-balamt-preview');

      const recalc = () => {
        const w = parseFloat(wtInput ? wtInput.value : 0) || 0;
        const bw = parseFloat(bwtInput ? bwtInput.value : 0) || 0;
        const r = parseFloat(rateInput ? rateInput.value : 0) || 0;
        if (amtPrev) amtPrev.innerText = `₹ ${(w * r).toLocaleString()}`;
        if (bamtPrev) bamtPrev.innerText = `₹ ${(bw * r).toLocaleString()}`;
      };

      if (wtInput) wtInput.addEventListener('input', recalc);
      if (bwtInput) bwtInput.addEventListener('input', recalc);
      if (rateInput) rateInput.addEventListener('input', recalc);
    }, 50);
  },

  openEditArrivalModal(arrival, tableInstance) {
    Modal.open({
      title: `Edit Raw Material Arrival: ${arrival.arrivalNumber || arrival.id}`,
      size: 'lg',
      content: `
        <form id="form-edit-rm-arrival" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Number</label>
              <input type="text" value="${arrival.arrivalNumber || arrival.id}" readonly class="w-full text-xs px-3 py-1.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-bold text-[#0052CC]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Date</label>
              <input type="text" id="rm-edit-date" value="${arrival.date || '06/10/2026'}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Company</label>
              <select id="rm-edit-company" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="DEVI FISHERIES LIMITED" ${arrival.company === 'DEVI FISHERIES LIMITED' ? 'selected' : ''}>DEVI FISHERIES LIMITED</option>
                <option value="DEVI AQUA FEEDS" ${arrival.company === 'DEVI AQUA FEEDS' ? 'selected' : ''}>DEVI AQUA FEEDS</option>
                <option value="DEVI SEAFOODS" ${arrival.company === 'DEVI SEAFOODS' ? 'selected' : ''}>DEVI SEAFOODS</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Plant</label>
              <select id="rm-edit-plant" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="DFL UNIT-5 (JPT)" ${arrival.plant === 'DFL UNIT-5 (JPT)' ? 'selected' : ''}>DFL UNIT-5 (JPT)</option>
                <option value="DFL UNIT-3 (PSP)" ${arrival.plant === 'DFL UNIT-3 (PSP)' ? 'selected' : ''}>DFL UNIT-3 (PSP)</option>
                <option value="DFL UNIT-6 (JPT-II)" ${arrival.plant === 'DFL UNIT-6 (JPT-II)' ? 'selected' : ''}>DFL UNIT-6 (JPT-II)</option>
                <option value="DFL UNIT-4 (PND)" ${arrival.plant === 'DFL UNIT-4 (PND)' ? 'selected' : ''}>DFL UNIT-4 (PND)</option>
                <option value="DFL UNIT-2 (KKD)" ${arrival.plant === 'DFL UNIT-2 (KKD)' ? 'selected' : ''}>DFL UNIT-2 (KKD)</option>
                <option value="DFL UNIT-1 (VSP)" ${arrival.plant === 'DFL UNIT-1 (VSP)' ? 'selected' : ''}>DFL UNIT-1 (VSP)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Center</label>
              <select id="rm-edit-center" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="Bhimavaram Center #1" ${arrival.center === 'Bhimavaram Center #1' ? 'selected' : ''}>Bhimavaram Center #1</option>
                <option value="Kakinada Sea Intake #2" ${arrival.center === 'Kakinada Sea Intake #2' ? 'selected' : ''}>Kakinada Sea Intake #2</option>
                <option value="Machilipatnam Delta #3" ${arrival.center === 'Machilipatnam Delta #3' ? 'selected' : ''}>Machilipatnam Delta #3</option>
                <option value="Amalapuram Harvesters #4" ${arrival.center === 'Amalapuram Harvesters #4' ? 'selected' : ''}>Amalapuram Harvesters #4</option>
                <option value="Ongole Coastal Hub #1" ${arrival.center === 'Ongole Coastal Hub #1' ? 'selected' : ''}>Ongole Coastal Hub #1</option>
                <option value="Visakhapatnam Gate Dock" ${arrival.center === 'Visakhapatnam Gate Dock' ? 'selected' : ''}>Visakhapatnam Gate Dock</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
              <select id="rm-edit-species" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="Vannamei (VM)" ${arrival.species === 'Vannamei (VM)' ? 'selected' : ''}>Vannamei (VM)</option>
                <option value="Black Tiger (BT)" ${arrival.species === 'Black Tiger (BT)' ? 'selected' : ''}>Black Tiger (BT)</option>
                <option value="Asian Seabass" ${arrival.species === 'Asian Seabass' ? 'selected' : ''}>Asian Seabass</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Weight (KG)</label>
              <input type="number" id="rm-edit-weight" value="${arrival.weight || 0}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Balance Weight (KG)</label>
              <input type="number" id="rm-edit-bal-weight" value="${arrival.balanceWeight || 0}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Average Rate (₹/KG)</label>
              <input type="number" id="rm-edit-avgrate" value="${arrival.averageRate || 0}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Status</label>
              <select id="rm-edit-status" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">
                <option value="QC_CLEARED" ${arrival.status === 'QC_CLEARED' ? 'selected' : ''}>QC_CLEARED</option>
                <option value="RECEIVED" ${arrival.status === 'RECEIVED' ? 'selected' : ''}>RECEIVED</option>
                <option value="IN_PROCESS" ${arrival.status === 'IN_PROCESS' ? 'selected' : ''}>IN_PROCESS</option>
                <option value="COMPLETED" ${arrival.status === 'COMPLETED' ? 'selected' : ''}>COMPLETED</option>
              </select>
            </div>
          </div>

          <!-- Real-Time Amount Calculations Card -->
          <div class="p-3 bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg">
            <span class="text-xs font-bold text-[#172B4D] block mb-2">Real-Time Valuation Summary</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="p-2.5 bg-white border border-[#DFE1E6] rounded">
                <span class="text-[11px] font-semibold text-[#5E6C84] block mb-1">Total Amount (Weight × Avg Rate)</span>
                <div id="rm-edit-amt-preview" class="text-sm font-extrabold text-[#172B4D]">
                  ₹ ${(arrival.amount || 0).toLocaleString()}
                </div>
              </div>
              <div class="p-2.5 bg-white border border-[#DFE1E6] rounded">
                <span class="text-[11px] font-semibold text-[#5E6C84] block mb-1">Balance Amount (Bal Weight × Avg Rate)</span>
                <div id="rm-edit-balamt-preview" class="text-sm font-extrabold text-[#6554C0]">
                  ₹ ${(arrival.balanceAmount || 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Vehicle Number</label>
              <input type="text" id="rm-edit-veh" value="${arrival.vehicleNumber || ''}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Driver Name</label>
              <input type="text" id="rm-edit-driver" value="${arrival.driverName || ''}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#172B4D] mb-1">Remarks</label>
            <textarea id="rm-edit-remarks" rows="2" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]">${arrival.remarks || ''}</textarea>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Save',
          type: 'primary',
          onClick: (m) => {
            arrival.date = document.getElementById('rm-edit-date').value || arrival.date;
            arrival.company = document.getElementById('rm-edit-company').value || arrival.company;
            arrival.plant = document.getElementById('rm-edit-plant').value || arrival.plant;
            arrival.center = document.getElementById('rm-edit-center').value || arrival.center;
            arrival.species = document.getElementById('rm-edit-species').value || arrival.species;
            arrival.weight = parseFloat(document.getElementById('rm-edit-weight').value) || 0;
            arrival.balanceWeight = parseFloat(document.getElementById('rm-edit-bal-weight').value) || 0;
            arrival.averageRate = parseFloat(document.getElementById('rm-edit-avgrate').value) || 0;
            arrival.status = document.getElementById('rm-edit-status').value || arrival.status;
            arrival.vehicleNumber = document.getElementById('rm-edit-veh').value || '';
            arrival.driverName = document.getElementById('rm-edit-driver').value || '';
            arrival.remarks = document.getElementById('rm-edit-remarks').value || '';

            arrival.amount = arrival.weight * arrival.averageRate;
            arrival.balanceAmount = arrival.balanceWeight * arrival.averageRate;

            if (tableInstance) tableInstance.setData(this.rmArrivalsList);
            m.close();

            // Confirmation Popup after edit
            Modal.success({
              title: 'Raw Material Arrival Updated Successfully',
              message: `Arrival record <strong>${arrival.arrivalNumber || arrival.id}</strong> has been updated.`,
              details: [
                { label: 'Arrival Number', value: arrival.arrivalNumber || arrival.id },
                { label: 'Date', value: arrival.date },
                { label: 'Plant Facility', value: arrival.plant },
                { label: 'Center', value: arrival.center },
                { label: 'Updated Weight', value: `${arrival.weight.toLocaleString()} KG` },
                { label: 'Valuation Amount', value: `₹ ${arrival.amount.toLocaleString()}` }
              ]
            });
            Toast.show(`Arrival ${arrival.arrivalNumber || arrival.id} updated successfully.`, 'success');
          }
        }
      ]
    });

    setTimeout(() => {
      const wtInput = document.getElementById('rm-edit-weight');
      const bwtInput = document.getElementById('rm-edit-bal-weight');
      const rateInput = document.getElementById('rm-edit-avgrate');
      const amtPrev = document.getElementById('rm-edit-amt-preview');
      const bamtPrev = document.getElementById('rm-edit-balamt-preview');

      const recalc = () => {
        const w = parseFloat(wtInput ? wtInput.value : 0) || 0;
        const bw = parseFloat(bwtInput ? bwtInput.value : 0) || 0;
        const r = parseFloat(rateInput ? rateInput.value : 0) || 0;
        if (amtPrev) amtPrev.innerText = `₹ ${(w * r).toLocaleString()}`;
        if (bamtPrev) bamtPrev.innerText = `₹ ${(bw * r).toLocaleString()}`;
      };

      if (wtInput) wtInput.addEventListener('input', recalc);
      if (bwtInput) bwtInput.addEventListener('input', recalc);
      if (rateInput) rateInput.addEventListener('input', recalc);
    }, 50);
  },

  deleteArrival(arrival, tableInstance) {
    const arrNo = arrival.arrivalNumber || arrival.id;
    Modal.confirm({
      title: `Delete Arrival ${arrNo}`,
      message: `Are you sure you want to remove raw material arrival record <strong>${arrNo}</strong>?`,
      confirmText: 'Delete Arrival',
      isDestructive: true,
      onConfirm: () => {
        const idx = this.rmArrivalsList.findIndex(a => (a.arrivalNumber === arrNo || a.id === arrNo));
        if (idx > -1) {
          const removed = this.rmArrivalsList.splice(idx, 1)[0];
          if (tableInstance) tableInstance.setData(this.rmArrivalsList);
          const badge = document.getElementById('rm-arrivals-count-badge');
          if (badge) badge.innerText = `${this.rmArrivalsList.length} Records`;

          // Confirmation Popup after delete
          Modal.success({
            title: 'Arrival Record Deleted',
            message: `Raw material arrival <strong>${arrNo}</strong> has been deleted from the database.`,
            details: [
              { label: 'Deleted Record', value: arrNo },
              { label: 'Plant', value: removed.plant || 'DFL UNIT-5' },
              { label: 'Removed Weight', value: `${(removed.weight || 0).toLocaleString()} KG` }
            ]
          });
          Toast.show(`Arrival ${arrNo} deleted.`, 'success');
        }
      }
    });
  },

  // =========================================================================
  // CRUD MODAL HANDLERS FOR ARRIVALS (CENTER CATCH INWARD)
  // =========================================================================
  openCreateArrivalRecordModal(tableInstance) {
    const nextCode = `ARR-2026-${1046 + ERP_DATA.arrivals.length}`;
    Modal.open({
      title: 'Create Inward Harvest Catch Arrival Record',
      size: 'lg',
      content: `
        <form id="form-create-arrival-record" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Code</label>
              <input type="text" id="arr-code" value="${nextCode}" readonly class="w-full text-xs px-3 py-1.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-bold text-[#0052CC]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Arrival Date</label>
              <input type="date" id="arr-date" value="2026-10-06" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Procurement Center</label>
              <select id="arr-center" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                <option selected>Bhimavaram Center #1 (BVM-C1)</option>
                <option>Kakinada Sea Intake #2 (KKD-C2)</option>
                <option>Machilipatnam Delta #3 (MCN-C3)</option>
                <option>Amalapuram Harvesters #4 (AML-C4)</option>
                <option>Ongole Coastal Hub #1 (ONG-C1)</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Supplier / Farmer</label>
              <select id="arr-supplier" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                ${ERP_DATA.suppliers.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Pond / Location</label>
              <input type="text" id="arr-pond" value="Pond #4B Tail Cluster" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Species</label>
              <select id="arr-species" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
                ${ERP_DATA.species.map(sp => `<option value="${sp.name}">${sp.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Count Range</label>
              <input type="text" id="arr-count" value="44 pcs/kg" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Crates Inward</label>
              <input type="number" id="arr-crates-in" value="120" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Core Temp (°C)</label>
              <input type="number" step="0.1" id="arr-temp" value="2.5" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Vehicle Number</label>
              <input type="text" id="arr-veh" value="AP 37 TE 9942" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>

          <div class="p-3 bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg">
            <span class="text-xs font-bold text-[#172B4D] block mb-2">Weighment & Catch Calculation</span>
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-[#5E6C84] mb-1">Gross Wt (KG)</label>
                <input type="number" id="arr-gross-calc" value="3850" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-[#5E6C84] mb-1">Tare Wt (KG)</label>
                <input type="number" id="arr-tare-calc" value="450" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-[#5E6C84] mb-1">Ice Wt (KG)</label>
                <input type="number" id="arr-ice-calc" value="600" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-[#006644] mb-1">Calculated Net Catch</label>
                <div id="arr-net-preview" class="text-sm font-extrabold px-3 py-1.5 bg-[#E3FCEF] text-[#006644] rounded border border-[#ABF5D1]">
                  2,800 KG
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Driver Name</label>
              <input type="text" id="arr-driver-name" value="K. Appa Rao" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Grader / Technician</label>
              <input type="text" id="arr-grader-name" value="B. Venkatesh" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Center Supervisor</label>
              <input type="text" id="arr-supervisor-name" value="S. Prasad" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Create Arrival Record',
          type: 'primary',
          onClick: (m) => {
            const code = document.getElementById('arr-code').value;
            const date = document.getElementById('arr-date').value;
            const center = document.getElementById('arr-center').value;
            const sup = document.getElementById('arr-supplier').value;
            const pond = document.getElementById('arr-pond').value;
            const species = document.getElementById('arr-species').value;
            const count = document.getElementById('arr-count').value;
            const crates = parseInt(document.getElementById('arr-crates-in').value) || 100;
            const temp = parseFloat(document.getElementById('arr-temp').value) || 2.5;
            const veh = document.getElementById('arr-veh').value;
            const gross = parseFloat(document.getElementById('arr-gross-calc').value) || 3000;
            const tare = parseFloat(document.getElementById('arr-tare-calc').value) || 400;
            const ice = parseFloat(document.getElementById('arr-ice-calc').value) || 500;
            const net = Math.max(0, gross - tare - ice);
            const driver = document.getElementById('arr-driver-name').value;
            const grader = document.getElementById('arr-grader-name').value;
            const supervisor = document.getElementById('arr-supervisor-name').value;

            const newRecord = {
              id: code,
              arrivalCode: code,
              date: date,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              center: center,
              supplier: sup,
              pond: pond,
              species: species,
              countRange: count,
              cratesIn: crates,
              cratesOut: crates,
              iceWeightKg: ice,
              grossWeightKg: gross,
              tareWeightKg: tare,
              netCatchKg: net,
              temperature: `${temp} °C`,
              vehicleNo: veh,
              driverName: driver,
              graderName: grader,
              supervisor: supervisor,
              remarks: 'Created via center intake portal',
              status: 'QC_CLEARED'
            };

            ERP_DATA.arrivals.unshift(newRecord);
            if (tableInstance) tableInstance.setData(ERP_DATA.arrivals);
            m.close();

            // Confirmation Popup after save
            Modal.success({
              title: 'Arrival Receipt Submitted Successfully',
              message: `Inward catch arrival receipt ${code} has been recorded and verified.`,
              details: [
                { label: 'Arrival Code', value: code },
                { label: 'Procurement Center', value: center },
                { label: 'Farmer / Supplier', value: sup },
                { label: 'Net Catch Weight', value: `${net.toLocaleString()} KG` }
              ]
            });
            Toast.show(`Arrival receipt ${code} created successfully for ${net.toLocaleString()} KG`, 'success', 'Arrival Created');
          }
        }
      ]
    });

    setTimeout(() => {
      const g = document.getElementById('arr-gross-calc');
      const t = document.getElementById('arr-tare-calc');
      const i = document.getElementById('arr-ice-calc');
      const prev = document.getElementById('arr-net-preview');
      const calc = () => {
        const gv = parseFloat(g.value) || 0;
        const tv = parseFloat(t.value) || 0;
        const iv = parseFloat(i.value) || 0;
        const nv = Math.max(0, gv - tv - iv);
        if (prev) prev.innerText = `${nv.toLocaleString()} KG`;
      };
      if (g && t && i) {
        g.addEventListener('input', calc);
        t.addEventListener('input', calc);
        i.addEventListener('input', calc);
      }
    }, 60);
  },

  openEditArrivalRecordModal(arrival, tableInstance) {
    Modal.open({
      title: `Edit Arrival Record: ${arrival.arrivalCode}`,
      size: 'md',
      content: `
        <form class="space-y-3 text-xs">
          <div>
            <label class="block text-xs font-semibold text-[#172B4D] mb-1">Center / Station</label>
            <input type="text" id="edit-arrec-center" value="${arrival.center}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Pond / Harvest Location</label>
              <input type="text" id="edit-arrec-pond" value="${arrival.pond}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Count Range</label>
              <input type="text" id="edit-arrec-count" value="${arrival.countRange}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Net Catch (KG)</label>
              <input type="number" id="edit-arrec-net" value="${arrival.netCatchKg}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded font-bold text-[#006644]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Core Temp</label>
              <input type="text" id="edit-arrec-temp" value="${arrival.temperature}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Crates Inward</label>
              <input type="number" id="edit-arrec-crates" value="${arrival.cratesIn}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Vehicle Registration</label>
              <input type="text" id="edit-arrec-veh" value="${arrival.vehicleNo}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#172B4D] mb-1">Driver Name</label>
              <input type="text" id="edit-arrec-driver" value="${arrival.driverName}" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#172B4D] mb-1">Status</label>
            <select id="edit-arrec-status" class="w-full text-xs px-3 py-1.5 bg-white border border-[#DFE1E6] rounded">
              <option value="QC_CLEARED" ${arrival.status === 'QC_CLEARED' ? 'selected' : ''}>QC_CLEARED</option>
              <option value="UNDER_TESTING" ${arrival.status === 'UNDER_TESTING' ? 'selected' : ''}>UNDER_TESTING</option>
              <option value="TRANSFERRED" ${arrival.status === 'TRANSFERRED' ? 'selected' : ''}>TRANSFERRED</option>
              <option value="REJECTED" ${arrival.status === 'REJECTED' ? 'selected' : ''}>REJECTED</option>
            </select>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Update Arrival',
          type: 'primary',
          onClick: (m) => {
            arrival.center = document.getElementById('edit-arrec-center').value;
            arrival.pond = document.getElementById('edit-arrec-pond').value;
            arrival.countRange = document.getElementById('edit-arrec-count').value;
            arrival.netCatchKg = parseFloat(document.getElementById('edit-arrec-net').value) || arrival.netCatchKg;
            arrival.temperature = document.getElementById('edit-arrec-temp').value;
            arrival.cratesIn = parseInt(document.getElementById('edit-arrec-crates').value) || arrival.cratesIn;
            arrival.vehicleNo = document.getElementById('edit-arrec-veh').value;
            arrival.driverName = document.getElementById('edit-arrec-driver').value;
            arrival.status = document.getElementById('edit-arrec-status').value;

            if (tableInstance) tableInstance.setData(ERP_DATA.arrivals);
            m.close();

            // Confirmation Popup after update
            Modal.success({
              title: 'Arrival Record Updated',
              message: `Inward arrival receipt ${arrival.arrivalCode} has been updated.`,
              details: [
                { label: 'Arrival Code', value: arrival.arrivalCode },
                { label: 'Procurement Center', value: arrival.center },
                { label: 'Net Catch Weight', value: `${arrival.netCatchKg.toLocaleString()} KG` }
              ]
            });
            Toast.show(`Arrival ${arrival.arrivalCode} updated successfully.`, 'success');
          }
        }
      ]
    });
  },

  showArrivalRecordDetails(arrival) {
    Modal.open({
      title: `Arrival Receipt Details: ${arrival.arrivalCode}`,
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs">
          <div class="p-3 bg-[#DEEBFF] text-[#0747A6] rounded-lg border border-[#B3D4FF] flex items-center justify-between">
            <div>
              <span class="font-bold text-sm">${arrival.arrivalCode}</span>
              <span class="ml-2 text-xs">(${arrival.date} • ${arrival.time})</span>
            </div>
            <span class="lozenge lozenge-success font-bold">${arrival.status}</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Procurement Center</span>
              <span class="font-bold text-[#172B4D]">${arrival.center}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Farmer / Supplier</span>
              <span class="font-bold text-[#172B4D]">${arrival.supplier}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Harvest Source</span>
              <span class="font-bold text-[#172B4D]">${arrival.pond}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Species</span>
              <span class="font-bold text-[#0052CC]">${arrival.species}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Count / Grade</span>
              <span class="font-bold text-[#172B4D]">${arrival.countRange}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Gross / Tare Wt</span>
              <span class="font-bold text-[#172B4D]">${arrival.grossWeightKg} / ${arrival.tareWeightKg} KG</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Ice Weight</span>
              <span class="font-bold text-[#172B4D]">${arrival.iceWeightKg} KG</span>
            </div>
            <div class="p-2.5 bg-[#E3FCEF] border border-[#ABF5D1] rounded">
              <span class="text-[#006644] text-[11px] block">Net Catch Weight</span>
              <span class="font-extrabold text-sm text-[#006644]">${arrival.netCatchKg.toLocaleString()} KG</span>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Crates (In / Out)</span>
              <span class="font-bold text-[#172B4D]">${arrival.cratesIn} / ${arrival.cratesOut}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Vehicle No</span>
              <span class="font-bold text-[#172B4D]">${arrival.vehicleNo}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Driver</span>
              <span class="font-bold text-[#172B4D]">${arrival.driverName}</span>
            </div>
            <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
              <span class="text-[#6B778C] text-[11px] block">Grader / Lead</span>
              <span class="font-bold text-[#172B4D]">${arrival.graderName}</span>
            </div>
          </div>

          <div class="p-2.5 bg-[#FAFBFC] border border-[#EBECF0] rounded">
            <span class="text-[#6B778C] text-[11px] block">Intake Observations & Remarks</span>
            <span class="font-medium text-[#172B4D]">${arrival.remarks}</span>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (m) => m.close() },
        { 
          label: 'Print Inward Slip', 
          type: 'primary', 
          onClick: (m) => {
            Toast.show(`Printing Inward Catch Receipt for ${arrival.arrivalCode}...`, 'info');
          } 
        }
      ]
    });
  },

  deleteArrivalRecord(arrival, tableInstance) {
    Modal.confirm({
      title: `Delete Arrival Record ${arrival.arrivalCode}`,
      message: `Are you sure you want to permanently delete inward arrival receipt <strong>${arrival.arrivalCode}</strong> (${arrival.netCatchKg} KG)?`,
      confirmText: 'Delete Record',
      isDestructive: true,
      onConfirm: () => {
        const idx = ERP_DATA.arrivals.findIndex(a => a.id === arrival.id);
        if (idx > -1) {
          ERP_DATA.arrivals.splice(idx, 1);
          if (tableInstance) tableInstance.setData(ERP_DATA.arrivals);

          // Confirmation Popup after delete
          Modal.success({
            title: 'Arrival Record Deleted',
            message: `Inward arrival receipt ${arrival.arrivalCode} has been deleted.`
          });
          Toast.show(`Arrival record ${arrival.arrivalCode} deleted successfully.`, 'success');
        }
      }
    });
  },

  // =========================================================================
  // CRUD MODAL HANDLERS FOR BOOKINGS (NO MANDATORY FIELDS)
  // =========================================================================
  openCreateBookingModal(tableInstance) {
    Modal.open({
      title: 'Create Booking',
      size: 'xl',
      content: `
        <form id="create-booking-form" class="space-y-4 text-xs">
          <!-- General Information Section -->
          <div class="bg-[#FAFBFC] p-3.5 rounded-lg border border-[#DFE1E6] space-y-3">
            <div class="flex items-center justify-between border-b border-[#EBECF0] pb-2">
              <span class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">General Information</span>
              <span class="text-[11px] text-[#6B778C]">Procurement & Booking Details</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <!-- 1. Booking Station -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  1. Booking Station
                </label>
                <select id="newbkg-station" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]">
                  <option value="">-- Select Booking Station --</option>
                  <option value="Bhimavaram Center #1">Bhimavaram Center #1</option>
                  <option value="Kakinada Sea Intake #2">Kakinada Sea Intake #2</option>
                  <option value="Amalapuram Harvesters #4">Amalapuram Harvesters #4</option>
                  <option value="Machilipatnam Delta #3">Machilipatnam Delta #3</option>
                  <option value="Ongole Coastal Hub #1">Ongole Coastal Hub #1</option>
                  <option value="Visakhapatnam Gate Dock">Visakhapatnam Gate Dock</option>
                </select>
              </div>

              <!-- 2. Species -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  2. Species
                </label>
                <select id="newbkg-species" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]">
                  <option value="">-- Select Species --</option>
                  <option value="Vannamei Shrimp">Vannamei Shrimp (Litopenaeus vannamei)</option>
                  <option value="Black Tiger Shrimp">Black Tiger Shrimp (Penaeus monodon)</option>
                  <option value="Asian Seabass (Barramundi)">Asian Seabass (Barramundi)</option>
                  <option value="Freshwater Scampi">Freshwater Scampi</option>
                </select>
              </div>

              <!-- 3. Purchase Type -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  3. Purchase Type
                </label>
                <select id="newbkg-purchasetype" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]">
                  <option value="">-- Select Purchase Type --</option>
                  <option value="Direct Farmer Procurement">Direct Farmer Procurement</option>
                  <option value="Hatchery Buyback Contract">Hatchery Buyback Contract</option>
                  <option value="Agent Procurement Order">Agent Procurement Order</option>
                  <option value="Corporate Feed-Linked Booking">Corporate Feed-Linked Booking</option>
                  <option value="Spot Market Purchase">Spot Market Purchase</option>
                </select>
              </div>

              <!-- 4. Booking Number -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  4. Booking Number
                </label>
                <input type="text" id="newbkg-no" value="PB-2026-${Math.floor(100 + Math.random() * 900)}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg font-bold text-[#0052CC] focus:outline-none focus:border-[#0052CC]" placeholder="e.g. PB-2026-115" />
              </div>

              <!-- 5. Vehicle Number -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  5. Vehicle Number
                </label>
                <input type="text" id="newbkg-vehno" placeholder="e.g. AP 37 TE 4821" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 6. Driver Name -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  6. Driver Name
                </label>
                <input type="text" id="newbkg-driver" placeholder="e.g. G. Narayana" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 7. Grader Name -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  7. Grader Name
                </label>
                <input type="text" id="newbkg-grader" placeholder="e.g. B. Venkatesh" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 8. Booking Date -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  8. Booking Date
                </label>
                <input type="date" id="newbkg-date" value="2026-10-06" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 9. Farm Location -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  9. Farm Location
                </label>
                <input type="text" id="newbkg-farmloc" placeholder="e.g. Bhimavaram Cluster #4 / Pond #12" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 10. Suppliers -->
              <div class="sm:col-span-2 lg:col-span-3">
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  10. Suppliers
                </label>
                <select id="newbkg-supplier" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]">
                  <option value="">-- Select Supplier / Farmer --</option>
                  <option value="Godavari Coastal Aqua Farms">Godavari Coastal Aqua Farms (Bhimavaram)</option>
                  <option value="Sagar Marine Hatcheries & Cultivators">Sagar Marine Hatcheries & Cultivators (Kakinada)</option>
                  <option value="Krishna Delta Prawn Harvesters">Krishna Delta Prawn Harvesters (Machilipatnam)</option>
                  <option value="Konaseema Marine Harvesters">Konaseema Marine Harvesters (Amalapuram)</option>
                  <option value="Nellore Brackish Aqua Cultivators">Nellore Brackish Aqua Cultivators (Nellore)</option>
                  <option value="East Coast Aqua Society">East Coast Aqua Society (Visakhapatnam)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Optional Fields Section -->
          <div class="bg-white p-3.5 rounded-lg border border-[#DFE1E6] space-y-3">
            <div class="flex items-center justify-between border-b border-[#EBECF0] pb-2">
              <span class="text-xs font-bold text-[#5E6C84] uppercase tracking-wider">Agent & Remarks</span>
              <span class="text-[11px] text-[#6B778C]">Additional procurement details</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- 11. Agent Name -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">
                  11. Agent Name
                </label>
                <input type="text" id="newbkg-agent" placeholder="e.g. Coastal Marine Agency / Direct" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 12. Remarks -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">
                  12. Remarks
                </label>
                <textarea id="newbkg-remarks" rows="2" placeholder="e.g. Harvest scheduled for 4:00 AM, ice boxes ready..." class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]"></textarea>
              </div>
            </div>
          </div>

          <!-- Booking Details Sub-Section -->
          <div class="bg-[#F4F5F7] p-3.5 rounded-lg border border-[#DFE1E6] space-y-3">
            <div class="flex items-center justify-between border-b border-[#DFE1E6] pb-2">
              <span class="text-xs font-bold text-[#0052CC] uppercase tracking-wider">Booking Details</span>
              <span class="text-[11px] text-[#6B778C]">Grade, Expected Weight & Benchmark Rate</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <!-- 13. Booking Count -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  13. Booking Count
                </label>
                <input type="text" id="newbkg-count" placeholder="e.g. 40 Count (30-40 pcs/kg)" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg font-bold text-[#0052CC] focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 14. Booking Weight (Kgs) -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  14. Booking Weight (Kgs)
                </label>
                <input type="number" id="newbkg-weight" placeholder="e.g. 3500" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg font-extrabold text-[#006644] focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 15. Booking Rate -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  15. Booking Rate (₹ / KG)
                </label>
                <input type="number" id="newbkg-rate" placeholder="e.g. 440" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg font-extrabold text-[#172B4D] focus:outline-none focus:border-[#0052CC]" />
              </div>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Save',
          type: 'primary',
          onClick: (m) => {
            const station = document.getElementById('newbkg-station')?.value?.trim() || 'Bhimavaram Center #1';
            const species = document.getElementById('newbkg-species')?.value?.trim() || 'Vannamei Shrimp';
            const purchaseType = document.getElementById('newbkg-purchasetype')?.value?.trim() || 'Direct Farmer Procurement';
            const bookingNo = document.getElementById('newbkg-no')?.value?.trim() || (`PB-2026-${Math.floor(100 + Math.random() * 900)}`);
            const vehicleNo = document.getElementById('newbkg-vehno')?.value?.trim() || 'AP 37 TE 4821';
            const driverName = document.getElementById('newbkg-driver')?.value?.trim() || 'G. Narayana';
            const graderName = document.getElementById('newbkg-grader')?.value?.trim() || 'B. Venkatesh';
            const bookingDate = document.getElementById('newbkg-date')?.value?.trim() || new Date().toISOString().split('T')[0];
            const farmLocation = document.getElementById('newbkg-farmloc')?.value?.trim() || 'Bhimavaram Cluster #4';
            const supplier = document.getElementById('newbkg-supplier')?.value?.trim() || 'Godavari Coastal Aqua Farms';

            const agent = document.getElementById('newbkg-agent')?.value?.trim() || 'Direct';
            const remarks = document.getElementById('newbkg-remarks')?.value?.trim() || '';

            const bookingCount = document.getElementById('newbkg-count')?.value?.trim() || '40 Count';
            const bookingWeight = parseFloat(document.getElementById('newbkg-weight')?.value) || 0;
            const bookingRate = parseFloat(document.getElementById('newbkg-rate')?.value) || 0;

            const mappedPlant = station.includes('Bhimavaram') ? 'DFL UNIT-5 (JPT)' :
                               station.includes('Kakinada') ? 'DFL UNIT-3 (PSP)' :
                               station.includes('Amalapuram') ? 'DFL UNIT-6 (JPT-II)' :
                               station.includes('Machilipatnam') ? 'DFL UNIT-4 (PND)' :
                               station.includes('Visakhapatnam') ? 'DFL UNIT-1 (VSP)' : 'DFL UNIT-2 (KKD)';

            const newBooking = {
              sNo: PurchaseView.bookingsList.length + 1,
              bookingStation: station,
              species: species,
              purchaseType: purchaseType,
              bookingNo: bookingNo,
              vehicleNo: vehicleNo,
              driverName: driverName,
              grader: graderName,
              bookingDate: bookingDate,
              farmLocation: farmLocation,
              pond: farmLocation,
              supplier: supplier,
              agent: agent,
              remarks: remarks,
              bookingCount: bookingCount,
              bookingWeight: bookingWeight,
              bookedQty: bookingWeight,
              bookingRate: bookingRate,
              arrivalPlant: mappedPlant,
              expectedDate: bookingDate,
              advancePaid: '$ 0',
              status: 'CONFIRMED'
            };

            PurchaseView.bookingsList.unshift(newBooking);

            // Re-assign S.No
            PurchaseView.bookingsList.forEach((b, idx) => {
              b.sNo = idx + 1;
            });

            if (tableInstance) tableInstance.setData(PurchaseView.bookingsList);
            m.close();

            // Confirmation Popup after save
            Modal.success({
              title: 'Booking Saved Successfully',
              message: `Pre-harvest booking ${newBooking.bookingNo} has been saved and registered in the system.`,
              details: [
                { label: 'Booking Number', value: newBooking.bookingNo },
                { label: 'Species', value: newBooking.species },
                { label: 'Purchase Type', value: newBooking.purchaseType },
                { label: 'Booking Station', value: newBooking.bookingStation },
                { label: 'Booking Weight', value: `${newBooking.bookingWeight.toLocaleString()} KG` },
                { label: 'Booking Rate', value: `₹ ${newBooking.bookingRate} / KG` }
              ]
            });
            Toast.show(`Booking ${newBooking.bookingNo} saved successfully.`, 'success', 'Booking Created');
          }
        }
      ]
    });
  },

  openEditBookingModal(booking, tableInstance) {
    Modal.open({
      title: `Edit Booking: ${booking.bookingNo}`,
      size: 'xl',
      content: `
        <form id="edit-booking-form" class="space-y-4 text-xs">
          <!-- General Information Section -->
          <div class="bg-[#FAFBFC] p-3.5 rounded-lg border border-[#DFE1E6] space-y-3">
            <div class="flex items-center justify-between border-b border-[#EBECF0] pb-2">
              <span class="text-xs font-bold text-[#172B4D] uppercase tracking-wider">General Information</span>
              <span class="text-[11px] text-[#6B778C]">Procurement & Booking Details</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <!-- 1. Booking Station -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  1. Booking Station
                </label>
                <select id="editbkg-station" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]">
                  <option value="Bhimavaram Center #1" ${booking.bookingStation === 'Bhimavaram Center #1' || (booking.arrivalPlant && booking.arrivalPlant.includes('UNIT-5')) ? 'selected' : ''}>Bhimavaram Center #1</option>
                  <option value="Kakinada Sea Intake #2" ${booking.bookingStation === 'Kakinada Sea Intake #2' || (booking.arrivalPlant && booking.arrivalPlant.includes('UNIT-3')) ? 'selected' : ''}>Kakinada Sea Intake #2</option>
                  <option value="Amalapuram Harvesters #4" ${booking.bookingStation === 'Amalapuram Harvesters #4' || (booking.arrivalPlant && booking.arrivalPlant.includes('UNIT-6')) ? 'selected' : ''}>Amalapuram Harvesters #4</option>
                  <option value="Machilipatnam Delta #3" ${booking.bookingStation === 'Machilipatnam Delta #3' || (booking.arrivalPlant && booking.arrivalPlant.includes('UNIT-4')) ? 'selected' : ''}>Machilipatnam Delta #3</option>
                  <option value="Ongole Coastal Hub #1" ${booking.bookingStation === 'Ongole Coastal Hub #1' || (booking.arrivalPlant && booking.arrivalPlant.includes('UNIT-2')) ? 'selected' : ''}>Ongole Coastal Hub #1</option>
                  <option value="Visakhapatnam Gate Dock" ${booking.bookingStation === 'Visakhapatnam Gate Dock' || (booking.arrivalPlant && booking.arrivalPlant.includes('UNIT-1')) ? 'selected' : ''}>Visakhapatnam Gate Dock</option>
                </select>
              </div>

              <!-- 2. Species -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  2. Species
                </label>
                <select id="editbkg-species" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]">
                  <option value="Vannamei Shrimp" ${booking.species && booking.species.includes('Vannamei') ? 'selected' : ''}>Vannamei Shrimp (Litopenaeus vannamei)</option>
                  <option value="Black Tiger Shrimp" ${booking.species && booking.species.includes('Black Tiger') ? 'selected' : ''}>Black Tiger Shrimp (Penaeus monodon)</option>
                  <option value="Asian Seabass (Barramundi)" ${booking.species && booking.species.includes('Asian Seabass') ? 'selected' : ''}>Asian Seabass (Barramundi)</option>
                  <option value="Freshwater Scampi" ${booking.species && booking.species.includes('Scampi') ? 'selected' : ''}>Freshwater Scampi</option>
                </select>
              </div>

              <!-- 3. Purchase Type -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  3. Purchase Type
                </label>
                <select id="editbkg-purchasetype" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]">
                  <option value="Direct Farmer Procurement" ${booking.purchaseType === 'Direct Farmer Procurement' ? 'selected' : ''}>Direct Farmer Procurement</option>
                  <option value="Hatchery Buyback Contract" ${booking.purchaseType === 'Hatchery Buyback Contract' ? 'selected' : ''}>Hatchery Buyback Contract</option>
                  <option value="Agent Procurement Order" ${booking.purchaseType === 'Agent Procurement Order' ? 'selected' : ''}>Agent Procurement Order</option>
                  <option value="Corporate Feed-Linked Booking" ${booking.purchaseType === 'Corporate Feed-Linked Booking' ? 'selected' : ''}>Corporate Feed-Linked Booking</option>
                  <option value="Spot Market Purchase" ${booking.purchaseType === 'Spot Market Purchase' ? 'selected' : ''}>Spot Market Purchase</option>
                </select>
              </div>

              <!-- 4. Booking Number -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  4. Booking Number
                </label>
                <input type="text" id="editbkg-no" value="${booking.bookingNo}" readonly class="w-full text-xs px-2.5 py-2 bg-[#EBECF0] border border-[#DFE1E6] rounded-lg font-bold text-[#0052CC]" />
              </div>

              <!-- 5. Vehicle Number -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  5. Vehicle Number
                </label>
                <input type="text" id="editbkg-vehno" value="${booking.vehicleNo || 'AP 37 TE 4821'}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 6. Driver Name -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  6. Driver Name
                </label>
                <input type="text" id="editbkg-driver" value="${booking.driverName || 'G. Narayana'}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 7. Grader Name -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  7. Grader Name
                </label>
                <input type="text" id="editbkg-grader" value="${booking.grader || 'B. Venkatesh'}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 8. Booking Date -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  8. Booking Date
                </label>
                <input type="date" id="editbkg-date" value="${booking.bookingDate || booking.expectedDate || '2026-10-06'}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 9. Farm Location -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  9. Farm Location
                </label>
                <input type="text" id="editbkg-farmloc" value="${booking.farmLocation || booking.pond || 'Bhimavaram Cluster #4'}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 10. Suppliers -->
              <div class="sm:col-span-2 lg:col-span-3">
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  10. Suppliers
                </label>
                <select id="editbkg-supplier" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]">
                  <option value="Godavari Coastal Aqua Farms" ${booking.supplier && booking.supplier.includes('Godavari') ? 'selected' : ''}>Godavari Coastal Aqua Farms (Bhimavaram)</option>
                  <option value="Sagar Marine Hatcheries & Cultivators" ${booking.supplier && booking.supplier.includes('Sagar') ? 'selected' : ''}>Sagar Marine Hatcheries & Cultivators (Kakinada)</option>
                  <option value="Krishna Delta Prawn Harvesters" ${booking.supplier && booking.supplier.includes('Krishna') ? 'selected' : ''}>Krishna Delta Prawn Harvesters (Machilipatnam)</option>
                  <option value="Konaseema Marine Harvesters" ${booking.supplier && booking.supplier.includes('Konaseema') ? 'selected' : ''}>Konaseema Marine Harvesters (Amalapuram)</option>
                  <option value="Nellore Brackish Aqua Cultivators" ${booking.supplier && booking.supplier.includes('Nellore') ? 'selected' : ''}>Nellore Brackish Aqua Cultivators (Nellore)</option>
                  <option value="East Coast Aqua Society" ${booking.supplier && booking.supplier.includes('East Coast') ? 'selected' : ''}>East Coast Aqua Society (Visakhapatnam)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Optional Fields Section -->
          <div class="bg-white p-3.5 rounded-lg border border-[#DFE1E6] space-y-3">
            <div class="flex items-center justify-between border-b border-[#EBECF0] pb-2">
              <span class="text-xs font-bold text-[#5E6C84] uppercase tracking-wider">Agent & Remarks</span>
              <span class="text-[11px] text-[#6B778C]">Additional procurement details</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- 11. Agent Name -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">
                  11. Agent Name
                </label>
                <input type="text" id="editbkg-agent" value="${booking.agent || ''}" placeholder="e.g. Coastal Marine Agency" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 12. Remarks -->
              <div>
                <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">
                  12. Remarks
                </label>
                <textarea id="editbkg-remarks" rows="2" placeholder="e.g. Harvest notes..." class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded-lg focus:outline-none focus:border-[#0052CC]">${booking.remarks || ''}</textarea>
              </div>
            </div>
          </div>

          <!-- Booking Details Sub-Section -->
          <div class="bg-[#F4F5F7] p-3.5 rounded-lg border border-[#DFE1E6] space-y-3">
            <div class="flex items-center justify-between border-b border-[#DFE1E6] pb-2">
              <span class="text-xs font-bold text-[#0052CC] uppercase tracking-wider">Booking Details</span>
              <span class="text-[11px] text-[#6B778C]">Grade, Expected Weight & Benchmark Rate</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <!-- 13. Booking Count -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  13. Booking Count
                </label>
                <input type="text" id="editbkg-count" value="${booking.bookingCount || '40 Count'}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg font-bold text-[#0052CC] focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 14. Booking Weight (Kgs) -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  14. Booking Weight (Kgs)
                </label>
                <input type="number" id="editbkg-weight" value="${booking.bookingWeight || booking.bookedQty || 0}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg font-extrabold text-[#006644] focus:outline-none focus:border-[#0052CC]" />
              </div>

              <!-- 15. Booking Rate -->
              <div>
                <label class="block text-[11px] font-bold text-[#172B4D] uppercase tracking-wider mb-1">
                  15. Booking Rate (₹ / KG)
                </label>
                <input type="number" id="editbkg-rate" value="${booking.bookingRate || 420}" class="w-full text-xs px-2.5 py-2 bg-white border border-[#DFE1E6] rounded-lg font-extrabold text-[#172B4D] focus:outline-none focus:border-[#0052CC]" />
              </div>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        { label: 'Cancel', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Save',
          type: 'primary',
          onClick: (m) => {
            const station = document.getElementById('editbkg-station')?.value?.trim() || booking.bookingStation;
            const species = document.getElementById('editbkg-species')?.value?.trim() || booking.species;
            const purchaseType = document.getElementById('editbkg-purchasetype')?.value?.trim() || booking.purchaseType;
            const vehicleNo = document.getElementById('editbkg-vehno')?.value?.trim() || booking.vehicleNo;
            const driverName = document.getElementById('editbkg-driver')?.value?.trim() || booking.driverName;
            const graderName = document.getElementById('editbkg-grader')?.value?.trim() || booking.grader;
            const bookingDate = document.getElementById('editbkg-date')?.value?.trim() || booking.bookingDate;
            const farmLocation = document.getElementById('editbkg-farmloc')?.value?.trim() || booking.farmLocation;
            const supplier = document.getElementById('editbkg-supplier')?.value?.trim() || booking.supplier;

            const agent = document.getElementById('editbkg-agent')?.value?.trim() || booking.agent || 'Direct';
            const remarks = document.getElementById('editbkg-remarks')?.value?.trim() || booking.remarks || '';

            const bookingCount = document.getElementById('editbkg-count')?.value?.trim() || booking.bookingCount;
            const bookingWeight = parseFloat(document.getElementById('editbkg-weight')?.value) || booking.bookingWeight;
            const bookingRate = parseFloat(document.getElementById('editbkg-rate')?.value) || booking.bookingRate;

            booking.bookingStation = station;
            booking.species = species;
            booking.purchaseType = purchaseType;
            booking.vehicleNo = vehicleNo;
            booking.driverName = driverName;
            booking.grader = graderName;
            booking.bookingDate = bookingDate;
            booking.expectedDate = bookingDate;
            booking.farmLocation = farmLocation;
            booking.pond = farmLocation;
            booking.supplier = supplier;
            booking.agent = agent;
            booking.remarks = remarks;
            booking.bookingCount = bookingCount;
            booking.bookingWeight = bookingWeight;
            booking.bookedQty = bookingWeight;
            booking.bookingRate = bookingRate;

            if (tableInstance) tableInstance.setData(PurchaseView.bookingsList);
            m.close();

            // Confirmation Popup after edit
            Modal.success({
              title: 'Booking Updated Successfully',
              message: `All changes to Booking ${booking.bookingNo} have been successfully saved.`,
              details: [
                { label: 'Booking Number', value: booking.bookingNo },
                { label: 'Species', value: booking.species },
                { label: 'Booking Weight', value: `${booking.bookingWeight.toLocaleString()} KG` },
                { label: 'Booking Rate', value: `₹ ${booking.bookingRate} / KG` }
              ]
            });
            Toast.show(`Booking ${booking.bookingNo} updated successfully.`, 'success');
          }
        }
      ]
    });
  },

  showBookingDetails(booking) {
    Modal.open({
      title: `Booking Agreement Details: ${booking.bookingNo}`,
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs">
          <div class="p-3 bg-[#DEEBFF] text-[#0747A6] rounded-lg border border-[#B3D4FF] flex items-center justify-between">
            <div>
              <span class="font-bold text-sm">${booking.bookingNo}</span>
              <span class="ml-2 text-xs">(${booking.bookingDate || booking.expectedDate} • ${booking.purchaseType || 'Direct Farmer Procurement'})</span>
            </div>
            <span class="lozenge lozenge-success font-bold">${booking.status || 'CONFIRMED'}</span>
          </div>

          <!-- Required Fields Summary -->
          <div class="bg-[#FAFBFC] p-3 rounded-lg border border-[#DFE1E6] space-y-2">
            <h4 class="font-bold text-xs text-[#172B4D] border-b border-[#EBECF0] pb-1">Required Information</h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">1. Booking Station</span>
                <span class="font-bold text-[#172B4D]">${booking.bookingStation || booking.arrivalPlant || 'Bhimavaram Center #1'}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">2. Species</span>
                <span class="font-bold text-[#0052CC]">${booking.species}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">3. Purchase Type</span>
                <span class="font-medium text-[#172B4D]">${booking.purchaseType}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">4. Booking Number</span>
                <span class="font-bold text-[#0052CC]">${booking.bookingNo}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">5. Vehicle Number</span>
                <span class="font-bold text-[#172B4D]">${booking.vehicleNo || 'AP 37 TE 4821'}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">6. Driver Name</span>
                <span class="font-medium text-[#172B4D]">${booking.driverName || 'G. Narayana'}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">7. Grader Name</span>
                <span class="font-bold text-[#172B4D]">${booking.grader || 'B. Venkatesh'}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">8. Booking Date</span>
                <span class="font-medium text-[#172B4D]">${booking.bookingDate || booking.expectedDate}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">9. Farm Location</span>
                <span class="font-medium text-[#172B4D]">${booking.farmLocation || booking.pond || 'Bhimavaram Cluster #4'}</span>
              </div>
              <div class="sm:col-span-3">
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">10. Suppliers</span>
                <span class="font-bold text-[#172B4D]">${booking.supplier || 'Godavari Coastal Aqua Farms'}</span>
              </div>
            </div>
          </div>

          <!-- Optional Fields Summary -->
          <div class="bg-white p-3 rounded-lg border border-[#DFE1E6] space-y-2">
            <h4 class="font-bold text-xs text-[#5E6C84] border-b border-[#EBECF0] pb-1">Optional Information</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">11. Agent Name</span>
                <span class="font-medium text-[#172B4D]">${booking.agent || 'Direct'}</span>
              </div>
              <div>
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">12. Remarks</span>
                <span class="font-medium text-[#172B4D]">${booking.remarks || 'Standard procurement contract.'}</span>
              </div>
            </div>
          </div>

          <!-- Booking Details Section -->
          <div class="bg-[#F4F5F7] p-3 rounded-lg border border-[#DFE1E6] space-y-2">
            <h4 class="font-bold text-xs text-[#0052CC] border-b border-[#DFE1E6] pb-1">Booking Details</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div class="p-2 bg-white rounded border border-[#DFE1E6]">
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">13. Booking Count</span>
                <span class="font-bold text-sm text-[#0052CC]">${booking.bookingCount || '40 Count'}</span>
              </div>
              <div class="p-2 bg-white rounded border border-[#DFE1E6]">
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">14. Booking Weight</span>
                <span class="font-extrabold text-sm text-[#006644]">${(booking.bookingWeight || booking.bookedQty || 0).toLocaleString()} KG</span>
              </div>
              <div class="p-2 bg-white rounded border border-[#DFE1E6]">
                <span class="text-[#6B778C] text-[10px] uppercase font-bold block">15. Booking Rate</span>
                <span class="font-extrabold text-sm text-[#172B4D]">₹ ${booking.bookingRate || 420} / KG</span>
              </div>
            </div>
          </div>
        </div>
      `,
      footerButtons: [
        { label: 'Close', type: 'secondary', onClick: (m) => m.close() },
        {
          label: 'Print Booking Slip',
          type: 'primary',
          onClick: (m) => {
            Toast.show(`Printing Booking Slip for ${booking.bookingNo}...`, 'info');
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
          PurchaseView.bookingsList.forEach((b, i) => { b.sNo = i + 1; });
          if (tableInstance) tableInstance.setData(PurchaseView.bookingsList);

          // Confirmation Popup after delete
          Modal.success({
            title: 'Booking Deleted Successfully',
            message: `Booking agreement ${booking.bookingNo} has been removed from the registry.`
          });
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
    const arrNo = arrival.arrivalNumber || arrival.id;
    const date = arrival.date || '06/10/2026';
    const company = arrival.company || 'DEVI FISHERIES LIMITED';
    const plant = arrival.plant || 'DFL UNIT-5 (JPT)';
    const center = arrival.center || 'Bhimavaram Center #1';
    const species = arrival.species || 'Vannamei (VM)';
    const weight = typeof arrival.weight === 'number' ? arrival.weight : parseFloat(arrival.weight) || 0;
    const balWeight = typeof arrival.balanceWeight === 'number' ? arrival.balanceWeight : parseFloat(arrival.balanceWeight) || 0;
    const avgRate = arrival.averageRate || 425;
    const amount = typeof arrival.amount === 'number' ? arrival.amount : (weight * avgRate);
    const balAmount = typeof arrival.balanceAmount === 'number' ? arrival.balanceAmount : (balWeight * avgRate);
    const status = arrival.status || 'QC_CLEARED';

    Modal.open({
      title: `Raw Material Arrival: ${arrNo}`,
      size: 'lg',
      content: `
        <div class="space-y-4 text-xs">
          <!-- Top Header Summary Bar -->
          <div class="flex flex-wrap justify-between items-center p-3 bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#0052CC]">${arrNo}</span>
              <span class="text-[#6B778C]">•</span>
              <span class="font-semibold text-[#172B4D]">${date}</span>
              <span class="text-[#6B778C]">•</span>
              <span class="text-[#5E6C84] font-medium">${company}</span>
            </div>
            <span class="lozenge lozenge-success font-bold">${status}</span>
          </div>

          <!-- Key Metrics Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-3 bg-white border border-[#DFE1E6] rounded-lg">
              <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider block mb-1">Total Weight</span>
              <span class="text-base font-extrabold text-[#006644]">${weight.toLocaleString()} KG</span>
            </div>
            <div class="p-3 bg-white border border-[#DFE1E6] rounded-lg">
              <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider block mb-1">Balance Weight</span>
              <span class="text-base font-extrabold text-[#FF8B00]">${balWeight.toLocaleString()} KG</span>
            </div>
            <div class="p-3 bg-white border border-[#DFE1E6] rounded-lg">
              <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider block mb-1">Average Rate</span>
              <span class="text-base font-extrabold text-[#172B4D]">₹ ${avgRate} / KG</span>
            </div>
            <div class="p-3 bg-white border border-[#DFE1E6] rounded-lg">
              <span class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider block mb-1">Total Valuation</span>
              <span class="text-base font-extrabold text-[#0052CC]">₹ ${amount.toLocaleString()}</span>
            </div>
          </div>

          <!-- Structured Details Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg space-y-2">
              <div class="flex justify-between border-b border-[#EBECF0] pb-1.5">
                <span class="text-[#6B778C]">Plant Facility:</span>
                <span class="font-bold text-[#0052CC]">${plant}</span>
              </div>
              <div class="flex justify-between border-b border-[#EBECF0] pb-1.5">
                <span class="text-[#6B778C]">Procurement Center:</span>
                <span class="font-bold text-[#172B4D]">${center}</span>
              </div>
              <div class="flex justify-between border-b border-[#EBECF0] pb-1.5">
                <span class="text-[#6B778C]">Target Species:</span>
                <span class="font-bold text-[#172B4D]">${species}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[#6B778C]">Balance Amount:</span>
                <span class="font-bold text-[#6554C0]">₹ ${balAmount.toLocaleString()}</span>
              </div>
            </div>

            <div class="p-3 bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg space-y-2">
              <div class="flex justify-between border-b border-[#EBECF0] pb-1.5">
                <span class="text-[#6B778C]">Vehicle Number:</span>
                <span class="font-bold text-[#172B4D]">${arrival.vehicleNumber || 'AP 37 TE 9011'}</span>
              </div>
              <div class="flex justify-between border-b border-[#EBECF0] pb-1.5">
                <span class="text-[#6B778C]">Driver Name:</span>
                <span class="font-medium text-[#172B4D]">${arrival.driverName || 'K. Ramu'}</span>
              </div>
              <div class="flex justify-between border-b border-[#EBECF0] pb-1.5">
                <span class="text-[#6B778C]">Linked Company:</span>
                <span class="font-medium text-[#172B4D]">${company}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[#6B778C]">QC Inspection:</span>
                <span class="font-bold text-[#006644]">HACCP Dock Verified</span>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="p-3 bg-[#F4F5F7] rounded-lg text-[#42526E] border border-[#DFE1E6]">
            <strong>Receiving Notes:</strong> ${arrival.remarks || 'Fresh raw material harvest intake recorded at dock weighbridge. Temp and ice ratio checked.'}
          </div>
        </div>
      `,
      footerButtons: [{ label: 'Close', type: 'secondary', onClick: (m) => m.close() }]
    });
  }
};
