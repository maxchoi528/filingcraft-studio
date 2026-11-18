/**
 * Live interactive Web Sandbox for FilingCraft Studio Pro landing page.
 * Demonstrates exact Formulas (=fx) vs Values toggle, B5 Share Price recalculation, and sheet switching.
 */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var sheetIdx = 0;
  var mode = 'values';
  var sharePrice = 225.5;
  var selectedRef = 'B14';

  var priceInput = document.getElementById('fc-demo-price');
  var refEl = document.getElementById('fc-demo-ref');
  var fxExprEl = document.getElementById('fc-demo-fx');
  var bodyEl = document.getElementById('fc-demo-tbody');
  var headEl = document.getElementById('fc-demo-thead');
  if (!bodyEl || !headEl) return;

  function calcMetrics(price) {
    var shares = 15300;
    var assets = 372000;
    var ca = 158000;
    var cl = 172000;
    var ret = 12000;
    var ebit = 127000;
    var liab = 302000;
    var eq = 70000;
    var rev = 405000;
    var fcf = 111800;

    var mktCap = price > 0 ? price * shares : 0;
    var x1 = (ca - cl) / assets;
    var x2 = ret / assets;
    var x3 = ebit / assets;
    var x4 = (mktCap > 0 ? mktCap : eq) / liab;
    var x5 = rev / assets;
    var z = 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + x5;
    var fcfYield = mktCap > 0 ? (fcf / mktCap) * 100 : 0;
    return { mktCap: mktCap, x4: x4, z: z, fcfYield: fcfYield };
  }

  function buildRows() {
    var m = calcMetrics(sharePrice);
    if (sheetIdx === 0) {
      return {
        headers: ['Line Item (1_Summary_Scores)', 'Value / Live Formula', 'Reference / Threshold'],
        rows: [
          { r: 5, a: 'Assumed Share Price ($)', ref: 'B5', cls: 'is-in', val: sharePrice.toFixed(2), fx: sharePrice.toFixed(2) + ' [Editable Blue Input]', c: 'Edit Share Price above to recalculate live' },
          { r: 6, a: 'Implied Market Cap ($M)', ref: 'B6', cls: 'is-fx', val: m.mktCap.toLocaleString('en-US', { maximumFractionDigits: 1 }), fx: "=B5*'2_Income_Statement'!B14", c: 'Price * Diluted Shares' },
          { r: 12, a: 'Altman X4: Equity Value / Liab', ref: 'B12', cls: 'is-fx', val: m.x4.toFixed(2), fx: "=IF(B6>0,B6,'3_Balance_Sheet'!B16)/'3_Balance_Sheet'!B14", c: 'Weight: 0.6x' },
          { r: 14, a: 'Altman Z-Score', ref: 'B14', cls: 'is-fx', val: m.z.toFixed(2), fx: '=1.2*B9+1.4*B10+3.3*B11+0.6*B12+1.0*B13', c: '>= 2.99 Safe | 1.81-2.99 Grey' },
          { r: 21, a: 'Implied FCF Yield %', ref: 'B21', cls: 'is-fx', val: m.fcfYield.toFixed(2) + '%', fx: '=IF(B6=0,0,B19/B6)', c: 'Live Free Cash Flow / Market Cap' }
        ]
      };
    }
    return {
      headers: ['Line Item (2_Income_Statement, $M)', 'FY2025', 'FY2024', 'FY2023'],
      rows: [
        { r: 4, a: 'Total Revenue', ref: 'B4', cls: 'num', val: '405,000.0', fx: '405,000.0', c2: '391,035.0', c3: '383,285.0' },
        { r: 5, a: 'Cost of Revenue', ref: 'B5', cls: 'num', val: '218,000.0', fx: '218,000.0', c2: '210,352.0', c3: '214,137.0' },
        { r: 6, a: 'Gross Profit', ref: 'B6', cls: 'is-fx num', val: '187,000.0', fx: '=B4-B5', c2: '180,683.0', c3: '169,148.0' },
        { r: 17, a: 'Gross Margin %', ref: 'B17', cls: 'is-fx num', val: '46.2%', fx: '=IF(B4=0,0,B6/B4)', c2: '46.2%', c3: '44.1%' }
      ]
    };
  }

  function render() {
    var data = buildRows();
    headEl.replaceChildren();
    var hTr = document.createElement('tr');
    data.headers.forEach(function (h) {
      var th = document.createElement('th');
      th.textContent = h;
      hTr.appendChild(th);
    });
    headEl.appendChild(hTr);

    bodyEl.replaceChildren();
    var chosen = null;
    data.rows.forEach(function (item) {
      var tr = document.createElement('tr');
      var tdA = document.createElement('td');
      tdA.textContent = item.a;
      tr.appendChild(tdA);

      var tdB = document.createElement('td');
      tdB.className = item.cls;
      tdB.textContent = (mode === 'formulas' && item.fx.charAt(0) === '=') ? item.fx : item.val;
      tdB.style.cursor = 'pointer';
      tdB.addEventListener('click', function () {
        selectedRef = item.ref;
        render();
      });
      tr.appendChild(tdB);

      if (sheetIdx === 0) {
        var tdC = document.createElement('td');
        tdC.textContent = item.c;
        tr.appendChild(tdC);
      } else {
        var tdC2 = document.createElement('td');
        tdC2.className = 'num';
        tdC2.textContent = item.c2;
        tr.appendChild(tdC2);
        var tdC3 = document.createElement('td');
        tdC3.className = 'num';
        tdC3.textContent = item.c3;
        tr.appendChild(tdC3);
      }
      if (item.ref === selectedRef) chosen = item;
      bodyEl.appendChild(tr);
    });
    if (!chosen) chosen = data.rows[0];
    refEl.textContent = chosen.ref;
    fxExprEl.textContent = chosen.fx;
  }

  document.querySelectorAll('[data-demo-sheet]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      sheetIdx = Number(btn.getAttribute('data-demo-sheet')) || 0;
      selectedRef = sheetIdx === 0 ? 'B14' : 'B6';
      document.querySelectorAll('[data-demo-sheet]').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });
      render();
    });
  });

  document.querySelectorAll('[data-demo-mode]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      mode = btn.getAttribute('data-demo-mode') || 'values';
      document.querySelectorAll('[data-demo-mode]').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });
      render();
    });
  });

  if (priceInput) {
    priceInput.addEventListener('input', function () {
      var n = parseFloat(priceInput.value);
      sharePrice = Number.isFinite(n) && n >= 0 ? n : 0;
      render();
    });
  }

  render();

  // Accessible Screenshot Lightbox Zoom Modal
  var triggers = Array.prototype.slice.call(document.querySelectorAll('.shot-trigger'));
  var lbModal = document.getElementById('fc-lightbox');
  var lbImg = document.getElementById('fc-lb-img');
  var lbCap = document.getElementById('fc-lb-cap');
  var lbCount = document.getElementById('fc-lb-counter');
  var lbPrev = document.getElementById('fc-lb-prev');
  var lbNext = document.getElementById('fc-lb-next');
  var lbClose = document.getElementById('fc-lb-close');
  var activeShotIdx = 0;
  var lastFocusedEl = null;

  function showLightbox(idx) {
    if (!lbModal || triggers.length === 0) return;
    activeShotIdx = ((idx % triggers.length) + triggers.length) % triggers.length;
    var trigger = triggers[activeShotIdx];
    var img = trigger.querySelector('img');
    var cap = trigger.parentElement ? trigger.parentElement.querySelector('figcaption') : null;
    if (img && lbImg) {
      lbImg.src = img.getAttribute('src') || '';
      lbImg.alt = img.getAttribute('alt') || 'Extension preview';
    }
    if (lbCap) lbCap.textContent = cap ? cap.textContent : '';
    if (lbCount) lbCount.textContent = (activeShotIdx + 1) + ' / ' + triggers.length;
    lbModal.hidden = false;
    if (lbClose) lbClose.focus();
  }

  function closeLightbox() {
    if (!lbModal) return;
    lbModal.hidden = true;
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  }

  triggers.forEach(function (btn, idx) {
    btn.addEventListener('click', function () {
      lastFocusedEl = btn;
      showLightbox(idx);
    });
  });

  if (lbPrev) lbPrev.addEventListener('click', function () { showLightbox(activeShotIdx - 1); });
  if (lbNext) lbNext.addEventListener('click', function () { showLightbox(activeShotIdx + 1); });
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbModal) {
    lbModal.addEventListener('click', function (ev) {
      if (ev.target === lbModal) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (ev) {
    if (!lbModal || lbModal.hidden) return;
    if (ev.key === 'Escape') closeLightbox();
    else if (ev.key === 'ArrowRight') showLightbox(activeShotIdx + 1);
    else if (ev.key === 'ArrowLeft') showLightbox(activeShotIdx - 1);
  });
});
