export default function decorate(block) {
  block.classList.add('fullbleed');

  // Get title div (first child) and testimonial divs (rest of children)
  const [titleDiv, ...testimonialDivs] = block.children;
  const testimonialsContent = [];

  console.log('testimonialDivs:', testimonialDivs);

  // Process each testimonial div
  testimonialDivs.forEach((testimonial) => {
    const [pictureDiv, quoteDiv, authorDiv] = testimonial.children;

    console.log('Divs:', { pictureDiv, quoteDiv, authorDiv });

    const picture = pictureDiv?.querySelector('picture');
    const quote = quoteDiv?.querySelector('p')?.textContent;
    const author = authorDiv?.querySelector('p')?.textContent;

    if (picture && quote && author) {
      testimonialsContent.push({
        picture: picture.outerHTML,
        quote,
        author
      });
    }
  });

  // Create new structure if we have testimonials
  if (testimonialsContent.length > 0) {
    const newHtml = `
      ${titleDiv.outerHTML}
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
