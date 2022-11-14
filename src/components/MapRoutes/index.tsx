import React, {FC} from 'react';
import {Layer, Source} from "react-map-gl";

interface MapRoutesProps {
    routes: [number, number][]
}

const MapRoutes: FC<MapRoutesProps> = ({routes}) => {
    return (
        <Source
            id="route"
            type="geojson"
            data={{
                type: 'FeatureCollection',
                features: [routes].map((route) => ({
                    type: 'Feature',
                    geometry: {coordinates: route, type: 'LineString'},
                    properties: {},
                })) || [],
            }}
        >
            <Layer id="route" type="line" paint={{'line-width': 4, 'line-color': '#4695F9'}}/>
        </Source>
    );
};

export default MapRoutes;