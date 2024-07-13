import axios from 'axios';

function addStartTime(config) {
  config.metadata = { startTime: new Date() };
  return config;
}

function logRequestDuration(config) {
  const startTime = config.metadata.startTime;
  const endTime = new Date();
  const duration = endTime - startTime;
}

// Add a request interceptor
axios.interceptors.request.use(addStartTime);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    logRequestDuration(response.config);
    console.log('response: ', response);
    return response;
  },
  function (error) {
    if (error.config) {
      logRequestDuration(error.config);
    }
    return Promise.reject(error);
  }
);

(async () => {
  try {
    const response = await axios.get('/api/data/articles?timeout=3000');
    const articles = response.data.articles;

    document.querySelector('#data').innerHTML = articles[0].content;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
