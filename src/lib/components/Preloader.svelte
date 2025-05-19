<script>
  import { onMount } from 'svelte';

  // Use localStorage to track if this is the first visit
  let isFirstVisit = true;
  let visible = true;

  onMount(() => {
    // Check if this is the first visit
    isFirstVisit = !localStorage.getItem('hasVisitedBefore');

    // If it's the first visit, show the preloader and set the flag
    if (isFirstVisit) {
      setTimeout(() => {
        visible = false;
        localStorage.setItem('hasVisitedBefore', 'true');
      }, 2500); // Adjust timing as needed
    } else {
      // If not the first visit, hide the preloader immediately
      visible = false;
    }
  });
</script>

{#if visible && isFirstVisit}
  <div class="preloader">
    <div class="preloader-content">
      <div class="airplane">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="currentColor">
          <path d="M22,16L17,11V7A1,1 0 0,0 16,6H14A1,1 0 0,0 13,7V9L9,5A1.05,1.05 0 0,0 8,5A1.05,1.05 0 0,0 7,6L8,10L3,15H7L9,18H13L14,16H15L16,18H20L22,16Z" />
        </svg>
        <div class="flight-path"></div>
        <div class="cloud cloud-1"></div>
        <div class="cloud cloud-2"></div>
        <div class="cloud cloud-3"></div>
      </div>
      <div class="loading-text">
        <span>P</span>
        <span>r</span>
        <span>e</span>
        <span>p</span>
        <span>a</span>
        <span>r</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>&nbsp;</span>
        <span>y</span>
        <span>o</span>
        <span>u</span>
        <span>r</span>
        <span>&nbsp;</span>
        <span>j</span>
        <span>o</span>
        <span>u</span>
        <span>r</span>
        <span>n</span>
        <span>e</span>
        <span>y</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    view-transition-name: preloader;
  }

  .preloader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .airplane {
    position: relative;
    color: var(--color--prime);
    animation: fly 3s ease-in-out infinite;
    transform-origin: center center;
    z-index: 2;
    view-transition-name: airplane;
  }

  .flight-path {
    position: absolute;
    width: 120px;
    height: 2px;
    background: linear-gradient(to right, transparent, var(--color--prime), transparent);
    top: 50%;
    left: -120px;
    transform: translateY(-50%);
    z-index: 1;
    opacity: 0.6;
    animation: flightPath 2s linear infinite;
  }

  .cloud {
    position: absolute;
    background-color: var(--color--accent);
    border-radius: 50%;
    opacity: 0.8;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    view-transition-name: cloud;
  }

  .cloud:before,
  .cloud:after {
    content: '';
    position: absolute;
    background-color: var(--color--accent);
    border-radius: 50%;
  }

  .cloud-1 {
    width: 25px;
    height: 25px;
    top: -15px;
    left: -50px;
    animation: moveCloud 4s linear infinite;
  }

  .cloud-1:before {
    width: 15px;
    height: 15px;
    top: 5px;
    left: -8px;
  }

  .cloud-1:after {
    width: 20px;
    height: 20px;
    top: 0;
    left: 15px;
  }

  .cloud-2 {
    width: 35px;
    height: 35px;
    top: 25px;
    left: -70px;
    animation: moveCloud 6s linear infinite;
    animation-delay: 0.5s;
  }

  .cloud-2:before {
    width: 25px;
    height: 25px;
    top: 5px;
    left: -10px;
  }

  .cloud-2:after {
    width: 20px;
    height: 20px;
    top: 0;
    left: 25px;
  }

  .cloud-3 {
    width: 20px;
    height: 20px;
    top: 0;
    left: -90px;
    animation: moveCloud 5s linear infinite;
    animation-delay: 1s;
  }

  .cloud-3:before {
    width: 15px;
    height: 15px;
    top: 5px;
    left: -5px;
  }

  .cloud-3:after {
    width: 15px;
    height: 15px;
    top: 0;
    left: 15px;
  }

  .loading-text {
    margin-top: 20px;
    font-family: var(--font-family--body);
    color: var(--color--black);
    font-size: 18px;
    letter-spacing: 2px;
    view-transition-name: loading-text;
  }

  .loading-text span {
    display: inline-block;
    animation: pulse 1.5s ease-in-out infinite;
    animation-delay: calc(0.1s * var(--i));
  }

  .loading-text span:nth-child(1) { --i: 1; }
  .loading-text span:nth-child(2) { --i: 2; }
  .loading-text span:nth-child(3) { --i: 3; }
  .loading-text span:nth-child(4) { --i: 4; }
  .loading-text span:nth-child(5) { --i: 5; }
  .loading-text span:nth-child(6) { --i: 6; }
  .loading-text span:nth-child(7) { --i: 7; }
  .loading-text span:nth-child(8) { --i: 8; }
  .loading-text span:nth-child(9) { --i: 9; }
  .loading-text span:nth-child(10) { --i: 10; }
  .loading-text span:nth-child(11) { --i: 11; }
  .loading-text span:nth-child(12) { --i: 12; }
  .loading-text span:nth-child(13) { --i: 13; }
  .loading-text span:nth-child(14) { --i: 14; }
  .loading-text span:nth-child(15) { --i: 15; }
  .loading-text span:nth-child(16) { --i: 16; }
  .loading-text span:nth-child(17) { --i: 17; }
  .loading-text span:nth-child(18) { --i: 18; }
  .loading-text span:nth-child(19) { --i: 19; }
  .loading-text span:nth-child(20) { --i: 20; }
  .loading-text span:nth-child(21) { --i: 21; }
  .loading-text span:nth-child(22) { --i: 22; }
  .loading-text span:nth-child(23) { --i: 23; }
  .loading-text span:nth-child(24) { --i: 24; }
  .loading-text span:nth-child(25) { --i: 25; }

  @keyframes fly {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    25% {
      transform: translateY(-10px) rotate(2deg);
    }
    50% {
      transform: translateY(-15px) rotate(5deg);
    }
    75% {
      transform: translateY(-5px) rotate(3deg);
    }
  }

  @keyframes flightPath {
    0% {
      opacity: 0;
      transform: translateY(-50%) scaleX(0.7);
    }
    50% {
      opacity: 0.6;
      transform: translateY(-50%) scaleX(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-50%) scaleX(0.7);
    }
  }

  @keyframes moveCloud {
    0% {
      transform: translateX(0);
      opacity: 0;
    }
    20% {
      opacity: 0.8;
    }
    80% {
      opacity: 0.8;
    }
    100% {
      transform: translateX(150px);
      opacity: 0;
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(0.9);
      opacity: 0.7;
    }
  }

  /* Respect user's motion preferences */
  @media (prefers-reduced-motion) {
    .airplane, .flight-path, .cloud, .loading-text span {
      animation: none !important;
    }
  }
</style>
