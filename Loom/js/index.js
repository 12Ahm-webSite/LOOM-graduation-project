        // DOM Elements
        const profileDropdown = document.getElementById('profileDropdown');
        const pageTitle = document.getElementById('pageTitle');
        
        // Navigation data
        const navData = {
            'home': { title: 'Home', activeClass: 'active' },
            'search': { title: 'Search', activeClass: '' },
            'discover': { title: 'Discover', activeClass: 'active-chat' },
            'communities': { title: 'Communities', activeClass: '' },
            'projects': { title: 'Projects', activeClass: 'active' },
            'chat': { title: 'Chat', activeClass: '' },
            'notifications': { title: 'Notifications', activeClass: '' },
            'profile': { title: 'Profile', activeClass: 'active' }
        };
        
        // Toggle profile dropdown
        function toggleProfileDropdown() {
            profileDropdown.classList.toggle('active');
            setActiveNav('profile');
            
            // Close dropdown when clicking outside
            setTimeout(() => {
                document.addEventListener('click', closeDropdownOnClickOutside);
            }, 10);
        }
        
        // Close dropdown when clicking outside
        function closeDropdownOnClickOutside(event) {
            if (!profileDropdown.contains(event.target) && 
                !event.target.closest('.nav-item:last-child')) {
                profileDropdown.classList.remove('active');
                document.removeEventListener('click', closeDropdownOnClickOutside);
            }
        }
        
        // Set active navigation item
        function setActiveNav(navId) {
            // Remove active classes from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
                const icon = item.querySelector('.nav-icon');
                const label = item.querySelector('.nav-label');
                
                icon.classList.remove('active', 'active-chat');
                label.classList.remove('active');
                
                // Reset to default state
                if (!icon.classList.contains('active-chat')) {
                    icon.style.backgroundColor = '#DEE9F3';
                }
                label.style.color = 'white';
            });
            
            // Add active class to clicked nav item
            const clickedItem = event.currentTarget;
            clickedItem.classList.add('active');
            
            // Update icon and label
            const icon = clickedItem.querySelector('.nav-icon');
            const label = clickedItem.querySelector('.nav-label');
            
            if (navData[navId]) {
                if (navData[navId].activeClass === 'active') {
                    icon.classList.add('active');
                    icon.style.backgroundColor = 'white';
                    label.classList.add('active');
                    label.style.color = '#DEE9F3';
                } else if (navData[navId].activeClass === 'active-chat') {
                    icon.classList.add('active-chat');
                    icon.style.backgroundColor = 'rgba(255, 255, 255, 0)';
                    icon.style.border = '4px solid white';
                    label.style.color = 'white';
                } else {
                    icon.style.backgroundColor = 'white';
                    label.style.color = 'white';
                }
                
                // Update page title
                pageTitle.textContent = navData[navId].title;
            }
            
            // If it's not the profile nav, close dropdown
            if (navId !== 'profile') {
                profileDropdown.classList.remove('active');
            }
            
            // In a real app, you would load the corresponding page content here
            console.log(`Navigated to: ${navId}`);
        }
        
        // Simulate loading content with skeleton
        function simulateContentLoad() {
            const skeletonElements = document.querySelectorAll('.skeleton');
            
            // Simulate loading for 2 seconds, then replace skeletons with actual content
            setTimeout(() => {
                skeletonElements.forEach(element => {
                    // In a real app, you would replace with actual content
                    // For now, we'll just remove the skeleton animation
                    element.style.animation = 'none';
                    
                    // Add a subtle fade-in effect
                    element.style.opacity = '1';
                    element.style.transition = 'opacity 0.3s ease';
                });
                
                // Show a message that content is loaded
                console.log('Content loaded successfully!');
            }, 2000);
        }
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            // Set initial active nav
            setActiveNav('home');
            
            // Simulate content loading
            simulateContentLoad();
            
            // Handle window resize
            window.addEventListener('resize', handleResponsive);
            handleResponsive();
        });

// --- Live search overlay هنا البداية --------------------------------------------------
function buildSearchOverlay() {
    if (document.querySelector('.search-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';

    const panel = document.createElement('div');
    panel.className = 'search-panel hidden';

    const input = document.createElement('input');
    input.className = 'search-input';
    input.placeholder = 'Search';
    input.type = 'search';

    const results = document.createElement('div');
    results.className = 'search-results';

    panel.appendChild(input);
    panel.appendChild(results);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    // Data source: collect friend names and post/action texts
    const dataset = [];
    document.querySelectorAll('.friend-item').forEach(item => {
        const nameEl = item.querySelector('.friend-name');
        const avatar = item.querySelector('img')?.getAttribute('src') || '';
        if (nameEl) dataset.push({ type: 'user', title: nameEl.textContent.trim(), sub: '', avatar });
    });

    document.querySelectorAll('.action-text').forEach(el => {
        const txt = el.textContent.trim();
        if (txt) dataset.push({ type: 'post', title: txt, sub: 'Post', avatar: '' });
    });

    function renderResults(items) {
        results.innerHTML = '';
        if (!items.length) {
            const empty = document.createElement('div');
            empty.className = 'search-empty';
            empty.textContent = 'No results';
            results.appendChild(empty);
            return;
        }

        items.forEach(it => {
            const row = document.createElement('div');
            row.className = 'search-item';

            const avatar = document.createElement('img');
            avatar.className = 'search-avatar';
            if (it.avatar) avatar.src = it.avatar; else avatar.style.background = '#0A4073';

            const meta = document.createElement('div');
            meta.className = 'search-meta';

            const title = document.createElement('div');
            title.className = 'search-title';
            title.textContent = it.title;

            const sub = document.createElement('div');
            sub.className = 'search-sub';
            sub.textContent = it.sub || (it.type === 'user' ? 'User' : 'Post');

            meta.appendChild(title);
            meta.appendChild(sub);
            row.appendChild(avatar);
            row.appendChild(meta);

            row.addEventListener('click', () => {
                // On click, simply close overlay and log selection
                closeSearch();
                console.log('Selected search item:', it);
            });

            results.appendChild(row);
        });
    }

    function performSearch(q) {
        const query = (q || '').toLowerCase().trim();
        if (!query) return renderResults(dataset.slice(0, 8));
        const filtered = dataset.filter(d => (d.title || '').toLowerCase().includes(query) || (d.sub || '').toLowerCase().includes(query));
        renderResults(filtered.slice(0, 20));
    }

    function openSearch() {
        panel.classList.remove('hidden');
        overlay.style.display = 'flex';
        setTimeout(() => input.focus(), 120);
        performSearch('');
        document.addEventListener('keydown', onKeyDown);
    }

    function closeSearch() {
        panel.classList.add('hidden');
        overlay.style.display = 'none';
        document.removeEventListener('keydown', onKeyDown);
    }

    function onKeyDown(e) {
        if (e.key === 'Escape') closeSearch();
    }

    // input updates on every keystroke
    input.addEventListener('input', function() {
        performSearch(this.value);
    });

    // close when clicking outside panel
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeSearch();
    });

    // expose open/close
    return { openSearch, closeSearch };
}

const searchController = buildSearchOverlay();

// Attach click handler to Search sidebar item
const searchItem = document.querySelector('.sidebar-item[href="/search"]') || Array.from(document.querySelectorAll('.sidebar-item')).find(a => a.textContent.trim() === 'Search');
if (searchItem) {
    searchItem.addEventListener('click', function(e) {
        e.preventDefault();
        searchController.openSearch();
    });
}
// نهاية البحث المباشر --------------------------------------------------
        
        // Handle responsive behavior
        function handleResponsive() {
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');
            
            if (window.innerWidth <= 768) {
                // Mobile layout
                pageTitle.style.display = 'block';
            } else {
                // Desktop layout
                pageTitle.style.display = 'none';
            }
        }
        
        // Handle logout
        document.querySelector('.logout-text').addEventListener('click', function() {
            if (confirm('Are you sure you want to log out?')) {
                alert('Logged out successfully!');
                // In a real app, you would redirect to login page
            }
        });
    