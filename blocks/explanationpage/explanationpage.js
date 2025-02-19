export default function decorate(block) {

    // Create new structure
    const newHtml = `
        <div class="container">
                <section data-bgcolor="#bcb8ad" data-textcolor="#032f35">
                    <div>
                        <h1><span>Horizontal</span> <span>scroll</span> <span>section</span></h1>
                        <p>With CSS view-timeline</p>
                    </div>
                </section>

                <section id="sectionPin">
                    <div class="pin-wrap-sticky">
                        <div class="pin-wrap">
                            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
                            <img src=".https://plus.unsplash.com/premium_photo-1739955024115-e2d219766d49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" alt="">
                            <img src="https://images.unsplash.com/photo-1739911013843-0380d6504480?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
                            <img src="https://images.unsplash.com/photo-1739889399685-c73e63753981?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
                        </div>
                    </div>
                </section>

                <section data-bgcolor="#e3857a" data-textcolor="#f1dba7"><img src="../shared/pexels-photo-4791474.jpeg" alt="">
                    <h2 class="credit">
                        Created by <a href="https://twitter.com/bramus" target="_top" rel="noreferrer noopener">Bramus</a>.<br><br>Adapted from <a href="https://codepen.io/cameronknight/pen/qBNvrRQ" target="_top">the original by Cameron Knight</a>.</h2>
                </section>
            </div>
    `;

    block.innerHTML = newHtml;
  }
