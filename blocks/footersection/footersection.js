export default function decorate(block) {
  block.classList.add('fullbleed');

  const [logoRow, menuRow, socialsRow, socialIcons, infoRow] = block.children;

  // Get logo from first row
  const logo = logoRow.querySelector('picture');

  // Get menu items from second row
  const menuItems = menuRow.querySelectorAll('.button-container a');
  const menuHtml = Array.from(menuItems).map((item) => `
    <li class="footersection__menu-item">
      <a href="${item.getAttribute('href')}" class="footersection__menu-link">${item.textContent}</a>
    </li>
  `).join('');

  // Get social links and icons
  const socialLinks = socialsRow.querySelectorAll('.button-container a');
  const socialIconDivs = socialIcons.querySelectorAll('div');

  const socialsHtml = Array.from(socialLinks).map((link, index) => {
    if (!link) return '';

    const icon = socialIconDivs[index]?.querySelector('picture');
    const linkContent = icon ? icon.outerHTML : link.textContent;

    return `
      <li class="footersection__social-item">
        <a href="${link.getAttribute('href')}" class="footersection__social-link">
          ${linkContent}
        </a>
      </li>
    `;
  }).join('');

  // Get info paragraphs from fourth row
  const infoParagraphs = infoRow.querySelectorAll('p');
  const infoHtml = Array.from(infoParagraphs).map((p) => {
    // Remove button class from any links
    p.querySelectorAll('a').forEach((link) => {
      link.classList.remove('button');
    });
    return `<div class="footersection__info-item">${p.outerHTML}</div>`;
  }).join('');

  // Create new structure
  const newHtml = `
    <div class="footersection__logo">
      ${logo.outerHTML}
    </div>
    <nav class="footersection__menu">
      <ul class="footersection__menu-list">
        ${menuHtml}
      </ul>
    </nav>
    <ul class="footersection__social-list">
      ${socialsHtml}
    </ul>
    <div class="footersection__info">
      ${infoHtml}
    </div>
  `;

  block.innerHTML = newHtml;
}
