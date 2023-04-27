var renderer, scene, camera;
var group, group2, group3, group4;
var el1, el2, el3;

function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x090b33, 5, 50);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearAlpha(0.2);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enable = true;

  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(16, 10, 12);
  camera.lookAt(scene.position);

  group = new THREE.Object3D();
  group2 = new THREE.Object3D();
  group3 = new THREE.Object3D();
  group4 = new THREE.Object3D();
  scene.add(group);
  scene.add(group2);
  scene.add(group3);
  scene.add(group4);

  //深津球
  var geometry = new THREE.SphereGeometry(4, 32, 32);
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load("https://i.imgur.com/xrNibEP.png", function (texture) {
    var material = new THREE.MeshBasicMaterial({
      map: texture
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI / -8);
    mesh.rotateY(Math.PI / -7);
    mesh.rotateZ(Math.PI / 7);
    scene.add(mesh);
    group.add(mesh);
    return mesh;
    render();
  });

  //澤北球
  var geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
  var textureLoader2 = new THREE.TextureLoader();
  textureLoader2.load("https://i.imgur.com/meeWmyP.png", function (texture2) {
    var material2 = new THREE.MeshBasicMaterial({
      map: texture2
    });
    var mesh2 = new THREE.Mesh(geometry2, material2);
    var mesh3 = new THREE.Mesh(geometry2, material2);
    var mesh4 = new THREE.Mesh(geometry2, material2);
    mesh2.rotateX(Math.PI / -8);
    mesh2.rotateY(Math.PI / -7);
    mesh2.rotateZ(Math.PI / 7);
    mesh3.rotateX(Math.PI / -8);
    mesh3.rotateY(Math.PI / -7);
    mesh3.rotateZ(Math.PI / 7);
    mesh4.rotateX(Math.PI / -8);
    mesh4.rotateY(Math.PI / -7);
    mesh4.rotateZ(Math.PI / 7);
    scene.add(mesh2);
    group2.add(mesh2);
    group3.add(mesh3);
    group4.add(mesh4);
    return mesh2;
    render();
  });

  //三顆澤北
  el1 = {
    orbit_r: 10,
    orbit_speed: 0.02,
    angle: Math.random() * Math.PI * 2,
    obj: group2
  };
  el2 = {
    orbit_r: 10,
    orbit_speed: 0.02,
    angle: Math.random() * Math.PI * 2,
    obj: group3
  };
  el3 = {
    orbit_r: 10,
    orbit_speed: 0.02,
    angle: Math.random() * Math.PI * 2,
    obj: group4
  };

  //燈光
  var ambientLight = new THREE.AmbientLight("#333");
  scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  scene.add(directionalLight);

  var spotLight = new THREE.SpotLight({ color: "#fff" });
  spotLight.position.set(-20, 20, 10);
  spotLight.CastShadow = true;
  scene.add(spotLight);

  cameraControl = new THREE.OrbitControls(camera, renderer.domElement);
}
init();

function render() {
  renderer.render(scene, camera);
  cameraControl.update();

  //澤北飛飛
  el1.obj.position.x = el1.orbit_r * Math.cos(el1.angle);
  el1.obj.position.y = el1.orbit_r * Math.sin(el1.angle);
  el1.angle += el1.orbit_speed;

  el2.obj.position.x = el2.orbit_r * Math.cos(el2.angle);
  el2.obj.position.z = el2.orbit_r * Math.sin(el2.angle);
  el2.angle += el2.orbit_speed;

  el3.obj.position.y = el3.orbit_r * Math.cos(el3.angle);
  el3.obj.position.z = el3.orbit_r * Math.sin(el3.angle);
  el3.angle += el3.orbit_speed;

  //深津轉轉
  group.rotation.y += 0.006;

  requestAnimationFrame(render);
}
render();

window.addEventListener('resize',function(){
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth,window.innerHeight)
})