import React, { useContext, useState, useEffect } from 'react';

import Room from '../Room/index';
import { useDispatch, useSelector } from "react-redux";
import { GetAllRoomTypes } from '../../../store/actions/datacollection';
import SkeletonLoadingCards from '../../skeletonLoading/SkeletonLoadingCards';
import { showCoursesm } from '../../utils/reuseable';

function Rooms() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(GetAllRoomTypes());
    }, [dispatch]);
  
    const room_types = useSelector((item) => item.roomtypes);

    const [rooms, setRooms] = useState([]);
    useEffect(()=>{
        window.addEventListener("scroll",showCoursesm())
       
      });
   
    return (
        <div className='roomType' id='roomsCat'>
        <h3 className='header-style'> Our Rooms and Rate</h3>
        <div className='align-grid'>
        {room_types && room_types.data ? 
            room_types.data.map((item,index)=>{
                return(<div key={index}>
                    <Room data={item} /> 
                </div>)
            })
           :<SkeletonLoadingCards/>
        }
        
        

        </div>
        
            
        </div>
    )
}

export default Rooms
