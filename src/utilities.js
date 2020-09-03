import axios from 'axios';
import qs from 'qs';

export const getAuth = async () => {

    /* Store these privately as ENV variables */
    const clientId = '4e2a6912b9e045808dbca2542fdf923c';
    const clientSecret = '63fd10cdcb314cacb362454eacd4b803';

    const headers = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: clientId,
            password: clientSecret,
          },
    };

    const data = {
        grant_type: 'client_credentials',
    };

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify(data),
            headers
        );
        return response.data.access_token;
    } catch (error) {
        console.log(error);
    }

}