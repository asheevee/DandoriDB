import './MapSelect.css';

const MAPS = [
  "Cave000_F00",
  "Cave001_F00",
  "Cave002_F00",
  "Cave002_F01",
  "Cave003_F00",
  "Cave004_F00",
  "Cave004_F01",
  "Cave005_F00",
  "Cave005_F01",
  "Cave006_F00",
  "Cave006_F01",
  "Cave006_F02",
  "Cave006_F03",
  "Cave007_F00",
  "Cave007_F01",
  "Cave007_F02",
  "Cave007_F03",
  "Cave008_F00",
  "Cave009_F00",
  "Cave010_F00",
  "Cave010_F01",
  "Cave010_F02",
  "Cave010_F03",
  "Cave010_F04",
  "Cave010_F05",
  "Cave011_F00",
  "Cave011_F01",
  "Cave011_F02",
  "Cave011_F03",
  "Cave012_F00",
  "Cave012_F01",
  "Cave012_F02",
  "Cave013_F00",
  "Cave013_F01",
  "Cave013_F02",
  "Cave013_F03",
  "Cave013_F04",
  "Cave014_F00",
  "Cave014_F01",
  "Cave014_F02",
  "Cave014_F03",
  "Cave014_F04",
  "Cave015_F00",
  "Cave016_F00",
  "Cave016_F01",
  "Cave016_F02",
  "Cave016_F03",
  "Cave016_F04",
  "Cave016_F05",
  "Cave016_F06",
  "Cave016_F07",
  "Cave016_F08",
  "Cave016_F09",
  "Cave016_F10",
  "Cave016_F11",
  "Cave016_F12",
  "Cave016_F13",
  "Cave016_F14",
  "Cave016_F15",
  "Cave016_F16",
  "Cave016_F17",
  "Cave016_F18",
  "Cave016_F19",
  "Cave017_F00",
  "Cave018_F00",
  "Cave018_F01",
  "Cave018_F02",
  "Cave019_F00",
  "Cave019_F01",
  "Cave019_F02",
  "Cave019_F03",
  "Cave019_F04",
  "Cave020_F00",
  "Cave021_F00",
  "Cave021_F01",
  "Cave021_F02",
  "Cave021_F03",
  "Cave022_F00",
  "Cave022_F01",
  "Cave022_F02",
  "Cave022_F03",
  "Cave023_F00",
  "Cave023_F01",
  "Cave023_F02",
  "Cave023_F03",
  "Cave023_F04",
  "Cave024_F00",
  "Cave024_F01",
  "Cave024_F02",
  "Cave024_F03",
  "Cave024_F04",
  "Cave025_F00",
  "Cave026_F00",
  "Cave026_F01",
  "Cave026_F02",
  "Cave027_F00",
  "Cave028_F00",
  "Cave029_F00",
  "Cave030_F00",
  "Cave031_F00",
  "Cave032_F00",
  "Cave033_F00",
  "Cave033_F01",
  "Cave034_F00",
  "Cave035_F00",
  "Cave035_F01",
  "Cave035_F02",
  "Cave035_F03",
  "Cave035_F04",
  "Cave035_F05",
  "Cave035_F06",
  "Cave035_F07",
  "Cave035_F08",
  "Cave035_F09",
  "Area001",
  "Area002",
  "Area003",
  "Area004",
  "Area006",
  "Area010",
  "HeroStory001",
  "HeroStory002",
  "HeroStory003",
  "HeroStory010",
];
const IdToNameMap: {[key: string]: string} = {
  "Cave000": "Burrow of Beginnings",
  "Cave001": "Last-Frost Cavern",
  "Cave002": "Crackling Cauldron",
  "Cave003": "Dandori Day Care",
  "Cave004": "Aquiferous Summit",
  "Cave005": "Industrial Maze",
  "Cave006": "Drafty Gallery",
  "Cave007": "Secluded Courtyard",
  "Cave008": "Hotshock Canyon",
  "Cave009": "Sightless Passage",
  "Cave010": "Kingdom of Beasts",
  "Cave011": "Seafloor Resort",
  "Cave012": "Subzero Sauna",
  "Cave013": "Below-Grade Discotheque",
  "Cave014": "Engulfed Castle",
  "Cave015": "Test Tubs",
  "Cave016": "Cavern for a King",
  "Cave017": "Toggle Training",
  "Cave018": "The Mud Pit",
  "Cave019": "Subterranean Swarm",
  "Cave020": "Cliff-Hanger's Hold",
  "Cave021": "Doppelgänger's Den",
  "Cave022": "Frozen Inferno",
  "Cave023": "Plunder Palace",
  "Cave024": "Ultimate Testing Range",
  "Cave025": "Dream Home",
  "Cave026": "Cradle of the Beast",
  "Cave027": "Aerial Incinerator",
  "Cave028": "Strategic Freezeway",
  "Cave029": "Rockaway Cellars",
  "Cave030": "Planning Pools",
  "Cave031": "Hefty Haulway",
  "Cave032": "Oasis of Order",
  "Cave033": "Hectic Hollows",
  "Cave034": "Ice-Cross Course",
  "Cave035": "Trial of the Sage Leaf",
  "Area001": "Sun-Speckled Terrace",
  "Area002": "Blossoming Arcadia",
  "Area003": "Serene Shores",
  "Area004": "Giant's Hearth",
  "Area006": "Primordial Thicket",
  "Area010": "Hero's Hideaway",
  "HeroStory001": "Sun-Speckled Terrace (OST)",
  "HeroStory002": "Blossoming Arcadia (OST)",
  "HeroStory003": "Serene Shores (OST)",
  "HeroStory010": "Hero's Hideaway (OST)",
}

export interface MapSelectProps {
  onSelect?: (mapId: string) => void;
}

export const MapSelect = ({
  onSelect
}: MapSelectProps) => {
  const mapLinks = MAPS.map(mapId => {
    const splitId = mapId.split('_');

    let mapName = IdToNameMap[splitId[0]];
    mapName += splitId[1] ? ' ' + splitId[1] : '';

    return <div key={mapId}>
      <a href='javascript:void(0)' onClick={() => onSelect?.(mapId)}>{ `(${mapId}) ${mapName}` }</a>
    </div>;
  }, [onSelect]);

  return <div className="MapSelect__container">
    { mapLinks }
  </div>
}