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
  const focusH1 = document.querySelector(`body.${pageType}-focus .default-content-wrapper > h1:first-child`);

  if (!parentElement) {
    return;
  }

  const productTitleWrapper = document.createElement('h2');
  const groupElement = document.createElement('div');
  const subGroupElement = document.createElement('div');
  const focusH2 = parentElement.querySelector('h2');
  const description = parentElement.querySelector('p:last-child');
  const focusList = parentElement.querySelector('ul');
  const specifications = document.querySelector('.specifications-wrapper');

  groupElement.classList.add('group');
  subGroupElement.classList.add('sub-group');

  const urlParams = new URLSearchParams(window.location.search);
  const selectedProductParam = urlParams.get('selectedProduct');

  if (selectedProductParam) {
    productTitleWrapper.innerHTML = `Selected product: ${selectedProductParam}`;
  }

  if (focusH1) {
    groupElement.appendChild(productTitleWrapper);

    subGroupElement.appendChild(focusH1);
  }
  if (focusH2) {
    subGroupElement.appendChild(focusH2);
  }
  if (focusList) {
    subGroupElement.appendChild(focusList);
  }
  if (description) {
    subGroupElement.appendChild(description);
  }
  if (specifications) {
    subGroupElement.appendChild(specifications);
  }

  groupElement.appendChild(subGroupElement);

  parentElement.appendChild(groupElement);
}

export {
  addRestartJourneyLink,
  decorateHeroH1,
  addPageHeader,
  decorateFocusPage,
};
