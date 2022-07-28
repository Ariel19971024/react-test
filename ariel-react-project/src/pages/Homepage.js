import { useState, useEffect } from "react";
import { getUnLoginList } from "../api/api.js";
function Homepage() {
  const [webinarsList, setWebinarsList] = useState([]);
  const [webinarsAllList, setwebinarsAllList] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let showList=webinarsAllList.slice(page*6,page*6+6)
    if(!showList.length){
      if (sessionStorage.getItem("token")) {
        //
      } else {
        fetchDataUnLogin();
      }
    }else{
      setWebinarsList(showList);
    }

  }, [page]);
  
  const fetchDataUnLogin = async () => {
    let params = { params: { per_page: 12, page: (page+2)/2 } };
    let res = await getUnLoginList(params);
    let resList = res.data.data.map((card)=>{
        card.content=JSON.parse(card.content).blocks.reduce((acc,cur)=>{
            acc=acc+cur.text
            return acc
        },"")
        return card;
    });
    setwebinarsAllList([...webinarsAllList,...resList]);
    let showList=[...webinarsAllList,...resList].slice(page*6,page*6+6)
    setWebinarsList(showList);
  };
  return (
    <div>
      <div className="content-details">
        <div className="details-inner">
          <div className="inner-title">
            <span>Forex Webinars</span>
          </div>
          <div className="inner-content">
            <span>
              Whether you are new to foreign exchange trading or already have
              some market experience, we
            </span>
            <span>
              believe that a solid FX trading education is vital to your success
              as a trader.
            </span>
          </div>
        </div>
      </div>

      <div className="content-informations">
        <div className="cards-group">
          {webinarsList.map((card, index) => {
            return (
              <div className="card-item" key={`card_${index}`}>
                <div className="card-item-details-date">{card.created_at.split(" ")[0]}</div>
                <div className="card-item-details-topic">
                {card.title}
                </div>
                <div className="card-item-details-contents">
                    {card.content}
                </div>
                <div className="card-item-details-time">7pm-8:30pm EST</div>
                <div className="card-item-details-bottom">
                  <div className="card-item-details-bottom-registry">
                    Register Now
                  </div>
                  <div className="card-item-details-bottom-icon"></div>
                </div>
              </div>
            );
          })}
        </div>
        {page?<button onClick={()=>setPage(page-1)}>prev</button>:null}
        <button onClick={()=>setPage(page+1)}>next</button>
      </div>

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
                    <option></option>
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
                  <button>Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Homepage;
