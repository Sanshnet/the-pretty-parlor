// Handle all service selectors
document.addEventListener('DOMContentLoaded', function() {
  // Braiding selections
  const braidStyle = document.getElementById('braid-style');
  const extensionType = document.getElementById('extension-type');
  
  // Microblading option clicks
  document.querySelectorAll('.microblading-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.microblading-option').forEach(opt => 
        opt.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // Manicure add-ons
  document.querySelectorAll('.addon-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      this.nextElementSibling.classList.toggle('active', this.checked);
    });
  });

  // Universal booking button
  document.querySelectorAll('.book-now').forEach(button => {
    button.addEventListener('click', function() {
      let service = this.dataset.service;
      let details = "";

      // Braiding details
      if (service === "Braiding") {
        details = `Style: ${braidStyle.value} | Extensions: ${extensionType.value}`;
      }
      
      // Microblading details
      if (service === "Microblading") {
        const selected = document.querySelector('.microblading-option.selected');
        details = selected ? selected.textContent : "Not specified";
      }

      // Manicure details
      if (service === "Manicure") {
        const selectedAddons = Array.from(document.querySelectorAll('.addon-checkbox:checked'))
                                 .map(cb => cb.nextElementSibling.textContent)
                                 .join(", ");
        details = selectedAddons ? `Add-ons: ${selectedAddons}` : "No add-ons";
      }

      localStorage.setItem('bookingDetails', 
        `Service: ${service} | ${details}`);
      window.location.href = "../contact.html";
    });
  });
});