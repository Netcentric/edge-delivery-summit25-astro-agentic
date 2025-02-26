export default function decorate(block) {
  block.classList.add('fullbleed');

  // Get the inner elements
  const [logoDiv, contentDiv, buttonDiv] = block.firstElementChild.children;
  const image = logoDiv.querySelector('picture');
  const button = buttonDiv.querySelector('a');
  button?.classList.add('button', 'icon-arrow-right');

  // Create new structure
  const newHtml = `
    <div class="herosection__image">
      ${image.outerHTML}
    </div>
    <div class="herosection__body">
      ${contentDiv.outerHTML}
      ${button.outerHTML}
  `;

  block.innerHTML = newHtml;
}
