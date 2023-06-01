const config = {
    apiUrl: 'http://api.football-data.org/v4/',
    authToken: 'your-auth-token',
    headers: {
      'Content-Type': 'application/json',
        'X-Auth-Token': process.env.API_KEY
    },
  };

  export default config;