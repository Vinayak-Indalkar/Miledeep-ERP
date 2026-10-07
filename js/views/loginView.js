// Enterprise Login & Persona Switcher View

import { ERP_DATA } from '../data/mockData.js';
import { Toast } from '../components/toast.js';
import { LOGO_COLOR } from '../data/logos.js';

export const LoginView = {
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-[#0747A6] via-[#0052CC] to-[#00388B] flex items-center justify-center p-4 sm:p-6">
        <div class="w-full max-w-[460px] bg-white rounded-2xl shadow-2xl border border-[#DFE1E6] p-8 sm:p-10 min-h-[580px] flex flex-col justify-between animate-fade-in relative overflow-hidden">
          
          <!-- Top Brand Header -->
          <div>
            <div class="flex flex-col items-center text-center mb-6">
              <img src="${LOGO_COLOR}" alt="Devi Fisheries" class="h-16 w-auto max-w-[210px] object-contain" />
            </div>

            <!-- Sign In Heading -->
            <div class="mb-6 text-center">
              <h2 class="text-lg font-bold text-[#172B4D]">Administrator Sign-In</h2>
              <p class="text-xs text-[#5E6C84] mt-1">Enter your credentials to access the plant control center</p>
            </div>

            <!-- Sign In Form -->
            <form id="login-form" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1.5">Email / Enterprise User ID</label>
                <input 
                  type="text" 
                  id="login-email" 
                  required 
                  value="admin@devifisheries.com" 
                  class="w-full text-xs px-3.5 py-2.5 bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg focus:bg-white focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] transition-all"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#172B4D] mb-1.5">Password</label>
                <div class="relative">
                  <input 
                    type="password" 
                    id="login-password" 
                    required 
                    value="••••••••••••" 
                    class="w-full text-xs px-3.5 py-2.5 bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg focus:bg-white focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] transition-all"
                  />
                  <button type="button" id="toggle-pwd-btn" class="absolute right-3 top-2.5 text-[#6B778C] hover:text-[#172B4D]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </button>
                </div>
              </div>

              <!-- Remember Me & Forgot Password -->
              <div class="flex items-center justify-between text-xs pt-0.5">
                <label class="flex items-center gap-2 cursor-pointer select-none text-[#172B4D]">
                  <input 
                    type="checkbox" 
                    id="login-remember-me" 
                    checked 
                    class="rounded border-[#DFE1E6] text-[#0052CC] focus:ring-0 cursor-pointer"
                  />
                  <span class="font-medium text-[#42526E]">Remember me</span>
                </label>
                <button type="button" id="forgot-password-btn" class="text-xs text-[#0052CC] hover:underline font-medium">Forgot password?</button>
              </div>

              <div class="pt-2">
                <button 
                  type="submit" 
                  id="submit-login-btn" 
                  class="w-full btn-primary py-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span id="login-btn-text">Sign In to ERP Dashboard</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>
            </form>
          </div>

          <!-- Option 1 & Option 2 Buttons -->
          <div class="mt-8 pt-4 border-t border-[#EBECF0]">
            <div class="text-[11px] font-bold text-[#5E6C84] uppercase tracking-wider text-center mb-2.5">Select Layout Experience</div>
            <div class="grid grid-cols-2 gap-3">
              <button 
                type="button" 
                id="login-option-1-btn" 
                class="w-full py-2.5 px-3 bg-white hover:bg-[#F4F5F7] text-[#172B4D] hover:text-[#0052CC] border border-[#DFE1E6] hover:border-[#0052CC] rounded-lg font-bold text-xs transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer"
                title="Sign in with Option 1: Classic Left Sidebar Navigation"
              >
                <svg class="w-3.5 h-3.5 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h4v12H4zM10 6h10v12H10z"/></svg>
                <span>Option 1 (Sidebar)</span>
              </button>
              <button 
                type="button" 
                id="login-option-2-btn" 
                class="w-full py-2.5 px-3 bg-white hover:bg-[#F4F5F7] text-[#172B4D] hover:text-[#0052CC] border border-[#DFE1E6] hover:border-[#0052CC] rounded-lg font-bold text-xs transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer"
                title="Sign in with Option 2: Enterprise Top Horizontal Navigation"
              >
                <svg class="w-3.5 h-3.5 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16v4H4zM4 12h16v8H4z"/></svg>
                <span>Option 2 (Top Nav)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  },

  bindEvents() {
    const form = document.getElementById('login-form');
    const pwdInput = document.getElementById('login-password');
    const togglePwdBtn = document.getElementById('toggle-pwd-btn');
    const emailInput = document.getElementById('login-email');
    const submitBtn = document.getElementById('submit-login-btn');
    const btnText = document.getElementById('login-btn-text');

    // Toggle password visibility
    if (togglePwdBtn && pwdInput) {
      togglePwdBtn.addEventListener('click', () => {
        const isPwd = pwdInput.type === 'password';
        pwdInput.type = isPwd ? 'text' : 'password';
      });
    }

    // Forgot password
    const forgotBtn = document.getElementById('forgot-password-btn');
    if (forgotBtn) {
      forgotBtn.addEventListener('click', () => {
        Toast.show('A secure password reset link has been dispatched to your corporate email.', 'info', 'Password Reset Requested');
      });
    }

    // Form Submit (Defaults to Option 1 as requested)
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        btnText.innerText = 'Authenticating Enterprise SSO...';
        submitBtn.classList.add('opacity-75', 'cursor-wait');

        setTimeout(() => {
          localStorage.setItem('erp_layout_mode', 'option1');
          sessionStorage.setItem('trigger_tour_on_login', 'true');
          const existing = document.getElementById('erp-app-shell');
          if (existing) existing.remove();
          Toast.show(`Welcome back, ${ERP_DATA.currentUser.name}`, 'success', 'Authentication Successful');
          window.location.hash = '#/purchase/dashboard/rm-dashboard';
        }, 400);
      });
    }

    // Option 1 & Option 2 Buttons
    const opt1Btn = document.getElementById('login-option-1-btn');
    if (opt1Btn) {
      opt1Btn.addEventListener('click', () => {
        localStorage.setItem('erp_layout_mode', 'option1');
        const existing = document.getElementById('erp-app-shell');
        if (existing) existing.remove();
        Toast.show('Welcome to Option 1: Classic Left Sidebar Navigation', 'info', 'Option 1 Selected');
        window.location.hash = '#/purchase/dashboard/rm-dashboard';
      });
    }

    const opt2Btn = document.getElementById('login-option-2-btn');
    if (opt2Btn) {
      opt2Btn.addEventListener('click', () => {
        localStorage.setItem('erp_layout_mode', 'option2');
        const existing = document.getElementById('erp-app-shell');
        if (existing) existing.remove();
        Toast.show('Welcome to Option 2: Enterprise Top Navigation', 'info', 'Option 2 Selected');
        window.location.hash = '#/purchase/dashboard/rm-dashboard';
      });
    }
  }
};
