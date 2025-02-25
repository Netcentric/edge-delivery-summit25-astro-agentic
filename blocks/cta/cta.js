export default function decorate(block) {
  block.classList.add('fullbleed');

  const [pictureDiv, contentDiv, buttonDiv] = block.firstElementChild.children;

  // Get elements
  const picture = pictureDiv.querySelector('picture');
  const [title, description] = contentDiv.querySelectorAll('h2, p');
  const button = buttonDiv?.querySelector('a');

  if (button) {
    button.classList.add('button', 'icon-arrow-right');
  }

  // Create new structure
  const newHtml = `
    <div class="cta__media">
      ${picture.outerHTML}
    </div>
    <div class="cta__content">
      ${title.outerHTML}
      ${description.outerHTML}
      ${button?.outerHTML || ''}
    </div>
  `;

  block.innerHTML = newHtml;
}
