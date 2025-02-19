export default function decorate(block) {
  block.classList.add('fullbleed');

  const [pictureDiv, contentDiv] = block.firstElementChild.children;

  // Get elements
  const picture = pictureDiv.querySelector('picture');
  const [title, description, ctaText] = contentDiv.querySelectorAll('h2, p');

  // Create new structure
  const newHtml = `
    <div class="cta__media">
      ${picture.outerHTML}
    </div>
    <div class="cta__content">
      ${title.outerHTML}
      ${description.outerHTML}
      <a href="#" class="button">${ctaText.textContent}</a>
    </div>
  `;

  block.innerHTML = newHtml;
}
