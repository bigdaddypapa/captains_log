const React = require('react');
const DefaultLayout = require('../layout/Default');

class Index extends React.Component {
  render(){
    const logs = this.props.logs;
    return (
      <DefaultLayout title={"Logs Index Page"}>
        <nav>
          <a href="/logs/new">Create a New Log</a>
        </nav>
        <ul>
          {
            logs.map((log)=>{
              return (
                <li key={log._id}>
                  The captain wrote: <a href={`/logs/${log._id}`}>'{log.title}'</a>{' '}
                  in his log and made these comments '{log.entry}' <br/>
                  <br/>
                  {
                    log.shipIsBroken?
                    '  Shit, mayday mayday':
                    '  Nah we gucci!! all clear captain'
                  }
                  <br/>
                  <br/>
                  <a href={`/logs/${log._id}/edit`}>Edit This Log</a><br/>
                  <br/>
                   <form action={`/logs/${log._id}?_method=DELETE`} method="POST">
                          <input type="submit" value="DELETE"/>
                      </form>
                </li>
              )
            })
          }
        </ul>
      </DefaultLayout>
    )
  }
}

module.exports = Index;