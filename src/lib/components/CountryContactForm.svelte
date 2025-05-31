<script>
  import Notification from '$lib/components/Notification.svelte';

  // Props for customization
  export let recipientEmail = 'info@almuqadam.uk'; // Updated to match SMTP_USER
  export let showTitle = true;
  export let customClass = '';
  export let countryName = ''; // New prop for country name

  // Dynamically create title based on country name
  $: formTitle = countryName ? `${countryName} Visa Inquiry` : 'Get a Free Visa Assessment';

  // Form fields
  let fullName = '';
  let phone = '';
  let currentVisaStatus = '';
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
        from_email: 'No email provided', // We don't collect email in this form
        phone: phone || 'Not provided',
        current_visa_status: currentVisaStatus || 'Not provided',
        country_name: countryName, // Include country name in the email
        message: message || 'No message provided',
        contact_consent: contactConsent ? 'Yes' : 'No',
        to_email: recipientEmail,
        subject: `${countryName} Visa Inquiry from ${fullName}` // Custom subject with country name
      };

      // Send to server endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!result.success) throw new Error(result.error || 'Failed to send email');

      console.log('Email sent successfully!');

      // Reset form fields
      fullName = '';
      phone = '';
      currentVisaStatus = '';
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
    <h2 class="mb-6 sidebar-title-inline">{formTitle}</h2>
    
  {/if}

  <form on:submit|preventDefault={handleSubmit} class="w-form">
    <div class="countryFormInner">
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
          <option value="psw">PSW</option>
          <option value="student">Student</option>
          <option value="independent">Independent</option>
          <option value="skilled-worker">Skilled Worker</option>
        </select>
      </div>
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
      <label class="flex items-top gap-3">
        <input
        class="mt-1"
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
      {isSubmitting ? 'Sending...' : 'Submit'}
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
