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

    const [, href, name, day, month, year, time, size] = match;

    const monthDigital = months[month] || '01';
    const fullDate = `${day}/${monthDigital}/${year} ${time}`;

    let icon = 'fa-file';
    if (href.endsWith('/')) icon = 'fa-folder';
    else if (name.match(/\.(png|jpg|jpeg|gif|webp)$/i)) icon = 'fa-image';
    else if (name.match(/\.pdf$/i)) icon = 'fa-file-pdf';
    else if (name.match(/\.(zip|rar|7z|tar)$/i)) icon = 'fa-file-archive';

    count++;

    const isBlank = name.match(/\.(pdf|jpg|jpeg|png|gif|webp|txt)$/i);
    const target = isBlank ? 'target="_blank"' : '';
    const rel = isBlank ? 'rel="noopener noreferrer"' : '';

    html += `
      <a href="${href}" class="file-link" ${target} ${rel}>
        <div class="file-row">
          <div class="file-name">
            <i class="fas ${icon} file-icon"></i>
            <span>${name}</span>
          </div>
          <div class="file-date">
            ${fullDate}
          </div>
          <div class="file-size">
            ${size}
          </div>
        </div>
      </a>
    `;
  });

  container.innerHTML = html;

  document.getElementById('file-counter').innerText = `Файлів: ${count}`;
});
