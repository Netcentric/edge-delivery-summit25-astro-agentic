export default function decorate(block) {
  block.classList.add('fullbleed');

  const links = block.querySelectorAll('a');

  links.forEach((link) => {
    if (link.classList.length > 0) {
      link.classList.value = '';
    }

    const picture = link.closest('li')?.querySelector('picture');

    if (picture) {
      link.innerHTML = '';
      link.appendChild(picture);
    }
  });
}
