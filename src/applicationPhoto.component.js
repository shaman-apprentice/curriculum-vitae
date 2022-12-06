/**
 * <button>
 *   <div>(Zeige Photo | Minimiere Photo)</div>
 *   <div class="icon">(↧ | ↥)</div>
 * </button>
 * <img class="hidePhoto" src="/assets/applicationPhoto.jpg"/>
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
    img.classList.add("hidePhoto");

    const showPhotoButton = document.createElement("button");

    const showPhotoButtonTextSpan = document.createElement("div");
    showPhotoButtonTextSpan.textContent = "Zeige Photo";
    showPhotoButton.appendChild(showPhotoButtonTextSpan);

    const showPhotoButtonIcon = document.createElement("div");
    showPhotoButtonIcon.textContent =  "↧";
    showPhotoButtonIcon.className = "icon"
    showPhotoButton.appendChild(showPhotoButtonIcon);

    showPhotoButton.onclick = () => {
      const isPhotoCurrentlyHidden = img.classList.contains("hidePhoto"); 
      if (isPhotoCurrentlyHidden) {
        showPhotoButtonTextSpan.textContent = "Minimiere Photo";
        showPhotoButtonIcon.textContent = "↥";
        img.classList.remove("hidePhoto");
      } else {
        showPhotoButtonTextSpan.textContent = "Zeige Photo";
        showPhotoButtonIcon.textContent = "↧";
        img.classList.add("hidePhoto");
      }
    }

    this.appendChild(showPhotoButton);
    this.appendChild(img);
  }
}