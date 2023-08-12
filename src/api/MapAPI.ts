import { Feature } from 'ol';
import { default as MapExtentOverrides } from './extent-overrides.json';
import { default as MapTransforms } from './map-transforms.json';
import { Point } from 'ol/geom';
import { MarkerStyles, ObjectTypes } from '../components/Map/FeatureStyles';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Waterbox } from './getImageLayers';

type MapExtent = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};
interface MapTransform {
  rotation: number;
  extent: MapExtent;
}
export interface MapData extends MapTransform {
  mapId: string;
  imageUrl: string;
  waterboxes: Waterbox[];
}

export interface TreasureData {
  id: string;
  imageUrl?: string;
  name: string;
  value: number;
}

export interface CreatureAggregate {
  id: string;
  imageUrl?: string;
  name: string;
  amount: number;
  value: number;
}

export enum PikminType {
  Red = 'red',
  Yellow = 'yellow',
  Blue = 'blue',
  Purple = 'purple',
  White = 'white',
  Rock = 'rock',
  Wing = 'wing',
  Ice = 'ice',
  Bulbmin = 'bulbmin',
}
export interface PikminCount {
  red?: number;
  yellow?: number;
  blue?: number;
  purple?: number;
  white?: number;
  rock?: number;
  wing?: number;
  ice?: number;
  bulbmin?: number;
}

export enum OnionType {
  Flarlic = 'flarlic',
  Red = 'red',
  Yellow = 'yellow',
  Blue = 'blue',
  Purple = 'purple',
  White = 'white',
  Rock = 'rock',
  Wing = 'wing',
  Ice = 'ice',
}

export const OnionData: {[key in OnionType]: { name: string, weight: number }} = {
  [OnionType.Flarlic]: {
    name: "Flarlic",
    weight: 5
  },
  [OnionType.Red]: {
    name: "Red Onion",
    weight: 20
  },
  [OnionType.Yellow]: {
    name: "Yellow Onion",
    weight: 20
  },
  [OnionType.Blue]: {
    name: "Blue Onion",
    weight: 20
  },
  [OnionType.Purple]: {
    name: "Purple Onion",
    weight: 100
  },
  [OnionType.White]: {
    name: "White Onion",
    weight: 10
  },
  [OnionType.Rock]: {
    name: "Rock Onion",
    weight: 20
  },
  [OnionType.Wing]: {
    name: "Wing Onion",
    weight: 20
  },
  [OnionType.Ice]: {
    name: "Ice Onion",
    weight: 20
  },
}

export interface CaveData {
  id: string;
  name: string;
  sublevels: number;
  castaways?: number;
  pikmin?: PikminCount;
  candypops?: PikminCount;
  materials?: number;
  treasures?: TreasureData[];
  creatures?: CreatureAggregate[];
  onions?: OnionType[];
  structures?: number;
}

export interface DandoriData {
  id: string;
}

export interface ObjectMarker {
  id: string;
  x: number;
  y: number;
}

export enum ObjectType {
  Cave = 'cave',
  Treasure = 'treasure',
  Castaway = 'castaway',
  Battle = 'battle',
  Challenge = 'challenge',
  Onion = 'onion',
  Materials = 'materials'
}


/*
TODO:
extents to check:
  023_F00
  023_F03
  030_F00
  035_F04
*/


export const getMapData = async (mapId: string): Promise<MapData> => {
  const mapTransform: MapTransform = MapTransforms[mapId as keyof typeof MapTransforms];
  const extentOverride: MapExtent | undefined = MapExtentOverrides[mapId as keyof typeof MapExtentOverrides];

  // TODO need to reorganize all this stuff
  const { water = [] } =  await _getMarkerData(mapId);

  return {
    mapId,
    imageUrl: `/images/maps/${mapId}/T_ui_Map_${mapId}_D.png`,
    rotation: mapTransform.rotation,
    extent: extentOverride || mapTransform.extent,
    waterboxes: water as any[],
  }
}

const _getMarkerData = async (mapId: string) => {
  let dataUrl = '/data';
  if (mapId.startsWith('Cave')) {
    const caveId = mapId.split('_')[0];
    dataUrl += `/${caveId}/${mapId}.json`;
  }
  else {
    dataUrl += `/${mapId}/day.json`;
  }

  const mapMarkerReq = await fetch(dataUrl);
  const mapMarkerData: {[key: string]: Marker[]} = await mapMarkerReq.json();

  return mapMarkerData;
}

type Marker = {
  type: ObjectTypes;
  transform: {
    translation: {
      x: number;
      y: number;
    };
    rotation?: number;
    scale?: number;
  };
}
export const getMarkerData = async (mapId: string): Promise<any> => {
  const { water, ...mapMarkerData } = await _getMarkerData(mapId);

  const objectLocations: Marker[] = Object.values(mapMarkerData).reduce((collector, values) => {
    return [...collector, ...values];
  }, [] as Marker[]);

  const markers = objectLocations.map(obj => {
    const marker = new Feature({
      // Why are x and y flipped???
      geometry: new Point([(obj.transform.translation.y), obj.transform.translation.x]),
      data: obj
    });

    let markerStyle = MarkerStyles[obj.type];

    if (obj.transform.rotation !== undefined) {
      markerStyle = markerStyle.clone();
      markerStyle.getImage().setRotateWithView(true);
      // I *think* object look off b/c the images might need to be flipped along y = x, but I'm not sure.
      // except conveyors... those rotations look correct
      markerStyle.getImage().setRotation(-(obj.transform.rotation) * Math.PI / 180);
    }

    marker.setStyle(markerStyle);
    return marker;
  });
  return new VectorLayer({
    source: new VectorSource({ features: markers }),
    style: (feature, resolution) => {
      console.log("HERE", feature)
    }
  });
}
