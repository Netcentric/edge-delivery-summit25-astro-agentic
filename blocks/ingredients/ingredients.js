export default function decorate(block) {
  const [firstEl, secondEl] = block.firstElementChild.children;

  // Determine which element has the picture
  const hasPicture = (el) => el.querySelector('picture');
  const pictureEl = hasPicture(firstEl) ? firstEl : secondEl;
  const listEl = hasPicture(firstEl) ? secondEl : firstEl;

  // Add reverse class if picture is in second position
  if (hasPicture(secondEl)) {
    block.classList.add('ingredients--reversed');
  }

  // Transform list items into definition list entries
  const listItems = listEl.querySelectorAll('li');
  const dlItems = Array.from(listItems).map((li) => {
    const text = li.textContent;
    const [ingredient, amount] = text.split(':').map((s) => s.trim());
    return `
        <dt class="ingredient__name">${ingredient}</dt>
        <dd class="ingredient__amount">${amount}</dd>
    `;
  }).join('');

  // Create new structure
  const newHtml = `
    <dl class="ingredients__content">
      ${dlItems}
    </dl>
    <div class="ingredients__media">
      ${pictureEl.innerHTML}
    </div>
  `;

  block.innerHTML = newHtml;
}
