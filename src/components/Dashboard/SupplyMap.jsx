import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// India Boundaries
const indiaCenter = [22.9734, 78.6569];

const SupplyMap = () => {
  return (
    <Card className="col-span-1 lg:col-span-2 border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Supply Location Map (India)</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[300px] w-full rounded-md overflow-hidden border relative">

          <MapContainer
            center={indiaCenter}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />

            {/* Example Markers */}
            <Marker position={[28.6139, 77.2090]}>
              <Popup>Delhi — Main Supply Hub</Popup>
            </Marker>

            <Marker position={[19.0760, 72.8777]}>
              <Popup>Mumbai — Delivery Vehicle</Popup>
            </Marker>

            <Marker position={[13.0827, 80.2707]}>
              <Popup>Chennai — Hospital Facility</Popup>
            </Marker>

            <Marker position={[23.2599, 77.4126]}>
              <Popup>Bhopal — Warehouse</Popup>
            </Marker>

          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplyMap;
