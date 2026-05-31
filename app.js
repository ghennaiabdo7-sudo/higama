/* ====== STATE MANAGEMENT ====== */
const DATA_KEY = 'cuppingCenterData';

function getDefaultData() {
  const service1Id = 's1';
  const service2Id = 's2';
  const service3Id = 's3';
  const service4Id = 's4';
  
  const therapist1Id = 't1';
  const therapist2Id = 't2';
  
  const inv1Id = 'i1';
  const inv2Id = 'i2';
  const inv3Id = 'i3';
  const inv4Id = 'i4';
  const inv5Id = 'i5';
  
  return {
    therapists: [
      { id: therapist1Id, name: 'أحمد الجلالي', username: 'ahmed', password: '123', commission: 40, whatsapp: '213661234567', gender: 'ذكر', rating: 5 },
      { id: therapist2Id, name: 'سارة اليوسفي', username: 'sara', password: '123', commission: 45, whatsapp: '213662345678', gender: 'أنثى', rating: 5 }
    ],
    expenses: [
      { id: 'exp1', name: 'الكراء', amount: 35000, month: 'ماي', year: 2026 },
      { id: 'exp2', name: 'الكهرباء', amount: 4500, month: 'ماي', year: 2026 },
      { id: 'exp3', name: 'الإنترنت', amount: 3000, month: 'ماي', year: 2026 }
    ],
    inventory: [
      { id: inv1Id, name: 'كؤوس حجامة معقمة (حجم متوسط)', quantity: 350, volume: 0, costPrice: 35 },
      { id: inv2Id, name: 'زيت الزيتون البكر العضوي', quantity: 15, volume: 500, costPrice: 450 },
      { id: inv3Id, name: 'زيت الكافور والنعناع المهدئ', quantity: 10, volume: 250, costPrice: 600 },
      { id: inv4Id, name: 'شفرات طبية معقمة أحادية الاستخدام', quantity: 200, volume: 0, costPrice: 20 },
      { id: inv5Id, name: 'معقم كحولي وقفازات طبية', quantity: 120, volume: 0, costPrice: 15 }
    ],
    services: [
      { 
        id: service1Id, 
        name: 'الحجامة العلاجية الوقائية الشاملة', 
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop', 
        price: 3500, 
        description: 'جلسة حجامة رطبة تقليدية متكاملة تحت معايير تعقيم صارمة للتخلص من الشوائب وتنشيط الدورة الدموية.', 
        isCupping: true, 
        cupPrice: 150, 
        inventoryMapping: [
          { inventoryId: inv1Id, quantity: 1 },
          { inventoryId: inv4Id, quantity: 1 },
          { inventoryId: inv5Id, quantity: 2 }
        ] 
      },
      { 
        id: service2Id, 
        name: 'جلسة مساج علاجي بالزيوت الدافئة', 
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop', 
        price: 4500, 
        description: 'مساج استرخائي عميق لكامل الجسم باستخدام زيوت عطرية دافئة للتخلص من تشنجات العضلات والإجهاد النفسي.', 
        isCupping: false, 
        cupPrice: 0, 
        inventoryMapping: [
          { inventoryId: inv2Id, quantity: 1 }
        ] 
      },
      { 
        id: service3Id, 
        name: 'جلسة الحجامة الجافة والتدليك الانزلاقي', 
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop', 
        price: 3000, 
        description: 'مزيج رائع بين الكؤوس الجافة والتدليك الانزلاقي بالزيوت لتخفيف آلام الظهر والمفاصل وتحسين مرونة العضلات.', 
        isCupping: true, 
        cupPrice: 100, 
        inventoryMapping: [
          { inventoryId: inv1Id, quantity: 1 },
          { inventoryId: inv3Id, quantity: 1 }
        ] 
      },
      { 
        id: service4Id, 
        name: 'المساج الرياضي العميق وتمديد العضلات', 
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92834907?q=80&w=800&auto=format&fit=crop', 
        price: 5000, 
        description: 'مخصص للرياضيين وأصحاب المجهود البدني العالي؛ يركز على تفكيك حمض اللاكتيك وتأهيل الأنسجة العضلية.', 
        isCupping: false, 
        cupPrice: 0, 
        inventoryMapping: [
          { inventoryId: inv3Id, quantity: 1 },
          { inventoryId: inv5Id, quantity: 1 }
        ] 
      }
    ],
    bookings: [],
    customers: [
      { id: 'c1', name: 'عمر الخطاب', phone: '+213555123456', gender: 'ذكر', username: 'omar', password: '123' },
      { id: 'c2', name: 'فاطمة الزهراء', phone: '+213555987654', gender: 'أنثى', username: 'fatima', password: '123' }
    ],
    healthRecords: [],
    notifications: [],
    deductions: [],
    settings: {
      logo: '',
      bio: 'رعاية متكاملة لصحتك الجسدية بحجامة احترافية ومساج علاجي دافئ في بيئة طبية راقية وآمنة.',
      workingHours: 'السبت - الخميس 09:00 - 20:00',
      mapLink: 'https://maps.google.com',
      whatsapp: '213661234567',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      adminUser: 'admin',
      adminPass: 'admin123'
    }
  };
}

function getData() {
  try {
    const raw = localStorage.getItem(DATA_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      const def = getDefaultData();
      for (let k in def) { if (!(k in d)) d[k] = def[k]; }
      return d;
    }
  } catch(e) {}
  return getDefaultData();
}

function saveData() {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
  // Async sync to Supabase
  if (typeof saveToSupabase === 'function') {
    saveToSupabase(data).catch(() => {});
  }
}

let data = getData();

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

/* ====== SUPABASE CONFIG UI ====== */
function connectSupabase() {
  const url = document.getElementById('supabaseUrl').value.trim();
  const key = document.getElementById('supabaseKey').value.trim();
  if (!url || !key) { showToast('الرجاء إدخال رابط Supabase والمفتاح', 'error'); return; }
  saveSupabaseConfig(url, key);
  initSupabase().then(connected => {
    const status = document.getElementById('supabaseStatus');
    if (connected) {
      status.className = 'text-xs text-emerald-600 px-3 py-2 rounded-lg bg-emerald-50';
      status.innerHTML = '<i class="fas fa-check-circle ml-1"></i>✅ متصل بـ Supabase';
      showToast('تم الاتصال بـ Supabase بنجاح', 'success');
      // Load data from Supabase
      loadFromSupabase().then(remoteData => {
        if (remoteData) {
          Object.assign(data, remoteData);
          saveData();
          showToast('تم تحميل البيانات من السحابة', 'success');
          if (currentUser.role === 'admin') renderAllAdmin();
        }
      });
    } else {
      status.className = 'text-xs text-red-500 px-3 py-2 rounded-lg bg-red-50';
      status.innerHTML = '<i class="fas fa-times-circle ml-1"></i>❌ فشل الاتصال';
    }
  });
}

function disconnectSupabase() {
  clearSupabaseConfig();
  supabaseClient = null;
  supabaseConnected = false;
  const status = document.getElementById('supabaseStatus');
  status.className = 'text-xs text-stone-400 px-3 py-2 rounded-lg bg-stone-100';
  status.innerHTML = '⏻ غير متصل';
  showToast('تم فصل Supabase', 'info');
}

function syncToSupabase() {
  if (typeof fullSyncToSupabase === 'function') fullSyncToSupabase();
}

function loadFromSupabase() {
  if (typeof fullLoadFromSupabase === 'function') return fullLoadFromSupabase();
  return Promise.resolve(false);
}

/* ====== INIT / ROUTING ====== */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Supabase
  initSupabase().then(connected => {
    if (connected) {
      return loadFromSupabase().then(remoteData => {
        if (remoteData) Object.assign(data, remoteData);
      });
    }
  }).catch(() => {});

  // Populate Supabase config fields if saved
  const config = getSupabaseConfig();
  if (config) {
    const urlField = document.getElementById('supabaseUrl');
    const keyField = document.getElementById('supabaseKey');
    if (urlField && keyField) {
      urlField.value = config.url;
      keyField.value = config.anonKey;
    }
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('view') === 'customer') {
    showView('customerView');
    renderCustomerServices();
    renderCustomerSettings();
  } else {
    showView('loginView');
    initLoginToggle();
  }
  initSidebarToggles();
  initBookingTimeSlots();
  document.getElementById('bookingChronic').addEventListener('change', function() {
    document.getElementById('bookingChronicDescField').classList.toggle('hidden', this.value !== 'نعم');
  });

  // Attach print button click event in details modal
  const prtBtn = document.getElementById('detailPrintBtn');
  if (prtBtn) {
    prtBtn.addEventListener('click', function() {
      const content = document.getElementById('adminDetailedBookingContent').innerHTML;
      const printWin = window.open('', '_blank');
      printWin.document.write(`
        <html dir="rtl">
        <head>
          <meta charset="UTF-8">
          <title>الملف الطبي للجلسة</title>
          <style>
            body { font-family: 'Cairo', sans-serif; padding: 40px; text-align: right; background: #fff; color: #000; }
            h1 { color: #0d9488; font-size: 22px; margin-bottom: 2px; }
            .sub { color: #666; font-size: 13px; margin-top: 4px; }
            .section { margin: 20px 0; padding: 15px; border: 1.5px solid #0d9488; border-radius: 12px; }
            .section h2 { font-size: 15px; margin-top: 0; color: #0d9488; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            .label { color: #666; font-size: 12px; }
            .value { font-weight: bold; font-size: 14px; margin-top: 2px; }
            .warning { background: #fef2f2; border: 1px solid #fee2e2; color: #991b1b; padding: 12px; border-radius: 8px; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>الملف الطبي للجلسة العلاجية</h1>
          <p class="sub">مركز الزمرد للحجامة والعناية الجسدية</p>
          <hr style="border: none; border-top: 1.5px dashed #0d9488; margin: 15px 0;">
          ${content}
        </body>
        </html>
      `);
      printWin.document.close();
      printWin.print();
    });
  }

  // ضبط الحد الأدنى للتواريخ ليكون اليوم لتجنب حجز تواريخ قديمة
  const bookingDateInput = document.getElementById('bookingDate');
  if (bookingDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    bookingDateInput.setAttribute('min', todayStr);
  }

  // إغلاق النوافذ المنبثقة فوراً بالضغط خارج محتوى النافذة (على الغطاء المظلم)
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal(this.id);
      }
    });
  });
});

function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
}

/* ====== TOAST ====== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML = '<i class="fas ' + (icons[type] || icons.info) + '"></i><span>' + message + '</span>';
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('removing'); setTimeout(() => toast.remove(), 300); }, 3000);
}

/* ====== MODAL ====== */
function showModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

/* ====== LOGIN ====== */
let currentUser = { role: null, id: null, name: null };

function initLoginToggle() {
  document.querySelectorAll('.login-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.login-toggle').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const role = this.dataset.role;
      const title = document.getElementById('loginTitle');
      const icon = document.getElementById('loginIcon');
      if (role === 'admin') {
        title.textContent = 'تسجيل دخول المدير';
        icon.className = 'fas fa-user-shield text-teal-600 text-2xl';
      } else {
        title.textContent = 'تسجيل دخول المعالج';
        icon.className = 'fas fa-user-md text-emerald-600 text-2xl';
      }
    });
  });

  document.getElementById('loginBtn').addEventListener('click', handleLogin);
  document.querySelectorAll('#loginUser, #loginPass').forEach(el => {
    el.addEventListener('keydown', function(e) { if (e.key === 'Enter') handleLogin(); });
  });
}

function handleLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  const role = document.querySelector('.login-toggle.active')?.dataset.role || 'admin';
  const errEl = document.getElementById('loginError');
  errEl.classList.add('hidden');

  if (!user || !pass) {
    errEl.textContent = 'الرجاء إدخال اسم المستخدم وكلمة المرور';
    errEl.classList.remove('hidden');
    return;
  }

  if (role === 'admin') {
    const adminUser = data.settings.adminUser || 'admin';
    const adminPass = data.settings.adminPass || 'admin123';
    if (user === adminUser && pass === adminPass) {
      currentUser = { role: 'admin', id: 'admin', name: 'المدير' };
      showView('adminView');
      renderAllAdmin();
      return;
    }
  } else {
    const therapist = data.therapists.find(t => t.username === user && t.password === pass);
    if (therapist) {
      currentUser = { role: 'therapist', id: therapist.id, name: therapist.name };
      showView('therapistView');
      document.getElementById('therapistName').textContent = therapist.name;
      renderAllTherapist();
      return;
    }
  }

  errEl.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
  errEl.classList.remove('hidden');
}

document.getElementById('adminLogout').addEventListener('click', function() {
  currentUser = { role: null, id: null, name: null };
  showView('loginView');
  showToast('تم تسجيل الخروج بنجاح', 'info');
});

document.getElementById('therapistLogout').addEventListener('click', function() {
  currentUser = { role: null, id: null, name: null };
  showView('loginView');
  showToast('تم تسجيل الخروج بنجاح', 'info');
});

/* ====== SIDEBAR NAVIGATION ====== */
function initSidebarToggles() {
  document.querySelectorAll('.admin-nav').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.admin-nav').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
      document.getElementById('admin' + this.dataset.section.charAt(0).toUpperCase() + this.dataset.section.slice(1) + 'Section').classList.remove('hidden');
      if (this.dataset.section === 'bookings') renderAdminBookings();
      if (this.dataset.section === 'therapists') { renderTherapists(); renderDeductionsHistory(); }
      if (this.dataset.section === 'customers') renderAdminCustomers();
      if (this.dataset.section === 'settings') populateAdminSettings();

      // غلق قائمة الهواتف المحمولة المنزلقة فور التنقل
      const sidebar = document.getElementById('adminSidebar');
      if (sidebar) sidebar.classList.remove('active');
      const overlay = document.getElementById('mobileSidebarOverlay');
      if (overlay) overlay.remove();
    });
  });
  document.querySelectorAll('.therapist-nav').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.therapist-nav').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.therapist-section').forEach(s => s.classList.add('hidden'));
      document.getElementById('therapist' + this.dataset.section.charAt(0).toUpperCase() + this.dataset.section.slice(1) + 'Section').classList.remove('hidden');
      if (this.dataset.section === 'schedule') renderTherapistSchedule();
      if (this.dataset.section === 'patients') renderPatients();
      if (this.dataset.section === 'notifications') renderNotifications();

      // غلق قائمة الهواتف المحمولة المنزلقة فور التنقل
      const sidebar = document.getElementById('therapistSidebar');
      if (sidebar) sidebar.classList.remove('active');
      const overlay = document.getElementById('mobileSidebarOverlay');
      if (overlay) overlay.remove();
    });
  });
}

/* ====== ADMIN: RENDER ALL ====== */
function renderAllAdmin() {
  updateAdminDashboard();
  renderExpenses();
  renderTherapists();
  renderDeductionsHistory();
  renderInventory();
  renderServices();
  renderAdminBookings();
  renderAdminCustomers();
  populateAdminSettings();
}

/* ====== IMAGE COMPRESSION ====== */
function compressImage(file, maxSizeKB = 100, callback) {
  if (!file) { callback(null); return; }
  if (file.size > maxSizeKB * 1024) {
    showToast('الملف كبير جداً. جاري الضغط والتجهيز...', 'warning');
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      let quality = 0.7;
      let canvas = document.createElement('canvas');
      let w = img.width, h = img.height;
      const maxDim = 800;
      if (w > maxDim || h > maxDim) {
        const ratio = Math.min(maxDim / w, maxDim / h);
        w *= ratio; h *= ratio;
      }
      canvas.width = w; canvas.height = h;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      let result = canvas.toDataURL('image/jpeg', quality);
      while (result.length > maxSizeKB * 1024 * 0.75 && quality > 0.1) {
        quality -= 0.1;
        result = canvas.toDataURL('image/jpeg', quality);
      }
      if (result.length > maxSizeKB * 1024 * 0.75) {
        showToast('تعذر ضغط الصورة. يرجى اختيار ملف أصغر حجماً.', 'error');
        callback(null); return;
      }
      callback(result);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function compressAndSetImage(input, previewId, hiddenId) {
  const file = input.files[0];
  if (!file) return;
  compressImage(file, 100, function(result) {
    if (result) {
      document.getElementById(hiddenId).value = result;
      const preview = document.getElementById(previewId);
      preview.innerHTML = '<img src="' + result + '" class="w-full h-full object-cover">';
    }
  });
}

function compressServiceImage(input) {
  const file = input.files[0];
  if (!file) return;
  compressImage(file, 100, function(result) {
    if (result) {
      document.getElementById('serviceImageData').value = result;
      const preview = document.getElementById('serviceImagePreview');
      preview.classList.remove('hidden');
      document.getElementById('serviceImagePreviewImg').src = result;
    }
  });
}

function compressMedicalTest(input) {
  const file = input.files[0];
  if (!file) return;
  compressImage(file, 100, function(result) {
    if (result) document.getElementById('healthTestData').value = result;
  });
}

function compressBookingTest(input) {
  const file = input.files[0];
  if (!file) return;
  compressImage(file, 100, function(result) {
    if (result) document.getElementById('bookingTestData').value = result;
  });
}

/* ====== ADMIN: DASHBOARD ====== */
function updateAdminDashboard() {
  const total = data.bookings.length;
  const completed = data.bookings.filter(b => b.status === 'completed').length;
  const pending = data.bookings.filter(b => b.status === 'pending').length;
  const totalCapital = data.bookings.filter(b => b.status === 'completed').reduce((s, b) => s + (b.finalPrice || b.servicePrice || 0), 0);
  const totalExpenses = data.expenses.reduce((s, e) => s + Number(e.amount), 0);
  const totalCommissions = data.bookings.filter(b => b.status === 'completed').reduce((s, b) => s + (b.commissionAmount || 0), 0);
  const totalMaterialCost = data.bookings.filter(b => b.status === 'completed').reduce((s, b) => s + (b.materialCost || 0), 0);
  const deductions = data.deductions.reduce((s, d) => s + Number(d.amount), 0);
  
  // صافي فائدة المركز هي الدخل الإجمالي مطروحاً منه عمولات المعالجين وتكلفة المواد والمصاريف الثابتة والخصومات المسجلة
  const netProfit = totalCapital - totalExpenses - totalCommissions - totalMaterialCost - deductions;

  document.getElementById('totalBookings').textContent = total;
  document.getElementById('totalCapital').textContent = totalCapital.toLocaleString();
  document.getElementById('netProfit').textContent = netProfit.toLocaleString();
  document.getElementById('pendingBookings').textContent = pending;
  document.getElementById('totalFixedExpenses').textContent = totalExpenses.toLocaleString();

  // تحديث الشارة الجانبية للحجوزات المعلقة
  const pendingBadge = document.getElementById('adminPendingBadge');
  if (pendingBadge) {
    pendingBadge.textContent = pending;
    pendingBadge.classList.toggle('hidden', pending === 0);
  }

  // حساب نسب الرسم البياني الدائري المخصص
  const commPercent = totalCapital > 0 ? Math.round((totalCommissions / totalCapital) * 100) : 0;
  const expLoss = totalExpenses + totalMaterialCost + deductions;
  const expPercent = totalCapital > 0 ? Math.round((expLoss / totalCapital) * 100) : 0;
  const netPercent = totalCapital > 0 ? Math.max(0, 100 - commPercent - expPercent) : 0;

  // تحديث القيم النصية للرسم البياني
  document.getElementById('chartProfitPercent').textContent = netPercent + '%';
  document.getElementById('chartProfitVal').textContent = `${netProfit.toLocaleString()} DA (${netPercent}%)`;
  document.getElementById('chartCommVal').textContent = `${totalCommissions.toLocaleString()} DA (${commPercent}%)`;
  document.getElementById('chartExpVal').textContent = `${expLoss.toLocaleString()} DA (${expPercent}%)`;

  // تحريك وتلوين الدوائر SVG
  const circleNet = document.getElementById('chartNetCircle');
  const circleComm = document.getElementById('chartCommCircle');
  const circleExp = document.getElementById('chartExpCircle');

  if (circleNet && circleComm && circleExp) {
    circleNet.setAttribute('stroke-dasharray', `${netPercent} 100`);
    circleNet.setAttribute('stroke-dashoffset', '0');

    circleComm.setAttribute('stroke-dasharray', `${commPercent} 100`);
    circleComm.setAttribute('stroke-dashoffset', `-${netPercent}`);

    circleExp.setAttribute('stroke-dasharray', `${expPercent} 100`);
    circleExp.setAttribute('stroke-dashoffset', `-${netPercent + commPercent}`);
  }

  const tbody = document.getElementById('adminRecentBookings');
  const recent = data.bookings.slice(-5).reverse();
  tbody.innerHTML = recent.map(b => {
    const customer = data.customers.find(c => c.id === b.customerId);
    const service = data.services.find(s => s.id === b.serviceId);
    const statusMap = { pending: 'قيد الانتظار', confirmed: 'مؤكد', completed: 'مكتمل', cancelled: 'ملغي' };
    const statusColors = { pending: 'bg-amber-100 text-amber-600', confirmed: 'bg-teal-100 text-teal-700', completed: 'bg-emerald-100 text-emerald-600', cancelled: 'bg-red-100 text-red-600' };
    return '<tr><td class="font-bold">' + (customer ? customer.name : 'غير معروف') + '</td><td>' + (service ? service.name : 'غير معروف') + '</td><td>' + b.date + '</td><td><span class="px-2 py-1 rounded-lg text-xs font-bold ' + (statusColors[b.status] || 'bg-gray-100 text-gray-600') + '">' + (statusMap[b.status] || b.status) + '</span></td><td class="font-black text-teal-600">' + (b.finalPrice || b.servicePrice || 0).toLocaleString() + ' DA</td></tr>';
  }).join('');

  const activeTherapists = document.getElementById('adminActiveTherapists');
  if (data.therapists.length === 0) {
    activeTherapists.innerHTML = '<p class="text-gray-400 text-sm font-bold text-center py-2">لا يوجد معالجون بعد</p>';
  } else {
    activeTherapists.innerHTML = data.therapists.map(t => {
      const tBookings = data.bookings.filter(b => b.therapistId === t.id);
      const earnings = tBookings.filter(b => b.status === 'completed').reduce((s, b) => s + (b.finalPrice || 0), 0);
      return '<div class="flex items-center justify-between py-3 border-b border-stone-50 last:border-0"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 font-extrabold">' + t.name.charAt(0) + '</div><div><p class="font-bold text-stone-800 text-sm">' + t.name + '</p><p class="text-xs text-stone-400 font-bold">' + tBookings.length + ' حجوزات</p></div></div><span class="text-sm font-black text-teal-600">' + earnings.toLocaleString() + ' DA</span></div>';
    }).join('');
  }
}

/* ====== ADMIN: EXPENSES ====== */
function renderExpenses() {
  const tbody = document.getElementById('expensesTable');
  if (data.expenses.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-stone-400 py-8 font-bold">لا توجد مصاريف ثابتة مسجلة حالياً</td></tr>';
    return;
  }
  tbody.innerHTML = data.expenses.map(e =>
    '<tr><td class="font-bold">' + e.name + '</td><td class="font-black text-red-500">' + Number(e.amount).toLocaleString() + ' DA</td><td class="font-bold">' + e.month + '</td><td class="font-bold">' + e.year + '</td><td><div class="flex gap-2 justify-end"><button onclick="editExpense(\'' + e.id + '\')" class="text-teal-600 hover:text-teal-700 text-sm font-bold"><i class="fas fa-edit"></i></button><button onclick="deleteExpense(\'' + e.id + '\')" class="text-red-500 hover:text-red-600 text-sm font-bold"><i class="fas fa-trash"></i></button></div></td></tr>'
  ).join('');
  updateAdminDashboard();
}

function saveExpense() {
  const name = document.getElementById('expenseName').value;
  const amount = document.getElementById('expenseAmount').value;
  const month = document.getElementById('expenseMonth').value;
  const year = document.getElementById('expenseYear').value;
  const editId = document.getElementById('editExpenseId').value;
  if (!amount) { showToast('الرجاء إدخال قيمة المبلغ المصروف', 'error'); return; }
  if (editId) {
    const idx = data.expenses.findIndex(e => e.id === editId);
    if (idx > -1) { data.expenses[idx] = { ...data.expenses[idx], name, amount: Number(amount), month, year: Number(year) }; }
  } else {
    data.expenses.push({ id: generateId(), name, amount: Number(amount), month, year: Number(year) });
  }
  saveData(); renderExpenses(); closeModal('expenseModal');
  showToast('تم حفظ سجل المصروف الثابت بنجاح', 'success');
  document.getElementById('editExpenseId').value = '';
  document.getElementById('expenseAmount').value = '';
}

function editExpense(id) {
  const e = data.expenses.find(x => x.id === id);
  if (!e) return;
  document.getElementById('expenseName').value = e.name;
  document.getElementById('expenseAmount').value = e.amount;
  document.getElementById('expenseMonth').value = e.month;
  document.getElementById('expenseYear').value = e.year;
  document.getElementById('editExpenseId').value = id;
  showModal('expenseModal');
}

function deleteExpense(id) {
  if (!confirm('هل أنت متأكد من رغبتك في حذف هذا المصروف؟')) return;
  data.expenses = data.expenses.filter(e => e.id !== id);
  saveData(); renderExpenses();
  showToast('تم حذف المصروف بنجاح', 'info');
}

/* ====== ADMIN: THERAPISTS ====== */
function renderTherapists() {
  const tbody = document.getElementById('therapistsTable');
  if (data.therapists.length === 0) {
    tbody.innerHTML = '<tr><td colspan="10" class="text-center text-stone-400 py-8 font-bold">لم يتم إضافة أي معالجين بعد في المركز</td></tr>';
    return;
  }
  tbody.innerHTML = data.therapists.map(t => {
    const tBookings = data.bookings.filter(b => b.therapistId === t.id);
    const completedB = tBookings.filter(b => b.status === 'completed');
    const capital = completedB.reduce((s, b) => s + (b.finalPrice || 0), 0);
    const commissions = completedB.reduce((s, b) => s + (b.commissionAmount || 0), 0);
    const profit = capital - commissions;
    const tDeductions = data.deductions.filter(d => d.therapistId === t.id).reduce((s, d) => s + Number(d.amount), 0);
    const stars = t.rating || 0;
    const starHtml = '<span class="text-amber-500">' + '★'.repeat(Math.round(stars)) + '</span><span class="text-stone-200">' + '★'.repeat(5 - Math.round(stars)) + '</span>';
    return '<tr><td class="font-bold">' + t.name + '</td><td>' + t.username + '</td><td class="font-bold text-teal-600">' + t.commission + '%</td><td>' + (t.whatsapp || '-') + '</td><td class="font-bold">' + (t.gender || '-') + '</td><td>' + starHtml + ' (' + stars.toFixed(1) + ')</td><td>' + completedB.length + '</td><td class="font-bold">' + capital.toLocaleString() + ' DA</td><td class="font-black text-emerald-600">' + (profit - tDeductions).toLocaleString() + ' DA</td><td><div class="flex gap-2 justify-end"><button onclick="editTherapist(\'' + t.id + '\')" class="text-teal-600 hover:text-teal-700 text-sm font-bold" title="تعديل"><i class="fas fa-edit"></i></button><button onclick="openDeduction(\'' + t.id + '\')" class="text-red-500 hover:text-red-600 text-sm font-bold" title="إجراء خصم"><i class="fas fa-minus-circle"></i></button><button onclick="deleteTherapist(\'' + t.id + '\')" class="text-stone-400 hover:text-stone-600 text-sm font-bold" title="حذف"><i class="fas fa-trash"></i></button></div></td></tr>';
  }).join('');
}

function saveTherapist() {
  const name = document.getElementById('therapistNameInput').value.trim();
  const username = document.getElementById('therapistUsername').value.trim();
  const password = document.getElementById('therapistPassword').value.trim();
  const commission = document.getElementById('therapistCommission').value;
  const whatsapp = document.getElementById('therapistWhatsapp').value.trim();
  const gender = document.getElementById('therapistGender').value;
  const editId = document.getElementById('editTherapistId').value;
  if (!name || !username || !password) { showToast('الرجاء ملء كافة الحقول الأساسية لإنشاء المعالج', 'error'); return; }
  if (data.therapists.some(t => t.username === username && t.id !== editId)) { showToast('اسم المستخدم هذا محجوز مسبقاً لمعالج آخر', 'error'); return; }
  if (editId) {
    const idx = data.therapists.findIndex(t => t.id === editId);
    if (idx > -1) data.therapists[idx] = { ...data.therapists[idx], name, username, password, commission: Number(commission), whatsapp, gender };
  } else {
    data.therapists.push({ id: generateId(), name, username, password, commission: Number(commission), whatsapp, gender, rating: 0 });
  }
  saveData(); renderTherapists(); closeModal('therapistModal');
  showToast('تم حفظ وتحديث ملف المعالج بنجاح', 'success');
  document.getElementById('editTherapistId').value = '';
  document.getElementById('therapistNameInput').value = '';
  document.getElementById('therapistUsername').value = '';
  document.getElementById('therapistPassword').value = '';
  document.getElementById('therapistCommission').value = '';
  document.getElementById('therapistWhatsapp').value = '';
}

function editTherapist(id) {
  const t = data.therapists.find(x => x.id === id);
  if (!t) return;
  document.getElementById('therapistModalTitle').textContent = 'تعديل بيانات المعالج';
  document.getElementById('therapistNameInput').value = t.name;
  document.getElementById('therapistUsername').value = t.username;
  document.getElementById('therapistPassword').value = t.password;
  document.getElementById('therapistCommission').value = t.commission;
  document.getElementById('therapistWhatsapp').value = t.whatsapp || '';
  document.getElementById('therapistGender').value = t.gender || 'ذكر';
  document.getElementById('editTherapistId').value = id;
  showModal('therapistModal');
}

function deleteTherapist(id) {
  if (!confirm('تأكيد حذف هذا المعالج نهائياً من المركز؟')) return;
  data.therapists = data.therapists.filter(t => t.id !== id);
  saveData(); renderTherapists();
  showToast('تم حذف المعالج وإلغاء تسجيل الدخول الخاص به', 'info');
}

/* ====== ADMIN: DEDUCTIONS ====== */
function openDeduction(therapistId) {
  const t = data.therapists.find(x => x.id === therapistId);
  if (!t) return;
  document.getElementById('deductionTherapistId').value = therapistId;
  document.getElementById('deductionTherapistName').textContent = 'خصم من مستحقات المعالج: ' + t.name;
  document.getElementById('deductionAmount').value = '';
  document.getElementById('deductionReason').value = '';
  showModal('deductionModal');
}

function processDeduction() {
  const id = document.getElementById('deductionTherapistId').value;
  const amount = document.getElementById('deductionAmount').value;
  const reason = document.getElementById('deductionReason').value.trim();
  if (!amount || Number(amount) <= 0) { showToast('الرجاء إدخال قيمة خصم صحيحة', 'error'); return; }
  const t = data.therapists.find(x => x.id === id);
  if (!t) return;
  data.deductions.push({ id: generateId(), therapistId: id, amount: Number(amount), reason: reason || 'تسوية وخصم إداري', date: new Date().toISOString() });
  data.notifications.push({ id: generateId(), therapistId: id, message: 'تم خصم ' + Number(amount).toLocaleString() + ' DA من فائدتك المستحقة. السبب: ' + (reason || 'تسوية إدارية'), type: 'deduction', date: new Date().toISOString(), read: false });
  saveData(); 
  renderTherapists(); 
  renderDeductionsHistory();
  closeModal('deductionModal');
  showToast('تم تسجيل الخصم المالي بنجاح في سجلات الرواتب', 'success');
}

function renderDeductionsHistory() {
  const tbody = document.getElementById('adminDeductionsHistoryTable');
  if (!tbody) return;
  if (data.deductions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center text-stone-400 py-8 font-bold">لا توجد خصومات أو تسويات مالية مسجلة</td></tr>';
    return;
  }
  tbody.innerHTML = data.deductions.map(d => {
    const therapist = data.therapists.find(t => t.id === d.therapistId);
    const dateStr = new Date(d.date).toLocaleDateString('ar-DZ') + ' ' + new Date(d.date).toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' });
    return '<tr><td class="font-bold text-stone-800">' + (therapist ? therapist.name : 'غير معروف') + '</td><td class="text-red-500 font-extrabold">' + Number(d.amount).toLocaleString() + ' DA</td><td class="font-medium text-stone-600">' + (d.reason || 'خصم مباشر') + '</td><td class="text-stone-400 text-xs">' + dateStr + '</td></tr>';
  }).join('');
}

/* ====== ADMIN: INVENTORY ====== */
function renderInventory() {
  const tbody = document.getElementById('inventoryTable');
  const cards = document.getElementById('inventoryCards');
  if (data.inventory.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-stone-400 py-8 font-bold">لا توجد منتجات مسجلة في مستودع المخزون</td></tr>';
    cards.innerHTML = '<p class="text-stone-400 text-sm font-bold col-span-full text-center py-6">المخزون فارغ حالياً</p>';
    return;
  }
  tbody.innerHTML = data.inventory.map(i => {
    const lowStock = i.quantity < 10;
    return '<tr class="' + (lowStock ? 'low-stock-alert' : '') + '"><td class="font-bold">' + i.name + '</td><td class="font-extrabold">' + i.quantity + '</td><td>' + (i.volume || '-') + '</td><td class="font-bold text-stone-700">' + (i.costPrice ? Number(i.costPrice).toLocaleString() + ' DA' : '-') + '</td><td><span class="px-2.5 py-1 rounded-full text-xs font-bold ' + (lowStock ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800') + '">' + (lowStock ? '⚠ مخزون منخفض جداً' : 'متوفر وممتاز') + '</span></td><td><div class="flex gap-2 justify-end"><button onclick="editInventory(\'' + i.id + '\')" class="text-teal-600 hover:text-teal-700 text-sm font-bold"><i class="fas fa-edit"></i></button><button onclick="deleteInventory(\'' + i.id + '\')" class="text-red-500 hover:text-red-700 text-sm font-bold"><i class="fas fa-trash"></i></button></div></td></tr>';
  }).join('');

  cards.innerHTML = data.inventory.map(i => {
    const lowStock = i.quantity < 10;
    return '<div class="glass-card p-5 bg-white ' + (lowStock ? 'low-stock-alert' : '') + '"><div class="flex items-center justify-between mb-3"><span class="font-bold text-stone-800 text-sm">' + i.name + '</span><span class="text-xs font-bold ' + (lowStock ? 'text-red-600' : 'text-stone-400') + '">' + i.quantity + ' وحدة</span></div><div class="flex justify-between text-xs font-bold text-stone-400"><span>' + (i.volume ? i.volume + ' مل' : '-') + '</span><span class="text-teal-600">' + (i.costPrice ? Number(i.costPrice).toLocaleString() + ' DA' : '-') + '</span></div></div>';
  }).join('');
}

function saveInventory() {
  const name = document.getElementById('invName').value.trim();
  const qty = document.getElementById('invQty').value;
  const volume = document.getElementById('invVolume').value;
  const cost = document.getElementById('invCost').value;
  const editId = document.getElementById('editInvId').value;
  if (!name || qty === '') { showToast('الرجاء تعيين اسم المنتج والكمية المتوفرة', 'error'); return; }
  if (editId) {
    const idx = data.inventory.findIndex(i => i.id === editId);
    if (idx > -1) data.inventory[idx] = { ...data.inventory[idx], name, quantity: Number(qty), volume: Number(volume) || 0, costPrice: Number(cost) || 0 };
  } else {
    data.inventory.push({ id: generateId(), name, quantity: Number(qty), volume: Number(volume) || 0, costPrice: Number(cost) || 0 });
  }
  saveData(); renderInventory(); closeModal('inventoryModal');
  showToast('تم حفظ المنتج بنجاح وتحديث قاعدة المخزون', 'success');
  document.getElementById('editInvId').value = '';
  document.getElementById('invName').value = '';
  document.getElementById('invQty').value = '';
  document.getElementById('invVolume').value = '';
  document.getElementById('invCost').value = '';
}

function editInventory(id) {
  const i = data.inventory.find(x => x.id === id);
  if (!i) return;
  document.getElementById('invName').value = i.name;
  document.getElementById('invQty').value = i.quantity;
  document.getElementById('invVolume').value = i.volume || '';
  document.getElementById('invCost').value = i.costPrice || '';
  document.getElementById('editInvId').value = id;
  showModal('inventoryModal');
}

function deleteInventory(id) {
  if (!confirm('هل تريد حذف هذا المنتج نهائياً من قاعدة المخزون؟')) return;
  data.inventory = data.inventory.filter(i => i.id !== id);
  saveData(); renderInventory();
  showToast('تم إزالة المنتج بنجاح', 'info');
}

/* ====== ADMIN: SERVICES ====== */
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (data.services.length === 0) {
    grid.innerHTML = '<p class="text-stone-400 text-sm font-bold col-span-full text-center py-12">لا توجد أي خدمات مدرجة في المركز حالياً</p>';
    return;
  }
  grid.innerHTML = data.services.map(s => {
    const mapping = s.inventoryMapping || [];
    const mappingText = mapping.length > 0 ? mapping.map(m => {
      const item = data.inventory.find(i => i.id === m.inventoryId);
      return item ? item.name + ' x' + m.quantity : '';
    }).filter(Boolean).join(', ') : 'بدون ربط استهلاك للمخزون';
    return '<div class="glass-card bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all"><div class="h-44 bg-stone-100 flex items-center justify-center overflow-hidden">' + (s.image ? '<img src="' + s.image + '" class="w-full h-full object-cover">' : '<i class="fas fa-concierge-bell text-stone-300 text-4xl"></i>') + '</div><div class="p-5"><h3 class="font-extrabold text-stone-800 text-sm mb-1">' + s.name + '</h3><p class="text-xs text-stone-400 font-medium mb-3 leading-relaxed">' + (s.description || '') + '</p><div class="flex items-center justify-between mb-2"><span class="text-lg font-black text-teal-600">' + Number(s.price).toLocaleString() + ' <span class="text-xs font-bold">DA</span></span>' + (s.isCupping ? '<span class="text-xs bg-amber-50 text-amber-700 font-bold border border-amber-100 px-2.5 py-1 rounded-lg">جلسة حجامة</span>' : '') + '</div>' + (s.isCupping && s.cupPrice ? '<p class="text-xs font-bold text-stone-500 mt-1">سعر الكأس الإضافي: ' + Number(s.cupPrice).toLocaleString() + ' DA</p>' : '') + '<p class="text-xs font-bold text-stone-400 border-t border-stone-50 pt-2 mt-2"><i class="fas fa-boxes ml-1"></i>المواد: ' + mappingText + '</p><div class="flex gap-2 mt-4"><button onclick="editService(\'' + s.id + '\')" class="flex-1 py-2.5 rounded-xl bg-teal-50 text-teal-700 text-xs font-bold hover:bg-teal-100 transition-all"><i class="fas fa-edit ml-1"></i>تعديل الخدمة</button><button onclick="deleteService(\'' + s.id + '\')" class="py-2.5 px-3.5 rounded-xl bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-all"><i class="fas fa-trash"></i></button></div></div></div>';
  }).join('');
}

function toggleCupPrice() {
  document.getElementById('cupPriceField').classList.toggle('hidden', !document.getElementById('serviceIsCupping').checked);
}

let mappingRowCount = 0;
function addInventoryMappingRow() {
  mappingRowCount++;
  const div = document.createElement('div');
  div.className = 'flex gap-2 items-center';
  div.id = 'mappingRow_' + mappingRowCount;
  const opts = data.inventory.map(i => '<option value="' + i.id + '">' + i.name + '</option>').join('');
  div.innerHTML = '<select class="mapping-select flex-1 px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs font-bold">' + opts + '</select><input type="number" class="mapping-qty w-20 px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-xs font-bold" placeholder="الكمية" value="1" min="1"><button onclick="this.parentElement.remove()" class="text-red-400 hover:text-red-500"><i class="fas fa-times"></i></button>';
  document.getElementById('inventoryMapping').appendChild(div);
}

function saveService() {
  const name = document.getElementById('serviceName').value.trim();
  const image = document.getElementById('serviceImageData').value;
  const price = document.getElementById('servicePrice').value;
  const desc = document.getElementById('serviceDesc').value.trim();
  const isCupping = document.getElementById('serviceIsCupping').checked;
  const cupPrice = isCupping ? document.getElementById('serviceCupPrice').value : 0;
  const editId = document.getElementById('editServiceId').value;
  if (!name || !price) { showToast('الرجاء كتابة اسم الخدمة وسعر الجلسة', 'error'); return; }
  const mapping = [];
  document.querySelectorAll('#inventoryMapping > div').forEach(row => {
    const select = row.querySelector('.mapping-select');
    const qty = row.querySelector('.mapping-qty');
    if (select && qty) mapping.push({ inventoryId: select.value, quantity: Number(qty.value) || 1 });
  });
  if (editId) {
    const idx = data.services.findIndex(s => s.id === editId);
    if (idx > -1) data.services[idx] = { ...data.services[idx], name, image, price: Number(price), description: desc, isCupping, cupPrice: Number(cupPrice), inventoryMapping: mapping };
  } else {
    data.services.push({ id: generateId(), name, image, price: Number(price), description: desc, isCupping, cupPrice: Number(cupPrice), inventoryMapping: mapping });
  }
  saveData(); renderServices(); closeModal('serviceModal');
  showToast('تم حفظ وتجهيز الخدمة العلاجية بنجاح', 'success');
  resetServiceForm();
}

function resetServiceForm() {
  document.getElementById('editServiceId').value = '';
  document.getElementById('serviceName').value = '';
  document.getElementById('serviceImageData').value = '';
  document.getElementById('serviceImagePreview').classList.add('hidden');
  document.getElementById('servicePrice').value = '';
  document.getElementById('serviceDesc').value = '';
  document.getElementById('serviceIsCupping').checked = false;
  document.getElementById('cupPriceField').classList.add('hidden');
  document.getElementById('serviceCupPrice').value = '';
  document.getElementById('inventoryMapping').innerHTML = '';
  mappingRowCount = 0;
}

function editService(id) {
  const s = data.services.find(x => x.id === id);
  if (!s) return;
  document.getElementById('serviceName').value = s.name;
  if (s.image) {
    document.getElementById('serviceImageData').value = s.image;
    document.getElementById('serviceImagePreview').classList.remove('hidden');
    document.getElementById('serviceImagePreviewImg').src = s.image;
  }
  document.getElementById('servicePrice').value = s.price;
  document.getElementById('serviceDesc').value = s.description || '';
  document.getElementById('serviceIsCupping').checked = s.isCupping || false;
  document.getElementById('cupPriceField').classList.toggle('hidden', !s.isCupping);
  document.getElementById('serviceCupPrice').value = s.cupPrice || '';
  document.getElementById('editServiceId').value = id;
  document.getElementById('inventoryMapping').innerHTML = '';
  mappingRowCount = 0;
  if (s.inventoryMapping) {
    s.inventoryMapping.forEach(m => {
      addInventoryMappingRow();
      const row = document.getElementById('mappingRow_' + mappingRowCount);
      if (row) {
        row.querySelector('.mapping-select').value = m.inventoryId;
        row.querySelector('.mapping-qty').value = m.quantity;
      }
    });
  }
  showModal('serviceModal');
}

function deleteService(id) {
  if (!confirm('هل تريد حذف هذه الخدمة بالكامل؟')) return;
  data.services = data.services.filter(s => s.id !== id);
  saveData(); renderServices();
  showToast('تم حذف الخدمة', 'info');
}

/* ====== ADMIN: BOOKINGS CONTROL CENTER ====== */
let currentAdminBookingFilter = 'all';

function filterAdminBookings(status) {
  currentAdminBookingFilter = status;
  document.querySelectorAll('.admin-filter-btn').forEach(btn => {
    btn.classList.remove('bg-teal-600', 'text-white');
    btn.classList.add('text-stone-600', 'hover:bg-stone-50');
  });
  const activeBtn = document.getElementById('filterBtn_' + status);
  if (activeBtn) {
    activeBtn.classList.remove('text-stone-600', 'hover:bg-stone-50');
    activeBtn.classList.add('bg-teal-600', 'text-white');
  }
  renderAdminBookings();
}

function renderAdminBookings() {
  const tbody = document.getElementById('adminAllBookings');
  let bookings = data.bookings;
  if (currentAdminBookingFilter !== 'all') {
    bookings = bookings.filter(b => b.status === currentAdminBookingFilter);
  }

  if (bookings.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-stone-400 py-8 font-bold">لا توجد حجوزات تطابق الفلتر الحالي</td></tr>';
    return;
  }

  const statusMap = { pending: 'قيد الانتظار', confirmed: 'مؤكدة', completed: 'مكتملة', cancelled: 'ملغاة' };
  const statusColors = { pending: 'bg-amber-50 text-amber-700 border border-amber-100', confirmed: 'bg-teal-50 text-teal-800 border border-teal-100', completed: 'bg-emerald-50 text-emerald-800 border border-emerald-100', cancelled: 'bg-red-50 text-red-700 border border-red-100' };

  tbody.innerHTML = bookings.slice().reverse().map(b => {
    const customer = data.customers.find(c => c.id === b.customerId);
    const service = data.services.find(s => s.id === b.serviceId);

    // تصفية المعالجين بناءً على جنس الزبون لضمان الربط الصارم وتطابق الجنسين
    let therapistOptions = '<option value="">اختيار تلقائي</option>';
    if (customer) {
      const matchedTherapists = data.therapists.filter(t => t.gender === customer.gender);
      therapistOptions += matchedTherapists.map(t => {
        const isSelected = t.id === b.therapistId ? 'selected' : '';
        return `<option value="${t.id}" ${isSelected}>${t.name} (${t.gender})</option>`;
      }).join('');
    }

    const therapistSelect = `<select onchange="adminChangeTherapist('${b.id}', this.value)" class="px-2 py-1.5 rounded-lg border border-stone-200 text-xs font-bold bg-white focus:border-teal-500">${therapistOptions}</select>`;

    let actionsHtml = `<button onclick="openBookingDetails('${b.id}')" class="px-3 py-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-bold transition-all ml-2" title="عرض التفاصيل الطبية"><i class="fas fa-eye ml-1"></i>التفاصيل</button>`;

    if (b.status === 'pending') {
      actionsHtml += `
        <button onclick="adminApproveBooking('${b.id}')" class="px-3 py-1.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 text-xs font-bold transition-all ml-2"><i class="fas fa-check ml-1"></i>تأكيد</button>
        <button onclick="adminCancelBooking('${b.id}')" class="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold transition-all"><i class="fas fa-times ml-1"></i>إلغاء</button>
      `;
    } else if (b.status === 'confirmed') {
      actionsHtml += `
        <button onclick="adminCancelBooking('${b.id}')" class="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold transition-all"><i class="fas fa-times ml-1"></i>إلغاء الحجز</button>
      `;
    }

    return `
      <tr>
        <td class="font-bold">${customer ? customer.name : 'غير معروف'}</td>
        <td class="font-medium">${service ? service.name : 'غير معروف'}</td>
        <td>${therapistSelect}</td>
        <td class="font-bold">${b.date} <span class="text-stone-400 mr-2 text-xs">${b.timeSlot}</span></td>
        <td><span class="px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[b.status] || 'bg-stone-100'}">${statusMap[b.status] || b.status}</span></td>
        <td class="font-black text-teal-600">${(b.finalPrice || b.servicePrice || 0).toLocaleString()} DA</td>
        <td><div class="flex">${actionsHtml}</div></td>
      </tr>
    `;
  }).join('');
}

function adminChangeTherapist(bookingId, therapistId) {
  const bIdx = data.bookings.findIndex(b => b.id === bookingId);
  if (bIdx === -1) return;
  
  data.bookings[bIdx].therapistId = therapistId || null;
  saveData();
  showToast('تم تحديث وإعادة تعيين المعالج للحجز بنجاح', 'success');
  renderAdminBookings();
  updateAdminDashboard();
}

function adminApproveBooking(bookingId) {
  const bIdx = data.bookings.findIndex(b => b.id === bookingId);
  if (bIdx === -1) return;

  data.bookings[bIdx].status = 'confirmed';
  const booking = data.bookings[bIdx];

  // إرسال إشعار فوري للمعالج في حال تعيينه
  if (booking.therapistId) {
    const customer = data.customers.find(c => c.id === booking.customerId);
    const service = data.services.find(s => s.id === booking.serviceId);
    data.notifications.push({
      id: generateId(),
      therapistId: booking.therapistId,
      message: `تم تأكيد موعد جلسة جديدة باسم الزبون: ${customer ? customer.name : 'غير معروف'} لخدمة: ${service ? service.name : 'حجامة'} في تاريخ: ${booking.date} الساعة ${booking.timeSlot}.`,
      type: 'info',
      date: new Date().toISOString(),
      read: false
    });
  }

  saveData();
  showToast('تم قبول وتأكيد الحجز، وإشعار المعالج المكلف بذلك', 'success');
  renderAdminBookings();
  updateAdminDashboard();
}

function adminCancelBooking(bookingId) {
  const bIdx = data.bookings.findIndex(b => b.id === bookingId);
  if (bIdx === -1) return;

  const reason = prompt('الرجاء إدخال سبب إلغاء هذا الموعد لإخطار الزبون والمعالج:');
  if (reason === null) return; // cancelled prompt

  data.bookings[bIdx].status = 'cancelled';
  const booking = data.bookings[bIdx];

  if (booking.therapistId) {
    const customer = data.customers.find(c => c.id === booking.customerId);
    data.notifications.push({
      id: generateId(),
      therapistId: booking.therapistId,
      message: `تم إلغاء الموعد المجدول للزبون: ${customer ? customer.name : 'غير معروف'} في تاريخ: ${booking.date}. السبب: ${reason || 'ملغي من الإدارة'}`,
      type: 'warning',
      date: new Date().toISOString(),
      read: false
    });
  }

  saveData();
  showToast('تم إلغاء الحجز بنجاح وإرسال إشعار التنبيه', 'warning');
  renderAdminBookings();
  updateAdminDashboard();
}

function openBookingDetails(bookingId) {
  const b = data.bookings.find(x => x.id === bookingId);
  if (!b) return;

  const customer = data.customers.find(c => c.id === b.customerId);
  const service = data.services.find(s => s.id === b.serviceId);
  const therapist = data.therapists.find(t => t.id === b.therapistId);
  const dateStr = new Date(b.createdAt).toLocaleDateString('ar-DZ') + ' ' + new Date(b.createdAt).toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' });

  let healthAlertHtml = '';
  if (b.chronicDiseases) {
    healthAlertHtml = `
      <div class="warning">
        <i class="fas fa-exclamation-triangle ml-2"></i>تحذير طبي هام: يعاني المريض من الأمراض/الأدوية التالية:
        <p style="font-weight:normal; margin-top:6px; font-size:13px;">${b.chronicDiseases}</p>
      </div>
    `;
  } else {
    healthAlertHtml = `
      <div style="background:#f0fdfa; border:1px solid #ccfbf1; color:#0f766e; padding:12px; border-radius:8px; font-size:13px; font-weight:bold;">
        <i class="fas fa-check-circle ml-2"></i>الحالة الطبية العامة: لا توجد أي أمراض مزمنة مصرح بها من قبل الزبون.
      </div>
    `;
  }

  let fileAttachmentHtml = '<p style="color:#999; font-size:13px; font-style:italic;">لا توجد أي ملفات أو تحاليل طبية مرفقة</p>';
  if (b.medicalTest) {
    fileAttachmentHtml = `
      <div class="mt-2 border border-stone-200 rounded-2xl overflow-hidden p-2 bg-stone-50/50">
        <p class="text-xs text-stone-500 mb-2 font-bold"><i class="fas fa-paperclip ml-1"></i>صورة التحاليل والتقارير المرفقة من الزبون:</p>
        <img src="${b.medicalTest}" class="w-full max-h-60 object-contain rounded-xl shadow-sm cursor-pointer" onclick="viewTestImage('${b.medicalTest}')" title="اضغط للتكبير">
      </div>
    `;
  }

  const container = document.getElementById('adminDetailedBookingContent');
  container.innerHTML = `
    <div class="section">
      <h2>البيانات الشخصية للزبون</h2>
      <div class="grid">
        <div>
          <div class="label">اسم الزبون الكامل</div>
          <div class="value">${customer ? customer.name : 'غير معروف'}</div>
        </div>
        <div>
          <div class="label">رقم الهاتف</div>
          <div class="value">${customer ? customer.phone : '-'}</div>
        </div>
        <div>
          <div class="label">الجنس</div>
          <div class="value">${customer ? customer.gender : '-'}</div>
        </div>
        <div>
          <div class="label">العمر المحدد</div>
          <div class="value">${b.age} سنة</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>تفاصيل الحجز والخدمة المطلوبة</h2>
      <div class="grid">
        <div>
          <div class="label">الخدمة المطلوبة</div>
          <div class="value">${service ? service.name : 'غير معروف'}</div>
        </div>
        <div>
          <div class="label">المعالج المكلف</div>
          <div class="value">${therapist ? therapist.name + ' (' + therapist.gender + ')' : 'لم يحدد بعد'}</div>
        </div>
        <div>
          <div class="label">تاريخ الموعد المحدد</div>
          <div class="value">${b.date}</div>
        </div>
        <div>
          <div class="label">التوقيت (الفترة الزمنية)</div>
          <div class="value">${b.timeSlot}</div>
        </div>
        <div>
          <div class="label">تكلفة الجلسة المقبوضة</div>
          <div class="value" style="color:#0d9488; font-size:16px;">${(b.finalPrice || b.servicePrice || 0).toLocaleString()} DA</div>
        </div>
        <div>
          <div class="label">تاريخ إنشاء الطلب</div>
          <div class="value" style="font-weight:normal; font-size:12px; color:#666;">${dateStr}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>التقييم والتحليل الطبي الأولي قبل الجلسة</h2>
      <div class="space-y-4">
        ${healthAlertHtml}
        ${fileAttachmentHtml}
      </div>
    </div>
  `;

  showModal('bookingDetailsModal');
}

/* ====== ADMIN: SETTINGS ====== */
function saveSettings() {
  data.settings.logo = document.getElementById('settingsLogoInput').value || data.settings.logo;
  data.settings.bio = document.getElementById('settingsBio').value.trim() || data.settings.bio;
  data.settings.workingHours = document.getElementById('settingsHours').value.trim() || data.settings.workingHours;
  data.settings.mapLink = document.getElementById('settingsMap').value.trim();
  data.settings.whatsapp = document.getElementById('settingsWhatsapp').value.trim();
  data.settings.facebook = document.getElementById('settingsFacebook').value.trim();
  data.settings.instagram = document.getElementById('settingsInstagram').value.trim();
  
  const newAdminUser = document.getElementById('settingsAdminUser').value.trim();
  const newAdminPass = document.getElementById('settingsAdminPass').value.trim();
  if (newAdminUser) data.settings.adminUser = newAdminUser;
  if (newAdminPass) data.settings.adminPass = newAdminPass;
  
  saveData();
  showToast('تم حفظ وتحديث إعدادات المركز بنجاح', 'success');
  renderCustomerSettings();
  populateAdminSettings();
}

function renderCustomerSettings() {
  const s = data.settings;
  const logoEl = document.getElementById('customerHeroLogo');
  if (s.logo && logoEl) {
    logoEl.innerHTML = '<img src="' + s.logo + '" class="w-full h-full object-cover">';
  }
  document.getElementById('customerHeroTitle').textContent = 'مركز الزمرد للحجامة والعناية الجسدية';
  document.getElementById('customerHeroBio').textContent = s.bio || 'رعاية متكاملة لصحتك الجسدية';
  document.getElementById('customerHours').textContent = s.workingHours || 'السبت - الخميس 09:00 - 20:00';
  if (s.mapLink) {
    document.getElementById('customerMapLink').href = s.mapLink;
  }
  if (s.whatsapp) {
    document.getElementById('customerWhatsappLink').href = 'https://wa.me/' + s.whatsapp.replace(/[^0-9]/g, '');
  }
  if (s.facebook) {
    document.getElementById('customerFacebook').href = s.facebook;
    document.getElementById('customerFacebook').classList.remove('hidden');
  }
  if (s.instagram) {
    document.getElementById('customerInstagram').href = s.instagram;
    document.getElementById('customerInstagram').classList.remove('hidden');
  }
}

/* ====== ADMIN: CUSTOMER LINK ====== */
function generateCustomerLink() {
  const url = window.location.href.split('?')[0] + '?view=customer';
  document.getElementById('customerLinkUrl').value = url;
  showModal('qrModal');
}

function copyCustomerLink() {
  const input = document.getElementById('customerLinkUrl');
  const text = input.value;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast('تم نسخ الرابط المباشر إلى الحافظة', 'success'));
  } else {
    input.select(); document.execCommand('copy');
    showToast('تم نسخ الرابط المباشر إلى الحافظة', 'success');
  }
}

/* ====== ADMIN: BACKUP ====== */
function exportBackup() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cupping-center-backup-' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
  showToast('تم تصدير نسخة البيانات الاحتياطية بنجاح', 'success');
}

function importBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.therapists && imported.services) {
        data = imported;
        saveData();
        showToast('تم استيراد كافة البيانات وإجراء التسوية بنجاح', 'success');
        if (currentUser.role === 'admin') renderAllAdmin();
        if (currentUser.role === 'therapist') renderAllTherapist();
      } else {
        showToast('هذا الملف غير صالح أو مهيكل بشكل خاطئ', 'error');
      }
    } catch(err) { showToast('حدث خطأ أثناء فك وتشفير ملف الاستيراد', 'error'); }
  };
  reader.readAsText(file);
  event.target.value = '';
}

/* ====== THERAPIST: RENDER ALL ====== */
function renderAllTherapist() {
  updateTherapistDashboard('weekly');
  renderTherapistSchedule();
  renderPatients();
  renderNotifications();
}

/* ====== THERAPIST: DASHBOARD ====== */
document.querySelectorAll('.period-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    updateTherapistDashboard(this.dataset.period);
  });
});

function updateTherapistDashboard(period) {
  const now = new Date();
  let startDate;
  if (period === 'weekly') { startDate = new Date(now); startDate.setDate(now.getDate() - 7); }
  else if (period === 'monthly') { startDate = new Date(now); startDate.setMonth(now.getMonth() - 1); }
  else { startDate = new Date(now); startDate.setFullYear(now.getFullYear() - 1); }
  const bookings = data.bookings.filter(b => b.therapistId === currentUser.id && new Date(b.createdAt || b.date) >= startDate);
  const completed = bookings.filter(b => b.status === 'completed');
  const income = completed.reduce((s, b) => s + (b.finalPrice || b.servicePrice || 0), 0);
  const commissions = completed.reduce((s, b) => s + (b.commissionAmount || 0), 0);
  const materialCost = completed.reduce((s, b) => s + (b.materialCost || 0), 0);
  const tDeductions = data.deductions.filter(d => d.therapistId === currentUser.id && new Date(d.date) >= startDate).reduce((s, d) => s + Number(d.amount), 0);
  
  // صافي الفائدة المكتسبة الخاصة بالمعالج
  const netProfit = commissions - tDeductions;
  
  document.getElementById('therapistTotalIncome').textContent = income.toLocaleString();
  document.getElementById('therapistTotalBookings').textContent = completed.length;
  document.getElementById('therapistNetProfit').textContent = netProfit.toLocaleString();
}

/* ====== THERAPIST: SCHEDULE ====== */
function renderTherapistSchedule() {
  const active = data.bookings.filter(b => b.therapistId === currentUser.id && (b.status === 'pending' || b.status === 'confirmed'));
  const completed = data.bookings.filter(b => b.therapistId === currentUser.id && b.status === 'completed');
  const activeBody = document.getElementById('therapistActiveBookings');
  const completedBody = document.getElementById('therapistCompletedBookings');
  const badge = document.getElementById('pendingBadge');

  badge.textContent = active.length;
  badge.classList.toggle('hidden', active.length === 0);

  if (active.length === 0) {
    activeBody.innerHTML = '<tr><td colspan="7" class="text-center text-stone-400 py-8 font-bold">لا توجد مواعيد نشطة مجدولة اليوم</td></tr>';
  } else {
    activeBody.innerHTML = active.map(b => {
      const customer = data.customers.find(c => c.id === b.customerId);
      const service = data.services.find(s => s.id === b.serviceId);
      
      let actionBtn = '';
      if (b.status === 'confirmed') {
        actionBtn = '<button onclick="completeBooking(\'' + b.id + '\')" class="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all"><i class="fas fa-check ml-1"></i>إكمال الخدمة والدفع</button>';
      } else {
        actionBtn = '<span class="text-xs text-amber-600 font-bold"><i class="fas fa-clock ml-1"></i>بانتظار موافقة المدير</span>';
      }

      return '<tr><td class="font-bold">' + (customer ? customer.name : 'غير معروف') + '</td><td>' + (service ? service.name : 'غير معروف') + '</td><td>' + b.date + '</td><td>' + b.timeSlot + '</td><td class="font-extrabold text-teal-600">' + (b.finalPrice || b.servicePrice || 0).toLocaleString() + ' DA</td><td>' + (b.cupsUsed || 0) + '</td><td>' + actionBtn + '</td></tr>';
    }).join('');
  }

  if (completed.length === 0) {
    completedBody.innerHTML = '<tr><td colspan="5" class="text-center text-stone-400 py-8 font-bold">لم تكتمل أي حجوزات بعد</td></tr>';
  } else {
    completedBody.innerHTML = completed.slice().reverse().map(b => {
      const customer = data.customers.find(c => c.id === b.customerId);
      const service = data.services.find(s => s.id === b.serviceId);
      const stars = b.feedback && b.feedback.rating ? b.feedback.rating : 0;
      const starHtml = '<span class="text-amber-500">' + '★'.repeat(Math.round(stars)) + '</span><span class="text-stone-200">' + '★'.repeat(5 - Math.round(stars)) + '</span>';
      return '<tr><td class="font-bold">' + (customer ? customer.name : 'غير معروف') + '</td><td>' + (service ? service.name : 'غير معروف') + '</td><td>' + b.date + '</td><td class="font-black text-teal-600">' + (b.finalPrice || b.servicePrice || 0).toLocaleString() + ' DA</td><td class="font-bold">' + (b.feedback ? starHtml : '-') + '</td></tr>';
    }).join('');
  }
}

/* ====== THERAPIST: COMPLETE BOOKING ====== */
function completeBooking(bookingId) {
  if (!confirm('تأكيد إكمال الخدمة العلاجية بنجاح واستلام الدفع؟')) return;
  const bIdx = data.bookings.findIndex(b => b.id === bookingId);
  if (bIdx === -1) return;
  const booking = data.bookings[bIdx];
  const service = data.services.find(s => s.id === booking.serviceId);
  const therapist = data.therapists.find(t => t.id === currentUser.id);

  if (!service) { showToast('الخدمة المطلوبة غير متوفرة أو تم إزالتها', 'error'); return; }

  let materialCost = 0;
  const mapping = service.inventoryMapping || [];

  // 1. التحقق الفعلي المسبق لتوفر كميات كافية لجميع المستهلكات لتجنب الخصم الجزئي الخاطئ في المخزون
  for (let m of mapping) {
    const item = data.inventory.find(i => i.id === m.inventoryId);
    if (item) {
      const isCup = item.name.includes('كوب') || item.name.includes('كؤوس') || item.name.includes('كأس') || item.name.toLowerCase().includes('cup');
      const deduction = isCup ? (m.quantity * (booking.cupsUsed || 1)) : m.quantity;
      if (item.quantity < deduction) {
        showToast('المخزون غير كافٍ لإتمام الجلسة: ' + item.name + ` (المطلوب: ${deduction}، المتوفر: ${item.quantity})`, 'error');
        return;
      }
    }
  }

  // 2. خصم الكميات من المخزون بعد التأكد التام من استيفاء جميع المتطلبات المادية
  for (let m of mapping) {
    const invIdx = data.inventory.findIndex(i => i.id === m.inventoryId);
    if (invIdx > -1) {
      const item = data.inventory[invIdx];
      const isCup = item.name.includes('كوب') || item.name.includes('كؤوس') || item.name.includes('كأس') || item.name.toLowerCase().includes('cup');
      const deduction = isCup ? (m.quantity * (booking.cupsUsed || 1)) : m.quantity;
      data.inventory[invIdx].quantity -= deduction;
      materialCost += (data.inventory[invIdx].costPrice || 0) * deduction;
    }
  }

  if (service.isCupping && service.cupPrice && (booking.cupsUsed || 0) > 0) {
    data.bookings[bIdx].finalPrice = (booking.servicePrice || service.price) + (booking.cupsUsed * service.cupPrice);
  } else {
    data.bookings[bIdx].finalPrice = booking.servicePrice || service.price;
  }

  const commissionRate = therapist ? therapist.commission / 100 : 0;
  data.bookings[bIdx].commissionAmount = (data.bookings[bIdx].finalPrice) * commissionRate;
  data.bookings[bIdx].materialCost = materialCost;
  data.bookings[bIdx].status = 'completed';
  data.bookings[bIdx].completedAt = new Date().toISOString();

  saveData();
  renderTherapistSchedule();
  updateTherapistDashboard(document.querySelector('.period-btn.active')?.dataset.period || 'weekly');
  showToast('تهانينا، تم إكمال الخدمة العلاجية وتسجيل الدفعة والمستحقات المكتسبة بنجاح', 'success');
}

/* ====== THERAPIST: PATIENTS ====== */
function renderPatients() {
  const tbody = document.getElementById('patientsTable');
  const select = document.getElementById('healthPatient');
  const myCustomers = data.customers.filter(c => {
    return data.bookings.some(b => b.customerId === c.id && b.therapistId === currentUser.id);
  });
  select.innerHTML = myCustomers.map(c => '<option value="' + c.id + '">' + c.name + ' (' + c.phone + ')</option>').join('') || '<option value="">لا يوجد مرضى حالياً</option>';

  if (myCustomers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-stone-400 py-8 font-bold">لم تقم بتسجيل أي مرضى في قائمة جلساتك المكتملة بعد</td></tr>';
  } else {
    tbody.innerHTML = myCustomers.map(c => {
      const sessions = data.bookings.filter(b => b.customerId === c.id && b.therapistId === currentUser.id);
      const lastVisit = sessions.length > 0 ? sessions.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date : '-';
      return '<tr><td class="font-bold">' + c.name + '</td><td class="font-bold">' + c.phone + '</td><td>' + sessions.length + '</td><td class="font-bold">' + lastVisit + '</td><td><button onclick="viewPatientHealth(\'' + c.id + '\')" class="text-emerald-600 hover:text-emerald-700 text-sm ml-3 font-bold" title="عرض السجل الطبي"><i class="fas fa-notes-medical ml-1"></i>السجل</button><button onclick="printPatientSummary(\'' + c.id + '\')" class="text-teal-600 hover:text-teal-700 text-sm font-bold" title="طباعة ملخص"><i class="fas fa-print ml-1"></i>طباعة الملخص</button></td></tr>';
    }).join('');
  }

  renderHealthRecords();
}

function saveHealthRecord() {
  const customerId = document.getElementById('healthPatient').value;
  if (!customerId) { showToast('الرجاء اختيار المريض أولاً', 'error'); return; }
  const sugar = document.getElementById('healthSugar').value;
  const height = document.getElementById('healthHeight').value;
  const weight = document.getElementById('healthWeight').value;
  const oxygen = document.getElementById('healthOxygen').value;
  const notes = document.getElementById('healthNotes').value.trim();
  const testData = document.getElementById('healthTestData').value;
  data.healthRecords.push({
    id: generateId(),
    customerId,
    therapistId: currentUser.id,
    date: new Date().toISOString(),
    bloodSugar: sugar ? Number(sugar) : null,
    height: height ? Number(height) : null,
    weight: weight ? Number(weight) : null,
    oxygen: oxygen ? Number(oxygen) : null,
    notes,
    medicalTest: testData || null
  });
  saveData();
  document.getElementById('healthSugar').value = '';
  document.getElementById('healthHeight').value = '';
  document.getElementById('healthWeight').value = '';
  document.getElementById('healthOxygen').value = '';
  document.getElementById('healthNotes').value = '';
  document.getElementById('healthTestData').value = '';
  document.getElementById('healthTestFile').value = '';
  renderHealthRecords();
  showToast('تم حفظ وتدوين السجل القياسي الطبي للمريض بنجاح', 'success');
}

function renderHealthRecords() {
  const container = document.getElementById('healthRecordsList');
  const records = data.healthRecords.filter(r => r.therapistId === currentUser.id).slice(-20).reverse();
  if (records.length === 0) {
    container.innerHTML = '<p class="text-stone-400 text-sm font-bold text-center py-4">لا توجد أي قياسات طبية مسجلة بعد</p>';
    return;
  }
  container.innerHTML = records.map(r => {
    const customer = data.customers.find(c => c.id === r.customerId);
    const date = new Date(r.date).toLocaleDateString('ar-DZ');
    return '<div class="border-b border-stone-50 py-4 last:border-0"><div class="flex items-center justify-between mb-2"><span class="font-bold text-stone-800 text-sm">' + (customer ? customer.name : 'غير معروف') + '</span><span class="text-xs text-stone-400 font-bold">' + date + '</span></div><div class="flex flex-wrap gap-2 text-xs font-bold">' +
      (r.bloodSugar ? '<span class="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg border border-red-100">السكر: ' + r.bloodSugar + ' mg/dL</span>' : '') +
      (r.height ? '<span class="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100">الطول: ' + r.height + ' cm</span>' : '') +
      (r.weight ? '<span class="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg border border-purple-100">الوزن: ' + r.weight + ' kg</span>' : '') +
      (r.oxygen ? '<span class="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100">الأكسجين: ' + r.oxygen + '%</span>' : '') +
      (r.notes ? '<p class="text-stone-600 w-full mt-2 font-medium leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-100"><i class="fas fa-comment-medical text-teal-600 ml-1"></i>التشخيص: ' + r.notes + '</p>' : '') +
      (r.medicalTest ? '<button onclick="viewTestImage(\'' + r.medicalTest + '\')" class="text-teal-600 hover:text-teal-700 w-full text-right mt-2 font-bold"><i class="fas fa-image ml-1"></i>اضغط هنا لعرض صورة التحاليل المرفقة</button>' : '') +
    '</div></div>';
  }).join('');
}

function viewTestImage(dataUrl) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.onclick = function() { overlay.remove(); };
  overlay.innerHTML = '<div class="modal-content max-w-lg mx-auto p-4"><img src="' + dataUrl + '" class="w-full rounded-2xl shadow-2xl border-4 border-white"></div>';
  document.body.appendChild(overlay);
}

function viewPatientHealth(customerId) {
  document.getElementById('healthPatient').value = customerId;
  document.querySelector('[data-section="patients"]').click();
}

function printPatientSummary(customerId) {
  const customer = data.customers.find(c => c.id === customerId);
  if (!customer) return;
  const sessions = data.bookings.filter(b => b.customerId === customerId && b.therapistId === currentUser.id && b.status === 'completed');
  const records = data.healthRecords.filter(r => r.customerId === customerId && r.therapistId === currentUser.id);
  const recentRecord = records.length > 0 ? records[records.length - 1] : null;
  const printWin = window.open('', '_blank');
  printWin.document.write('<html dir="rtl"><head><meta charset="UTF-8"><title>الملخص الصحي الشامل - ' + customer.name + '</title><style>body{font-family:sans-serif;padding:40px;direction:rtl;text-align:right}h1{color:#0d9488;font-size:24px;margin-bottom:4px}.sub{color:#666;font-size:14px}.section{margin:24px 0;padding:16px;background:#fcfbf9;border-radius:12px;border:1.5px solid #0d9488}.section h2{font-size:16px;margin-bottom:12px;color:#0d9488;border-bottom:1px solid #e2e8f0;padding-bottom:6px}table{width:100%;border-collapse:collapse;font-size:13px}th,td{padding:8px 12px;border-bottom:1px solid #e2e8f0;text-align:right}th{background:#f1f5f9;font-weight:600}.label{color:#666;font-size:12px}.value{font-weight:600;font-size:14px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.item{padding:8px 12px;background:white;border-radius:8px;border:1px solid #eee}</style></head><body><h1>مركز الزمرد الاستشفائي</h1><p class="sub">ملخص صحي شامل للمريض</p><hr style="margin:16px 0;border:none;border-top:1px dashed #0d9488"><div class="section"><h2>البيانات الشخصية والتعريفية</h2><div class="grid"><div><div class="label">اسم المريض</div><div class="value">' + customer.name + '</div></div><div><div class="label">رقم الهاتف الجوال</div><div class="value">' + (customer.phone || '-') + '</div></div></div></div>' +
    (recentRecord ? '<div class="section"><h2>آخر القياسات الحيوية المدونة</h2><div class="grid">' +
      (recentRecord.bloodSugar ? '<div class="item"><div class="label">مستوى السكر في الدم</div><div class="value">' + recentRecord.bloodSugar + ' mg/dL</div></div>' : '') +
      (recentRecord.height ? '<div class="item"><div class="label">الطول الحالي</div><div class="value">' + recentRecord.height + ' cm</div></div>' : '') +
      (recentRecord.weight ? '<div class="item"><div class="label">الوزن الحالي</div><div class="value">' + recentRecord.weight + ' kg</div></div>' : '') +
      (recentRecord.oxygen ? '<div class="item"><div class="label">معدل الأكسجين في الدم</div><div class="value">' + recentRecord.oxygen + '%</div></div>' : '') +
    '</div></div>' : '') +
    '<div class="section"><h2>سجل الجلسات السابقة المكتملة</h2><table><tr><th>تاريخ الجلسة</th><th>الخدمة العلاجية</th><th>القيمة المالية</th></tr>' +
    sessions.map(s => '<tr><td>' + s.date + '</td><td>' + (data.services.find(x => x.id === s.serviceId)?.name || '-') + '</td><td>' + (s.finalPrice || 0).toLocaleString() + ' DA</td></tr>').join('') +
    '</table></div></body></html>');
  printWin.document.close();
  printWin.print();
}

/* ====== THERAPIST: NOTIFICATIONS ====== */
function renderNotifications() {
  const container = document.getElementById('notificationsList');
  const badge = document.getElementById('notifBadge');
  const notifs = data.notifications.filter(n => n.therapistId === currentUser.id).slice(-30).reverse();
  const unread = notifs.filter(n => !n.read).length;
  badge.textContent = unread;
  badge.classList.toggle('hidden', unread === 0);
  if (notifs.length === 0) {
    container.innerHTML = '<div class="text-center text-stone-400 py-12"><i class="fas fa-bell text-4xl mb-3 text-stone-200"></i><p class="text-sm font-bold">صندوق الإشعارات فارغ تماماً</p></div>';
    return;
  }
  const icons = { deduction: 'fa-minus-circle text-red-500', info: 'fa-info-circle text-teal-600', warning: 'fa-exclamation-triangle text-amber-500' };
  container.innerHTML = notifs.map(n => {
    const date = new Date(n.date).toLocaleDateString('ar-DZ') + ' ' + new Date(n.date).toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' });
    return '<div class="notification-item glass-card p-4 rounded-xl ' + (n.read ? 'opacity-60' : '') + '"><div class="flex items-start gap-3"><i class="fas ' + (icons[n.type] || icons.info) + ' mt-1"></i><div class="flex-1"><p class="text-sm text-stone-700 font-bold">' + n.message + '</p><p class="text-xs text-stone-400 font-bold mt-1">' + date + '</p></div></div></div>';
  }).join('');
}

function clearNotifications() {
  data.notifications.filter(n => n.therapistId === currentUser.id).forEach(n => n.read = true);
  saveData();
  renderNotifications();
  showToast('تم تحديد جميع الإشعارات كمقروءة بنجاح', 'info');
}

/* ====== CUSTOMER: SERVICES ====== */
function renderCustomerServices() {
  const grid = document.getElementById('customerServicesGrid');
  if (data.services.length === 0) {
    grid.innerHTML = '<p class="text-stone-400 text-sm font-bold col-span-full text-center py-12">لا توجد خدمات علاجية معلنة حالياً في المركز</p>';
    return;
  }
  grid.innerHTML = data.services.map(s => {
    return '<div class="service-card glass-card bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all" onclick="startBooking(\'' + s.id + '\')"><div class="h-44 bg-stone-100 flex items-center justify-center overflow-hidden">' + (s.image ? '<img src="' + s.image + '" class="w-full h-full object-cover">' : '<i class="fas fa-concierge-bell text-stone-300 text-5xl"></i>') + '</div><div class="p-6"><h3 class="font-extrabold text-stone-800 text-sm mb-1">' + s.name + '</h3><p class="text-xs text-stone-400 font-medium mb-4 line-clamp-2 leading-relaxed">' + (s.description || '') + '</p><div class="flex items-center justify-between"><span class="text-xl font-black text-teal-600">' + Number(s.price).toLocaleString() + ' <span class="text-sm font-bold">DA</span></span>' + (s.isCupping ? '<span class="text-xs bg-amber-50 text-amber-700 font-bold border border-amber-100 px-2.5 py-1 rounded-lg">جلسة حجامة</span>' : '') + '</div></div></div>';
  }).join('');
}

/* ====== CUSTOMER: AUTH ====== */
let currentCustomer = null;

function showCustomerAuth() {
  document.getElementById('customerAuthError').classList.add('hidden');
  showModal('customerAuthModal');
}

document.querySelectorAll('.customer-auth-toggle').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.customer-auth-toggle').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const form = this.dataset.auth;
    document.getElementById('customerLoginForm').classList.toggle('hidden', form !== 'login');
    document.getElementById('customerRegisterForm').classList.toggle('hidden', form !== 'register');
    document.getElementById('customerAuthTitle').textContent = form === 'login' ? 'تسجيل دخول الزبون' : 'إنشاء حساب زبون جديد';
  });
});

function customerRegister() {
  const name = document.getElementById('custRegName').value.trim();
  const phoneCode = document.getElementById('custPhoneCode').value;
  const phone = document.getElementById('custRegPhone').value.trim();
  const gender = document.getElementById('custRegGender').value;
  const username = document.getElementById('custRegUser').value.trim();
  const password = document.getElementById('custRegPass').value.trim();
  if (!name || !phone || !username || !password) { showToast('الرجاء تعبئة جميع المعلومات المطلوبة للملف', 'error'); return; }
  if (data.customers.some(c => c.username === username)) { showToast('اسم المستخدم هذا محجوز مسبقاً، يرجى تغييره', 'error'); return; }
  data.customers.push({ id: generateId(), name, phone: phoneCode + phone, gender, username, password });
  saveData();
  showToast('تهانينا، تم إنشاء ملف الزبون الخاص بكم بنجاح', 'success');
  currentCustomer = data.customers[data.customers.length - 1];
  afterCustomerLogin();
  closeModal('customerAuthModal');
}

function customerLogin() {
  const user = document.getElementById('custLoginUser').value.trim();
  const pass = document.getElementById('custLoginPass').value.trim();
  const customer = data.customers.find(c => c.username === user && c.password === pass);
  if (!customer) { showToast('اسم المستخدم أو كلمة المرور غير صحيحة', 'error'); return; }
  currentCustomer = customer;
  afterCustomerLogin();
  closeModal('customerAuthModal');
}

function afterCustomerLogin() {
  document.getElementById('customerAuthBtn').classList.add('hidden');
  document.getElementById('customerDashboardBtn').classList.remove('hidden');
  document.getElementById('customerLogoutBtn').classList.remove('hidden');
  showCustomerDashboard();
  showToast('مرحباً بك مجدداً يا ' + currentCustomer.name, 'success');
}

function customerLogout() {
  currentCustomer = null;
  document.getElementById('customerAuthBtn').classList.remove('hidden');
  document.getElementById('customerDashboardBtn').classList.add('hidden');
  document.getElementById('customerLogoutBtn').classList.add('hidden');
  document.getElementById('customerDashboardSection').classList.add('hidden');
  showToast('تم تسجيل الخروج بنجاح من حسابك الشخصي', 'info');
}

function showCustomerDashboard() {
  if (!currentCustomer) { showCustomerAuth(); return; }
  document.getElementById('customerDashboardSection').classList.remove('hidden');
  renderCustomerBookings();
  renderCustomerFeedbackForm();
}

/* ====== CUSTOMER: BOOKING FLOW ====== */
let bookingData = { serviceId: null, step: 1 };

function startBooking(serviceId) {
  if (!currentCustomer) { showCustomerAuth(); return; }
  const service = data.services.find(s => s.id === serviceId);
  if (!service) return;
  bookingData = { serviceId, step: 1 };
  document.getElementById('bookingServiceName').textContent = service.name;
  document.getElementById('bookingServiceDesc').textContent = service.description || '';
  document.getElementById('bookingServicePrice').textContent = Number(service.price).toLocaleString();
  document.getElementById('bookingCupsSection').classList.toggle('hidden', !service.isCupping);
  document.getElementById('bookingCupsCount').value = 0;
  renderBookingStep();
  showModal('bookingModal');
}

function renderBookingStep() {
  document.getElementById('bookingStep1').classList.toggle('hidden', bookingData.step !== 1);
  document.getElementById('bookingStep2').classList.toggle('hidden', bookingData.step !== 2);
  document.getElementById('bookingStep3').classList.toggle('hidden', bookingData.step !== 3);
  document.getElementById('step1Badge').className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ' + (bookingData.step >= 1 ? 'bg-teal-600 text-white' : 'bg-stone-200 text-stone-500');
  document.getElementById('step2Badge').className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ' + (bookingData.step >= 2 ? 'bg-teal-600 text-white' : 'bg-stone-200 text-stone-500');
  document.getElementById('step3Badge').className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ' + (bookingData.step >= 3 ? 'bg-teal-600 text-white' : 'bg-stone-200 text-stone-500');
  document.getElementById('stepLine1').className = 'w-8 h-0.5 ' + (bookingData.step >= 2 ? 'bg-teal-600' : 'bg-stone-200');
  document.getElementById('stepLine2').className = 'w-8 h-0.5 ' + (bookingData.step >= 3 ? 'bg-teal-600' : 'bg-stone-200');

  if (bookingData.step === 3) {
    const service = data.services.find(s => s.id === bookingData.serviceId);
    const therapistSelect = document.getElementById('bookingTherapist');
    therapistSelect.innerHTML = '<option value="">اختيار معالج تلقائي</option>';
    
    let filtered = data.therapists;
    // تطبيق الفلتر الصارم بناءً على جنس المريض لضمان الخصوصية
    if (currentCustomer && currentCustomer.gender) {
      filtered = data.therapists.filter(t => t.gender === currentCustomer.gender);
    }
    
    if (filtered.length === 0) {
      therapistSelect.innerHTML = '<option value="" disabled>عذراً، لا يوجد معالجون متوفرون من نفس الجنس حالياً</option>';
    } else {
      filtered.forEach(t => {
        const ratingText = t.rating ? ` (${'★'.repeat(Math.round(t.rating))})` : '';
        therapistSelect.innerHTML += '<option value="' + t.id + '">' + t.name + ratingText + '</option>';
      });
    }
    updateAvailableTimeSlots();
  }
}

function bookingNext() {
  if (bookingData.step === 1) { bookingData.step = 2; renderBookingStep(); }
  else if (bookingData.step === 2) { bookingData.step = 3; renderBookingStep(); }
}

function initBookingTimeSlots() {
  const select = document.getElementById('bookingTime');
  select.innerHTML = '';
  const slots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  slots.forEach(s => { select.innerHTML += '<option value="' + s + '">' + s + '</option>'; });
}

function updateAvailableTimeSlots() {
  const date = document.getElementById('bookingDate').value;
  const therapistId = document.getElementById('bookingTherapist').value;
  if (!date) return;
  const select = document.getElementById('bookingTime');
  const slots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  select.innerHTML = '';
  slots.forEach(slot => {
    // تعارض الحجز يتم التحقق منه فقط في المواعيد المؤكدة أو المعلقة للمعالج المكلف
    const conflict = data.bookings.some(b => b.date === date && b.timeSlot === slot && b.therapistId === therapistId && b.status !== 'cancelled' && b.status !== 'completed');
    const opt = document.createElement('option');
    opt.value = slot;
    opt.textContent = slot + (conflict ? ' (محجوز وممتلئ)' : '');
    opt.disabled = conflict;
    if (conflict) opt.className = 'text-stone-300 font-bold';
    select.appendChild(opt);
  });
}

document.getElementById('bookingDate').addEventListener('change', updateAvailableTimeSlots);
document.getElementById('bookingTherapist').addEventListener('change', updateAvailableTimeSlots);

function confirmBooking() {
  const age = document.getElementById('bookingAge').value;
  const date = document.getElementById('bookingDate').value;
  const timeSlot = document.getElementById('bookingTime').value;
  const therapistId = document.getElementById('bookingTherapist').value;
  const chronic = document.getElementById('bookingChronic').value;
  const chronicDesc = document.getElementById('bookingChronicDesc').value.trim();
  const testData = document.getElementById('bookingTestData').value;
  const disclaimer = document.getElementById('bookingDisclaimer').checked;
  const cupsUsed = document.getElementById('bookingCupsCount').value || 0;

  if (!age || !date || !timeSlot) { showToast('الرجاء تعبئة بيانات العمر وتاريخ الجلسة وتوقيتها', 'error'); return; }
  if (!disclaimer) { showToast('الرجاء الموافقة والإقرار بالمسؤولية الطبية لإكمال حجز الجلسة', 'warning'); return; }

  const service = data.services.find(s => s.id === bookingData.serviceId);
  if (!service) return;

  // الربط التلقائي للمعالج المناسب حسب الجنس المتطابق في حال عدم الاختيار
  let finalTherapistId = therapistId;
  if (!finalTherapistId) {
    const available = data.therapists.filter(t => {
      const genderMatch = currentCustomer ? t.gender === currentCustomer.gender : true;
      const noConflict = !data.bookings.some(b => b.date === date && b.timeSlot === timeSlot && b.therapistId === t.id && b.status !== 'cancelled' && b.status !== 'completed');
      return genderMatch && noConflict;
    });
    if (available.length > 0) finalTherapistId = available[0].id;
  }

  if (finalTherapistId) {
    const conflict = data.bookings.some(b => b.date === date && b.timeSlot === timeSlot && b.therapistId === finalTherapistId && b.status !== 'cancelled' && b.status !== 'completed');
    if (conflict) { showToast('هذا التوقيت محجوز مع نفس المعالج مسبقاً، يرجى اختيار فترة زمنية أخرى', 'error'); return; }
  }

  let finalPrice = service.price;
  if (service.isCupping && service.cupPrice && cupsUsed > 0) {
    finalPrice = service.price + (Number(cupsUsed) * service.cupPrice);
  }

  data.bookings.push({
    id: generateId(),
    customerId: currentCustomer.id,
    serviceId: bookingData.serviceId,
    therapistId: finalTherapistId || null,
    servicePrice: service.price,
    finalPrice: finalPrice,
    cupsUsed: Number(cupsUsed) || 0,
    date,
    timeSlot,
    age: Number(age),
    chronicDiseases: chronic === 'نعم' ? chronicDesc : null,
    medicalTest: testData || null,
    status: 'pending',
    createdAt: new Date().toISOString(),
    completedAt: null,
    commissionAmount: 0,
    materialCost: 0,
    feedback: null
  });

  saveData();
  closeModal('bookingModal');
  showToast('تم تقديم طلب حجز الموعد بنجاح! في انتظار موافقة المدير الطبية والمالية.', 'success');
  showCustomerDashboard();
}

/* ====== CUSTOMER: MY DASHBOARD RENDER ====== */
function renderCustomerBookings() {
  const container = document.getElementById('customerMyBookings');
  if (!container) return;
  const myBookings = data.bookings.filter(b => b.customerId === currentCustomer.id).slice().reverse();
  if (myBookings.length === 0) {
    container.innerHTML = '<p class="text-stone-400 text-sm font-bold text-center py-8">لا توجد لديك حجوزات في هذا الحساب حالياً</p>';
    return;
  }
  const statusMap = { pending: 'قيد الانتظار', confirmed: 'مؤكدة', completed: 'مكتملة', cancelled: 'ملغاة' };
  const statusColors = { pending: 'bg-amber-50 text-amber-700 border border-amber-100', confirmed: 'bg-teal-50 text-teal-700 border border-teal-100', completed: 'bg-emerald-50 text-emerald-800 border border-emerald-100', cancelled: 'bg-red-50 text-red-700 border border-red-100' };
  container.innerHTML = myBookings.map(b => {
    const service = data.services.find(s => s.id === b.serviceId);
    const therapist = data.therapists.find(t => t.id === b.therapistId);
    
    let cancelBtn = '';
    if (b.status === 'pending' || b.status === 'confirmed') {
      cancelBtn = `<button onclick="customerCancelBooking('${b.id}')" class="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-2xs font-bold transition-all ml-2"><i class="fas fa-times ml-1"></i>إلغاء الموعد</button>`;
    }
    
    return '<div class="border-b border-stone-50 py-4 last:border-0"><div class="flex items-center justify-between"><div><span class="font-extrabold text-stone-800 text-sm">' + (service ? service.name : '-') + '</span><span class="text-xs text-stone-400 font-bold mr-3">' + b.date + ' - ' + b.timeSlot + '</span></div><div><span class="px-2.5 py-1 rounded-full text-xs font-bold ' + (statusColors[b.status] || 'bg-stone-100') + '">' + (statusMap[b.status] || b.status) + '</span></div></div><div class="flex items-center justify-between mt-2"><span class="text-xs text-stone-400 font-bold">' + (therapist ? 'المعالج المكلف بالجلسة: ' + therapist.name : 'بانتظار تعيين المعالج الإداري') + '</span><div class="flex items-center gap-3">' + cancelBtn + '<span class="text-sm font-black text-teal-600">' + (b.finalPrice || 0).toLocaleString() + ' DA</span></div></div></div>';
  }).join('');
}

function customerCancelBooking(bookingId) {
  if (!confirm('هل أنت متأكد من رغبتك في إلغاء هذا الموعد؟')) return;
  const bIdx = data.bookings.findIndex(b => b.id === bookingId);
  if (bIdx === -1) return;
  
  data.bookings[bIdx].status = 'cancelled';
  const booking = data.bookings[bIdx];
  
  if (booking.therapistId) {
    data.notifications.push({
      id: generateId(),
      therapistId: booking.therapistId,
      message: `قام الزبون ${currentCustomer.name} بإلغاء موعده المقرّر بتاريخ ${booking.date} الساعة ${booking.timeSlot}.`,
      type: 'warning',
      date: new Date().toISOString(),
      read: false
    });
  }
  
  saveData();
  showToast('تم إلغاء الحجز بنجاح', 'info');
  renderCustomerBookings();
}

function renderCustomerFeedbackForm() {
  const container = document.getElementById('customerFeedbackSection');
  const unrated = data.bookings.filter(b => b.customerId === currentCustomer.id && b.status === 'completed' && !b.feedback);
  if (unrated.length === 0) {
    container.innerHTML = '<div class="text-center text-stone-400 py-8"><i class="fas fa-star text-3xl mb-2 text-stone-200"></i><p class="text-sm font-bold">لا توجد جلسات علاجية مكتملة تحتاج لتقييم</p></div>';
    return;
  }
  container.innerHTML = unrated.slice(0, 3).map(b => {
    const service = data.services.find(s => s.id === b.serviceId);
    return '<div class="border-b border-stone-50 py-4 last:border-0"><div class="flex items-center justify-between mb-2"><span class="text-sm font-extrabold text-stone-800">' + (service ? service.name : '-') + '</span><span class="text-xs text-stone-400 font-bold">' + b.date + '</span></div><div class="star-rating flex gap-1 text-xl mb-3" data-booking="' + b.id + '">' + [1,2,3,4,5].map(n => '<i class="far fa-star text-stone-300 cursor-pointer hover:text-amber-500" data-rating="' + n + '" onclick="setRating(\'' + b.id + '\', ' + n + ')"></i>').join('') + '</div><textarea placeholder="تفضل بكتابة تعليقك أو أي ملاحظات..." class="feedback-comment w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-xs font-bold outline-none focus:border-amber-500" rows="2" data-booking="' + b.id + '"></textarea><button onclick="submitFeedback(\'' + b.id + '\')" class="mt-3 w-full py-2.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-all">إرسال التقييم المباشر</button></div>';
  }).join('');
}

function setRating(bookingId, rating) {
  const stars = document.querySelectorAll('.star-rating[data-booking="' + bookingId + '"] i');
  stars.forEach((s, i) => {
    s.className = (i < rating ? 'fas fa-star text-amber-500' : 'far fa-star text-stone-300') + ' cursor-pointer hover:text-amber-500';
    s.setAttribute('onclick', 'setRating(\'' + bookingId + '\', ' + (i + 1) + ')');
  });
  stars[0].parentElement.dataset.selected = rating;
}

function submitFeedback(bookingId) {
  const bIdx = data.bookings.findIndex(b => b.id === bookingId);
  if (bIdx === -1) return;
  const starContainer = document.querySelector('.star-rating[data-booking="' + bookingId + '"]');
  const rating = parseInt(starContainer?.dataset?.selected) || 0;
  const comment = document.querySelector('.feedback-comment[data-booking="' + bookingId + '"]')?.value || '';
  if (!rating) { showToast('الرجاء تلوين النجوم لتحديد التقييم المالي والمهني', 'warning'); return; }
  
  data.bookings[bIdx].feedback = { rating, comment, date: new Date().toISOString() };
  const booking = data.bookings[bIdx];
  
  if (booking.therapistId) {
    const therapistBookings = data.bookings.filter(b => b.therapistId === booking.therapistId && b.feedback && b.feedback.rating);
    const avgRating = therapistBookings.reduce((s, b) => s + b.feedback.rating, 0) / therapistBookings.length;
    const tIdx = data.therapists.findIndex(t => t.id === booking.therapistId);
    if (tIdx > -1) data.therapists[tIdx].rating = avgRating;
  }
  
  saveData();
  renderCustomerFeedbackForm();
  renderTherapists();
  showToast('شكراً جزيلاً لتقييمك لجلسات مركز الزمرد الاستشفائي!', 'success');
}

/* ====== ADMIN: CUSTOMERS MANAGEMENT ====== */
function renderAdminCustomers() {
  const tbody = document.getElementById('adminCustomersTable');
  if (!tbody) return;
  const searchVal = document.getElementById('adminCustomersSearch').value.toLowerCase().trim();
  
  let filtered = data.customers || [];
  if (searchVal) {
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(searchVal) || 
      c.phone.includes(searchVal) || 
      c.username.toLowerCase().includes(searchVal)
    );
  }
  
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-stone-400 py-8 font-bold">لا يوجد زبائن مسجلين حالياً يطابقون البحث</td></tr>';
    return;
  }
  
  tbody.innerHTML = filtered.map(c => {
    const cBookings = data.bookings.filter(b => b.customerId === c.id);
    return `
      <tr>
        <td class="font-bold">${c.name}</td>
        <td class="font-bold">${c.phone}</td>
        <td>${c.gender}</td>
        <td>${c.username}</td>
        <td class="font-bold">${cBookings.length} جلسات</td>
        <td>
          <div class="flex gap-2 justify-end">
            <button onclick="adminViewCustomerHistory('${c.id}')" class="text-teal-600 hover:text-teal-700 text-sm font-bold" title="عرض السجل التاريخي"><i class="fas fa-history ml-1"></i>الملف</button>
            <button onclick="printAdminCustomerSummary('${c.id}')" class="text-emerald-600 hover:text-emerald-700 text-sm font-bold" title="طباعة تقرير شامل"><i class="fas fa-print ml-1"></i>طباعة</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function adminViewCustomerHistory(customerId) {
  const customer = data.customers.find(c => c.id === customerId);
  if (!customer) return;
  
  const bookings = data.bookings.filter(b => b.customerId === customerId);
  const records = data.healthRecords.filter(r => r.customerId === customerId);
  
  let recordsHtml = '';
  if (records.length === 0) {
    recordsHtml = '<p class="text-stone-400 text-sm font-bold text-center py-4">لا توجد قياسات حيوية مدونة</p>';
  } else {
    recordsHtml = records.map(r => {
      const dateStr = new Date(r.date).toLocaleDateString('ar-DZ');
      const therapist = data.therapists.find(t => t.id === r.therapistId);
      return `
        <div class="border border-stone-100 rounded-2xl p-4 bg-stone-50/50 mb-3 text-xs">
          <div class="flex justify-between mb-2 font-bold text-stone-500 font-cairo">
            <span>التاريخ: ${dateStr}</span>
            <span>بواسطة المعالج: ${therapist ? therapist.name : 'غير معروف'}</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2 font-bold font-cairo">
            ${r.bloodSugar ? `<span class="bg-red-50 text-red-700 p-2 rounded-lg text-center font-bold">السكر: ${r.bloodSugar} mg/dL</span>` : ''}
            ${r.height ? `<span class="bg-blue-50 text-blue-700 p-2 rounded-lg text-center font-bold">الطول: ${r.height} cm</span>` : ''}
            ${r.weight ? `<span class="bg-purple-50 text-purple-700 p-2 rounded-lg text-center font-bold">الوزن: ${r.weight} kg</span>` : ''}
            ${r.oxygen ? `<span class="bg-emerald-50 text-emerald-700 p-2 rounded-lg text-center font-bold">الأكسجين: ${r.oxygen}%</span>` : ''}
          </div>
          ${r.notes ? `<p class="font-medium text-stone-700 bg-white p-2.5 rounded-xl border border-stone-100 mt-2"><i class="fas fa-comment-medical text-teal-600 ml-1"></i>التشخيص: ${r.notes}</p>` : ''}
        </div>
      `;
    }).join('');
  }
  
  let bookingsHtml = '';
  if (bookings.length === 0) {
    bookingsHtml = '<p class="text-stone-400 text-sm font-bold text-center py-4">لا توجد زيارات أو حجوزات مسجلة</p>';
  } else {
    const statusMap = { pending: 'قيد الانتظار', confirmed: 'مؤكدة', completed: 'مكتملة', cancelled: 'ملغاة' };
    const statusColors = { pending: 'bg-amber-100 text-amber-700', confirmed: 'bg-teal-100 text-teal-800', completed: 'bg-emerald-100 text-emerald-800', cancelled: 'bg-red-100 text-red-700' };
    bookingsHtml = `
      <table class="w-full text-xs">
        <thead>
          <tr class="text-stone-500 border-b border-stone-100">
            <th class="text-right pb-2">الخدمة</th>
            <th class="text-right pb-2">التاريخ</th>
            <th class="text-right pb-2">التوقيت</th>
            <th class="text-right pb-2">المعالج</th>
            <th class="text-right pb-2">الحالة</th>
            <th class="text-right pb-2">المبلغ</th>
          </tr>
        </thead>
        <tbody>
          ${bookings.map(b => {
            const service = data.services.find(s => s.id === b.serviceId);
            const therapist = data.therapists.find(t => t.id === b.therapistId);
            return `
              <tr>
                <td class="font-bold">${service ? service.name : 'غير معروف'}</td>
                <td>${b.date}</td>
                <td>${b.timeSlot}</td>
                <td>${therapist ? therapist.name : 'تلقائي / لم يحدد'}</td>
                <td><span class="px-2 py-0.5 rounded-lg font-bold text-2xs ${statusColors[b.status]}">${statusMap[b.status]}</span></td>
                <td class="font-black text-teal-600">${(b.finalPrice || b.servicePrice || 0).toLocaleString()} DA</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  }
  
  const container = document.getElementById('adminCustomerHistoryContent');
  if (container) {
    container.innerHTML = `
      <div class="bg-teal-50 border border-teal-100 rounded-3xl p-5 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span class="text-stone-400 text-xs font-bold block">اسم الزبون</span>
            <span class="text-stone-800 font-extrabold text-sm">${customer.name}</span>
          </div>
          <div>
            <span class="text-stone-400 text-xs font-bold block">رقم الهاتف</span>
            <span class="text-stone-800 font-extrabold text-sm">${customer.phone}</span>
          </div>
          <div>
            <span class="text-stone-400 text-xs font-bold block">الجنس</span>
            <span class="text-stone-800 font-extrabold text-sm">${customer.gender}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 class="font-extrabold text-stone-800 text-sm mb-3"><i class="fas fa-heartbeat text-teal-600 ml-2"></i>القياسات الحيوية والتشخيصات السابقة</h4>
        ${recordsHtml}
      </div>
      
      <div class="mt-6">
        <h4 class="font-extrabold text-stone-800 text-sm mb-3"><i class="fas fa-calendar-alt text-teal-600 ml-2"></i>سجل الزيارات والخدمات المطلوبة</h4>
        <div class="overflow-x-auto">
          ${bookingsHtml}
        </div>
      </div>
    `;
  }
  
  const prtBtn = document.getElementById('historyPrintBtn');
  if (prtBtn) {
    prtBtn.onclick = function() {
      printAdminCustomerSummary(customerId);
    };
  }
  
  showModal('customerHistoryModal');
}

function printAdminCustomerSummary(customerId) {
  const customer = data.customers.find(c => c.id === customerId);
  if (!customer) return;
  const sessions = data.bookings.filter(b => b.customerId === customerId);
  const records = data.healthRecords.filter(r => r.customerId === customerId);
  const printWin = window.open('', '_blank');
  
  const recordsRows = records.map(r => {
    const therapist = data.therapists.find(t => t.id === r.therapistId);
    return `
      <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 8px;">
        <strong>التاريخ:</strong> ${new Date(r.date).toLocaleDateString('ar-DZ')} | 
        <strong>المعالج:</strong> ${therapist ? therapist.name : 'غير معروف'} <br>
        <strong>القياسات:</strong> 
        ${r.bloodSugar ? `السكر: ${r.bloodSugar} mg/dL | ` : ''}
        ${r.height ? `الطول: ${r.height} cm | ` : ''}
        ${r.weight ? `الوزن: ${r.weight} kg | ` : ''}
        ${r.oxygen ? `الأكسجين: ${r.oxygen}%` : ''} <br>
        <strong>التشخيص والملاحظات:</strong> ${r.notes || 'لا يوجد'}
      </div>
    `;
  }).join('');

  const statusMap = { pending: 'قيد الانتظار', confirmed: 'مؤكدة', completed: 'مكتملة', cancelled: 'ملغاة' };

  const sessionsRows = sessions.map(s => {
    const service = data.services.find(x => x.id === s.serviceId);
    const therapist = data.therapists.find(t => t.id === s.therapistId);
    return `
      <tr>
        <td>${s.date}</td>
        <td>${service ? service.name : '-'}</td>
        <td>${therapist ? therapist.name : '-'}</td>
        <td>${statusMap[s.status] || s.status}</td>
        <td>${(s.finalPrice || 0).toLocaleString()} DA</td>
      </tr>
    `;
  }).join('');

  printWin.document.write(`
    <html dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>الملف الصحي الشامل للزبون - ${customer.name}</title>
      <style>
        body { font-family: 'Cairo', sans-serif; padding: 40px; direction: rtl; text-align: right; background: #fff; color: #000; }
        h1 { color: #0d9488; font-size: 24px; margin-bottom: 4px; }
        .sub { color: #666; font-size: 14px; }
        .section { margin: 24px 0; padding: 16px; background: #fff; border-radius: 12px; border: 1.5px solid #0d9488; }
        .section h2 { font-size: 16px; margin-bottom: 12px; color: #0d9488; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 0; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px; }
        th, td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; text-align: right; }
        th { background: #f1f5f9; font-weight: 600; }
        .label { color: #666; font-size: 12px; }
        .value { font-weight: 600; font-size: 14px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        .item { padding: 8px 12px; background: white; border-radius: 8px; border: 1px solid #eee; }
      </style>
    </head>
    <body>
      <h1>مركز الزمرد الاستشفائي للحجامة والعناية الجسدية</h1>
      <p class="sub">الملف الصحي التاريخي والتقرير الطبي الشامل للزبون</p>
      <hr style="margin: 16px 0; border: none; border-top: 1.5px dashed #0d9488;">
      
      <div class="section">
        <h2>البيانات التعريفية والاتصال</h2>
        <div class="grid">
          <div class="item"><div class="label">اسم الزبون</div><div class="value">${customer.name}</div></div>
          <div class="item"><div class="label">رقم الهاتف</div><div class="value">${customer.phone}</div></div>
          <div class="item"><div class="label">الجنس</div><div class="value">${customer.gender}</div></div>
        </div>
      </div>
      
      <div class="section">
        <h2>القياسات الحيوية والتشخيصات الطبية السابقة</h2>
        ${recordsRows || '<p style="color:#888; font-style:italic;">لا توجد قياسات مسجلة</p>'}
      </div>
      
      <div class="section">
        <h2>سجل الحجوزات والزيارات للعيادة</h2>
        <table>
          <thead>
            <tr>
              <th>تاريخ الموعد</th>
              <th>الخدمة العلاجية</th>
              <th>المعالج المكلف</th>
              <th>حالة الحجز</th>
              <th>التكلفة الإجمالية</th>
            </tr>
          </thead>
          <tbody>
            ${sessionsRows || '<tr><td colspan="5" style="text-align:center;">لا توجد جلسات مسجلة</td></tr>'}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `);
  printWin.document.close();
  printWin.print();
}

function populateAdminSettings() {
  const s = data.settings;
  if (!s) return;
  document.getElementById('settingsBio').value = s.bio || '';
  document.getElementById('settingsHours').value = s.workingHours || '';
  document.getElementById('settingsMap').value = s.mapLink || '';
  document.getElementById('settingsWhatsapp').value = s.whatsapp || '';
  document.getElementById('settingsFacebook').value = s.facebook || '';
  document.getElementById('settingsInstagram').value = s.instagram || '';
  document.getElementById('settingsLogoInput').value = s.logo || '';
  const preview = document.getElementById('logoPreview');
  if (s.logo && preview) {
    preview.innerHTML = '<img src="' + s.logo + '" class="w-full h-full object-cover">';
  } else if (preview) {
    preview.innerHTML = '<i class="fas fa-image text-stone-400"></i>';
  }
  
  // بيانات المدير
  document.getElementById('settingsAdminUser').value = s.adminUser || 'admin';
  document.getElementById('settingsAdminPass').value = s.adminPass || 'admin123';

  // Supabase connection status
  updateSupabaseStatusUI();
}

function updateSupabaseStatusUI() {
  const config = getSupabaseConfig();
  const status = document.getElementById('supabaseStatus');
  const urlField = document.getElementById('supabaseUrl');
  const keyField = document.getElementById('supabaseKey');
  if (!status) return;
  if (config) {
    if (urlField) urlField.value = config.url;
    if (keyField) keyField.value = config.anonKey;
    if (supabaseConnected) {
      status.className = 'text-xs text-emerald-600 px-3 py-2 rounded-lg bg-emerald-50';
      status.innerHTML = '<i class="fas fa-check-circle ml-1"></i>✅ متصل بـ Supabase';
    } else {
      status.className = 'text-xs text-amber-600 px-3 py-2 rounded-lg bg-amber-50';
      status.innerHTML = '<i class="fas fa-exclamation-triangle ml-1"></i>⚠️ الإعدادات محفوظة لكن غير متصل';
    }
  } else {
    status.className = 'text-xs text-stone-400 px-3 py-2 rounded-lg bg-stone-100';
    status.innerHTML = '⏻ غير متصل. أدخل بيانات الاتصال أعلاه.';
  }
}

/* ====== Loading settings on customer view ====== */
if (window.location.search.includes('view=customer')) {
  document.addEventListener('DOMContentLoaded', function() {
    renderCustomerSettings();
  });
}

/* ====== MOBILE DRAWER SIDEBAR TOGGLE ====== */
function toggleMobileSidebar() {
  const sidebar = document.getElementById('adminSidebar') || document.getElementById('therapistSidebar');
  if (sidebar) {
    sidebar.classList.toggle('active');
    
    // إنشاء أو إزالة غطاء مظلم تفاعلي خلف القائمة المنزلقة
    let overlay = document.getElementById('mobileSidebarOverlay');
    if (!overlay && sidebar.classList.contains('active')) {
      overlay = document.createElement('div');
      overlay.id = 'mobileSidebarOverlay';
      overlay.className = 'fixed inset-0 bg-stone-900/40 z-[999] transition-opacity duration-300 backdrop-blur-2xs';
      overlay.onclick = function() {
        sidebar.classList.remove('active');
        this.remove();
      };
      document.body.appendChild(overlay);
    } else if (overlay) {
      overlay.remove();
    }
  }
}
