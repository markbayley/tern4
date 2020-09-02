import React, { useState } from "react";
import {
  Map,
  TileLayer,
} from "react-leaflet";
import Leaflet from "leaflet";
import { useSelector } from "react-redux";
import ImageMarkerEngine from "./ImageMarkerEngine";
import NoResults from "../bio-search/NoResults";
import AppError from "../bio-search/AppError";

const BioMapEngine = () => {
  const [mapInitState] = useState({
    lat: -26.47,
    lng: 134.02,
    zoom: 5,
    maxZoom: 30,
    minZoom: 5,
  });
  const mapInitPosition = [mapInitState.lat, mapInitState.lng];
  const sites = useSelector((state) => state.search.facets.site_id.buckets);
  const totalImages = useSelector((state) => state.search.totalDocuments);

  const error = useSelector((state) => state.search.error);

  const selectedSites = useSelector((state) => state.ui.searchFilters.site_id);
  const selectedSiteIds = new Set(selectedSites.map((site) => site.value));

  // Set map boundary (australia)
  const corner1 = Leaflet.latLng(-9.820066, 115.240312);
  const corner2 = Leaflet.latLng(-44.482812, 152.339923);
  const bounds = Leaflet.latLngBounds(corner1, corner2);

  const BioMap = () => (
    <div className="map-frame">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossOrigin=""
      />
      <div id="map-id">
        <Map
          className="markercluster-map"
          center={mapInitPosition}
          zoom={mapInitState.zoom}
          style={{ zIndex: "1" }}
          scrollWheelZoom={false}
          minZoom={mapInitState.zoom}
          maxBounds={bounds}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* <FeatureGroup>
            <EditControl
              position="bottomright"
            // onEdited={this._onEditPath}
            // onCreated={this._onCreate}
            // onDeleted={this._onDeleted}
            />
            <Circle center={[51.51, -0.06]} radius={200} />
          </FeatureGroup> */}

          {/* API Markers */}
          {/* TODO: decide what we want:
                    if map is a facet selector we want to show all sites and
                       use styles to show selected and 0 result sites. (current impl.)
                    if map shows result sites, we need to change the API to
                       return a site aggregation with sub aggregations about additional data.
          */}
          {sites.map((site) => (
            <ImageMarkerEngine
              site={site}
              key={site.key}
              selected={selectedSiteIds.has(site.key)}
            />
          ))}
        </Map>
      </div>
    </div>
  );

  // return <>{totalImages === 0 ? <NoResults /> : <BioMap />}</>;
  if (error) {
    return (
      <AppError />
    );
  } if (totalImages === 0) {
    return <NoResults />;
  }
  return <BioMap />;
};
export default BioMapEngine;
