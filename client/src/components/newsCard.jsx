import React, { useEffect, useState } from "react";
import axios from "axios";
import "./newsCard.css";

const NewsCard = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchHeadlines = async () => {
    try {
      
      
      const response = await axios.get("/api/headlines");
      console.log(response.data)
      setLoading(false);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHeadlines();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="newscard-loading-container">
          <span className="newscard-loading-welcome">Hello...</span>
        </div>
      ) : (
        data.map((item) => {
          return (
            <>
              <div key={item.id} className="newscard-heading-container">
                <a href={item.url}>
                  <h2 className="newscard-heading">{item.title}</h2>
                </a>
              </div>
              <div className="newscard-image-text-container">
                {/* <img
                  className="newscard-image"
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={item.title}
                /> */}
                <p className="newscard-text">
                  {item.summary}
                </p>
              </div>
            </>
          );
        })
      )}
    </div>
  );
};

export default NewsCard;
