class ImageHandler {
  constructor(imageInput, imagePreview, dropArea) {
    this.imageInput = imageInput;
    this.imagePreview = imagePreview;
    this.dropArea = dropArea;
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.dropArea.addEventListener("click", () => this.imageInput.click());
    this.dropArea.addEventListener("dragover", this.handleDragOver.bind(this));
    this.dropArea.addEventListener("dragleave", this.handleDragLeave.bind(this));
    this.dropArea.addEventListener("drop", this.handleDrop.bind(this));
    this.imageInput.addEventListener("change", this.handleInputChange.bind(this));
  }

  handleDragOver(e) {
    e.preventDefault();
    this.dropArea.style.backgroundColor = "#e8f4fd";
  }

  handleDragLeave() {
    this.dropArea.style.backgroundColor = "";
  }

  handleDrop(e) {
    e.preventDefault();
    this.dropArea.style.backgroundColor = "";
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      this.imageInput.files = e.dataTransfer.files;
      this.handleImageUpload(file);
    }
  }

  handleInputChange(event) {
    const file = event.target.files[0];
    if (file) {
      this.handleImageUpload(file);
    }
  }

  handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview.src = e.target.result;
      this.imagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
} 