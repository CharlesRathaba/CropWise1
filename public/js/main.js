document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    imageInput: document.getElementById("imageInput"),
    imagePreview: document.getElementById("imagePreview"),
    uploadForm: document.getElementById("uploadForm"),
    resultDiv: document.getElementById("result"),
    loadingDiv: document.getElementById("loading"),
    downloadButton: document.getElementById("downloadButton"),
    dropArea: document.getElementById("dropArea")
  };

  let state = {
    analysisResult: "",
    analysisImage: ""
  };

  // Initialize image handler
  const imageHandler = new ImageHandler(
    elements.imageInput,
    elements.imagePreview,
    elements.dropArea
  );

  // Form submission handler
  elements.uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    elements.loadingDiv.style.display = "block";
    elements.resultDiv.style.display = "none";
    elements.resultDiv.textContent = "";
    elements.downloadButton.style.display = "none";

    try {
      const data = await ApiService.analyzeImage(formData);
      if (data.result) {
        state.analysisResult = data.result;
        state.analysisImage = data.image;
        elements.resultDiv.innerHTML = `<h3>Analysis Result:</h3><p>${data.result.replace(/\n/g, "<br>")}</p>`;
        elements.resultDiv.style.display = "block";
        elements.downloadButton.style.display = "block";
      } else if (data.error) {
        elements.resultDiv.textContent = "Error: " + data.error;
        elements.resultDiv.style.display = "block";
      }
    } catch (error) {
      elements.resultDiv.textContent = "Error: " + error.message;
      elements.resultDiv.style.display = "block";
    } finally {
      elements.loadingDiv.style.display = "none";
    }
  });

  // Download button handler
  elements.downloadButton.addEventListener("click", async () => {
    const response = await ApiService.downloadReport(state.analysisResult, state.analysisImage);
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Plant_Analysis_Report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      alert("Failed to generate and download the PDF report.");
    }
  });
}); 