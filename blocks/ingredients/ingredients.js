export default function decorate(block) {
  // Get all direct children divs
  const [pictureWrapper, ...ingredientDivs] = block.children;

  // Get the picture from first div
  const picture = pictureWrapper.querySelector('picture');

  // Transform ingredients into definition list items
  const dlItems = ingredientDivs.map(div => {
    const p = div.querySelector('p');
    const strong = p.querySelector('strong');
    const amount = p.textContent.split(':')[1].trim();

    return `
      <dt class="ingredient__name">${strong.textContent.replace(':', '')}</dt>
      <dd class="ingredient__amount">${amount}</dd>
    `;
  }).join('');

  // Create new structure
  const newHtml = `
    <dl class="ingredients__content">
      ${dlItems}
    </dl>
    <div class="ingredients__media">
      ${picture.outerHTML}
    </div>

  `;

  block.innerHTML = newHtml;
}
