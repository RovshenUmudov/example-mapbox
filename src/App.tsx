import React, {useEffect, useRef, useState} from 'react';
import ReactMapGL, {MapRef, NavigationControl} from 'react-map-gl';
import {useMapPathGet} from "./hooks/map";
import MapPin from "./components/MapPin";
import MapRoutes from "./components/MapRoutes";

export type Route = [number, number][];

const App = () => {

    const mapRef = useRef<MapRef>(null);
    const mapPathGet = useMapPathGet();
    const pins: Route = [[30.511236, 50.4690939], [30.592171, 50.4380157]];

    const [routes, setRoutes] = useState<Route>([]);

    const fetchRoute = (route: Route) => {
        mapPathGet.fetch(route).then((res) => {
            if (res.data.routes.length) {
                if (res.data.routes[0].geometry.coordinates.length > 23) {
                    const allRoutes = res.data.routes[0].geometry.coordinates;
                    const simpleRoute: Route = [];
                    const step = Math.floor(allRoutes.length / 23);

                    for (let i = 0; i < allRoutes.length - 1; i += step) {
                        simpleRoute.push(allRoutes[i += step]);
                    }

                    simpleRoute.push(allRoutes[allRoutes.length - 1]);

                    return setRoutes(simpleRoute);
                }

                return setRoutes(res.data.routes[0].geometry.coordinates);
            }
        });
    };

    useEffect(() => {
        fetchRoute([pins[0], pins[pins.length - 1]]);
    }, [])

    const mapFitBounds = () => {
        if (mapRef.current && routes && routes[0] !== routes[routes.length - 1]) {
            mapRef.current.fitBounds([
                    routes[0],
                    routes[routes.length - 1],
                ], { padding: 200, duration: 800}
            );
        }
    };

    return (
        <ReactMapGL
            ref={mapRef}
            mapboxAccessToken={process.env.REACT_APP_MAP_KEY}
            initialViewState={{
                longitude: 30.5234,
                latitude: 50.4501,
                zoom: 4.5
            }}
            attributionControl={false}
            style={{width: 1000, height: 600}}
            mapStyle="mapbox://styles/mapbox/light-v10"
            onLoad={() => mapFitBounds()}
        >
            {
                pins.map((pin) => (
                    <MapPin key={pin[0]} longitude={pin[0]} latitude={pin[1]}/>
                ))
            }
            <MapRoutes routes={routes}/>
            <NavigationControl/>
        </ReactMapGL>
    );
};

export default App;
