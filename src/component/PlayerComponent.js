import React, { useEffect, useState, useRef } from 'react';
import './PlayerStyles.css';
import video1 from '../public/video1.mp4';
import video3 from '../public/video3.mp4';
import { Carousel } from 'react-bootstrap';
import { Player, ControlBar } from 'video-react';
const data = [
    {
        top: "https://charlielawrance.com/wp-content/uploads/2017/10/13-Ad-Examples.jpg",
        mid: video3,
        bottom: "https://webcdn-adespressoinc.netdna-ssl.com/wp-content/uploads/2018/09/best-fintech-ads-1024x536.jpg"
    },
    {
        top: "https://vinaad.vn/wp-content/uploads/2018/07/ap-phich-quang-cao-6-e1531123223501.jpg",
        mid: "http://media.w3.org/2010/05/sintel/trailer.mp4",
        bottom: "https://webcdn-adespressoinc.netdna-ssl.com/wp-content/uploads/2018/09/best-fintech-ads-1024x536.jpg"
    },
    {
        top: "https://i.ytimg.com/vi/PAuMs3WCd68/maxresdefault.jpg",
        mid: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
        bottom: "https://webcdn-adespressoinc.netdna-ssl.com/wp-content/uploads/2018/09/best-fintech-ads-1024x536.jpg"
    }
]
const PlayerComponent = () => {
    const player1 = useRef([])
    const [player, setPlayer] = useState([]);
    const [source, setSource] = useState(data[0].mid);
    const [index, setIndex] = useState(0);
    const [time, setTime] = useState(0);
    const [top, setTop] = useState(data[0].top)
    const [bottom, setBottom] = useState(data[0].bottom)

    useEffect(() => {
        if (player1) {
            player1.current.subscribeToStateChange(handleStateChange)
        }
    }, [])

    const changeSource = () => {
        console.log(index == data.length - 1,'change source')
        if (index == data.length - 1 ) {
            setSource(data[0].mid);
            setTop(data[0].top);
            setBottom(data[0].bottom);
            player1.current.load();
            setIndex(0)
        }
        else {
            setSource(data[index + 1].mid);
            setTop(data[index + 1].top);
            setBottom(data[index + 1].bottom);
            player1.current.load();
            setIndex(index + 1)
        }
    }
    useEffect(() => {
        if (time != 0) {
            console.log(time,'vao effect')
            setTimeout(() => {
                changeSource()
            }, time * 1000);
        }
    }, [time])

    useEffect(() => {
        if (!isNaN(player.duration)) {
            setTime(player.duration)
        }
    }, [player])

    const handleStateChange = (state) => {
        setPlayer(state)
    }

    return (
        <div className="playercontainer">
            <img className="top" src={top} alt="img-top"/>
            <Player
                ref={player => {
                    player1.current = player
                }}
                autoPlay={true}
            >
                <source src={source} />
                <ControlBar autoHide={true} />
            </Player>
            <img className="bottom" src={bottom} alt="img-bottom"/>
        </div>
    );
}

export default PlayerComponent;
