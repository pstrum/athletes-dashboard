import React from 'react'
const { number, string, shape } = React.PropTypes

const CardYtd = React.createClass({
  propTypes: {
    profile: string,
    ytd_ride_totals: shape({
      count: number,
      distance: number
    }),
    ytd_run_totals: shape({
      count: number,
      distance: number
    }),
    ytd_swim_totals: shape({
      count: number,
      distance: number
    }),
    primary: string
  },
  render () {
    const profile = this.props.profile
    const rideTotalCount = this.props.ytd_ride_totals.count
    const runTotalCount = this.props.ytd_run_totals.count
    const swimTotalCount = this.props.ytd_swim_totals.count
    const primary = this.props.primary
    const runTotalDistance = Math.round(this.props.ytd_run_totals.distance * 0.000621371)
    const rideTotalDistance = Math.round(this.props.ytd_ride_totals.distance * 0.000621371)
    const swimTotalDistance = Math.round(this.props.ytd_swim_totals.distance * 0.000621371)

    let totalDistance = <mark><span>No primary activity</span></mark>
    if (primary === 'Run') {
      totalDistance = <mark><span>{runTotalDistance}</span> <i>mi</i></mark>
    } else if (primary === 'Ride') {
      totalDistance = <mark><span>{rideTotalDistance}</span> <i>mi</i></mark>
    } else if (primary === 'Swim') {
      totalDistance = <mark><span>{swimTotalDistance}</span> <i>mi</i></mark>
    }

    return (
      <article className='athlete-record'>
        <header>
          <figure className='avatar'>
            <img src={profile} alt='' />
          </figure>
          <p className='primary-activity' data-activity-type={primary}>
            {totalDistance}
          </p>
        </header>
        <div className='all-activities'>
          <ul className='clear'>
            <li className='bike' data-count={rideTotalCount}>
              <b />
              <mark>{rideTotalCount}</mark>
            </li>
            <li className='run' data-count={runTotalCount}>
              <b />
              <mark>{runTotalCount}</mark>
            </li>
            <li className='swim' data-count={swimTotalCount}>
              <b />
              <mark>{swimTotalCount}</mark>
            </li>
          </ul>
        </div>
      </article>
    )
  }
})

export default CardYtd
