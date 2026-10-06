// Spacious, Prominent & Beautiful Under Construction Component with Collapsible Filter Bar & Large Lottie Animation

export function renderEmptyState({
  moduleName = "Module",
  tabName = "Section"
}) {
  const title = `${tabName}`.toUpperCase();
  const dateStr = new Date().toLocaleDateString('en-GB');

  return `
    <div class="space-y-4 animate-fade-in">
      <!-- Collapsible Top Filter Header Card -->
      <div class="bg-white rounded-xl border border-[#DFE1E6] p-4 shadow-xs">
        <div class="flex items-center justify-between pb-3 border-b border-[#EBECF0]">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            <h3 class="text-xs font-bold text-[#172B4D]">Search &amp; Filters</h3>
          </div>

          <!-- Filter Controls: Reset & Toggle Open/Close -->
          <div class="flex items-center gap-2">
            <button type="button" onclick="const s = this.closest('.bg-white').querySelectorAll('select'); s.forEach(sel => sel.selectedIndex = 0); if(window.Toast) window.Toast.show('Filters reset', 'info');" class="text-xs font-semibold text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#F4F5F7] px-2.5 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-colors cursor-pointer" title="Reset all filters">
              <svg class="w-3.5 h-3.5 text-[#6B778C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              <span>Reset</span>
            </button>

            <button type="button" onclick="const b = this.closest('.bg-white').querySelector('.empty-state-filter-body'); const t = this.querySelector('.empty-toggle-text'); const ic = this.querySelector('svg'); b.classList.toggle('hidden'); if(b.classList.contains('hidden')){ t.innerText='Show Filter'; ic.classList.add('-rotate-90'); this.className='text-xs font-semibold text-[#5E6C84] bg-[#FAFBFC] hover:bg-[#EBECF0] px-3 py-1.5 rounded border border-[#DFE1E6] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer'; } else { t.innerText='Hide Filter'; ic.classList.remove('-rotate-90'); this.className='text-xs font-semibold text-[#0052CC] bg-[#DEEBFF]/80 hover:bg-[#DEEBFF] px-3 py-1.5 rounded border border-[#B3D4FF] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer'; }" class="text-xs font-semibold text-[#0052CC] bg-[#DEEBFF]/80 hover:bg-[#DEEBFF] px-3 py-1.5 rounded border border-[#B3D4FF] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer">
              <svg class="w-3.5 h-3.5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              <span class="empty-toggle-text">Hide Filter</span>
            </button>
          </div>
        </div>

        <!-- Collapsible Filter Inputs Grid -->
        <div class="empty-state-filter-body mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs transition-all duration-200">
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
              <option>Machilipatnam Delta #3</option>
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
            <input type="text" value="${dateStr}" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
          </div>

          <div>
            <label class="block text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider mb-1">TO DATE</label>
            <input type="text" value="${dateStr}" class="w-full text-xs px-2.5 py-1.5 bg-white border border-[#DFE1E6] rounded focus:outline-none focus:border-[#0052CC]" />
          </div>

          <div class="flex items-end gap-2">
            <button onclick="if(window.Toast) window.Toast.show('Search completed for ${tabName}. No historical records matching filters.', 'info');" class="btn-primary w-full py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Under Construction Card -->
      <div class="bg-white rounded-2xl border border-[#DFE1E6] p-10 sm:p-12 text-center shadow-xs animate-fade-in flex flex-col items-center justify-center max-w-3xl mx-auto my-4 min-h-[420px]">
        <!-- Prominent Lottie Player -->
        <div class="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
          <lottie-player 
            src="https://assets9.lottiefiles.com/packages/lf20_m6cuL6.json" 
            background="transparent" 
            speed="1" 
            style="width: 100%; height: 100%;" 
            loop 
            autoplay
          ></lottie-player>

          <!-- Smooth SVG Construction Illustration Fallback (Works offline instantly) -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-30">
            <svg class="w-48 h-48 text-[#FFAB00] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
          </div>
        </div>

        <!-- Clean Minimal Status Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF0B3] text-[#8f4d00] font-bold text-xs rounded-full mt-2 mb-2 uppercase tracking-wider">
          <span class="w-2 h-2 rounded-full bg-[#FFAB00] animate-ping"></span>
          Under Construction
        </div>

        <p class="text-sm text-[#5E6C84] max-w-md leading-relaxed mt-1">
          This module is currently in development and staging.
        </p>
      </div>
    </div>
  `;
}
