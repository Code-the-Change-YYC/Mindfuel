/* global google */
import React, { ReactElement, useEffect, useState } from "react";

import { Theme, useMediaQuery } from "@material-ui/core";
import GoogleMapReact, {
  ChangeEventValue,
  Coords,
  Maps,
} from "google-map-react";
import _ from "lodash";
import { useSelector } from "react-redux";

import useGroupedUsers from "../../hooks/useGroupedUsers";
import { AppState } from "../../utils/AppState";
import { AppUserLocation } from "../../utils/AppUserLocation.model";
import { Location } from "../../utils/Location";
import { MapBounds } from "../../utils/MapBounds";
import { User } from "../../utils/User";
import styles from "./Map.module.css";
import MapMarker from "./MapMarker/MapMarker";

type MapProps = {
  onMapBoundsChange: (mapBounds?: MapBounds) => void;
  center: AppUserLocation;
};

type Position = {
  lat: number;
  lng: number;
  weight?: number;
};

type Heatmap = {
  positions: Position[];
  options: {
    radius?: number;
    opacity?: number;
  };
};

const Map = (props: MapProps) => {
  const [center, setCenter] = useState<Coords>({
    lat: props.center.latitude,
    lng: props.center.longitude,
  });
  const [mapTypeId, setMapTypeId] = useState("roadmap");
  const [markers, setMarkers] = useState<ReactElement[]>([]);
  const [mapsApi, setMapsApi] = useState<google.maps.Map>();
  const [heatmapData, setHeatmapData] = useState<Heatmap>({
    positions: [],
    options: {},
  });
  const [disableDoubleClickZoom, setDisableDoubleClickZoom] = useState(false);
  const defaultZoom = 3;

  // App state variables
  const liveUsers: User[] = useSelector((state: AppState) => state.liveUsers);
  const historicalUsers: User[] | null = useSelector(
    (state: AppState) => state.historicalUsers
  );
  const newUser: User | null = useSelector((state: AppState) => state.newUser);
  const heatmapEnabled: boolean = useSelector(
    (state: AppState) => state.heatmapEnabled
  );
  const groupedUsers = useGroupedUsers(liveUsers, historicalUsers);

  // Hide map control for mobile screens
  const showMapControl = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("sm")
  );
  const defaultMapOptions = (maps: Maps) => {
    return {
      zoomControl: false,
      disableDoubleClickZoom: disableDoubleClickZoom,
      minZoom: 3,
      restriction: {
        latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
      },
      mapTypeControl: showMapControl,
      mapTypeId: mapTypeId,
      mapTypeControlOptions: {
        style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: maps.ControlPosition.LEFT_TOP,
        mapTypeIds: [
          maps.MapTypeId.ROADMAP,
          maps.MapTypeId.SATELLITE,
          maps.MapTypeId.HYBRID,
        ],
      },
    };
  };

  // Update map center on props change, e.g. when user gives location permission after timeout
  useEffect(() => {
    setCenter({ lat: props.center.latitude, lng: props.center.longitude });
  }, [props.center]);

  // Update the markers on the map when historical or live users are added
  useEffect(() => {
    if (!_.isNil(groupedUsers)) {
      const locationList: any = [];
      const markers: ReactElement[] = [];
      Object.entries(groupedUsers).forEach(([, users], index) => {
        // Set the marker as open if the new user is contained in the list of users
        const open: boolean = !_.isNil(newUser) && _.some(users, newUser);
        locationList.push({
          lat: users[0].payload.location.latitude,
          lng: users[0].payload.location.longitude,
        });
        markers.push(
          <MapMarker
            key={`${index} + ${open}`}
            users={users}
            newUser={_.isNil(historicalUsers) ? newUser : null}
            open={open}
            lat={users[0].payload.location.latitude} // Take the first user's location since they are all the same
            lng={users[0].payload.location.longitude}
            onMarkerClick={handleMarkerClick}
            onMarkerEnter={handleMarkerEnter}
            onMarkerLeave={handleMarkerLeave}
          ></MapMarker>
        );
      });
      const heatmapEntries = {
        positions: locationList,
        options: {
          radius: 35,
        },
      };
      setHeatmapData(heatmapEntries);
      setMarkers(markers);

      if (_.isNil(historicalUsers) && !_.isNil(newUser)) {
        setCenter({
          lat: newUser.payload.location.latitude,
          lng: newUser.payload.location.longitude,
        });
      }
    }
  }, [groupedUsers, newUser, historicalUsers]);

  const getMapBounds = (
    bounds: google.maps.LatLngBounds | undefined
  ): MapBounds | undefined => {
    if (_.isNil(bounds)) {
      return undefined;
    }

    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    return {
      lat: {
        lower: _.round(sw.lat(), 3),
        upper: _.round(ne.lat(), 3),
      },
      lng: {
        lower: _.round(sw.lng(), 3),
        upper: _.round(ne.lng(), 3),
      },
    };
  };

  const handleGoogleApiLoad = (maps: { map: google.maps.Map }) => {
    setMapsApi(maps.map);
    props.onMapBoundsChange(getMapBounds(maps.map.getBounds()));
  };

  const handleMapChange = (value: ChangeEventValue) => {
    // Capture change in center position and bounds when the map is moved
    setCenter(value.center);
    props.onMapBoundsChange(getMapBounds(mapsApi?.getBounds()));
  };

  const handleMapTypeIdChange = (mapTypeId: string) => {
    setMapTypeId(mapTypeId);
  };

  const handleMarkerClick = (userLocation: Location) => {
    setCenter({ lat: +userLocation.latitude, lng: +userLocation.longitude });
  };

  const handleMarkerEnter = () => {
    setDisableDoubleClickZoom(true);
  };

  const handleMarkerLeave = () => {
    setDisableDoubleClickZoom(false);
  };

  return (
    <div className={styles.map}>
      {!heatmapEnabled && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: `${[process.env.REACT_APP_GOOGLE_MAPS_API_KEY]}`,
          }}
          onGoogleApiLoaded={handleGoogleApiLoad}
          onChange={handleMapChange}
          onMapTypeIdChange={handleMapTypeIdChange}
          defaultZoom={defaultZoom}
          center={center}
          options={defaultMapOptions}
          yesIWantToUseGoogleMapApiInternals={true}
          heatmapLibrary={true}
          heatmap={undefined}
        >
          {markers}
        </GoogleMapReact>
      )}
      {heatmapEnabled && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: `${[process.env.REACT_APP_GOOGLE_MAPS_API_KEY]}`,
          }}
          onGoogleApiLoaded={handleGoogleApiLoad}
          onChange={handleMapChange}
          onMapTypeIdChange={handleMapTypeIdChange}
          defaultZoom={defaultZoom}
          center={center}
          options={defaultMapOptions}
          yesIWantToUseGoogleMapApiInternals={true}
          heatmapLibrary={true}
          heatmap={heatmapData}
        ></GoogleMapReact>
      )}
    </div>
  );
};

export default Map;
