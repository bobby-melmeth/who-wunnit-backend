const config = {
    apiUrl: 'https://localhost:8080/',
    authToken: 'your-auth-token',
    headers: {
      'Content-Type': 'application/json',
        'X-Auth-Token': process.env.API_KEY
    },
  };

  export default config;