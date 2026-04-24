# Corner Brook Garbage Collection Dashboard

An interactive geospatial dashboard that turns a Corner Brook civic address into a clear garbage collection zone, the next scheduled pickup, and a map-backed explanation of the result.

## Overview

This project treats municipal waste collection as a spatial data problem. It combines address lookup, geographic zone boundaries, and collection schedule logic so a user can move from location input to service insight in a single workflow.

Instead of reading static schedules in isolation, users can validate the result visually through synchronized map and calendar views.

## Data Flow

| Stage | Data Operation | User Result |
| --- | --- | --- |
| Address search | Geocode a civic address in Corner Brook | Valid location match |
| Spatial classification | Match coordinates to a collection polygon | Correct collection zone |
| Schedule lookup | Retrieve zone-specific pickup dates | Next collection date |
| Visual delivery | Render the result in map and calendar views | Clear, explainable output |

## Why It Matters

From a data science perspective, the application acts as a compact spatial analytics pipeline:
1. accept a location query
2. transform it into coordinates
3. classify it against geographic boundaries
4. connect the classification to structured schedule data
5. present the result as an interpretable decision-support view

The value of the project is not just in displaying data, but in translating municipal service data into something precise, queryable, and easier for residents to understand.

## Core Features

- Civic address lookup focused on Corner Brook locations
- Collection-zone assignment using local boundary geometry
- Interactive Leaflet map for visual verification
- Pickup schedule and recycling context by matched zone
- Local persistence of selected address and zone

## Tech Stack

React and Vite power the interface, Leaflet handles geospatial visualization, and local zone and schedule datasets provide the underlying service logic.

## Run Locally

```bash
npm install
npm run dev
```
