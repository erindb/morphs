function sign(x) { if (x < 0) { return -1; } else {return 1;} }
function uniform(a, b) { return ( (Math.random()*(b-a))+a ); }
function lowSkew(a, b) { return (((1/uniform(1,10))*(b-a)) + a); }
function highSkew(a, b) { return (((1 - lowSkew(0,1))*(b-a)) + a); }
function shuffle(v) { newarray = v.slice(0);for(var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);return newarray;} // non-destructive.
function bernoulli(p) { var p = p || 0.5; if (Math.random() > p) {return true;} else {return false;} }
function showSlide(id) { $(".slide").hide(); $("#"+id).show(); }

function attrify(p) {
  return {path: p.attr().path.toString(),
          fill:p.attr().fill,
          "stroke-width":p.attr()["stroke-width"]}
}

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

/*\
polygon
[ method ]
- n (integer) number of vertices for the polygon
\*/
function polygon(n) {
  var center = {x: 200, y: 200};
  var maxRadius = Math.min(150, 150);
  var minRadius = maxRadius*0.2;
  var FULLCIRCLE = 2*Math.PI;
  function rect(p) {
    //convert to rectangular coordinates
    var x = center.x + p.radius*Math.cos(p.theta);
    var y = center.y + p.radius*Math.sin(p.theta);
    return {x: x, y: y, curviness:p.curviness};
  }
  function pathTo(nowP, oldP) {
    var nowR = rect(nowP);
    if (nowP.theta > 0) {
      var nowTheta = nowP.theta;
    } else {
      var nowTheta = FULLCIRCLE;
    }
    var qP = { theta: (nowTheta + oldP.theta) / 2,
              radius: ((nowP.radius + oldP.radius)/2) + ((nowP.curviness - 0.5)*100),
              curviness: 0};
    var qR = rect(qP);
    var oldR = rect(oldP);
    var pathAddition = " Q " + qR.x + "," + qR.y + " " + nowR.x + "," + nowR.y;
    return pathAddition;
  }
  var curviness = Math.random();
  var r1 = highSkew(minRadius, maxRadius);
  var r2 = lowSkew(minRadius, maxRadius);
  var thisMaxRadius = Math.max(r1,r2);
  var thisMinRadius = Math.min(r1,r2);
  var theta = 0;//uniform(0,fullCircle); //randomly pick first vertex
  var vertices = [];
  for (var i=0; i<n; i++) {
    //maximal angular distance between vertices => fewest vertices
    var radius = uniform(thisMinRadius, thisMaxRadius);
    vertices.push({theta: theta, radius: radius, curviness:curviness});
    var maxThetaDiff = (FULLCIRCLE-theta)/(n-i);
    var minThetaDiff = maxThetaDiff*0.2;
    thetaDiff = highSkew(minThetaDiff, maxThetaDiff);
    theta += thetaDiff;
  }
  var firstP = vertices[0]; //polar coords for first vertex
  var firstR = rect(firstP); //rectangular coords for first vertex
  var path = "M " + firstR.x + "," + firstR.y;
  for (var i=1; i<vertices.length; i++) {
    path += pathTo(vertices[i], vertices[i-1]);
  }
  var lastP = vertices[n-1];
  var lastR = rect(lastP);
  path += pathTo(vertices[0], vertices[n-1]); //WHYYYYYYY
  return path;
}

//*****************************************************************************

function posify(pathString, xpos, ypos) {
  var segments = pathString.split(" ");
  var ret_string = segments[0]; //M
  var type = "x";
  for (var i=1; i<(segments.length); i++) {
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
  for (var i=1; i<(segments.length); i++) {
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
}

var flat = [0.05000000, 0.08461538, 0.11923077, 0.15384615, 0.18846154,
            0.22307692, 0.25769231, 0.29230769, 0.32692308, 0.36153846,
            0.39615385, 0.43076923, 0.46538462, 0.50000000, 0.53461538,
            0.56923077, 0.60384615, 0.63846154, 0.67307692, 0.70769231,
            0.74230769, 0.77692308, 0.81153846, 0.84615385, 0.88076923,
            0.91538462, 0.95000000];
var peakeddown = [0.9500000, 0.9415987, 0.9298522, 0.9083216, 0.8971161,
                  0.8920915, 0.8885095, 0.8760121, 0.8748423, 0.8727388,
                  0.8593474, 0.8568689, 0.8471427, 0.8451891, 0.7684467,
                  0.7586962, 0.7401157, 0.6881176, 0.6652079, 0.5829051,
                  0.5635479, 0.5349264, 0.5146823, 0.4197762, 0.4171852,
                  0.2500000, 0.0500000];
var peakedup = [0.05, 0.25, 0.4171852, 0.4197762, 0.5146823, 0.5349264,
                0.5635479, 0.5829051, 0.6652079, 0.6881176, 0.7401157,
                0.7586962, 0.7684467, 0.8451891, 0.8471427, 0.8568689,
                0.8593474, 0.8727388, 0.8748423, 0.8760121, 0.8885095,
                0.8920915, 0.8971161, 0.9083216, 0.9298522, 0.9415987,
                0.95];
var gauss = [0.05, 0.1374550, 0.2234236, 0.3383046, 0.3779954, 0.3791343,
             0.3854804, 0.3864686, 0.4065208, 0.4162701, 0.4325724, 0.4437165,
             0.4577715, 0.5693212, 0.5722497, 0.5966552, 0.5970232, 0.5984126,
             0.6136513, 0.6264537, 0.6291443, 0.6384153, 0.6651024, 0.6928044,
             0.6970096, 0.7880169, 0.95];
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
var numberOfQuestionsPerTrial = 3;//6;
//**************should add in some recording of what these shapes are!!!!!
var shapes = [[polygon(9), polygon(9)],
              [polygon(12), polygon(12)]]; /*,
              [polygon(15), polygon(15)],
              [polygon(18), polygon(18)],
              [polygon(21), polygon(21)],
              [polygon(24), polygon(24)],
              [polygon(6), polygon(6)]]; */
var adjectives = ["furby", "dibty", "halmy", "wiggy", "grondy", "alby", "hartny"];
var nouns = ["wug", "sarma", "bejeeba", "twan", "pimwit", "barnda", "slubja"];
var colors = ["#FF0000","#00FF00","#0000FF","#FFFF00","#00FFFF","#FF00FF","#FFCC99"];
var distributions = [[gauss,"left"], [gauss,"right"], [peakedup,"left"],
                     [peakedup,"right"],  [peakeddown,"left"],
                     [peakeddown,"right"],  [flat,"left"], [flat,"right"]];
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

var experiment = {
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
  end: function () {
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
  },
  next: function (trialnum) {
    if (trialnum == shapes.length) {experiment.end();} else { 
      function displayPracticeQuestion() {
        var q1text = "<p>Click on the " + trialparameters.noun +
                     " that is the most " + trialparameters.adjective + ".</p>";
        $("#bottomtext").html(q1text);
        $(".response").hide();
        $("#error").hide();
        $(".moveon").hide();
        $("#simple-slider").hide();
        $("#continue").hide();
        $(".agreement").prop('checked', false);
      }
      function getTrialParameters() {
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
        return trialparameters;
      }
      function displayShapes() {
        var onScreenShapes = [];
        var xpositions = [];
        var ypositions = [];
        for (hor = 0; hor < numColumns; hor++) {
          xpositions.push(leftMargin + (hor/numColumns) * (canvasWidth - rightMargin));
        }
        for (ver = 0; ver < numRows; ver++) {
          ypositions.push(topMargin + canvasHeight*3/5 * (ver/numRows));
        }
        var indicesbut0and26 = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                                        14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                                        25]);
        var fst = shuffle([0,26]);
        var indices = indicesbut0and26.slice(0, numColumns); 
        // index 9 = the shape at the left of the middle row will be either index 0
        //or index 26 of the distribution.
        indices.push(fst.shift());
        indices = indices.concat(indicesbut0and26.slice(numColumns, numColumns*2-2));
        // ibid for index 17 = the shape at the right of the middle row.
        indices.push(fst.shift());
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
            var inter = intermediate(trialparameters.leftShape,
                                     trialparameters.rightShape, morphProp);
            //change path so the shape is located at point xpos, ypos
            var tmpPath = posify(inter, xpos, ypos);
            var tmpObj = paper.path(tmpPath);
            onScreenShapes.push([tmpObj,tmpPath,morphProp,posInOSS]);
            posInOSS++;
          }
        }
        var st = paper.setFinish();
        st.attr({stroke: '#000', 'stroke-width': 1, fill: trialparameters.color});
        var q1examples = [onScreenShapes[q1ex0posInOSS], onScreenShapes[q1ex1posInOSS]]; 
        return {oss: onScreenShapes, ex: q1examples};
      }
      function getArtifactIntroText() {
        var newtext = "<p>";
        if (trialnum == 0) { newtext += "One"; } else {newtext += "Another";}
        newtext += (" kind of alien artifact are called <b>" +
                    trialparameters.noun + "s</b>.</p>" +
                    "<p>Some of the " + trialparameters.noun +
                    "s are more <b>" + trialparameters.adjective +
                    "</b> than others.</p> <p>Please take a moment to " +
                    "study these " + trialparameters.noun + 
                    "s. When you're ready, click the " +
                    "'Continue' button below.</p>" );
        return newtext;
      }
      $(".feedback").hide();
      $("#stage .moveon").hide();
      $("#stage .response").hide();
      $("#stage #bottomtext").hide();
      $("#nexttrial").hide();
      $("#simple-slider").hide();
      $(".canvas").hide();
      $("#error").hide();
      papername = "canvas" + trialnum;
      $("#stage #" + papername).show();
      var paper = Raphael(papername, canvasWidth, canvasHeight);
      var trialparameters = getTrialParameters(trialnum);
      var newtext = getArtifactIntroText();
      $("#bottomtext").show();
      $("#bottomtext").html(newtext);
      var displayShapesInfo = displayShapes(paper, trialparameters);
      var onScreenShapes = displayShapesInfo.oss;
      var q1examples = displayShapesInfo.ex; 
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
          examples[0][0].animate({path: newPath0}, 1000, ">");
          examples[1][0].animate({path: newPath1}, 1000, ">");
          var exxtext = "<p>The " + trialparameters.noun + " on the " + more +
                        " is the most " + trialparameters.adjective + " " +
                        trialparameters.noun + " that we know of, and the one" +
                        " on the " + less + " is the least " +
                        trialparameters.adjective + " one.</p><p>Please take " +
                        "a look at these two objects, and then click 'Continue'" +
                        " when you're ready to go on.</p>";
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
            var q1more, q1less, q1CorrectIndex;
            var q1Path0 = q1examples[0][1];
            var q1match0 = q1Path0.split(' ');
            var q1Path1 = q1examples[1][1];
            var q1match1 = q1Path1.split(' ');
            if (parseFloat(q1match0[1]) < parseFloat(q1match1[1])) {
              var q1newPath0 = translate(q1Path0, (canvasWidth/2 - 100), canvasHeight*4/5);
              var q1newPath1 = translate(q1Path1, (canvasWidth/2 + 100), canvasHeight*4/5);
              if (q1examples[0][2] > q1examples[1][2]) {
                q1CorrectIndex = 0;
                q1more = "left";
                q1less = "right";
              } else {
                q1CorrectIndex = 1;
                q1more = "right";
                q1less = "left";
              }
            } else {
              var q1newPath0 = translate(q1Path0, (canvasWidth/2 + 100), canvasHeight*4/5);
              var q1newPath1 = translate(q1Path1, (canvasWidth/2 - 100), canvasHeight*4/5);
              if (q1examples[0][2] > q1examples[1][2]) {
                q1CorrectIndex = 0;
                q1more = "right";
                q1less = "left";
              } else {
                q1CorrectIndex = 1;
                q1more = "left";
                q1less = "right";
              }
            }
            setTimeout(function() {
              q1examples[0][0].animate({path: q1newPath0}, 1000, ">");
              q1examples[1][0].animate({path: q1newPath1}, 1000, ">");
              $("#bottomtext").html("");
            }, 1000);
            setTimeout(displayPracticeQuestion, 1000);
            startTime = (new Date()).getTime();
            function getQ1Response(chosenIndex) {
              //"chosenIndex" is either 1 or 0
              return function() {
                $("#wronganswer").html("");
                $("#correctanswer").html("");
                endTime = (new Date()).getTime(); 
                trialparameters.q1rt = endTime - startTime;
                if (chosenIndex == q1CorrectIndex) {
                  trialparameters.q1correctness = "correct"; // record q1 correctness of q1 answer.
                  $(".response").hide();
                  $("#correctanswer").show();
                  $("#correctanswer").html("That's right - the " +
                                           trialparameters.noun + " on the " +
                                           q1more + " is more " +
                                           trialparameters.adjective + ".");
                } else {
                  trialparameters.q1correctness = "incorrect";
                  $(".response").hide();
                  $("#wronganswer").show();
                  $("#wronganswer").html("Sorry, that's not right - actually," +
                                         " the " + trialparameters.noun +
                                         " on the " + q1more + " is more " +
                                         trialparameters.adjective + ".");
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
                  var interactivePaperName = papername + "slider";
                  var interactivePaper = Raphael(interactivePaperName, 400, 400);
                  experiment.nextquestion(2, trialnum, trialparameters, paper,
                                          q1examples, onScreenShapes,
                                          interactivePaper, interactivePaperName);
                });
              };
            }
            q1examples[0][0].click( getQ1Response(0) );
            q1examples[1][0].click( getQ1Response(1) );
          }); // end of $("#introexbutton").click(function() {
        }, 500); // end of setTimeout(function() {
      }); // end of $("#initialdisplay").click(function() {
    }
  }, // end of experiment.next()

  nextquestion: function (qnumber, trialnum, trialpara, paper, examplesseen,
                          shapesonscreen, interactivePaper, interactivePaperName) {
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
    var qtext = "<p>John, an expert on " + trialpara.noun + "s, tells you that " +
                trialpara.noun + " number " + 232 + " is " + trialpara.adjective +
                ".</p><p>Using the slider, please indicate what you think " +
                trialpara.noun + " number " + 232 + " looks like.</p>";
    var firstPath = intermediate(trialpara.leftShape, trialpara.rightShape, 0.5);
    $("#stage #" + papername).hide();
    $("#stage #" + interactivePaperName).show();
    var currentShape = interactivePaper.path(firstPath);
    currentShape.attr({fill: trialpara.color, "stroke-width":2});
    $("#bottomtext").html(qtext);
    $("#bottomtext").show();
    $("#simple-slider").show();
    var needResponse = true;
    var response = null;
    var sliderCase = document.getElementById("sliderCase");
    sliderCase.innerHTML = '<div id="simple-slider" class="dragdealer"><div class="red-bar handle">drag me</div></div>';
    var slider = new Dragdealer("simple-slider", {
      x: 0.5,
      animationCallback: function(x) {
        var currentPath = intermediate(trialpara.leftShape, trialpara.rightShape, x);
        currentShape.attr({path: currentPath});
        needResponse = false;
        response = x;
      }
    });
    setTimeout(function() {
      startTime = (new Date()).getTime();
      $("#error").hide();
      $("#continue").show();
      trialpara["q" + qnumber + "testlocation"] = qtestExample[2];
      $("#continue").click(function() {
        if (needResponse) {
				  $("#error").show();
			  } else {
          $("#continue").unbind("click");
          $("#continue").hide();
          $("#bottomtext").hide();
          $("#error").hide();
          $("#simple-slider").hide();
          interactivePaper.clear();
          endTime = (new Date()).getTime(); 
          rtindex = "q" + qnumber + "rt";
          trialpara[rtindex] = endTime - startTime;
          qresponseindex = "q" + qnumber + "response";
          trialpara[qresponseindex] = response;
          if (qnumber == numberOfQuestionsPerTrial) {
            setTimeout(function () {
              trialpara.shapes =  "L" + name(trialpara.leftShape) + "R" + name(trialpara.rightShape);
              delete trialpara.leftShape;
              delete trialpara.rightShape;
              trialpara.distribution = name(trialpara.distribution);
              experiment.data["trial" + trialnum + "data"] = cloneObject(trialpara);
              experiment.next(trialnum + 1);
            }, 1000); 
          } else {
            setTimeout(function() {
              experiment.nextquestion(qnumber + 1, trialnum, trialpara, paper,
                                      examplesseen, shapesonscreen,
                                      interactivePaper, interactivePaperName);
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

function cloneObject(oldObject) {
    var newObject = jQuery.extend(true, {}, oldObject);
    return newObject;
}

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
