import axios from "axios";

export const fetchGeo = async ()  => {
            const getPosition = () => {
                if (navigator.geolocation) {
                    return new Promise((res, rej) => {
                        navigator.geolocation.getCurrentPosition(res, rej);
                    });
                }
            }
            const  position : GeolocationPosition = await getPosition() as GeolocationPosition;
            const coords = position.coords;
            const geocode = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=AIzaSyAL2zIiicmxGGnYQi27WYw1Ip6LbU73mNI&language=en`)
            let output = {};
            if (geocode.data.status) {
                if (geocode.data.results.length > 0) {
                    geocode.data.results.map((result: { address_components: any[]; }) => {
                        if (result.address_components.length > 0) {
                            result.address_components.map(address => {
                                if (address.types[0]) {
                                    output = address.long_name;
                                    }
                                })
                            }
                        })
                }
             }
            return output;
}
