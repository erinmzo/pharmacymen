import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchItem } from "../../api/pharmacy";

export default function Detail() {
  const { detailId } = useParams();

  const {
    data: pharmacy,
    isLoading,
    error
  } = useQuery({
    queryKey: ["pharmacy", detailId],
    queryFn: fetchItem
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching pharmacy</p>;

  return (
    <div>
      <Map
        center={{ lat: pharmacy[0].lat, lng: pharmacy[0].lon }}
        style={{ width: '800px', height: '600px' }}
        level={3}
      >
        <MapMarker position={{ lat: pharmacy[0].lat, lng: pharmacy[0].lon }} />
      </Map>
      <div>
        <p>{pharmacy[0]['place-name']}</p>
        <p>{pharmacy[0]['address']}</p>
        <p>전화번호 : {pharmacy[0]['phone-number']}</p>
      </div>
    </div>
  );
}