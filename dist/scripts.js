document.addEventListener("DOMContentLoaded", function () {
    const infoContainer = document.getElementById("info-container");
    const container = document.getElementById("container");
    const checkIpButton = document.getElementById("checkIpButton");
    const refreshButton = document.getElementById("refreshButton");
    const ipInfo = document.getElementById("ipInfo");
    const mapContainer = document.getElementById("map-container");

    checkIpButton.addEventListener("click", function () {
        infoContainer.style.display = "none";
        container.style.display = "block";
        fetch("https://ipapi.co/json/")
            .then((response) => response.json())
            .then((data) => {
                if (data.ip) {
                    container.style.marginBottom = "70px";
                    refreshButton.style.marginTop = "20px";
                    refreshButton.style.display = "block";
                    ipInfo.innerHTML = `
                        <p><strong>IP Address:</strong> ${data.ip}</p>
                        <p><strong>Network:</strong> ${data.network || "Tidak ada data"}</p>
                        <p><strong>Version:</strong> ${data.version || "Tidak ada data"}</p>
                        <p><strong>City:</strong> ${data.city || "Tidak ada data"}</p>
                        <p><strong>Region:</strong> ${data.region || "Tidak ada data"}</p>
                        <p><strong>Region Code:</strong> ${data.region_code || "Tidak ada data"}</p>
                        <p><strong>Country:</strong> ${data.country || "Tidak ada data"}</p>
                        <p><strong>Country Name:</strong> ${data.country_name || "Tidak ada data"}</p>
                        <p><strong>Country Code:</strong> ${data.country_code || "Tidak ada data"}</p>
                        <p><strong>Country Code ISO3:</strong> ${data.country_code_iso3 || "Tidak ada data"}</p>
                        <p><strong>Country Capital:</strong> ${data.country_capital || "Tidak ada data"}</p>
                        <p><strong>Country TLD:</strong> ${data.country_tld || "Tidak ada data"}</p>
                        <p><strong>Continent Code:</strong> ${data.continent_code || "Tidak ada data"}</p>
                        <p><strong>In EU:</strong> ${data.in_eu || "Tidak ada data"}</p>
                        <p><strong>Postal:</strong> ${data.postal || "Tidak ada data"}</p>
                        <p><strong>Latitude:</strong> ${data.latitude || "Tidak ada data"}</p>
                        <p><strong>Longitude:</strong> ${data.longitude || "Tidak ada data"}</p>
                        <p><strong>Timezone:</strong> ${data.timezone || "Tidak ada data"}</p>
                        <p><strong>UTC Offset:</strong> ${data.utc_offset || "Tidak ada data"}</p>
                        <p><strong>Country Calling Code:</strong> ${data.country_calling_code || "Tidak ada data"}</p>
                        <p><strong>Currency:</strong> ${data.currency || "Tidak ada data"}</p>
                        <p><strong>Currency Name:</strong> ${data.currency_name || "Tidak ada data"}</p>
                        <p><strong>Languages:</strong> ${data.languages || "Tidak ada data"}</p>
                        <p><strong>Country Area:</strong> ${data.country_area || "Tidak ada data"}</p>
                        <p><strong>Country Population:</strong> ${data.country_population || "Tidak ada data"}</p>
                        <p><strong>ASN:</strong> ${data.asn || "Tidak ada data"}</p>
                        <p><strong>Organization:</strong> ${data.org || "Tidak ada data"}</p>
                    `;

                    if (data.latitude && data.longitude) {
                        const map = L.map(mapContainer).setView([data.latitude, data.longitude], 10);
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
                    } else {
                        mapContainer.innerHTML = `<p>Map data not available.</p>`;
                    }
                } else {
                    ipInfo.innerHTML = `<p>Data not available. Please try again later.</p>`;
                    mapContainer.innerHTML = `<p>Map data not available.</p>`;
                }
            })
            .catch((error) => {
                console.error("Error fetching IP data:", error);
                ipInfo.innerHTML = `<p>Data not available. Please try again later.</p>`;
                mapContainer.innerHTML = `<p>Map data not available.</p>`;
            });
    });

    refreshButton.addEventListener("click", function () {
        location.reload();
    });
});
