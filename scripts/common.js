function decorateHeroH1() {
  const parentElement = document.querySelector('body.ship-focus, body.configuration-result');

  if (parentElement) {
    const spaceshipFocusPageH1Element = parentElement.querySelector('.default-content-wrapper h1');

    if (spaceshipFocusPageH1Element) {
      const innerText = spaceshipFocusPageH1Element.textContent.trim();
      const arr = innerText.split(' ');
      const result = `<span class="indent">${arr.join(' </span><span class="indent">')}</span>`;

      spaceshipFocusPageH1Element.innerHTML = result;
    }
  }
}

function addPageHeader() {
  const isConfigurationResultPage = document.body.classList.contains('configuration-result');

  if (isConfigurationResultPage) {
    const headerElement = document.querySelector('header');

    headerElement.innerHTML = `
      <div class="wrapper">
        <a href="https://astrocraft.innovationlab.cx/">
          <img src="/icons/logo.svg" alt="" />
          <img src="/icons/wordmark-cognizant.svg" alt="" />
        </a>
        <div>
          <span class="font-gellix font-semibold leading-5">
            Solari Astrocraft
          </span>
        </div>
      </div>
    `;
  }
}

function addRestartJourneyLink() {
  const isConfigurationResultPage = document.body.classList.contains('configuration-result');

  if (isConfigurationResultPage) {
    const containerElement = document.querySelector('main .default-content-wrapper');
    const restartJourneyLink = document.createElement('a');

    restartJourneyLink.classList.add('button');
    restartJourneyLink.classList.add('float-right');
    restartJourneyLink.classList.add('icon-arrow-right');
    restartJourneyLink.setAttribute('href', 'https://astrocraft.innovationlab.cx');
    restartJourneyLink.innerHTML = 'Start a new configuration';

    if (containerElement) {
      containerElement.append(restartJourneyLink);
    }
  }
}

function decorateFocusPage(pageType) {
  const parentElement = document.querySelector(`body.${pageType}-focus .default-content-wrapper`);

  if (!parentElement) {
    return;
  }

  const productTitleWrapper = document.createElement('h2');
  const groupElement = document.createElement('div');
  const subGroupElement = document.createElement('div');

  // Get all content elements in order
  const elements = Array.from(parentElement.children);

  // Find the picture paragraph (first p containing img)
  const pictureParagraph = parentElement.querySelector('p:has(img)');

  groupElement.classList.add('group');
  subGroupElement.classList.add('sub-group');

  const urlParams = new URLSearchParams(window.location.search);
  const selectedProductParam = urlParams.get('selectedProduct');

  if (selectedProductParam) {
    productTitleWrapper.innerHTML = `Selected product: ${selectedProductParam}`;
    groupElement.appendChild(productTitleWrapper);
  }

  // Move all elements except the picture paragraph to subgroup
  elements.forEach(element => {
    if (element !== pictureParagraph) {
      subGroupElement.appendChild(element);
    }
  });

  // Add specifications if they exist
  const specifications = document.querySelector('.specifications-wrapper');
  if (specifications) {
    subGroupElement.appendChild(specifications);
  }

  groupElement.appendChild(subGroupElement);

  // Clear parent and reconstruct in correct order
  parentElement.innerHTML = '';
  if (pictureParagraph) {
    parentElement.appendChild(pictureParagraph);
  }
  parentElement.appendChild(groupElement);
}

export {
  addRestartJourneyLink,
  decorateHeroH1,
  addPageHeader,
  decorateFocusPage,
};
