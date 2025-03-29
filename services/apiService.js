// Obtiene datos del clima para una ciudad específica
async function getWeather(city = "Sevilla") {
  try {
    const apiUrl = "https://wttr.in/";
    const format = "?format= %c %t"; // %C para condición, %t para temperatura

    const sanitizedCity = encodeURIComponent(city.trim() || "Sevilla");
    const url = `${apiUrl}${sanitizedCity}${format}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const weatherData = await response.text();

    if (weatherData.includes("Error") || weatherData.trim() === "") {
      throw new Error("Ciudad no encontrada");
    }

    return `${city}: ${weatherData.trim()}`;
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    return `⚠️ No se pudo obtener el clima para "${city}"`;
  }
}


// Obtiene noticias desde la API
async function getNews(source = null) {
  try {
    const newsApiUrl = source
      ? newsSources[source]
      : newsSources[currentNewsSource];

    console.log("Obteniendo noticias de:", newsApiUrl);

    const response = await fetch(newsApiUrl);

    if (!response.ok) {
      throw new Error(`Error al obtener noticias: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la API de noticias:", error);
    return { items: [] };
  }
}

// Formatea el nombre de la fuente para mostrar
function formatSourceName(sourceId) {
  switch (sourceId) {
    case "elPais":
      return "El País";
    case "elMundo":
      return "El Mundo";
    case "marcaMotor":
      return "Fórmula 1";
    default:
      return sourceId;
  }
}