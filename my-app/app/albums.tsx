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

export async function createAlbum(albumData) {
    try {
        const response = await fetch('http://localhost:8080/albums', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(albumData),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response.json();
    } catch (error) {
        console.error('Error creating album: ', error);
        throw error;
    }
}

export async function updateAlbum(id, albumData) {
    try {
        const response = await fetch(`http://localhost:8080/albums/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(albumData),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response.json();
    } catch (error) {
        console.error('Error updating album: ', error);
        throw error;
    }
}

export async function deleteAlbum(id) {
    try {
        const response = await fetch(`http://localhost:8080/albums/${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return true;
    } catch (error) {
        console.error('Error deleting album: ', error);
        throw error;
    }
}