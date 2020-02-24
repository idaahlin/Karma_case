// Fetch locations from url
let LocationService = {
    async fetchLocations() {
        try {
            let response = await fetch(
                //'https://storage.googleapis.com/misc-internal/public/locations_filtered.json',
                'https://jsonplaceholder.typicode.com/users',
            );
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }
};

export default LocationService;