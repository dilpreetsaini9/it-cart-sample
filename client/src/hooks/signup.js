const BASE_URL = process.env.REACT_APP_SIGNUP;

export async function signup(body) {
  try {
    const signingUp = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (signingUp.ok) {
      const response = await signingUp.json();
    
        if ( response.message === "success"){
            localStorage.setItem('token' , response.token)
            return "DONE"
        }
    } else {
            return "ERROR"
    }
  } catch (error) {
     return "ERROR"
  }
}
