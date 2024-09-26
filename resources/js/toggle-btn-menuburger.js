
const btnToggle = document.querySelector('.toggle-btn-menuburger'); 
btnToggle.addEventListener('click', function () {
  document.getElementById('idContAside').classList.toggle('active');
  //console.log(document.getElementById('sidebar'))
});