let url = process.env.REACT_APP_PROFILE


export async function fetchprofile(token) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        return data.userInfo;
    } catch (error) {
        console.error(error);
        return null;
    }
}