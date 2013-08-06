  // creates an image partway between two other images, as in the animations
  // by Raphael.js
  function intermediate(from, to, pos) {
    var fromCurve = Raphael.path2curve(from);
    var toCurve = Raphael.path2curve(to);
    var diff = [];
    var attr = "path";
    //compute difference between paths and store in diff
    for (i = 0, ii = fromCurve.length; i < ii; i++) {
      diff[i] = [0];
      for (var j = 1, jj = fromCurve[i].length; j < jj; j++) {
        diff[i][j] = (toCurve[i][j] - fromCurve[i][j]);
      }
    }
    var S = " ";
    now = [];
    //compute new path string for intermediate image
    for (var i = 0, ii = fromCurve.length; i < ii; i++) {
      now[i] = [fromCurve[i][0]];
      for (var j = 1, jj = fromCurve[i].length; j < jj; j++) {
        now[i][j] = +fromCurve[i][j] + pos * diff[i][j];
      }
      now[i] = now[i].join(S);
    }
    return now.join(S);
  }

function shuffle(v) { newarray = v.slice(0);for(var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);return newarray;} // non-destructive.

function uniformAroundMean(mean, radius) {
  var radius = radius || 0.2;
  if (mean + radius < 1) {
    var upper = mean + radius;
  } else {
    var upper = 1;
  }
  if (mean - radius > .1) {
    var lower = mean - radius;
  } else {
    var lower = .1;
  }
  var interval = upper - lower;
  return Math.random() * interval + lower;
}

function ColorRandomizer(nSteps) {
  var nSteps = nSteps || 10;
  function hues(n) {
    var h = [];
    var offset = Math.random() * .99 / n;
    for (var i=0;i<n-1;i++) {
      h.push((i/n)+offset);
    }
    return shuffle(h);
  }
  var myHues = hues(nSteps);
  this.get = get;
  function get(something, saturation, value) {
    if (myHues.length < 1) {
      myHues = hues(nSteps);
    }
    var h = myHues.shift();
    var s = uniformAroundMean(.99, .1);
    var v = uniformAroundMean(.99, .1);
    return Raphael.hsb2rgb(h, s, v).hex;
  }
}

var colorScheme = new ColorRandomizer;
  
function uniform(a, b) {
  return ( (Math.random()*(b-a))+a );
}

function bernoulli(p) {
  var p = p || 0.5;
  if (Math.random() > p) {return true;} else {return false;}
}

function attrify(p) {
  return {path: p.attr().path.toString(),
          fill:p.attr().fill,
          "stroke-width":p.attr()["stroke-width"]}
}

function sign(x) {
  if (x < 0) { return -1; } else {return 1}
}

function dist(now, old) {
  return Math.sqrt( Math.pow(now.x - old.x, 2) + Math.pow(now.y - old.y, 2) );
}

function curveTo(polar_old, polar_now, curviness, variance) {
  //takes in polar coordinates!!!!
  var mincurve = (Math.min(polar_now.r, polar_old.r)-50);
  var maxcurve = (max_radius*2);
  var center = (curviness*(maxcurve - mincurve))+mincurve;
  var minthiscurve = Math.max(mincurve, center - variance);
  var maxthiscurve = Math.min(maxcurve, center + variance);
  var now = rect(polar_now);
  var old = rect(polar_old);
  var d = dist(now, old);
  if (d < 10) {
    return " L " + now.x + "," + now.y;
  } else {
    var q = { theta: (polar_now.theta + polar_old.theta)/2,
              r: uniform(minthiscurve, maxthiscurve) };
    retString = " Q " + rect(q).x + "," + rect(q).y + " " + now.x + "," + now.y;
    return retString;
  }
}

var size = {x: 300, y: 300};
var center = {x: size.x/2, y: size.y/2};
var max_radius = Math.min(center.x, center.y);

function rect(p) {
  //convert to rectangular coordinates
  var x = center.x + p.r*Math.cos(p.theta);
  var y = center.y + p.r*Math.sin(p.theta);
  return {x: x, y: y, curve:p.curve};
}

/*\
polygon
[ method ]
- n (integer) number of vertices for the polygon
\*/
function polygon(n) {
  var curviness = Math.random();
  var bound = Math.random();
  var maxmult = 1;
  var minmult = (bound*2)+1;
  var vertices = [];
  var variance = uniform(20, 200);
  var curve_p = Math.random();
  for (var i=0; i<n; i++) {
    //polar coordinates of vertices such that if you divide a circle into n
    //evenly spaced sectors, each sector will have exactly one vertex whose
    //angle from the origin falls in that sector, and the radius is a positive
    //number between 50 and 300.
    var theta_lb = i*2*Math.PI/n; //lower bound
    var theta_ub = (i+1)*2*Math.PI/n; //upper bound
    var theta = uniform( theta_lb, theta_ub ); //in radians
    var curve = bernoulli(curve_p);
    if (curve) {
      var radius = uniform( max_radius*minmult*0.1, max_radius*maxmult*0.5 );
    } else {
      var radius = uniform( max_radius*minmult*0.1, max_radius*maxmult );
    }
    vertices.push({theta:theta, r:radius, curve:curve})
  }
  var first = rect(vertices[0]);
  var path = "M " + first.x + "," + first.y;
  for (var i=1; i<n; i++) {
    var now = rect(vertices[i]);
    var curve = now.curve;
    if (curve) {
      path += curveTo(vertices[i-1], vertices[i], curviness, variance); //takes polar coords!!!
    } else {
      path += " L " + now.x + "," + now.y;
    }
  }
  /*if (curve) {
    var addition = curveTo(vertices[n-1], vertices[0]);
    var segs = addition.split(' ');
    var curve_point = segs[2];
    path += " Q "+addition;
  } else {*/
    path += " L " + first.x + "," + first.y;
  //}
  console.log(path);
  return path;
}




//*****************************************************************************


function posify(pathString, xpos, ypos) {
  var segments = pathString.split(" ");
  var ret_string = segments[0]; //M
  var type = "x";
  for (var i=1; i<(segments.length-1); i++) {
    var seg = segments[i];
    if (type == "x") {
      if (seg == "Q" || seg == "L" || seg == "C" || seg == "Z" || seg == "z") {
        ret_string += (" " + seg);
        type = "x"
      } else {
        var x = (((parseFloat(seg)-150)*0.2)+xpos).toString();
        ret_string += (" " + x);
        type = "y";
      }
    } else if (type == "y") {
      var y = (((parseFloat(seg)-150)*0.2)+ypos).toString();
        ret_string += (" " + y);
      type = "x";
    }
  }
  return ret_string;
}

function translate(pathString, xpos, ypos) {



  var segments = pathString.split(" ");
  var ret_string = segments[0]; //M
  var old_xpos = segments[1];
  var old_ypos = segments[2];
  var xdiff = xpos - old_xpos;
  var ydiff = ypos - old_ypos;
  
  var type = "x";
  for (var i=1; i<(segments.length-1); i++) {
    var seg = segments[i];
    if (type == "x") {
      if (seg == "Q" || seg == "L" || seg == "C" || seg == "Z" || seg == "z") {
        ret_string += (" " + seg);
        type = "x"
      } else {
        var x = (parseFloat(seg)+xdiff).toString();
        ret_string += (" " + x);
        type = "y";
      }
    } else if (type == "y") {
      var y = (parseFloat(seg)+ydiff).toString();
        ret_string += (" " + y);
      type = "x";
    }
  }
  return ret_string;


  for (var i=1; i<(segments.length-1); i++) {
    var seg = segments[i];
    if (seg == "Q" || seg == "L" || set == "C") {
      ret_string += (" " + seg)
    } else {
      var point = seg.split(',');
      var x = (parseFloat(point[0])+xdiff).toString();
      var y = (parseFloat(point[1])+ydiff).toString();
      ret_string += (" " + x + "," + y);
    }
  }
  ret_string += (" " + segments[segments.length]); //z
  return ret_string;
}

var flat = [0.05000000, 0.08461538, 0.11923077, 0.15384615, 0.18846154, 0.22307692, 0.25769231, 0.29230769, 0.32692308, 0.36153846, 0.39615385, 0.43076923, 0.46538462, 0.50000000, 0.53461538, 0.56923077, 0.60384615, 0.63846154, 0.67307692, 0.70769231, 0.74230769, 0.77692308, 0.81153846, 0.84615385, 0.88076923, 0.91538462, 0.95000000];
var peakeddown = [0.9500000, 0.9415987, 0.9298522, 0.9083216, 0.8971161, 0.8920915, 0.8885095, 0.8760121, 0.8748423, 0.8727388, 0.8593474, 0.8568689, 0.8471427, 0.8451891, 0.7684467, 0.7586962, 0.7401157, 0.6881176, 0.6652079, 0.5829051, 0.5635479, 0.5349264, 0.5146823, 0.4197762, 0.4171852, 0.2500000, 0.0500000];
var peakedup = [0.05, .25, 0.4171852, 0.4197762, 0.5146823, 0.5349264, 0.5635479, 0.5829051, 0.6652079, 0.6881176, 0.7401157, 0.7586962, 0.7684467, 0.8451891, 0.8471427, 0.8568689, 0.8593474, 0.8727388, 0.8748423, 0.8760121, 0.8885095, 0.8920915, 0.8971161, 0.9083216, 0.9298522, 0.9415987, 0.95];
var gauss = [0.05, 0.1374550, 0.2234236, 0.3383046, 0.3779954, 0.3791343, 0.3854804, 0.3864686, 0.4065208, 0.4162701, 0.4325724, 0.4437165, 0.4577715, 0.5693212, 0.5722497, 0.5966552, 0.5970232, 0.5984126, 0.6136513, 0.6264537, 0.6291443, 0.6384153, 0.6651024, 0.6928044, 0.6970096, 0.7880169, 0.95];
// this was randomly generated by R (except the endpoints), with mean=.5 and sd=.2

// Display stuff.
var canvasWidth = 960;
var canvasHeight = 400;
var numColumns = 9;  // make sure each set of trial parameters has an distribution array that has length numColumns * numRows.
var numRows = 3;
var leftMargin = 85;
var rightMargin = 125;
var topMargin = 75;

var edgetype = "t"; // "t" for curves, "l" for sharp edges & straight lines.

// Global stuff.
var numberOfQuestionsPerTrial = 6;
var shapes = [[polygon(7), polygon(7)],
              [polygon(7), polygon(7)],
              [polygon(7), polygon(7)],
              [polygon(7), polygon(7)],
              [polygon(7), polygon(7)],
              [polygon(7), polygon(7)],
              [polygon(7), polygon(7)]];
var adjectives = ["furby", "dibty", "halmy", "wiggy", "grondy", "alby", "hartny"];
var nouns = ["wug", "sarma", "bejeeba", "twan", "pimwit", "barnda", "slubja"];
var colors = ["#FF0000","#00FF00","#0000FF","#FFFF00","#00FFFF","#FF00FF","#FFCC99"];
var distributions = [[gauss,"left"], [gauss,"right"], [peakedup,"left"], [peakedup,"right"],  [peakeddown,"left"], [peakeddown,"right"],  [flat,"left"], [flat,"right"]];
var myTrialAdjectives = shuffle(adjectives);
var myTrialNouns = shuffle(nouns);
var myTrialShapes = shuffle(shapes);
var myTrialColors = shuffle(colors);
var mytrialdistributions = shuffle(distributions);

var autoRespond = false;

var tst;

$(document).ready(function() {
    $(".canvas").attr({width: canvasWidth, height: canvasHeight});
    showSlide("instructions");
    $("#instructions #mustaccept").hide();
});

experiment = {
    data: {},
    intro: function () {
	if (turk.previewMode) {
	    $("#instructions #mustaccept").show();
	} else {
	    showSlide("intro");
	}
    },
    begin: function () {
	showSlide("stage");
	experiment.next(0);
    },
    next: function (trialnum) {
	if (trialnum == shapes.length) {
	    showSlide("language");
	    $("#lgerror").hide();
	    $("#lgsubmit").click(function(){
		lang = $("#lgform").serialize();
		if (lang.length > 5) {
		    lang = lang.slice(3,lang.length);
		    experiment.data["language"] = lang;
		    showSlide("finished");
		    setTimeout(function() { turk.submit(experiment.data) }, 1000);
		}
	    });
	} else { 
	    $(".feedback").hide();
	    $("#stage .moveon").hide();
	    $("#stage .response").hide();
	    $("#stage #bottomtext").hide();
	    $("#nexttrial").hide(); 
	    $(".canvas").hide();
	    papername = "canvas" + trialnum;
	    $("#stage #" + papername).show();
	    var paper = Raphael(papername, canvasWidth, canvasHeight);
	    var onScreenShapes = [];
	    var rightShapeIndex = [0,1].random();
	    var leftShapeIndex;
	    if (rightShapeIndex == 0) {
		leftShapeIndex = 1;
	    } else {
		leftShapeIndex = 0;
	    }
	    var trialorientation = mytrialdistributions[trialnum][1];
	    var distWithOrientation;
	    if (trialorientation == "left") {
		distWithOrientation = mytrialdistributions[trialnum][0].reverse();
	    } else {
		distWithOrientation = mytrialdistributions[trialnum][0];
	    }
	    var trialparameters = {
		trialnumber: trialnum,
		adjective: myTrialAdjectives[trialnum],
		noun: myTrialNouns[trialnum],
		leftShape: myTrialShapes[trialnum][leftShapeIndex],
		rightShape: myTrialShapes[trialnum][rightShapeIndex],
		color: myTrialColors[trialnum],
		distribution: distWithOrientation,
		orientation: trialorientation
	    };
 	    var newtext;
	    if (trialnum == 0) { 
		newtext = "<p>One kind of alien artifact are called <b>" + trialparameters.noun + "s</b>.</p>"
	    } else {
		newtext = "<p>Another kind of alien artifact are called <b>" + trialparameters.noun + "s</b>.</p>";
	    }
	    newtext +=  "<p>Some of the " + trialparameters.noun + "s are more <b>" + trialparameters.adjective + "</b> than others.</p> <p>Please take a moment to study these " + trialparameters.noun + "s. When you're ready, click the 'Continue' button below.</p>"
	    $("#bottomtext").show();
	    $("#bottomtext").html(newtext);
	    var xpositions = [];
	    var ypositions = [];
	    for (hor = 0; hor < numColumns; hor++) {
	    	xpositions.push(leftMargin + (hor/numColumns) * (canvasWidth - rightMargin));
	    }
	    for (ver = 0; ver < numRows; ver++) {
	        ypositions.push(topMargin + canvasHeight*3/5 * (ver/numRows));
	    }
	    var indicesbut0and26 = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
	    var fst = shuffle([0,26]);
	    var indices = indicesbut0and26.slice(0, numColumns); 
	    indices.push(fst.shift()); // index 9 = the shape at the left of the middle row will be either index 0 or index 26 of the distribution.
	    indices = indices.concat(indicesbut0and26.slice(numColumns, numColumns*2-2));
	    indices.push(fst.shift()); // ibid for index 17 = the shape at the right of the middle row.
	    indices = indices.concat(indicesbut0and26.slice(numColumns*2-2, indicesbut0and26.length));
	    var q1ex0posInOSS, q1ex1posInOSS;
	    paper.setStart();
	    var q1ex0idx = [1,2,3].random();
	    var q1ex1idx = [numColumns * numRows - 2, numColumns * numRows - 3, numColumns * numRows - 4].random();
	    var posInOSS = 0;
	    for (ver = 0; ver < numRows; ver++) { 
		var ypos = ypositions[ver];
		for (hor = 0; hor < numColumns; hor++) {
		    var xpos = xpositions[hor];
		    var idx = indices.shift();
		    var morphProp = trialparameters.distribution[idx];
		    if (posInOSS == 9) {
			ex0pos = [xpos, ypos];
		    }
		    if (posInOSS == 17) {
			ex1pos = [xpos, ypos];
		    }
		    if (idx == q1ex0idx) {
			q1ex0posInOSS = posInOSS;
		    }
		    if (idx == q1ex1idx) {
			q1ex1posInOSS = posInOSS;
		    }
		    var inter = intermediate(trialparameters.leftShape, trialparameters.rightShape, morphProp);
		    console.log(inter);
		    var tmpPath = posify(inter, xpos, ypos); //toPathString(morphBetween(trialparameters.leftShape, trialparameters.rightShape, morphProp), xpos, ypos);
		    console.log(tmpPath);
		    var tmpObj = paper.path(tmpPath);
		    onScreenShapes.push([tmpObj,tmpPath,morphProp,posInOSS]);
		    posInOSS++;
		}
	    }
	    var st = paper.setFinish();
	    st.attr({stroke: '#000', fill: trialparameters.color});
	    $("#introbutton").show();
	    $("#introbutton").click(function() {
// animation giving subjects information about the array of shapes
		$("#introbutton").unbind("click");
		$("#introbutton").hide();
		var examples = [onScreenShapes[9], onScreenShapes[17]];
		tst = examples;
		setTimeout(function() {
		    var example0Path = examples[0][1];
		    var example1Path = examples[1][1];
		    var match0 = example0Path.split(' ');
		    var match1 = example1Path.split(' ');
		    var more, less, mtpos, ltpos;
//		    if (parseFloat(match0[1]) < parseFloat(match1[1])) {
			newPath0 = translate(example0Path, (canvasWidth/2 - 100), canvasHeight*4/5);
			newPath1 = translate(example1Path, (canvasWidth/2 + 100), canvasHeight*4/5);
			if (examples[0][2] > examples[1][2]) { 
			    more = "left";
			    less = "right";
			    mtpos = [ex0pos[0] - 50, ex0pos[1] + 15];
			    ltpos = [ex1pos[0] + 75, ex1pos[1] + 15];
			} else {
			    more = "right";
			    less = "left";
			    mtpos = [ex1pos[0] + 75, ex1pos[1] + 15];
			    ltpos = [ex0pos[0] - 50, ex0pos[1] + 15];
			}
//		    }
/*		    } else {
			newPath0 = match0[0] + " " + (canvasWidth/2 + 100) + " " + canvasHeight*4/5;
			newPath1 = match1[0] + " " + (canvasWidth/2 - 100) + " " + canvasHeight*4/5;
			if (examples[0][2] > examples[1][2]) {
			    more = "right";
			    less = "left";
			    mtpos = [ex1pos[0] + 75, ex1pos[1] + 15];
			    ltpos = [ex0pos[0] - 50, ex0pos[1] + 15];
			} else {
			    more = "left";
			    less = "right";
			    mtpos = [ex1pos[0] - 50, ex1pos[1] + 15];
			    ltpos = [ex0pos[0] + 75, ex0pos[1] + 15];
			}
		    }
*/

// mtpos[0], mtpos[1]

		    examples[0][0].animate({path: newPath0}, 1000, ">");
		    examples[1][0].animate({path: newPath1}, 1000, ">");
		    var exxtext = "<p>The " + trialparameters.noun + " on the " + more + " is the most " + trialparameters.adjective + " " + trialparameters.noun + " that we know of, and the one on the " + less + " is the least " + trialparameters.adjective + " one.</p><p>Please take a look at these two objects, and then click 'Continue' when you're ready to go on.</p>";
		    var mostTag, leastTag;
		    setTimeout(function () {
			if (examples[0][2] > examples[1][2]) { 
			    mostTag = paper.text(canvasWidth/2 - 170, canvasHeight*4/5 + 10, "Most\n" + trialparameters.adjective);
			    leastTag = paper.text(canvasWidth/2 + 220, canvasHeight*4/5 + 10, "Least\n" + trialparameters.adjective);
			} else {
			    mostTag = paper.text(canvasWidth/2 + 220, canvasHeight*4/5 + 10, "Most\n" + trialparameters.adjective);
			    leastTag = paper.text(canvasWidth/2 - 170, canvasHeight*4/5 + 10, "Least\n" + trialparameters.adjective);
			}
			mostTag.attr({"font-size":16, "font-family":"Palatino Linotype"});
			leastTag.attr({"font-size":16, "font-family":"Palatino Linotype"});
			$("#introbutton").show();
		    }, 1000);
		    $("#bottomtext").html(exxtext);
		    $("#introbutton").click(function() {
			$("#introbutton").unbind("click");
			$("#introbutton").hide();
			examples[0][0].animate({path: example0Path}, 1000, ">");
			examples[1][0].animate({path: example1Path}, 1000, ">");
			mostTag.animate({x:mtpos[0], y:mtpos[1]}, 1000, ">");
			leastTag.animate({x:ltpos[0], y:ltpos[1]}, 1000, ">");
// first test question begins here.
			$("#introbutton").hide();
			var q1examples = [onScreenShapes[q1ex0posInOSS], onScreenShapes[q1ex1posInOSS]]; 
			var q1more, q1less, q1correctanswer, q1otherdirxn;
			var q1comparisondirxn = ["left", "right"].random();
			if (q1comparisondirxn == "left") {
			    q1otherdirxn = "right";
			} else {
			    q1otherdirxn = "left";
			}
			var q1Path0 = q1examples[0][1];
			var q1match0 = q1Path0.split(' ');
			var q1Path1 = q1examples[1][1];
			var q1match1 = q1Path1.split(' ');
			if (parseFloat(q1match0[1]) < parseFloat(q1match1[1])) {
			    var q1newPath0 = translate(q1Path0, (canvasWidth/2 - 100), canvasHeight*4/5);
			    var q1newPath1 = translate(q1Path1, (canvasWidth/2 + 100), canvasHeight*4/5);
			    if (q1examples[0][2] > q1examples[1][2]) {
				q1more = "left";
				q1less = "right";
			    } else {
				q1more = "right";
				q1less = "left";
			    }
			} else {
			    var q1newPath0 = translate(q1Path0, (canvasWidth/2 + 100), canvasHeight*4/5);
			    var q1newPath1 = translate(q1Path1, (canvasWidth/2 - 100), canvasHeight*4/5);
			    if (q1examples[0][2] > q1examples[1][2]) {
				q1more = "right";
				q1less = "left";
			    } else {
				q1more = "left";
				q1less = "right";
			    }
			}
			if (q1comparisondirxn == q1more) {
			    q1correctanswer = "yes";
			} else {
			    q1correctanswer = "no";
			}
			setTimeout(function() {
			    q1examples[0][0].animate({path: q1newPath0}, 1000, ">");
			    q1examples[1][0].animate({path: q1newPath1}, 1000, ">");
			    $("#bottomtext").html("");
			}, 1000);
			setTimeout(function() {
			    var q1text = "<p>Do you think that the " + trialparameters.noun + " on the " + q1comparisondirxn + " is more " + trialparameters.adjective + " than the one on the " + q1otherdirxn + "?</p>";
			    $("#bottomtext").html(q1text);
			    $(".response").show();
			    $("#error").hide();
			    $(".moveon").hide();
			    $("#continue").show();
			    $(".agreement").prop('checked', false);
			    $(".rating").prop('checked', false);
			    startTime = (new Date()).getTime();
			}, 1000);
			$("#continue").click(function() {
			    $("#wronganswer").html("");
			    $("#correctanswer").html("");
			    var q1responseRaw = $("#form").serialize();
			    if (autoRespond) {
				q1responseRaw = "agreement=yes&confidence=6";
			    }
			    if (q1responseRaw.length < 21) {
				$("#confidence #error").show();
			    } else {
				$("#continue").unbind("click");
				$("#continue").hide();
				endTime = (new Date()).getTime(); 
				trialparameters.q1rt = endTime - startTime;
				var q1parsed = q1responseRaw.split("&");
				var q1agreement = q1parsed[0].split("=");
				trialparameters.q1response = q1agreement[1];
				var q1rating = q1parsed[1].split("=");
				trialparameters.q1confidence = q1rating[1];
				if (trialparameters.q1response == q1correctanswer) { 
				    trialparameters.q1correctness = "correct"; // record q1 correctness of q1 answer.
				    $(".response").hide();
				    $("#correctanswer").show();
				    $("#correctanswer").html("That's right - the " + trialparameters.noun + " on the " + q1more + " is more " + trialparameters.adjective + ".");
				} else {
				    trialparameters.q1correctness = "incorrect";
				    $(".response").hide();
				    $("#wronganswer").show();
				    $("#wronganswer").html("Sorry, that's not right - actually, the " + trialparameters.noun + " on the " + q1more + " is more " + trialparameters.adjective + ".");
				}
				$("#bottomtext").html("");
				setTimeout(function() {
				    q1examples[0][0].animate({path: q1Path0}, 1000, ">");
				    q1examples[1][0].animate({path: q1Path1}, 1000, ">");
				    $("#bottomtext").html("Click the 'Continue' button when you're ready to go on.");
				    $("#introbutton").show();
				}, 2000);
				$("#introbutton").click(function() {
				    $("#introbutton").unbind("click");
				    $("#introbutton").hide();
				    $("#bottomtext").hide();
				    $("#wronganswer").hide();
				    $("#correctanswer").hide();
				    experiment.nextquestion(2, trialnum, trialparameters, paper, q1examples, onScreenShapes);
				});
			    }  // end of } else {
			}); // end of $("#q1answer").click(function() {
		    }); // end of $("#introexbutton").click(function() {
		}, 500); // end of setTimeout(function() {
	    }); // end of $("#initialdisplay").click(function() {
	}
    }, // end of experiment.next()

    nextquestion: function (qnumber, trialnum, trialpara, paper, examplesseen, shapesonscreen) {
	var candidateexamples = shapesonscreen.cloneArray();
	if (qnumber <= 3) { 
	    // q1 is the comparison; <= 3 so that subjects see two pos-form questions with examples close to the edges.
	    candidateexamples.splice(4, candidateexamples.length - 8); // remove all but the first and last four.
	    candidateexamples.splice(0, 1);       // remove the first and last elements (the initial examples).
	    candidateexamples.splice(candidateexamples.length - 1, 1);  
	} else { 
	    // questions 4-6 will be shapes in the middle of the distribution.
	    candidateexamples = candidateexamples.splice(4, candidateexamples.length - 8);
	}
	candidateexamples = subtract(candidateexamples,examplesseen);
	var qtestExample = candidateexamples.random();
	examplesseen.push(qtestExample);
	trialpara["q" + qnumber + "abspos"] = qtestExample[3];
	var article;
	if (trialpara.adjective == "alby") {
	    article = "an";
	} else {
	    article = "a";
	}
	var qtext = "<p>Do you think that this is " + article + " " + trialpara.adjective + " " + trialpara.noun + "?</p>";
	$("#bottomtext").html(qtext);
	$("#bottomtext").show();
	var qtestpath = qtestExample[1];
	var qmatchtest = qtestpath.split(' ');
	qnewPathtest = translate(qtestpath, (canvasWidth/2), (canvasHeight*4/5));
	qtestExample[0].animate({path: qnewPathtest}, 1000, ">");
	setTimeout(function() {
	    startTime = (new Date()).getTime();
	    $(".response").show();
	    $(".agreement").prop('checked', false);
	    $(".rating").prop('checked', false);
	    $("#error").hide();
	    $("#continue").show();
	    trialpara["q" + qnumber + "testlocation"] = qtestExample[2];
	    $("#continue").click(function() {
		var qresponseRaw = $("#form").serialize();
		if (autoRespond) {
		    qresponseRaw = "agreement=yes&confidence=6";
	        }
		if (qresponseRaw.length < 21) {
		    $("#confidence #error").show();
		} else {
		    $("#continue").unbind("click");
		    $("#continue").hide();
		    $("#bottomtext").hide();
		    $(".response").hide();
		    endTime = (new Date()).getTime(); 
		    rtindex = "q" + qnumber + "rt";
		    trialpara[rtindex] = endTime - startTime;
		    var qparsed = qresponseRaw.split("&");
		    var qagreement = qparsed[0].split("=");
		    qresponseindex = "q" + qnumber + "response";
		    trialpara[qresponseindex] = qagreement[1];
		    var qrating = qparsed[1].split("=");
		    qconfidenceindex = "q" + qnumber + "confidence";
		    trialpara[qconfidenceindex] = qrating[1];
		    if (qnumber == numberOfQuestionsPerTrial) {
			setTimeout(function () {
			    paper.clear();
			    trialpara.shapes =  "L" + name(trialpara.leftShape) + "R" + name(trialpara.rightShape);
			    delete trialpara.leftShape;
			    delete trialpara.rightShape;
			    trialpara.distribution = name(trialpara.distribution);
			    experiment.data["trial" + trialnum + "data"] = cloneObject(trialpara);
			    experiment.next(trialnum + 1);
			}, 1000); 
		    } else {
			qtestExample[0].animate({path: qtestpath}, 1000, ">");
			setTimeout(function() {
			    experiment.nextquestion(qnumber + 1, trialnum, trialpara, paper, examplesseen, shapesonscreen);
			}, 1);
		    }
		}
	    });
	}, 1000);
    } 
}

function subtract (array1, array2) {
    var newarray = [];
    var val = false;
    for (i = 0; i < array1.length; i++) {
	for (j = 0; j < array2.length; j++) {
	    if (array1[i] == array2[j]) {
		val = true;
	    }
	}
	if (val == false) {
	    newarray.push(array1[i]);
	}
	val = false;
    }
    return newarray;
} 

function morphBetween(leftSkeleton, rightSkeleton, morphProp) {
    newObj = {};
    var leftclone = cloneObject(leftSkeleton);
    var rightclone = cloneObject(rightSkeleton); 
    var leftsize = Object.keys(leftclone).length - 1;
    var rightsize = Object.keys(rightclone).length - 1;
    if (rightsize > leftsize) {
	for (i = leftsize; i < rightsize; i++) {
	    var newkey = "l" + (i+1) + (i+2);
	    leftclone[newkey] = {
		"horizontal": 0,
		"vertical": 0
	    };
	}
    } else if (leftsize > rightsize) {
	for (i = rightsize; i < leftsize; i++) {
	    var newkey = "l" + (i+1) + (i+2);
	    rightclone[newkey] = {
		"horizontal": 0,
		"vertical": 0
	    };
	}
    }
    for (outerkey in leftclone) {
	if (outerkey == "vstart") {
	    newObj[outerkey] = morphProp * (leftclone[outerkey] - rightclone[outerkey]);
	} else {
	    newObj[outerkey] = {};
	    for (innerkey in leftclone[outerkey]) {
		newObj[outerkey][innerkey] = leftclone[outerkey][innerkey] + (rightclone[outerkey][innerkey] - leftclone[outerkey][innerkey]) * morphProp; 
	    }
	}
    }
    return newObj;   
}

function toPathString(skeletonCopy, xposition, yposition) {
    var newPath;
    newPath =  "M " + xposition + " " + (yposition + skeletonCopy.vstart);
    var theKeys = Object.keys(skeletonCopy);
    var indexx;
    var i;
    for (i=1; i <= theKeys.length - 2; i++) {
	indexx = "l" + i + (i+1);
	if (skeletonCopy[indexx]) {
	    newPath = newPath + " " + edgetype + " " + (skeletonCopy[indexx]["horizontal"])  + " " +  (skeletonCopy[indexx]["vertical"]);
	}
    }
    newPath = newPath + " z";
    return newPath;
}

function showSlide(id) {
	$(".slide").hide();
	$("#"+id).show();
}

function cloneObject(oldObject) {
    var newObject = jQuery.extend(true, {}, oldObject);
    return newObject;
}

function shuffle(v) { // non-destructive.
    newarray = v.slice(0);
    for(var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);
    return newarray;
};

function random(a,b) {
    if (typeof b == "undefined") {
	a = a || 2;
	return Math.floor(Math.random()*a);
    } else {
	return Math.floor(Math.random()*(b-a+1)) + a;
    }
}

Array.prototype.random = function() { return this[random(this.length)]; }

Array.prototype.cloneArray = function() { return this.slice(0); }

function name(obj) {
    return "ADD NAME";
}
