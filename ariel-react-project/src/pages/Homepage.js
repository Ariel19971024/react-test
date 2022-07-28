import { useState, useEffect } from "react";
import { getUnLoginList,getLoginList } from "../api/api.js";
import RegistryForm from "../components/Hompage/RegistryForm.js"
function Homepage(props) {
  const{loadingHandler}=props //control loading
  const [webinarsList, setWebinarsList] = useState([]);
  const [webinarsAllList, setwebinarsAllList] = useState([]);
  const [page, setPage] = useState(0);
  const isLogin=sessionStorage.getItem("token");
  useEffect(() => {
    let showList=webinarsAllList.slice(page*6,page*6+6)
    if(!showList.length){
      if (isLogin) {
        setwebinarsAllList([]);
        fetchData(getLoginList);
      } else {
        fetchData(getUnLoginList,{ params: { per_page: 12, page: (page+2)/2 } });
      }
    }else{
      setWebinarsList(showList);
    }

  }, [page]);

  const fetchData = async (fn,params) => {
    //let params = { params: { per_page: 12, page: (page+2)/2 } };
    try{
      loadingHandler.open();    
      let res = await fn(params);
      let resList = res.data.data.map((card)=>{
      //reformate time
      let dd = new Date(card.created_at);
      dd.setDate(dd.getDate() + 10);
      let [y,m,d,hh,mm]=[dd.getFullYear(),dd.getMonth()+1,dd.getDate(),dd.getHours(),dd.getMinutes()]
      card.cardFormateTime=`${y}/${m}/${d} ${hh}:${mm}`
      // reformate content
      card.content=JSON.parse(card.content).blocks.reduce((acc,cur)=>{
          acc=acc+cur.text
          return acc
      },"")
      return card;
    });
    setwebinarsAllList([...webinarsAllList,...resList]);
    let showList=[...webinarsAllList,...resList].slice(page*6,page*6+6)
    setWebinarsList(showList);

    }catch(e){
      console.log(e)
    }finally{
      loadingHandler.close();
    }

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
                <div className="card-item-details-time">{card.cardFormateTime}</div>
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
        {/* after login there's no need to call api to make pagination */}
        {isLogin && (webinarsAllList.length/6>(page+1))?<button onClick={()=>setPage(page+1)}>next</button>:null}
        {!isLogin?<button onClick={()=>setPage(page+1)}>next</button>:null}
      </div>
          <RegistryForm topics={webinarsAllList}/>
    </div>
  );
}
export default Homepage;
