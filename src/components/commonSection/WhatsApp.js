"use client";
import dynamic from "next/dynamic";
import WhatsApp from "../../assets/facilities/whatsapp chat.svg";
import Image from "next/image";
import styles from "./styles.module.css"; // Import your CSS file

const ReactWhatsapp = dynamic(() => import("react-whatsapp"), { ssr: false });

const WhatsappButton = () => {
  return (
    <div>
      <ReactWhatsapp
        className={`${styles["whatsapp-button"]}`} // Apply CSS class
        number="91-942-199-5521"
        message="WhatsApp word"
      >
        <Image
          width={55}
          height={55}
          src={WhatsApp}
          alt="whatsapp"
          className={`${styles["whatsapp-image"]}`} // Apply CSS class
        />
      </ReactWhatsapp>
    </div>
  );
};

export default WhatsappButton;
