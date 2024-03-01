
$(document).ready(function() {
    let newsIds = [];
    let currentNewsIndex = 0;
    const pageSize = 10;

    function loadNews() {
        const apiUrl = `https://hacker-news.firebaseio.com/v0/newstories.json`;

        $.get(apiUrl, function(data) {
            newsIds = data;
            loadNextPage();
        });
    }

    function loadNextPage() {
        const endIndex = Math.min(currentNewsIndex + pageSize, newsIds.length);
        const newsSlice = newsIds.slice(currentNewsIndex, endIndex);

        newsSlice.forEach(function(newsId) {
            const apiUrl = `https://hacker-news.firebaseio.com/v0/item/${newsId}.json`;

            $.get(apiUrl, function(data) {
                const newsHtml = `
                    <a href="${data.url}" class="list-group-item list-group-item-action" target="_blank">
                    <p class="mb-1">${new Date(data.time * 1000).toLocaleDateString()}</p>
                        <h5 class="mb-1">${data.title}</h5>
                        <small>${data.url}</small>
                    </a>
                `;

                $('#newsList').append(newsHtml);
            });
        });

        currentNewsIndex += pageSize;
    }

    $('#loadMoreBtn').click(function() {
        loadNextPage();
    });

    loadNews();
});