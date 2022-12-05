package model

import "time"

// Valid Filter By values
const (
	CategoryFilter     = "Category"
	ActivityTypeFilter = "ActivityType"
)

type UserFilter struct {
	FromDateTimestamp string    `schema:"fromDate,required"`
	MaxUsers          int       `schema:"maxUsers,required"`
	LngLower          float64   `schema:"mapBounds[lng][lower],required"`
	LngUpper          float64   `schema:"mapBounds[lng][upper],required"`
	LatLower          float64   `schema:"mapBounds[lat][lower],required"`
	LatUpper          float64   `schema:"mapBounds[lat][upper],required"`
	FilterValue       *string   `schema:"filter[value],omitempty"`
	FilterField       *string   `schema:"filter[field],omitempty"`
	FromDate          time.Time `schema:"-"` // Used to store converted fromDate, not included in raw query parameters
}

type StatsFilter struct {
	Top               *int      `schema:"top"` // Limit return to the top number of activities
	FromDateTimestamp *string   `schema:"fromDate,omitempty"`
	FromDate          time.Time `schema:"-"` // Used to store converted fromDate, not included in raw query parameters
}

type UsersResponse struct {
	Users  []User `json:"users"`
	Counts Counts `json:"counts"`
}

type Counts struct {
	Sessions  int `json:"sessions"`
	Cities    int `json:"cities"`
	Countries int `json:"countries"`
}

type ActivityStatsResponse struct {
	Stats []ActivityStats `json:"stats"`
}

type FilterOptionsResponse struct {
	Options []FilterOption `json:"options"`
}
