let scene, camera, renderer, controls, light, model, raycaster;
let mouse = new THREE.Vector2(), INTERSECTED;

const init = () => {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 300, 300);
    controls = new THREE.OrbitControls(camera);

    light = new THREE.SpotLight(0x929da3, 4);
    light.position.set(-50, 50, 50).normalize();
    light.castShadow = true;
    light.shadow.bias = -0.0001;
    light.shadow.mapSize.width = 1024 * 4;
    light.shadow.mapSize.height = 1024 * 4;
    scene.add(light);

    hemiLight = new THREE.HemisphereLight(0x929da3, 4);
    scene.add(hemiLight);

    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    let objLoader = new THREE.OBJLoader()
    objLoader.setPath('/model/')
    let objArray = ['Build.obj', 'Base.obj', 'Foam.obj', 'GlueBottom.obj', 'EpdmBottom.obj', 'GlueTop.obj', 'EpdmTop.obj', 'Marker.obj']
    objArray.map(item => {
        objLoader.load(`${item}`, (object) => {
            object.position.set(0, -5, -25);
            scene.add(object)
            animate();
        })
    })

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onMouseMove, false);
}

const onWindowResize = (event) => {
    event.preventDefault()
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

// Function to make particular object color change to grey on hover. Object is orange by default

// const animate = () => {
//     raycaster.setFromCamera(mouse, camera);
//     let intersects = raycaster.intersectObjects(scene.children, true);
//     if (intersects.length > 0) {
//         if (INTERSECTED != intersects[0].object) {
//             if (INTERSECTED) {
//                 if (INTERSECTED.name === 'Marker') {  // Define Object
//                     INTERSECTED.material.color.setHex(0xc96847)
//                 } else {
//                     INTERSECTED.material.color.setHex(0x929da3)
//                 }
//             }
//             INTERSECTED = intersects[0].object;
//             INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
//             INTERSECTED.material.color.setHex(0x929da3)
//         }
//     } else {
//         if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
//         INTERSECTED = null;
//     }
//     renderer.render(scene, camera);
//     light.position.set(
//         camera.position.x + 10,
//         camera.position.y + 10,
//         camera.position.z + 10,
//     );
//     requestAnimationFrame(animate);
// }


// Function to make each object color change to Orange on hover

const animate = () => {
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED) {
                INTERSECTED.material.color.setHex(0x929da3)
            }
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            INTERSECTED.material.color.setHex(0xc96847);
        }
    } else {
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        INTERSECTED = null;
    }
    renderer.render(scene, camera);
    light.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10,
    );
    requestAnimationFrame(animate);
}

init();