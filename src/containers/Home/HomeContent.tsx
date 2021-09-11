import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "lib/contexts/AuthContext";
import HomeGuestContent from "./HomeGuestContent";
import HomeLoginContent from "./HomeLoginContent";
import { measuseRequestType } from "lib/models/measure";
import { searchResponseType } from "lib/models/search";

import { measureFixResponseType, pointResponseType} from "lib/models/measure_point";

import useSearch from "lib/hooks/useSearch";
import useMeasure from "lib/hooks/useMeasure";
import {convertLocationObjectToString} from "../../lib/util/convert-location";


const HomeContent: React.VFC = () => {
    const {user} = useContext(UserContext)

    // 経路検索
    const [searchQuery, setSearchQuery] = useState<string>("")
    const {resultLocations} = useSearch(searchQuery)
    const [keyword, setKeyword] = useState<string>("")
    const setKeywordHandler = (text: string) => {
        setKeyword(text)
    }
    const handleSearch = (e: any) :void => {
        if(e.key === "Enter") {
            e.preventDefault()
            console.log(e.target.value)
            setSearchQuery(`${keyword} ${e.target.value}`)
          }
    }

    // 経路計算リクエスト
    const [measureRequest, setMeasureRequest] = useState<measuseRequestType>(
        {
            "from": {
                "from_name": "",
                "from_stay_time": 0
              },
              "to": {
                "to_name": "",
                "to_stay_time": 0
              },
              "waypoints": []
        }
    )

    // 出発地点と到着地点の設定
    const settingLocation = (e: any, point: searchResponseType | null) => {
        if(!point) return
        if(e.target.value === "start") {
            setMeasureRequest({...measureRequest, from: {
                from_name: convertLocationObjectToString(point.location),
                from_stay_time: 0
            }
            })
        }else if(e.target.value === "end") {
            setMeasureRequest({...measureRequest, to: {
                to_name: convertLocationObjectToString(point.location),
                to_stay_time: 0
            }
            })
        }
    }

    // 経路の追加
    const addRoutesPoint = (point: searchResponseType) => {
        const address = convertLocationObjectToString(point.location)
        if(measureRequest.to.to_name === address) {
            window.alert("すでに到着地点として登録されています")
            return
        }
        if(measureRequest.from.from_name === address) {
            window.alert("すでに出発地点として登録されています")
            return
        }

        const waypoints = [...measureRequest.waypoints]
        const isSamePoint = !!waypoints.find(p => p.point === point.address)
        if(isSamePoint) {
            window.alert("重複する経路は追加できません")
            return
        }

        const orders: Array<number> = waypoints.map(routePoint => routePoint.order)
        const newOrder: number = orders.length === 0 ? 1 : Math.max(...orders) + 1
        waypoints.push({
            point: point.address,
            point_stay_time: 0,
            order: newOrder
        })
        setMeasureRequest({...measureRequest, waypoints: [...waypoints]})
    }

    // 途中地点削除
    const deleteRoutesPoint = (point: number) => {
        const waypoints = [...measureRequest.waypoints]
        // 始点は0
        const START_NUMBER: number = 0;
        // 終点は中間地点の合計個数+1
        const END_NUMBER: number = waypoints.length + 1;
        if(point === START_NUMBER){
            window.alert("出発地点を変更する際は検索して変更をお願いします")
            return
        }
        if(point === END_NUMBER) {
            window.alert("到着地点を変更する際は検索して変更をお願いします")
            return
        }

        // filterにて削除
        let new_waypoints = waypoints.filter(n => n.order !== point);

        // 消された部分のorderを振りなおす
        for(let idx = 0; idx < new_waypoints.length; ++idx){
            new_waypoints[idx].order = idx + 1;
        }

        setMeasureRequest({...measureRequest, waypoints: [...new_waypoints]})
    }

    // 経路計算結果
    const {measureResults, pointResults} = useMeasure(measureRequest);
    // 経路だけの管理
    const [measures, setMeasures] = useState<measureFixResponseType[]>(measureResults);

    // 地点だけの管理
    const [points, setPoints] = useState<pointResponseType[]>(pointResults);

    // 滞在時間の編集
    const changeResultsHandler = (time: number, index: number) => {
        if(time < 0){
            time = 0;
        }
        points[index].stay_time = time
        setPoints([...points])
    }

    // 初回リクエスト時に過去予定を計算するため
    const initPlanDetailRequest = (form: measuseRequestType) => {
        setMeasureRequest({...form})
    }

    // 経路計算のデータが変更されたら計算
    useEffect(() => {
        setMeasures([...measureResults])
        setPoints([...pointResults])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [measureResults]);

    return (
        <>
                <>
                    {!user ? (
                        <>
                            <HomeGuestContent
                                keyword={keyword}
                                searchQuery={searchQuery}
                                handleSearch={handleSearch}
                                resultLocations={resultLocations}
                                addRoutesPoint={addRoutesPoint}
                                settingLocation={settingLocation}
                                measureResults={measures}
                                pointResults={points}
                                changeResultsHandler={changeResultsHandler}
                                deleteRoutesPoint={deleteRoutesPoint}
                                setKeywordHandler={setKeywordHandler}
                            />
                        </>

                    ): (
                        <>
                            <HomeLoginContent
                                user={user}
                                keyword={keyword}
                                searchQuery={searchQuery}
                                handleSearch={handleSearch}
                                resultLocations={resultLocations}
                                addRoutesPoint={addRoutesPoint}
                                settingLocation={settingLocation}
                                measureResults={measures}
                                pointResults={points}
                                changeResultsHandler={changeResultsHandler}
                                initPlanDetailRequest={initPlanDetailRequest}
                                deleteRoutesPoint={deleteRoutesPoint}
                                setKeywordHandler={setKeywordHandler}
                            />
                        </>
                    )}
                </>
            </>
    )
}

export default HomeContent;
