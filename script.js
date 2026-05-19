(function () {
  // ─── Theme (runs immediately, before first paint) ──────
  var stored = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', stored);

  // ─── Terminal loader ────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    var loader   = document.getElementById('termLoader');
    var termBody = document.getElementById('termBody');
    if (!loader || !termBody) return;

    var done = false;

    function dismiss() {
      if (done) return;
      done = true;
      document.body.style.overflow = '';
      loader.classList.add('term-fade');
      setTimeout(function () { loader.remove(); }, 460);
    }

    // Skip on click or any keydown
    loader.addEventListener('click', dismiss);
    document.addEventListener('keydown', dismiss, { once: true });

    document.body.style.overflow = 'hidden';

    // ── Prompt line with typed command ────────────────────
    var promptLine = document.createElement('span');
    promptLine.className = 'term-line show';

    var promptSpan = document.createElement('span');
    promptSpan.className = 'term-prompt';
    promptSpan.textContent = 'harshitk@dev:~$';

    var space = document.createTextNode(' ');

    var cmdSpan = document.createElement('span');
    cmdSpan.className = 'term-cmd';

    var cursorSpan = document.createElement('span');
    cursorSpan.className = 'term-cursor';

    promptLine.appendChild(promptSpan);
    promptLine.appendChild(space);
    promptLine.appendChild(cmdSpan);
    promptLine.appendChild(cursorSpan);
    termBody.appendChild(promptLine);

    var command = './portfolio --init';
    var idx     = 0;

    function typeNext() {
      if (idx < command.length) {
        cmdSpan.textContent += command[idx++];
        setTimeout(typeNext, 52);
      } else {
        cursorSpan.remove();
        showOutput();
      }
    }

    // ── Output lines ──────────────────────────────────────
    var outputLines = [
      { text: 'loading experience...',     cls: 'term-out'   },
      { text: 'indexing projects...',      cls: 'term-out'   },
      { text: 'compiling open source...', cls: 'term-out'   },
      { text: '▸ ready',                   cls: 'term-ready' },
    ];

    function makeOutputLine(item, withCursor) {
      var line    = document.createElement('span');
      line.className = 'term-line';

      var text = document.createElement('span');
      text.className   = item.cls;
      text.textContent = item.text;
      line.appendChild(text);

      if (withCursor) {
        var cur = document.createElement('span');
        cur.className = 'term-cursor';
        line.appendChild(cur);
      }

      return line;
    }

    function showOutput() {
      outputLines.forEach(function (item, i) {
        setTimeout(function () {
          var isLast = i === outputLines.length - 1;
          var line   = makeOutputLine(item, isLast);
          termBody.appendChild(line);

          requestAnimationFrame(function () {
            requestAnimationFrame(function () { line.classList.add('show'); });
          });

          if (isLast) { setTimeout(dismiss, 700); }
        }, i * 240);
      });
    }

    setTimeout(typeNext, 280);

    // ── Theme toggle ──────────────────────────────────────
    var themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        var next    = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
      });
    }
  });
})();
