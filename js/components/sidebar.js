// Navigation Hierarchy: Main Menu -> Sub Menu -> On-Screen Tabs
import { LOGO_WHITE } from '../data/logos.js';

export const NAV_HIERARCHY = [
  {
    id: "purchase",
    title: "Purchase",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "rm-dashboard",
        tabs: [
          { id: "rm-dashboard", label: "Raw Material Dashboard", hash: "#/purchase/dashboard/rm-dashboard" },
          { id: "commercial-dashboard", label: "Commercial Dashboard", hash: "#/purchase/dashboard/commercial-dashboard" }
        ]
      },
      {
        id: "operations",
        title: "Operations",
        defaultTab: "bookings",
        tabs: [
          { id: "bookings", label: "Booking", hash: "#/purchase/operations/bookings" },
          { id: "rm-arrivals", label: "Raw Material Arrivals", hash: "#/purchase/operations/rm-arrivals" },
          { id: "arrivals", label: "Arrivals", hash: "#/purchase/operations/arrivals" },
          { id: "lot-tracking", label: "Lot Tracking", hash: "#/purchase/operations/lot-tracking", highlight: true }
        ]
      },
      {
        id: "transactions-bills",
        title: "Transactions & Bills",
        defaultTab: "supplier-bills",
        tabs: [
          { id: "supplier-bills", label: "Supplier Bill Summary", hash: "#/purchase/transactions-bills/supplier-bills" },
          { id: "commercial-txns", label: "Commercial Transactions", hash: "#/purchase/transactions-bills/commercial-txns" }
        ]
      },
      {
        id: "payments",
        title: "Payments",
        defaultTab: "payment-summary",
        tabs: [
          { id: "payment-summary", label: "Payment Summary", hash: "#/purchase/payments/payment-summary" },
          { id: "bill-date-payment", label: "Bill & Date-Wise Payment", hash: "#/purchase/payments/bill-date-payment" }
        ]
      }
    ]
  },
  {
    id: "preprocessing",
    title: "Pre-Processing",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "floor-overview",
        tabs: [
          { id: "floor-overview", label: "Floor Overview", hash: "#/preprocessing/dashboard/floor-overview" }
        ]
      },
      {
        id: "floor-operations",
        title: "Floor Operations",
        defaultTab: "receiving-sorting",
        tabs: [
          { id: "receiving-sorting", label: "Receiving & Sorting", hash: "#/preprocessing/floor-operations/receiving-sorting" },
          { id: "preprocessing-tasks", label: "Pre-Processing Tasks", hash: "#/preprocessing/floor-operations/preprocessing-tasks" }
        ]
      },
      {
        id: "chemical-inventory",
        title: "Chemical Inventory & Usage",
        defaultTab: "chemical-stock",
        tabs: [
          { id: "chemical-stock", label: "Chemical Stock", hash: "#/preprocessing/chemical-inventory/chemical-stock" },
          { id: "usage-logs", label: "Usage Logs", hash: "#/preprocessing/chemical-inventory/usage-logs" }
        ]
      },
      {
        id: "traceability",
        title: "Traceability",
        defaultTab: "batch-traceability",
        tabs: [
          { id: "batch-traceability", label: "Batch Traceability Logs", hash: "#/preprocessing/traceability/batch-traceability" }
        ]
      }
    ]
  },
  {
    id: "quality",
    title: "Quality Control (QC)",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "qc-overview",
        tabs: [
          { id: "qc-overview", label: "QC Overview", hash: "#/quality/dashboard/qc-overview" },
          { id: "daily-qc-ops", label: "Daily QC Operations", hash: "#/quality/dashboard/daily-qc-ops" }
        ]
      },
      {
        id: "lab",
        title: "Lab",
        defaultTab: "incoming-lots",
        tabs: [
          { id: "incoming-lots", label: "Incoming Lots", hash: "#/quality/lab/incoming-lots" },
          { id: "antibiotic-testing", label: "Antibiotic Testing", hash: "#/quality/lab/antibiotic-testing" },
          { id: "rm-testing", label: "Raw Material Testing", hash: "#/quality/lab/rm-testing" },
          { id: "microbiology", label: "Microbiology Testing", hash: "#/quality/lab/microbiology" },
          { id: "in-house-lab", label: "In-House Lab", hash: "#/quality/lab/in-house-lab" },
          { id: "external-lab", label: "External Lab", hash: "#/quality/lab/external-lab" }
        ]
      },
      {
        id: "qc-operations",
        title: "QC Operations",
        defaultTab: "qc-orders",
        tabs: [
          { id: "qc-orders", label: "QC Orders", hash: "#/quality/qc-operations/qc-orders" },
          { id: "documentation", label: "Documentation", hash: "#/quality/qc-operations/documentation" }
        ]
      },
      {
        id: "chemical-screening",
        title: "Chemical Screening",
        defaultTab: "screening-records",
        tabs: [
          { id: "screening-records", label: "Screening Records", hash: "#/quality/chemical-screening/screening-records" }
        ]
      },
      {
        id: "qc-audits",
        title: "QC Audits",
        defaultTab: "food-audits",
        tabs: [
          { id: "food-audits", label: "Food Audits", hash: "#/quality/qc-audits/food-audits" },
          { id: "social-audits", label: "Social Audits", hash: "#/quality/qc-audits/social-audits" },
          { id: "farm-audits", label: "Farm Audits", hash: "#/quality/qc-audits/farm-audits" },
          { id: "hatchery-audits", label: "Hatchery Audits", hash: "#/quality/qc-audits/hatchery-audits" },
          { id: "feed-mill-audits", label: "Feed Mill Audits", hash: "#/quality/qc-audits/feed-mill-audits" }
        ]
      }
    ]
  },
  {
    id: "production",
    title: "Production",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "overview",
        tabs: [
          { id: "overview", label: "Overview", hash: "#/production/dashboard/overview" }
        ]
      },
      {
        id: "setup-master",
        title: "Setup & Master Data",
        defaultTab: "standard-yields",
        tabs: [
          { id: "standard-yields", label: "Standard Yields", hash: "#/production/setup-master/standard-yields" }
        ]
      },
      {
        id: "batch-tracking",
        title: "Batch Tracking",
        defaultTab: "soaking-tracking",
        tabs: [
          { id: "soaking-tracking", label: "Soaking Tracking", hash: "#/production/batch-tracking/soaking-tracking" },
          { id: "freezing-tracking", label: "Freezing Tracking", hash: "#/production/batch-tracking/freezing-tracking" }
        ]
      },
      {
        id: "production-operations",
        title: "Production Operations",
        defaultTab: "soaking",
        tabs: [
          { id: "soaking", label: "Soaking", hash: "#/production/production-operations/soaking" },
          { id: "freezing-storage", label: "Freezing & Storage", hash: "#/production/production-operations/freezing-storage" }
        ]
      },
      {
        id: "production-control",
        title: "Production Control",
        defaultTab: "floor-balance",
        tabs: [
          { id: "floor-balance", label: "Floor Balance", hash: "#/production/production-control/floor-balance" },
          { id: "untreated-control", label: "Untreated Control", hash: "#/production/production-control/untreated-control" },
          { id: "floor-balance-variety", label: "Floor Balance by Variety", hash: "#/production/production-control/floor-balance-variety" },
          { id: "soaking-control", label: "Soaking Control", hash: "#/production/production-control/soaking-control" },
          { id: "freezing-control", label: "Freezing Control", hash: "#/production/production-control/freezing-control" },
          { id: "freezing-prod-control", label: "Freezing Production Control", hash: "#/production/production-control/freezing-prod-control" },
          { id: "reconciliation", label: "Reconciliation", hash: "#/production/production-control/reconciliation" },
          { id: "conversion-headon", label: "Head-on to Finished Conversion", hash: "#/production/production-control/conversion-headon" }
        ]
      },
      {
        id: "anti-dumping",
        title: "Anti-Dumping Compliance",
        defaultTab: "entry",
        tabs: [
          { id: "entry", label: "Entry", hash: "#/production/anti-dumping/entry" },
          { id: "audit-logs", label: "Audit Logs", hash: "#/production/anti-dumping/audit-logs" },
          { id: "negative-audit", label: "Negative Audit", hash: "#/production/anti-dumping/negative-audit" },
          { id: "shipment-audit", label: "Shipment Audit", hash: "#/production/anti-dumping/shipment-audit" },
          { id: "ledger", label: "Opening & Closing Ledger", hash: "#/production/anti-dumping/ledger" },
          { id: "closing-bal", label: "Closing Balance", hash: "#/production/anti-dumping/closing-bal" }
        ]
      }
    ]
  },
  {
    id: "coldstore",
    title: "Coldstore",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "overview",
        tabs: [
          { id: "overview", label: "Overview", hash: "#/coldstore/dashboard/overview" }
        ]
      },
      {
        id: "inward-intake",
        title: "Inward & Intake",
        defaultTab: "production-intake",
        tabs: [
          { id: "production-intake", label: "Production Intake", hash: "#/coldstore/inward-intake/production-intake" },
          { id: "general-stock-in", label: "General Stock In", hash: "#/coldstore/inward-intake/general-stock-in" },
          { id: "inward-approvals", label: "Inward Approvals", hash: "#/coldstore/inward-intake/inward-approvals" }
        ]
      },
      {
        id: "store-operations",
        title: "Store Operations",
        defaultTab: "master-inventory",
        tabs: [
          { id: "master-inventory", label: "Master Inventory", hash: "#/coldstore/store-operations/master-inventory" },
          { id: "thawing-repacking", label: "Thawing & Repacking", hash: "#/coldstore/store-operations/thawing-repacking" },
          { id: "physical-adjustments", label: "Physical Adjustments", hash: "#/coldstore/store-operations/physical-adjustments" }
        ]
      },
      {
        id: "dispatch-outward",
        title: "Dispatch & Outward",
        defaultTab: "orders-allocations",
        tabs: [
          { id: "orders-allocations", label: "Orders & Allocations", hash: "#/coldstore/dispatch-outward/orders-allocations" },
          { id: "shipments", label: "Shipments", hash: "#/coldstore/dispatch-outward/shipments" },
          { id: "stock-out", label: "Stock Out", hash: "#/coldstore/dispatch-outward/stock-out" },
          { id: "ibt-management", label: "IBT Management", hash: "#/coldstore/dispatch-outward/ibt-management" }
        ]
      },
      {
        id: "setup-imports",
        title: "Setup & Imports",
        defaultTab: "racks-locations",
        tabs: [
          { id: "racks-locations", label: "Racks & Locations", hash: "#/coldstore/setup-imports/racks-locations" },
          { id: "batch-uploads", label: "Batch Data Uploads", hash: "#/coldstore/setup-imports/batch-uploads" }
        ]
      }
    ]
  },
  {
    id: "inventory",
    title: "Inventory",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "overview",
        tabs: [
          { id: "overview", label: "Overview", hash: "#/inventory/dashboard/overview" }
        ]
      },
      {
        id: "requisitions",
        title: "Requisitions",
        defaultTab: "indents",
        tabs: [
          { id: "indents", label: "Indents", hash: "#/inventory/requisitions/indents" }
        ]
      },
      {
        id: "procurement",
        title: "Procurement",
        defaultTab: "proforma-invoices",
        tabs: [
          { id: "proforma-invoices", label: "Proforma Invoices", hash: "#/inventory/procurement/proforma-invoices" },
          { id: "purchase-orders", label: "Purchase Orders", hash: "#/inventory/procurement/purchase-orders" },
          { id: "proforma-register", label: "Proforma Register", hash: "#/inventory/procurement/proforma-register" }
        ]
      },
      {
        id: "store-operations",
        title: "Store Operations",
        defaultTab: "grn",
        tabs: [
          { id: "grn", label: "Goods Receipt (GRN)", hash: "#/inventory/store-operations/grn" },
          { id: "material-issues", label: "Material Issues", hash: "#/inventory/store-operations/material-issues" }
        ]
      }
    ]
  },
  {
    id: "sales",
    title: "Sales & Exports",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    submenus: [
      {
        id: "dashboard",
        title: "Dashboard",
        defaultTab: "overview",
        tabs: [
          { id: "overview", label: "Overview", hash: "#/sales/dashboard/overview" }
        ]
      },
      {
        id: "master-data",
        title: "Master Data",
        defaultTab: "product-catalog",
        tabs: [
          { id: "product-catalog", label: "Product Catalog", hash: "#/sales/master-data/product-catalog" },
          { id: "customers-parties", label: "Customers & Parties", hash: "#/sales/master-data/customers-parties" },
          { id: "brands", label: "Brands", hash: "#/sales/master-data/brands" }
        ]
      },
      {
        id: "contracts-pricing",
        title: "Contracts & Pricing",
        defaultTab: "price-book",
        tabs: [
          { id: "price-book", label: "Price Book", hash: "#/sales/contracts-pricing/price-book" },
          { id: "sales-contracts", label: "Sales Contracts", hash: "#/sales/contracts-pricing/sales-contracts" }
        ]
      },
      {
        id: "export-ops",
        title: "Export Operations & Logistics",
        defaultTab: "shipping-docs",
        tabs: [
          { id: "shipping-docs", label: "Shipping Documentation", hash: "#/sales/export-ops/shipping-docs" },
          { id: "compliance-clearing", label: "Compliance & Clearing", hash: "#/sales/export-ops/compliance-clearing" },
          { id: "shipments-tracking", label: "Shipments & Tracking", hash: "#/sales/export-ops/shipments-tracking" },
          { id: "cargo-insurance", label: "Cargo Insurance", hash: "#/sales/export-ops/cargo-insurance" }
        ]
      },
      {
        id: "export-finance",
        title: "Export Finance",
        defaultTab: "bank-negotiations",
        tabs: [
          { id: "bank-negotiations", label: "Bank Negotiations", hash: "#/sales/export-finance/bank-negotiations" },
          { id: "collections-realization", label: "Collections & Realization", hash: "#/sales/export-finance/collections-realization" },
          { id: "forward-contracts", label: "Forward Contracts", hash: "#/sales/export-finance/forward-contracts" }
        ]
      }
    ]
  },
  {
    id: "reports",
    title: "Reports",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
    submenus: [
      {
        id: "production-analytics",
        title: "Production Analytics",
        defaultTab: "yield-reports",
        tabs: [
          { id: "yield-reports", label: "Yield Reports", hash: "#/reports/production-analytics/yield-reports" },
          { id: "floor-summaries", label: "Floor Summaries", hash: "#/reports/production-analytics/floor-summaries" },
          { id: "ad-export-logs", label: "Anti-Dumping Export Logs", hash: "#/reports/production-analytics/ad-export-logs" }
        ]
      },
      {
        id: "coldstore-analytics",
        title: "Coldstore Analytics",
        defaultTab: "inventory-valuation",
        tabs: [
          { id: "inventory-valuation", label: "Inventory Valuation", hash: "#/reports/coldstore-analytics/inventory-valuation" },
          { id: "stock-summaries", label: "Stock Summaries", hash: "#/reports/coldstore-analytics/stock-summaries" },
          { id: "movement-logs", label: "Movement Logs", hash: "#/reports/coldstore-analytics/movement-logs" },
          { id: "operational-exceptions", label: "Operational Exceptions", hash: "#/reports/coldstore-analytics/operational-exceptions" }
        ]
      },
      {
        id: "sales-export-analytics",
        title: "Sales & Export Analytics",
        defaultTab: "compliance-regulatory",
        tabs: [
          { id: "compliance-regulatory", label: "Compliance & Regulatory", hash: "#/reports/sales-export-analytics/compliance-regulatory" },
          { id: "logistics-freight", label: "Logistics & Freight", hash: "#/reports/sales-export-analytics/logistics-freight" },
          { id: "financials", label: "Financials", hash: "#/reports/sales-export-analytics/financials" }
        ]
      }
    ]
  },
  {
    id: "setup",
    title: "Setup",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    submenus: [
      {
        id: "user-setup",
        title: "User Setup",
        defaultTab: "users",
        tabs: [
          { id: "users", label: "Users", hash: "#/setup/user-setup/users" },
          { id: "roles", label: "Roles", hash: "#/setup/user-setup/roles" },
          { id: "module-permissions", label: "Module Permissions", hash: "#/setup/user-setup/module-permissions" },
          { id: "audit-logs", label: "Audit & Security Logs", hash: "#/setup/user-setup/audit-logs" }
        ]
      },
      {
        id: "company-plants",
        title: "Company & Plants",
        defaultTab: "plant-registry",
        tabs: [
          { id: "plant-registry", label: "Plant Registry", hash: "#/setup/company-plants/plant-registry" },
          { id: "processing-units", label: "Processing Units", hash: "#/setup/company-plants/processing-units" },
          { id: "coldstore-chambers", label: "Coldstore Chambers", hash: "#/setup/company-plants/coldstore-chambers" }
        ]
      },
      {
        id: "species-master",
        title: "Species & Grades",
        defaultTab: "species-catalog",
        tabs: [
          { id: "species-catalog", label: "Species Catalog", hash: "#/setup/species-master/species-catalog" },
          { id: "grade-master", label: "Grade Master", hash: "#/setup/species-master/grade-master" },
          { id: "variety-matrix", label: "Variety Matrix", hash: "#/setup/species-master/variety-matrix" }
        ]
      },
      {
        id: "system-config",
        title: "System Configuration",
        defaultTab: "general-settings",
        tabs: [
          { id: "general-settings", label: "General Settings", hash: "#/setup/system-config/general-settings" },
          { id: "number-sequences", label: "Number Sequences", hash: "#/setup/system-config/number-sequences" },
          { id: "roles-permissions", label: "Roles & Permissions", hash: "#/setup/system-config/roles-permissions" }
        ]
      }
    ]
  }
];

export const Sidebar = {
  activeModuleId: 'purchase',
  activeSubmenuId: 'dashboard',
  activeTabId: 'rm-dashboard',

  render(containerId, activeHash = '#/purchase/dashboard/rm-dashboard') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Parse active hash: #/module/submenu/tab
    const clean = (activeHash || '').replace(/^#\/?/, '').replace(/^\/+/, '');
    const parts = clean.split('/');
    const modId = parts[0] || 'purchase';
    const subId = parts[1] || 'dashboard';
    const tabId = parts[2] || '';

    this.activeModuleId = modId;
    this.activeSubmenuId = subId;
    this.activeTabId = tabId;

    container.innerHTML = `
      <aside id="erp-sidebar" class="bg-[#0747A6] text-[#DEEBFF] w-72 h-full flex flex-col transition-all duration-300 select-none shadow-xl">
        <!-- Logo Branding Header -->
        <div class="h-16 px-4 py-2 flex items-center justify-between border-b border-[#00388B] bg-[#002766] shrink-0">
          <div class="flex items-center gap-3">
            <img src="${LOGO_WHITE}" alt="Devi Fisheries" class="h-10 w-auto max-w-[140px] object-contain shrink-0" />
            <div class="flex flex-col border-l border-[#0052CC] pl-2.5">
              <span class="font-extrabold text-xs tracking-wider text-white leading-tight">ERP</span>
              <span class="text-[9px] text-[#8EB7FF] font-semibold leading-tight mt-0.5">Cloud</span>
            </div>
          </div>
        </div>

        <!-- Navigation Scrollable Area -->
        <div class="flex-1 overflow-y-auto py-3 px-3 space-y-1.5" id="sidebar-nav-groups">
          ${this.renderNavHierarchy()}
        </div>
      </aside>
    `;

    this.bindEvents();
  },

  renderNavHierarchy() {
    return NAV_HIERARCHY.map(mod => {
      const isExpanded = mod.id === this.activeModuleId;
      
      let submenusHtml = '';
      if (isExpanded) {
        submenusHtml = `
          <div class="mt-1 ml-2 mr-1 pl-3 pr-2 py-1.5 space-y-1 bg-[#00317D]/70 rounded-lg border-l-2 border-[#4C9AFF]">
            ${mod.submenus.map(sub => {
              const isSubActive = sub.id === this.activeSubmenuId;
              const defaultHash = sub.tabs[0].hash;

              return `
                <div>
                  <a 
                    href="${defaultHash}" 
                    class="block px-3 py-2 rounded-md text-xs transition-all leading-snug ${isSubActive ? 'bg-[#DEEBFF] text-[#0052CC] font-bold shadow-sm' : 'text-[#DEEBFF] hover:bg-[#0052CC] hover:text-white'}"
                  >
                    <span>${sub.title}</span>
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      return `
        <div class="nav-module-group mb-1">
          <button 
            data-module-id="${mod.id}" 
            class="sidebar-mod-btn w-full px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${isExpanded ? 'bg-[#0052CC] text-white shadow-xs' : 'text-[#DEEBFF] hover:bg-[#00388B]'}"
          >
            <div class="flex items-center gap-3">
              <span class="${isExpanded ? 'text-white' : 'text-[#8EB7FF]'}">${mod.icon}</span>
              <span class="text-xs tracking-tight">${mod.title}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </div>
          </button>
          ${submenusHtml}
        </div>
      `;
    }).join('');
  },

  bindEvents() {
    const modButtons = document.querySelectorAll('.sidebar-mod-btn');
    modButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const modId = btn.dataset.moduleId;
        this.activeModuleId = modId;
        const targetMod = NAV_HIERARCHY.find(m => m.id === modId);
        if (targetMod && targetMod.submenus.length > 0) {
          const firstSub = targetMod.submenus[0];
          const firstTab = firstSub.tabs[0];
          window.location.hash = firstTab.hash;
        }
      });
    });
  }
};
