import React, { useState } from 'react';
import { Search, MapPin, Calendar, Activity, Download } from 'lucide-react';

const EarthquakeFilterApp = () => {
  const [filters, setFilters] = useState({
    minLatitude: -22.5,
    maxLatitude: -21.5,
    minLongitude: -70.5,
    maxLongitude: -69.5,
    startDate: '1964-01-01',
    endDate: '2023-12-31',
    startTime: '00:00',
    endTime: '23:59',
    minMagnitude: 0,
    maxMagnitude: 10
  });

  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const simulatedEarthquakes = [
    {
      id: 1, magnitude: 6.1, place: "10km SE de Tocopilla, Chile",
      latitude: -22.096, longitude: -70.190, depth: 35.4,
      time: "1964-07-01T14:30:00Z", url: "#"
    },
    {
      id: 2, magnitude: 5.3, place: "15km NW de Tocopilla, Chile",
      latitude: -22.050, longitude: -70.220, depth: 45.2,
      time: "1978-03-15T08:45:00Z", url: "#"
    },
    {
      id: 3, magnitude: 4.0, place: "12km NE de Tocopilla, Chile",
      latitude: -22.080, longitude: -70.170, depth: 28.7,
      time: "1985-11-20T22:15:00Z", url: "#"
    },
    {
      id: 4, magnitude: 7.1, place: "25km SW de Tocopilla, Chile",
      latitude: -22.130, longitude: -70.240, depth: 55.8,
      time: "1995-04-10T16:20:00Z", url: "#"
    },
    {
      id: 5, magnitude: 3.9, place: "5km E de Tocopilla, Chile",
      latitude: -22.092, longitude: -70.185, depth: 18.3,
      time: "2001-09-05T11:30:00Z", url: "#"
    },
    {
      id: 6, magnitude: 5.6, place: "18km W de Tocopilla, Chile",
      latitude: -22.098, longitude: -70.230, depth: 42.1,
      time: "2007-02-18T19:45:00Z", url: "#"
    },
    {
      id: 7, magnitude: 4.8, place: "10km S de Tocopilla, Chile",
      latitude: -22.110, longitude: -70.200, depth: 25.6,
      time: "2010-12-22T07:20:00Z", url: "#"
    },
    {
      id: 8, magnitude: 6.5, place: "22km NW de Tocopilla, Chile",
      latitude: -22.070, longitude: -70.250, depth: 38.9,
      time: "2016-08-28T03:15:00Z", url: "#"
    },
    {
      id: 9, magnitude: 3.7, place: "7km NE de Tocopilla, Chile",
      latitude: -22.085, longitude: -70.175, depth: 31.2,
      time: "2020-05-10T15:40:00Z", url: "#"
    },
    {
      id: 10, magnitude: 5.0, place: "14km SE de Tocopilla, Chile",
      latitude: -22.115, longitude: -70.180, depth: 22.4,
      time: "2023-04-25T09:10:00Z", url: "#"
    }
  ];

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: parseFloat(value) || value }));
  };

  const searchEarthquakes = async () => {
    setLoading(true);
    setError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const filtered = simulatedEarthquakes.filter(eq => {
        const eqDate = new Date(eq.time);
        const startDateTime = new Date(`${filters.startDate}T${filters.startTime}`);
        const endDateTime = new Date(`${filters.endDate}T${filters.endTime}`);
        return (
          eq.latitude >= filters.minLatitude &&
          eq.latitude <= filters.maxLatitude &&
          eq.longitude >= filters.minLongitude &&
          eq.longitude <= filters.maxLongitude &&
          eq.magnitude >= filters.minMagnitude &&
          eq.magnitude <= filters.maxMagnitude &&
          eqDate >= startDateTime &&
          eqDate <= endDateTime
        );
      });
      setEarthquakes(filtered);
    } catch {
      setError('Error al obtener datos de terremotos');
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Magnitud', 'Lugar', 'Latitud', 'Longitud', 'Profundidad (km)', 'Fecha y Hora'],
      ...earthquakes.map(eq => [
        eq.magnitude,
        eq.place,
        eq.latitude,
        eq.longitude,
        eq.depth,
        new Date(eq.time).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'terremotos_tocopilla.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Consulta de Terremotos - Tocopilla</h1>
      <button onClick={searchEarthquakes}>
        {loading ? 'Buscando...' : 'Buscar Terremotos'}
      </button>
      {earthquakes.length > 0 && (
        <button onClick={exportData}>Exportar CSV</button>
      )}
      {error && <p>{error}</p>}
      <ul>
        {earthquakes.map(eq => (
          <li key={eq.id}>
            {eq.magnitude} - {eq.place} ({new Date(eq.time).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EarthquakeFilterApp;
