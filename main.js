document.addEventListener("DOMContentLoaded", function() {
    let seenUrls = new Map();

    async function loadRSSFeed(feedUrl, containerId) {
        const response = await fetch(feedUrl);
        const data = await response.json();
        const container = document.getElementById(containerId);
        let newsContent = container.querySelector(".news-content") || document.createElement('div');
        let isNewContentAvailable = false;

        if (!newsContent.classList.contains('news-content')) {
            newsContent.className = 'news-content';
            container.appendChild(newsContent);
        }

        for (const item of data.items) {
            if (!seenUrls.get(containerId)?.has(item.url)) {
                seenUrls.get(containerId)?.add(item.url);
                isNewContentAvailable = true;

                // Проверяем на новизну новости для добавления анимации
                const pubDate = new Date(item.date_published);
                if ((new Date() - pubDate) / 1000 < 300) {
                    container.classList.add('highlight-feed');
                    setTimeout(() => {
                        container.classList.remove('highlight-feed');
                    }, 300000); // Убираем подсветку через 5 минут
                }
            }
        }

        if (isNewContentAvailable) {
            newsContent.innerHTML = '';
            for (const item of data.items) {
                const element = createNewsElement(item);
                newsContent.appendChild(element);
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
        { url: 'https://rss.app/feeds/v1.1/h0YkuWrlqeASkSpv.json', container: 'feed1' },
        { url: 'https://rss.app/feeds/v1.1/YXCYsI9sbiSf7Ppm.json', container: 'feed2' },
        { url: 'https://rss.app/feeds/v1.1/LIlAW20WViRDQNRE.json', container: 'feed3' },
        { url: 'https://rss.app/feeds/v1.1/E8124TmLb6nh3hj8.json', container: 'feed4' },
        { url: 'https://rss.app/feeds/v1.1/YJqELmsb2lLnTYGb.json', container: 'feed5' },
        { url: 'https://rss.app/feeds/v1.1/rP0T3x1Dq2yffbNp.json', container: 'feed6' },
        { url: 'https://rss.app/feeds/v1.1/586VeqykkftLztxX.json', container: 'feed7' },
        { url: 'https://rss.app/feeds/v1.1/gxWRHrUQxG6TD3nk.json', container: 'feed8' },
        { url: 'https://rss.app/feeds/v1.1/rvmb4CgTpLonUAL2.json', container: 'feed9' },
        { url: 'https://rss.app/feeds/v1.1/71z2rBLxTwKMqavp.json', container: 'feed10' },
        { url: 'https://rss.app/feeds/v1.1/VLR0BV5TeH36DZMj.json', container: 'feed11' },
        { url: 'https://rss.app/feeds/v1.1/MC92O2sUva2rplCt.json', container: 'feed12' },
        { url: 'https://rss.app/feeds/v1.1/800rI29SX0FnlDKE.json', container: 'feed13' },
        { url: 'https://rss.app/feeds/v1.1/Q5wwXJU5S33rbv3c.json', container: 'feed14' },
        { url: 'https://rss.app/feeds/v1.1/5Jbh3ic3Pj2MGVy5.json', container: 'feed15' },
        { url: 'https://rss.app/feeds/v1.1/yURNz9d6Su7aakxR.json', container: 'feed16' },
        { url: 'https://rss.app/feeds/v1.1/kPqdFsH9PsHfIZwi.json', container: 'feed17' },
        { url: 'https://rss.app/feeds/v1.1/uGTjYyubT2i3BPAo.json', container: 'feed18' },
        { url: 'https://rss.app/feeds/v1.1/2cBh9BQb3vh5iYaa.json', container: 'feed19' },
        { url: 'https://rss.app/feeds/v1.1/4bNjyEmLtU6uz7fm.json', container: 'feed20' },
        { url: 'https://rss.app/feeds/v1.1/NGEersP8EgUCJA4G.json', container: 'feed21' },
        { url: 'https://rss.app/feeds/v1.1/yx5O9n7pKhjrZZgo.json', container: 'feed22' },
        { url: 'https://rss.app/feeds/v1.1/d2kU09PL53XiubDK.json', container: 'feed23' },
        { url: 'https://rss.app/feeds/v1.1/bvv786sOwGBxw7Za.json', container: 'feed24' },
        { url: 'https://rss.app/feeds/v1.1/lxzjqaLsMRKPka0f.json', container: 'feed25' },
        { url: 'https://rss.app/feeds/v1.1/SG3X7cAamP70nXng.json', container: 'feed26' },
        { url: 'https://rss.app/feeds/v1.1/pwyPiIXukfw6nnxl.json', container: 'feed27' },
        { url: 'https://rss.app/feeds/v1.1/G8LnJf0QNfAldPxj.json', container: 'feed28' },
        { url: 'https://rss.app/feeds/v1.1/cLTL032WCxD0IuNH.json', container: 'feed29' },
        { url: 'https://rss.app/feeds/v1.1/pCZ8nBbXQSYEqaNK.json', container: 'feed30' },
        { url: 'https://rss.app/feeds/v1.1/hUkRXjPT4QJJ94KE.json', container: 'feed31' },
        { url: 'https://rss.app/feeds/v1.1/fyI7sEPS2ASJT2nf.json', container: 'feed32' },
        { url: 'https://rss.app/feeds/v1.1/pLv5wCuOBATQgpAb.json', container: 'feed33' },
        { url: 'https://rss.app/feeds/v1.1/FuiomoRmC0hDmyc6.json', container: 'feed34' },
        { url: 'https://rss.app/feeds/v1.1/2emijnn1AazAI4GQ.json', container: 'feed35' },
        { url: 'https://rss.app/feeds/v1.1/q2GjCuKryEVGjfgi.json', container: 'feed36' },
        { url: 'https://rss.app/feeds/v1.1/jur2d9c1Ba4PSG2n.json', container: 'feed37' },
        { url: 'https://rss.app/feeds/v1.1/D0UJB4RMdV24D0kb.json', container: 'feed38' },
        { url: 'https://rss.app/feeds/v1.1/kgR0MBVufWcFXhg8.json', container: 'feed39' },
        { url: 'https://rss.app/feeds/v1.1/xJJljZ1P9EBZ2fEL.json', container: 'feed40' },
        { url: 'https://rss.app/feeds/v1.1/sMqi8tVusShgC3NJ.json', container: 'feed41' },
        { url: 'https://rss.app/feeds/v1.1/i1tbIlazHgSEZbFL.json', container: 'feed42' },
        { url: 'https://rss.app/feeds/v1.1/KamBbkXM8nTlgVqP.json', container: 'feed43' },
        { url: 'https://rss.app/feeds/v1.1/27y9D4NxqwL88cE4.json', container: 'feed44' },
        { url: 'https://rss.app/feeds/v1.1/f3NISHe7d1MTGoup.json', container: 'feed45' },
        { url: 'https://rss.app/feeds/v1.1/Wva1lB9GK5P1v2a8.json', container: 'feed46' },
        { url: 'https://rss.app/feeds/v1.1/BZGq2qV86EJxctKY.json', container: 'feed47' },
        { url: 'https://rss.app/feeds/v1.1/29HWByrc4QyJDT7e.json', container: 'feed48' },

        // Добавьте другие URL-адреса новостных каналов здесь
      ];

          feedUrls.forEach(feed => {
              seenUrls.set(feed.container, new Set());
              loadRSSFeed(feed.url, feed.container);
              setInterval(() => loadRSSFeed(feed.url, feed.container), 30000);
          });

          // Функция для фильтрации RSS-каналов
          function filterRssFeeds(category) {
              const rssFeeds = document.querySelectorAll(".rss-feed");

              rssFeeds.forEach(function (rssFeed) {
                  const dataCategory = rssFeed.getAttribute("data-category");

                  if (category === "all" || dataCategory === category) {
                      rssFeed.classList.add('active');
                  } else {
                      rssFeed.classList.remove('active');
                  }
              });
          }

          // Обработчики событий для фильтров
          document.querySelectorAll(".filter").forEach(function (filter) {
              filter.addEventListener("click", function () {
                  const category = this.getAttribute("data-category");
                  filterRssFeeds(category);
              });
          });

          // Обработчик события для кнопки "All"
          const newsItems = document.querySelectorAll('.rss-feed');
          newsItems.forEach(item => {
              item.addEventListener('click', function() {
                  this.classList.toggle('enlarged');
              });
          });

          // Удаление увеличения при клике вне новостного элемента
          document.addEventListener('click', function(e) {
              if (!e.target.closest('.rss-feed')) {
                  newsItems.forEach(item => {
                      item.classList.remove('enlarged');
                  });
              }
          });
          // Активировать вкладку "All" при загрузке страницы
    document.getElementById('restore-all').click();
      });
      
