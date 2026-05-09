/**
 * Replyr — embeddable chat widget loader.
 *
 * Usage: <script src="https://your-replyr-host.com/widget.js" data-key="WIDGET_API_KEY" defer></script>
 *
 * Renders a small chat bubble bottom-right. Clicking it opens an iframe panel
 * pointing at /widget/<key>. Click bubble or X to close. On mobile the panel
 * goes full-screen.
 */
(function () {
  'use strict'

  if (window.__replyrLoaded) return
  window.__replyrLoaded = true

  // Find our own script tag (must include "widget.js" in the src and a data-key)
  var thisScript = (function () {
    var scripts = document.querySelectorAll('script[data-key]')
    for (var i = 0; i < scripts.length; i++) {
      var s = scripts[i]
      if (s.src && s.src.indexOf('widget.js') !== -1) return s
    }
    // Fallback: currentScript (only works at parse time)
    if (document.currentScript && document.currentScript.dataset.key) {
      return document.currentScript
    }
    return null
  })()

  if (!thisScript) {
    console.warn('[Replyr] Could not locate widget script tag with data-key.')
    return
  }

  var apiKey = thisScript.getAttribute('data-key')
  if (!apiKey) {
    console.warn('[Replyr] Missing data-key attribute on script tag.')
    return
  }

  var src
  try {
    src = new URL(thisScript.src)
  } catch (e) {
    console.warn('[Replyr] Could not parse script src.')
    return
  }
  var host = src.protocol + '//' + src.host
  var iframeUrl = host + '/widget/' + encodeURIComponent(apiKey)

  // ── styles ────────────────────────────────────────────────────────────────
  var STYLE_ID = 'replyr-widget-styles'
  if (!document.getElementById(STYLE_ID)) {
    var style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent =
      '.replyr-fab,.replyr-panel{position:fixed;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}' +
      '.replyr-fab{bottom:20px;right:20px;width:56px;height:56px;border-radius:9999px;border:none;cursor:pointer;background:#7c3aed;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px -8px rgba(124,58,237,0.5),0 4px 12px rgba(0,0,0,0.18);transition:transform .2s ease,box-shadow .2s ease}' +
      '.replyr-fab:hover{transform:translateY(-2px);box-shadow:0 14px 36px -8px rgba(124,58,237,0.6),0 6px 16px rgba(0,0,0,0.22)}' +
      '.replyr-fab:focus-visible{outline:2px solid #fff;outline-offset:2px}' +
      '.replyr-fab svg{width:24px;height:24px;transition:transform .25s ease,opacity .2s ease}' +
      '.replyr-fab .replyr-ico-close{position:absolute;opacity:0;transform:rotate(-45deg) scale(.7)}' +
      '.replyr-fab[data-open="true"] .replyr-ico-chat{opacity:0;transform:rotate(45deg) scale(.7)}' +
      '.replyr-fab[data-open="true"] .replyr-ico-close{opacity:1;transform:rotate(0) scale(1)}' +
      '.replyr-panel{bottom:88px;right:20px;width:380px;height:600px;max-height:calc(100vh - 110px);border:none;border-radius:16px;overflow:hidden;background:transparent;box-shadow:0 20px 50px -12px rgba(0,0,0,0.45),0 0 0 1px rgba(255,255,255,0.04);opacity:0;transform:translateY(12px) scale(.985);pointer-events:none;transition:opacity .22s ease,transform .22s ease}' +
      '.replyr-panel[data-open="true"]{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}' +
      '.replyr-panel iframe{width:100%;height:100%;border:none;display:block;background:#252525}' +
      '@media (max-width:520px){' +
      '.replyr-panel{bottom:0;right:0;left:0;top:0;width:100%;height:100%;max-height:100%;border-radius:0}' +
      '.replyr-fab[data-open="true"]{display:none}' +
      '}'
    document.head.appendChild(style)
  }

  // ── elements ──────────────────────────────────────────────────────────────
  var fab = document.createElement('button')
  fab.className = 'replyr-fab'
  fab.type = 'button'
  fab.setAttribute('aria-label', 'Open chat')
  fab.setAttribute('data-open', 'false')
  fab.innerHTML =
    '<svg class="replyr-ico-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
    '<svg class="replyr-ico-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'

  var panel = document.createElement('div')
  panel.className = 'replyr-panel'
  panel.setAttribute('data-open', 'false')
  panel.setAttribute('role', 'dialog')
  panel.setAttribute('aria-label', 'Chat with us')

  var iframe = document.createElement('iframe')
  iframe.src = iframeUrl
  iframe.title = 'Chat with us'
  iframe.allow = 'clipboard-write'
  panel.appendChild(iframe)

  function toggle(force) {
    var next =
      typeof force === 'boolean'
        ? force
        : panel.getAttribute('data-open') !== 'true'
    panel.setAttribute('data-open', next ? 'true' : 'false')
    fab.setAttribute('data-open', next ? 'true' : 'false')
    fab.setAttribute('aria-label', next ? 'Close chat' : 'Open chat')
  }

  fab.addEventListener('click', function () {
    toggle()
  })

  // Allow ESC to close on desktop
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.getAttribute('data-open') === 'true') {
      toggle(false)
    }
  })

  // Allow the iframe content to request a close (e.g. close button inside chat)
  window.addEventListener('message', function (e) {
    if (!e.data || typeof e.data !== 'object') return
    if (e.data.replyr === 'close') toggle(false)
  })

  function init() {
    document.body.appendChild(panel)
    document.body.appendChild(fab)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
