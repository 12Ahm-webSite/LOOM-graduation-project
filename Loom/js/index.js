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

// --- Live search overlay --------------------------------------------------
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
        // position the panel next to the Search sidebar item if available
        const anchor = document.getElementById('openSearch') || Array.from(document.querySelectorAll('.sidebar-item')).find(a=>a.textContent.trim() === 'Search');
        if (anchor) {
            const rect = anchor.getBoundingClientRect();
            // place panel to the right of the anchor, aligned near its top
            const left = rect.right + 12;
            const top = Math.max(8, rect.top - 8);
            panel.style.left = `${left}px`;
            panel.style.top = `${top}px`;
        } else {
            // fallback: top-center
            panel.style.left = '50%';
            panel.style.top = '12px';
            panel.style.transform = 'translateX(-50%)';
        }

        panel.classList.remove('hidden');
        overlay.style.display = 'block';
        overlay.style.pointerEvents = 'auto';
        // ensure transform reset when positioned via JS
        setTimeout(() => input.focus(), 120);
        performSearch('');
        document.addEventListener('keydown', onKeyDown);
    }

    function closeSearch() {
        panel.classList.add('hidden');
        overlay.style.display = 'none';
        overlay.style.pointerEvents = 'none';
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

/* تعديل: بداية قسم نافذة الإشعارات */
function buildNotificationsPanel() {
    if (document.querySelector('.notifications-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'notifications-overlay';

    const panel = document.createElement('div');
    panel.className = 'notifications-panel hidden';

    const header = document.createElement('div');
    header.className = 'notifications-header';
    header.textContent = 'Notification';

    const list = document.createElement('div');
    list.className = 'notifications-list';

    // sample notifications (you can replace with dynamic data)
    const notifications = [
        { id:1, avatar:'/img/Ellipse 2233.png', title:'Kotty Amoer', text:'Has invited you to his project', actions:[{label:'Accept', style:'primary'}]},
        { id:2, avatar:'/img/Ellipse 2195.png', title:'Professor Programing', text:'Followed you', actions:[{label:'Follow back', style:'muted'}]},
        { id:3, avatar:'/img/Ellipse 2193.png', title:'King James', text:'Invited to chat', actions:[{label:'Enter chat', style:'muted'}]},
        { id:4, avatar:'/img/Ellipse 2192.png', title:'Moriadb', text:'Invited you to his chat', actions:[{label:'Enter chat', style:'muted'}]}
    ];

    function render() {
        list.innerHTML = '';
        notifications.forEach(n => {
            const item = document.createElement('div');
            item.className = 'notification-item';

            const avatar = document.createElement('img');
            avatar.className = 'notification-avatar';
            avatar.src = n.avatar || '';

            const body = document.createElement('div');
            body.className = 'notification-body';
            const title = document.createElement('div'); title.className='notification-title'; title.textContent = n.title;
            const txt = document.createElement('div'); txt.className='notification-text'; txt.textContent = n.text;
            body.appendChild(title); body.appendChild(txt);

            const actions = document.createElement('div'); actions.className = 'notification-actions';
            n.actions.forEach(a => {
                const btn = document.createElement('button');
                btn.className = 'btn-notify ' + (a.style === 'primary' ? 'btn-primary' : 'btn-muted');
                btn.textContent = a.label;
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    console.log('Notification action:', a.label, 'for', n.id);
                    // placeholder: implement accept/follow/chat actions
                });
                actions.appendChild(btn);
            });

            item.appendChild(avatar);
            item.appendChild(body);
            item.appendChild(actions);
            list.appendChild(item);
        });
    }

    panel.appendChild(header);
    panel.appendChild(list);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    // keep notifications hidden until explicitly opened
    overlay.style.display = 'none';
    overlay.style.pointerEvents = 'none';
    panel.classList.add('hidden');

    render();

    function openNotifications() {
        // position near notifications sidebar item
        const anchor = Array.from(document.querySelectorAll('.sidebar-item')).find(a=>a.textContent.trim() === 'Notifications' || a.href.endsWith('/notifications'));
        if (anchor) {
            const rect = anchor.getBoundingClientRect();
            panel.style.left = `${rect.right + 12}px`;
            panel.style.top = `${Math.max(8, rect.top - 8)}px`;
        } else {
            panel.style.left = '50%';
            panel.style.top = '12px';
            panel.style.transform = 'translateX(-50%)';
        }
        panel.classList.remove('hidden');
        overlay.style.display = 'block';
        overlay.style.pointerEvents = 'auto';
    }

    function closeNotifications() {
        panel.classList.add('hidden');
        overlay.style.display = 'none';
        overlay.style.pointerEvents = 'none';
    }

    overlay.addEventListener('click', function(e){ if(e.target===overlay) closeNotifications(); });

    return { openNotifications, closeNotifications };
}

const notificationsController = buildNotificationsPanel();

// attach to Notifications sidebar item
const notifItem = Array.from(document.querySelectorAll('.sidebar-item')).find(a=>a.textContent.trim() === 'Notifications' || (a.getAttribute('href')||'').includes('notifications'));
if (notifItem) {
    notifItem.addEventListener('click', function(e){ e.preventDefault(); notificationsController.openNotifications(); });
}
/* تعديل: نهاية قسم نافذة الإشعارات */
        
        // Handle logout
        document.querySelector('.logout-text').addEventListener('click', function() {
            if (confirm('Are you sure you want to log out?')) {
                alert('Logged out successfully!');
                // In a real app, you would redirect to login page
            }
        });
    