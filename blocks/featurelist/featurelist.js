export default function decorate(block) {
  // Get all feature divs
  const features = block.firstElementChild?.children || [];
  const featuresContent = [];

  // Process each feature div
  Array.from(features).forEach((feature) => {
    if (!feature) return;

    // Safely get each element directly
    const picture = feature.querySelector('picture');
    const title = feature.querySelector('h3');
    const description = feature.querySelector('h3 + p');

    // Add classes directly to elements if they exist
    picture?.classList.add('feature__image');
    title?.classList.add('feature__title');
    description?.classList.add('feature__desciption');

    // Only add feature if at least one element exists
    if (picture || title || description) {
      featuresContent.push({
        picture: picture ? picture.outerHTML : '',
        title: title ? title.outerHTML : '',
        description: description ? description.outerHTML : '',
      });
    }
  });

  // Only create new structure if we have features
  if (featuresContent.length > 0) {
    const newHtml = `
      <ul class="features">
        ${featuresContent.map((feature) => `
          <li class="features__item">
            ${feature.picture}
            <div class="feature__content">
              ${feature.title}
              ${feature.description}
            </div>
          </li>
        `).join('')}
      </ul>
    `;

    block.innerHTML = newHtml;
  }
}
