import React, { useEffect, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import _ from "lodash";
import { useSelector } from "react-redux";

import styles from "./Home.module.css";
import SocketService from "api/SocketService";
import AppAlert from "components/AppAlert";
import Filter from "components/Filter";
import Map from "components/Map";
import MyLocation from "components/MyLocation";
import SearchAreaButton from "components/SearchAreaButton";
import SideNav from "components/SideNav";
import Socials from "components/Socials";
import StatsSummary from "components/StatsSummary";
import Timeline from "components/Timeline";
import WSConnectionStatus from "components/WSConnectionStatus";
import { fetchHistoricalUsers, updateHistoricalUsers } from "state/actions";
import { useAppDispatch } from "state/hooks";
import { AlertModel } from "utils/Alert.model";
import { AppState } from "utils/AppState";
import { ActivityFilter } from "utils/FilterOption.model";
import { MapBounds } from "utils/MapBounds";
import { User } from "utils/User";

const Home = () => {
  const dispatch = useAppDispatch();
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>();
  const [mapBounds, setMapBounds] = useState<MapBounds>();
  const [startDate, setStartDate] = useState<Date | null>();
  const [showSearchAreaButton, setShowAreaButton] = useState<boolean>(false);
  const [showWSConnectionStatus, setShowWSConnectionStatus] = useState<boolean>(false);
  const loadingClasses = {
    root: styles.loadingIndicatorRoot,
    colorPrimary: styles.loadingIndicatorColor,
  };

  // App state variables
  const alert: AlertModel | null = useSelector((state: AppState) => state.alert);
  const loading = useSelector((state: AppState) => state.loading);
  const historicalUsers: User[] | null = useSelector((state: AppState) => state.historicalUsers);
  const heatmapToggle: boolean = useSelector((state: AppState) => state.heatmapEnabled);

  useEffect(() => {
    // Connect to socket on mount
    const websocketAddress = `${[process.env.REACT_APP_MINDFUEL_WEBSOCKET]}`;

    SocketService.connect(websocketAddress);

    // Call disconnect() on unmount
    return () => {
      SocketService.disconnect();
    };
  }, []); // Pass in an empty array to only run an effect once.

  useEffect(() => {
    setShowAreaButton(false);
    getHistoricalUsers();
  }, [heatmapToggle]);

  const handleMapBoundsChange = (newMapBounds?: MapBounds) => {
    if (!_.isEqual(newMapBounds, mapBounds)) {
      setMapBounds(newMapBounds);
      if (!_.isNil(historicalUsers)) {
        setShowAreaButton(true);
      }
    }
  };

  // Make a request on 'Search Area' click
  const handleSearchAreaClick = () => {
    getHistoricalUsers();
    setShowAreaButton(false);
  };

  // Make a request on timeline date selection
  const handleDateChange = (startDate?: Date) => {
    setStartDate(startDate);
    setShowAreaButton(false);
    if (!_.isNil(startDate)) {
      dispatch(fetchHistoricalUsers(startDate.toISOString(), mapBounds!, activityFilter));
      setShowWSConnectionStatus(false);
    } else {
      // 'Live' selected
      dispatch(updateHistoricalUsers(null));
      setShowWSConnectionStatus(true);
      // Reset filter
      setActivityFilter(undefined);
    }
  };

  const handleFilterChange = (activityFilter?: ActivityFilter) => {
    setActivityFilter(activityFilter);
    // Filter option is only visible when startDate and mapBounds are not null
    dispatch(fetchHistoricalUsers(startDate!.toISOString(), mapBounds!, activityFilter));
  };

  const getHistoricalUsers = () => {
    if (!_.isNil(startDate) && !_.isNil(mapBounds)) {
      dispatch(fetchHistoricalUsers(startDate.toISOString(), mapBounds, activityFilter));
    }
  };

  return (
    <React.Fragment>
      <SideNav />
      <div className={styles.map}>
        {alert && <AppAlert alert={alert} />}
        <div className={styles.buttonGroup}>
          <Socials />
          <StatsSummary />
          {startDate && mapBounds && <Filter onFilterChange={handleFilterChange} />}
        </div>
        <div className={styles.myLocationButton}>
          <MyLocation />
        </div>
        <Map onMapBoundsChange={handleMapBoundsChange}></Map>
        <div className={styles.centeredContainer}>
          {loading && <CircularProgress classes={loadingClasses} />}
          <div className={styles.topInfo}>
            {showWSConnectionStatus && <WSConnectionStatus isVisible={showWSConnectionStatus} />}
            {showSearchAreaButton && <SearchAreaButton onClick={handleSearchAreaClick} />}
          </div>
          <div className={styles.timeline}>
            {/* Ensure initial map bounds are captured before rendering timeline */}
            {mapBounds && <Timeline onDateChange={handleDateChange} />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
