export type measuseRequestType = {
    "from": string, // string　出発地点
    "to": string, // string　到着地点
    "waypoints": [
        {
            "point": string, // string　経由地点
            "order": number // int　経由地点の順序
        },
        {
            "point": string, // string　経由地点
            "order": number // int　経由地点の順序
        }
    ]
}
export type measureResponseType = {
    "start_location": {
        lat: number,
        lng: number
    },
    "end_location": {
        lat: number,
        lng: number
    },
    "start_address": string,
    "end_address": string,
    "distance": number,
    "duration": number,
    "routes_points": Array<string>
}

export const mockMeasureRequest: measuseRequestType = {
    "from": "ナゴヤドーム", // string　出発地点
    "to": "テレビ塔", // string　到着地点
    "waypoints": [
        {
            "point": "久屋大通駅", // string　経由地点
            "order": 2 // int　経由地点の順序
        },
        {
            "point": "今池駅", // string　経由地点
            "order": 1 // int　経由地点の順序
        }
    ]
}

export const mockMeasureResult: measureResponseType[] = [
    {
        "start_location": {
            "lat": 35.18685809999999,
            "lng": 136.9480216
        },
        "end_location": {
            "lat": 35.1696639,
            "lng": 136.9386247
        },
        "start_address": "日本、〒461-0047 愛知県名古屋市東区大幸南１丁目１−１",
        "end_address": "日本、愛知県名古屋市千種区１０ 今池駅",
        "distance": 2610,
        "duration": 2028,
        "routes_points": [
            "{lwuEctzbYUM",
            "qmwuEqtzbYJWFKT[XW^S`@MHAPA`@Ap@HJ@NDRHVNPNNNHJHJNZ@??@@@@?@?@?@?H?@?D?B?",
            "k`wuEmtzbY?J?JBbC@`A?LBnA?L@r@?JBbA?DBxAHD",
            "m_wuEybzbY`ALZHd@FJB`@FHBf@HLBv@LHBPB~@NJ@TDB?l@JJB|@LN?@?RAAD",
            "emvuEk~ybYL~BBNB`A@J?FJhBDp@?F@LBXDj@",
            "okvuEmoybYN?T?B?hA@F?zA@HAt@@bA?H?F?nA?H@pAADL",
            "ozuuE{nybY\\`C",
            "qyuuEyjybYjAKN?dAIL@f@FB?dAHfAJD@hAHF@rALD@tAJD@F?z@FL@D?F@H@NBT@f@FF?zATD@z@LZDN@H@jARF@~AVD?v@LrARF?|ATDB?FtARHB",
            "shtuEmbybYIz@JB",
            "qhtuEm`ybYDDDJBL@NVfB@L",
            "egtuEg{xbYP@HATDTDbAPF@PDB?PD",
            "iatuE{yxbYAN"
        ]
    },
    {
        "start_location": {
            "lat": 35.1697009,
            "lng": 136.9383837
        },
        "end_location": {
            "lat": 35.1731589,
            "lng": 136.9077187
        },
        "start_address": "日本、愛知県名古屋市千種区１０ 今池駅",
        "end_address": "日本、〒460-0003 愛知県名古屋市中区丸の内３丁目１９ 愛知県名古屋市中区錦3丁目48 久屋大通駅",
        "distance": 3031,
        "duration": 2431,
        "routes_points": [
            "satuE{wxbYCXE\\ARC`@@FGv@Cd@AR?FCPEn@ElA?FIlBADUzE?NKbB?FIdB?LI`BANKzB?HGrABHETEr@?FCFCRA`@APADAFAFAD?HCZAZALAP?PGvAAPGlAAZCp@B^AQAb@MQ",
            "chtuEe|vbYGCIECA",
            "yhtuEq|vbYA`@Ej@Cf@?B?@ANCH",
            "kituE{wvbYSGCA",
            "cjtuEexvbYQ~AADCAE\\MjAAFCHG`@ALCFg@dBCJAH?REfAAH",
            "ymtuEkhvbYIAK?{@?",
            "kptuEmhvbYUlFAP?LAr@KrBGxA?F?HGlA?HAVEvA?NEdA?LA~@?NCpAAj@CbAA~@AVBb@?H@b@DxB?LLxE?PBz@?HBjA?@@LJlE@J?JBnA@NBl@AJ@`@?B@T?V@VDhA?BO@@L@j@",
            "eqtuEw{sbYC@A?A@?@A?A^",
            "qqtuEqzsbYCNAH?F?B?D?DBDDF?@IB",
            "wqtuEkxsbYEFQx@Kb@AJYlACLAHWxBGh@Gj@OvA?J?H@PBnA@PB|@DtA@N@V",
            "_utuEe~rbYK?",
            "kutuEe~rbY?J?B?@?BCBD\\?RDBL?FF@T@H?N",
            "ittuE}yrbYO?C@A??@A??@?@?F",
            "autuEmyrbYH?@R",
            "uttuEyxrbYE@K?O@YBUH",
            "gwtuEgxrbY"
        ]
    },
    {
        "start_location": {
            "lat": 35.1732692,
            "lng": 136.9077273
        },
        "end_location": {
            "lat": 35.1725279,
            "lng": 136.9082469
        },
        "start_address": "日本、〒460-0003 愛知県名古屋市中区丸の内３丁目１９ 愛知県名古屋市中区錦3丁目48 久屋大通駅",
        "end_address": "日本、〒460-0003 愛知県名古屋市中区錦３丁目６−１５先",
        "distance": 125,
        "duration": 104,
        "routes_points": [
            "}wtuEixrbY?BB?",
            "ywtuEexrbYPATIXCNAJ?DAASD?`@CH?",
            "estuEqyrbYA]Aa@"
        ]
    }
]