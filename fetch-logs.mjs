import https from 'https';

https.get('https://api.github.com/repos/DazzlingCy/movevi_1.0.1/actions/jobs/78772592255/logs', {
  headers: {
    'User-Agent': 'node.js'
  }
}, (res) => {
  if (res.statusCode === 301 || res.statusCode === 302) {
    https.get(res.headers.location, (res2) => {
      let data = '';
      res2.on('data', (c) => data += c);
      res2.on('end', () => console.log(data));
    });
  } else {
    let data = '';
    res.on('data', (c) => data += c);
    res.on('end', () => console.log(data));
  }
});
