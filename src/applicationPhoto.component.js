/**
 * <button>
 *   <div>(Minimiere Foto | Zeige Foto)</div>
 *   <div class="icon">(↥ | ↧)</div>
 * </button>
 * <img src="/assets/applicationPhoto.jpg" alt="Foto von Torsten Knauf"/>
 */
export class ApplicationPhotoComponent extends HTMLElement {
  constructor() {
    super();

    if (window.location.search.includes("noApplicationImage=true")) {
      this.style.display = "none";
      return;
    }

    const img = document.createElement("img");
    img.src = "/assets/applicationPhoto.jpg";
    img.alt = "Foto von Torsten Knauf";

    const showPhotoButton = document.createElement("button");

    const showPhotoButtonTextSpan = document.createElement("div");
    showPhotoButtonTextSpan.textContent = "Minimiere Foto";
    showPhotoButton.appendChild(showPhotoButtonTextSpan);

    const showPhotoButtonIcon = document.createElement("div");
    showPhotoButtonIcon.textContent =  "↥";
    showPhotoButtonIcon.className = "icon"
    showPhotoButton.appendChild(showPhotoButtonIcon);

    showPhotoButton.onclick = () => {
      const isPhotoCurrentlyHidden = img.classList.contains("hidePhoto"); 
      if (isPhotoCurrentlyHidden) {
        showPhotoButtonTextSpan.textContent = "Minimiere Foto";
        showPhotoButtonIcon.textContent = "↥";
        img.classList.remove("hidePhoto");
      } else {
        showPhotoButtonTextSpan.textContent = "Zeige Foto";
        showPhotoButtonIcon.textContent = "↧";
        img.classList.add("hidePhoto");
      }
    }

    this.appendChild(showPhotoButton);
    this.appendChild(img);
  }
}