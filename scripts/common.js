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

  const subGroupElement = document.createElement('div');
  const selectedItemElement = document.createElement('h2');
  selectedItemElement.classList.add('content__header');

  // Get all content elements in order
  const elements = Array.from(parentElement.children);

  const pictureParagraph = parentElement.querySelector('p:has(img)');
  pictureParagraph?.classList.add('content__image');

  subGroupElement.classList.add('content__body');

  // Move all elements except the picture paragraph to __body
  elements.forEach((element) => {
    if (element !== pictureParagraph) {
      subGroupElement.appendChild(element);
    }
  });

  // Add specifications if they exist
  const specifications = document.querySelector('.specifications-wrapper');
  if (specifications) {
    subGroupElement.appendChild(specifications);
  }

  // Clear parent and reconstruct in correct order
  parentElement.innerHTML = '';
  if (pictureParagraph) {
    parentElement.appendChild(pictureParagraph);
  }
  // Add the h2 and subgroup directly to parent
  const urlParams = new URLSearchParams(window.location.search);
  const currentSelectionParam = urlParams.get('currentSelection');
  if (currentSelectionParam) {
    selectedItemElement.innerHTML = `Current Selection: ${currentSelectionParam}`;
  }
  parentElement.appendChild(selectedItemElement);
  parentElement.appendChild(subGroupElement);
}

function addNarrowScreenDisclaimer() {
  // Don't add disclaimer on focus pages
  if (document.body.classList.contains('product-focus')
      || document.body.classList.contains('segment-focus')) {
    return;
  }

  const disclaimer = document.createElement('div');
  disclaimer.classList.add('narrow-screen-disclaimer');

  disclaimer.innerHTML = `
    <img src="https://agentic.innovationlab.cx/app/cognizant-moment-logo-BAdMWeoY.svg" alt="cognizant moment logo">
    <h1>AstroPure Agentic Force</h1>
    <h2>Screen too small</h2>
    <div class="icon">
      <svg width="154" height="91" viewBox="0 0 154 91" fill="none">
        <path d="M71.2016 11.4019C71.2791 10.4657 70.5829 9.64388 69.6467 9.56639C68.7105 9.48891 67.8887 10.1851 67.8112 11.1213C67.7337 12.0575 68.4299 12.8793 69.3661 12.9568C70.3024 13.0343 71.1241 12.3381 71.2016 11.4019Z" fill="currentColor"/>
        <path d="M15.725 78.7851V6.63207C15.725 4.07407 17.799 2.00007 20.357 2.00007H118.658C121.216 2.00007 123.29 4.07407 123.29 6.63207V17.3401" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M100.489 78.642H1.857L5.052 84.394C6.355 86.739 8.826 88.193 11.508 88.193H101.343" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M107.521 80.754H151.857" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M107.521 31.789H151.857" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M148.379 24.241H110.999C109.078 24.241 107.521 25.7982 107.521 27.719V84.715C107.521 86.6358 109.078 88.193 110.999 88.193H148.379C150.3 88.193 151.857 86.6358 151.857 84.715V27.719C151.857 25.7982 150.3 24.241 148.379 24.241Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <p>Your screen size is a bit too small for this adventure.</p>
    <p>Please switch to a larger display for the best experience.</p>
  `;

  document.querySelector('main')?.appendChild(disclaimer);
}

export {
  addRestartJourneyLink,
  decorateHeroH1,
  addPageHeader,
  decorateFocusPage,
  addNarrowScreenDisclaimer,
};
