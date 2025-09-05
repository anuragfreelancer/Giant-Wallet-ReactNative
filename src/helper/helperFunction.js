import Geolocation from "@react-native-community/geolocation";
import { PermissionsAndroid, Platform } from "react-native";

type LocationResult = {
  latitude: number;
  longitude: number;
  city: string;
};

export const getLocation = async (): Promise<LocationResult> => {
  const hasPermission = await requestPermission();
  if (!hasPermission) {
    console.log("❌ Permission denied → Defaulting to Hyderabad");
    return {
      latitude: 17.3850,
      longitude: 78.4867,
      city: "Hyderabad",
    };
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("📍 Location:", latitude, longitude);

        try {
          const city = await getCityFromLatLong(latitude, longitude);
          resolve({
            latitude,
            longitude,
            city: city || "Hyderabad", // fallback if city not found
          });
        } catch (err) {
          console.log("⚠️ City fetch failed → Defaulting to Hyderabad");
          resolve({
            latitude: 17.3850,
            longitude: 78.4867,
            city: "Hyderabad",
          });
        }
      },
      (error) => {
        console.log("❌ Location error:", error);
        // Fallback to Hyderabad
        resolve({
          latitude: 17.3850,
          longitude: 78.4867,
          city: "Hyderabad",
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 10000,
      }
    );
  });
};

const requestPermission = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Access Required",
        message: "This App needs to Access your location",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const getCityFromLatLong = async (lat: number, lon: number): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
      {
        headers: {
          "User-Agent": "Strizy/1.0 (govindsingh4851@gmail.com)", // required
          "Accept-Language": "en",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const city =
      data?.address?.city ||
      data?.address?.town ||
      data?.address?.village ||
      data?.address?.state;

    console.log("🏙️ City:", city);
    return city;
  } catch (error) {
    console.error("Error fetching city:", error);
    return null;
  }
};
