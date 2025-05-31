<script>
  import Notification from '$lib/components/Notification.svelte';
  import { onMount } from 'svelte';

  // Props for customization
  export let title = 'Get a Free Visa Assessment';
  export let recipientEmail = 'info@almuqadam.uk'; // Updated default email to match SMTP_USER
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

  async function handleSubmit() {
    try {
      // Set loading state
      isSubmitting = true;

      // Prepare form data
      const formData = {
        from_name: fullName,
        from_email: emailInput,
        phone: phone || 'Not provided',
        current_visa_status: currentVisaStatus || 'Not provided',
        visa_needed: visaNeeded,
        message: message || 'No message provided',
        contact_consent: contactConsent ? 'Yes' : 'No',
        to_email: recipientEmail
      };

      // Send to server endpoint instead of EmailJS
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!result.success) throw new Error(result.error || 'Failed to send email');

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
    } catch (error) {
      console.error('Error submitting form:', error);
      notificationMessage = 'There was an error sending your message. Please try again or contact us directly by phone.';
      showNotification = true;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class={customClass}>
  {#if showTitle}
    <h4 class="mb-6 text-prime">{title}</h4>
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
          required
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
          <option value="psw">PSW</option>
          <option value="student">Student</option>
          <option value="independent">Independent</option>
          <option value="skilled-worker">Skilled Worker</option>
        
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
        <option value="canada">Canada</option>
        <option value="united-states">United States</option>
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
      <label class="flex items-top gap-2">
        <input
        class="mt-1"
          type="checkbox"
          name="contactConsent"
          id="contactConsent"
          required
          bind:checked={contactConsent}
        />
        <span >I agree to be contacted for visa assistance.</span>
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
