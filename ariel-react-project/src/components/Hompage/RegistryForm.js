import { postFavourite} from "../../api/api.js";
function registryForm(props){
    const {topics} =props;
    console.log(topics)
    const topicDdl=(()=>{
        return topics.map(card=>{
            return {
                title:card.title,
                value:card.post_id,
            }
        })
    })()
    const registryHandler=async()=>{
        try{
            await postFavourite("9827")
        }catch(e){
            console.log(e)
        }
    }
    return(
        <div className="content-registry">
        <div className="registry-area">
          <div className="registry-form">
            <div className="registry-header">
              <div className="registry-header-title">
                <span>Register for a Webinar now</span>
              </div>
              <div className="registry-header-subtitle">
                <span>
                  Please fill in the form below and you will be contacted by one
                  of our
                </span>
                <span>professional business experts.</span>
              </div>
            </div>
            <div className="registry-submit">
              <div className="form-input">
                <div className="form-input-title">Topic</div>
                <div className="form-input-field">
                  <select>
                   {topicDdl.map((option,index)=>{
                       return (<option value={option.value} key={`option-${index}`}>{option.title}</option>)
                   })}
                  </select>
                </div>
              </div>
              <div className="form-input required-field">
                <div className="form-input-title">First Name</div>
                <div className="form-input-field">
                  <input type="text" />
                </div>
              </div>
              <div className="form-input required-field">
                <div className="form-input-title">Last Name</div>
                <div className="form-input-field">
                  <input type="text" />
                </div>
              </div>
              <div className="form-input required-field">
                <div className="form-input-title">Email</div>
                <div className="form-input-field">
                  <input type="text" />
                </div>
              </div>
              <div className="form-input">
                <div className="form-input-field">
                  <button onClick={registryHandler}>Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default registryForm