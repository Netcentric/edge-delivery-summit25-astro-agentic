export default function decorate(block) {
  const [logoDiv, titleDiv, buttonDiv] = block.firstElementChild.children;

  // Get elements
  const headerLogo = logoDiv.querySelector('picture');
  const headerTitle = titleDiv.querySelector('h1');
  const headerButton = buttonDiv.querySelector('a');
  headerButton.classList.add('headersection__button');

  // Create new structure
  const newHtml = `
    <div class="headersection__logo">
      ${headerLogo.innerHTML}
    </div>
    <div class="headersection__title">
      ${headerTitle.innerHTML}
    </div>
    ${headerButton.outerHTML}
  `;

  block.innerHTML = newHtml;
}
