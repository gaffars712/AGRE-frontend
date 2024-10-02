"use client";
import dynamic from "next/dynamic";
import WhatsApp from "../../assets/facilities/whatsapp chat.svg";
import Image from "next/image";
import styles from "./styles.module.css"; // Import your CSS file

const ReactWhatsapp = dynamic(() => import("react-whatsapp"), { ssr: false });

const WhatsappButton = ({segmentPath}) => {
  console.log('segmeng',segmentPath)
  return (
    <div>
      <ReactWhatsapp
        className={`${styles["whatsapp-button"]}`} // Apply CSS class
        number="971-56-2165243"
        message={segmentPath === 'ar' ? 'مرحباً! أنا مهتم جدًا بقوائم العقارات الخاصة بك. هل يمكنك تقديم المزيد من التفاصيل حول العقارات المتاحة؟ نتطلع الى الاستماع منك قريبا. شكرًا لك!' : `Hello! I'm very interested in your real estate listings. Could you please provide more details about the available properties? Looking forward to hearing from you soon. Thank you!`}
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
