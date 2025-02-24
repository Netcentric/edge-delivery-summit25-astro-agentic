export default function decorate(block) {
  block.classList.add('fullbleed');

  const titleWrapper = block.children[0];
  const titleElement = titleWrapper?.querySelector('h2');
  titleElement?.classList.add('offers-title');
  const sectionTitle = titleElement?.outerHTML || '';

  const offersWrapper = block.children[1];
  const offers = Array.from(offersWrapper?.children || []);
  const offersContent = [];

  offers.forEach((offer) => {

    if (!offer) return;

    const picture = offer.querySelector('picture');
    const title = offer.querySelector('h4');
    const description = offer.querySelector('h4 + p');
    const button = offer.querySelector('a');

    // Clean up description by removing any links
    if (description) {
      description.querySelector('a')?.remove();
    }

    picture?.classList.add('offers-image');
    title?.classList.add('offers-cardtitle');
    description?.classList.add('offers-description');
    button?.classList.add('offers-button');

    if (picture && title && description && button) {
      offersContent.push({
        picture: picture.outerHTML,
        title: title.outerHTML,
        description: description.outerHTML,
        button: button.outerHTML,
      });
    }
  });

  if (offersContent.length > 0) {
    const newHtml = `
      ${sectionTitle}
      <ul class="offers-list">
        ${offersContent.map((offer) => `
          <li class="offers-item">
            ${offer.picture}
            <div class="offers-content">
              ${offer.title}
              ${offer.description}
              <div class="offers__button-container">
                ${offer.button}
              </div>
            </div>
          </li>
        `).join('')}
      </ul>
    `;

    block.innerHTML = newHtml;
  }
}
