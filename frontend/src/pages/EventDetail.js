import React from 'react';
import EventItem from '../components/EventItem';
import { useRouteLoaderData,json, redirect } from 'react-router-dom';
const EventDetail = () => {
  const data=useRouteLoaderData('event-detail');

  return (
      <EventItem event={data.event}/>
  )
}

export default EventDetail;

export async function loader({request,params}){
  const id=params.eventId;
  console.log(id);
  const response = await fetch (`http://localhost:8080/events/${id}`);
  console.log(response.event)
  if(!response.ok){
    throw json({message:'Could not fetch details for selected event.'},{status:500});
  }
  else{
    return response;
  }
}

export async function action({request,params}){
  const eventId=params.eventId;
  const response=await fetch('http://localhost:8080/events/'+eventId,{
    method:request.method,
  });
  if (!response.ok) {
    throw json({ message: 'Could not delete event.' }, { status: 500 });
  }
  return redirect('/events');
}