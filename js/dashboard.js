import React from 'react'
import axios from 'axios'
import preload from '../public/data.json'
import CardRecent from './card-recent'
import CardYtd from './card-ytd'
import Moment from 'react-moment'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timelineData: [],
      totalsData: [],
      pageloaded: false
    }
  }

  componentDidMount () {
    // let getToken = () => {
      // let reqConfig = {
        // method: 'post',
        // url: 'https://www.strava.com/oauth/token',
        // params: {
          // client_id: 4522,
          // client_secret: '5d18f1f128d837849163692911f14898883022e1',
          // code: 'ba56e9151f8a7f20777ab173fd74885478b370a0'
        // }
      // }

      // axios(reqConfig)
        // .then((response) => {
          // console.log(response.data)
        // })
        // .catch((error) => console.error('axios error', error))
    // }

    let getData = () => {
      let getTimeline = () => {
        let timelineOptions = {
          method: 'get',
          url: 'https://www.strava.com/api/v3/activities/following?access_token=' + process.env.STRAVA_TOKEN
        }
        return axios(timelineOptions)
      }

      let getFollowers = () => {
        let followerOptions = {
          method: 'get',
          url: 'https://www.strava.com/api/v3/athletes/21540044/friends?access_token=' + process.env.STRAVA_TOKEN
        }
        return axios(followerOptions)
      }

      let statsArray = []

      preload.athletes.map((athlete, idx) => {
        let statOptions = {
          method: 'get',
          url: 'https://www.strava.com/api/v3/athletes/' + athlete.id + '/stats',
          headers: {
            'Authorization': 'Bearer ' + athlete.bearer
          }
        }
        axios(statOptions).then((response) => {
          response.data.id = parseInt(athlete.id)
          response.data.primary = athlete.primary
          response.data.firstname = athlete.name
          statsArray.push(response.data)
          if (idx === (preload.athletes.length - 1)) {
            getOtherData()
          }
        })
        .catch((error) => {
          console.error('axios error', error)
        })
      })

      let getOtherData = () => {
        axios.all([
          getTimeline(),
          getFollowers()
        ])
        .then(axios.spread((timeline, followers) => {
          console.log(timeline)
          console.log(followers)
          statsArray.map((athlete) => {
            let getFollower = followers.data.filter((follower) => {
              return follower.firstname === athlete.firstname
            })
            athlete.profile = getFollower[0].profile
          })
          this.setState({timelineData: timeline.data, totalsData: statsArray, pageloaded: true})
          console.log(statsArray)
        }))
        .catch(axios.spread((timelineErr, followersErr) => {
          console.error('axios error', timelineErr)
          console.error('axios error', followersErr)
        }))
      }
    }

    // getToken()
    getData()
    setTimeout(() => { window.location.reload(true) }, 7200000)
  }

  render () {
    const updated = Date.now()

    let timeline
    let ytd
    let activities = ['ride', 'run', 'swim', 'alpineski', 'crossfit', 'snowboard', 'iceskate', 'standuppaddling', 'weighttraining', 'hike']
    let loaded = this.state.pageloaded
    if (this.state.timelineData[0]) {
      let includeActivity = 0
      timeline = this.state.timelineData.map((activity, idx) => {
        if (activities.includes(activity.type.toLowerCase())) {
          includeActivity++
          if (includeActivity <= 10) {
            return (
              <CardRecent key={activity.id} {...activity} />
            )
          }
        }
      })
    } else {
      timeline = <p>LOADING...</p>
    }

    if (this.state.totalsData[0]) {
      ytd = this.state.totalsData.map((athlete) => {
        return (
          <CardYtd key={athlete.id} {...athlete} />
        )
      })
    }

    return (
      <div className='page-contents' data-loaded={loaded}>
        <div className='bound page-inner'>
          <section className='latest-activities'>
            {timeline}
          </section>
          <section className='year-to-date'>
            <header className='ytd-context'>
              <h1 className='year'>2017</h1>
              <p className='refreshed'><Moment format='M/DD h:mma'>{updated}</Moment></p>
            </header>
            {ytd}
          </section>
        </div>
      </div>
    )
  }
}

export default Dashboard
