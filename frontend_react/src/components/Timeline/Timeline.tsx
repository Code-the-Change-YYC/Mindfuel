import React from 'react';
import styles from './Timeline.module.css';
import Slider from '@material-ui/core/Slider';
import { StylesProvider } from '@material-ui/core/styles';
import { fetchHistoricalUsers } from '../../redux/actions';
import { useAppDispatch } from '../../redux/hooks';

const ThumbComponent = (props: any) => {
  return (
    <span {...props}>
      <span className={styles.bar + " " + styles.barLeft} />
      <span className={styles.bar + " " + styles.barRight} />
    </span>
  );
}

const marks = [
  {
    value: 0,
    label: '1 year',
  },
  {
    value: 25,
    label: '1 month',
  },
  {
    value: 50,
    label: '1 week',
  },
  {
    value: 75,
    label: '1 day',
  },
  {
    value: 100,
    label: 'Current',
  },
];

const Timeline = () => {
  const dispatch = useAppDispatch();
  const classes = {
    root: styles.timelineRoot,
    thumb: styles.timelineThumb,
    track: styles.timelineTrack,
    rail: styles.timelineRail,
    mark: styles.timelineMarks,
    markLabel: styles.timelineMarkLabels
  }

  
  const handleChange = (event: any, newValue: number | number[]) => {
    dispatch(fetchHistoricalUsers('test'));
  };
  
  return (
    <StylesProvider injectFirst>
      <Slider
        classes={classes}
        ThumbComponent={ThumbComponent}
        defaultValue={100}
        step={null}
        marks={marks}
        onChangeCommitted={handleChange}
      />
    </StylesProvider>
  );
}

export default Timeline;