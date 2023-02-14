import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import React from 'react'
import { useState, useRef, useMemo, useCallback } from 'react'

function DraggableMarker() {
  const center = {
    lat: 51.505,
    lng: -0.09,
  }

  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
          console.log(marker.getLatLng())
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}

function BasicMap() {
  const center = {
    lat: 51.505,
    lng: -0.09,
  }
  return(
  <div className='map' style={{paddingLeft:"8em", paddingTop:"5em"}}>
    <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{height: "50vh", width:"50vh", padding: "5em" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker />
    </MapContainer>
    </div>
  )
}

export default BasicMap
