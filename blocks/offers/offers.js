export default function decorate(block) {
  block.classList.add('fullbleed');

  const titleWrapper = block.children[0];
  const titleElement = titleWrapper?.querySelector('h2');
  titleElement?.classList.add('offers__title');
  const sectionTitle = titleElement?.outerHTML || '';

  const offersWrapper = block.children[1];
  const offers = Array.from(offersWrapper?.children || []);
  const offersContent = [];

  offers.forEach((offer) => {
    if (!offer) return;

    const picture = offer.querySelector('picture');
    const title = offer.querySelector('h4');
    const description = offer.querySelector('h4 + p');
    const button = offer.querySelector('.button-container a');

    picture?.classList.add('offers__image');
    title?.classList.add('offers__cardtitle');
    description?.classList.add('offers__description');
    button?.classList.add('offers__button');

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
      <ul class="offers__list">
        ${offersContent.map((offer) => `
          <li class="offers__item">
            ${offer.picture}
            <div class="offers__content">
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
