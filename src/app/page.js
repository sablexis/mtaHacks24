"use client"
import Image from "next/image";
import React from 'react';
import { useRef, useState, useEffect } from "react";
import styles from "./page.module.css";
import Head from "next/head";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1Ijoic3NhbmR5MjQiLCJhIjoiY2x0YWJ5Y2oxMDZxejJpcGtoMHRmYjA0ZiJ9.dBWQjU5ZLnYd55fBM-bWiw';

export default function Home() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
 
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom: zoom
  });
 
  map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <main className={styles.main}>
      <Head>
      <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
      </Head>

      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
      
    </main>
  );
}
