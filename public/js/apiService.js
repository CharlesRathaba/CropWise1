class ApiService {
  static async analyzeImage(formData) {
    const response = await fetch("/analyze", {
      method: "POST",
      body: formData,
    });
    return await response.json();
  }

  static async downloadReport(analysisResult, analysisImage) {
    const response = await fetch("/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        result: analysisResult,
        image: analysisImage,
      }),
    });
    return response;
  }
} 