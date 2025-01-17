package server

import (
	"errors"
	"net/url"
	"time"

	"mindfuel.ca/activity_rest/model"
)

func GetUserQueryParams(params url.Values) (model.UserFilter, error) {
	var filter model.UserFilter
	if err := decoder.Decode(&filter, params); err != nil {
		return filter, err
	}

	startDate, err := time.Parse(time.RFC3339, params.Get("startDate"))
	if err != nil {
		return filter, err
	}
	filter.StartDate = startDate

	return filter, nil
}

func GetStatsQueryParams(params url.Values) (model.StatsFilter, error) {
	var filter model.StatsFilter
	if err := decoder.Decode(&filter, params); err != nil {
		return filter, err
	}

	// End date is required if a start date is provided to complete the date range
	if filter.StartDateTimestamp != nil && filter.EndDateTimestamp == nil  {
		return filter, errors.New("End date required")
	}

	if filter.StartDateTimestamp != nil {
		startDate, err := time.Parse(time.RFC3339, params.Get("startDate"))
		if err != nil {
			return filter, err
		}
		filter.StartDate = startDate
	}

	if filter.EndDateTimestamp != nil {
		endDate, err := time.Parse(time.RFC3339, params.Get("endDate"))
		if err != nil {
			return filter, err
		}
		filter.EndDate = endDate
	}

	if filter.Top == nil {
		filter.Top = new(int) // Set as zero value int as to not limit the Mongo query
	}

	return filter, nil
}

func GetCountOrZero(values []model.CountsValue) int {
	if len(values) > 0 {
		return values[0].Val
	}

	return 0
}
