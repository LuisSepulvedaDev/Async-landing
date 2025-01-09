const APILast = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC9k0tTsh_qStx0HPuPftSsg%20&part=snippet%2Cid&order=date&maxResults=9';
const contentLast = null || document.querySelector('#last-youtube');
const APISuggested = 'https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=tuLkWShN8V4&part=id%2Csnippet&type=video&maxResults=9';
const contentSuggested = null || document.querySelector('#suggested');

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '37b0653c31msh3ba3f704774096ep1fb36fjsnceba132cb363',
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const videos = await fetchData(APILast);
        let view = `
        ${videos.items.map(video => `
        <div class="group relative">
          <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
          <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${video.snippet.title}
            </h3>
          </div>
          </a>
        </div>
        `).slice(0,8).join('')}
        `;
        contentLast.innerHTML = view;
    } catch (error) {
        console.error('Error:', error);
    }
    try {
      const videos = await fetchData(APISuggested);
      let view = `
      ${videos.items.map(video => `
      <div class="group relative">
      <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
        </a>
      </div>
      `).slice(0,8).join('')}
      `;
      contentSuggested.innerHTML = view;
  } catch (error) {
      console.error('Error:', error);
  }
})();


