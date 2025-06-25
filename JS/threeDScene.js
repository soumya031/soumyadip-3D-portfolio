let scene, camera, renderer, particles = [];

function init3D() {
    // Create scene
    scene = new THREE.Scene();
    
    // Setup camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Setup renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Create particles
    createParticles();
    
    // Start animation
    animate3D();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function createParticles() {
    const colors = [0x00ffff, 0xff00ff, 0xffff00, 0x00ff00, 0xff0080];
    const geometries = [
        new THREE.SphereGeometry(0.05, 8, 8),
        new THREE.BoxGeometry(0.1, 0.1, 0.1),
        new THREE.ConeGeometry(0.05, 0.15, 6)
    ];

    // Reduce particle count on mobile
    let particleCount = 150;
    if (document.body.classList.contains('mobile-device')) {
        particleCount = 50;
    }

    for (let i = 0; i < particleCount; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const material = new THREE.MeshBasicMaterial({ 
            color: color,
            transparent: true,
            opacity: Math.random() * 0.8 + 0.2
        });
        
        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80
        );
        
        particle.userData = {
            originalY: particle.position.y,
            speed: Math.random() * 0.02 + 0.01,
            rotationSpeed: Math.random() * 0.02 + 0.005
        };
        
        particles.push(particle);
        scene.add(particle);
    }
}

function animate3D() {
    requestAnimationFrame(animate3D);
    
    particles.forEach((particle, index) => {
        const { rotationSpeed } = particle.userData;
        particle.rotation.x += rotationSpeed;
        particle.rotation.y += rotationSpeed;
        particle.rotation.z += rotationSpeed * 0.5;
        
        // Floating animation
        particle.position.y = particle.userData.originalY + 
            Math.sin(Date.now() * particle.userData.speed + index) * 2;
        
        // Drift effect
        particle.position.x += Math.sin(Date.now() * 0.0005 + index) * 0.01;
        particle.position.z += Math.cos(Date.now() * 0.0005 + index) * 0.01;
        
        // Pulsing opacity
        particle.material.opacity = 0.3 + Math.sin(Date.now() * 0.003 + index) * 0.3;
    });

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init3D);