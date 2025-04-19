document.addEventListener('DOMContentLoaded', function() {
});
function setupMaterialTabs() {
  const materialTabs = document.querySelectorAll('.material-tab');
  if (materialTabs.length > 0) {
    materialTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.material-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.materials-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const materialId = tab.getAttribute('data-material');
        document.getElementById(materialId).classList.add('active');
      });
    });
  }
}

function setupProductCarousel() {
  const carouselNext = document.querySelector('.carousel-next');
  const carouselPrev = document.querySelector('.carousel-prev');
  
  if (carouselNext && carouselPrev) {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.product-slide');
    const totalSlides = slides.length;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
    }

    carouselNext.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    });

    carouselPrev.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    });
  }
}

function setupImpactAnimations() {
  function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      obj.innerHTML = value.toLocaleString() + "+";
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  function startAnimations() {
    const impactSection = document.querySelector('.impact-section');
    if (!impactSection) return;
    
    const sectionTop = impactSection.offsetTop;
    const sectionHeight = impactSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition > sectionTop + sectionHeight / 2) {
      animateValue("waterSaved", 0, 4200, 2000);
      animateValue("co2Reduced", 0, 320, 2000);
      animateValue("bottlesRecycled", 0, 850, 2000);
      window.removeEventListener('scroll', startAnimations);
    }
  }

  if (document.querySelector('.impact-section')) {
    window.addEventListener('scroll', startAnimations);
    startAnimations();
  }
}

function setupFAQAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.classList.contains('active');
        
        document.querySelectorAll('.faq-answer').forEach(ans => {
          ans.classList.remove('active');
          ans.previousElementSibling.setAttribute('aria-expanded', 'false');
        });
        
        if (!isOpen) {
          answer.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
    
    if (faqQuestions.length > 0) {
      faqQuestions[0].click();
    }
  }
}

function setupPolicyTabs() {
  const policyTabs = document.querySelectorAll('.policy-tab');
  if (policyTabs.length > 0) {
    policyTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.policy-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.policy-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }
}

function setupSizeCalculator() {
  const sizeCalculatorForm = document.getElementById('sizeCalculatorForm');
  if (sizeCalculatorForm) {
    sizeCalculatorForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const chest = parseInt(document.getElementById('chest').value);
      const waist = parseInt(document.getElementById('waist').value);
      const hips = parseInt(document.getElementById('hips').value);
      const gender = document.getElementById('gender').value;
      
      let size = '';
      let note = '';
      let showShopButton = true;
      
      if (gender === 'unisex' || gender === 'men') {
        if (chest <= 37 && waist <= 30 && hips <= 40) size = 'S';
        else if (chest <= 40 && waist <= 33 && hips <= 43) size = 'M';
        else if (chest <= 43 && waist <= 36 && hips <= 46) size = 'L';
        else if (chest <= 46 && waist <= 39 && hips <= 49) size = 'XL';
        else if (chest <= 50 && waist <= 42 && hips <= 52) size = '1X';
        else if (chest <= 54 && waist <= 46 && hips <= 56) size = '2X';
        else if (chest <= 58 && waist <= 50 && hips <= 60) size = '3X';
        else {
          size = 'Please contact us';
          note = 'Your measurements exceed our standard size range. Please contact our customer service for assistance.';
          showShopButton = false;
        }
      } else {
        if (chest <= 35 && waist <= 28 && hips <= 38) size = 'XS';
        else if (chest <= 37 && waist <= 30 && hips <= 40) size = 'S';
        else if (chest <= 40 && waist <= 33 && hips <= 43) size = 'M';
        else if (chest <= 43 && waist <= 36 && hips <= 46) size = 'L';
        else if (chest <= 46 && waist <= 39 && hips <= 49) size = 'XL';
        else if (chest <= 50 && waist <= 42 && hips <= 52) size = '1X';
        else if (chest <= 54 && waist <= 46 && hips <= 56) size = '2X';
        else if (chest <= 58 && waist <= 50 && hips <= 60) size = '3X';
        else {
          size = 'Please contact us';
          note = 'Your measurements exceed our standard size range. Please contact our customer service for assistance.';
          showShopButton = false;
        }
      }
      
      document.getElementById('resultValue').textContent = size;
      document.getElementById('resultNote').textContent = note;
      document.getElementById('shopButton').style.display = showShopButton ? 'inline-block' : 'none';
      document.getElementById('calculatorResult').style.display = 'block';
    });
  }
}

function setupSizeTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }
}

const navLinks = document.querySelectorAll('nav a');

navLinks.forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  setupMaterialTabs();
  setupProductCarousel();
  setupImpactAnimations();
  setupFAQAccordion();
  setupPolicyTabs();
  setupSizeCalculator();
  setupSizeTabs();
});