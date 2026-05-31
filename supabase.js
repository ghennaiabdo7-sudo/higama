/* ====== Supabase Integration Layer ====== */
const SUPABASE_CONFIG_KEY = 'supabaseConfig';
let supabaseClient = null;
let supabaseConnected = false;

function getSupabaseConfig() {
  try {
    const raw = localStorage.getItem(SUPABASE_CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function saveSupabaseConfig(url, anonKey) {
  localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify({ url, anonKey }));
}

function clearSupabaseConfig() {
  localStorage.removeItem(SUPABASE_CONFIG_KEY);
}

async function initSupabase() {
  const config = getSupabaseConfig();
  if (!config || !config.url || !config.anonKey) {
    supabaseClient = null;
    supabaseConnected = false;
    return false;
  }
  try {
    supabaseClient = supabase.createClient(config.url, config.anonKey);
    // Test connection by fetching settings
    const { data, error } = await supabaseClient.from('settings').select('id').limit(1);
    if (error) throw error;
    supabaseConnected = true;
    console.log('✅ Supabase connected successfully');
    return true;
  } catch(e) {
    console.warn('⚠️ Supabase connection failed:', e.message);
    supabaseClient = null;
    supabaseConnected = false;
    return false;
  }
}

/* ====== DATA LOADING ====== */
async function loadFromSupabase() {
  if (!supabaseClient || !supabaseConnected) return null;
  try {
    const tables = [
      'therapists', 'expenses', 'inventory', 'services',
      'customers', 'bookings', 'health_records',
      'notifications', 'deductions', 'settings'
    ];
    const result = {};
    for (const table of tables) {
      const { data, error } = await supabaseClient.from(table).select('*');
      if (error) throw error;
      if (table === 'settings') {
        const s = data && data.length > 0 ? data[0] : {};
        result.settings = {
          logo: s.logo || '',
          bio: s.bio || '',
          workingHours: s.working_hours || '',
          mapLink: s.map_link || '',
          whatsapp: s.whatsapp || '',
          facebook: s.facebook || '',
          instagram: s.instagram || ''
        };
      } else if (data) {
        // Map snake_case DB fields to camelCase app fields
        result[table] = data.map(row => {
          const mapped = {};
          for (const [key, value] of Object.entries(row)) {
            const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
            mapped[camelKey] = value;
          }
          // Remove Supabase internal fields
          delete mapped.createdAt;
          delete mapped.updatedAt;
          // Special handling for specific tables
          if (table === 'services' && mapped.inventoryMapping && typeof mapped.inventoryMapping === 'string') {
            try { mapped.inventoryMapping = JSON.parse(mapped.inventoryMapping); } catch(e) { mapped.inventoryMapping = []; }
          }
          if (table === 'bookings') {
            mapped.customerId = mapped.customerId;
            mapped.serviceId = mapped.serviceId;
            mapped.therapistId = mapped.therapistId;
            mapped.servicePrice = mapped.servicePrice || 0;
            mapped.finalPrice = mapped.finalPrice || 0;
            mapped.cupsUsed = mapped.cupsUsed || 0;
            mapped.materialCost = mapped.materialCost || 0;
            mapped.commissionAmount = mapped.commissionAmount || 0;
            mapped.feedback = mapped.feedback || null;
            if (mapped.feedback && typeof mapped.feedback === 'string') {
              try { mapped.feedback = JSON.parse(mapped.feedback); } catch(e) { mapped.feedback = null; }
            }
          }
          if (table === 'bookings' && mapped.completedAt) {
            mapped.completedAt = mapped.completedAt;
          }
          return mapped;
        });
      }
    }
    console.log('✅ Data loaded from Supabase');
    return result;
  } catch(e) {
    console.error('❌ Failed to load from Supabase:', e);
    return null;
  }
}

/* ====== DATA SAVING ====== */
async function saveToSupabase(dataObj) {
  if (!supabaseClient || !supabaseConnected) return false;
  try {
    const operations = [];

    // Settings (single row with id=1)
    if (dataObj.settings) {
      const s = dataObj.settings;
      operations.push(
        supabaseClient.from('settings').upsert({
          id: 1,
          logo: s.logo || '',
          bio: s.bio || '',
          working_hours: s.workingHours || '',
          map_link: s.mapLink || '',
          whatsapp: s.whatsapp || '',
          facebook: s.facebook || '',
          instagram: s.instagram || ''
        }, { onConflict: 'id' })
      );
    }

    // Therapists
    if (dataObj.therapists) {
      for (const t of dataObj.therapists) {
        operations.push(
          supabaseClient.from('therapists').upsert({
            id: t.id, name: t.name, username: t.username,
            password: t.password, commission: t.commission || 0,
            whatsapp: t.whatsapp || '', gender: t.gender || 'ذكر',
            rating: t.rating || 0
          }, { onConflict: 'id' })
        );
      }
    }

    // Expenses
    if (dataObj.expenses) {
      for (const e of dataObj.expenses) {
        operations.push(
          supabaseClient.from('expenses').upsert({
            id: e.id, name: e.name, amount: e.amount,
            month: e.month, year: e.year
          }, { onConflict: 'id' })
        );
      }
    }

    // Inventory
    if (dataObj.inventory) {
      for (const i of dataObj.inventory) {
        operations.push(
          supabaseClient.from('inventory').upsert({
            id: i.id, name: i.name, quantity: i.quantity,
            volume: i.volume || 0, cost_price: i.costPrice || 0
          }, { onConflict: 'id' })
        );
      }
    }

    // Services
    if (dataObj.services) {
      for (const s of dataObj.services) {
        operations.push(
          supabaseClient.from('services').upsert({
            id: s.id, name: s.name, image: s.image || '',
            price: s.price, description: s.description || '',
            is_cupping: s.isCupping || false, cup_price: s.cupPrice || 0,
            inventory_mapping: JSON.stringify(s.inventoryMapping || [])
          }, { onConflict: 'id' })
        );
      }
    }

    // Customers
    if (dataObj.customers) {
      for (const c of dataObj.customers) {
        operations.push(
          supabaseClient.from('customers').upsert({
            id: c.id, name: c.name, phone: c.phone || '',
            gender: c.gender || 'ذكر', username: c.username,
            password: c.password
          }, { onConflict: 'id' })
        );
      }
    }

    // Bookings
    if (dataObj.bookings) {
      for (const b of dataObj.bookings) {
        operations.push(
          supabaseClient.from('bookings').upsert({
            id: b.id, customer_id: b.customerId,
            service_id: b.serviceId, therapist_id: b.therapistId,
            service_price: b.servicePrice || 0,
            final_price: b.finalPrice || 0,
            cups_used: b.cupsUsed || 0,
            date: b.date, time_slot: b.timeSlot,
            age: b.age || 0, chronic_diseases: b.chronicDiseases || null,
            medical_test: b.medicalTest || null,
            status: b.status || 'pending',
            completed_at: b.completedAt || null,
            commission_amount: b.commissionAmount || 0,
            material_cost: b.materialCost || 0,
            feedback: b.feedback ? JSON.stringify(b.feedback) : null
          }, { onConflict: 'id' })
        );
      }
    }

    // Health Records
    if (dataObj.healthRecords) {
      for (const h of dataObj.healthRecords) {
        operations.push(
          supabaseClient.from('health_records').upsert({
            id: h.id, customer_id: h.customerId,
            therapist_id: h.therapistId,
            blood_sugar: h.bloodSugar || null,
            height: h.height || null, weight: h.weight || null,
            oxygen: h.oxygen || null, notes: h.notes || '',
            medical_test: h.medicalTest || null
          }, { onConflict: 'id' })
        );
      }
    }

    // Notifications
    if (dataObj.notifications) {
      for (const n of dataObj.notifications) {
        operations.push(
          supabaseClient.from('notifications').upsert({
            id: n.id, therapist_id: n.therapistId,
            message: n.message, type: n.type || 'info',
            read: n.read || false
          }, { onConflict: 'id' })
        );
      }
    }

    // Deductions
    if (dataObj.deductions) {
      for (const d of dataObj.deductions) {
        operations.push(
          supabaseClient.from('deductions').upsert({
            id: d.id, therapist_id: d.therapistId,
            amount: d.amount, reason: d.reason || ''
          }, { onConflict: 'id' })
        );
      }
    }

    // Execute all operations in batches of 10
    const batchSize = 10;
    for (let i = 0; i < operations.length; i += batchSize) {
      const batch = operations.slice(i, i + batchSize);
      const results = await Promise.allSettled(batch);
      const fails = results.filter(r => r.status === 'rejected');
      if (fails.length > 0) {
        console.warn(`⚠️ ${fails.length} operations failed in batch ${i / batchSize}`);
      }
    }

    console.log(`✅ Synced ${operations.length} records to Supabase`);
    return true;
  } catch(e) {
    console.error('❌ Failed to save to Supabase:', e);
    return false;
  }
}

/* ====== AUTHENTICATION HELPERS ====== */

async function supabaseSignIn(email, password) {
  if (!supabaseClient || !supabaseConnected) return { error: 'Supabase غير متصل' };
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return { data, error: null };
  } catch(e) {
    return { data: null, error: e.message };
  }
}

async function supabaseSignUp(email, password) {
  if (!supabaseClient || !supabaseConnected) return { error: 'Supabase غير متصل' };
  try {
    const { data, error } = await supabaseClient.auth.signUp({ email, password });
    if (error) throw error;
    return { data, error: null };
  } catch(e) {
    return { data: null, error: e.message };
  }
}

async function supabaseSignOut() {
  if (!supabaseClient || !supabaseConnected) return;
  await supabaseClient.auth.signOut();
}

/* ====== SYNC ALL DATA (full push) ====== */
async function fullSyncToSupabase() {
  if (!supabaseClient || !supabaseConnected) {
    showToast('Supabase غير متصل. الرجاء التحقق من الإعدادات.', 'error');
    return false;
  }
  showToast('جاري مزامنة البيانات مع Supabase...', 'info');
  const success = await saveToSupabase(data);
  if (success) {
    showToast('تمت المزامنة بنجاح مع Supabase', 'success');
  } else {
    showToast('فشلت المزامنة مع Supabase', 'error');
  }
  return success;
}

async function fullLoadFromSupabase() {
  if (!supabaseClient || !supabaseConnected) {
    showToast('Supabase غير متصل. الرجاء التحقق من الإعدادات.', 'error');
    return false;
  }
  showToast('جاري تحميل البيانات من Supabase...', 'info');
  const remoteData = await loadFromSupabase();
  if (remoteData) {
    data = getDefaultData();
    Object.assign(data, remoteData);
    saveData(); // Cache to LocalStorage
    showToast('تم تحميل البيانات من Supabase بنجاح', 'success');
    return true;
  }
  showToast('فشل تحميل البيانات من Supabase', 'error');
  return false;
}
