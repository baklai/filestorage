document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('file-list-container');
  const pre = container.querySelector('pre');

  if (!pre) return;

  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12'
  };

  const decode = (str) => {
    try {
      return decodeURIComponent(str);
    } catch {
      return str;
    }
  };

  const getType = (name, isDir) => {
    if (isDir) return 'Папка';
    const ext = name.split('.').pop().toLowerCase();
    return ext ? ext.toUpperCase() : '—';
  };

  const copyLink = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${location.origin}${location.pathname.replace(/\/[^/]*$/, '/')}${href}`;
    navigator.clipboard.writeText(url).then(() => {
      const btn = e.currentTarget;
      btn.classList.add('copied');
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = '<i class="fas fa-copy"></i>';
      }, 1500);
    });
  };

  const lines = pre.innerHTML.split('\n');

  let html = '';
  let count = 0;

  lines.forEach((line) => {
    if (/<a href="\.\.\/">/.test(line)) {
      html += `
        <a href="../" class="file-link">
          <div class="file-row">
            <div class="file-name">
              <i class="fas fa-arrow-left file-icon"></i>
              <span>Назад</span>
            </div>
            <div></div>
            <div class="file-type"></div>
            <div class="file-date"></div>
            <div class="file-size"></div>
          </div>
        </a>
      `;
      return;
    }

    const match = line.match(
      /<a href="([^"]+)">([^<]+)<\/a>\s+(\d{2})-([A-Za-z]{3})-(\d{4})\s+(\d{2}:\d{2})\s+(.+)/
    );

    if (!match) return;

    const [, rawHref, rawName, day, month, year, time, size] = match;

    const href = decode(rawHref);
    const name = decode(rawName);

    const monthDigital = months[month] || '01';
    const fullDate = `${day}/${monthDigital}/${year} ${time}`;

    const isDir = href.endsWith('/');
    const type = getType(name, isDir);

    let icon = 'fa-file';
    if (isDir) icon = 'fa-folder';
    else if (name.match(/\.(png|jpg|jpeg|gif|webp)$/i)) icon = 'fa-image';
    else if (name.match(/\.pdf$/i)) icon = 'fa-file-pdf';
    else if (name.match(/\.(zip|rar|7z|tar)$/i)) icon = 'fa-file-archive';

    count++;

    const isBlank = name.match(/\.(pdf|jpg|jpeg|png|gif|webp|txt)$/i);
    const target = isBlank ? 'target="_blank"' : '';
    const rel = isBlank ? 'rel="noopener noreferrer"' : '';

    const copyBtn = !isDir
      ? `<button class="copy-btn" data-href="${href}" title="Копіювати посилання"><i class="fas fa-copy"></i></button>`
      : '<div></div>';

    html += `
      <a href="${href}" class="file-link" ${target} ${rel}>
        <div class="file-row">
          <div class="file-name${isDir ? ' is-dir' : ''}">
            <i class="fas ${icon} file-icon"></i>
            <span>${name}</span>
          </div>
          ${copyBtn}
          <div class="file-type">${type}</div>
          <div class="file-date">${fullDate}</div>
          <div class="file-size">${size}</div>
        </div>
      </a>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll('.copy-btn').forEach((btn) => {
    const href = btn.dataset.href;
    btn.addEventListener('click', (e) => copyLink(e, href));
  });

  document.getElementById('file-counter').innerText = `Файлів: ${count}`;
});
