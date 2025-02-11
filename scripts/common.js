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

  groupElement.classList.add('group');
  subGroupElement.classList.add('sub-group');

  const urlParams = new URLSearchParams(window.location.search);
  const baseModelParam = urlParams.get('baseModel');

  if (baseModelParam) {
    productTitleWrapper.innerHTML = `Selected product: ${baseModelParam}`;
  }

  if (focusH1) {
    groupElement.appendChild(productTitleWrapper);
  }
  if (focusH1) {
    subGroupElement.appendChild(focusH1);
  }
  if (focusH2) {
    subGroupElement.appendChild(focusH2);
  }
  if (description) {
    subGroupElement.appendChild(description);
  }

  groupElement.appendChild(subGroupElement);

  parentElement.appendChild(groupElement);
}

function decorateGroups() {
  const parentElement = document.querySelector('body.ship-focus .default-content-wrapper, body.configuration-result .default-content-wrapper');

  if (!parentElement) {
    return;
  }

  const isConfigurationResultPage = document.body.classList.contains('configuration-result');
  const groupContainer = document.createElement('div');
  const subcontainer = document.createElement('div');
  let currentComponentGroup = document.createElement('div');
  let isCard = false;
  let child = parentElement.firstChild;
  let isPrevHeading = false;

  subcontainer.classList.add('blocks');
  currentComponentGroup.classList.add('hero');

  while (child) {
    if (currentComponentGroup.children.length > 0) {
      if (!isPrevHeading) {
        switch (child.nodeName) {
          case 'H1':
            groupContainer.appendChild(currentComponentGroup);
            currentComponentGroup = document.createElement('div');
            isPrevHeading = true;
            break;
          case 'H2':
            groupContainer.appendChild(currentComponentGroup);
            currentComponentGroup = document.createElement('div');
            currentComponentGroup.classList.add('sub-group'); // Becomes sub-group
            isPrevHeading = true;
            break;
          case 'H3':
            if (isCard && !isConfigurationResultPage) {
              subcontainer.appendChild(currentComponentGroup);
            } else {
              groupContainer.appendChild(currentComponentGroup);
            }
            currentComponentGroup = document.createElement('div');
            currentComponentGroup.classList.add('block'); // Becomes block
            isCard = true;
            isPrevHeading = true;
            break;
          default:
            isPrevHeading = false;
            break;
        }
      } else {
        isPrevHeading = false;
      }
      currentComponentGroup.appendChild(child);
    } else {
      currentComponentGroup.appendChild(child);
    }
    child = parentElement.firstChild;

    if (isConfigurationResultPage && currentComponentGroup.children.length === 1 && child.nodeName === 'H2') {
      currentComponentGroup.appendChild(child);
      child = parentElement.firstChild;
    }

    if (!child) {
      subcontainer.appendChild(currentComponentGroup);
      groupContainer.appendChild(subcontainer);
    }
  }

  if (isConfigurationResultPage) {
    const lastGroup = groupContainer.querySelector('div :nth-last-child(1 of .block)');

    if (lastGroup) {
      lastGroup.classList.add('last');
    }
  }

  parentElement.appendChild(groupContainer);
}

export {
  addRestartJourneyLink,
  decorateHeroH1,
  addPageHeader,
  decorateFocusPage,
  decorateGroups,
};
