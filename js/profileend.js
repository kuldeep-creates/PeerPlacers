document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.activity-tabs button');
    const contentBox = document.querySelector('.activity-content');

    const tabContent = {
        recent: 'Recent solved problems shown here.',
        list: 'Your custom problem lists appear here.',
        solution: 'Your submitted solutions appear here.',
        discuss: 'Your discussion threads appear here.'
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(btn => btn.classList.remove('active'));
            tab.classList.add('active');

            const tabKey = tab.getAttribute('data-tab');
            contentBox.textContent = tabContent[tabKey] || 'No content available.';
        });
    });
});
