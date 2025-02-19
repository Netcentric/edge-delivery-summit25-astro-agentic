export default function decorate(block) {
  block.classList.add('fullbleed');

  // Get the inner elements
  const [imageWrapper, contentWrapper] = block.firstElementChild.children;
  const picture = imageWrapper.querySelector('picture');

  // Clear the block's content
  block.innerHTML = '';

  // Create new structure
  const heroImage = document.createElement('div');
  heroImage.classList.add('hero__image');
  heroImage.appendChild(picture);

  const heroBody = document.createElement('div');
  heroBody.classList.add('hero__body');
  // Move all content from the second div into hero__body
  while (contentWrapper.firstChild) {
    heroBody.appendChild(contentWrapper.firstChild);
  }

  // Add new structure to block
  block.appendChild(heroImage);
  block.appendChild(heroBody);
}
