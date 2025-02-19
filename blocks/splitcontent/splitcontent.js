export default function decorate(block) {
  const [firstEl, secondEl] = block.firstElementChild.children;

  // Determine which element has the picture
  const hasPicture = (el) => el.querySelector('picture');
  const pictureEl = hasPicture(firstEl) ? firstEl : secondEl;
  const contentEl = hasPicture(firstEl) ? secondEl : firstEl;

  // Add classes if picture is in second position
  if (hasPicture(secondEl)) {
    block.classList.add('splitcontent--reversed', 'fullbleed');
  }

  // Create new structure
  const newHtml = `
    <div class="splitcontent__media">
      ${pictureEl.innerHTML}
    </div>
    <div class="splitcontent__content">
      ${contentEl.innerHTML}
    </div>
  `;

  block.innerHTML = newHtml;
}
