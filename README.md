🗺️ Capstone Project: Garbage Collection Geo-Visualization System (Corner Brook)
Overview

This project presents a geospatial visualization system designed to model and display municipal garbage and recycling collection schedules using real-world road network data. The application integrates geographic data from OpenStreetMap (OSM) with a structured collection schedule to produce a street-level, interactive map that reflects how waste collection is actually organized in a city.

Rather than relying on simplified zones or static polygons, the system focuses on true road geometries, aligning collection schedules directly with named streets. This approach better represents how municipal services operate in practice and highlights inefficiencies and ambiguities in traditional schedule communication.

The project is built using Leaflet.js for visualization, combined with Nominatim and Overpass APIs for geospatial data retrieval, and a custom schedule engine to map temporal collection data onto spatial features.

Problem Context

Municipal garbage collection schedules are typically communicated through static PDFs or loosely defined “zones.” This introduces several issues:

Lack of precision at the street level
Confusion for residents living near zone boundaries
No interactive or queryable system for real-time lookup
No integration between temporal schedules and spatial infrastructure

This project addresses these limitations by constructing a system where:

Streets are first-class entities (not approximated areas)
Collection schedules are dynamically mapped to those streets
Users can visually explore service patterns rather than interpret static documents
System Architecture

The application follows a lightweight client-side architecture with external API integration:

1. Frontend Visualization Layer
Built with Leaflet.js
Renders interactive map tiles from OpenStreetMap
Dynamically styles streets based on schedule groupings
2. Geospatial Data Layer
Uses Nominatim API for geocoding street names → coordinates
Uses Overpass API to retrieve actual road geometries (way objects with highway tags)
Filters results to ensure only valid road segments are included
3. Schedule Engine
Custom JavaScript object representing the 2025 collection calendar
Organized by:
Month
Collection group (color-coded routes)
Special collection types (fibres, containers)
4. Mapping Logic
Matches street names to geospatial results
Assigns each street to a collection group
Applies styling (color overlays) based on schedule grouping
Key Features
✅ Street-Level Precision

Unlike polygon-based zoning systems, this application highlights actual road geometries, ensuring accuracy in how collection routes are represented.

✅ Interactive Visualization

Users can:

Zoom and pan across the city
Visually identify which streets belong to which collection group
Observe how routes are distributed spatially
✅ Temporal Integration

The system encodes a full-year schedule (2025), allowing:

Mapping of collection frequency
Identification of irregular patterns (e.g., fibre vs container days)
✅ Multi-Source Data Integration

Combines:

OpenStreetMap road data
Municipal schedule data
Custom logic for reconciliation between the two
Data Design
Schedule Structure

The schedule is modeled as a nested structure:

schedule2025 = {
  January: {
    purple: [6, 20],
    blue: [...],
    brown: [1, 15, 29],   // Fibres
    blueBag: [8, 22]      // Containers
  },
  ...
}

This allows:

Direct lookup by date
Separation of standard vs special collection types
Easy extension for future years
Street Mapping

A curated list of streets (e.g., purpleStreets) is used to:

Resolve naming inconsistencies (e.g., "McLeod’s Lane" vs "McLeods Lane")
Ensure alignment with OSM naming conventions
Control which roads are included in visualization
Technical Challenges & Solutions
1. Street Name Inconsistency

Problem: OSM data and municipal records often use slightly different naming formats.

Solution:

Normalize strings (lowercase, punctuation removal)
Maintain a controlled mapping list for known edge cases
2. Non-Road Geometry Noise

Problem: Overpass queries can return irrelevant geometries (paths, service roads, etc.)

Solution:

Filter strictly by highway tags
Exclude non-relevant categories (e.g., footways where necessary)
3. Broken or Partial Geometry Results

Problem: Some roads return incomplete segments or fragmented geometries.

Solution:

Aggregate multiple way results per street
Merge into a single visual layer where possible
4. Schedule Interpretation Ambiguity

Problem: Municipal schedules do not explicitly map to geospatial entities.

Solution:

Manually construct mappings between schedule groups and streets
Treat schedule as a classification problem over spatial features
Why This Matters (Data Science Perspective)

Although this project is frontend-heavy, it reflects several important data science principles:

📊 Data Integration

Combines heterogeneous data sources:

Structured schedule data
Semi-structured geospatial API data
🧠 Feature Mapping

Transforms raw inputs into meaningful representations:

Streets → features
Schedule groups → labels
🌍 Spatial Data Modeling

Moves beyond tabular data into:

Coordinate systems
Graph-like road networks
🔍 Interpretability

Provides a visual explanation layer for data that would otherwise remain abstract

Limitations
Relies on external APIs (Overpass/Nominatim), which may introduce latency or rate limits
Manual street grouping may not scale to larger cities
No backend persistence (currently client-side only)
Does not yet support real-time updates or user queries
Future Improvements
Automate street grouping using clustering or graph-based methods
Introduce a backend (e.g., Node.js + database) for persistence
Add user input (search by address → highlight collection day)
Integrate machine learning to detect inefficiencies in route distribution
Cache geospatial results to reduce API dependency
How to Run
Clone or download the repository
Open the project folder
Launch using a local server (recommended):
npx serve .
Open in browser:
http://localhost:3000
Final Notes

This project demonstrates how data science concepts can be applied outside traditional predictive modeling. By combining spatial data, structured schedules, and interactive visualization, it creates a system that improves clarity, usability, and real-world relevance of municipal data.

The goal was not just to “display data,” but to restructure how the data is understood.
