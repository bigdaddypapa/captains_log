const React = require('react')
class Show extends React.Component {
  render () {
   const log = this.props.log
    return (
      <div>
      <h1> Specific Log </h1>
        <b>Title of the log:</b>  {log.title} <br/>
        <b>Comments:</b>  {log.entry}<br/>
        <b>Is the ship Broken?</b>  {log.shipIsBroken? 'Yes!! mayday mayday, engaging emergency procedure' : 'Cruising.. we are clear' }<br/>
        <b>date created:</b>  {log.timestamps}<br/>
      </div>
      );
     }
   }
  module.exports  = Show;