import React, {useState, Fragment} from "react";
import { GoogleMap, LoadScript, InfoWindow, Marker, Polyline} from "@react-google-maps/api";
import { Button, Text, Stack, Checkbox, Box } from "@chakra-ui/react";
import { searchResponseType } from "lib/models/search";
import { decordMap } from "lib/util/map-decode";
import { useEffect } from "react";
import { planDetailResponseType } from "lib/models/plan";
import {measureFixResponseType, pointResponseType} from "../../../lib/models/measure_point";


const HomeMapContentComponent: React.VFC<{
    addRoutesPoint: (point: searchResponseType)=> void,
    settingLocation: (e: any, point: searchResponseType | null) => void,
    resultLocations: searchResponseType[],
    // routes: measureResponseType[],
    routes: measureFixResponseType[],
    points: pointResponseType[],
    plan?:  planDetailResponseType[],
    setKeywordHandler: (text: string) => void
}> = ({
    addRoutesPoint,
    settingLocation,
    resultLocations,
    routes,
    points,
    plan,
    setKeywordHandler
}) => {
    let center = {lat: 36,lng: 138}
    let zoom = 6

    if(!!plan && plan.length !== 0) {
        center = plan?.find(_ => _)?.place_location ?? {lat: 36,lng: 138}
        zoom = 13
    }

    console.log(plan)

    const [selectedPoint, setSelectedPoint] = useState<searchResponseType | null>(null)
    const [fromTo, setFromto] = useState<[boolean, boolean][]>([[false, false]])

    useEffect(() => {
        let checkManage: [boolean, boolean][] = resultLocations.map(_ => [false, false])
        setFromto(checkManage)
    }, [resultLocations])

    const hitLocation = resultLocations.find(_=>_)?.location
    if(!!hitLocation) {
        center = hitLocation
        zoom = 13
    }

    const settingLocationHandler = (e: any, point: searchResponseType, i: number) => {
        const alreadyChecked = fromTo.findIndex(i => i.find(j => i))
        if (alreadyChecked !== -1) {
            const alreadyCheckedhandler = (num: number) => {
                if(fromTo[alreadyChecked][num]) {
                    setFromto((item) => {
                        item[alreadyChecked][num] = false
                        return item
                    })
                }
            }
            alreadyCheckedhandler(0)
            alreadyCheckedhandler(1)
        }
        if(e.target.value === "start") {
            if(e.target.checked) {
                setFromto((item) => {
                    item[i][0] = true
                    return item
                })
                settingLocation(e, point)
            } else {
                settingLocation(e, null)
            }
        }else if(e.target.value === "end") {
            if(e.target.checked) {
                setFromto((item) => {
                    item[i][1] = true
                    return item
                })
                settingLocation(e, point)
            } else {
                settingLocation(e, null)
            }
        }
    }

    return(
        <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`}>
            <GoogleMap
            mapContainerStyle={{ height: "calc(100% - 112px)", borderRadius: "10px"}}
            center={center}
            zoom={zoom}
            onLoad={(map) => {
                map.data.loadGeoJson(`${process.env.REACT_APP_APP_URL}/mocks/ja.json`)
                map.data.addListener("mouseover", (e: any) => {
                    map.data.revertStyle()
                    map.data.overrideStyle(e.feature, {fillColor: "#aaf"})
                })
                map.data.addListener("mouseout", (e: any) => {
                    map.data.revertStyle()
                })
                map.data.addListener("click", (e: any) => {
                    map.data.revertStyle()
                    map.data.overrideStyle(e.feature, {strokeWeight: 5, fillColor: "#faa"})
                    setKeywordHandler(e.feature.i.nam_ja)
                   // let geoArray = e.feature.getGeometry().getArray()
                   //  const latLng = geoArray.map((obj: any) => {
                   //      return obj.g.map((item: any) => {
                   //          return {lat: item.lat(), lng: item.lng()}
                   //      })
                   //  }).find((_: any)=>_)
                })

            }}
            >
            {resultLocations.map((marker: searchResponseType, i: number) => (
                <Marker
                key={i} position={marker.location}
                onClick={() => setSelectedPoint(marker)}
                />
            ))}
            {points.map((marker: pointResponseType, i: number) => (
                <Fragment key={i}>
                <Marker
                    position={marker.location}
                />
                </Fragment>
             ))}
            {routes.map((measure: measureFixResponseType, i: number) => (
                <Fragment key={i}>
                    <Polyline
                        options={{
                            strokeColor: "#FF0000",
                            strokeOpacity: 0.8,
                        }}
                        path={decordMap(measure.routes_points, 5)}
                    />
                </Fragment>
            ))}
            {resultLocations.map((location: searchResponseType, i: number) => (
                <Fragment key={i}>
                    {selectedPoint?.location.lat === location.location.lat && selectedPoint?.location.lng === location.location.lng && (
                        <InfoWindow
                        position={location.location}
                        onCloseClick={() => setSelectedPoint(null)}
                        >
                            <Box p="4">
                            <Text>{location.name}</Text>
                            <Stack spacing={5} direction="row" mb="6">
                                <Checkbox colorScheme="red" value="start" onChange={(e) => settingLocationHandler(e, location, i)} defaultIsChecked={fromTo[i][0]} isDisabled={fromTo[i][1]}>
                                    出発地点へ設定
                                </Checkbox>
                                <Checkbox colorScheme="green" value="end" onChange={(e) => settingLocationHandler(e, location, i)} defaultIsChecked={fromTo[i][1]} isDisabled={fromTo[i][0]}>
                                    到着地点へ設定
                                </Checkbox>
                            </Stack>
                            <Button colorScheme="blue" onClick={() => addRoutesPoint(location)}>途中経路として追加</Button>
                            </Box>
                    </InfoWindow>
                    )}
                </Fragment>
            ))}
            </GoogleMap>
    </LoadScript>
    )
}

export default HomeMapContentComponent;
