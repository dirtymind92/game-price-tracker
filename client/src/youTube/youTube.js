function searchVideo(keywords, maxResults = 3) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${keywords}&regionCode=US&type=video&videoCategoryId=20&videoEmbedable=true&key=`;
    const key = process.env.youTubeKey || require('../local-dev-creds').youTubeKey;
    const request = apiUrl + key;
    fetch(request, { method: 'GET' })
      .then(resp => resp.json())
      .then(resp => {
        resolve(resp.items[0].id.videoId);
      })
      .catch(err => reject(err.message));
  });
}


export default {
  searchVideo
};
