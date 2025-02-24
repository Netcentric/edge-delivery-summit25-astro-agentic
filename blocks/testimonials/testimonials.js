export default function decorate(block) {
  block.classList.add('fullbleed');

  // Get and process section title
  const titleDiv = block.firstElementChild?.firstElementChild;
  const titleElement = titleDiv?.querySelector('h2');
  titleElement?.classList.add('testimonials__title');
  const sectionTitle = titleElement?.outerHTML || '';

  // Get testimonials from the second div directly
  const testimonialsDiv = block.children[1];
  const testimonials = testimonialsDiv?.children || [];
  const testimonialsContent = [];

  // Process each testimonial div
  Array.from(testimonials).forEach((testimonial) => {
    const [picturePara, quotePara] = testimonial.querySelectorAll('p');
    const picture = picturePara?.querySelector('picture');

    if (picture && quotePara) {
      // Get the full HTML content and split by <br>
      const [quoteWithTags, author] = quotePara.innerHTML.split('<br>');
      // Remove quotes from start (^") and end ("$) of the string
      const quote = quoteWithTags.replace(/^"|"$/g, '');

      testimonialsContent.push({
        picture: picture.outerHTML,
        quote,
        author,
      });
    }
  });

  // Create new structure if we have testimonials
  if (testimonialsContent.length > 0) {
    const newHtml = `
      ${sectionTitle}
      <ul class="testimonials__list">
        ${testimonialsContent.map(testimonial => `
          <li class="testimonials__item">
            <div class="testimonials__media">
              ${testimonial.picture}
            </div>
            <blockquote class="testimonials__content">
                <p class="testimonials__quote">${testimonial.quote}</p>
                <cite class="testimonials__author">${testimonial.author}</cite>
            </blockquote>
          </li>
        `).join('')}
      </ul>
    `;

    block.innerHTML = newHtml;
  }
}
