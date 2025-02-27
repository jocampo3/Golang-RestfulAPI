export async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/albums');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching data: ', error);
        return null; // Return null to avoid breaking React state
    }
}
