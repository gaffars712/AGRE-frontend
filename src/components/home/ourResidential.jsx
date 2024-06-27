/** @format */

"use client";
import Link from "next/link";
import Carousel from "react-elastic-carousel";

function OurResidential  ({params, residentialDetails, residentialData}) {

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 650, itemsToShow: 2 },
        { width: 1008, itemsToShow: 3 },
        // { width: 1500, itemsToShow: 4 },
    ];
    const residentialContent = [
        {
            id: 1,
            title: "Al Maskan- 1",
            image: "https://s3-alpha-sig.figma.com/img/075a/c1cd/37aaa555923330e7f3dabce89c2c3084?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fEsTuRFMA3CJFdX5aJhCnbN7eaUVgyKza~cb9nuU8yrz6upTLqkFcaVtz0vIFcecjBbGHwREijdGzip8h707OReKpkqdz1ZWi4bPB20n8ODbWvwSI54yxoY5i-Q2WTAfV7F-d~2ljr9aRzYyjgoKLfT4JN0qEIYLyMiXaYOM-vCW50FvONfkdjutNBqs8L2ccCNZSQ26GoP~zqflisBfcKQAIFogejOdrm3gvGJrU50wVNxfJ2dHeR7mY8iV68rTUD75jsn-YGB~eaxVP8WvJX5gM~ZW6Vv0BHYdgpWqSuS30eFD89KEy2sw4E45E4HZy9Xr0Il-tcFOJSgekS8Yuw__",
        },
        {
            id: 2,
            title: "Al Maskan- 1",
            image: "https://s3-alpha-sig.figma.com/img/f112/7ac6/be77bdaffe6c64e6068ef05e38db6901?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ra14Rh1L6xKbidpTnYBJaB6KIDvKz5U3R6SdPfg7Fu~7s63UYjFq9roQ6iNyqjMp-QkzAivjs9pmMr4WHJ5Od5KB8JlNXw3P~6OE67vYispO3uGsvwT4-vBrWOsM9JJedcqVBVUnALDFL5pBnhCGxOVtmyDzltjTr5VUzGQjALUaPm5tzA~3xtH5xNobW4DIwiLFJeVENreMi5AlpiKDs6X66~Qu3X93C99rxyIIkfW2780aK0~dRigDVNrJqDRFcSl4si3bePegi1SRKz1eIghReabjl7iijOU2touzQQypHRx~6rtlNeLTLoksylGjZG-TtfW7poQX2dGcwrbSFg__",
        },
        {
            id: 3,
            title: "Al Maskan- 1",
            image: "https://s3-alpha-sig.figma.com/img/5784/1912/476a7c6ad824f29c1281169ab63b9870?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jve34sfdBST7KeZ2S4QxkRJwHv9wBGH~BA87iHafCyI9RRL80v3WQ6o6ZZA89OWNoc9UGmB0vnxhe6ic8EiAZxbCUhjjUdY7kHv65gdvDZyspM51yttvM-4Uiz3kEZ6RE~tP6GYov4uY1DsIJGVMcvVeP7aYtrVsHKm01vytJczMvXWw2vls--sWfG90NDjySbfioW5r3qAyfhA5NYnIc7yPPtNp-b5fsMRnoWmKJJugFfpYmoMElgLtMtftuzgWJTL5ZF4xKMe4KXxFALT0c3U4HKVQ-XS4IGrzHr4X9Nm1gDbUokOhxNyXhWfJRRbAnocmXhI~hlDWomO2il3tSQ__",
        },
        {
            id: 4,
            title: "Al Maskan- 1",
            image: "https://s3-alpha-sig.figma.com/img/075a/c1cd/37aaa555923330e7f3dabce89c2c3084?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fEsTuRFMA3CJFdX5aJhCnbN7eaUVgyKza~cb9nuU8yrz6upTLqkFcaVtz0vIFcecjBbGHwREijdGzip8h707OReKpkqdz1ZWi4bPB20n8ODbWvwSI54yxoY5i-Q2WTAfV7F-d~2ljr9aRzYyjgoKLfT4JN0qEIYLyMiXaYOM-vCW50FvONfkdjutNBqs8L2ccCNZSQ26GoP~zqflisBfcKQAIFogejOdrm3gvGJrU50wVNxfJ2dHeR7mY8iV68rTUD75jsn-YGB~eaxVP8WvJX5gM~ZW6Vv0BHYdgpWqSuS30eFD89KEy2sw4E45E4HZy9Xr0Il-tcFOJSgekS8Yuw__",
        },
        {
            id: 5,
            title: "Al Maskan- 1",
            image: "https://s3-alpha-sig.figma.com/img/f112/7ac6/be77bdaffe6c64e6068ef05e38db6901?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ra14Rh1L6xKbidpTnYBJaB6KIDvKz5U3R6SdPfg7Fu~7s63UYjFq9roQ6iNyqjMp-QkzAivjs9pmMr4WHJ5Od5KB8JlNXw3P~6OE67vYispO3uGsvwT4-vBrWOsM9JJedcqVBVUnALDFL5pBnhCGxOVtmyDzltjTr5VUzGQjALUaPm5tzA~3xtH5xNobW4DIwiLFJeVENreMi5AlpiKDs6X66~Qu3X93C99rxyIIkfW2780aK0~dRigDVNrJqDRFcSl4si3bePegi1SRKz1eIghReabjl7iijOU2touzQQypHRx~6rtlNeLTLoksylGjZG-TtfW7poQX2dGcwrbSFg__",
        },
        {
            id: 6,
            title: "Al Maskan- 1",
            image: "https://s3-alpha-sig.figma.com/img/5784/1912/476a7c6ad824f29c1281169ab63b9870?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jve34sfdBST7KeZ2S4QxkRJwHv9wBGH~BA87iHafCyI9RRL80v3WQ6o6ZZA89OWNoc9UGmB0vnxhe6ic8EiAZxbCUhjjUdY7kHv65gdvDZyspM51yttvM-4Uiz3kEZ6RE~tP6GYov4uY1DsIJGVMcvVeP7aYtrVsHKm01vytJczMvXWw2vls--sWfG90NDjySbfioW5r3qAyfhA5NYnIc7yPPtNp-b5fsMRnoWmKJJugFfpYmoMElgLtMtftuzgWJTL5ZF4xKMe4KXxFALT0c3U4HKVQ-XS4IGrzHr4X9Nm1gDbUokOhxNyXhWfJRRbAnocmXhI~hlDWomO2il3tSQ__",
        },
        {
            id: 7,
            title: "Al Maskan- 1",
            image: "https://s3-alpha-sig.figma.com/img/075a/c1cd/37aaa555923330e7f3dabce89c2c3084?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fEsTuRFMA3CJFdX5aJhCnbN7eaUVgyKza~cb9nuU8yrz6upTLqkFcaVtz0vIFcecjBbGHwREijdGzip8h707OReKpkqdz1ZWi4bPB20n8ODbWvwSI54yxoY5i-Q2WTAfV7F-d~2ljr9aRzYyjgoKLfT4JN0qEIYLyMiXaYOM-vCW50FvONfkdjutNBqs8L2ccCNZSQ26GoP~zqflisBfcKQAIFogejOdrm3gvGJrU50wVNxfJ2dHeR7mY8iV68rTUD75jsn-YGB~eaxVP8WvJX5gM~ZW6Vv0BHYdgpWqSuS30eFD89KEy2sw4E45E4HZy9Xr0Il-tcFOJSgekS8Yuw__",
        },
        {
            id: 8,
            title: "Al Maskan- 1",
            image: "https://s3-alpha-sig.figma.com/img/f112/7ac6/be77bdaffe6c64e6068ef05e38db6901?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ra14Rh1L6xKbidpTnYBJaB6KIDvKz5U3R6SdPfg7Fu~7s63UYjFq9roQ6iNyqjMp-QkzAivjs9pmMr4WHJ5Od5KB8JlNXw3P~6OE67vYispO3uGsvwT4-vBrWOsM9JJedcqVBVUnALDFL5pBnhCGxOVtmyDzltjTr5VUzGQjALUaPm5tzA~3xtH5xNobW4DIwiLFJeVENreMi5AlpiKDs6X66~Qu3X93C99rxyIIkfW2780aK0~dRigDVNrJqDRFcSl4si3bePegi1SRKz1eIghReabjl7iijOU2touzQQypHRx~6rtlNeLTLoksylGjZG-TtfW7poQX2dGcwrbSFg__",
        },
        {
            id: 9,
            title: "Al Maskan- 1",
            image: "https://s3-alpha-sig.figma.com/img/5784/1912/476a7c6ad824f29c1281169ab63b9870?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jve34sfdBST7KeZ2S4QxkRJwHv9wBGH~BA87iHafCyI9RRL80v3WQ6o6ZZA89OWNoc9UGmB0vnxhe6ic8EiAZxbCUhjjUdY7kHv65gdvDZyspM51yttvM-4Uiz3kEZ6RE~tP6GYov4uY1DsIJGVMcvVeP7aYtrVsHKm01vytJczMvXWw2vls--sWfG90NDjySbfioW5r3qAyfhA5NYnIc7yPPtNp-b5fsMRnoWmKJJugFfpYmoMElgLtMtftuzgWJTL5ZF4xKMe4KXxFALT0c3U4HKVQ-XS4IGrzHr4X9Nm1gDbUokOhxNyXhWfJRRbAnocmXhI~hlDWomO2il3tSQ__",
        },
    ];

    return (
        <div
            className="section-padding "
            style={{ backgroundColor: "rgba(0, 51, 102, 0.15)" }}
        >
            <div
                className="text-headingClr text-center mb-4"
                style={{ fontSize: "32px" }}
            >
                {residentialDetails?.length ?  residentialDetails[0]?.title : "Our Residential"}
            </div>
            <div className="text-center mb-5" style={{color:'rgba(141, 141, 135, 1)'}}>
                {residentialDetails?.length ?  residentialDetails[0]?.desc : "Our residential portfolio consists of modern, affordable and upgraded apartments. We welcome you to make them your home"}
            </div>
            <Carousel breakPoints={breakPoints}>
                {residentialData?.length &&
                    residentialData?.map((item, index) => {
                        return (
                            <Card
                            params={params}
                                image={item?.attributes?.SliderImg?.data?.attributes?.url}
                                title={item?.attributes?.proName}
                                key={index}
                                id={item?.attributes?.slug}
                            />
                        );
                    })}
            </Carousel>
            <div className=" w-100 d-flex justify-content-center mt-5">
                {/* <Link href={"/properties/residential"} className="">
                    <button
                        className="btn btn-backgroundClr "
                        style={{ width: "135px" }}
                    >
                        {residentialDetails[0]?.viewBTN ? residentialDetails[0]?.viewBTN : ''}
                    </button>
                </Link> */}
            </div>
        </div>
    );
};

export default OurResidential;

const Card = ({ image, title, key, id , params }) => {
    return (
        <Link
            href={`/${params?.lang}/project-detail/residential/${id}`}
            key={key}
            className="rounded-4 position-relative"
            // style={{ width: "321px" }}
        >
            <img
                className="w-100  object-fit-cover rounded-4 z-1"
                // style={{ height: "410px" }}
                src={image}
                alt="img"
            ></img>
            <div
                className="position-absolute rounded-bottom-4 bottom-0 z-3 w-100 d-flex align-items-center justify-content-center text-white"
                style={{
                    backgroundColor: "rgba(4, 115, 169, 0.5)",
                    height: "53px",
                    fontWeight:"500"
                }}
            >
                {title}
            </div>
        </Link>
    );
};
