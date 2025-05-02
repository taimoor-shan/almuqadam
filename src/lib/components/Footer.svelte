<script>
  import { onMount } from 'svelte';
  import { fetchJSON } from '$lib/util';
  import NotEditable from '$lib/components/NotEditable.svelte';

  export let counter;
  let count;

  onMount(async () => {
    if (counter) {
      const result = await fetchJSON('GET', `/api/counter?c=${counter}`);
      count = result.count;
    }
  });
</script>

<NotEditable>
  <footer class="footer">
    <div class="w-layout-blockcontainer container w-container">
      <div class="w-layout-grid grid-footer">
        <div id="w-node-_7c3bf295-6060-045d-7271-bf484b242481-ecf59ae5" class="footer-logo-item"><a href="index.html" class="footer-logo-wrap w-inline-block"><img loading="eager" src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778b7076f30c5e95cc58e46_visahub-white.svg" alt="Visahub white logo" class="footer-logo" /></a>
          <div class="no-margin w-form">
            <form id="wf-form-Footer-Subscribe-Form" name="wf-form-Footer-Subscribe-Form" data-name="Footer Subscribe Form" method="get" data-wf-page-id="677b87814b270850a98a51f3" data-wf-element-id="af04f538-b775-d2ff-f300-5926dedb5e3a">
              <h2 class="footer-subscribe-title">Subscribe to our newsletter</h2>
              <div class="footer-form"><input class="form-input form-input-footer w-input" maxlength="256" name="Footer-Email" data-name="Footer Email" placeholder="Enter your email address" type="email" id="Footer-Email" required="" /><input type="submit" data-wait="" aria-label="button" class="footer-form-button w-button" value="" /></div>
            </form>
            <div class="success-message w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div class="error-message w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
        <div class="grid-footer-link">
          <div class="footer-link-item-wrap">
            <h2 class="footer-item-title">Pages</h2>
            <div class="grid-footer-link-wrap">
              <div class="grid-footer-link-inner"><a href="index.html" class="footer-simple-link">Home </a><a href="home-2.html" class="footer-simple-link">Home 2</a><a href="immigration.html" class="footer-simple-link">Immigration</a><a href="visas.html" class="footer-simple-link">Visas</a><a href="countries.html" class="footer-simple-link">Countries</a><a href="case-studies.html" class="footer-simple-link">Case Studies</a></div>
              <div class="grid-footer-link-inner"><a href="testimonials.html" class="footer-simple-link">Testimonials</a><a href="agents.html" class="footer-simple-link">Agents</a><a href="about.html" aria-current="page" class="footer-simple-link w--current">About</a><a href="blog.html" class="footer-simple-link">Blog</a><a href="contact.html" class="footer-simple-link">Contact</a><a href="privacy-policy.html" class="footer-simple-link">Privacy Policy</a></div>
            </div>
          </div>
          <div class="footer-link-item-wrap">
            <h2 class="footer-item-title">Utility</h2>
            <div class="grid-footer-link-wrap">
              <div class="grid-footer-link-inner"><a href="utility-pages/style-guide.html" class="footer-simple-link">Style Guide</a><a href="utility-pages/instructions.html" class="footer-simple-link">Instructions</a><a href="utility-pages/licenses.html" class="footer-simple-link">Licenses</a><a href="utility-pages/changelog.html" class="footer-simple-link">Changelog</a><a href="utility-pages/coming-soon.html" class="footer-simple-link">Coming Soon</a></div>
              <div class="grid-footer-link-inner"><a href="utility-pages/link-in-bio.html" class="footer-simple-link">Link in Bio</a><a href="401.html" class="footer-simple-link">Password Protected</a><a href="404.html" class="footer-simple-link">Error 404</a></div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-layout-grid grid-footer-contact">
        <div id="w-node-_07b30d10-699d-b2dc-c1b2-f6cde3af0c94-ecf59ae5" class="footer-link-item-wrap">
          <h2 class="footer-item-title">Contact on</h2>
          <div class="contact-wrap"><a href="tel:(91)125879786" class="contact-link">(91) 125 879 786</a><a href="tel:(+85)578666333" class="contact-link">(+85) 578 666 333</a><a href="mailto:example@gmail.com" class="contact-link">example@gmail.com</a></div>
        </div>
        <div id="w-node-d70db279-fe22-48cf-776b-954ca665c3ed-ecf59ae5" class="footer-link-item-wrap">
          <h2 class="footer-item-title">Office location</h2>
          <div class="footer-address-wrap"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778c8c269cc7a0553111f1e_icon-02.svg" loading="eager" alt="Icon 02" class="footer-address-icon" />
            <div class="footer-address-list">
              <div><span class="text-white">Las Vegas</span> - 4th Floor, Plot No.22,145 Murphy Canyon Rd.</div>
              <div>Mon-Sat: <span class="text-white">9 AM – 6 PM</span></div>
              <div>Sunday: <span class="text-white">Closed</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">Designed by <a href="https://webestica.com/" target="_blank" class="copyright-link">Webestica</a>, Powered by <a href="https://webflow.com/" target="_blank" class="copyright-link">Webflow</a></p>
        <div class="social-list"><a href="https://www.facebook.com/" target="_blank" class="social-link w-inline-block"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778ca6f0d350d174adda102_facebook.svg" loading="eager" alt="Facebook icon" class="social-icon" /></a><a href="https://instagram.com/" target="_blank" class="social-link w-inline-block"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778ca6f3f581fa54c9b7302_instagram.svg" loading="eager" alt="Instagram icon" class="social-icon" /></a><a href="https://x.com/" target="_blank" class="social-link w-inline-block"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778ca6ff49358dd4d032d5a_x.svg" loading="eager" alt="X icon" class="social-icon" /></a><a href="https://www.linkedin.com/" target="_blank" class="social-link w-inline-block"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778ca6f69cc7a055311c6a2_linkedin.svg" loading="eager" alt="Linkedin icon" class="social-icon" /></a></div>
      </div>
    </div>
  </footer>
  <a href="https://webflow.com/templates/designers/webestica" target="_blank" class="more-templates w-inline-block"><img src="https://cdn.prod.website-files.com/6360b7ce770ddeb3770f652f/63a59d6f6df355075be6d82a_wbs-icon.svg" loading="eager" width="22" height="22" alt="" />
    <div>More Templates</div>
  </a>
</NotEditable>
