<script>
  import Notification from '$lib/components/Notification.svelte';
  import emailjs from '@emailjs/browser';
  import { onMount } from 'svelte';

  // Import EmailJS environment variables
  import {
    PUBLIC_EMAILJS_SERVICE_ID,
    PUBLIC_EMAILJS_TEMPLATE_ID,
    PUBLIC_EMAILJS_PUBLIC_KEY
  } from '$env/static/public';

  // Props for customization
  export let title = 'Get a Free Visa Assessment';
  export let recipientEmail = 'info@almuqadam.com';
  export let showTitle = true;
  export let customClass = '';

  // Form fields
  let fullName = '';
  let emailInput = '';
  let phone = '';
  let currentVisaStatus = '';
  let visaNeeded = '';
  let message = '';
  let contactConsent = false;
  let isSubmitting = false;

  // Notification state
  let showNotification = false;
  let notificationMessage = '';

  // Initialize EmailJS
  onMount(() => {
    emailjs.init(PUBLIC_EMAILJS_PUBLIC_KEY);
  });

  async function handleSubmit() {
    try {
      // Set loading state
      isSubmitting = true;

      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: fullName,
        from_email: emailInput,
        phone: phone || 'Not provided',
        current_visa_status: currentVisaStatus || 'Not provided',
        visa_needed: visaNeeded,
        message: message || 'No message provided',
        contact_consent: contactConsent ? 'Yes' : 'No',
        to_email: recipientEmail
      };

      // Send email using EmailJS directly from the client
      const result = await emailjs.send(
        PUBLIC_EMAILJS_SERVICE_ID,
        PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('Email sent successfully:', result.text);

      // Reset form fields
      fullName = '';
      emailInput = '';
      phone = '';
      currentVisaStatus = '';
      visaNeeded = '';
      message = '';
      contactConsent = false;

      // Show success notification
      notificationMessage = 'Thank you! Your message has been received. We\'ll get back to you shortly.';
      showNotification = true;

      // Notification will auto-hide after the duration set in the component
    } catch (error) {
      console.error('Error submitting form:', error);
      notificationMessage = 'There was an error sending your message. Please try again or contact us directly by phone.';
      showNotification = true;
    } finally {
      // Reset loading state
      isSubmitting = false;
    }
  }
</script>

<div class={customClass}>
  {#if showTitle}
    <h4 class="mb-6 text-primary-1">{title}</h4>
  {/if}

  <form on:submit|preventDefault={handleSubmit} class="w-form">
    <div class="grid-contact-form-inner">
      <div>
        <label for="fullName" class="sr-only">Full Name</label>
        <input
          type="text"
          class="form-input w-input"
          maxlength="256"
          name="fullName"
          id="fullName"
          placeholder="Full Name"
          aria-label="Full Name"
          required
          bind:value={fullName}
        />
      </div>
      <div>
        <label for="email" class="sr-only">Email Address</label>
        <input
          type="email"
          class="form-input w-input"
          maxlength="256"
          name="email"
          id="email"
          placeholder="Email Address"
          aria-label="Email Address"
          required
          bind:value={emailInput}
        />
      </div>
    </div>
    <div class="grid-contact-form-inner mb-0">
      <div>
        <label for="phone" class="sr-only">Phone Number</label>
        <input
          type="tel"
          class="form-input w-input"
          maxlength="256"
          name="phone"
          id="phone"
          placeholder="Phone Number"
          aria-label="Phone Number"
          bind:value={phone}
        />
      </div>
      <div>
        <label for="currentVisaStatus" class="sr-only">Current Visa Status</label>
        <select
          class="form-input w-input"
          name="currentVisaStatus"
          id="currentVisaStatus"
          aria-label="Current Visa Status"
          bind:value={currentVisaStatus}>
          <option value="" disabled selected>Current Visa Status</option>
          <option value="student">Student</option>
          <option value="work">Work Permit</option>
          <option value="tourist">Tourist</option>
          <option value="none">None</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
    <div class="mb-4">
      <label for="visaNeeded" class="sr-only">Which visa do you need?</label>
      <select
        class="form-input w-input"
        name="visaNeeded"
        id="visaNeeded"
        aria-label="Which visa do you need?"
        required
        bind:value={visaNeeded}>
        <option value="" disabled selected>Which visa do you need?</option>
        <option value="schengen">Schengen</option>
        <option value="usa">USA</option>
        <option value="australia">Australia</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div class="mb-5">
      <label for="message" class="sr-only">Short Message</label>
      <textarea
        class="form-input form-textarea w-input"
        maxlength="5000"
        name="message"
        id="message"
        placeholder="Short Message (optional)"
        aria-label="Short Message"
        bind:value={message}
      ></textarea>
    </div>

    <div class="mb-5">
      <label class="flex items-center gap-2">
        <input
          type="checkbox"
          name="contactConsent"
          id="contactConsent"
          required
          bind:checked={contactConsent}
        />
        <span>I agree to be contacted for visa assistance.</span>
      </label>
    </div>

    <button type="submit" class="button-gradient w-button" disabled={isSubmitting}>
      {isSubmitting ? 'Sending...' : 'Send Message'}
    </button>
  </form>

  <!-- Notification component -->
  <Notification
    type="success"
    message={notificationMessage}
    bind:show={showNotification}
    duration={5000}
  />
</div>
