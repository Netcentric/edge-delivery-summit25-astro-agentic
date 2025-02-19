export default function decorate(block) {
  block.classList.add('fullbleed');

  // Get and process section title
  const titleWrapper = block.children[0];
  const titleElement = titleWrapper?.querySelector('h2');
  titleElement?.classList.add('testimonials__title');
  const sectionTitle = titleElement?.outerHTML || '';

  // Get testimonials from the second div's children
  const testimonialsWrapper = block.children[1];
  const testimonials = Array.from(testimonialsWrapper?.children || []);
  const testimonialsContent = [];

  // Process each testimonial div
  testimonials.forEach((testimonial) => {
    if (!testimonial) return;

    const [picturePara, quotePara, authorPara] = testimonial.querySelectorAll('p');
    const picture = picturePara?.querySelector('picture');

    if (picture && quotePara && authorPara) {
      testimonialsContent.push({
        picture: picture.outerHTML,
        quote: quotePara.textContent,
        author: authorPara.textContent,
      });
    }
  });

  // Create new structure if we have testimonials
  if (testimonialsContent.length > 0) {
    const newHtml = `
      ${sectionTitle}
      <ul class="testimonials__list">
        ${testimonialsContent.map((testimonial) => `
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
