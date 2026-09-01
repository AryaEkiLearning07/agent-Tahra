/**
 * Format number to Indonesian Rupiah (IDR)
 * @param {number|string} amount
 * @returns {string}
 */
export function formatRp(amount) {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return 'Rp 0';
  }
  return `Rp ${Number(amount).toLocaleString('id-ID')}`;
}

/**
 * Format raw number with thousand separators
 * @param {number|string} num
 * @returns {string}
 */
export function formatNumber(num) {
  if (num === undefined || num === null || isNaN(Number(num))) {
    return '0';
  }
  return Number(num).toLocaleString('id-ID');
}

/**
 * Format percentage with 1 or 2 decimals
 * @param {number|string} val
 * @param {number} decimals
 * @returns {string}
 */
export function formatPercent(val, decimals = 1) {
  if (val === undefined || val === null || isNaN(Number(val))) {
    return '0%';
  }
  return `${Number(val).toFixed(decimals)}%`;
}

/**
 * Format ISO date string to friendly Indonesian date
 * @param {string|Date} dateInput
 * @returns {string}
 */
export function formatDate(dateInput) {
  if (!dateInput) return '-';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return String(dateInput);
  }
}

/**
 * Unit Economics Calculator
 * @param {number} hargaJual
 * @param {number} hpp
 * @returns {{ marginValue: number, marginPercent: number, status: 'HEALTHY'|'WARNING'|'VETO', label: string, color: string }}
 */
export function calculateMargin(hargaJual, hpp) {
  const harga = Number(hargaJual) || 0;
  const modal = Number(hpp) || 0;
  if (harga <= 0) {
    return { marginValue: 0, marginPercent: 0, status: 'VETO', label: 'Invalid Price', color: '#f87171' };
  }
  const marginValue = harga - modal;
  const marginPercent = (marginValue / harga) * 100;

  if (marginPercent < 20) {
    return {
      marginValue,
      marginPercent,
      status: 'VETO',
      label: '🚫 Risiko VETO (<20%)',
      color: '#f87171',
    };
  }
  if (marginPercent < 30) {
    return {
      marginValue,
      marginPercent,
      status: 'WARNING',
      label: '⚡ Margin Cukup (20-30%)',
      color: '#fbbf24',
    };
  }
  return {
    marginValue,
    marginPercent,
    status: 'HEALTHY',
    label: '✅ Margin Sehat (>30%)',
    color: '#34d399',
  };
}
