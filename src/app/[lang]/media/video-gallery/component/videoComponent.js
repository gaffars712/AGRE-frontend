import React from "react";

function VideoComponent({ videoDetails }) {

  function getId(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url?.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return "error";
    }
  }

  let VideoGallery = [
    {
      title: "Wasl Properties Residence",
      video: "https://youtu.be/ACRK5zrWgHY",
    },
    {
      title: "Wasl Properties Residence",
      video: "https://youtu.be/EqnAuz3zk1g?si=R_nFMrA3pK8zdR82",
    },
    {
      title: "Wasl Properties Residence",
      video: "https://youtu.be/1fYWBpN4PTY?si=ZClm_kM4H3Y73SWD",
    },
    {
      title: "Wasl Properties Residence",
      video: "https://youtu.be/IyHAi378HQU?si=9sX5tjpCTD9mPtNc",
    },
    {
      title: "Wasl Properties Residence",
      video: "https://youtu.be/2OLAAVJ148E?si=4SZsLw9Ny9Jx-_oM",
    },
    {
      title: "Wasl Properties Residence",
      video: "https://youtu.be/0PQ7GcZWA98?si=mlGDrHOtTe063bVc",
    },
    {
      title: "Wasl Properties Residence",
      video: "https://youtu.be/ojpyLHaVZqA?si=zzACgt-RJLDsObw4",
    },
  ];

  return (
    <div className="section-padding pt-0">
      <div className="row">

        {
          videoDetails.links.length && (
            videoDetails.links.map((item, index) => (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3 position-relative" style={{ height: '300px' }}>
                <iframe
                  className="w-100 h-100 rounded-4"
                  src={`https://www.youtube.com/embed/${getId(item?.videoLinks)}`}
                ></iframe>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}

export default VideoComponent;
