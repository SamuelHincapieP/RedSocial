import Post from './post'
import { usePost } from '../context/PostContext'

export default function Feed() {
  const { resetPost } = usePost()

  return (
    <div className="w3-col m7">
      {/* Create Post */}
      <div className="w3-row-padding">
        <div className="w3-col m12">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding">
              <h6 className="w3-opacity">Social Media template by w3.css</h6>
              <div className="w3-border w3-padding" style={{ minHeight: 40 }}>
                <input
                  type="text"
                  placeholder="¿Qué estás pensando?"
                  className="w3-input"
                  style={{ border: 'none', outline: 'none' }}
                />
              </div>
              <button type="button" className="w3-button w3-theme">
                <i className="fa fa-pencil"></i> Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Facebook Post Task */}
      <div className="w3-container w3-card w3-white w3-round w3-margin">
        <div className="assignment">
          <h1>Tarea · Post de Facebook</h1>
          <p>
            Ejercicio de la clase de <strong>Hooks en React.js</strong>. El post de abajo es 100%
            interactivo: reacciona, comenta, responde y comparte.
          </p>
          <div className="assignment__tags">
            <span className="tag tag--blue">useState</span>
            <span className="tag tag--green">useEffect</span>
            <span className="tag tag--purple">useContext</span>
          </div>
          <button type="button" className="assignment__reset" onClick={resetPost}>
            ♻️ Restablecer datos
          </button>
        </div>
        <Post />
      </div>

      {/* Regular Posts */}
      <div className="w3-container w3-card w3-white w3-round w3-margin">
        <br />
        <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: 60 }} />
        <span className="w3-right w3-opacity">1 min</span>
        <h4>John Doe</h4>
        <br />
        <hr className="w3-clear" />
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div className="w3-row-padding" style={{ margin: '0 -16px' }}>
          <div className="w3-half">
            <img src="https://www.w3schools.com/w3images/lights.jpg" style={{ width: '100%' }} alt="Northern Lights" className="w3-margin-bottom" />
          </div>
          <div className="w3-half">
            <img src="https://www.w3schools.com/w3images/nature.jpg" style={{ width: '100%' }} alt="Nature" className="w3-margin-bottom" />
          </div>
        </div>
        <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom">
          <i className="fa fa-thumbs-up"></i> Like
        </button>
        <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom">
          <i className="fa fa-comment"></i> Comment
        </button>
      </div>

      <div className="w3-container w3-card w3-white w3-round w3-margin">
        <br />
        <img src="https://www.w3schools.com/w3images/avatar5.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: 60 }} />
        <span className="w3-right w3-opacity">16 min</span>
        <h4>Jane Doe</h4>
        <br />
        <hr className="w3-clear" />
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom">
          <i className="fa fa-thumbs-up"></i> Like
        </button>
        <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom">
          <i className="fa fa-comment"></i> Comment
        </button>
      </div>
    </div>
  )
}
