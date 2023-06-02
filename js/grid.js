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

R 0 15
B 5 10
G 8 15
Y 2 15
`

function waitForClick() {
  var buttonIds = ["red_robot", "yellow_robot", "green_robot", "blue_robot"];
  return new Promise(function(resolve) {
    var buttons = buttonIds.map(function(id) {
      return document.getElementById(id);
    });

    buttons.forEach(function(button) {
      button.addEventListener('click', function(event) {
        resolve(button.parentNode.id);
      });
    });
  });
}


// Init grid size and border size 
window.addEventListener('load', function() {
    var gridContainer = document.getElementById('grid');
    gridContainer.style.width = gridContainer.offsetHeight + 'px';
    var gridItems = gridContainer.getElementsByClassName('grid-item');
    var borderSize = gridContainer.offsetHeight * 0.01 ;
    console.log(borderSize)
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
    console.log(borderSize)
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


function Generate_map(){
  // Create an empty map
  var map = Array.from({ length: 16 }, () => Array.from({ length: 16 }, () => null));
  var gridContainer = document.getElementById('grid');
  console.log(map1.length)
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
          map[x][y] = l;
          var gridItem = document.createElement('div');
          gridItem.id = '(' + y.toString() + ',' + x.toString() + ')'
          gridItem.dataset.row = x;
          gridItem.dataset.column = y;
          gridItem.className = 'grid-item';
          gridItem.classList.add('grid-button');
          // Add walls
          if (l == 'B') gridItem.classList.add('bottom_border');
          if (l == 'T') gridItem.classList.add('top_border');
          if (l == 'L') gridItem.classList.add('left_border');
          if (l == 'R') gridItem.classList.add('right_border');
          if (l == 'W') {gridItem.classList.add('top_border');  gridItem.classList.add('left_border');}
          if (l == 'X') {gridItem.classList.add('top_border');  gridItem.classList.add('right_border');}
          if (l == 'Y') {gridItem.classList.add('bottom_border');  gridItem.classList.add('right_border');}
          if (l == 'Z') {gridItem.classList.add('bottom_border'); gridItem.classList.add('left_border');}
          // MAJ coord
          x += 1;
          if (x == 16){x = 0; y += 1;}
          gridContainer.appendChild(gridItem);
        }
      }
    }
  }
  gridContainer.addEventListener('click', function(event) {
    if (event.target.matches('.grid-button')) {
      var row = event.target.dataset.row;
      var column = event.target.dataset.column;

      // Actions à réaliser lorsque le bouton est cliqué
      console.log('Bouton cliqué - Ligne:', row, 'Colonne:', column);
      // Effectuez d'autres actions ici

      // Par exemple, vous pouvez appeler une fonction spécifique pour le bouton cliqué
    }
  });
}

  /*
  // Add robots
  if (i > 17 && lines[i].trim().length > 0){
    [color,x,y] = lines[i].split(' ')
    var gridItem = document.getElementById('(' + x+ ',' + y + ')');
    var logo = document.createElement('img');
    if (color == 'R') {logo.src = 'icons/red_robot.png'; logo.id = "red_robot";}
    if (color == 'Y') {logo.src = 'icons/yellow_robot.png'; logo.id = "yellow_robot";}
    if (color == 'G') {logo.src = 'icons/green_robot.png'; logo.id = "green_robot";}
    if (color == 'B') {logo.src = 'icons/blue_robot.png'; logo.id = "blue_robot";}
    logo.className = 'logo';
    gridItem.appendChild(logo);
  }
  }
  console.log(map)
  return map;
}
*/