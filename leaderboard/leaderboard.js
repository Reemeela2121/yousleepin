/*
let config = {
    apiKey: "AIzaSyAeEf_JHE9hVmlhWrhpa4mn3xiAn4y9b4o",
    authDomain: "click-leaderboard.firebaseapp.com",
    databaseURL: "https://click-leaderboard.firebaseio.com",
    projectId: "click-leaderboard",
    storageBucket: "click-leaderboard.appspot.com",
    messagingSenderId: "278384590243"
};
*/
var firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appID: "app-id",
};

let stage = 1,
    score = 0,
    time = 10,
    started = false,
    num = 0;
firebase.initializeApp(firebaseConfig);
function getLeaderboard() {
  firebase.database().ref('/users').once('value').then(s => {
      document.getElementById('list').innerHTML = '';
      const leaders = JSON.parse(JSON.stringify(s));
      let sorted = [];
      for (let i in leaders) {
        console.log(leaders[i] + ' ' + i);
        sorted.push([leaders[i],i]);
      }
      sorted.sort((a,b)=>{
        return a[0] - b[0];
      });
      sorted.reverse();
      if (sorted.length > 10) {
        sorted = sorted.slice(0,10);
      }
      sorted.forEach(u=>{
        num++;
        const el = document.createElement('div');
        el.classList = 'user';
        el.innerHTML = `<span class="num">#${num}</span>${u[1]}<span class="score">${u[0]}</span>`;
        document.getElementById('list').appendChild(el);
      });
  });
};
document.getElementById('reload').addEventListener('click',()=>{
  window.location.href = window.location;
});
document.getElementById('start').addEventListener('click',()=>{
  if (stage === 1) {
    score++;
    document.getElementById('score').innerHTML = score;
  }
  if (!started) {
    time--;
    document.getElementById('time').innerHTML = time;
    const int = setInterval(()=>{
      time--;
      document.getElementById('time').innerHTML = time;
      if (time === 0) {
        window.clearInterval(int);
        stage = 2;
        document.getElementById('score2').innerHTML = score;
        setTimeout(()=>{
          document.getElementById('t1').style.opacity = 0;
          document.getElementById('t2').style.display = 'block';
          setTimeout(()=>{
            document.getElementById('t2').style.opacity = 1;
            document.getElementById('t1').style.display = 'none';
          },250);
        },1000);
      }
    },1000);
    started = true;
  }
});
document.getElementById('submit').addEventListener('click',()=>{
  const u = document.getElementById('username').value.split(/[^a-z1-9_-]/gi).join('');
  firebase.database().ref('users/' + u).set(score);
  getLeaderboard();
  document.getElementById('t2').style.opacity = 0;
  document.getElementById('t3').style.display = 'block';
  setTimeout(()=>{
    document.getElementById('t3').style.opacity = 1;
    document.getElementById('t2').style.display = 'none';
  },250);
});
document.getElementById('skip').addEventListener('click',()=>{
  getLeaderboard();
  document.getElementById('t2').style.opacity = 0;
  document.getElementById('t3').style.display = 'block';
  setTimeout(()=>{
    document.getElementById('t3').style.opacity = 1;
    document.getElementById('t2').style.display = 'none';
  },250);
});
