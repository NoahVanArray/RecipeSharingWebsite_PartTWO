// Generic function to open any modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const content = modal.querySelector('[data-modal-content]');
    
    if (modal && content) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden'); // 👈 ADD THIS HERE
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
    const content = modal.querySelector('[data-modal-content]');

    if (modal && content) {
        // Start reverse transition
        modal.classList.remove('opacity-100');
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-95', 'opacity-0');

        // Hide modal after transition completes (300ms)
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden'); // 👈 ADD THIS HERE
        }, 300);
    }
}

// for ToS modal
document.addEventListener('DOMContentLoaded', function() {
    const termsLink = document.getElementById('terms-of-service-link');
    const modal = document.getElementById('terms-modal');
    const modalBody = document.getElementById('modal-content-body'); // New target element
    const closeModalBtn = document.getElementById('close-modal-btn');
    const termsFilePath = '../modal_contents/ToS.html'; // The path to your separate content file
    
    // Function to load content and open the modal
    function loadAndOpenModal(e) {
        e.preventDefault();
        
        // 1. Fetch the content from the separate file
        fetch(termsFilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // 2. Inject the fetched HTML content into the modal body
                modalBody.innerHTML = data;
                
                // 3. Open the modal
                modal.classList.remove('hidden');
                document.body.classList.add('overflow-hidden');
            })
            .catch(error => {
                console.error('Error loading modal content:', error);
                modalBody.innerHTML = '<p class="text-red-600">Failed to load content. Please try again.</p>';
                modal.classList.remove('hidden'); // Open anyway to show error
                document.body.classList.add('overflow-hidden');
            });
    }

    // Attach Event Listeners (Use the new function)
    if (termsLink) {
        termsLink.addEventListener('click', loadAndOpenModal);
    }
    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    });

    // Optional: Close modal if user clicks outside of it
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    });
});

// for PrivPol modal
document.addEventListener('DOMContentLoaded', function() {
    // 1. Get references to the elements
    const privacyLink = document.getElementById('privacy-policy-link');
    const privModal = document.getElementById('privacy-modal');
    const privModalBody = document.getElementById('priv-modal-content-body'); // Assuming you use this ID for the scrollable body
    const closePrivModalBtn = document.getElementById('close-privModal-btn');
    const privacyFilePath = '../modal_contents/PrivPol.html'; // Adjust this path to your file structure!

    // Function to load content and open the modal
    function loadAndOpenPrivModal(e) {
        e.preventDefault();
        
        // Clear old content and show loading message
        privModalBody.innerHTML = '<p class="text-gray-500">Loading Privacy Policy...</p>';
        
        // 1. Fetch the content from the separate file
        fetch(privacyFilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // 2. Inject the fetched HTML content into the modal body
                privModalBody.innerHTML = data;
                
                // 3. Open the modal
                privModal.classList.remove('hidden');
                document.body.classList.add('overflow-hidden');
            })
            .catch(error => {
                console.error('Error loading Privacy Policy content:', error);
                privModalBody.innerHTML = '<p class="text-red-600">Failed to load Privacy Policy. Please ensure your local server is running.</p>';
                privModal.classList.remove('hidden'); // Open anyway to show error
                document.body.classList.add('overflow-hidden');
            });
    }

    // 3. Function to close the modal (kept the same)
    function closePrivModal() {
        privModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    // 4. Attach Event Listeners
    if (privacyLink) {
        privacyLink.addEventListener('click', loadAndOpenPrivModal);
    }
    closePrivModalBtn.addEventListener('click', closePrivModal);

    // Optional: Close modal if user clicks outside of it (on the overlay)
    privModal.addEventListener('click', function(e) {
        if (e.target === privModal) {
            closePrivModal();
        }
    });
});

// Function to close the first modal and open the second
function showNewPasswordModal() {
            closeModal('resetModal'); 
            // Small delay (150ms) to allow the first modal's closing animation to look smooth
            setTimeout(() => {
                openModal('newPasswordModal'); 
            }, 150);
}

// Close modal when clicking outside the content box
const resetModal = document.getElementById('resetModal');
if (resetModal) { // Check if the element exists on the page
    resetModal.addEventListener('click', function(e) {
        if (e.target.id === 'resetModal') {
            closeModal('resetModal');
        }
    });
}

const newPasswordModal = document.getElementById('newPasswordModal');
if (newPasswordModal) { // Check if the element exists on the page
    newPasswordModal.addEventListener('click', function(e) {
        if (e.target.id === 'newPasswordModal') {
            closeModal('newPasswordModal');
        }
    });
}

// For the Settings Modal
document.addEventListener('DOMContentLoaded', function() {
    const openSettingsModalBtn = document.getElementById('open-settings-modal-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsModalBtn = document.getElementById('close-settings-modal-btn');
    
    if (openSettingsModalBtn && settingsModal && closeSettingsModalBtn) {
        // Open the modal
        openSettingsModalBtn.addEventListener('click', function() {
            // 🛑 FIX: Use your generic openModal function
            openModal('settings-modal');
            document.body.classList.add('overflow-hidden'); // Keep to prevent background scroll
        });

        // Close the modal via the close button
        closeSettingsModalBtn.addEventListener('click', function() {
            // 🛑 FIX: Use your generic closeModal function
            closeModal('settings-modal');
            document.body.classList.remove('overflow-hidden');
        });

        // Close the modal if clicking outside the content (on the overlay)
        settingsModal.addEventListener('click', function(e) {
            if (e.target === settingsModal) {
                // 🛑 FIX: Use your generic closeModal function
                closeModal('settings-modal');
                document.body.classList.remove('overflow-hidden');
            }
        });
    } else {
        console.warn('One or more settings modal elements not found. Check IDs: open-settings-modal-btn, settings-modal, close-settings-modal-btn');
    }
});

// Functionality for the "Create New Recipe" Modal
document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('open-recipe-modal-btn');
    const modal = document.getElementById('create-recipe-modal');
    const closeBtnFooter = document.getElementById('close-recipe-modal-btn');
    const closeBtnX = document.getElementById('close-recipe-modal-x');

    if (!modal) {
        return; 
    }

    // 🛑 FIX: Define closeModal using your generic function
    const closeModalHandler = () => {
        closeModal('create-recipe-modal');
        document.body.classList.remove('overflow-hidden');
    };

    // 1. Open Modal
    if (openBtn) {
        openBtn.addEventListener('click', function() {
            // 🛑 FIX: Use your generic openModal function
            openModal('create-recipe-modal');
            document.body.classList.add('overflow-hidden');
        });
    }

    // 2. Close Modal (Footer Cancel Button)
    if (closeBtnFooter) {
        closeBtnFooter.addEventListener('click', closeModalHandler);
    }
    
    // 3. Close Modal (X Button in Header)
    if (closeBtnX) {
        closeBtnX.addEventListener('click', closeModalHandler);
    }

    // 4. Close Modal when clicking outside the content box
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalHandler();
        }
    });
});

// slider for the login-registration animation
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('image-slider');
    const imagePanelText = document.getElementById('image-panel-text');
    const currentTextContent = document.getElementById('current-text-content');
    
    // 🛑 NEW CHECK: Exit the function safely if the main slider element is missing
    if (!slider) {
        return; 
    }
    
    // Utility for changing text and position
    function updateImagePanel(translateXValue, justifyClass) {
        // This is the line that was crashing when 'slider' was null:
        slider.style.transform = `translateX(${translateXValue})`; 
        // currentTextContent.innerHTML = textHTML;
        
        // Remove previous justification classes and add the new one
        slider.classList.remove('justify-start', 'justify-end');
        slider.classList.add(justifyClass);
    }

    // --- Initial State: Login is displayed (Image on the right) ---
    // Image slides RIGHT by 40%. The content must align to the END (right).
    updateImagePanel('-40%', 'justify-end');

    // Add checks for 'to-login-link' and 'to-register-link' as well, 
    // since they might also be missing on other pages.
    const loginLink = document.getElementById('to-login-link');
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Image slides LEFT by 60%. The content must align to the START (left).
            updateImagePanel('-40%', 'justify-start');
        });
    }

    const registerLink = document.getElementById('to-register-link');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Image slides RIGHT by 40%. The content must align to the END (right).
            updateImagePanel('40%', 'justify-end');
        });
    }
});

// update of avatar display, shows svg as default if user still hasn't changed their profile image
function updateAvatar(profileUrl) {
    const svgIcon = document.getElementById('avatar-svg');
    const userImg = document.getElementByClassName('user-pfp');

    if (profileUrl && profileUrl !== 'user.svg') {
        // Show the image
        userImg.src = profileUrl;
        userImg.classList.remove('hidden'); 
        svgIcon.classList.add('hidden');
    } else {
        // Show the SVG fallback
        userImg.classList.add('hidden');
        svgIcon.classList.remove('hidden');
    }
}

// Initial call on page load:
// updateAvatar(userData.profile_image_url);

// for handling of clicked button group on mainFoodPage
function handleSelection(clickedButton) {
    const parent = clickedButton.parentElement;
    
    // 1. Deselect All Siblings (The "Normal" State)
    // Loop through all children of the parent container
    const buttons = parent.querySelectorAll('button');
    buttons.forEach(button => {
        // Reset every button's state to unpressed
        button.setAttribute('aria-pressed', 'false');
    });

    // 2. Select the Clicked Button
    // Set the state of the clicked button to pressed
    clickedButton.setAttribute('aria-pressed', 'true');
    
    // Optional: Add logic here to perform an action based on the selected button
    // console.log('Selected:', clickedButton.textContent);
}