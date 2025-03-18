// Access elements
const videoElement = document.getElementById('videoElement');
const canvasElement = document.getElementById('capturedImageCanvas');
const startCameraBtn = document.getElementById('startCameraBtn');
const captureBtn = document.getElementById('captureBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const stopCameraBtn = document.getElementById('stopCameraBtn');
const resultsSection = document.getElementById('resultsSection');
const skinTypeResult = document.getElementById('skinTypeResult');
const routineList = document.getElementById('routineList');

let stream;

// Start the camera
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
        videoElement.style.display = 'block'; // Show the video feed
        startCameraBtn.style.display = 'none'; // Hide "Start Camera" button
        captureBtn.style.display = 'inline-block'; // Show "Capture Image" button
        stopCameraBtn.style.display = 'inline-block'; // Show "Stop Camera" button
    } catch (error) {
        alert('Unable to access the camera. Please check your permissions.');
        console.error(error);
    }
}

// Stop the camera
function stopCamera() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;
        videoElement.style.display = 'none'; // Hide the video feed
        canvasElement.style.display = 'none'; // Hide the captured image
        startCameraBtn.style.display = 'inline-block'; // Show "Start Camera" button
        captureBtn.style.display = 'none'; // Hide "Capture Image" button
        analyzeBtn.style.display = 'none'; // Hide "Analyze Now" button
        stopCameraBtn.style.display = 'none'; // Hide "Stop Camera" button
        resultsSection.style.display = 'none'; // Hide results section
    }
}

// Capture an image from the camera
function captureImage() {
    const context = canvasElement.getContext('2d');
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    // Show the captured image
    canvasElement.style.display = 'block';
    videoElement.style.display = 'none'; // Hide the live video feed
    captureBtn.style.display = 'none'; // Hide "Capture Image" button
    analyzeBtn.style.display = 'inline-block'; // Show "Analyze Now" button
}

// Simulate skin analysis
function analyzeSkin() {
    // Simulated skin type result
    const skinTypes = ['Oily', 'Dry', 'Combination', 'Normal'];
    const randomSkinType = skinTypes[Math.floor(Math.random() * skinTypes.length)];

    // Simulated daily routine based on skin type
    const routines = {
        Oily: [
            { name: 'CeraVe Foaming Cleanser', link: 'https://www.lookfantastic.ie/c/brands/cerave/cleansers/?kwds=324035440554&adtype=&utm_source=bing&utm_medium=cpc&affil=thgppc&thg_ppc_campaign=21703722631&product_id=&utm_campaign=LF%20%7C%7C%20UK%20%7C%7C%20IE%20%7C%7C%20EN%20%7C%7C%20TEXT%20%7C%7C%20NB%20%7C%7C%20PARTNER%20BRAND%20%7C%7C%20CeraVe%20%7C%7C%20BM&utm_term=cerave%20foaming%20cleanser&utm_content=Cerave%20%7C%7C%20Cera%20Ve%20Cleanser%20%7C%7C%20BM' },
            { name: 'Neutrogena Oil-Free Moisturizer', link: 'https://www.firstcry.com/minimalist/minimalist-vitamin-b5-10-oil-free-moisturizer-for-oily-skin-50-g/18253763/product-detail?ref=BSN_Shopping_78_Facial-Care!BSN-Standard_All_Search_Ads!&utm_source=bing&utm_medium=cpc&utm_campaign=BSN-Standard_All_Search_Ads&utm_term=4586337882898975&utm_content=Ad%20group%20%231' },
            { name: 'La Roche-Posay Anthelios Sunscreen', link: 'https://www.amazon.in/s?k=la+roche+posay+sunscreens&adgrpid=1312819251957840&hvadid=82051430529919&hvbmt=bp&hvdev=c&hvlocphy=157506&hvnetw=o&hvqmt=p&hvtargid=kwd-82052236443646%3Aloc-90&hydadcr=22035_2354596&mcid=fcb95f9442f13611ab3344b123ef3fd6&tag=msndeskstdin-21&ref=pd_sl_7mpa2yo3h_p' }
        ],
        Dry: [
            { name: 'Cetaphil Hydrating Cleanser', link: 'https://www.amazon.com/Cetaphil-Hydrhttps://www.cetaphil.com/us/cleansers/hydrating-foaming-cream-cleanser/302990117097.htmlating-Cleanser-Hydration-Sensitive/dp/B00KMW0Y0A' },
            { name: 'CeraVe Moisturizing Cream', link: 'https://www.amazohttps://www.cerave.com/skincare/moisturizers/moisturizing-creamn.com/CeraVe-Moisturizing-Cream-Dry-Sensitive/dp/B001789B8U' },
            { name: 'First Aid Beauty Gentle Exfoliant', link: 'htthttps://www.firstaidbeauty.com/collections/cleansers-exfoliatorsps://www.sephora.com/product/first-aid-beauty-facial-cleanser-P449343' }
        ],
        Combination: [
            { name: 'La Roche-Posay Toleriane Cleanser', link: 'https://www.lookfantastic.ie/c/brands/la-roche-posay/view-all/?kwds=104899231&utm_content=La%20Roche%20Posay%20%7C%7C%20Toleriane%20%7C%7C%20BM&thg_ppc_campaign=21703770922&adtype=&utm_term=la%20roche%20posay%20toleriane&affil=thgppc&product_id=&utm_campaign=LF%20%7C%7C%20UK%20%7C%7C%20IE%20%7C%7C%20EN%20%7C%7C%20TEXT%20%7C%7C%20NB%20%7C%7C%20PARTNER%20BRAND%20%7C%7C%20La%20Roche-Posay%20%7C%7C%20BM&utm_source=bing&utm_medium=cpc' },
            { name: 'Neutrogena Hydro Boost Water Gel', link: 'https://www.amazon.in/Neutrogena-Hydro-Boost-Water-Blue/dp/B00BQFTQW6' },
            { name: 'Supergoop! Unseen Sunscreen', link: 'https://supergoop.com/products/unseen-sunscreen?variant=31189107376226' }
        ],
        Normal: [
            { name: 'CeraVe Hydrating Cleanser', link: 'https://www.ceraveindia.com/ceramides-skin-care/cleansers/hydrating-cleanser' },
            { name: 'Olay Regenerist Moisturizer', link: 'https://www.olay.com/en-us/skin-care-products/product-lines/regenerist' },
            { name: 'EltaMD UV Clear Broad-Spectrum SPF 46', link: 'https://eltamd.com/products/uv-clear-broad-spectrum-spf-46' }
        ]
    };

    const recommendedRoutine = routines[randomSkinType] || [];

    // Update the results section
    skinTypeResult.textContent = `Your skin type is ${randomSkinType}.`;
    routineList.innerHTML = ''; // Clear previous results
    recommendedRoutine.forEach(product => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = product.link;
        link.target = '_blank'; // Open link in a new tab
        link.textContent = product.name;
        li.appendChild(link);
        routineList.appendChild(li);
    });

    // Show the results section after analysis
    resultsSection.style.display = 'grid';

    // Optional: Log results to console for debugging
    console.log('Skin Type:', randomSkinType);
    console.log('Recommended Products:', recommendedRoutine);
}

// Event listeners
startCameraBtn.addEventListener('click', startCamera);
captureBtn.addEventListener('click', captureImage);
analyzeBtn.addEventListener('click', analyzeSkin);
stopCameraBtn.addEventListener('click', stopCamera);