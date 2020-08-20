import React, {Fragment, useState} from 'react'

const EditEvent = (props) => {
    const [eventtitle, setEventTitle] = useState(props.eventtitle)
    const [eventdetails, setEventDetails] = useState(props.eventdetails)
    const [eventlocation, setEventLocation] = useState(props.eventlocation)

    const updateEvent = async(e) => {
        e.preventDefault()
        try {
            const body = {eventtitle, eventdetails, eventlocation, }
            const response = await fetch(`api/events/${props.eventid}`, {
                method:'PUT',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify(body)
            }

            )
            props.editEvent(eventtitle, eventdetails, eventlocation, props.eventtitle)

        } catch (err) {
            console.error(err.message)
        }
    }

    return (<Fragment>
        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target={`#id${props.eventid}`}>

  Edit
</button>


<div className="modal" id={`id${props.eventid}`} >
  <div className="modal-dialog">
    <div className="modal-content">


      <div className="modal-header">
        <h4 className="modal-title">Edit Event</h4>
        <button type="button" className="close" data-dismiss="modal" onClick= {()=> {setEventTitle(props.eventtitle); setEventDetails(props.eventdetails); setEventLocation(props.eventlocation)}} >&times;</button>

      </div>


      <div className="modal-body">
          Edit Event Title
        <input type= "text" className="form-control" value = {eventtitle} onChange = {e => setEventTitle(e.target.value)} />
          Edit Event Details
        <input type= "text" className="form-control" value = {eventdetails} onChange = {e => setEventDetails(e.target.value)} />
          Edit Event Location
        <input type= "text" className="form-control" value = {eventlocation} onChange = {e => setEventLocation(e.target.value)} />

      </div>


      <div className="modal-footer">
      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick = {e => updateEvent(e)}>Edit Event</button>
      </div>

    </div>
  </div>
</div>
    </Fragment>)
}

export default EditEvent
