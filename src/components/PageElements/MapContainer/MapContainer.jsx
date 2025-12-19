
import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import './MapContainer.css'
import 'mapbox-gl/dist/mapbox-gl.css';
function MapContainer({ longitude, latitude }) {
    const mapRef = useRef()
    const mapContainerRef = useRef()
    const INITIAL_CENTER = [
        latitude,longitude
        
    ]
    const INITIAL_ZOOM = 18
    const [center, setCenter] = useState(INITIAL_CENTER)
    const [zoom, setZoom] = useState(INITIAL_ZOOM)
    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: center,
            zoom: zoom
        });
        mapRef.current.on('move', () => {
            // get the current center coordinates and zoom level from the map
            const mapCenter = mapRef.current.getCenter()
            const mapZoom = mapRef.current.getZoom()

            // update state
            setCenter([mapCenter.lng, mapCenter.lat])
            setZoom(mapZoom)
        })

        return () => {
            mapRef.current.remove()
        }
    }, [longitude, latitude])
    const handleButtonClick = () => {
        mapRef.current.flyTo({
            center: INITIAL_CENTER,
            zoom: INITIAL_ZOOM
        })
    }


    return (
        <>

            <div id='map-container' ref={mapContainerRef}>
                {/* <div className="sidebar">
                    Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
                </div> */}
                <button className='reset-button' onClick={handleButtonClick}>
                    Reset
                </button>                
            </div>
        </>
    )


}
export default MapContainer