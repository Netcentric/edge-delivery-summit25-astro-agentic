export default function decorate(block) {

    // Create new structure
    const newHtml = `
         <div class="container2">
		<section class="screen screen--1">
			<div>
				<h1>
					Unleash the Power<br>
					of <span>Human-AI Collaboration</span>
				</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Maiores ipsa odio ex tempore voluptatibus placeat sequi qui suscipit reprehenderit minus.
				</p>
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

		<section class="screen screen--3">
			<img src="https://images.unsplash.com/photo-1735348061620-81cf27a5b6ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
			<h2 class="credit">
				Created by Klevi.<br><br>Adapted from Bramus Tutorial</h2>
		</section>
		<section class="screen screen--4">
			4
		</section>
	</div>
    `;

    block.innerHTML = newHtml;
  }
