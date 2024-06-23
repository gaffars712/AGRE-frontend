import React from "react";


export default function Map({mapUrl, height="450"}) {

  const getEmbedLinkFromMapUrl = (url) => {
    const regex = /src="([^"]+)"/;
    const match = url?.match(regex);
    return match ? match[1] : null;
  };
  const embedLink = getEmbedLinkFromMapUrl(mapUrl);


  return (
    <div className="mt-5 mt-md-0" >

      <div className="border rounded-4 w-100 p-1 p-md-3">
        <iframe src={embedLink} width="100%" height={height} className="rounded-4" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
}