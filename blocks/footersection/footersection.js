export default function decorate(block) {
  block.classList.add('fullbleed');

  const links = block.querySelectorAll('a');

  links.forEach((link) => {
    if (link.classList.length > 0) {
      link.classList.value = ''; // Clear all classes
    }

    // Find the closest <picture> element to the <a> tag
    const picture = link.closest('li')?.querySelector('picture');

    if (picture) {
      // Move the <picture> element inside the <a> tag
      link.innerHTML = ''; // Remove any existing text or elements inside the <a> tag
      link.appendChild(picture);
    }
  });
}