// analytics.js — Lightweight visitor tracking for portfolio site
// Records unique daily page visits to Supabase, excluding admin visits.

(function() {
  'use strict';

  const SUPABASE_URL = 'https://zyqqbwzdxunbngehdoqi.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5cXFid3pkeHVuYm5nZWhkb3FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDU1NjAsImV4cCI6MjA5NjkyMTU2MH0.Cry86TJ7FkoQpS_hmJgYZ4S7H8XkNsDaqbt4KI4UFqA';

  // 1) Skip if admin
  if (localStorage.getItem('jinseong_is_admin') === 'true') return;

  // 2) Generate a simple browser fingerprint
  function generateVisitorId() {
    var raw = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      screen.colorDepth,
      Intl.DateTimeFormat().resolvedOptions().timeZone
    ].join('|');
    var hash = 0;
    for (var i = 0; i < raw.length; i++) {
      hash = ((hash << 5) - hash) + raw.charCodeAt(i);
      hash |= 0;
    }
    return 'v_' + Math.abs(hash).toString(36);
  }

  // 3) Get current page name
  function getPageName() {
    var path = window.location.pathname;
    var filename = path.split('/').pop() || 'index.html';
    if (filename === '' || filename === '/') filename = 'index.html';
    return filename.replace('.html', '');
  }

  // 4) Get today's date as YYYY-MM-DD
  function getTodayKey() {
    return new Date().toISOString().split('T')[0];
  }

  // 5) Clean up old cache keys (older than 2 days ago)
  function cleanOldCacheKeys() {
    var keysToRemove = [];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key && key.startsWith('jspv_')) {
        var datePart = key.split('_')[1];
        if (datePart) {
          var keyDate = new Date(datePart);
          var twoDaysAgo = new Date();
          twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
          if (keyDate < twoDaysAgo) {
            keysToRemove.push(key);
          }
        }
      }
    }
    keysToRemove.forEach(function(k) { localStorage.removeItem(k); });
  }

  // 6) Main tracking logic
  var visitorId = generateVisitorId();
  var page = getPageName();
  var todayKey = getTodayKey();
  var cacheKey = 'jspv_' + todayKey + '_' + page + '_' + visitorId;

  // Skip if already recorded today for this page
  if (localStorage.getItem(cacheKey)) return;

  // Record visit to Supabase
  fetch(SUPABASE_URL + '/rest/v1/page_visits', {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({
      page: page,
      visitor_id: visitorId
    })
  }).then(function(response) {
    if (response.ok) {
      localStorage.setItem(cacheKey, '1');
      cleanOldCacheKeys();
    }
  }).catch(function(err) {
    // Silently fail — analytics should never break the site
    console.warn('Analytics:', err.message);
  });
})();
