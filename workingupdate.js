document.addEventListener("DOMContentLoaded", function() {
    let seenUrls = new Map(); // Changed to a Map to track URLs per container

    async function loadRSSFeed(feedUrl, containerId) {
        const response = await fetch(feedUrl);
        const data = await response.json();
        const container = document.getElementById(containerId);
        let isNewContentAvailable = false;

        for (const item of data.items) {
            if (!seenUrls.get(containerId)?.has(item.url)) {
                seenUrls.get(containerId)?.add(item.url);
                isNewContentAvailable = true;
            }
        }

        if (isNewContentAvailable) {
            container.innerHTML = ''; // Clear container for new content
            for (const item of data.items) {
                const element = createNewsElement(item);
                container.appendChild(element);
            }
        }
    }

    function createNewsElement(item) {
        const element = document.createElement('div');
        element.className = 'rss-item';
        element.id = 'item-' + item.id;
        element.innerHTML = `<p>${item.content_html}</p><p><small>${new Date(item.date_published).toLocaleString()}</small></p>`;
        return element;
    }

    const feedUrls = [
        // ... your feed URLs
    ];

    feedUrls.forEach(feed => {
        seenUrls.set(feed.container, new Set()); // Initialize an empty Set for each container
        loadRSSFeed(feed.url, feed.container);
        setInterval(() => loadRSSFeed(feed.url, feed.container), 30000);
    });

    // ... rest of your functions (filterRssFeeds, event listeners, etc.)
});
