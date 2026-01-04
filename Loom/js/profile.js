document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const menuItems = document.querySelectorAll('.menu-item');
    const privacyOptions = document.querySelectorAll('.privacy-option');
    const cancelButton = document.querySelector('.cancel-button');
    const saveButton = document.querySelector('.save-button');
    const contentHeader = document.getElementById('content-header');
    const contentBody = document.getElementById('content-body');

    // Data for each section (titles, subtitles, HTML content)
    const sectionsData = {
        'account-center': {
            title: 'Account Center',
            subtitle: 'Connected experiences and account settings',
            content: `
                <div class="account-center-section">
                    <div class="account-center-header">
                        <div class="globe-icon">
                            <i class="fas fa-globe-americas"></i>
                        </div>
                        <h2 class="account-center-title">Account Center</h2>
                    </div>
                    
                    <p class="account-description">
                        Connected experiences and account settings.
                    </p>
                    
                    <div class="account-features">
                        <div class="account-feature">
                            <div class="feature-icon">
                                <i class="fas fa-user"></i>
                            </div>
                            <span class="feature-text">Personal details</span>
                        </div>
                        
                        <div class="account-feature">
                            <div class="feature-icon">
                                <i class="fas fa-lock"></i>
                            </div>
                            <span class="feature-text">Password & security</span>
                        </div>
                        
                        <div class="account-feature">
                            <div class="feature-icon">
                                <i class="fas fa-external-link-alt"></i>
                            </div>
                            <span class="feature-text">See more in Account Center</span>
                        </div>
                    </div>
                    
                    <button class="account-center-button">
                        <i class="fas fa-external-link-alt"></i> Open Account Center
                    </button>
                </div>
            `
        },

        'privacy-settings': {
            title: 'Privacy Settings',
            subtitle: 'Control who can see your information and profile',
            content: `
                <div class="section-content" id="privacy-settings-content">
                    <div class="subsection">
                        <h3 class="subsection-title">Profile Visibility</h3>
                        <div class="privacy-options">
                            <div class="privacy-option selected" data-value="public">
                                <div class="privacy-radio selected"></div>
                                <div class="privacy-info">
                                    <h4>Public</h4>
                                    <p>If your profile is public, your information, profile, and communities can be seen by people both inside and outside the platform, even without an account.</p>
                                </div>
                            </div>
                            
                            <div class="privacy-option" data-value="registered-users">
                                <div class="privacy-radio"></div>
                                <div class="privacy-info">
                                    <h4>Registered Users</h4>
                                    <p>If your profile is visible to registered users only, it can be seen by people who have accounts on the platform.</p>
                                </div>
                            </div>
                            
                            <div class="privacy-option" data-value="community-members">
                                <div class="privacy-radio"></div>
                                <div class="privacy-info">
                                    <h4>Community Members</h4>
                                    <p>If your profile is visible to your communities only, it can be seen by people who share the same communities with you.</p>
                                </div>
                            </div>
                            
                            <div class="privacy-option" data-value="only-me">
                                <div class="privacy-radio"></div>
                                <div class="privacy-info">
                                    <h4>Only Me</h4>
                                    <p>If set to "Only Me", your information, profile, and communities will be completely private.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="privacy-controls">
                        <div class="privacy-description">
                            <p>This option controls who can see your full profile (name, bio, skills, experience, projects, etc.).</p>
                            <a href="#" class="learn-more">Learn more</a>
                        </div>
                        
                        <div class="action-buttons">
                            <button class="cancel-button">Cancel</button>
                            <button class="save-button">Save changes</button>
                        </div>
                    </div>
                </div>
            `
        },

        'notification-settings': {
            title: 'Notification Settings',
            subtitle: 'Control how and when you receive platform notifications',
            content: `
                <div class="notification-section">
                    <div class="notification-category">
                        <h3 class="category-title">Messages</h3>
                        <div class="notification-option">
                            <span class="option-label">New messages</span>
                            <label class="toggle-switch">
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="notification-option">
                            <span class="option-label">Project updates</span>
                            <label class="toggle-switch">
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="notification-option">
                            <span class="option-label">Task reminders</span>
                            <label class="toggle-switch">
                                <input type="checkbox">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="notification-category">
                        <h3 class="category-title">Communities</h3>
                        <div class="notification-option">
                            <span class="option-label">Community posts</span>
                            <label class="toggle-switch">
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="notification-option">
                            <span class="option-label">System announcements</span>
                            <label class="toggle-switch">
                                <input type="checkbox">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="notification-category">
                        <h3 class="category-title">Email</h3>
                        <div class="notification-option">
                            <span class="option-label">Email notifications</span>
                            <label class="toggle-switch">
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            `
        },

        'appearance-settings': {
            title: 'Appearance Settings',
            subtitle: 'Customize the app appearance to your preference',
            content: `
                <div class="notification-section">
                    <div class="notification-category">
                        <h3 class="category-title">Theme</h3>
                        <div class="notification-option">
                            <span class="option-label">Dark mode</span>
                            <label class="toggle-switch">
                                <input type="radio" name="theme" value="dark" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="notification-option">
                            <span class="option-label">Light mode</span>
                            <label class="toggle-switch">
                                <input type="radio" name="theme" value="light">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="notification-option">
                            <span class="option-label">System theme</span>
                            <label class="toggle-switch">
                                <input type="radio" name="theme" value="system">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="notification-category">
                        <h3 class="category-title">Customization</h3>
                        <div class="notification-option">
                            <span class="option-label">Font size</span>
                            <div class="custom-select">
                                <select>
                                    <option value="small" selected>Small</option>
                                    <option value="medium" >Medium</option>
                                    <option value="large">Large</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },

        'language-settings': {
            title: 'Language Settings',
            subtitle: 'Choose your preferred app language',
            content: `
                <div class="notification-section">
                    <div class="notification-category">
                        <h3 class="category-title">App language</h3>
                        <div class="notification-option">
                            <span class="option-label">Arabic</span>
                            <label class="toggle-switch">
                                <input type="radio" name="app-language" value="arabic" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="notification-option">
                            <span class="option-label">English</span>
                            <label class="toggle-switch">
                                <input type="radio" name="app-language" value="english">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="action-buttons" style="margin-top: 30px;">
                        <button class="save-button">Apply changes</button>
                    </div>
                </div>
            `
        },

        'security-settings': {
            title: 'Security Settings',
            subtitle: 'Manage your account security and password',
            content: `
                <div class="notification-section">
                    <div class="notification-category">
                        <h3 class="category-title">Security</h3>
                        <div class="notification-option">
                            <span class="option-label">Two-factor authentication</span>
                            <label class="toggle-switch">
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="notification-option">
                            <span class="option-label">Active logins</span>
                            <button class="view-logins-button">View</button>
                        </div>
                    </div>
                    
                    <div class="notification-category">
                        <h3 class="category-title">Password</h3>
                        <div class="notification-option">
                            <span class="option-label">Change password</span>
                            <button class="change-password-button">Change</button>
                        </div>
                    </div>
                    
                    <div class="action-buttons" style="margin-top: 30px;">
                        <button class="save-button">Save changes</button>
                    </div>
                </div>
            `
        },

        'support-help': {
            title: 'Support & Help',
            subtitle: 'Get help and technical support',
            content: `
                <div class="notification-section">
                    <div class="notification-category">
                        <h3 class="category-title">Support</h3>
                        <div class="support-option">
                            <i class="fas fa-question-circle"></i>
                            <span class="option-label">Help Center</span>
                            <a href="#" class="support-link">Visit</a>
                        </div>
                        <div class="support-option">
                            <i class="fas fa-headset"></i>
                            <span class="option-label">Contact support</span>
                            <a href="#" class="support-link">Contact</a>
                        </div>
                        <div class="support-option">
                            <i class="fas fa-flag"></i>
                            <span class="option-label">Report an issue</span>
                            <a href="#" class="support-link">Report</a>
                        </div>
                    </div>
                    
                    <div class="notification-category">
                        <h3 class="category-title">Help</h3>
                        <div class="support-option">
                            <i class="fas fa-comment"></i>
                            <span class="option-label">Send feedback</span>
                            <a href="#" class="support-link">Send</a>
                        </div>
                        <div class="support-option">
                            <i class="fas fa-file-alt"></i>
                            <span class="option-label">FAQ</span>
                            <a href="#" class="support-link">View</a>
                        </div>
                    </div>
                </div>
            `
        },

        'about': {
            title: 'About',
            subtitle: 'Information about the platform and its version',
            content: `
                <div class="notification-section">
                    <div class="notification-category">
                        <h3 class="category-title">About the platform</h3>
                        <div class="about-info">
                            <p>A social and professional platform connecting specialists and enthusiasts across fields.</p>
                        </div>
                    </div>
                    
                    <div class="notification-category">
                        <h3 class="category-title">Information</h3>
                        <div class="about-item">
                            <strong>Version:</strong>
                            <span>2.5.1</span>
                        </div>
                        <div class="about-item">
                            <strong>Release date:</strong>
                            <span>January 2024</span>
                        </div>
                    </div>
                    
                    <div class="notification-category">
                        <h3 class="category-title">Policies</h3>
                        <div class="policy-links">
                            <a href="#" class="policy-link">
                                <i class="fas fa-file-contract"></i>
                                Terms & Conditions
                            </a>
                            <a href="#" class="policy-link">
                                <i class="fas fa-shield-alt"></i>
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>
            `
        }
    };

    // Initialize app
    function init() {
        // Set default active section
        setActiveSection('privacy-settings');

        // Attach event listeners
        setupEventListeners();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Click on menu items
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const section = this.getAttribute('data-section');

                if (section === 'logout') {
                    handleLogout();
                    return;
                }

                setActiveSection(section);
            });
        });

        // Click on privacy options
        if (privacyOptions.length > 0) {
            privacyOptions.forEach(option => {
                option.addEventListener('click', function() {
                    privacyOptions.forEach(opt => {
                        opt.classList.remove('selected');
                        opt.querySelector('.privacy-radio').classList.remove('selected');
                    });

                    this.classList.add('selected');
                    this.querySelector('.privacy-radio').classList.add('selected');
                });
            });
        }

        // Cancel button
        if (cancelButton) {
            cancelButton.addEventListener('click', function() {
                if (confirm('Discard changes?')) {
                    alert('Changes discarded');
                    // Reset options if needed
                }
            });
        }

        // Save button
        if (saveButton) {
            saveButton.addEventListener('click', function() {
                // Gather data and save
                const privacyValue = document.querySelector('.privacy-option.selected')?.getAttribute('data-value') || 'public';

                const dataToSave = {
                    privacySetting: privacyValue,
                    // add more fields if needed
                };

                console.log('Save data:', dataToSave);
                alert('Changes saved successfully!');

                // In a real app you would send this to the server
                // fetch('/api/save-settings', {...})
            });
        }
    }

    // Set active section
    function setActiveSection(sectionId) {
        // Update sidebar
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === sectionId) {
                item.classList.add('active');
            }
        });

        // Update main content
        const sectionData = sectionsData[sectionId];
        if (sectionData) {
            contentHeader.innerHTML = `
                <h1 class="page-title">${sectionData.title}</h1>
                <p class="page-subtitle">${sectionData.subtitle}</p>
            `;

            contentBody.innerHTML = sectionData.content;

            // Reattach listeners for new content
            reattachEventListeners();
        }
    }

    // Reattach event listeners for dynamic content
    function reattachEventListeners() {
        // Privacy options
        const newPrivacyOptions = document.querySelectorAll('.privacy-option');
        if (newPrivacyOptions.length > 0) {
            newPrivacyOptions.forEach(option => {
                option.addEventListener('click', function() {
                    newPrivacyOptions.forEach(opt => {
                        opt.classList.remove('selected');
                        opt.querySelector('.privacy-radio').classList.remove('selected');
                    });

                    this.classList.add('selected');
                    this.querySelector('.privacy-radio').classList.add('selected');
                });
            });
        }

        // Toggle switches
        const toggleSwitches = document.querySelectorAll('.toggle-switch input');
        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('change', function() {
                console.log('Toggle changed:', this.checked);
            });
        });

        // Other buttons
        const buttons = document.querySelectorAll('button:not(.cancel-button):not(.save-button)');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                console.log('Clicked:', this.textContent);
            });
        });

        // Links
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                    console.log('Link clicked:', this.textContent);
                }
            });
        });
    }

    // Handle logout
    function handleLogout() {
        if (confirm('Are you sure you want to log out?')) {
            // Show loading message
            contentHeader.innerHTML = `
                <h1 class="page-title">Logging out</h1>
                <p class="page-subtitle">Signing you out...</p>
            `;

            contentBody.innerHTML = `
                <div class="logout-section" style="text-align: center; padding: 50px;">
                    <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: #407BFF; margin-bottom: 20px;"></i>
                    <p>Signing you out...</p>
                </div>
            `;

            // Simulate logout
            setTimeout(() => {
                alert('Logged out successfully');
                // In a real app you would redirect to the login page
                // window.location.href = '/login';
            }, 1500);
        }
    }

    // Run initialization
    init();
});