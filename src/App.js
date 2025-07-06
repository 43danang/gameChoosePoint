
import { useState } from 'react';
import './App.css';
function App() {
  var is_play = false;
  var auto_play = false;
  const [point, setPoint] = useState(5);
  let current_point = 0;
  let pre_point = 0;
  let time_play = 0;
  let interval;
  let record = 0;
  const handle_point = (e) => {
    const value = e.target.value;
    const check_natural_number = /^[0-9]*$/;
    if (check_natural_number.test(value)) {
      setPoint(value);
    }
    else if (value === '') {
      alert("Please enter a natural number!");
    }
    else {
      alert("Please enter a natural number!");
    }
  }
  const handle_auto_play = () => {
    const ele_button_auto = document.getElementById('button-auto');
    const ele_button_play = document.getElementById('button-play');

    //can not press if game over or all cleared
    console.log("is play: ", true);
    if (is_play === true) {
      console.log("in auto");
      if (ele_button_auto.textContent == "Auto play ON") {
        //change name
        ele_button_auto.textContent = "Auto play OFF";
        auto_play = true;
        //get list element point
        const ele_points = document.getElementsByClassName('point-ele');
        const reversed_points = Array.from(ele_points).reverse();
        console.log("list point: ", ele_points);
        //1 click per 1s
        let interval_auto;
        let check = 0;
        interval_auto = setInterval(() => {
          check = check + 1;
          console.log(check);
          current_point = pre_point + 1;
          const ele_current_point = reversed_points.forEach(element => {
            if (auto_play == false) {
              clearInterval(interval_auto);
            } else {
              if (element.textContent == current_point) {
                element.style.backgroundColor = 'purple';
                element.style.opacity = 1;
                handle_remove(element);
                pre_point = current_point;

                // if clear all
                console.log("current_point: ", current_point);
                if (current_point == point) {
                  console.log('current point: ', current_point + 'point: ', point);
                  // all cleared
                  const ele_content_game = document.getElementById('content-game');
                  ele_content_game.textContent = 'ALL CLEARED';
                  ele_content_game.style.color = 'green';
                  is_play = false;
                  auto_play = false;
                  //stop time
                  handle_time_play();
                  // set record
                  console.log("set record");
                  set_record();
                  //
                  clearInterval(interval_auto);
                  
                } else {
                  return;
                }
              }
            }

          }
          );
          
        }, 1000);
        
      } else {
        ele_button_auto.textContent = "Auto play ON";
        auto_play = false;
      }
    } else {
      console.log("why");
      alert("Please press " + ele_button_play.textContent + " button!");

    }

  }
  const set_record = () => {

    const ele_record = document.getElementById('record');
    console.log("time play: ", time_play);
    if (record == 0) {
      record = time_play;
      ele_record.textContent = "RECORD: " + record.toFixed(1) + " s";
      ele_record.style.display = 'block';
    } else if (record > time_play) {
      record = time_play;
      ele_record.textContent = "RECORD: " + record.toFixed(1) + " s";

    }
  }
  const handle_play = () => {
    // change content button
    const ele_button_play = document.getElementById('button-play');
    const ele_content_game = document.getElementById('content-game');
    ele_button_play.textContent = "Restart";
    ele_content_game.textContent = "LET'S PLAY";
    ele_content_game.style.color = 'black';
    //
    is_play = true;
    auto_play = false;
    const ele_button_auto = document.getElementById('button-auto');
    ele_button_auto.textContent = "Auto play ON";
    //

    current_point = 0;
    pre_point = 0;
    console.log("play:" + is_play);
    const ele_play_area = document.getElementById('play-area');
    if (ele_play_area.getElementsByTagName('div').length > 0) {
      ele_play_area.innerHTML = '';
    }
    //time
    handle_time_play();
    //
    var i = point;
    while (i > 0) {
      //create point
      const ele_point = document.createElement('div');
      ele_point.className = 'point-ele';
      ele_point.textContent = i;

      ele_point.value = i;
      //position
      const rect = ele_play_area.getBoundingClientRect();
      const ele_play_area_width = rect.width;
      const ele_play_area_height = rect.height;
      let x = 0;
      let y = 0;
      do {
        x = Math.random() * ele_play_area_width * 0.9;
        y = Math.random() * ele_play_area_height * 0.9;
      } while ((x < 0 && y > ele_play_area_height) || (x > ele_play_area_width && y < 0));


      ele_point.style.left = `${x}px`;
      ele_point.style.top = `${y}px`;
      ele_point.style.zIndex = point - i;
      //click
      ele_point.addEventListener('click', (e) => {
        handle_click(e);
      })


      ele_play_area.appendChild(ele_point);
      i--;
    }
  }
  const handle_time_play = () => {

    const ele_time = document.getElementById('time-value');
    const ele_content_game = document.getElementById('content-game');
    const content_game = ele_content_game.textContent;
    console.log("status:", content_game);
    if (content_game != "LET'S PLAY") {
      console.log("status:" + ele_content_game.textContent);
      //  game over, all cleared
      if (interval != 0) {
        clearInterval(interval);
      }
    } else {
      // play, restart.
      time_play = 0;
      if (interval != 0) {
        clearInterval(interval);
      }
      interval = setInterval(() => {
        time_play += 0.1;
        ele_time.textContent = time_play.toFixed(1) + 's';
      }, 100);
    }

  }
  const handle_remove = (ele_point) => {
    console.log("in handle remove");
    const content_game = document.getElementById('content-game');
    let interval_remove;
    let opacity = ele_point.style.opacity;
    interval_remove = setInterval(() => {
      opacity = opacity - 0.1 / 3;
      ele_point.style.opacity = opacity;
      // console.log("opa :", opacity);
      if (content_game.textContent == "GAME OVER") {
        clearInterval(interval_remove);
      }
      else if (opacity <= 0) {
        clearInterval(interval_remove);
        ele_point.remove();
      }
    }, 100);


  }
  const handle_click = (e) => {
    if (auto_play == true) {
      console.log("auto playing: ", auto_play);
    } else {
      const ele_point = e.target;
      ele_point.style.backgroundColor = 'purple';
      ele_point.style.opacity = 1;
      console.log('ele_point_current: ' + ele_point.textContent);
      current_point = ele_point.value;
      //
      const pre_point_int = parseInt(pre_point);
      if (pre_point_int + 1 == current_point) {
        //remove
        handle_remove(ele_point);
        // if clear all
        pre_point = current_point;
        console.log('ele_point_pre: ' + pre_point);
        if (current_point == point) {
          console.log('current point: ', current_point + 'point: ', point);
          // all cleared
          const ele_content_game = document.getElementById('content-game');
          ele_content_game.textContent = 'ALL CLEARED';
          ele_content_game.style.color = 'green';
          is_play = false;
          //stop time
          handle_time_play();
          // set record
          set_record();
        }
      } else {
        //game over
        const ele_content_game = document.getElementById('content-game');
        ele_content_game.textContent = 'GAME OVER';
        ele_content_game.style.color = 'red';
        handle_time_play();
        is_play = false;
      }
    }

  }
  return (

    <div className="App flex">
      <div className='control w-1/3'>
        <div className='title'>
          <h3 id='content-game'>LET'S PLAY</h3>
          <h4 id='record' >RECORD: 123s</h4>
        </div>

        <div className='point-area'>
          <h5>Points :  </h5>
          {/* chặn chỉ cho nhập số */}
          <input className='input-point ' maxLength={4} autoComplete='on' value={point} type='text' placeholder='Enter a natural number' onChange={handle_point}></input>
        </div>
        <div className='time-area'>
          <h5>Time :  </h5>
          <p id='time-value' className='time-value'>{time_play.toFixed(1)}s</p>

        </div>
        <div className='button-area'>
          <div>
            <button id='button-play' className='button-play' onClick={handle_play}>Play</button>
            <button id='button-auto' className='button-auto' onClick={handle_auto_play}>Auto play ON</button>
          </div>
        </div>
      </div>
      <div id='play-area' className='play-area '>

      </div>

    </div>
  );
}
export default App;
