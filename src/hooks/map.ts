import axios, {AxiosResponse} from "axios";
import {useState} from "react";

export interface DrivingDirection {
    routes: {
        geometry: {
            coordinates: [number, number][];
            type: 'LineString';
        };
    }[];
}

interface UseMapPathGet {
    fetch: (path: [number, number][], alternatives?: boolean) => Promise<AxiosResponse<DrivingDirection>>;
    loading: boolean
}

export const useMapPathGet = ():UseMapPathGet => {
    const [loading, setLoading] = useState<boolean>(false);

    const fetch = (path: [number, number][], alternatives = false) => {
        setLoading(true);

        const paths: string = path
            .filter((p) => p)
            .map((coords) => coords?.join(','))
            .join(';');

        return axios.get<DrivingDirection>(`https://api.mapbox.com/directions/v5/mapbox/driving/${paths}?`, {
            params: {
                alternatives,
                access_token: process.env.REACT_APP_MAP_KEY,
                geometries: 'geojson',
                overview: 'simplified',
                steps: true,
            },
        }).finally(() => setLoading(false));
    };

    return { fetch, loading };
};