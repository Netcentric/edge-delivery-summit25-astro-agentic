import {
  // loadHeader,
  // loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  loadCSS,
  getMetadata,
  waitForFirstImage,
  loadSection,
  loadSections,
} from './aem.js';

import {
  addPageHeader,
  addRestartJourneyLink,
  decorateHeroH1,
  decorateFocusPage,
} from './common.js';

function addSpeedInformation(info, containerElement, name, splitWords = false) {
  const infoElement = document.createElement('div');

  infoElement.classList.add('info');

  const texts = info.split(' ');
  const result = `<span class="info-number">${splitWords ? info : texts[0]}</span><span class="info-text">${splitWords ? name : texts.slice(1).join(' ')}</span>`;

  infoElement.innerHTML = result;
  containerElement.appendChild(infoElement);
}

function addShipSpecifications(specs, addIntroduction) {
  const infoContainer = document.createElement('div');
  const heroContainer = document.querySelector('.hero');

  if (specs.Range) {
    addSpeedInformation(specs.Range, infoContainer);
    addSpeedInformation(specs['Number of Passengers'].replace('to', '–').replaceAll(' ', ''), infoContainer, 'passengers', true);
    addSpeedInformation(specs.Length, infoContainer);
  }
  infoContainer.classList.add('info-container');
  heroContainer.append(infoContainer);

  const specContainer = document.createElement('div');
  specContainer.classList.add('spec-container');

  const introduction = addIntroduction ? `<h2>SPECIFICATIONS</h2><div><p>Learn more about the ${document.querySelector('h1').textContent} and its technical specifications.</p></div>` : '';
  const content = `${introduction}
  <div class="spec-table">
    <div class="spec-item">
      <div class="spec-title">Length</div>
      <div class="spec-value">${specs.Length}</div>
    </div>
    <div class="spec-item">
      <div class="spec-title">Width</div>
      <div class="spec-value">${specs.Width}</div>
    </div>
    <div class="spec-item">
      <div class="spec-title">Height</div>
      <div class="spec-value">${specs.Height}</div>
    </div>
    <div class="spec-item">
      <div class="spec-title">Weight</div>
      <div class="spec-value">${specs.Weight}</div>
    </div>
  </div>`;
  specContainer.innerHTML = content;

  const parentElement = document.querySelector('body .default-content-wrapper > div');
  parentElement.appendChild(specContainer);
}

function addProductSpecifications(specs) {
  const specContainer = document.createElement('div');
  specContainer.classList.add('product-spec-container');

  const content = `<table>
    <tr><td>Length</td><td>${specs.Length}</td></tr>
    <tr><td>Width</td><td>${specs.Width}</td></tr>
    <tr><td>Maximum Speed</td><td>${specs['Maximum Speed']}</td></tr>
    <tr><td>Range</td><td>${specs.Range}</td></tr>
  <table>`;
  specContainer.innerHTML = content;

  return specContainer;
}

async function prepareSpecification() {
  const isTemplate = (template) => document.body.classList.contains(template);
  const isProductFocus = isTemplate('product-focus');
  const isConfigurationResult = !isProductFocus && isTemplate('configuration-result');

  try {
    const configurationsPromise = isConfigurationResult && fetch('/configurations.json', { cache: 'no-cache' });

    if (!isProductFocus && !isConfigurationResult) {
      return;
    }
    const specificationPath = getMetadata('specifications');
    if (!specificationPath) {
      return;
    }
    const specificationUrl = new URL(specificationPath);
    const specificationsResponse = await fetch('/specifications/query-index.json');
    if (!specificationsResponse.ok) {
      return;
    }
    const specifications = await specificationsResponse.json();
    const findSpecification = (path) => specifications.data.find((s) => s.path === path);
    const specification = findSpecification(specificationUrl.pathname);
    if (!specification) {
      return;
    }

    const specificationsObj = JSON.parse(specification.specifications);

    if (isConfigurationResult) {
      addShipSpecifications(specificationsObj, !isConfigurationResult);
    } else /* if (isProductFocus) */ {
      const specContainer = addProductSpecifications(specificationsObj);
      const parentElement = document.querySelector('body .default-content-wrapper .sub-group');

      parentElement.appendChild(specContainer);
    }

    if (isConfigurationResult) {
      const productSpecificationUrl = getMetadata('product-specifications');

      if (productSpecificationUrl) {
        const productSpecification = findSpecification(new URL(productSpecificationUrl).pathname);

        document.body.dataset.productSpecification = productSpecification.specifications;

        if (productSpecification) {
          const specContainer = addProductSpecifications(
            JSON.parse(productSpecification.specifications),
          );
          const productDescription = document.querySelector('.default-content-wrapper > div > :nth-child(2 of .sub-group)');

          if (productDescription) {
            productDescription.append(specContainer);
          }
        }
      }
    }
    document.body.dataset.features = specification.features;
    document.body.dataset.specification = specification.specifications;

    if (configurationsPromise) {
      const configurationsResponse = await configurationsPromise;
      if (!configurationsResponse.ok) {
        return;
      }
      const configurations = await configurationsResponse.json();
      const configuration = configurations.data.find(
        (c) => c.configuration === window.location.pathname,
      );
      if (!configuration) {
        return;
      }
      document.querySelector('[id^="hello-traveler"]').textContent = `Hello ${configuration.firstName}`;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('could not load specifications', e);
  }
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    // buildHeroBlock(main);
    prepareSpecification(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  addPageHeader();
  decorateButtons(main);
  decorateIcons(main);
  decorateSections(main);
  decorateBlocks(main);
  // decorateHeroH1();
  addNarrowScreenDisclaimer();
  decorateFocusPage('product');
  decorateFocusPage('segment');
  buildAutoBlocks(main);
  addRestartJourneyLink();
}

function addNarrowScreenDisclaimer() {
  // Don't add disclaimer on focus pages
  if (document.body.classList.contains('product-focus') ||
      document.body.classList.contains('segment-focus')) {
    return;
  }

  const disclaimer = document.createElement('div');
  disclaimer.classList.add('narrow-screen-disclaimer');

  disclaimer.innerHTML = `
    <img src="https://agentic.innovationlab.cx/app/cognizant-moment-logo-BAdMWeoY.svg" alt="cognizant moment logo">
    <h1>Screen too small</h1>
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

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  // loadHeader(doc.querySelector('header'));
  // loadFooter(doc.querySelector('footer'));
  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
