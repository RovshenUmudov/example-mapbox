import React, {FC} from 'react';
import {Marker} from "react-map-gl";

interface MapPinProps {
    longitude: number,
    latitude: number
}

const MapPin: FC<MapPinProps> = ({longitude, latitude}) => {
    return (
        <Marker longitude={longitude} latitude={latitude}>
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M32 16.2393C32 29.8478 16 39 16 39C16 39 0 29.8478 0 16.2393C0 7.27059 7.16344
         0 16 0C24.8366 0 32 7.27059 32 16.2393Z"
                    fill="#5e35b1"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.8604 44C16.8711 44 17.6904 43.163 17.6904 42.1305C17.6904 41.098 16.8711 40.261 15.8604 40.261C14.8497
         40.261 14.0303 41.098 14.0303 42.1305C14.0303 43.163 14.8497 44 15.8604 44Z"
                    fill="#5e35b1"
                />
            </svg>
        </Marker>
    );
};

export default MapPin;