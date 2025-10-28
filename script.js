// Generic function to open any modal
function openModal(modalId) {
            const modal = document.getElementById(modalId);
            // Query the content element using the data-attribute inside the specific modal
            const content = modal.querySelector('[data-modal-content]'); 
            
            if (modal && content) {
                modal.classList.remove('hidden');
                // Force a reflow to ensure transitions run
                void modal.offsetWidth; 
                modal.classList.add('opacity-100');
                content.classList.remove('scale-95', 'opacity-0');
                content.classList.add('scale-100', 'opacity-100');
            }
}

// Generic function to close any modal
function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            // Query the content element using the data-attribute inside the specific modal
            const content = modal.querySelector('[data-modal-content]');

            if (modal && content) {
                // Start reverse transition
                modal.classList.remove('opacity-100');
                content.classList.remove('scale-100', 'opacity-100');
                content.classList.add('scale-95', 'opacity-0');

                // Hide modal after transition completes (300ms)
                setTimeout(() => {
                    modal.classList.add('hidden');
                }, 300);
            }
}

// Function to close the first modal and open the second
function showNewPasswordModal() {
            closeModal('resetModal'); 
            // Small delay (150ms) to allow the first modal's closing animation to look smooth
            setTimeout(() => {
                openModal('newPasswordModal'); 
            }, 150);
}

// Close modal when clicking outside the content box
document.getElementById('resetModal').addEventListener('click', function(e) {
            if (e.target.id === 'resetModal') {
                closeModal('resetModal');
            }
});
document.getElementById('newPasswordModal').addEventListener('click', function(e) {
            if (e.target.id === 'newPasswordModal') {
                closeModal('newPasswordModal');
            }
});


// slider for the login-registration animation
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('image-slider');
    const imagePanelText = document.getElementById('image-panel-text');
    const currentTextContent = document.getElementById('current-text-content');
    
    // // Define the content for each state
    // const loginHTML = `
    //     <h2 class="text-2xl font-bold">Share Your Culinary Creations</h2>
    //     <p>Join our community of food lovers...</p>
    // `;
    // const registerHTML = `
    //     <h2 class="text-2xl font-bold">Start Your Culinary Journey</h2>
    //     <p>Create an account and start sharing...</p>
    // `;
    
    // Utility for changing text and position
    function updateImagePanel(translateXValue, justifyClass) {
        slider.style.transform = `translateX(${translateXValue})`;
        // currentTextContent.innerHTML = textHTML;
        
        // Remove previous justification classes and add the new one
        slider.classList.remove('justify-start', 'justify-end');
        slider.classList.add(justifyClass);
    }

    // --- Initial State: Login is displayed (Image on the right) ---
    // Image slides RIGHT by 40%. The content must align to the END (right).
    updateImagePanel('-40%', 'justify-end');

    document.getElementById('to-login-link').addEventListener('click', function(e) {
        e.preventDefault();
        // Image slides LEFT by 60%. The content must align to the START (left).
        updateImagePanel('-40%', 'justify-start');
    });

    document.getElementById('to-register-link').addEventListener('click', function(e) {
        e.preventDefault();
        // Image slides RIGHT by 40%. The content must align to the END (right).
        updateImagePanel('40%', 'justify-end');
    });
});

// for ToS modal
document.addEventListener('DOMContentLoaded', function() {
    // 1. Get references to the elements
    const termsLink = document.getElementById('terms-of-service-link'); // Assuming your link has this ID
    const modal = document.getElementById('terms-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    
    // --- IMPORTANT: Ensure your "Terms of Service" link has the ID below ---
    // If you are using the HTML from image_8bb3f9.jpg, the link is here:
    // <a id="terms-of-service-link" href="#" class="text-blue-600">Terms of Service</a> 
    
    // 2. Function to open the modal
    function openModal(e) {
        e.preventDefault(); // Prevents the link from navigating if it has a default action
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden'); // Prevents background scrolling
    }

    // 3. Function to close the modal
    function closeModal() {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    // 4. Attach Event Listeners
    if (termsLink) {
        termsLink.addEventListener('click', openModal);
    }
    closeModalBtn.addEventListener('click', closeModal);

    // Optional: Close modal if user clicks outside of it (on the overlay)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
});

// for PrivPol modal
document.addEventListener('DOMContentLoaded', function() {
    // 1. Get references to the elements
    const privacyLink = document.getElementById('privacy-policy-link'); // Assuming your link has this ID
    const privModal = document.getElementById('privacy-modal');
    const closePrivModalBtn = document.getElementById('close-privModal-btn');
    
    // --- IMPORTANT: Ensure your "Terms of Service" link has the ID below ---
    // If you are using the HTML from image_8bb3f9.jpg, the link is here:
    // <a id="terms-of-service-link" href="#" class="text-blue-600">Terms of Service</a> 
    
    // 2. Function to open the modal
    function openModal(e) {
        e.preventDefault(); // Prevents the link from navigating if it has a default action
        privModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden'); // Prevents background scrolling
    }

    // 3. Function to close the modal
    function closePrivModal() {
        privModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    // 4. Attach Event Listeners
    if (privacyLink) {
        privacyLink.addEventListener('click', openModal);
    }
    closePrivModalBtn.addEventListener('click', closePrivModal);

    // Optional: Close modal if user clicks outside of it (on the overlay)
    privModal.addEventListener('click', function(e) {
        if (e.target === privModal) {
            closePrivModal();
        }
    });
});