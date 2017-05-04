import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
const { shape, string, number } = PropTypes
const mapFallback = require('../public/images/maps/fallback.png')

class CardRecent extends React.Component {
  render () {
    const activityType = this.props.type
    const date = this.props.start_date_local
    const firstname = this.props.athlete.firstname
    const lastname = this.props.athlete.lastname
    const distance = this.props.distance * 0.000621371
    const roundDistance = Math.round(distance * 100) / 100
    const elevChange = Math.round(this.props.total_elevation_gain * 3.28084)
    const speedSecondsPerMile = 1609.34 / this.props.average_speed
    const speedMinutes = Math.floor(speedSecondsPerMile / 60)
    const speedSeconds = Math.round(speedSecondsPerMile - speedMinutes * 60)
    const formatSeconds = speedSeconds < 10 ? '0' + speedSeconds : speedSeconds
    const elapsedMinutes = Math.floor(this.props.elapsed_time / 60)

    let map = this.props.map

    if (this.props.map.summary_polyline !== null) {
      map = <img src={'http://maps.googleapis.com/maps/api/staticmap?sensor=false&size=503x284&path=weight:3%7Ccolor:red%7Cenc:' + this.props.map.summary_polyline} />
    } else {
      map = <img src={mapFallback} alt='Map' />
    }

    let detailStat

    if (activityType === 'Ride') {
      detailStat = <li>{elevChange} ft</li>
    } else if (speedSecondsPerMile > 0) {
      detailStat = <li>{speedMinutes}:{formatSeconds}/mi</li>
    }

    let distanceStat

    if (roundDistance > 0) {
      distanceStat = <li>{roundDistance} mi</li>
    } else {
      distanceStat = <li>{elapsedMinutes}m</li>
    }

    return (
      <article className='activity-summary clear'>
        <figure className='map'>
          {map}
        </figure>
        <div className='vitals'>
          <div className='activity-date'>
            <Moment parse='YYYY-MM-DD HH:mm' format='ddd'>{date}</Moment>
            <sup>
              <Moment format='Do'>{date}</Moment>
            </sup>
          </div>
          <h1 className='name'>{firstname} {lastname}</h1>
          <ul className='stats clear' data-type={activityType}>
            {distanceStat}
            {detailStat}
          </ul>
        </div>
      </article>
    )
  }
}

CardRecent.propTypes = {
  athlete: shape({
    firstname: string,
    lastname: string
  }),
  distance: number,
  average_speed: number,
  elapsed_time: number,
  total_elevation_gain: number,
  type: string,
  map: shape({
    summary_polyline: string
  }),
  start_date_local: string
}

export default CardRecent
