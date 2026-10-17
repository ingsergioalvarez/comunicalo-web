import React from 'react';
import {
  Network, Zap, Radio, Calendar, Share2, Lock, Server, Phone, Wifi, Cable, Shield,
  Database, Camera, Eye, ScanLine, Wrench, Home, Tv, Building2,
} from 'lucide-react';

const MAPA = {
  network: Network, zap: Zap, radio: Radio, calendar: Calendar, share: Share2, lock: Lock,
  server: Server, phone: Phone, wifi: Wifi, cable: Cable, shield: Shield, database: Database,
  camera: Camera, eye: Eye, scan: ScanLine, wrench: Wrench, home: Home, tv: Tv, building: Building2,
};

export default function Icon({ name, size = 22, ...rest }) {
  const C = MAPA[name] || Zap;
  return <C size={size} aria-hidden="true" {...rest} />;
}
