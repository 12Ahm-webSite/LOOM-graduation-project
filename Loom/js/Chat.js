        // DOM Elements
        const messageInput = document.getElementById('messageInput');
        const sendMessageBtn = document.getElementById('sendMessage');
        const chatMessages = document.getElementById('chatMessages');
        const communitiesSidebar = document.getElementById('communitiesSidebar');
        const mobileToggle = document.getElementById('mobileToggle');
        
        // Sample messages for different users
        const sampleMessages = [
            { sender: "Ali Bebouny", content: "Are we still meeting at 3 PM?", isSent: true, time: "10:12" },
            { sender: "Ahmed muner", content: "Yes, I'll be there on time!", isSent: false, time: "10:13" },
            { sender: "Ali Bebouny", content: "Great! Don't forget the documents.", isSent: true, time: "10:14" },
            { sender: "Kotty Amoer", content: "I've sent the files to your email.", isSent: false, time: "10:15" }
        ];
        
        // Function to add a new message to the chat
        function addMessage(content, isSent = true) {
            if (!content.trim()) return;
            
            const messageTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            // Create message element
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
            
            messageDiv.innerHTML = `
                <div class="message-content">${content}</div>
                <div class="message-time">${messageTime}</div>
                ${!isSent ? `<div class="message-status">
                    <span class="message-time">${messageTime}</span>
                    <div class="status-dot"></div>
                </div>` : ''}
            `;
            
            // Add to chat
            chatMessages.appendChild(messageDiv);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Clear input
            messageInput.value = '';
            
            // If message is sent, simulate a reply after 1-3 seconds
            if (isSent) {
                setTimeout(() => {
                    const randomReply = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
                    addMessage(randomReply.content, false);
                }, 1000 + Math.random() * 2000);
            }
        }
        
        // Send message on button click
        sendMessageBtn.addEventListener('click', () => {
            addMessage(messageInput.value, true);
        });
        
        // Send message on Enter key press
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addMessage(messageInput.value, true);
            }
        });
        
        // Toggle communities sidebar on mobile
        mobileToggle.addEventListener('click', () => {
            communitiesSidebar.classList.toggle('active');
        });
        
        // Handle community item clicks
        document.querySelectorAll('.community-item').forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                document.querySelectorAll('.community-item').forEach(i => {
                    i.classList.remove('active');
                });
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Update chat header with community name
                const communityName = this.querySelector('.community-name').textContent;
                document.querySelector('.chat-user-name').textContent = communityName;
                
                // Clear and add sample messages for this community
                chatMessages.innerHTML = '';
                
                // Add a sender label
                const senderLabel = document.createElement('div');
                senderLabel.className = 'message-sender';
                senderLabel.textContent = communityName.split(' ')[0] + ' User';
                chatMessages.appendChild(senderLabel);
                
                // Add sample messages
                sampleMessages.forEach(msg => {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = `message ${msg.isSent ? 'sent' : 'received'}`;
                    
                    messageDiv.innerHTML = `
                        <div class="message-content">${msg.content}</div>
                        <div class="message-time">${msg.time}</div>
                        ${!msg.isSent ? `<div class="message-status">
                            <span class="message-time">${msg.time}</span>
                            <div class="status-dot"></div>
                        </div>` : ''}
                    `;
                    
                    chatMessages.appendChild(messageDiv);
                });
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // On mobile, hide the sidebar after selection
                if (window.innerWidth <= 768) {
                    communitiesSidebar.classList.remove('active');
                }
            });
        });
        
        // Show/hide mobile toggle based on screen size
        function handleResponsive() {
            if (window.innerWidth <= 768) {
                mobileToggle.style.display = 'flex';
                communitiesSidebar.classList.remove('active');
            } else {
                mobileToggle.style.display = 'none';
                communitiesSidebar.classList.add('active');
            }
        }
        
        // Initialize on load
        window.addEventListener('load', handleResponsive);
        window.addEventListener('resize', handleResponsive);
        
        // Add some initial messages on load
        window.addEventListener('load', () => {
            // Scroll to bottom initially
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        });

        /* ================= Search ================= */
function initSearch() {
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';

    const panel = document.createElement('div');
    panel.className = 'search-panel hidden';

    const input = document.createElement('input');
    input.className = 'search-input';
    input.placeholder = 'Search...';

    const results = document.createElement('div');
    results.className = 'search-results';

    panel.append(input, results);
    overlay.append(panel);
    document.body.append(overlay);

    const dataset = [];
    document.querySelectorAll('.friend-name').forEach(el => {
        dataset.push({ title: el.textContent, sub: 'User' });
    });

    function render(list) {
        results.innerHTML = '';
        list.forEach(i => {
            results.innerHTML += `
                <div class="search-item">
                    <div class="search-avatar"></div>
                    <div>
                        <div class="search-title">${i.title}</div>
                        <div class="search-sub">${i.sub}</div>
                    </div>
                </div>`;
        });
    }

    input.addEventListener('input', e => {
        const q = e.target.value.toLowerCase();
        render(dataset.filter(d => d.title.toLowerCase().includes(q)));
    });

    document.getElementById('openSearch').onclick = e => {
        e.preventDefault();
        const r = e.target.closest('.sidebar-item').getBoundingClientRect();
        panel.style.left = r.right + 12 + 'px';
        panel.style.top = r.top + 'px';
        overlay.style.display = 'block';
        panel.classList.remove('hidden');
        input.focus();
    };

    overlay.onclick = e => {
        if (e.target === overlay) overlay.style.display = 'none';
    };
}

initSearch();

/* ================= Notifications ================= */
function initNotifications() {
    const overlay = document.createElement('div');
    overlay.className = 'notifications-overlay';

    const panel = document.createElement('div');
    panel.className = 'notifications-panel hidden';

    panel.innerHTML = `
        <div class="notification-item">
            <img class="notification-avatar">
            <div>
                <div class="notification-title">User</div>
                <div class="notification-text">Sent you a request</div>
            </div>
        </div>
    `;

    overlay.append(panel);
    document.body.append(overlay);

    document.querySelectorAll('.sidebar-item')
        .find(a => a.textContent.trim() === 'Notifications')
        ?.addEventListener('click', e => {
            e.preventDefault();
            const r = e.target.closest('.sidebar-item').getBoundingClientRect();
            panel.style.left = r.right + 12 + 'px';
            panel.style.top = r.top + 'px';
            overlay.style.display = 'block';
            panel.classList.remove('hidden');
        });

    overlay.onclick = e => {
        if (e.target === overlay) overlay.style.display = 'none';
    };
}

initNotifications();
