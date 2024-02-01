

// Payment.js
export async function createGateway() {
    let url = process.env.REACT_APP_GATEWAY

    try {

        let cart = JSON.parse(localStorage.getItem('CART'))
        let token = localStorage.getItem('token')

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(cart)
        });

        if (response.ok) {
            const data = await response.json();
          
            window.location.href = data.url

        } else {
            console.error('Failed to create gateway:', response.statusText);
        }
    } catch (error) {
        console.error('Error creating gateway:', error);
    }
}