import React from 'react'
import classes from './paxCount.module.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';

const PaxCount = () => {

    let [count, setCount] = useState(1);
    let increaseCount = () => {
        setCount(count+1);
        console.log('click detected')
    }
    let decreaseCount = () => {
        if(count !== 1){
            setCount(count-1)
        }else{
            console.log('count cannot be lower than one')
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.countContainer}>
                <h2 className={classes.green}>PAX</h2>
                <div className={classes.counter}>
                    <div onClick={decreaseCount}><KeyboardArrowDownIcon/></div>
                    <div className={classes.green}>{count}</div>
                    <div onClick={increaseCount}><KeyboardArrowUpIcon/></div>
                </div>
            </div>
        </div>
    )
}

export default PaxCount
