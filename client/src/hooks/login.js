
const BASE_URL = process.env.REACT_APP_LOGIN

export async function login(body) {
    try {
      const loginIN = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (loginIN.ok) {
        const response = await loginIN.json();
          
          if ( response.token ){
              return response
          }
      } else {
          return null
      }
    } catch (error) {
          return null
    }
  }