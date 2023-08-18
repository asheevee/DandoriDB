// import { useEffect, useState } from 'react';
// import { CaveSummary } from './components/CaveSummary/CaveSummary';
// import { CaveData, getCaveData } from './api/MapAPI';
import { MapContainer } from './components/Map/MapContainer';
import './App.css';
import { PanelLayout } from './components/PanelLayout/PanelLayout';
import { NavigationPanel, TimeOption } from './components/NavigationPanel/NavigationPanel';
import { useState } from 'react';
import { MapDebugInfoProps } from './components/MapDebugInfo/MapDebugInfo';
import { InfoPanel } from './components/InfoPanel/InfoPanel';

function App() {
  // const [data, setData] = useState<CaveData>();

  // useEffect(() => {
  //   const load = async () => {
  //     setData(await getCaveData('C0'))
  //   };
  //   load();
  // }, [])

  const [mapId, setMapId] = useState<string>('Area001');
  const [time, setTime] = useState<string>(TimeOption.Day);
  const [debugInfo, setDebugInfo] = useState<MapDebugInfoProps>({ x: 0, y: 0, scale: -1, rotation: 0});
  const [selectedMarker, setSelectedMarker] = useState<{ type: string }>();

  const navPanel = <NavigationPanel
    mapId={mapId}
    selectedTime={time}
    onMapChange={setMapId}
    onTimeChange={setTime}
    mapDebugInfo={debugInfo}
  />;
  const infoPanel = <InfoPanel marker={selectedMarker} />

  return (
    <div className="App">
      <PanelLayout leftPanel={navPanel} rightPanel={infoPanel}>
        <MapContainer mapId={mapId} onMouseMove={setDebugInfo} onSelect={setSelectedMarker}/>
      </PanelLayout>
    </div>
  );
}

export default App;