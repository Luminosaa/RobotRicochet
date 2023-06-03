/*
O = No wall
B = Bottom wall
T = Top wall
L = left wall
R = right wall
W = top left 
X = top right 
Y = bottom right 
Z = bottom left  

R x y = Red robot at x,y
B x y = blue robot at x,y
G x y  = green robot at x,y
Y x y = yellow robot at x,y

*/
var map1 = `
W T T T T T T T T T T T T T T X
L O O O O O O O O O O O O O O R
L O O O O O O O O O O O O O O R
L O O O O O O O O O O O O O O R
L O O O O O O O O O O O O O O R
L O O O O O O O O O O O O O O R
L O O O O O O O O O O O O O O R
L O O O O O O W X O O O O O O R
L O O O O O O Z Y O O O O O O R
L O O O O O O O O O O O O O O R
L O O O O O O O O O O O O O O R
L O O O O O O O O O O O O O O R
L O O O O O O O O O O O O O O R
L O O O O O O O O O O O O O O R
L O O O O O O O O O O O O O O R
Z B B B B B B B B B B B B B B Y

R 0 0
B 5 10
G 8 15
Y 0 10
`



// Init grid size and border size 
window.addEventListener('load', function() {
    var gridContainer = document.getElementById('grid');
    gridContainer.style.width = gridContainer.offsetHeight + 'px';
    var gridItems = gridContainer.getElementsByClassName('grid-item');
    var borderSize = gridContainer.offsetHeight * 0.01 ;
    for (var i = 0; i < gridItems.length; i++) {
        var gridItem = gridItems[i];
        if (gridItem.classList.contains('left_border')) {
          gridItem.style.borderLeftWidth = borderSize + 'px';
        }
        
        if (gridItem.classList.contains('right_border')) {
          gridItem.style.borderRightWidth = borderSize + 'px';
        }
        
        if (gridItem.classList.contains('top_border')) {
          gridItem.style.borderTopWidth = borderSize + 'px';
        }
        
        if (gridItem.classList.contains('bottom_border')) {
          gridItem.style.borderBottomWidth = borderSize + 'px';
        }
      }
    });
  
// Reload grid size and border size when window is resized
window.addEventListener('resize', function() {
    var gridContainer = document.getElementById('grid');
    gridContainer.style.width = gridContainer.offsetHeight + 'px';
    var gridItems = gridContainer.getElementsByClassName('grid-item');
    var borderSize = gridContainer.offsetHeight * 0.01 ;
    for (var i = 0; i < gridItems.length; i++) {
        var gridItem = gridItems[i];
        if (gridItem.classList.contains('left_border')) {
          gridItem.style.borderLeftWidth = borderSize + 'px';
        }
        
        if (gridItem.classList.contains('right_border')) {
          gridItem.style.borderRightWidth = borderSize + 'px';
        }
        
        if (gridItem.classList.contains('top_border')) {
          gridItem.style.borderTopWidth = borderSize + 'px';
        }
        
        if (gridItem.classList.contains('bottom_border')) {
          gridItem.style.borderBottomWidth = borderSize + 'px';
        }
      }
    });

// Generate a map from a multiline string
function Generate_map(){
  // Create an empty map
  var Map = Array.from({ length: 16 }, () => Array.from({ length: 16 }, () => null));
  var gridContainer = document.getElementById('grid');
  var RobotPos = {};
  var x = 0; var y = 0;
  var lines = map1.split("\n");
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    // First part : map 
    if (i > 0 && i <= 17){
      for (var j = 0; j < line.length;j++){
        // Add case
        var l = line[j];
        if (['O','B','T','L','R','W','X','Y','Z'].includes(l)){
          Map[y][x] = [];
          var gridItem = document.createElement('div');
          gridItem.id = '(' + y.toString() + ',' + x.toString() + ')'
          gridItem.dataset.row = y;
          gridItem.dataset.column = x;
          gridItem.className = 'grid-item';
          gridItem.classList.add('grid-button');
          // Add walls
          if (l == 'B') {gridItem.classList.add('bottom_border'); Map[y][x].push('B');}
          if (l == 'T') {gridItem.classList.add('top_border'); Map[y][x].push('T');}
          if (l == 'L') {gridItem.classList.add('left_border'); Map[y][x].push('L');}
          if (l == 'R') {gridItem.classList.add('right_border'); Map[y][x].push('R');}
          if (l == 'W') {gridItem.classList.add('top_border');  gridItem.classList.add('left_border'); Map[y][x].push('T'); Map[y][x].push('L');}
          if (l == 'X') {gridItem.classList.add('top_border');  gridItem.classList.add('right_border');  Map[y][x].push('T'); Map[y][x].push('R');}
          if (l == 'Y') {gridItem.classList.add('bottom_border');  gridItem.classList.add('right_border');  Map[y][x].push('B'); Map[y][x].push('R');}
          if (l == 'Z') {gridItem.classList.add('bottom_border'); gridItem.classList.add('left_border');  Map[y][x].push('B'); Map[y][x].push('L');}
          // MAJ coord
          x += 1;
          if (x == 16){x = 0; y += 1;}
          gridContainer.appendChild(gridItem);
        }
      }
    }
    // Add robots
    if (i > 17 && lines[i].trim().length > 0){
      [color,x,y] = lines[i].split(' ')
      RobotPos[color] = [parseInt(x),parseInt(y)];
    }
  }
  for (var key in RobotPos) {
    console.log(key,RobotPos[key][0],RobotPos[key][1])
    Add_robot(key,RobotPos[key][0],RobotPos[key][1]);
  }
  console.log(Map);
  Game(Map, RobotPos);
}

// Add  the color robot at the x,y position 
function Add_robot(color, x, y){
  var gridItem = document.getElementById('(' + x + ',' + y + ')');
  var logo = document.createElement('img');
  if (color == 'R') {logo.src = 'icons/red_robot.png'; logo.id = "Red_robot";}
  if (color == 'Y') {logo.src = 'icons/yellow_robot.png'; logo.id = "Yellow_robot";}
  if (color == 'G') {logo.src = 'icons/green_robot.png'; logo.id = "Green_robot";}
  if (color == 'B') {logo.src = 'icons/blue_robot.png'; logo.id = "Blue_robot";}
  logo.className = 'logo';
  gridItem.appendChild(logo);
}

// Delete the color robot from the map
function Del_robot(color){
  if (color == 'R') id = "Red_robot";
  if (color == 'Y') id = "Yellow_robot";
  if (color == 'G') id = "Green_robot";
  if (color == 'B') id = "Blue_robot";
  var element = document.getElementById(id);
  element.remove();
}

// highlight some box depending of x_click and y_click 
function Add_highlight(Map,RobotPos,color){
  var [x,y] = RobotPos[color]
  var r_pos_format = []
  for (var key in RobotPos) {
    r_pos_format.push('(' + RobotPos[key][0] + ',' + RobotPos[key][1] + ')');
  }
  var higlight = []
  var y_left = y;
  var y_right = y;
  var x_top = x;
  var x_bottom = x;
  // Left
  while (!Map[x][y_left].includes("L") && 
        !Map[x][y_left-1].includes("R") && 
        !r_pos_format.includes('(' + x + ',' + (y_left-1) + ')')) y_left -= 1;
  if (y != y_left) {
    document.getElementById('(' + x + ',' + y_left + ')').classList.add("highlight"); 
    higlight.push('(' + x + ',' + y_left + ')');
  }
  // Right
  while (!Map[x][y_right].includes("R") && 
        !Map[x][y_right+1].includes("L") && 
        !r_pos_format.includes('(' + x + ',' + (y_right+1) + ')')) y_right += 1;
  if (y != y_right) {
    document.getElementById('(' + x + ',' + y_right + ')').classList.add("highlight"); 
    higlight.push('(' + x + ',' + y_right + ')');
  }
  // Top
  while (!Map[x_top][y].includes("T") && 
        !Map[x_top-1][y].includes("B") && 
        !r_pos_format.includes('(' + (x_top-1) + ',' + y + ')')) x_top -= 1;
  if (x != x_top) {
    document.getElementById('(' + x_top + ',' + y + ')').classList.add("highlight"); 
    higlight.push('(' + x_top + ',' + y + ')');
  }
  //Bottom
  while (!Map[x_bottom][y].includes("B") && 
        !Map[x_bottom+1][y].includes("T") && 
        !r_pos_format.includes('(' + (x_bottom+1) + ',' + y + ')')) x_bottom += 1;
  if (x != x_bottom) {
    document.getElementById('(' + x_bottom + ',' + y + ')').classList.add("highlight"); 
    higlight.push('(' + x_bottom + ',' + y + ')');
  }
  return higlight;
}

// delete all hightlight
function Del_highlight(){
  console.log("DEL HIGHLIGHT")
  var highlightedElements = document.querySelectorAll('.highlight');
  highlightedElements.forEach(function(element) {
    // Faites quelque chose avec chaque élément
    element.classList.remove('highlight');

  });
}


function Game(Map, RobotPos){
  var gridContainer = document.getElementById('grid');
  var higlight = [];
  var robot_clicked = null;
  // Click on an empty square 
  gridContainer.addEventListener('click', function(event) {
    if (event.target.matches('.grid-button')) {
      var row = event.target.dataset.row;
      var column = event.target.dataset.column;
      console.log('Bouton cliqué - Ligne:', row, 'Colonne:', column, "avec les attributs", Map[row][column]);
      Del_highlight();
      if (higlight.includes('(' + row + ',' + column + ')')){
        Del_robot(robot_clicked);
        Add_robot(robot_clicked,row,column);
        RobotPos[robot_clicked] = [parseInt(row),parseInt(column)];
        higlight = Add_highlight(Map,RobotPos,robot_clicked);
      }

    // Click on a robot
    } else if (event.target.matches('.logo')) {
      Del_highlight();
      higlight = [];
      var robotElement = event.target;
      robot_clicked = robotElement.id[0];
      console.log('Clic sur le robot - Couleur:', robot_clicked);
      higlight = Add_highlight(Map,RobotPos,robot_clicked);
      console.log(robot_clicked, higlight)
    }
  });
}