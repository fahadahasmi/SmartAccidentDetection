import { SERVER_URL } from './constant.js';


document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const previewImg = document.getElementById('preview-img');
    const previewVideo = document.getElementById('preview-video');
    const previewModal = document.getElementById('preview-modal');
    const getPredictionBtn = document.getElementById('get-prediction-btn');
    const predictionDrawer = document.getElementById('prediction-drawer');
    const drawerResultText = document.getElementById('drawer-result-text');
    const fetchHospitalsBtn = document.getElementById('fetch-hospitals-btn');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const loader = document.getElementById('loader');

    let selectedFile;

    // Initialize Materialize Modal
    M.Modal.init(previewModal);

    document.querySelector('.file-btn').addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const fileType = selectedFile.type;
        previewImg.classList.add('hide');
        previewVideo.classList.add('hide');

        if (fileType.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                previewImg.src = reader.result;
                previewImg.classList.remove('hide');
                M.Modal.getInstance(previewModal).open();
            };
            reader.readAsDataURL(selectedFile);
        } else if (fileType.startsWith('video/')) {
            previewVideo.src = URL.createObjectURL(selectedFile);
            previewVideo.classList.remove('hide');
            M.Modal.getInstance(previewModal).open();
        } else {
            alert('Unsupported file type!');
        }
    });

    getPredictionBtn.addEventListener('click', async () => {
        M.Modal.getInstance(previewModal).close();
        predictionDrawer.classList.add('open');

        const formData = new FormData();
        formData.append('file', selectedFile);

        // Show loader
        loader.style.display = 'flex';

        // Simulate an API call
        fetch(SERVER_URL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                drawerResultText.textContent = `Prediction: ${data.Prediction === 'Accident'
                    ? 'Accident detected.'
                    : 'No accident detected.' || "No result found"}`;
                if (data.Prediction == "Accident") {
                    fetchHospitalsBtn.classList.remove('hide');
                }
            })
            .catch(err => {
                alert('Error processing file.');
            })
            .finally(() => {
                // Hide loader
                loader.style.display = 'none';
            });
    });

    fetchHospitalsBtn.addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                window.location.href = `result.html?lat=${lat}&long=${long}`;
            },
            () => {
                alert("Unable to fetch location.");
            }
        );
    });

    closeDrawerBtn.addEventListener('click', () => {
        predictionDrawer.classList.remove('open');
    });
});