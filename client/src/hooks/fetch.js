
const BASE_URL = process.env.REACT_APP_BASE_URL;


export async function fetchAllProduct() {
    try {
        const response = await fetch(BASE_URL + "/products");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return null;
    }
}

    

