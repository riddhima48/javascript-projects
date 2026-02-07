// 1. WAITING FOR PAGE TO LOAD
// ============================================
// We wait for the entire HTML page to load before running our JavaScript
// This ensures all elements exist when we try to access them
document.addEventListener('DOMContentLoaded', function() {
    // 2. GETTING HTML ELEMENTS (DOM Elements)
    // We find HTML elements using their IDs/classes and store them in variables
    
    // Main display area
    const currentColorDiv = document.getElementById("current-color");
    // Span where color name is shown
    const colorNameSpan = document.getElementById("colorName");
    // Color buttons
    const redBtn = document.getElementById("redBtn");
    const blueBtn = document.getElementById("blueBtn");
    const greenBtn = document.getElementById("greenBtn");
    const purpleBtn = document.getElementById("purpleBtn");

    // Action buttons
    const randomBtn = document.getElementById("randomBtn");
    const toggleThemeBtn = document.getElementById("toggleThemeBtn");

    // 3. CREATING DATA (Arrays & Variables)
    // Array of color names with their hex codes
    const colorList = [
        { name: 'Red', hex: '#FF6B6B', rgb: 'rgb(255, 107, 107)' },
        { name: 'Blue', hex: '#4D96FF', rgb: 'rgb(77, 150, 255)' },
        { name: 'Green', hex: '#6BCF7F', rgb: 'rgb(107, 207, 127)' },
        { name: 'Purple', hex: '#9D4EDD', rgb: 'rgb(157, 78, 221)' },
        { name: 'Orange', hex: '#FF9A3C', rgb: 'rgb(255, 154, 60)' },
        { name: 'Teal', hex: '#2EC4B6', rgb: 'rgb(46, 196, 182)' }
    ];

    // Variable to track current color
    let currentColor = { name: 'Default', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)' };

    // Variable to track dark/light mode
    let isDarkMode = false;

    // 4. FUNCTIONS
    // Function 1: Update the color display
    function updateColorDisplay(color) {
        console.log('Updating color to:', color.name); // For debugging
        
        // Update the preview box color
        colorPreview.style.backgroundColor = color.rgb;
        
        // Update the text displays
        colorNameDisplay.textContent = color.name;
        colorCodeDisplay.textContent = color.hex;
        
        // Update current color variable
        currentColor = color;
        
        // Change text color for better contrast (optional)
        if (color.name === 'Blue' || color.name === 'Purple') {
            colorNameDisplay.style.color = 'white';
            colorCodeDisplay.style.color = 'white';
        } else {
            colorNameDisplay.style.color = 'black';
            colorCodeDisplay.style.color = 'black';
        }
    }
    // Function 2: Get random color from our array
    function getRandomColorFromList() {
        // Math.random() gives 0-0.9999
        // Multiply by array length (6) gives 0-5.9999
        // Math.floor() removes decimal: 0, 1, 2, 3, 4, or 5
        const randomIndex = Math.floor(Math.random() * colorList.length);
        
        console.log('Random index:', randomIndex, 'Color:', colorList[randomIndex].name);
        
        return colorList[randomIndex];
    }

    // Function 3: Generate completely random hex color
    function getRandomHexColor() {
        // Hex colors: # followed by 6 characters (0-9, A-F)
        const hexChars = '0123456789ABCDEF';
        let color = '#';
        
        // Loop 6 times to create 6-character hex code
        for (let i = 0; i < 6; i++) {
            // Get random character from hexChars
            const randomPosition = Math.floor(Math.random() * 16);
            color += hexChars[randomPosition];
        }
        console.log('Generated random hex:', color);
        
        return {
            name: 'Random Hex',
            hex: color,
            rgb: hexToRgb(color)
        };
    }
    // Function 4: Convert hex color to rgb format
    function hexToRgb(hex) {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Convert hex to decimal
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Function 5: Toggle dark/light mode
    function toggleDarkMode() {
        const body = document.body;
        if (isDarkMode) {
            // Switch to light mode
            body.style.backgroundColor = '#FFFFFF';
            body.style.color = '#000000';darkModeBtn.textContent = '🌙 Dark Mode';
            lightModeBtn.textContent = '☀️ Light Mode';
            isDarkMode = false;
        } else {
            // Switch to dark mode
            body.style.backgroundColor = '#1A1A2E';
            body.style.color = '#FFFFFF';
            darkModeBtn.textContent = '☀️ Switch to Light';
            lightModeBtn.textContent = '🌙 Currently Dark';
            isDarkMode = true;
        }
        console.log('Dark mode:', isDarkMode);
    }
    
    // Function 6: Set light mode
    function setLightMode() {
        const body = document.body;
        body.style.backgroundColor = '#FFFFFF';
        body.style.color = '#000000';
        isDarkMode = false;
        darkModeBtn.textContent = '🌙 Dark Mode';
        lightModeBtn.textContent = '☀️ Light Mode';
    }
    // 5. EVENT LISTENERS (Making buttons work)
    // ============================================
    // We tell JavaScript: "When button is clicked, run this function"
    
    // Event 1: Fixed color buttons (using loop for multiple buttons)
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 'this' refers to the clicked button
            const colorName = this.textContent;
            const colorDataAttribute = this.getAttribute('data-color');
            
            console.log('Button clicked:', colorName, 'Data attribute:', colorDataAttribute);
            
            // Find the color in our array
            const selectedColor = colorList.find(color => 
                color.name.toLowerCase() === colorDataAttribute
            );
            
            if (selectedColor) {
                updateColorDisplay(selectedColor);
            }
        });
    });
    
    // Event 2: Random color from array
    randomColorBtn.addEventListener('click', function() {
        console.log('Random color button clicked');
        const randomColor = getRandomColorFromList();
        updateColorDisplay(randomColor);
    });
    
    // Event 3: Random hex color
    randomHexBtn.addEventListener('click', function() {
        console.log('Random hex button clicked');
        const randomColor = getRandomHexColor();
        updateColorDisplay(randomColor);
    });
    
    // Event 4: Dark mode toggle
    darkModeBtn.addEventListener('click', function() {
        console.log('Dark mode button clicked');
        toggleDarkMode();
    });
    
    // Event 5: Light mode
    lightModeBtn.addEventListener('click', function() {
        console.log('Light mode button clicked');
        setLightMode();
    });
    
    // ============================================
    // 6. INITIAL SETUP (Run when page loads)
    // ============================================
    
    // Set initial color
    updateColorDisplay(currentColor);
    
    // Log to console that everything is loaded
    console.log('Color Changer App loaded successfully!');
    console.log('Available colors:', colorList);
    console.log('Try clicking the buttons!');
    
});